import http from "http";
import app from "./app.js";
import { env } from "./env/variables.js";
import { connectDB } from "./db/db.config.js";

const server = http.createServer(app);

const PORT = env.PORT;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
