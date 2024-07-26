const Category = require("../models/category")

module.exports = {
    async createCategory(req,res) {
        const {categoryName , description } = req.body
        try {
            let category = await Category.findOne({categoryName})
            if(category) {
                return res.status(400).json({
                    message : "Category Already Exist"
                })
            }
            const newCategory = new Category({
                categoryName :categoryName,
                description : description
            })
            await newCategory.save();
            res.status(200).json({
                newCategory
            })

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
    async getCategory(req,res) {
        try {
            const categories = await Category.find()
            if(categories?.length === 0) {
            return res.status(200).json({
                    message : "Categories Not Found"
                })
            }
            res.status(200).json({
                categories
            })
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
        
    }
}