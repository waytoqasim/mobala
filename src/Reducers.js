export const Reducer = (state, action) => {
    state = { ...state, count: state.count !== undefined ? ++state.count : 1 }
    // //console.log(state)
    switch (action.Type) {
        case 'MATCHED ORDERS': {
            return { ...state, MatchedOrders: action.Payload }
        }
        case 'ONLINE USERS LIST': {
            return { ...state, OnlineUsers: action.Payload }
        }
        case 'NAVIGATION': {
            return { ...state, navigation: ++state.navigation }
        }
        case 'MESSAGES': {
            return { ...state, messages: action.Payload }
        }
        case 'NOTIFICATION': {
            return { ...state, notifications: action.Payload }
        }
        case 'NOTIFICATION ALERT': {
            return { ...state, notificationMessage: action.Payload }
        }
        case "INVITE": {
            return { ...state, Invite: ++state.Invite }
        }
        case "Dispatch": {
            return { ...state }
        }
        case "NavMobile": {
            return { ...state,tab:action.Payload.tab }
        }
        case "FETCHMATCHES": {
            return { ...state, matchOrder: action.Payload }
        }
        case "CHATROOM DATA": {
            return { ...state, RoomData: action.Payload }
        }
        case "USERS CALL": {
            return { ...state, UserListData: action.Payload }
        }
        case "FAVOURITE ORDER": {
            return { ...state, FavOrder: action.Payload }
        }
        case "PERMISSION": {
            return { ...state, Permissions: action.Payload }
        }
        case "FULLFXCHECK": {
            return { ...state, IsFullFX: action.Payload }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.Type}`)
            // return state;
        }
    }
}