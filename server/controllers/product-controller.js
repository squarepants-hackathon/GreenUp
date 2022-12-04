const prod = require("../model/product-model");
const User = require("../model/user-model");
const recycle = require("../model/recycle-model");

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, type, image_url, manufacture, weight } =
      req.body;
    console.log("new Product", req.body);

    if (
      !name ||
      !description ||
      !type ||
      !image_url ||
      !manufacture ||
      !weight
    ) {
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

const recycledWaste = async (req, res) => {
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
    const user = await User.findOne({ email }).populate("recycledWaste");
    
    user.recycledWaste.map((product) => {
      let month = new Date(product.updatedAt);
      month = month.getMonth();

      arr[month].waste += 1;
    });

    console.log("recyce", arr);
    return res.status(200).json({ RecycledWaste: arr });
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

const updateCount = async (req, res) => {
  const { id, count, email } = req.body;
  console.log("count", req.body);
  try {
    if (count === 0) {
      await prod.findByIdAndDelete(id);
      return res.status(200).json({
        updated: true,
      });
    }

    let product = await prod.findById(id);

    if (product.count < count) {
      let user = await User.findOne({ email });
      user.totalWaste += count - product.count;
      user.save();
    }

    product.count = count;

    product.save();

    return res.status(200).json({
      updated: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

const recycledWasteFunc = async (req, res) => {
  const { email, id, count } = req.body;
  console.log("recycle", req.body);
  try {
    if (count === 0) {
      return res
        .status(200)
        .json({ message: "count cannot be zero", updated: false });
    }

    const newRecycle = await recycle.create({
      count,
    });

    const user = await User.findOne({ email });
    console.log("user", user);
    user.recycledWaste.push(newRecycle._id);
    user.save();

    let product = await prod.findById(id);
    product.count = count;
    product.save();

    if (count <= 0) {
      await prod.findByIdAndDelete(id);
    }

    return res.status(200).json({ message: "", updated: true });
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

module.exports = {
  createProduct,
  getProduct,
  companyProduct,
  totalWaste,
  updateCount,
  recycledWasteFunc,
  recycledWaste,
};
