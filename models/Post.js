const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
       title : 
       {
           type : String,
           required : true
       },
       content :
       {
           type : String,
           required : true
       },
       timestamp :
       {
           type : Date,
           default : Date.now
       },
       creater:
       {
           type : ObjectId,
           required : true
       },
       is_advertisement : 
       {
           type : Boolean,
           default : false
       },
       is_approved :
       {
           type : Boolean,
           default : false
       },
       upvote :
       {
           type : Number,
           default : 0
       }
    }
)

module.exports = mongoose.model('Post', PostSchema)