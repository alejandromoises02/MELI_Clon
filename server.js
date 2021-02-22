const express = require("express");
const app = express();
app.use(express.json());
const fetch = require("node-fetch");
const puerto = 3001;
const cors = require("cors");

app.use(cors());

//Get /api/items?q=:query, cosntruye el endpoint para ser usado en la vista de búsqueda: “/items?search=”
app.get("/api/items", (req, res) => {
  try {
    const queryParam = req.query;//Parametro para la busqueda
    const urlItems = `https://api.mercadolibre.com/sites/MLA/search?q=:${queryParam.q}`;
    fetch(urlItems)//Consulta API, armado de endpoint basado en enunciado
      .then((resp) => resp.json())
      .then((data) => {
        const dataEndpoint = {
          results: {
            author: {
              name: "Alejandro",
              lastname: "Fernandez",
            },

            categories: data.available_filters[0]?.values.map(
              (element) => element.name
            ),

            items: [
              data.results.map((element) => ({
                id: element.id,
                title: element.title,
                price: {
                  currency: element.currency_id,
                  amount: Math.trunc(element.price),
                  decimals: element.price - Math.trunc(element.price),
                },
                picture: element.thumbnail,
                condition: element.attributes[2],
                free_shipping: element.shipping.free_shipping,
                address: element.address.state_name,
              })),
            ],
          },
          breadcrumb: data.filters[0]?.values[0].path_from_root.map(
            (element) => element.name
          ),
        };
        res.json(dataEndpoint);
      });
  } catch (error) {//Tratamiento de errores
    console.log("=========================================");
    console.log(error);
    console.log("=========================================");
    res.sendStatus(404);
  }
});


//Get /api/items/:id, cosntruye el endpoint para ser usado en la vista de producto: “/items/:id”
app.get("/api/items/:id", (req, res) => {
  try {
    const id = req.params.id;//Parametro id para la busqueda
    const urlItem = `https://api.mercadolibre.com/items/${id}`;
    const urlDescription = `https://api.mercadolibre.com/items/${id}/description`;
    fetch(urlDescription)//Consulta APIs para obtener datos y descripcion para armado de endpoint basado en enunciado
      .then((resp) => resp.json())
      .then((categories) =>
        fetch(urlItem)
          .then((resp) => resp.json())
          .then((data) => {
            const dataEndpoint = {
              author: {
                name: "Alejandro",
                lastname: "Fernandez",
              },
              item: {
                id,
                title: data.title,
                price: {
                  currency: data.currency_id,
                  amount: Math.trunc(data.price),
                  decimals: data.price - Math.trunc(data.price),
                },
                picture: data.thumbnail,
                condition: data.condition,
                free_shipping: data.shipping.free_shipping,
                sold_quantity: data.sold_quantity,
                description: categories.plain_text,
                category: data.category_id,
              },
              breadcrumb: {},
            };

            const urlCategories = `https://api.mercadolibre.com/categories/${dataEndpoint.item.category}`;
            fetch(urlCategories)
              .then((resp) => resp.json())
              .then((data) => {
                dataEndpoint.breadcrumb = data.path_from_root.map(
                  (element) => element.name
                );
                res.json(dataEndpoint);
              });
          })
      );
  } catch (error) {//Tratamiento de errores
    console.log("=========================================");
    console.log(error);
    console.log("=========================================");
    res.sendStatus(404);
  }
});

app
  .listen(puerto, () => {//Levantado el server para servir los endpoints al Front
    console.log("=========================================");
    console.log(`Servidor esuchando, puerto ${puerto}`);
    console.log("=========================================");
  })
  .on("error", (err) => {//Tratamiento de error
    //
    console.log("=========================================");
    console.log(err.code);
    console.log("=========================================");
  });
