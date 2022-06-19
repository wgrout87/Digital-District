const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SuperSecret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Turn on routes
app.use(routes);

// Connect to database
sequelize.sync({ force: false }).then(() => {
  // Connect to server
  app.listen(PORT, () => console.log("Now listening"));
});
