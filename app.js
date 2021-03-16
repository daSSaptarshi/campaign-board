// Import modules
const express       = require('express');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const path          = require('path');
const mongoose      = require('mongoose');
// const MongoClient   = require('mongodb').MongoClient;
const CONFIG        = require('./config');

// Set PORT
const port          = CONFIG.PORT;

//Initialize App
const app           = express();

// App meiddlelwires
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Serve APIs
app.use('/profile', require('./routes/profileRoutes'));
app.use('/post', require('./routes/postRoutes'));
app.use('/comment', require('./routes/commentRoute'));

// Connect to Database
mongoose.connect(CONFIG.MONGO_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected at cloud"))
.catch(err => console.log(err));

// Serve Static Files
app.use(express.static('frontend/dist'));
app.get("*", (req, res) => 
{
    res.sendFile(path.resolve(__dirname,  "frontend" ,"dist", "index.html"));
});

// Start App 
app.listen(port, () => console.log(`Server is listening on PORT ${port}`))
