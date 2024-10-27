const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const urlRoutes = require("./routes/url.routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/__healthz", (req, res) => {
    res.json({ success: true })
})

app.use(bodyParser.json());

app.use("/", urlRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})