const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const {xss} = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const coworkingspaces = require('./routes/coworkingspaces');
const auth = require('./routes/auth');
const reservations = require('./routes/reservations');
const users = require('./routes/users');
const transactions = require('./routes/transactions');
const premiumtransactions = require('./routes/premiumtransactions');
const cron = require('./routes/cron');

// Load env vars
dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
  }));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

//Body parser
// app.use(express.json());

//sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 1000
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

app.use('/api/coworkingspaces', coworkingspaces);
app.use('/api/auth', auth);
app.use('/api/reservations', reservations);
app.use('/api/users', users);
app.use('/api/transactions', transactions);
app.use('/api/premiumtransactions', premiumtransactions);
app.use('/cron', cron);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A CATCATCAT Co-working Space Reservations API'
        },
        servers: [
            {
                url: 'https://coworking-backend-beta.vercel.app/api/'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{bearerAuth: []}]
    },
    apis: ['./routes/*.js'],
};

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, { customCssUrl: CSS_URL }));

//Cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, 'mode on port', PORT));
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});

module.exports = app;