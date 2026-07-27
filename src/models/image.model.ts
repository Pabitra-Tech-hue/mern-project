import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

export default ImageSchema;