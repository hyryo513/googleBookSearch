require("dotenv").config();
const router = require("express").Router();
const axios = require("axios");
// Matches with "/api/search"
router.route("/:keyWord")
  .get(function(req, res){
      axios({
        method: "get",
        url: "https://www.googleapis.com/books/v1/volumes?",
        params: {
          key: process.env.googleBookApiKey,
          q: req.params.keyWord,
          maxResults: 5
        }
      })
      .then(function(response) {
        res.send(bookDataParsing(response.data.items));
      })
      .catch(function(error) {
        console.log(error);
      })
    });

function bookDataParsing (bookData) {
    var parsedBooks = [];
    bookData.map(function(bookItem){
        parsedBooks.push({
            id: bookItem.id,
            title: bookItem.volumeInfo.title,
            authors: bookItem.volumeInfo.authors.join(", "),
            description: bookItem.volumeInfo.description,
            image: bookItem.volumeInfo.imageLinks.smallThumbnail,
            link: bookItem.accessInfo.webReaderLink
        });
    });
    return parsedBooks;
};

module.exports = router;
