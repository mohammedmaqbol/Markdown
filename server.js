const express        = require('express')
const mongoose       = require('mongoose')
const m_Override = require('method-override')
const app            = express()
const port           = process.env.PORT || 3000
const articlesRoutes = require('./routes/articles')
const Article        = require('./models/article')


app.use(express.urlencoded({ extended :false}))
app.set('view engine' ,'ejs')
app.use(m_Override('_method'))
app.use('/articles', articlesRoutes)
app.get('/', async(req, res)=>{
    const articles = await Article.find().sort({ createdAt :'desc'}) 
    res.render('articles/index', {articles : articles})
})
try {
    app.listen(port)
    mongoose.connect('mongodb://127.0.0.1:27017/blog',{
        useNewUrlParser:true, useUnifiedTopology:true
})
    console.log('SERRVER AND DB RUNNING..');

} catch(err){

    console.log(err)
}