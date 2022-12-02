const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
{
    title: { type: String,index: true },
    subject: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
},
{ versionKey: false }
);

toDoSchema.index({ title: 1 });

module.exports = mongoose.model("createToDo",toDoSchema, "toDoSchema");
