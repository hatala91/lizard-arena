import { WebSocketTransport } from "@colyseus/ws-transport";
import { Server } from "colyseus";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import HeroRoom from "./game/rooms";

// Get environment variables
dotenv.config();
const HOST = process.env.HOST || "0.0.0.0";
const PORT = parseInt(process.env.PORT || "8080");

// Instantiate Express app
const app = express();

// Serve dist folder
const distPath = path.join(__dirname, "../../dist/");
app.use(express.static(distPath));

// Register frontend pages
app.get("/", (_request, response) => {
  response.sendFile(distPath + "/game.html");
});

// Define game server
const server = http.createServer(app);
const gameServer = new Server({
  transport: new WebSocketTransport({
    server: server,
    pingInterval: 5000,
    pingMaxRetries: 3,
  }),
});

// Register room handlers
gameServer.define("hero", HeroRoom);

// Start game server
void gameServer.listen(PORT, HOST);
console.info(`Listening on http://${HOST}:${PORT}`);
