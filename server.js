console.clear();
const express = require("express");
const app = express();
const gamesRoute = require("./routes/gamesRoutes");
const PORT = 3000;

app.use(express.json());
app.use("/api/v1/games", gamesRoute);

app.listen(PORT, () => {
  console.log("Server running on port 3000 ");
});
