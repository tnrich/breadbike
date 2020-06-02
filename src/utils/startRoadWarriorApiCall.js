import { forEach, flatMap } from "lodash";
import parseAddress from "parse-address";

export function startRoadWarriorApiCall(dataArray) {

  const spreadsheetsByRoute = {};
  console.log(`dataArray:`, dataArray);
  dataArray.forEach((d) => {
    const { route } = d;
    if (!route) return console.log("No route found for data: ", d);
    if (!spreadsheetsByRoute[route]) spreadsheetsByRoute[route] = [];
    spreadsheetsByRoute[route].push(d);
  });

  forEach(spreadsheetsByRoute, (data, key) => {
    if (!key) return console.log("No key found for data: ", data);

    uploadDataToApi(data, key);
  });
}


function uploadDataToApi(data, name) {
  //we first need to prettify this data 
  const prettyData = flatMap(data, prettifyRoadWarriorData);
  
  //then hit the google api to get the lat/long 
  

  //then hit the azure function 

  
  // var wb = window.XLSX.utils.book_new();
  // const ws = window.XLSX.utils.json_to_sheet(prettyData);
  // var ws_name = "Uploads";

  // /* Add the worksheet to the workbook */
  // window.XLSX.utils.book_append_sheet(wb, ws, ws_name);
  // window.XLSX.writeFile(wb, `${name}_out.xlsx`);
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
const itemMap = {
  "Baker's Choice Rustic Loaf": "Rustic",
  "Baker's Choice Pan Loaf": "Pan",
  "The Rye Loaf": "Rye",
}

function prettifyRoadWarriorData(d) {
  try {
    const {
      address,
      city,
      comments,
      // deliveryDate,
      firstName,
      lastName,
      // location,
      // modified,
      primaryPhone,
      // route,
      secondaryPhone,
      state,
      zipCode,
    } = d;
    let orderDescription = ""

    let quantity
    Object.keys(d).forEach((key) => {
      if(key.startsWith("noHeader__")) {
        const item = d[key]
        
        if (item) {
          const index = Number(key.replace("noHeader__", "").trim())
          if (index % 3  === 0) {
            quantity = item || ""
          }
          //skip index % 3  === 1 because that is the "unit" we don't need
          if (index % 3  === 2) {
            if (item.includes("Biker's Tip")) {return }
            orderDescription += quantity + (itemMap[item ] || item.replace("Stepladder Creamery","").replace("Leigh's Bakeshop", "")).trim() + " "
          }

        }
      }
    })
    console.log(`orderDescription:`,orderDescription)

    
    // Change "Baker's Choice Rustic Loaf" to "Rustic", 
    // Change "Baker's Choice Pan Loaf" to "Pan", 
    // change "The Rye Loaf" to "Rye", 
    // Remove "Stepladder Creamery" from both cheese names, 
    // Remove "Leigh's Bakeshop" from both cookie names. 
    // Do not include any "Biker's Tip" orders. 
    // Do not include the "units". 
    // So an order (as read in a distribution row) for 
    // " 1 | loaf | Baker's Choice Rustic Loaf | 2 | 2.0 Cookie(s) | Leigh's Bakeshop Dark Chocolate Chunk Cookie | 1 | Jar | Stepladder Creamery Marinated Fromage Blanc | 1 | share | Biker's Tip" 
    // would read in the note as 
    // "1 Rustic, 2 Dark Chocolate Chunk Cookie, 1 Marinated Fromage Blanc"


    // if (address === "1640 El Cerrito Ct") {
    //   debugger;
    // }

    var { number, street, type, prefix } = parseAddress.parseLocation(address);
    console.log(`street:`, street);
    if (street === "El") debugger;
    return {
      Name: firstName + " " + lastName,
      "Building/House Number": number,
      "Street Name": `${prefix || ""} ${street} ${type || ""}`.trim(),
      City: city || "San Luis Obispo",
      "State/Region": state || "CA",
      Postal: zipCode || "93401",
      Country: "US",
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
