import express from "express";
import cors from "cors";
import { verifyToken } from './middleware/authMiddleware';
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);   
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillForge AI Backend Running"
  });
});

app.get(
  '/api/protected',
  verifyToken,
  (req, res) => {
    res.json({
      success: true,
      message: 'Protected route accessed',
      user: (req as any).user,
    });
  }
);

export default app;