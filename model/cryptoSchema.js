import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  coin: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: { type: Date, default: Date.now },
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
export default Crypto;
