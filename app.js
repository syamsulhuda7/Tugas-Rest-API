const express = require('express');
const path = require('path');
const app = express();
const logger = require('morgan');
const productRouter = require('./app/product/routes')

app.use(logger('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname
    , 'uploads')));
app.use('/api/v1', productRouter)
app.use((req, res, next) => {
    res.status(404)
    res.send({
        status: 'failed',
        message: `Resource ${req.originalUrl} not found`
    })
})
app.listen(3001, () => console.log('server: http://localhost:3001'))