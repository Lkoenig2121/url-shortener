const mongoose = require('mongoose')
const shortId = require('shortid')
         
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
    },   
    short: {
        type: String,
        required: true,
        default: shortId.generate
    } ,
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})       
// The following line hooks up the database and the model (which we just wrote above)
module.exports = mongoose.model('ShortUrl', shortUrlSchema)