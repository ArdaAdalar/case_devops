import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import { connectToDatabase } from "./db/conn.mjs"; // Bağlantı fonksiyonu
import records from "./routes/record.mjs";
import healthcheck from "./routes/healthcheck.mjs";

const PORT = 5050;
const app = express();

app.use(cors({
	origin: "*",
}));
app.use(express.json());

app.use("/record", records);
app.use("/healthcheck", healthcheck);

// MongoDB bağlantısını başlat ve Express sunucusunu çalıştır
(async () => {
  try {
    await connectToDatabase(); // Veritabanı bağlantısını başlat
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
})();

