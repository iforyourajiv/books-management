const express = require('express');
const router  = express.Router();
const {createBook,getBooks,updateBook} = require('../controller/books');
const auth = require('../middleware/auth')
const {check} = require ('express-validator')

const validations = [
    check('bookName', 'Title must be between 2 to 100 characters ').isLength ( {
        min : 2,
        max : 100
    })
]
router.post("/",validations,createBook) // Validation Middleware declared
router.get("/",auth,validations,getBooks)
router.put("/:bookId",updateBook)
module.exports = router