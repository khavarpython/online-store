require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const auth = process.env.API_KEY;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Sneaker API is running" });
});
app.get("/api/sneakers", async (req, res) => {
  var config = {
    method: "get",
    url: "https://api.kicks.dev/v3/stockx/products?display[traits]&display[variants]&display[hidden_variants]&display[identifiers]&display[prices]&display[statistics]&filters=product_type%20=%20%27sneakers%27&sort&page&limit=20&market&currency",
    headers: {
      Authorization: auth,
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data.data);
    })
    .catch(function (error) {
      console.error("API Error:", error.message);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/api/sneakerlist", async (req, res) => {
  let type = req.query.type;
  let url;

  if (type == "Men" || type == "Women" || type == "Kids") {
    url = `https://api.kicks.dev/v3/stockx/products?display[traits]&display[variants]&display[hidden_variants]&display[identifiers]&display[prices]&display[statistics]&query=&filters=%28product_type%20=%20%27sneakers%27%20AND%20gender%20=%20%27${type.toLowerCase()}%27%29&sort&page&limit=70&market&currency`;
  } else if (type == "jordan") {
    url =
      "https://api.kicks.dev/v3/stockx/products?display[traits]&display[variants]&display[hidden_variants]&display[identifiers]&display[prices]&display[statistics]&query=&filters=%28product_type%20=%20%27sneakers%27%20AND%20brand%20=%20%27Jordan%27%29%20&sort&page&limit=70&market&currency";
  } else {
    url =
      "https://api.kicks.dev/v3/stockx/products?display[traits]&display[variants]&display[hidden_variants]&display[identifiers]&display[prices]&display[statistics]&query=&filters=product_type%20=%20%27sneakers%27&sort&page&limit=50&market&currency";
  }

  console.log("API URL:", url);
  var config = {
    method: "get",
    url: url,
    headers: {
      Authorization: auth,
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data.data);
    })
    .catch(function (error) {
      console.error("API Error:", error.message);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/api/search", async (req, res) => {
  let search = encodeURIComponent(req.query.type);

  var config = {
    method: "get",
    url: `https://api.kicks.dev/v3/stockx/products?display[traits]&display[variants]&display[hidden_variants]&display[identifiers]&display[prices]&display[statistics]&query=${search}&filters=product_type%20=%20%27sneakers%27&sort&page&limit&market&currency`,
    headers: {
      Authorization: auth,
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data.data);
    })
    .catch(function (error) {
      console.error("API Error:", error.message);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/api/product", async (req, res) => {
  let id = req.query.id;
  var config = {
    method: "get",
    url: `https://api.kicks.dev/v3/stockx/products/${id}?display[traits]&display[variants]&display[hidden_variants]&display[identifiers]&display[prices]&display[statistics]&market&currency`,
    headers: {
      Authorization: auth,
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data.data);
    })
    .catch(function (error) {
      console.error("API Error:", error.message);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/api/colors", (req, res) => {
  let gend = req.query.gender;
  let bran = req.query.brand;
  let sil = req.query.silhouette;
});

app.post("/stripe/pay", async (req, res) => {
  try {
    const { products } = req.body;
    const items = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: Math.round(product.avg_price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: "http://localhost:5173/",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
