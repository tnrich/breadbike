import { forEach, flatMap } from "lodash";
import parseAddress from "parse-address";

export function createSpreadsheets(dataArray) {
  // const spreadsheetsByRoute = {};
  // console.log(`dataArray:`, dataArray);
  // dataArray.forEach((d) => {
  //   const { route } = d;
  //   if (!route) return console.log("No route found for data: ", d);
  //   if (!spreadsheetsByRoute[route]) spreadsheetsByRoute[route] = [];
  //   spreadsheetsByRoute[route].push(d);
  // });

  var data = JSON.stringify({"Name":"A New Route","StartTime":"2020-05-14T04:03:03.2838573Z","StopTime":"2020-05-14T05:03:03.2838573Z","HardStart":true,"HardStop":false,"Stops":[{"Name":"My new location","Address":"123 Main Street, New York","Lat":33.274,"Lng":33.927,"ServiceTime":5,"Note":"A note goes here","Email":"me@email.com","Phone":"555-555-5555"},{"Name":"Another new location","Address":"1025 31st Street, New York","Lat":33.323,"Lng":33.672,"ServiceTime":5,"Note":"A note goes here","Email":"someone@email.com","Phone":"555-555-4444","ScheduleId":null}],"OptType":2,"Note":"Test Note","TravelMode":0,"Driver":"driver@domain","IsRoundTrip":false});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://teamapi.roadwarrior.app/api/Route/Add?token=Ue-obZyeBxKfPFVj7zsRgCb-IN7UtqJv&accountid=5cb4df78-e19f-47b7-a7b1-5440403a5855");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cookie", "ARRAffinity=37a4b180fc5c13ec38328215f7bb8800a5528533610be704150affdb5c75c312");

xhr.send(data);


//   var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Access-Control-Allow-Origin", "*");
// myHeaders.append("Cookie", "ARRAffinity=37a4b180fc5c13ec38328215f7bb8800a5528533610be704150affdb5c75c312");

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

  // forEach(spreadsheetsByRoute, (data, key) => {
  //   if (!key) return console.log("No key found for data: ", data);

  //   createRoadWarriorExcel(data, key);
  // });
}

function createRoadWarriorExcel(data, name) {
  console.log(`name:`, name);
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
