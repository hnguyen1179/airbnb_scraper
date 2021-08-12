const download = require("image-downloader");
const hash = require("object-hash");

const hosts = require("./2_host_data.json");
const hostsAndListings = require("../host_and_listings.json");
const maleHostsRand = require("../users_data/41_male_hosts.json");
const femaleHostsRand = require("../users_data/28_female_hosts.json");
const usersRand = require("../users_data/248_random_users_data.json");

// const maleHostsData = hostsAndListings

// console.log(maleHostsRand.map(d => d.picture.large))

// download.image({
//   url: "https://avatars.dicebear.com/api/male/53g43gdf.svg",
//   dest: "../images/image.svg"
// });

// console.log(maleHostsData)
// (async () => {
// 	// const maleHostsData = hosts.filter((host) => host.gender === "male");
// 	// const femaleHostsData = hosts.filter((host) => host.gender === "female");
// 	for (let user of usersRand) {
// 		const gender = user.picture.large.includes("women") ? "female" : "male";
// 		const unique = hash(user);

// 		await download.image({
// 			url: `https://avatars.dicebear.com/api/${gender}/${unique}.svg`,
// 			dest: `../images/user_avatars/${unique}.svg`,
// 		});
// 	}
// 	// for (let host of femaleHostsData) {
// 	//   const unique = host.id
// })();

usersRand.forEach(user => {
  user['unique'] = hash(user);
})

console.log(
	usersRand.filter(
		(x) => x.unique === "24d2f151599118a5e4733c3e4a697e99b0ec1ead"
	)
);