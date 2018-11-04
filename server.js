

const express = require('express');
const router = require('./src/backend/router');
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({limit: "50mb"}));

app.use(session({
	secret: 'useless',
	resave: true,
	saveUninitialized: false
}));

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(router);

app.listen(port);
console.log(`Server running at ${port}...`);
