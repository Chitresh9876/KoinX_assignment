import { config } from 'dotenv';
import express from 'express';
import statsRoutes from "./routes/statsRoutes.js";
import deviationRoutes from "./routes/deviationRoutes.js";



const app = express();

config({ path: './config/config.env' });

export default app;

app.use('/stats', statsRoutes);
app.use("/deviation", deviationRoutes);