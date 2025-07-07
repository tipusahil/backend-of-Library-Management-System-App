import express from "express";
import cors from  "cors";
import RootRoutes from "./modules/RootRoutes/root.routes";
import globalErrorHandler from "./utils/globalErrorHandler";

const app  = express();
app.use(express.json());

app.use(cors());

app.use(RootRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "📚 Library Management API is live!",
  });
});

app.use(globalErrorHandler);

export default app;
