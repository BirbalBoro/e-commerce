const category_model = require("../models/category.model");

//creating a new category
const create_category_controller = async(req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(500).send({
                message: "Name of a category cannot be empty",
            });
        }

        //check for the existing category
        const existing_category = await category_model.findOne({ name });
        if (existing_category) {
            return res.status(200).send({
                success: true,
                message: "Category already exists",
            });
        }

        //Save or input the new category into the database
        const category = await new category_model({ name, }).save();
        res.status(201).send({
            success: true,
            message: "New category created successfully",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while creating category",
            error,
        });
    }
}

//updating a existing category
const update_category_controller = async(req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params; //requesting category id from url parameter
        
        //update the category name using id of a category
        const category = await category_model.findByIdAndUpdate(id, { name }, { new: true });

        res.status(200).send({
            success: true,
            message: "Category successfully updated",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while updating category",
        })
    }
}

//functionality for getting a particular category using id
const single_category_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await category_model.findById(id);

        res.status(201).send({
            success: true,
            message: "Category has been successfully loaded",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while getting single category"
        })
    }
}

//functionality for getting all existing categories
const all_category_controller = async(req, res) => {
    try {
        //getting all the existing categories
        const category = await category_model.find({});

        res.status(201).send({
            success: true,
            message: "List of categories successfully loaded",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while getting all the categories",
        })
    }
}

//functionality to find a particular category by id and delete
const delete_category_controller = async (req, res) => {
    try {
        const { id } = req.params;
        await category_model.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Category has been successfully deleted",
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while trying to delete category",
        })
    }
}


module.exports = {
    create_category_controller,
    update_category_controller,
    single_category_controller,
    all_category_controller,
    delete_category_controller
};