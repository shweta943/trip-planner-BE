import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import geminiRoutes from './routes/geminiAPI.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Trip Planner Backend is running");
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});


app.use('/api/gemini', geminiRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});