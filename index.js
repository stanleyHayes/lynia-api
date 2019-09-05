const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const RoleRoutes = require('./routes/Roles');
const UserRoutes = require('./routes/Users');
const TokenRoutes = require('./routes/Tokens');
const ServicesRoutes = require('./routes/Services');
const ProductsRoutes = require('./routes/Products');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('tiny'));

app.use('/api/v1/roles', RoleRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/tokens', TokenRoutes);
app.use('/api/v1/services', ServicesRoutes);
app.use('/api/v1/products', ProductsRoutes);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(function () {
        console.log("Successfully connected to mongoose");
    }).catch(function (error) {
        console.log(error.message);
    });

app.use(function (req, res, next) {
    let error = new Error("Resource not found");
    error.status = 500 || 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.send({
        error: error.message
    });
});


let PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`Connected to express on port ${PORT}`);
});