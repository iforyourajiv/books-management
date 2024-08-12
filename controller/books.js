
const {validationResult} = require("express-validator")
const Book = require("../models/books")
module.exports = {
    async createBook(req,res) {
        const errors =  validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { bookName, price, categoryId , keywords , description , authorId , publishedYear } = req.body;
        try {
            let book = await Book.findOne({bookName})
            if (book) {
                return res
                  .status(400)
                  .json( {message: 'Book already exists'} );
              }
              let newBook = new Book({
                bookName : bookName,
                price : price,
                categoryId : categoryId,
                keywords : keywords,
                description :  description,
                authorId : authorId,
                publishedYear : publishedYear
              })
             await newBook.save();
             res.status(200).json({
                newBook
             })
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },

    async getBooks(req,res) {
        try {
            const books = await Book.find({},{ bookName: 1, price: 1}).populate({
                path: 'categoryId',
                select: ['categoryName','description','-_id']
            })
            if(books?.length === 0) {
            return res.status(200).json({
                    message : "Books Not Found"
                })
            }
            res.status(200).json({
                books
            })
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    },

    async updateBook(req,res) {
        try {
            const { bookId } = req.params;
            const updateData = req.body;
            const isBookExist = await Book.findById(bookId);
            if (!isBookExist) {
                return res.status(400).json({ errors: [{ message: 'Could not find a book by this id' }] });
            }
            // Update the book
            const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
                new: true, // Return the updated document
                runValidators: true // Ensure the update data is validated
            })
            res.json(updatedBook);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
}