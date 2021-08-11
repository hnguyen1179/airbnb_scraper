const data = require("./raw_data_revised.json");

const languages = data.map((obj) => {
	return obj.listing.languages;
});

const langaugesTotal = new Set(
	languages.reduce((cv, acc) => {
		return acc.concat(cv);
	}, [])
);

console.log(langaugesTotal);

