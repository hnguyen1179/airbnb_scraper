const fs = require("fs");
const data = require("./raw_data_revised.json");

const locations = data.map((obj) => {
	return obj.listing.location;
});

const addresses = [
	"2125 Westinghouse St, San Diego, CA 92111",
	"1333 Thomas Ave, San Diego, CA 92109",
	"961 J Ave, Coronado, CA 92118",
	"4162 Chamoune Ave, San Diego, CA 92105",
	"1632 Union St, San Diego, CA 92101",
	"4794 Kansas St, San Diego, CA 92116",
	"4884 Muir Ave, San Diego, CA 92107",
	"4052 47th St, San Diego, CA 92105",
	"5085 Narragansett Ave, San Diego, CA 92107",
	"4843 Cape May Ave, San Diego, CA 92107",
	"418 S 39th St, San Diego, CA 92113",
	"1434 Law St, San Diego, CA 92109",
	"39893 Forest Rd, Big Bear Lake, CA 92315",
	"251 N Eureka Dr, Big Bear Lake, CA 92315",
	"355 Tannenbaum Dr, Big Bear, CA 92314",
	"315 Dove Ct, Big Bear Lake, CA 92315",
	"40638 Simonds Dr, Big Bear Lake, CA 92315",
	"42570 Avalon Rd, Big Bear Lake, CA 92315",
	"429 Feldstrasse Dr, Big Bear Lake, CA 92315",
	"820 Ravine Rd, Big Bear Lake, CA 92315",
	"4318 Kay Pl, Las Vegas, NV 89107",
	"2000 E Bonanza Rd, Las Vegas, NV 89101",
	"21 E Harris Ave, Las Vegas, NV 89101",
	"2154 N Carroll St, North Las Vegas, NV 89030",
	"8909 Desert Mound Dr, Las Vegas, NV 89134",
	"2505 Silverton Dr, Las Vegas, NV 89134",
	"9025 Greensboro Ln, Las Vegas, NV 89134",
	"123 Copper St, Henderson, NV 89015",
	"3808 Fairway Cir, Las Vegas, NV 89108",
	"4401 Thompson Cir, Las Vegas, NV 89107",
	"259 Fife St, Henderson, NV 89015",
	"732 Kiel St, Henderson, NV 89015",
	"496 Waterwheel Falls Dr, Henderson, NV 89015",
	"368 Toyabe St, Henderson, NV 89015",
	"727 Greycliff Terrace, Henderson, NV 89002",
	"391 E Country Club Dr, Henderson, NV 89015",
	"304 Argonne Cir, Santa Barbara, CA 93105",
	"201 Calle Palo Colorado, Santa Barbara, CA 93105",
	"3023 Serena Rd, Santa Barbara, CA 93105",
	"221 W Anapamu St, Santa Barbara, CA 93101",
	"117 W Mason St, Santa Barbara, CA 93101",
	"1723 Villa Ave, Santa Barbara, CA 93101",
	"2014 Garden St, Santa Barbara, CA 93105",
	"1603 Oramas Rd, Santa Barbara, CA 93103",
	"885 Jimeno Rd, Santa Barbara, CA 93103",
	"1061 Garcia Rd, Santa Barbara, CA 93103",
	"1950 Las Tunas Rd, Santa Barbara, CA 93103",
	"2716 Clinton Terrace, Santa Barbara, CA 93105",
	"805 Levy, Las Vegas, NV 89106",
	"213 Woodley St, Las Vegas, NV 89106",
	"921 Sage Tree Ct, Las Vegas, NV 89101",
	"714 S 3rd St, Las Vegas, NV 89101",
	"1902 S Caliente Dr, Palm Springs, CA 92264",
	"2286 Pso Del Rey, Palm Springs, CA 92264",
	"1951 S Araby Dr, Palm Springs, CA 92264",
	"690 S Grenfall Rd, Palm Springs, CA 92264",
	"124 Logenita St, Palm Springs, CA 92264",
	"2910 N Bahada Rd, Palm Springs, CA 92262",
	"923 9th St, Santa Monica, CA 90403",
	"635 Maryland St, El Segundo, CA 90245",
	"23011 Strathern St, Canoga Park, CA 91304",
	"1157 Calle Vista Dr, Beverly Hills, CA 90210",
	"617 Manchester Terrace, Inglewood, CA 90301",
	"8119 Willow Glen Rd, Los Angeles, CA 90046",
	"3960 Midway Ave, Culver City, CA 90232",
	"411 Court D, Venice, CA 90291",
	"20503 Big Rock Dr, Malibu, CA 90265",
	"3405 Sherbourne Dr, Culver City, CA 90232",
	"6132 Indiana Ct, Venice, CA 90291",
	"4820 McConnell Ave, Los Angeles, CA 90066",
	"215 Union Pl, Los Angeles, CA 90026",
	"320 Brooks Ave, Venice, CA 90291",
	"4151 W 132nd St, Hawthorne, CA 90250",
];

const streets = addresses.map((address) => {
	return address.split(",")[0];
});

const zipcodes = addresses.map((address) => {
	return address.slice(address.length - 5);
});

// injecting street, zipcode, and address into listings
for (let i = 0; i < data.length; i++) {
	const listing = data[i].listing;
	listing.street = streets[i];
	listing.zipcode = zipcodes[i];
	listing.address = addresses[i];
}

fs.writeFile("./raw_data_revised_2.json", JSON.stringify(data), (e) => {
	if (e) return console.log(e);
	console.log("file written successfully");
});
