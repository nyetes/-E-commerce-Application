import express from "express";
import cors from "cors";
import adminRouter from "./admin";
import apiRouter from "./routes/api";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
