const router = require("express").Router();
const bookRoutes = require("./books");
const searchRoute = require("./search");

// Book routes
router.use("/books", bookRoutes);
router.use("/search", searchRoute);

module.exports = router;
