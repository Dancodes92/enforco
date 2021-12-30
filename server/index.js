const { db } = require("./db");
const PORT = process.env.PORT || 3001;
const app = require("./app");
const seed = require("../script/seed");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

app.get("/express_backend", (req, res) => {
  res.send({ express: "this it the backend connected to react" });
});

init();
