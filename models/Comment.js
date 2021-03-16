const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        creater:
       {
           type : ObjectId,
           required : true
       },
       for_post:
       {
           type : ObjectId,
           required : true
       },
       timestamp :
       {
           type : Date,
           default : Date.now
       },
       content :
       {
           type : String,
           required : true
       }
    }
)

module.exports = mongoose.model('Comment', CommentSchema)