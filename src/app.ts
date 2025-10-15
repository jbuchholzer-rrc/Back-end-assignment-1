/**
 * @fileoverview Main Express Application Configuration
 * This module sets up the Express application with middleware, routes, and health checks.
 * It configures logging with Morgan, JSON body parsing, and registers all API routes.
 *
 * @author Jack Buchholzer
 * @module app
 */

import morgan from "morgan";
import express from "express";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

// Create Express app
const app = express();

// Middleware
app.use(morgan("combined"));
app.use(express.json());

// Health check endpoint
app.get("/health", (_req, res) => {
    res.status(200).send("Server is healthy!");
});

// Routes
app.use(employeeRoutes);
app.use(branchRoutes);

export default app;


