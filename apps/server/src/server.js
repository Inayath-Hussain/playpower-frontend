const express = require("express");
const cors = require("cors");
const { getTimeZoneController } = require("./controllers/getTimeZone");

const app = express();


app.use(cors("*"));


app.get("/timezone/search", getTimeZoneController);

const PORT = 8080;


app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))