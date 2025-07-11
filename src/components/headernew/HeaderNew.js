import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import moment from "moment";
import * as React from 'react';


import axios from "axios";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Col, Modal, Toast } from "react-bootstrap";
import { useIdleTimer } from "react-idle-timer";
import { Link, useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { AppContext } from "../../Context";
import { apiHost } from "../../Helper";
import { auth } from "../../firebase";
import "../App.css";
import { Countries as CountryObj } from "../Country";
import Logo from "../asstes/HoneyLogo.svg";
import Picture from "../asstes/Profile.svg";
import notifsound from "../asstes/notif.wav";



const pages = ['My Orders', 'Matches', 'Finalize', 'Watch List', 'MC', 'Tips', 'MC Prime'];
const settings = ['Edit Profile', '1-Order-Fx', 'Sound', 'Logout'];

function ResponsiveAppBar({ expiryTimestamp }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const navigate = useNavigate();
    const context = React.useContext(AppContext);
    const [tab, setTab] = useState("ORDERS");
    const [notification, setNotification] = useState({});
    const [showtoast, setShowtoast] = useState(false);
    const [list, setlist] = useState("");
    const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
    const timeout = 1000 * 60 * 5;
    const [remaining, setRemaining] = useState(timeout);
    const [elapsed, setElapsed] = useState(0);
    const [isIdle, setIsIdle] = useState(false);
    const [loading, setloading] = useState(true);
    const handleOnActive = () => setIsIdle(false);
    const handleOnIdle = () => setIsIdle(true);
    const [show, setShow] = useState(false);
    const [timerstart, settimerstart] = useState(false);
    //const handleClose = () => setShow(false);
    const handleClose = () => {
        // Close the modal
        setShow(false);

        // Reload the page
        window.location.reload();
    };
    const handleShow = () => setShow(true);
    const [cardShow, setCardShow] = useState(false);
    const [notifData, setNotifData] = useState([]);
    const [visitedLength, setvisitedLength] = useState(0);
    const [Countries, setCountries] = useState([]);
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [isMute, setIsMute] = useState(JSON.parse(sessionStorage.getItem("isMute")));
    const globeCountries = useRef();

    const togglerRef = useRef(null);

    const { seconds, minutes, restart } = useTimer({
        expiryTimestamp,
    });
    const [pathName, setpathName] = useState(window.location.pathname);
    const {
        reset,
        pause,
        resume,
        getRemainingTime,
        getLastActiveTime,
        getElapsedTime,
    } = useIdleTimer({
        timeout,
        onActive: handleOnActive,
        onIdle: handleOnIdle,
    });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    const formatTime = (time) => {
        return String(time).padStart(2, "0");
    };

    const toastBodySet = (obj) => {
        setNotification({
            title: obj.type.charAt(0).toUpperCase() + obj.type.slice(1),
            body: obj.description,
        });
        if (window.location.pathname === "/ChatPage" && obj.type === "Message") {
            setShowtoast(false);
        } else {
            setShowtoast(true);
        }
        soundFunc();
    };

    useEffect(() => {
        getCountry();
    }, [null]);

    const randomFunction = () => {
        context.dispatch({ Type: "NAVIGATION" });
        const mediaQueryForElements = window.matchMedia("(min-width: 992px)");
        if (!mediaQueryForElements.matches) {
            togglerRef.current.click();
        }
    };

    const getCountry = () => {
        let element = [];
        element[0] = "";
        for (let index = 0; index < 249; index++) {
            element[index + 1] = CountryObj[index];
        }
        setCountries(element);
    };

    useEffect(() => {
        if (window.location.pathname == `/OrderCom`) {
            setTab("ORDERS");
        } else if (window.location.pathname == `/Match_Tab`) {
            setTab("MATCHES");
        } else if (window.location.pathname == `/ChatPage`) {
            setTab("FINALIZE");
        } else if (window.location.pathname == `/watchlist`) {
            setTab("WATCHLIST");
        } else if (window.location.pathname == `/MC`) {
            setTab("MC");
        } else if (window.location.pathname == `/Tips`) {
            setTab("TIPS");
        } else if (window.location.pathname == `/McPrime`) {
            setTab("MC PRIME");
        } else if (window.location.pathname == "/editprofile") {
            setTab("");
        }
        // }, [context.applicationStore.navigation]);
    });

    function soundFunc() {
        var x = document.getElementById("notificationSound");
        x.play();
    }
    function soundActivate(mute) {
        let authToken = localStorage.getItem("authToken");
        setIsMute(mute)
        let url = `${apiHost}/api/User/ChangeMute?mute=${mute}&UserId=${uid}`;
        axios
            .post(url, {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => { console.log(response) })
            .catch((e) => {
                //console.log(e)
            });

        document.getElementById("notificationSound").volume = mute ? 0.0 : 0.6;
        sessionStorage.setItem("isMute", mute);
    }

    useEffect(() => {
        if (context.applicationStore.notificationMessage != undefined) {
            let obj = {
                description: context.applicationStore.notificationMessage.description,
                type: context.applicationStore.notificationMessage.heading,
            };
            toastBodySet(obj);
        }
    }, [context.applicationStore.notificationMessage]);

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    useEffect(() => {
        getNotifs();
    }, [context.applicationStore.notificationMessage]);

    const getNotifs = async () => {
        let count = 0;
        let notifications = [];
        let url = `${apiHost}/api/User/GetNotification?UserId=${uid}`;
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then((response) => {
                // ////console.log(response.data)
                let date = new Date();
                let ms = date.setDate(date.getDate() - 7);
                date = new Date(ms);
                response.data.notifs.forEach((d, i) => {
                    if (new Date(d.time.split("T")[0]) > date) {
                        if (!d.isVisited || d.isVisited == null) {
                            count++;
                        }

                        let time = new Date(d.time).toLocaleString();
                        let newtime =
                            time.split(",")[0] +
                            " at" +
                            time.split(",")[1].split(":")[0] +
                            ":" +
                            time.split(",")[1].split(":")[1] +
                            " " +
                            time.split(",")[1].split(":")[2].split(" ")[1];
                        let obj = { newtime: newtime, ...d };
                        notifications.push(obj);
                        setvisitedLength(count);
                        setNotifData(notifications);
                    }
                });
            });
    };

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    useEffect(async () => {
        setUID(window.location.search.split("&")[0].split("=")[1]);
        const x = sessionStorage.getItem("logedin");

        if (x == "false") {
            ////console.log("logging out");
            window.location.href = "/";
        } else {
        }
        // document.addEventListener("mouseup", function (e) {
        //   var container = document.getElementById("notifCard");
        //   if (!container.contains(e.target)) {
        //     container.style.display = "none";
        //   }
        // });
    }, [null]);
    const Getdata = async () => {
        let url = `${apiHost}/api/User/GetUserById?UserId=${uid}`;
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(async (response) => {
                const data = response.data;
                const image = response.data.profileimagepath;
                if (image == "" || image == null) {
                    let name = "storageImage";
                    data[name] = "";
                    setlist(data);
                    setloading(false);
                } else {
                    let name = "storageImage";
                    data[name] = `${apiHost}/Images/${image}`;
                    setlist(data);
                }
            })
            .catch((error) => {
                ////console.log(error);
            });
    };

    useEffect(() => {
        Getdata();
        const y = sessionStorage.getItem("logedin");
        // getRequestNotifs();
    }, [uid, loading, context.applicationStore.navigation]);

    const showCard = () => {
        ////console.log("Tttttttttttttttttttttt");
        var x = document.getElementById("notifCard");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        setCardShow(false);
    };

    const logoutResponse = async ()=>{
        var logintime = sessionStorage.getItem("UserLoginTime")
        var logouttime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        let url = `${apiHost}/api/User/UserLoginRecord?UserId=${uid}&LoginTime=${logintime}&LogoutTime=${logouttime}`;
        await axios.post(url,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then(async (res)=>{
          return res
        })
    }

    const signout = async () => {  // Marking this function as async
        try {
          await signOut(auth);
          const res = await logoutResponse(); 
          localStorage.setItem("logedin", false);
          sessionStorage.removeItem("sessionIn");
          sessionStorage.clear();
          window.location.href = "/";
        } catch (error) {
          console.error("Error during signout:", error); // Catch and handle errors
        }
      };

    useEffect(() => {
        const veryemail = Cookies.get("email");
        if (veryemail != list.email && loading === false) {
            ////console.log("logging out");
            window.location.href = "/";
        }
    }, [remaining]);

    useEffect(() => {
        // //console.log(list.userName.toString())
    }, [null]);

    useEffect(() => {
        if (remaining <= 0) {
            setShow(true);
        }
    }, [remaining]);
    useEffect(() => {
        if (show === true) {
            setRemaining(timeout);
            setElapsed(15);
            settimerstart(true);
            const time = new Date();
            time.setSeconds(time.getSeconds() + 14);
            restart(time);
            //signout(time);
        }
    }, [show]);

    useEffect(() => {
        if (elapsed == 1) {
            signout();
        }
    }, [elapsed]);

    useEffect(() => {
        setTimeout(() => {
            setElapsed(elapsed - 1);
        }, 1000);
    });

    useEffect(() => {
        setRemaining(getRemainingTime());

        setInterval(() => {
            setRemaining(getRemainingTime());
        }, 1000);
    }, []);

    const styles = {
        simple: {
            color: "white",
            fontWeight: 500,
            fontSize: "15px",
            width: "115px",
            textAlign: "center",
        },
        show4: {
            background: "#ebebeb",
            color: "#2995be",
            borderRadius: "6px",
            fontWeight: 500,
            fontSize: "15px",
            fontWeight: "700",
            textAlign: "center",
        },
        white: {
            color: "white",
            textAlign: "center",
        },
    };
    const CustomToggle = forwardRef(({ children, onClick }, ref) => (
        <a
            style={{ textDecoration: "none" }}
            href=""
            // ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            <span style={{ marginRight: "5px", display: "flex", color: "white" }}>
                {list.firstName}{" "}
            </span>
        </a>
        // <img className=" " src={Dropicon} />
    ));

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, [null]);

    function showCountry() {
        if (globeCountries.current.style.display == "none") {
            globeCountries.current.style.display = "block";
        } else {
            globeCountries.current.style.display = "none";
        }
    }

    function SignoutUserInactive() {
        const time = new Date();
        if (time.setSeconds(time.getSeconds() + 14) == false) {
            signout(time);
            //signout();
        }
    }
    return (
        <>
            <div>
                <audio id="notificationSound">
                    <source src={notifsound} type="audio/wav" />
                </audio>
                <Toast
                    onClose={() => setShowtoast(false)}
                    show={showtoast}
                    delay={6000}
                    autohide
                    animation
                    style={{
                        position: "absolute",
                        minWidth: 200,
                        bottom: 0,
                    }}
                >
                    <Toast.Header>
                        <strong className="mr-auto">{notification.title}</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>{notification.body}</Toast.Body>
                </Toast>
                <Modal show={show} onHide={handleClose} size="md">
                    <Modal.Header>
                        <Modal.Title>User Inactive Status </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ marginBottom: "-15px"}}>
                        <p style={{ fontSize: "17px" }}>
                            {formatTime == 0
                                ? "Logging Out"
                                : `You will be logged out soon - ${formatTime(seconds)} seconds`}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col>
                            <Button
                                variant="Secondary"
                                onClick={signout}
                                style={{ backgroundColor: "#9FA6B2", color: "white" }}
                            >
                                Logout
                                <span>{SignoutUserInactive()}</span>
                            </Button>
                        </Col>
                        <Col style={{ textAlign: "end" }}>
                            <Button variant="primary" onClick={handleClose}>
                                Extend Time
                            </Button>
                        </Col>
                    </Modal.Footer>
                </Modal>
            </div>
            <AppBar position="fixed" sx={{ background: "#2995be" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to={`/OrderCom?ID=${uid}`} style={{display: { xs: 'none', md: 'flex' }}}><img src={Logo} width={100} className="Logo" alt="Logo" /></Link>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography> */}
                        <Link to={`/OrderCom?ID=${uid}`} sx={{display: { xs: 'none', md: 'flex' }}}><img src={Logo} width={100} className="Logo" alt="Logo" /></Link>

                        <Box sx={{ flexGrow: 1, justifyContent: "center", display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={list.storageImage == "" ? Picture : list.storageImage} />
                                    <Typography
                                        noWrap
                                        sx={{
                                            ml: 2,
                                            flexGrow: 1,
                                            color: 'white',
                                            textDecoration: 'none',
                                        }}
                                        className="notranslate"
                                    >
                                        {list.userName}
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
export default ResponsiveAppBar;