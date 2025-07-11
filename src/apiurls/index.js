const  APIURLS = {
    AUTHENTICATION: {
        LOGIN: (email, password, coordinates, is1FX) => {
            const pathname = is1FX ? '1Fx' : 'FullFx';
            return `/api/Authentication/Login?email=${email}&password=${password}&location=${coordinates}&pathname=${pathname}`;
        },
        GETLASTLOGIN:(id)=>`/api/Authentication/LastLogin?ID=${id}`,
        SIGNUP:`/api/Authentication/SignUp`,
        CHECKPASSWORD:(userID,password)=>`/api/Authentication/CheckPassword?userID=${userID}&password=${password}`,
        UPDATEPASSWORD:(Uid,confirmpassword)=>`/api/Authentication/UpdatePassword?ID=${Uid}&password=${confirmpassword}`
    },
    EMAIL:{
      SENDVERIFICATIONEMAIL:(email,val)=>`/api/Email/SendVerificationEmail?toEmail=${email}&code=${val}`
    },
    USERS:{
      USERBYID:(uid)=>`/api/User/GetUserById?UserId=${uid}`,
      USERUPDATE:`/api/User/UpdateUser`,
      DELETEACCOUNT:(Uid)=>`/api/Authentication/DeleteAccount?ID=${Uid}`,
      HIBERNATEACCOUNT:(Uid)=>`/api/Authentication/HibernateAccount?ID=${Uid}`,
      MOBILENUMBER:(mobilenumber)=>`/api/User/GetUserByNumber?Number=${mobilenumber}`,
      GETUSERPERMISSIONS:(UserID)=>`/api/User/GetUserPermissions?UserId=${UserID}`,
      GETUSERBYEMAIL:(email)=>`/api/User/GetUserByEmail?Email=${email}`,
      ISUSERNAMEEXISTS:(UserName)=>`/api/User/UserNameExist?name=${UserName}`,
      GETWATCHLISTBYID:(watchlistDocid)=>`/api/User/GetWatchListByID?Id=${watchlistDocid}`,
      ISEMAILEXISTS:(Email)=>`/api/User/EmailExist?email=${Email}`,
      GETUSERBYIDFOREDIT:(Uid)=>`/api/User/GetUserByIdForEdit?UserId=${Uid}`,
      FAVMCUSERS:(uid)=>`/api/User/FavMcUsers?uid=${uid}`,
      MCUSERS:(useselectedcity,selectedcountry)=>`/api/User/McUsers?city=${useselectedcity}&country=${selectedcountry}`,
      MCUSERSBYCUNTRY:(selectedcountry)=>`/api/User/McUsersByCountry?country=${selectedcountry}`,
      MCUSERSBYCUNTRYANDSTATE:(selectedcountry,useselectedstate)=>`/api/User/McUsersByCountryAndState?country=${selectedcountry}&state=${useselectedstate}`,
    },
  ORDERS: {
    GETCOORDINATES:(city,state,country)=>`/api/Orders/GetCoordinates?city=${city}&state=${state}&country=${country}`,
    GETORDERDATA:(uid)=>`/api/Orders/GetOrdersByUserId?UserId=${uid}`,
    GETFINALIZEORDERS:(uid)=>`/api/Orders/GetFinalizedOrders?UserId=${uid}`,
    GETORDERSBYACTIVITY:(uid)=>`/api/Orders/GetOrderByActivity?UserId=${uid}`,
    GETORDERSACTIVITYBYUSERID:(uid)=>`/api/Orders/GetActivityOrdersByUserId?UserId=${uid}`,
    GETMATCHEDORDERS:(uid)=>`/api/Orders/GetMatchedOrders?userId=${uid}`,
    GETORDERSBYID:(orderID)=>`/api/Orders/GetOrderById?OrderId=${orderID}`,
    GETDUPLICATEORDER: (givecurrency, takecurrency, uid, usegiveselectedcity, useselectedcity) => {
      return `/api/Orders/GetDuplicateOrder?GiveCurrency=${givecurrency.split(" ")[0]}&TakeCurrency=${takecurrency.split(" ")[0]}&userId=${uid}&TakeCity=${usegiveselectedcity}&GiveCity=${useselectedcity}`;
    },
    GETRECENTORDER:(orderID)=>`api/Orders/GetRecentOrder?OrderId=${orderID}`,
    GetMatchForOneOrder:(userID,currentOrder)=>`/api/Orders/GetMatchForOneOrder?UserId=${userID}&OrderId=${currentOrder}`,
    GetOrderDropdown:(UserID)=>`api/Orders/GetOrderDropdown?UserId=${UserID}`,
  }, 
  CHAT:{
    GETCHATROOMS:(uid)=>`/api/Chats/GetChatRooms?UserId=${uid}`,
    VISITMESSAGE:(chatRoomId,uid)=>`/api/Chats/VisitMessage?RoomId=${chatRoomId}&UserId=${uid}`,
    REMOVECHATROOMS:(ChatRoomId,uid,orderId,Count,MakeCompleted)=>`/api/Chats/RemoveChatRooms?RoomID=${ChatRoomId}&UserId=${uid}&OrderId=${orderId}&Count=${Count}&MakeCompleted=${MakeCompleted}`,
    REMOVECHATROOMS:(roomId,uid,orderId,Count,MakeCompleted)=>`/api/Chats/RemoveChatRooms?RoomID=${roomId}&UserId=${uid}&OrderId=${orderId}&Count=${Count}&MakeCompleted=${MakeCompleted}`,
  },

  WATCHLIST:{
    GETWATCHLIST:(uid) => `/api/User/GetWatchList?UserId=${uid}`,
    GETDATA:(uid) => `/api/User/GetUserById?UserId=${uid}`,
  },
  MCPRIME:{
    GETMCCOUNTRIES:(userId) => `/api/McPrime/GetMCCountries?UserId=${userId}`,
    GETMCCURRENCIES:(userId) => `/api/McPrime/GetMCCurrencies?UserId=${userId}`,
    REQUESTPASSWORDAGAIN:(userId,password) => `api/McPrime/RequestPasscode?UserId=${userId}&password=${password}`,
    GETMCORDERS:(userId) => `/api/McPrime/GetMCOrders?UserId=${userId}`,
    GETEACHORDERPROFITVALUE:(orderId) => `/api/McPrime/GetOrderProfit?orderId=${orderId}`,
    MAKEMCPRIME:(userId)=>`/api/McPrime/MakeMCPrime?UserId=${userId}`,
    CHECKPASSCODE:(userId,passcode)=>`/api/McPrime/CheckPasscode?UserId=${userId}&code=${passcode}`,
    UPDATEMCCOUNTRIES:`/api/McPrime/UpdateMCCountries`,
    UPDATEMYCURRENCIES:`/api/McPrime/UpdateMCCurrencies`,
  },
  RATES:{
    GETRATES:`/api/Rates/FetchRate`,
  },
  UPDATE:{
    UPDATE:`/api/Update/Setdata`,
    ADDDATA:(jsonData,path)=>`/api/Update/Adddata?data=${jsonData}&path=${path}`,
  },
  STORAGE:{
    STORAGE:`/api/Storage/UploadStorage`,
    GETSTORAGE:(path)=>`/api/Storage/GetStorage?path=${path}`,

  }
};

export default APIURLS;