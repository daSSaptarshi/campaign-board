// Import modules
const { ObjectId } = require('bson');
const { ObjectID } = require('bson');
const express = require('express');
const router = express.Router();
const CONFIG = require('../config');
const Post = require('../models/Post');

// Create Post Route
router.post(CONFIG.apis.postApis.create, async (req, res) => {
    try {
        let newPost = new Post(
            {
                title: req.body.title,
                content: req.body.content,
                creater: req.body.creater,
                is_advertisement: req.body.is_advertisement
            }
        )
        res.status(201).json(await newPost.save())
    }
    catch (err) {
        res.status(500).json({ message: "Error occured in creating new post", error: err.message })
    }
})

// Update Post Route
router.patch(CONFIG.apis.postApis.update, async (req, res) => {
    try {
        Post.findByIdAndUpdate(
            {
                _id: req.body.id
            },
            {
                title: req.body.title,
                content: req.body.content,
            }
        ).exec().then(
            (i) =>
                res.status(201).json(i)
        );
    }
    catch (err) {
        res.status(500).json({ message: "Error occured in creating new post", error: err.message })
    }
})

// Approve Post Route
router.patch(CONFIG.apis.postApis.approve, async (req, res) => {
    try {
        Post.findByIdAndUpdate(
            req.params.id,
            {
                is_approved: true
            }
        ).exec().then(
            (i) =>
                res.status(201).json(i)
        );
    }
    catch (err) {
        res.status(500).json({ message: "Error occured in creating new post", error: err.message })
    }
})

// Get All posts
router.get(CONFIG.apis.postApis.getAll, async (req, res) => {
    try {
        res.status(200).send(
            await Post.aggregate([
                { $match : { is_approved : true } },
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "creater",
                        foreignField: "_id",
                        as: "creater_details"
                    }
                }
            ])
        );
    }
    catch (err) {
        res.status(500).json({ message: "Error occured while fetching posts" })
    }
})

router.get(CONFIG.apis.postApis.getAllPending, async (req, res) => {
    try {
        res.status(200).send(
            await Post.aggregate([
                { $match : { is_approved : false } },
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "creater",
                        foreignField: "_id",
                        as: "creater_details"
                    }
                }
            ])
        );
    }
    catch (err) {
        res.status(500).json({ message: "Error occured while fetching posts" })
    }
})

// Delete Post Route
router.delete(CONFIG.apis.postApis.delete, async (req, res) => {
    try {
        Post.deleteOne({ "_id": ObjectID(req.params.id) })
            .exec()
            .then((i) => {
                console.log(i)
            })
    }
    catch (err) {
        res.status(500).json({ message: "Error occured while deleting record", error: err.message })
    }
})

// Upvote Post Route
router.patch(CONFIG.apis.postApis.upvote, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                $inc: { 'upvote': 1 }
            }
        )
            .exec()
        res.status(200).json({ id: req.params.id })

    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router