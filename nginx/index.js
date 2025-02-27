const express = require("express");
const cors = require("cors");
const app = express();

const replicaAPPName = `replica = ${process.env.APP_NAME}`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send(`server is healthy . Replica Name ${replicaAPPName}`);
});

app.listen(4000, () => {
  console.log(`Server is running on port 4000 ${replicaAPPName}`);
});
