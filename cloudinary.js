require("dotenv").config({ path: __dirname + "/.env" });

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
	cloud_name: "dcufjeb5d",
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

