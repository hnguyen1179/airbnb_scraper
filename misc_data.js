const totalLangauges = [
	"Nederlands",
	"English",
	"Français",
	"Deutsch",
	"Español",
	"हिन्दी",
	"ਪੰਜਾਬੀ",
	"Русский",
	"Українська",
	"עברית",
	"Tagalog",
	"Svenska",
	"中文 (简体)",
	"العربية",
	"Italiano",
	"Norsk",
];

// Percentage of total (price per night * nights, cleaning fee, service fee)
const occupancyTaxRate = {
	sanDiego: 10.5,
	losAngeles: 14,
	palmDesert: 11,
	bigBear: 7,
}

// API for generating random avatars
// `https://avatars.dicebear.com/api/${gender}/${unique}.svg`,

// API for determining gender based on name 
// dvpUfbrnm8lqdlwJrUXDM6uMjJQxrXM5lLC9
// https://gender-api.com/get?name=donald&key=dvpUfbrnm8lqdlwJrUXDM6uMjJQxrXM5lLC9

// When people make a new account; create a unique hash for their id.
// Set that has to {unique} and then find out their potential gender
// based on their name and then 