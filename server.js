const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
         
mongoose.connect('mongodb+srv://LukasFKoenig:Kobes777@cluster0.v8q6pmv.mongodb.net/test', {
    useNewUrlParser: true, useUnifiedTopology: true
})       
         
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
         
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find() // This gets all the short Urls
    res.render('index', { shortUrls: shortUrls })
})       
         
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
         
    res.redirect('/')
})
         
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
         
    shortUrl.clicks++
    shortUrl.save()
         
    res.redirect(shortUrl.full)
})
         
app.listen(process.env.PORT || 3000);