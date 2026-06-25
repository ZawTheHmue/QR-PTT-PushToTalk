const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });

let clients = [];

wss.on("connection", (ws) => {
    clients.push(ws);

    ws.on("message", (data) => {
        clients.forEach(client => {
            if (client !== ws && client.readyState === 1) {
                client.send(data);
            }
        });
    });

    ws.on("close", () => {
        clients = clients.filter(c => c !== ws);
    });
});
