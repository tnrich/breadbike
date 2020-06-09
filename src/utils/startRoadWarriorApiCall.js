import { flatMap, forEach } from "lodash";
// import parseAddress from "parse-address";
const debug = false;
export async function startRoadWarriorApiCall(dataArray, setResponse) {
  try {
    const spreadsheetsByRoute = {};
    debug && console.log(`dataArray:`, dataArray);
    dataArray.forEach((d) => {
      const { route } = d;
      if (!route) return debug && console.log("No route found for data: ", d);
      if (!spreadsheetsByRoute[route]) spreadsheetsByRoute[route] = [];
      spreadsheetsByRoute[route].push(d);
    });
    const responses = [];
    for (const key of Object.keys(spreadsheetsByRoute)) {
      const data = spreadsheetsByRoute[key];

      if (!key || !key.toLowerCase)
        return console.log("No key found for data: ", data);
      if (key.includes("Home Delivery -")) {
        //if it doesn't have the words "home delivery" in the route name, we won't include it

        const res = await uploadDataToApi({
          data,
          name: key.replace(
            "Home Delivery -",
            (data[0]["deliveryDate"] &&
              getMonthDayDate(data[0]["deliveryDate"])) ||
              ""
          ),
        });

        responses.push(res);
      }
    }
    return responses;
  } catch (error) {
    console.log(`Upload failed error:`, error);
    return {
      error:
        "The upload failed for some reason. Check the console for more info!",
    };
  }
}

async function uploadDataToApi({ data, name, setResponse }) {
  //we first need to prettify this data to get it ready for the roadwarrior api
  const { roadWarriorData, itemsByType } = prettifyRoadWarriorData(data);
  let itemCountsDescription = "";
  forEach(itemsByType, (quantity, type) => {
    itemCountsDescription += `${quantity} ${type}, `;
  });
  const isLocal = process.env.NODE_ENV !== "production";

  const azureUrl = (isLocal)
    ? "http://localhost:7071/api/HttpTrigger1"
    : "https://tnrich-breadbike.azurewebsites.net/api/HttpTrigger1?code=mZhkt5Td4MFZG0fEtq5PdN4NJWI3UbgSLL6kh9h9BpKAYdzl24MakA%3D%3D";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name,
    roadWarriorData,
    itemCountsDescription,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  //hit the azure serverless function where we'll do additional google maps api calls for each roadwarrior
  return await fetch(azureUrl, requestOptions)
    .then((response) => {
      console.log(`response:`, response);
      const result = response.text();
      if (response.status !== 202) {
        console.log(`error uploading. got a result.error!:`, result.statusText);
        return {
          success: false,
          name,
          error: result.statusText,
        };
      } else {
        return { success: true, name, result };
      }
    })

    .catch((error) => {
      console.log(`error uploading!:`, error);
      return {
        success: false,
        name,
        error,
      };
    });
}

const itemMap = {
  "Baker's Choice Rustic Loaf": "Rustic",
  "Baker's Choice Pan Loaf": "Pan",
  "The Rye Loaf": "Rye",
};

function prettifyRoadWarriorData(data) {
  const itemsByType = {};
  const roadWarriorData = flatMap(data, (d) => {
    try {
      const {
        address,
        city,
        firstName,
        lastName,
        primaryPhone,
        secondaryPhone,
        state,
        zipCode,
      } = d;
      debug && console.log(`address:`, address);
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

              const itemType = (
                itemMap[item] ||
                item
                  .replace("Stepladder Creamery", "")
                  .replace("Leigh's Bakeshop", "")
              ).trim();
              itemsByType[itemType] =
                Number(itemsByType[itemType] || 0) + Number(quantity);
              orderDescription += quantity + " " + itemType + " ";
            }
          }
        }
      });
      debug && console.log(`orderDescription:`, orderDescription);

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
  });
  return {
    itemsByType,
    roadWarriorData,
  };
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

function getMonthDayDate(d) {
  const date = new Date(d);
  return (
    date.toLocaleString("default", { month: "long" }) +
    " " +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
  );
}
