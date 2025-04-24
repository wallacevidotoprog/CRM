import express from "express";
import routers from "./routers/index.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: ["http://localhost:4000","http://192.168.56.1:4000","http://192.168.56.1"],
  methods: ["GET", "POST", "PATCH","DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", routers);

app.listen(3000,'192.168.56.1', () => {
  console.log("✅ Server is running on port 3000");
});
