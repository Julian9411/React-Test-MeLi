const express = require("express");
const axios = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api/items", async (req, res) => {
  let data = {
    author: {
      name: "Julian",
      lastname: "Clavijo",
    },
  };

  const url = req.query.hasOwnProperty("q")
    ? `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&available_filters=category`
    : `https://api.mercadolibre.com/sites/MLA/search?category=${req.query.categories}`;

  await axios.get(url).then((rest) => {
    data.categories = rest.data.available_filters[0].values;
    data.items = rest.data.results.splice(0, 4).map((item) => {
      const prices = item.price.toString().split(".");
      const address = `${item.address.state_name} - ${item.address.city_name}`;

      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: prices[0],
          decimals: prices[1],
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        address,
      };
    });
  });
  return res.json(data);
});

app.get("/api/items/:id", async (req, res) => {
  let finalData = {
    author: {
      name: "Julian",
      lastname: "Clavijo",
    },
  };
  let category_id;
  await axios
    .get(`https://api.mercadolibre.com/items/${req.params.id}`)
    .then((rest) => {
      const { data } = rest;
      const prices = data.price.toString().split(".");
      category_id = data.category_id;
      finalData.item = {
        id: data.id,
        title: data.title,
        price: {
          currency: data.currency_id,
          amount: prices[0],
          decimals: prices[1],
        },
        picture: data.pictures[0].secure_url,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
      };
    });

  await axios
    .get(`https://api.mercadolibre.com/items/${req.params.id}/description`)
    .then((rest) => {
      finalData.item.description = rest.data.plain_text;
    });

  await axios
    .get(`https://api.mercadolibre.com/categories/${category_id}`)
    .then((rest) => {
      finalData.categories = rest.data.path_from_root;
    });
  return res.json(finalData);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
