import mongoose from "mongoose";
import ImageSchema from "./image.model";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [200, "Name cannot exceed 200 characters"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [
        50,
        "Description must be at least 50 characters long",
      ],
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: [true, "Brand is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },

    cover_image: {
      type: ImageSchema,
      required: [true, "Cover image is required"],
    },

    images: [
      {
        type: ImageSchema,
      },
    ],

    is_featured: {
      type: Boolean,
      default: false,
    },

    new_arrival: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model("product", productSchema);

export default Product;