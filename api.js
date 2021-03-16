const express = require('express');
const cors = require('cors');
const router = express.Router();



router.use(cors());
router.use(function(req, res, next)
{
    // console.log("Logged");
    next();
})

router.use()