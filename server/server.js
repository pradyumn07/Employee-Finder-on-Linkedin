const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const SERPAPI_KEY = process.env.SERPAPI_KEY;
const HUNTER_KEY = process.env.HUNTER_KEY;

app.get("/api/employees", async (req, res) => {
  const company = req.query.company;
  if (!company) return res.status(400).json({ error: "Missing company name" });

  try {
    // Get domain using SerpAPI
    const serpRes = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: `official site of ${company}`,
        api_key: SERPAPI_KEY
      }
    });

    const domainUrl = serpRes.data.organic_results?.[0]?.link;
    if (!domainUrl) return res.status(404).json({ error: "Company domain not found" });

    const domain = new URL(domainUrl).hostname;

    // Get employees from Hunter.io
    const hunterRes = await axios.get(`https://api.hunter.io/v2/domain-search`, {
  params: {
    domain: domain,
    api_key: HUNTER_KEY,
    limit: 100 
  }
});


    const employees = hunterRes.data.data.emails.map((e) => ({
      name: e.first_name && e.last_name ? `${e.first_name} ${e.last_name}` : e.value.split("@")[0],
      email: e.value,
      position: e.position,
      linkedin: e.linkedin
    }));

    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employee data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));