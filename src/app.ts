import express, { Application } from "express";
import cors from  "cors";
import RootRoutes from "./modules/RootRoutes/root.routes";
import globalErrorHandler from "./utils/globalErrorHandler";

const app :Application = express();
app.use(express.json());

app.use(cors());

app.use(RootRoutes);

app.use(globalErrorHandler);

export default app;
