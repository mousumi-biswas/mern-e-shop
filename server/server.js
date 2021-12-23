const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

//initialize app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middleware

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

//route
app.get("/api", (req, res) => {
  res.json({
    data: "hey you hit node api",
  });
});

//port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));
