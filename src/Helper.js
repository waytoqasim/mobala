import axios from "axios";
import apiurls from "./apiurls";
import { apiInterceptor } from "./service/ApiService";
// export const apiHost = "http://localhost:44315";
 export const apiHost = "https://api.mobala.ca";
//export const apiHost = "https://uatapi.mobala.ca";
// export const apiHost = "http://localhost:6234";
// export const apiHost = "https://api.hassancomputing.com";

export const InviteStatuses = (status, isAccepted = false) => {
  if (isAccepted) return { buttonText: "Invite Accepted", disabled: true };
  switch (status) {
    case "None":
      return { buttonText: "Send Invite", disabled: false };
    case "Pending":
      return { buttonText: "Invite Sent", disabled: true };
    case "Accepted":
      return { buttonText: "Invite Accepted", disabled: true };
    case "Rejected":
      return { buttonText: "Invite Rejected", disabled: true };
    default:
      break;
  }
};

export const setDoc = (path, Data) => {
  return new Promise((resolve, reject) => {
    Data["path"] = path;
    let jsonData = JSON.stringify(Data);
    let url = `${apiHost}/api/Update/Setdata`;
    apiInterceptor.post(apiurls.UPDATE.UPDATE,jsonData)
      .then((response) => {
        debugger
        // //console.log("Uploaded", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        debugger
        //console.log(error);
      });
  });
};

export const uploadToStorage = (base64String, path) => {
  let data = { base64String: base64String, path: path };
  let url = `${apiHost}/api/Storage/UploadStorage`;
  apiInterceptor.post(apiurls.STORAGE.STORAGE,data)
    .then((response) => {
      // //console.log("Uploaded", response.data);
    })
    .catch((error) => {
      //console.log(error);
    });
};

export const getStorage = (path) => {
  return new Promise((resolve, reject) => {
    let url = `${apiHost}/api/Storage/GetStorage?path=${path}`;
      apiInterceptor.get(apiurls.STORAGE.GETSTORAGE(path))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        //console.log(error);
        resolve("");
      });
  });
};

export const addDoc = (path, Data) => {
  return new Promise((resolve, reject) => {
    let jsonData = JSON.stringify(Data);
    let url = `${apiHost}/api/Update/Adddata?data=${jsonData}&path=${path}`;
    apiInterceptor
      .post(apiurls.UPDATE.ADDDATA(jsonData,path), Data)
      .then((response) => {
        // //console.log("Uploaded", response.data);
        resolve(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const deleteDoc = (path) => {
  return new Promise((resolve, reject) => {
    let authToken = localStorage.getItem("authToken");
    let url = `${apiHost}/api/Update/Deletedata?path=${path}`;
    axios
      .post(
        url,
        { doc: "deleted" },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  });
};
