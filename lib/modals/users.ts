import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    companyName: { type: String },

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

    // ✅ Profile fields
    phone: { type: String },
    location: { type: String },
    position: { type: String },
    department: { type: String },
    bio: { type: String, maxlength: 500 },
    avatar: { type: String },
    userActiveStatus: {
      type: String,
      enum: ["active", "inactive", "onleave"],
      default: "active",
    },
    tasksAssigned: { type: Number },
    tasksCompleted: { type: Number },
    performanceRating: { type: Number },

    isEmailVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },

    emailVerificationToken: String,
    emailVerificationExpires: Date,
    approvalToken: String,
    approvalTokenExpires: Date,
    activationToken: String,
    activationTokenExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

if (models.User) delete models.User;

const User = model("User", userSchema);
export default User;

// import { model, models, Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     username: { type: String, required: true },
//     userStatus: {
//       type: String,
//       enum: ["ceo", "employee"],
//       default: "ceo",
//       required: true,
//     },
//     organizationId: {
//       type: Schema.Types.ObjectId,
//       ref: "Organization",
//       required: true,
//     },
//     password: { type: String, required: true },
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//     isApproved: {
//       type: Boolean,
//       default: false,
//     },
//     emailVerificationToken: { type: String },
//     emailVerificationExpires: { type: Date },
//     approvalToken: { type: String },
//     approvalTokenExpires: { type: Date },
//     activationToken: { type: String },
//     activationTokenExpires: { type: Date },
//     passwordResetToken: { type: String },
//     passwordResetExpires: { type: Date },
//   },
//   {
//     timestamps: true,
//   },
// );

// if (models.User) {
//   delete models.User;
// }

// const User = model("User", userSchema);

// export default User;
