import express from "express";
import Crypto from "../model/cryptoSchema.js";
import calculateStandardDeviation from "../services/calculateStandardDeviation.js";

const router = express();


router.get("/", async (req, res) => {
  const { coin } = req.query;
  try {
    const records = await Crypto.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);
    const prices = records.map((record) => record.price);

    if (prices.length === 0) {
      return res.status(404).json({ error: "No data available for this coin" });
    }

    const deviation = calculateStandardDeviation(prices);
    res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;