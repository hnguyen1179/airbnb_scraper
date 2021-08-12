const axios = require("axios");
const fs = require("fs");

// Hosts: 41 male / 28 females
// Users: 248 random 

const grabUsers = async (d) => {
	try {
		const options = {
			method: "GET",
			url: "https://randomuser.me/api/?results=28&gender=female&nat=us&inc=name,email,login,picture",
		};

		const response = await axios(options);
		return response.data.results;
	} catch (error) {
		console.log(error.response);
	}
}

(async () => {
  const data = await grabUsers();
  
  fs.writeFile('28_female_hosts.json', JSON.stringify(data), (e) => {
    if (e) return console.log(e)
    console.log('great success')
  })
  
})();