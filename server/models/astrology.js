const mongoose = require('mongoose')
const Schema = mongoose.Schema
// astrology schema for the astrologies collection
const Astrology = new Schema(
    {
        order:Number,
        sign: String,
        date: String,
        desc:Array,
        inner:String,
        others:String,
        duality: String,
        triplicity:String,
        quadruplicity: Array,
        ruling: String,
        symbol: String,
        glyph: Array,
        dominant:String,
        polarity: String,
        body: String,
        day: String,
        number:String,
        birthstone: String,
        color: String,
        cities: String,
        countries: String,
        flowers: String,
        trees: String, 
        metal: String,
        animals: String,
        danger: String,
        trait: String,
        famous: String
    }
)

module.exports = mongoose.model('astrology', Astrology)