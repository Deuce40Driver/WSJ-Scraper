// Dependencies
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const request = require("request")
const cheerio = require("cheerio");
const db = require("./models");
const PORT = 3000;

//Initialize express
const app = express();

// Middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/WSJscraper");
/*    
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);                    
*/
// GET route to scrape the Wall Street Journal What's News page. 
app.get("/scrape", function(req, res) {
    // Request for WSJ.com's What's News webpage
    request("https://www.wsj.com/news/whats-news", function(error, response, html) {
    // Load the body of the HTML into cheerio
    var $ = cheerio.load(html);
    // Empty array to save scraped data
    var results = [];
    // Using cheerio to find each div-tag with the class "headline-container" then looping through the results
    $("div.headline-container").each(function(i, element) {
      // Find the first child h3-tag, and set its text value as "title"
      var title = $(element).find("h3").text();
      // Find the first child a-tag, and save its href value as "link"
      var link = $(element).find("a").attr("href");
      // Find the first child p-tag, and save its text value as "summary"
      var summary = $(element).find("p").text();
      // Making an object with the data scraped from WSJ.com and pushing it to the results array
      results.push({
        title: title,
        link: link,
        summary: summary
      });
    });

    // Add results to the Article collection of the database
    db.Article.create(results).then(function(dbArticles) {
      console.log(dbArticles)
    }).catch(function(err) {
      res.json(err);
    });

  });

  res.sendFile(__dirname + '/public/index.html');

});

// Route to show all scraped articles in the database
app.get("/articles", function(req, res) {
  db.Article.find({}).then(function(dbArticles) {
    res.json(dbArticles);
  }).catch(function(err) {
    res.json(err);
  })
})

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});