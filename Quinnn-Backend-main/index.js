const express = require('express');

const swaggerUi = require('swagger-ui-express');

const cors = require('cors');

const YAML = require('yamljs');

// Local functions
const connectDB = require("./db");
const logger = require('./logger');
const bodyParser = require('body-parser');

connectDB();
const app = express();

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const port = process.env.PORT || 9999;
const swaggerDocument = YAML.load('./swagger.yml');

// Routes

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/user', require('./routes/user'));

app.use('/api/post', require('./routes/post'));

app.use('/api/comment', require('./routes/comment'));

app.use('/api/event', require('./routes/event'));

app.use('/api/blog', require('./routes/blog'));

app.use('/api/', require('./routes/common'));


app.get('/', (req, res) => {
    res.send('Welcome to the PrideHub Server. Server is running!');
});


app.listen(port, () => {
    logger.info(`🚀 Server running on port ${port}`);
});

app.use('/api/auth', (req, res, next) => {
    console.log('Received request:', req.method, req.url);
    next();
}, require('./routes/auth'));
