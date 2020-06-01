var request = require('request');


import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));


    var options = {
        'method': 'POST',
        'url': 'https://teamapi.roadwarrior.app/api/Route/Add?token=Ue-obZyeBxKfPFVj7zsRgCb-IN7UtqJv&accountid=5cb4df78-e19f-47b7-a7b1-5440403a5855',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'ARRAffinity=2440fd1f13ba23f6760a8ec999db8c302b1fd8bd292921f166842cfad5e92165'
        },
        body: JSON.stringify({ "Name": "A New Route", "StartTime": "2020-05-14T04:03:03.2838573Z", "StopTime": "2020-05-14T05:03:03.2838573Z", "HardStart": true, "HardStop": false, "Stops": [{ "Name": "My new location", "Address": "123 Main Street, New York", "Lat": 33.274, "Lng": 33.927, "ServiceTime": 5, "Note": "A note goes here", "Email": "me@email.com", "Phone": "555-555-5555" }, { "Name": "Another new location", "Address": "1025 31st Street, New York", "Lat": 33.323, "Lng": 33.672, "ServiceTime": 5, "Note": "A note goes here", "Email": "someone@email.com", "Phone": "555-555-4444", "ScheduleId": null }], "OptType": 2, "Note": "Test Note", "TravelMode": 0, "Driver": "driver@domain", "IsRoundTrip": false })
    };

    return new Promise((resolve) => {
        request(options, function (error, response) {
            if (error) throw new Error(error);

            console.log(response.body);
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: "Hello " + "body"
            };
            resolve()
        });
    })


};

export default httpTrigger;
