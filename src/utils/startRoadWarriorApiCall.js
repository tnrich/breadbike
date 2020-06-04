import { forEach, flatMap } from "lodash";
// import parseAddress from "parse-address";

export function startRoadWarriorApiCall(dataArray, setResponse) {
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

    uploadDataToApi({
      data,
      name: key,
      setResponse,
    });
  });
}

function uploadDataToApi({ data, name, setResponse }) {
  //we first need to prettify this data to get it ready for the roadwarrior api
  const dataForRoadwarriorApi = flatMap(data, prettifyRoadWarriorData);
  const isLocal = process.env.NODE_ENV !== "production";

  const azureUrl = isLocal
    ? "http://localhost:7071/api/HttpTrigger1"
    : "published url";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    roadWarriorData: dataForRoadwarriorApi,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //hit the azure serverless function where we'll do additional google maps api calls for each roadwarrior
  fetch(azureUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      setResponse({ success: true, name, result });
    })
    .catch((error) => {
      setResponse({
        success: false,
        name,
        error,
      });
    });
}

const itemMap = {
  "Baker's Choice Rustic Loaf": "Rustic",
  "Baker's Choice Pan Loaf": "Pan",
  "The Rye Loaf": "Rye",
};

function prettifyRoadWarriorData(d) {
  try {
    const {
      address,
      city,
      // comments,
      // deliveryDate,
      firstName,
      lastName,
      location, //TODO what is the location for?
      // modified,
      primaryPhone,
      // route,
      secondaryPhone,
      state,
      zipCode,
    } = d;
    console.log(`address:`, address);
    let orderDescription = "";

    let quantity;
    Object.keys(d).forEach((key) => {
      if (key.startsWith("noHeader__")) {
        const item = d[key];

        if (item) {
          const index = Number(key.replace("noHeader__", "").trim());
          if (index % 3 === 0) {
            quantity = item || "";
          }
          //skip index % 3  === 1 because that is the "unit" we don't need
          if (index % 3 === 2) {
            if (item.includes("Biker's Tip")) {
              return;
            }
            orderDescription +=
              quantity +
              " " +
              (
                itemMap[item] ||
                item
                  .replace("Stepladder Creamery", "")
                  .replace("Leigh's Bakeshop", "")
              ).trim() +
              " ";
          }
        }
      }
    });
    console.log(`orderDescription:`, orderDescription);

    return {
      Name: firstName + " " + lastName,
      Address: `${address} ${city} ${state} ${zipCode}`,
      Phone: primaryPhone || secondaryPhone,
      Note: orderDescription,
    };
  } catch (e) {
    console.log(`couldn't prettify :`, d);
    return [];
  }
}

// "": ""
// address: "1512 Morro Street"
// city: "San Luis Obispo"
// comments: ""
// deliveryDate: "Thursday, May 28, 2020"
// firstName: "Torrey"
// lastName: "Sanseverino"
// location: "Home Delivery - Torrey Sanseverino" //TODO what is the location for?
// modified: "No"
// primaryPhone: "(858) 722 3003"
// route: "Home Delivery - Downtown (South of Marsh)"
// secondaryPhone: ""
// state: "CA"
// zipCode: "93401"

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
