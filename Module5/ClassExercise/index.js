const express = require("express");
const app = express();
const port = 3000;
const testRoutes = require("./routes/myTestRoutes");
const calculatorRoutes = require("./routes/calculatorRoutes");

app.use("/", express.static("public"));

app.use("/mytest", testRoutes);
app.use("/calculator", calculatorRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
