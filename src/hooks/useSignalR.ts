import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7088/authHub") 
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, []);

    return connection;
};

export default useSignalR;
