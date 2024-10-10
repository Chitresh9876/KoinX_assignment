import axios from "axios";
import Crypto from "../model/cryptoSchema.js";

// Function to fetch and store cryptocurrency data
const fetchCryptoData = async () => {
  const coins = ["bitcoin", "matic-network", "ethereum"];
  try {
    console.log("start");

    const url = "https://api.coingecko.com/api/v3/simple/price";
    const options = {
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": "CG-gwfmLz6s5NVXb5fSrA2nkBMP",
      },
    };

    let coinData = [];

    // Use a for...of loop to properly await each API request
    for (let coin of coins) {
      try {
        const response = await axios.get(url, {
          params: {
            ids: coin,
            vs_currencies: "usd",
            include_market_cap: "true",
            include_24hr_change: "true",
          },
          ...options, // Apply the options properly
        });

        // Add the response data to the coinData array
        coinData.push({
          coin,
          price: response.data[coin].usd,
          marketCap: response.data[coin].usd_market_cap,
          change24h: response.data[coin].usd_24h_change,
        });
      } catch (err) {
        console.error(`Error fetching data for ${coin}:`, err);
      }
    }

    // Insert each coin's data into MongoDB
    for (let data of coinData) {
      await Crypto.create({
        coin: data.coin,
        price: data.price,
        marketCap: data.marketCap,
        change24h: data.change24h,
      });
    }

    console.log("Coin data successfully stored:", coinData);
    console.log("end");
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
};

export default fetchCryptoData;
