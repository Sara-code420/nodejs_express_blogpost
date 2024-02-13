const express = require("express");
const bodyParser = require("body-parser");
const createRoutes = require("./routes/create");
const homeRoutes = require("./routes/home");
const postRoutes = require("./routes/posts");


const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(homeRoutes);

app.use("/create",createRoutes);
//app.use("/create",homeRoutes);
app.use("/posts", postRoutes);



app.listen(3000);