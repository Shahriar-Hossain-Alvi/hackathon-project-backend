// config the .env file
require("dotenv").config();

exports.PORT = process.env.PORT || 5000;
exports.DB = {
	uri: process.env.DB_URI,
};
