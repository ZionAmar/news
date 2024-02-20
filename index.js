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
const port = 5656;
app.use(express.json());
app.listen(port, () => {
  console.log(`Now listening on port http://localhost:${port}`);
});


app.get("/", (req, res) => {
  res.render("news", { pageTitle: "news" });
});



app.get('/news', async (req, res) => {
  const rssFeedUrl = req.query.url;
  const siteName = req.query.siteName;
  const userName = req.query.userName;
  // console.log(rssFeedUrl);
  try {
    const feed = await parser.parseURL(rssFeedUrl);

    const items = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
    }));

    res.json({ items });

    // שליחת המייל
    await sendEmail(siteName,userName);
  } catch (error) {
    console.error('Error fetching and parsing RSS feed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// יצירת משתנים להגדרות שרת המייל
const emailUsername = 'mybusiness@ez4tackit.com'; // שם משתמש לחשבון המייל
const emailPassword = 'Zion.1460'; // סיסמה לחשבון המייל
const emailService = 'cpanel'; // שימוש בשירות המייל שצוין
const emailHost = 'rs10-nyc.serverhostgroup.com'; // שם השרת (רק אם אינך משתמש בשירות מוכן)
const emailPort = 587; // הפורט של השרת (עם SSL/TLS)
const isSecure = false; // משתמשים ב-SSL/TLS

// הגדרת ה-transporter עם הגדרות המייל המוגדרות מראש
const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: isSecure,
  service: emailService,
  auth: {
    user: emailUsername,
    pass: emailPassword,
  }
});


// פונקציה לשליחת המייל
async function sendEmail(siteName,userName) {
  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Jerusalem",
  };
  const dateTime = new Intl.DateTimeFormat("he-IL", options).format(
      currentDate
  );
  // פרטי המייל
  console.log('Site Name:', siteName);
  console.log('Date Time:', dateTime);
  console.log('user Name:', userName);
  const mailOptions = {
    from: emailUsername, // האימייל שלך
    to: 'zion0549774827@gmail.com', // אימייל שבו תרצה לקבל את ההודעה
    subject: 'מבזקים Live',
    html: `<p style="direction: rtl">${userName} כרגע צופה בחדשות באתר<span style="color: red"> ${siteName}</span>.</p>
               <p style="direction: rtl">תאריך ושעה: ${dateTime}</p>`
  };

  // שליחת המייל
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error);
  }
}

