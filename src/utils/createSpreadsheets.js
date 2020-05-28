import { forEach, flatMap } from "lodash";
import parseAddress from "parse-address";

export function createSpreadsheets(dataArray) {
  const spreadsheetsByRoute = {};
  console.log(`dataArray:`, dataArray);
  dataArray.forEach((d) => {
    const { route } = d;

    if (!spreadsheetsByRoute[route]) spreadsheetsByRoute[route] = [];
    spreadsheetsByRoute[route].push(d);
  });

  forEach(spreadsheetsByRoute, (data, key) => {
    console.log(`data:`, data);
    if (!key) return console.log("No key found for data: ", data);

    createRoadWarriorExcel(data, key);
  });
}

function createRoadWarriorExcel(data, name) {
  const prettyData = flatMap(data, prettifyRoadWarrior);
  var wb = window.XLSX.utils.book_new();
  const ws = window.XLSX.utils.json_to_sheet(prettyData);
  var ws_name = "Uploads";

  /* Add the worksheet to the workbook */
  window.XLSX.utils.book_append_sheet(wb, ws, ws_name);
  window.XLSX.writeFile(wb, `${name}_out.xlsx`);
}

// "": ""
// address: "1512 Morro Street"
// city: "San Luis Obispo"
// comments: ""
// deliveryDate: "Thursday, May 28, 2020"
// firstName: "Torrey"
// lastName: "Sanseverino"
// location: "Home Delivery - Torrey Sanseverino"
// modified: "No"
// primaryPhone: "(858) 722 3003"
// route: "Home Delivery - Downtown (South of Marsh)"
// secondaryPhone: ""
// state: "CA"
// zipCode: "93401"

function prettifyRoadWarrior(d) {
  try {
    const {
      address,
      city,
      comments,
      deliveryDate,
      firstName,
      lastName,
      location,
      modified,
      primaryPhone,
      route,
      secondaryPhone,
      state,
      zipCode,
    } = d;

    var {
      number,
      street,
    } = parseAddress.parseLocation(address);

    return {
      Name: firstName + " " + lastName,
      "Building/House Number": number,
      "Street Name": street,
      City: city || "San Luis Obispo",
      "State/Region": state || "CA",
      Postal: zipCode || "93401",
      Country: "United States",
      Color: "blue",
      Phone: primaryPhone || secondaryPhone,
      Note: comments,
      Latitude: "",
      Longitude: "",
      "Visit Time": "",
    };
  } catch (e) {
    console.log(`couldn't prettify :`, d);
    return [];
  }
}
