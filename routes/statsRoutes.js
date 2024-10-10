import express from "express";
import Crypto from "../model/cryptoSchema.js";

const router = express();

router.get("/", async (req, res) => {
  const { coin } = req.query;
    try {
        const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
        console.log(latestData);
    if (!latestData)
      return res.status(404).json({ error: "Coin data not found" });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      change24h: latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;