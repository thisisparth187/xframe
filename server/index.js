const express = require("express");
const cors = require("cors");
const scrapePost = require("./scrape");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "https://xframe-client.vercel.app/"],
}));

app.use(express.json());

app.post("/api/scrape", async (req, res) => {
  const { url } = req.body;
  if (!url || (!url.startsWith("https://x.com/") && !url.startsWith("https://twitter.com/"))) {
    return res.status(400).json({ error: "Invalid X (Twitter) URL" });
  }

  try {
    const data = await scrapePost(url);
    res.json(data);
  } catch (error) {
    console.error("Scraping failed:", error);
    res.status(500).json({ error: "Failed to scrape post" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
