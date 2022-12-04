const prod = require("../model/product-model");
const User = require("../model/user-model");

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, type, image_url, manufacture, weight } = req.body;
    console.log("new Product", req.body);

    if (!name || !description || !type || !image_url || !manufacture || !weight) {
      return res.status(401).json({ message: "Please enter all fields" });
    }

    const user = await User.findOne({ email: manufacture });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const newProd = await prod.create({
      name,
      manufacture,
      image_url,
      type,
      description,
      count: 1,
      weight,
    });

    if (newProd) {
      // updating the product array
      user.products.push(newProd._id);

      // updating the total waste
      if (type === "medical") {
        user.wasteType.medical += 1;
      } else if (type === "ewaste") {
        user.wasteType.ewaste += 1;
      } else if (type === "plastic") {
        user.wasteType.plastic += 1;
      } else if (type === "paper") {
        user.wasteType.paper += 1;
      } else if (type === "metal") {
        user.wasteType.metal += 1;
      } else if (type === "glass") {
        user.wasteType.glass += 1;
      } else if (type === "cardboard") {
        user.wasteType.cardboard += 1;
      }

      // update counter
      // updating the recycled waste
      // updating the total waste

      await user.save();
      console.log("user3", user);

      return res.status(201).json({
        _id: newProd._id,
        name: newProd.name,
        url: newProd.image_url,
        type: newProd.type,
        manufacture: newProd.manufacture,
        count: newProd.count,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Product not found",
    });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const product = await prod.findById(id);
    res.status(200).json({
      singleProd: product,
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

const companyProduct = async (req, res) => {
  const { email } = req.params;
  console.log("email", email);

  try {
    const user = await User.findOne({ email }).populate("products");
    console.log("user", user);

    res.status(200).json({ products: user.products });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

const totalWaste = async (req, res) => {
  const { email } = req.body;
  console.log("email", email);
  const arr = [
    {
      month: "Jan",
      waste: 0,
    },
    {
      month: "Feb",
      waste: 0,
    },
    {
      month: "Mar",
      waste: 0,
    },
    {
      month: "Apr",
      waste: 0,
    },
    {
      month: "May",
      waste: 0,
    },
    {
      month: "June",
      waste: 0,
    },
    {
      month: "July",
      waste: 0,
    },
    {
      month: "Aug",
      waste: 0,
    },
    {
      month: "Sep",
      waste: 0,
    },
    {
      month: "Oct",
      waste: 0,
    },
    {
      month: "Nov",
      waste: 0,
    },
    {
      month: "Dec",
      waste: 0,
    },
  ];
  try {
    const user = await User.findOne({ email }).populate("products");

    user.products.map((product) => {
      let month = new Date(product.updatedAt);
      month = month.getMonth();

      arr[month].waste += 1;
    });

    return res.status(200).json({ TotalWaste: arr });
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

module.exports = { createProduct, getProduct, companyProduct, totalWaste };
