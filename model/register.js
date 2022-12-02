const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
{
    name: { type: String },
    emailId: { type: String,index: true },
    password: { type: String },
    createdAt: { type: Date, default: Date.now }
},
{ versionKey: false }
);

registerSchema.index({ emailId: 1 });

module.exports = mongoose.model("createUser",registerSchema, "userschema");
