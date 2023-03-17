const fs = require("fs");
// read data from text file
const getHousingData = async (fileName) => {
  let data = await fs.promises.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  return data;
};

// parse data into array
const parseData = (data) => {
  let housingData = data.split("\n");
  housingData = housingData.map((item) => item.split(","));
  return housingData;
};

// get most recent listing sorted by date
// then filter out duplicates
let getMostRecentListing = (houseListings) => {
  let housingMap = {};
  // sort data
  let houseListingsSorted = houseListings.sort((a, b) => {
    return parseInt(b[2]) - parseInt(a[2]);
  });
  // filter out duplicates by checking if we've already passed over the listing using map
  let filteredHousingList = [];
  for (let i = 0; i < houseListingsSorted.length; i++) {
    if (housingMap[houseListingsSorted[i][1]]) {
      continue;
    } else {
      filteredHousingList.push(houseListingsSorted[i][0]);
      housingMap[houseListingsSorted[i][1]] = houseListingsSorted[i];
    }
  }
  return filteredHousingList;
};
// print data to console
const displayHousingData = async () => {
  let housingData = await getHousingData("housingList.txt");
  housingData = parseData(housingData);
  printData(getMostRecentListing(housingData));
};
// print data with formatting
const printData = (data) => {
  console.log("=".repeat(50));
  console.log(data);
  console.log("=".repeat(50));
};

displayHousingData();
