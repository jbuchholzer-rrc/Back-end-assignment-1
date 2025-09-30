// Importing morgan
import morgan from "morgan";
import express from "express";

// Create Express app
const app = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));

export default app;


