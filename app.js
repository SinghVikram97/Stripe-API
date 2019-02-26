const express = require("express");
const keys = require("./config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const bodyParser = require("body-parser");
const cors = require("cors");
const exphbs = require("express-handlebars");

const app = express();

// Handlebar middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Cross Origin request middleware
app.use(cors());

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get("/", (req, res) => {
  res.render("index", {
    stripePublishableKey: keys.stripePublishableKey
  });
});

// Charge Route
app.post("/charge", (req, res) => {
  const amount = 2500;

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Web Development Ebook",
        currency: "usd",
        customer: customer.id
      })
    )
    .then(charge => res.render("success"));
});

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log("Server started on http://localhost:5555");
});
