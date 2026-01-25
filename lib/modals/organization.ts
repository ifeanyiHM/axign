import { Schema, model, models } from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Organization =
  models.Organization || model("Organization", organizationSchema);

export default Organization;
