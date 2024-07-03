import Category from "../models/category.js";

class CategoryController {
    
    getCategoryById = (req, res, next, id) => {
        Category.findById(id).exec((err, cate) => {
            console.log("Category ID:", id);  // Debugging line
            if (err) {
                return res.status(400).json({
                    err: "Category not Found"
                })
            } 
            console.log("Category found:", cate);  // Debugging line
            req.category = cate;
            next();
        })
    }

    createCategory = (req, res) => {
        const category = new Category(req.body);
        category.save((err, category) => {
            if (err) {
            return res.status(400).json({
                error: "NOT able to save category in DB"
            });
            }
            res.json({ category });
        });
    }

    getCategory = (req, res) => {
        return res.json(req.Category);
    }

    getAllCategory = (req, res) => {
        Category.find.exec((err, categories) => {
            if (err) {
                return res.status(400).json({
                    err: "No categories"
                })
            }
            res.json(categories);
        })
    }

    updateCategory = (req, res) => {
        const category = req.category;
        console.log('Category before update:', category);  // Debugging line
        if (!category) {
            return res.status(400).json({
                error: "Category not found"
            });
        }
        category.name = req.body.name;

        category.save((err, updateCategory) => {
            if (err) {
                return res.status(400).json({
                    err: "Can't execute it"
                })
            }
            res.json(updateCategory);
        })

    }

    removeCategory = (req, res) => {
        const category = req.category;

        category.remove((err, category) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to delete this category"
                });
            }
            res.json({
            message: "Successfull deleted"
        });
    });
    };
}

export default new CategoryController();