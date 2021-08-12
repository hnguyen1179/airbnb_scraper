const data = require("./raw_data_revised_5.json");

const reviews = data.map((x) => {
	return x.reviews.length;
});

console.log(reviews.reduce((cv, acc) => acc + cv))