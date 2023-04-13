const product_model = require('../models/product.model');
const fs = require('fs');

//functionality for creating a new product
const create_product_controller = async (req, res) => {
    try {

        //destruturing all the records using fields
        const { name, price, description, category, quantity, shipping } = req.fields;
        
        //destructuring image or video or other files using files
        const { thumbnail } = req.files;

        //server side validation
        switch (true) {
            case !name:
                return res.send({ message: "Product name is required" });
            case !price:
                return res.send({ message: "Product price is required" });
            case !description:
                return res.send({ message: "Product description is required" });
            case !category:
                return res.send({ message: "Product category name is required" });
            case !quantity:
                return res.send({ message: "Product quantity is required" });
            case thumbnail:
                return res.send({ message: "Product thumbnail is required" });
        }

        const product = product_model({ ...req.fields });

        if (thumbnail) {
            product.thumbnail.data = fs.readFileSync(thumbnail.path);
            product.thumbnail.contentType = thumbnail.type;
        }

        await product.save();

        res.status(200).send({
            success: true,
            message: "Product has been successfully created",
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while creating a product"
        })
    }
}


//functionality for getting a single product using id
const single_product_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await product_model.findById(id).select("-thumbnail").populate('category');

        res.status(200).send({
            success: true,
            message: "Product is successfully loaded",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while trying to load a product"
        })
    }
}


//funcitonality for getting all the products
const all_product_controller = async (req, res) => {
    try {
        
        const product = await product_model.find({}).select("-thumbnail").populate('category').sort({ createdAt: 1 });

        res.status(200).send({
            success: true,
            message: "All products are successfully loaded",
            counTotal: product.length,
            product,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while trying to load all the products",
        })
    }
}

//functionality for getting a thumbnail for a product using product id
const thumbnail_product_controller = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await product_model.findById(id).select('thumbnail');

        //check if thumbnail is found or not
        if(product.thumbnail.data){
            res.set("content-type", product.thumbnail.contentType);

            return res.status(200).send(
                product.thumbnail.data
            )
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while trying to get product thumbnail",
            error
        })
    }
}


//functionality for deleting a particular product
const delete_product_controller = async (req, res) => {
    try {
        const { id } = req.params;
        await product_model.findByIdAndDelete(id).select("-thumbnail");

        res.status(200).send({
            success: true,
            message: "Product is successfully deleted",
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while trying to delete a product",
            error,
        })
    }
}

//functionality for updating a product using id
const update_product_controller = async (req, res) => {
    try {

        // destruturing all the records using fields
        const { name, price, description, category, quantity, shipping } = req.fields;
        
        // destructuring image or video or other files using files
        const { thumbnail } = req.files;

        // server side validation
        switch (true) {
            case !name:
                return res.send({ message: "Product name is required" });
            case !price:
                return res.send({ message: "Product price is required" });
            case !description:
                return res.send({ message: "Product description is required" });
            case !category:
                return res.send({ message: "Product category name is required" });
            case !quantity:
                return res.send({ message: "Product quantity is required" });
            case thumbnail:
                return res.send({ message: "Product thumbnail is required" });
        }
        const { id } = req.params;

        const product = await product_model.findByIdAndUpdate(id, {...req.fields}, {new: true});

        if (thumbnail) {
            product.thumbnail.data = fs.readFileSync(thumbnail.path);
            product.thumbnail.contentType = thumbnail.type;
        }

        await product.save();

        res.status(201).send({
            success: true,
            message: "Product has been successfully updated",
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error has occured while updating a product"
        })
    }
}


module.exports = {
    create_product_controller,
    single_product_controller,
    all_product_controller,
    thumbnail_product_controller,
    delete_product_controller,
    update_product_controller
}