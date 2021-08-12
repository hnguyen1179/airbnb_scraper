const fs = require("fs");
const data = require("../raw_data/raw_data_revised_5.json");

// 1240 Reviews
// 248 Users => Averaging 5 reviews per user

// Reviews by listing
// console.log(reviews);

const gaussianRandom = (v) => {
	let r = 0;
	for (let i = 0; i < v; i++) {
		r += Math.random();
	}
	return r / v;
};

const users = [];

while (users.reduce((cv, acc) => acc + cv, 0) !== 1240) {
	while (users.length < 248) {
		const randomGaussianNumber = Math.ceil(gaussianRandom(7) * 9);
		users.push(randomGaussianNumber);
	}

	if (users.reduce((cv, acc) => acc + cv, 0) !== 1240) users.length = 0;
}

fs.writeFile("users_data.json", JSON.stringify(users), (e) => {
	if (e) return console.log(e);
	console.log("the one true dataset");
});
