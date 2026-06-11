const express = require("express");
const { createClient } = require("redis");
const app = express();
const client = createClient({ url: process.env.REDIS_URL });
client.connect().catch((e) => console.error("redis connect failed", e));
app.get("/", async (_req, res) => {
  try {
    const n = await client.incr("hits");
    res.send("Varity Redis fixture OK: " + n);
  } catch (e) {
    res.status(500).send("REDIS ERROR: " + e.message);
  }
});
app.listen(process.env.PORT || 3000, "0.0.0.0", () => console.log("redis fixture up"));