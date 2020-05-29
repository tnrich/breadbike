var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://teamapi.roadwarrior.app/api/Route/Add?token=Ue-obZyeBxKfPFVj7zsRgCb-IN7UtqJv&accountid=5cb4df78-e19f-47b7-a7b1-5440403a5855',
  'headers': {
    'Content-Type': 'application/json',
    'Cookie': 'ARRAffinity=37a4b180fc5c13ec38328215f7bb8800a5528533610be704150affdb5c75c312'
  },
  body: JSON.stringify({"Name":"A New Route","StartTime":"2020-05-14T04:03:03.2838573Z","StopTime":"2020-05-14T05:03:03.2838573Z","HardStart":true,"HardStop":false,"Stops":[{"Name":"My new location","Address":"123 Main Street, New York","Lat":33.274,"Lng":33.927,"ServiceTime":5,"Note":"A note goes here","Email":"me@email.com","Phone":"555-555-5555"},{"Name":"Another new location","Address":"1025 31st Street, New York","Lat":33.323,"Lng":33.672,"ServiceTime":5,"Note":"A note goes here","Email":"someone@email.com","Phone":"555-555-4444","ScheduleId":null}],"OptType":2,"Note":"Test Note","TravelMode":0,"Driver":"driver@domain","IsRoundTrip":false})

};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});
