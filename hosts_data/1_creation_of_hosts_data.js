require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const fs = require("fs");
const data = require("../raw_data/raw_data_revised_5.json");

// https://randomuser.me/api/?gender=female
// Creation of the hosts dataset; decoupling hosts from listing and reviews
// Hosts and Listings are now connected via ::hostId::
//		host: id; listing: hostId
// Listings and reviews are connected to the ::listingId::
//		listing: id; review: listingId

const hostsData = [];

// Condense the hosts into a single array set
for (let obj of data) {
	const host = obj.host;

	const included = hostsData.some((x) => {
		return x.id === host.id;
	});

	if (!included) {
		hostsData.push(host);
	}
}

// Create the data for our API call
const payload = hostsData.map((host) => {
	return {
		first_name: host.firstName,
	};
});

// Function to call the API
async function grabGender(d) {
	try {
		const options = {
			method: "POST",
			headers: {
				Authorization: "Bearer " + process.env.GENDER_API_AUTH_TOKEN,
			},
			data: d,
			url: "https://gender-api.com/v2/gender",
		};

		const response = await axios(options);
		return response.data;
	} catch (error) {
		console.log(error.response);
	}
}

(async () => {
	const genderData = await grabGender(payload);

	for (let i = 0; i < hostsData.length; i++) {
		const currentHost = hostsData[i];
		const noResult = genderData[i].result_found === false;
		const gender = genderData[i].gender;

		if (
			currentHost.firstName === "Jo-Nell" ||
			currentHost.firstName === "Simone"
		) {
			currentHost.gender = "female";
		} else if (noResult) {
			currentHost.gender = "male";
		} else {
			currentHost.gender = gender;
		}
	}

	fs.writeFile("1_host_data.json", JSON.stringify(hostsData), (e) => {
		if (e) return console.log(e);
		console.log("yuh");
	});
})();
