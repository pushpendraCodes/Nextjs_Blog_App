const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const blogSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    userEmail: { type: String, require: true },
    userPic: { type: String, require: true },
    title: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    story: {
      type: String,
      require: true,
    },
    comment: {
      type: [Schema.Types.Mixed],

    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
