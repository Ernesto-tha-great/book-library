if (process.env.NODE_ENV !== 'production' ) {
    require ('dotenv').config()
}

const express = require('express');
const port = process.env.PORT || 3000
const app = express();
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')


app.set('view engine', 'ejs') //sets the view engine 
app.set('views', __dirname + '/views') //sets where the views will be coming from
app.set('layout', 'layouts/layout' )//every file will be put here so we dont have to duplicate parts of the html such as the header and footer
app.use(expressLayouts)
app.use(express.static('public'))



const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose') )
app.use('/', indexRouter)

app.listen(port, () => console.log( `server is running on ${port}`))