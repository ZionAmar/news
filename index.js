const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require('body-parser');
const path = require("path");
const moment = require('moment-timezone');
const nodemailer = require('nodemailer'); // ייבא את הספריה
const Parser = require('rss-parser');
const parser = new Parser();
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine","ejs");
let db_M = require('./database');
global.db_pool = db_M.pool;
const port = 5353;
app.use(express.json());
app.listen(port, () => {
  console.log(`Now listening on port http://localhost:${port}`);
});


app.get("/", (req, res) => {
  res.render("news", { pageTitle: "news" });
});



app.get('/news', async (req, res) => {
  const rssFeedUrl = req.query.url;
  console.log(rssFeedUrl);
  try {
    const feed = await parser.parseURL(rssFeedUrl);

    const items = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
    }));

    res.json({ items });
  } catch (error) {
    console.error('Error fetching and parsing RSS feed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

