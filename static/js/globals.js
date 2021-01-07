var TERRITORIES = [
	"ALASKA", "NORTH-WEST TERRITORY", "ONTARIO", "EASTERN CANADA", "GREENLAND", "ALBERTA",
	"WESTERN UNITED STATES", "EASTERN UNITED STATES", "CENTRAL AMERICA",  "VENEZUELA", "BRAZIL", "PERU",
	"ARGENTINA", "ICELAND", "GREAT BRITAIN", "SCADINAVIA", "NORTHERN EUROPE", "WESTERN EUROPE",
	"SOUTHERN EUROPE", "UKRAINE", "NORTH_AFRICA", "EGYPT", "EASTERN_AFRICA", "CONGO",
	"SOUTHERN AFRICA", "MADAGASCAR", "MIDDLE EAST", "AFGHANISTAN", "URAL", "SIBERIA", 
	"CHINA", "INDIA", "YAKUTSK", "IRKUTSK", "MONGOLIA", "KAMCHATKA", 
	"JAPAN", "SOUTHEAST ASIA", "INDONESIA", "NEW GUINEA", "WESTERN AUSTRALIA", "EASTERN AUSTRALIA"	
];

// rpz par liste d'adjacence
var NEIGHBORS = [
	[1, 5, 35], 				[0, 2, 4, 5], 				[1, 3, 4, 5, 6, 7], 		[2, 4, 7], 				[1, 2, 3, 13], 				[0, 1, 2, 6],
	[5, 2, 7, 8], 				[3, 2, 6, 8], 				[6, 7, 9], 					[8, 10, 11], 			[9, 11, 12, 20], 			[9, 10, 12],
	[10, 11],	 				[4, 14, 15], 				[13, 15, 16, 17], 			[13, 14, 16, 19], 		[14, 15, 17, 18, 19], 		[14, 16, 18, 20],
	[16, 17, 19, 20, 21, 26], 	[15, 16, 18, 26, 27, 28], 	[10, 17, 18, 21, 22, 23], 	[18, 20, 22, 26], 		[20, 21, 23, 24, 25, 26], 	[20, 22, 24],
	[22, 23, 25], 				[22, 24], 					[18, 19, 21, 22, 27, 31], 	[19, 26, 28, 30, 31], 	[19, 27, 29, 30], 			[28, 30, 32, 33, 34],
	[27, 28, 29, 31, 34, 37], 	[26, 27, 30, 37], 			[29, 33, 35], 				[29, 32, 34, 35], 		[29, 30, 33, 35, 36], 		[0, 32, 33, 34, 36],
	[34, 35], 					[30, 31, 38], 				[37, 39, 40], 				[38, 40, 41], 			[38, 39, 41], 				[39, 40]
];

function isNextTo(ter1, ter2){
    // return true if ter1 is a neighbor of ter2
    var index1 = TERRITORIES.indexOf(ter1);
    var index2 = TERRITORIES.indexOf(ter2);
    return NEIGHBORS[index1].includes(index2);
}