const blogmodel = require("../models/blogmodel")
const cat_model = require("../models/categorymodel")
const mongoose = require("mongoose")


const addblog = async (req, res) => {
    try {
        const { title, discription, cat_id } = req.body;

        if (!title || !discription || !cat_id) {
            return res.send({
                status: false,
                message: "All Fields Required",
            });
        }


        const add = new blogmodel({ title, discription, cat_id, profile: req.file.filename })
        add.save()
        res.send({ status: true, message: "blog add sucessfully", add })
    }
    catch (error) {
        console.log(error);

        res.send({
            status: false,
            message: error.message
        });
    }

}
const add_cat = async (req, res) => {
    try {
        const { cat_name } = req.body

        const adddata = new cat_model({ cat_name })
        adddata.save()

        res.send({ status: true, message: "category added successfully", adddata })

    }
    catch {
        res.send({ status: false, message: "error adding citegry" })

    }
}

const getblog = async (req, res) => {
    try {

        const { cat_id } = req.query;

        let matchCondition = {};

        if (cat_id) {
            matchCondition.cat_id = new mongoose.Types.ObjectId(cat_id);
        }

        const data = await blogmodel.aggregate([
            {
                $match: matchCondition
            },
            {
                $lookup: {
                    from: "categorymodels",
                    localField: "cat_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: {
                    path: "$category",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ]);

        return res.send({
            status: true,
            data
        });

    } catch (error) {

        return res.send({
            status: false,
            message: error.message
        });

    }
};




const getRelatedBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await blogmodel.findById(id);
        if (!blog) {
            return res.json({ status: false, message: "Blog not found" });
        }

        const relatedBlogs = await blogmodel.find({
            cat_id: blog.cat_id,
            _id: { $ne: blog._id }
        }).limit(5);

        return res.json({
            status: true, message: "success", blog, relatedBlogs
        });

    } catch (err) {
        console.log(err);
        return res.json({
            status: false,
            message: "Error fetching related blogs"
        });
    }
};










const updateBlog = async (req, res) => {

    try {

        const updated = await blogmodel.findByIdAndUpdate(

            req.params._id,

            req.body,

            { new: true }

        );

        res.send({

            status: true,

            message: "Updated Successfully",

            data: updated

        });

    }

    catch(error){

        res.send({

            status:false,

            message:error.message

        })

    }

}

const deleteBlog = async (req, res) => {
  try {
    const { _id } = req.params;

    const deldata = await blogmodel.findByIdAndDelete(_id);

    if (!deldata) {
      return res.send({
        status: false,
        message: "Blog not found",
      });
    }

    return res.send({
      status: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.send({
      status: false,
      message: error.message,
    });
  }
};

const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await blogmodel
            .findById(id)
            .populate("cat_id");

        res.send({
            status: true,
            data,
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};

const latestBlogs = async (req, res) => {
    try {
        const data = await blogmodel
            .find()
            .sort({ _id: -1 })
            .limit(5);

        res.send({
            status: true,
            data,
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};

const searchBlog = async (req, res) => {
    try {
        const { keyword } = req.query;

        const data = await blogmodel.find({
            title: {
                $regex: keyword,
                $options: "i",
            },
        });

        res.send({
            status: true,
            data,
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};
const getCategory = async (req, res) => {
    try {
        const data = await cat_model.find();

        res.send({
            status: true,
            data,
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { cat_name } = req.body;

        const data = await cat_model.findByIdAndUpdate(
            id,
            { cat_name },
            { new: true }
        );

        if (!data) {
            return res.send({
                status: false,
                message: "Category not found",
            });
        }

        res.send({
            status: true,
            message: "Category updated successfully",
            data,
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await cat_model.findByIdAndDelete(id);

        if (!data) {
            return res.send({
                status: false,
                message: "Category not found",
            });
        }

        res.send({
            status: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};

const dashboard = async (req, res) => {
    try {
        const totalBlogs = await blogmodel.countDocuments();

        const totalCategories =
            await cat_model.countDocuments();

        const latestBlogs = await blogmodel
            .find()
            .sort({ _id: -1 })
            .limit(5);

        res.send({
            status: true,
            totalBlogs,
            totalCategories,
            latestBlogs,
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};


module.exports = {
    addblog,
    getblog,
    add_cat,
    updateBlog,
    deleteBlog,
    getRelatedBlog,
    getSingleBlog,
    latestBlogs,
    searchBlog,
    getCategory, updateCategory, deleteCategory, dashboard
};