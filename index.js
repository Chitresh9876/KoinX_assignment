import app from "./app.js";
import connectDB from "./config/db.js";
import fetchCryptoData from "./services/fetchCryptoData.js";
import cron from "node-cron";

connectDB();
// Schedule the job to run every 2 hours
// cron.schedule("0 */2 * * *", fetchCryptoData);
cron.schedule("* * * * *", fetchCryptoData);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

