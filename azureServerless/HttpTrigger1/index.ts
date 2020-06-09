var request = require('request');

const gmaps = require("@googlemaps/google-maps-services-js")

const client = new gmaps.Client({
    config: {},
});

// todo https://www.c-sharpcorner.com/article/handling-cors-in-azure-function/

import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        context.log('HTTP trigger function processed a request.');
        const roadWarriorData = req.body.roadWarriorData
        const name = req.body.name
        const itemCountsDescription = req.body.itemCountsDescription
        console.log(`roadWarriorData:`, roadWarriorData)
        console.log(`process.env.ROAD_WARRIOR_TOKEN:`, process.env.ROAD_WARRIOR_TOKEN)
        console.log(`process.env.GOOGLE_MAPS_API_KEY:`, process.env.GOOGLE_MAPS_API_KEY)
        console.log(`process.env.ROAD_WARRIOR_ACCOUNT_ID:`, process.env.ROAD_WARRIOR_ACCOUNT_ID)

        for (const item of roadWarriorData) {
            await client
                .geocode({
                    params: {
                        address: item.Address,
                        key: process.env.GOOGLE_MAPS_API_KEY,
                    },
                    timeout: 4000, // milliseconds
                })
                .then((r) => {
                    if (r.data.status === gmaps.Status.OK) {
                        console.log(r.data.results[0].geometry.location);
                        item.Lat = r.data.results[0].geometry.location.lat
                        item.Lng = r.data.results[0].geometry.location.lng
                    } else {
                        throw new Error(`Google api failed to get the lat/lng for ${item.Name} ${item.Address}`)
                        console.log(r.data.error_message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }


        console.log("roadWarriorData with lat lng", roadWarriorData)

        var options = {
            'method': 'POST',
            'url': `https://teamapi.roadwarrior.app/api/Route/Add?token=${process.env.ROAD_WARRIOR_TOKEN}&accountid=${process.env.ROAD_WARRIOR_ACCOUNT_ID}`,
            'headers': {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Name": name,
                "HardStart": false,
                "HardStop": false,
                "Driver": "slobreadbike@gmail.com",
                "Stops": roadWarriorData.map((i) => {
                    return {
                        Address: i.Address,
                        Name: i.Name,
                        Note: i.Note,
                        Phone: i.Phone,
                        Lat: i.Lat,
                        Lng: i.Lng,
                        "ServiceTime": 3,
                    }
                }),
                "OptType": 2,
                "Note": itemCountsDescription,
                "TravelMode": 1,
                "IsRoundTrip": true

            })
        };

        return new Promise((resolve) => {
            request(options, function (error, response) {
                if (error) throw new Error(`Road warrior API failed with error: ${error}`);

                console.log(response.body);
                context.res = {
                    status: 202, /* Defaults to 200 */
                    // body: "success"
                };
                resolve()
            });
        })
    } catch (error) {
        context.res = {
            status: 500, /* Defaults to 200 */
            body: error
        };
    }



};

export default httpTrigger;
