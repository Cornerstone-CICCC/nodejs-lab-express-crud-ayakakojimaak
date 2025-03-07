import Express, { Router, Request, Response } from "express";
import dovenv from "dotenv";
import employeesRouter from "./routes/employees.routes";
import cors from "cors";

dovenv.config();

const app = Express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(Express.json());
app.use("/", employeesRouter);

//fallback route
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
