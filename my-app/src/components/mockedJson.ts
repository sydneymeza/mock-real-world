/**
 * This class contains the mocked data that is used to test the program.
 */

// mock csv data sets:
const CSVSmall = [["Lana", "Billie"]];

const CSVNoHeader = [
  ["pink", "purple", "blue", "orange"],
  ["red", "cyan", "white", "purple"],
];

const CSVWithHeaders = [
  ["flower", "number", "color", "name"],
  ["rose", "2", "white", "Lila"],
  ["tulip", "30", "green", "Mat"],
  ["rose", "4", "purple", "Rose"],
  ["orchid", "13", "red", "Taylor"]
];

const CSVBlank = [[]];

// map of the mocked csv files
export const mockedCSVMap = new Map<string, string[][]>();
mockedCSVMap.set("small.csv", CSVSmall);
mockedCSVMap.set("noHeader.csv", CSVNoHeader);
mockedCSVMap.set("header.csv", CSVWithHeaders);
mockedCSVMap.set("blank.csv", CSVBlank);

// mocked search results:
const searchNoHeadersPurple = [
  ["pink", "purple", "blue", "orange"],
  ["red", "cyan", "white", "purple"],
];

const searchNoHeadersPink = [
  ["pink", "purple", "blue", "orange"]
];

const searchHeadersFlower = [
  ["rose", "2", "white", "Lila"],
  ["rose", "4", "purple", "Rose"],
];

const searchHeadersName = [["orchid", "13", "red", "Taylor"]];

const searchSmall = [["Lana", "Billie"]];

const searchBlank = [[]];

export const noHeadersMap = new Map<string, string[][]>();
export const nameMap = new Map<string, string[][]>();
export const numberMap = new Map<string, string[][]>();
noHeadersMap.set("purple", searchNoHeadersPurple);
noHeadersMap.set("pink", searchNoHeadersPink);
noHeadersMap.set("rose", searchHeadersFlower);
noHeadersMap.set("Lana", searchSmall);
nameMap.set("flower, rose", searchHeadersFlower);
nameMap.set("name, Taylor", searchHeadersName);
numberMap.set("0, rose", searchHeadersFlower);
numberMap.set("1, purple", searchNoHeadersPurple);

// maps used to mock search: 
export const mockedSearchNoHeadersMap = new Map<string, Map<string, string[][]>>();
export const mockedSearchNameMap = new Map<string, Map<string, string[][]>>();
export const mockedSearchNumberMap = new Map<string, Map<string, string[][]>>();

mockedSearchNoHeadersMap.set("noHeader.csv", noHeadersMap);
mockedSearchNoHeadersMap.set("header.csv", noHeadersMap);
mockedSearchNoHeadersMap.set("small.csv", noHeadersMap);
mockedSearchNameMap.set("header.csv", nameMap);
mockedSearchNumberMap.set("header.csv", numberMap);


