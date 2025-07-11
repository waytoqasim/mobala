import * as signalR from "@microsoft/signalr";
import { apiHost } from "./Helper";

class SignalRService {
    connection = null;

    startConnection = () => {
        return new Promise((resolve, reject) => {
            this.connection = new signalR.HubConnectionBuilder()
                // .withUrl("https://api.mobala.ca/chathub")
                .withUrl(`${apiHost}/chathub`)
                // .withUrl("https://api.hassancomputing.com/chathub")
                // .withUrl("http://localhost:6234/chathub")
                .configureLogging(signalR.LogLevel.Information)
                .build();

            this.connection
                .start()
                .then(() => {
                    //console.log(`SignalR connection established with ID:${this.connection.connectionId}`);
                    resolve(this.connection.connectionId)
                })
                .catch((err) => {
                    console.error("Error establishing SignalR connection", err)
                });
        })
    };

    registerConnection = (ID) => {
        return new Promise((resolve, reject) => {
            this.connection.invoke("RegisterClient", ID).then(res => {
                resolve(res);
            });
        })
    }

    getConnectedUsers = () => {
        return new Promise((resolve, reject) => {
            this.connection.invoke("GetConnectedUser").then(res => {
                resolve(res);
            });
        })
    }

    sendMessage = (ID, message) => {
        return new Promise((resolve, reject) => {
            this.connection.invoke("SendMessageToUser", ID, message).then(res => {
                resolve("OK");
            });
        })
    }
    sendMatches = (Id,Order) => {
        return new Promise((resolve, reject) => {
            this.connection.invoke("SendMatchInfo",Id, Order).then(res => {
                resolve("OK");
            });
        })
    }

    sendNotification = (ID, message, heading) => {
        return new Promise((resolve, reject) => {
            this.connection.invoke("SendNotificationToUser", ID, message, heading).then(res => {
                resolve("OK");
            });
        })
    }

    getConnection = () => {
        return this.connection;
    };

    closeConnection = () => {
        this.connection.stop();
    };
}

export default new SignalRService();