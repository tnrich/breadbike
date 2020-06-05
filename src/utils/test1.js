// function getMMDDDate(d) {
//   const date = new Date(d);
//   return (
//     date.toLocaleString("default", { month: "long" }) +
//     " " +
//     (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
//   );
// }
// console.log(getMMDDDate("Thursday, May 28, 2020"));
// var request = require('request');
// var options = {
//   'method': 'POST',
//   'url': 'https://teamapi.roadwarrior.app/api/Route/Add?token=Ue-obZyeBxKfPFVj7zsRgCb-IN7UtqJv&accountid=5cb4df78-e19f-47b7-a7b1-5440403a5855',
//   'headers': {
//     'Content-Type': 'application/json',
//     'Cookie': 'ARRAffinity=37a4b180fc5c13ec38328215f7bb8800a5528533610be704150affdb5c75c312'
//   },
//   body: JSON.stringify({"Name":"A New Route","StartTime":"2020-05-14T04:03:03.2838573Z","StopTime":"2020-05-14T05:03:03.2838573Z","HardStart":true,"HardStop":false,"Stops":[{"Name":"My new location","Address":"123 Main Street, New York","Lat":33.274,"Lng":33.927,"ServiceTime":5,"Note":"A note goes here","Email":"me@email.com","Phone":"555-555-5555"},{"Name":"Another new location","Address":"1025 31st Street, New York","Lat":33.323,"Lng":33.672,"ServiceTime":5,"Note":"A note goes here","Email":"someone@email.com","Phone":"555-555-4444","ScheduleId":null}],"OptType":2,"Note":"Test Note","TravelMode":0,"Driver":"driver@domain","IsRoundTrip":false})

// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

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

//then hit the google api to get the lat/long

//then hit the azure function

// var wb = window.XLSX.utils.book_new();
// const ws = window.XLSX.utils.json_to_sheet(prettyData);
// var ws_name = "Uploads";

// /* Add the worksheet to the workbook */
// window.XLSX.utils.book_append_sheet(wb, ws, ws_name);
// window.XLSX.writeFile(wb, `${name}_out.xlsx`);
