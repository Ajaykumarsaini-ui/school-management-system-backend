import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// Import Routers
import schoolRouter from "./routes/school.router.js";
import classRouter from "./routes/class.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import studentRouter from "./routes/student.routes.js";
import noticeRouter from "./routes/notice.routes.js";
import subjectRouter from "./routes/subject.routes.js";
import examscheduleRouter from "./routes/examschedule.routes.js";
import studentmessageRouter from "./routes/studentmessage.routes.js";
import studentsubjectRouter from "./routes/studentsubject.routes.js";
import studentleaveRouter from "./routes/studentleave.routes.js";
import teacherleaveRouter from "./routes/teacherleave.routes.js";
import teachermessageRouter from "./routes/teachermessages.route.js";
import attendenceRouter from "./routes/attendence.routes.js";

// Load env variables
dotenv.config();

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    process.env.CLIENT_URL // for production deployment like Vercel
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ API Routes
app.use("/api/school", schoolRouter());
app.use("/api/class", classRouter());
app.use("/api/teacher", teacherRouter());
app.use("/api/student", studentRouter());
app.use("/api/notice", noticeRouter());
app.use("/api/subject", subjectRouter());
app.use("/api/examschedule", examscheduleRouter());
app.use("/api/studentmessage", studentmessageRouter());
app.use("/api/studentsubject", studentsubjectRouter());
app.use("/api/studentleave", studentleaveRouter());
app.use("/api/teacherleave", teacherleaveRouter());
app.use("/api/teachermessage", teachermessageRouter());
app.use("/api/attendence", attendenceRouter());

// ✅ Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

export default app;
