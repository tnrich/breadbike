import { forEach, flatMap } from "lodash";
import parseAddress from "parse-address";

export function createSpreadsheets(dataArray) {

  const spreadsheetsByRoute = {};
  console.log(`dataArray:`, dataArray);
  dataArray.forEach((d) => {
    const { route } = d;
    if (!route) return console.log("No route found for data: ", d);
    if (!spreadsheetsByRoute[route]) spreadsheetsByRoute[route] = [];
    spreadsheetsByRoute[route].push(d);
  });

//   var data = JSON.stringify({"Name":"A New Route","StartTime":"2020-05-14T04:03:03.2838573Z","StopTime":"2020-05-14T05:03:03.2838573Z","HardStart":true,"HardStop":false,"Stops":[{"Name":"My new location","Address":"123 Main Street, New York","Lat":33.274,"Lng":33.927,"ServiceTime":5,"Note":"A note goes here","Email":"me@email.com","Phone":"555-555-5555"},{"Name":"Another new location","Address":"1025 31st Street, New York","Lat":33.323,"Lng":33.672,"ServiceTime":5,"Note":"A note goes here","Email":"someone@email.com","Phone":"555-555-4444","ScheduleId":null}],"OptType":2,"Note":"Test Note","TravelMode":0,"Driver":"driver@domain","IsRoundTrip":false});

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function() {
//   if(this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("POST", "https://teamapi.roadwarrior.app/api/Route/Add?token=Ue-obZyeBxKfPFVj7zsRgCb-IN7UtqJv&accountid=5cb4df78-e19f-47b7-a7b1-5440403a5855");
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.setRequestHeader("Cookie", "ARRAffinity=37a4b180fc5c13ec38328215f7bb8800a5528533610be704150affdb5c75c312");

// xhr.send(data);

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Cookie", "ARRAffinity=2440fd1f13ba23f6760a8ec999db8c302b1fd8bd292921f166842cfad5e92165");

// var raw = JSON.stringify({"Name":"A New Route","StartTime":"2020-05-14T04:03:03.2838573Z","StopTime":"2020-05-14T05:03:03.2838573Z","HardStart":true,"HardStop":false,"Stops":[{"Name":"My new location","Address":"123 Main Street, New York","Lat":33.274,"Lng":33.927,"ServiceTime":5,"Note":"A note goes here","Email":"me@email.com","Phone":"555-555-5555"},{"Name":"Another new location","Address":"1025 31st Street, New York","Lat":33.323,"Lng":33.672,"ServiceTime":5,"Note":"A note goes here","Email":"someone@email.com","Phone":"555-555-4444","ScheduleId":null}],"OptType":2,"Note":"Test Note","TravelMode":0,"Driver":"driver@domain","IsRoundTrip":false});

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://teamapi.roadwarrior.app/api/Route/Add?token=Ue-obZyeBxKfPFVj7zsRgCb-IN7UtqJv&accountid=5cb4df78-e19f-47b7-a7b1-5440403a5855", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


// var geocoder = new google.maps.Geocoder();
//       var address = "new york";

//       geocoder.geocode({ address: address }, function (results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//           var latitude = results[0].geometry.location.lat();
//           var longitude = results[0].geometry.location.lng();
//           alert(latitude);
//         }
//       });


  // window.fetch(
  //   "https://teamapi.roadwarrior.app/api/Route/Add?token=Ue-obZyeBxKfPFVj7zsRgCb-IN7UtqJv&accountid=5cb4df78-e19f-47b7-a7b1-5440403a5855",
  //   {
  //     headers: new Headers({
  //       "x-thomas": "hello",
  //       Accept: "*/*",
  //       "Content-Type": "application/json",
  //     }),
  //     mode: "cors",
  //     method: "POST",
  //     body: JSON.stringify({
  //       Name: "A New Route",
  //       StartTime: "2020-05-14T04:03:03.2838573Z",
  //       StopTime: "2020-05-14T05:03:03.2838573Z",
  //       HardStart: true,
  //       HardStop: false,
  //       Stops: [
  //         {
  //           Name: "My new location",
  //           Address: "123 Main Street, New York",
  //           Lat: 33.274,
  //           Lng: 33.927,
  //           ServiceTime: 5,
  //           Note: "A note goes here",
  //           Email: "me@email.com",
  //           Phone: "555-555-5555",
  //           ScheduleId: "6248f0f4-a30d-4584-8e13-1e91be85d59b",
  //         },
  //         {
  //           Name: "Another new location",
  //           Address: "1025 31st Street, New York",
  //           Lat: 33.323,
  //           Lng: 33.672,
  //           ServiceTime: 5,
  //           Note: "A note goes here",
  //           Email: "someone@email.com",
  //           Phone: "555-555-4444",
  //           ScheduleId: null,
  //         },
  //       ],
  //       OptType: 2,
  //       Note: "Test Note",
  //       TravelMode: 0,
  //       Driver: "driver@domain",
  //       IsRoundTrip: false,
  //     }),
  //   }
  // );

  forEach(spreadsheetsByRoute, (data, key) => {
    if (!key) return console.log("No key found for data: ", data);

    createRoadWarriorExcel(data, key);
  });
}

function createRoadWarriorExcel(data, name) {
  console.log(`name:`, name);
  const prettyData = flatMap(data, prettifyRoadWarrior);
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

function prettifyRoadWarrior(d) {
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


    if (address === "1640 El Cerrito Ct") {
      debugger;
    }

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
