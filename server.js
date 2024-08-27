const express = require('express')
const articleRouter = require("./routes/articles")
const mongoose = require('mongoose');
const Article = require('./models/article')
const methodOverride= require('method-override');
const app = express();

require('dotenv').config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const dbName = 'Blog-website';

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.geobv.mongodb.net/${dbName}`, {
    
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.listen(3000);

app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res)=>{
   const articles =await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', {articles:articles})
});

app.use('/articles',articleRouter);