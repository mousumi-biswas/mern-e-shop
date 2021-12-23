const Category = require("../models/Category");
const Sub = require("../models/Sub");
const Product = require("../models/Product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    res.status(400).send("Create category failed");
  }
};
exports.list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();

  const products = await Product.find({ category })
    .populate("category")
    .populate("postedBy", "_id name")
    .exec();

  res.json({
    category,
    products,
  });
};
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updateCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    res.json(updateCategory);
  } catch (err) {
    res.status(400).send("Category Update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleteCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleteCategory);
  } catch (err) {
    res.status(400).send("Category Deletion failed");
  }
};

exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
