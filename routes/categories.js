const express = require("express");
const router = express.Router();
const {createCategory,getCategory} = require("../controller/categories")


router.post("/",createCategory);
router.get("/",getCategory);

module.exports = router