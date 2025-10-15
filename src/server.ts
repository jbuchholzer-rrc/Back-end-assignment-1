/**
 * @fileoverview Server Entry Point
 * This module starts the Express server and listens on the specified port.
 * It imports the configured Express app and initializes the HTTP server.
 *
 * @author Jack Buchholzer
 * @module server
 */

import app from "./app";
import { Server } from "http";

const PORT: string | number = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default server;


