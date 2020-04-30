const express = require("express");
const PORT = process.env.PORT || 8080;

const db = require("./db.js");
const controller = require('./controller/library.controller.js')

const userRouter = require('./routes/users/users.route.js')
const bookRouter = require('./routes/book/book.route.js')
const transectionRoute = require("./routes/transection/index.route.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));


app.get("/", controller.server);

app.use("/transection", transectionRoute);

app.use('/book', bookRouter)

app.use("/users", userRouter)

app.listen(PORT, () => {
  console.log("Service running on PORT:" + PORT);
});
