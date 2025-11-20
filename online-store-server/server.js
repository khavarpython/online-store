require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

const header = {
  "x-rapidapi-key": process.env.VITE_RAPID_KEY,
  "x-rapidapi-host": process.env.VITE_RAPID_HOST,
};

app.get("/api/sneakers", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://the-sneaker-database.p.rapidapi.com/sneakers",
    params: { limit: "20" },
    headers: header,
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sneakers" });
  }
});

app.get("/api/sneakerlist", async (req, res) => {
  let type = req.query.type;
  let param;

  if (type == undefined) {
    url = "https://the-sneaker-database.p.rapidapi.com/sneakers";
    param = { limit: "50" };
  } else if (type == "jordan") {
    url = "https://the-sneaker-database.p.rapidapi.com/sneakers";
    param = {
      limit: "50",
      brand: "jordan",
    };
  } else if (type == "Men" || type == "Women" || type == "Kids") {
    url = `https://the-sneaker-database.p.rapidapi.com/sneakers`;
    param = {
      limit: "50",
      gender: type,
    };
  }

  const options = {
    method: "GET",
    url: url,
    params: param,
    headers: header,
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sneakers" });
  }
});

app.get("/api/search", async (req, res) => {
  let search = req.query.search;
  const options = {
    method: "GET",
    url: "https://the-sneaker-database.p.rapidapi.com/search",
    params: {
      limit: "100",
      query: search,
    },
    headers: header,
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      res.json(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();
});

app.get("/api/product", async (req, res) => {
  let id = req.query.id;
  const options = {
    method: "GET",
    url: `https://the-sneaker-database.p.rapidapi.com/sneakers/${id}`,
    headers: header,
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      res.json(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();
});

app.get("/api/colors", (req, res) => {
  let gend = req.query.gender;
  let bran = req.query.brand;
  let sil = req.query.silhouette;

  const options = {
    method: "GET",
    url: "https://the-sneaker-database.p.rapidapi.com/sneakers",
    params: {
      limit: "15",
      gender: gend,
      silhouette: decodeURIComponent(sil),
      brand: decodeURIComponent(bran),
    },
    headers: header,
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      res.json(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
