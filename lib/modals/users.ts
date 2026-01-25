import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    userStatus: {
      type: String,
      enum: ["ceo", "employee"],
      default: "ceo",
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    password: { type: String, required: true },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    approvalToken: { type: String },
    approvalTokenExpires: { type: Date },
    activationToken: { type: String },
    activationTokenExpires: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  {
    timestamps: true,
  },
);

if (models.User) {
  delete models.User;
}

const User = model("User", userSchema);

export default User;
