import express from "express";
import cors from "cors";
import { verifyToken } from './middleware/authMiddleware';
import authRoutes from "./routes/authRoutes";
import resumeRoutes from './routes/resumeRoutes';
import analysisRoutes
from './routes/analysisRoutes';
import roadmapRoutes
from './routes/roadmapRoutes';

// import {
//   askGemini,
// } from './services/geminiService';
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
app.use(
  '/api/resumes',
  resumeRoutes
);
app.use(
  '/api/analysis',
  analysisRoutes
);
app.use(
  '/api/roadmaps',
  roadmapRoutes
);
// app.get(
//   '/api/test-gemini',
//   async (
//     req,
//     res
//   ) => {
//     const answer =
//       await askGemini(
//         'Explain Node.js in 3 lines'
//       );

//     res.json({
//       success: true,
//       answer,
//     });
//   }
// );



export default app;