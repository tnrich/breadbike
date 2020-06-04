const gmaps = require("@googlemaps/google-maps-services-js")

const client = new gmaps.Client({
  config: {},
});

client
  .geocode({
    params: {
      address: "880 Upham SLO CA",
      key: "",
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    if (r.data.status === gmaps.Status.OK) {
      console.log(r.data.results[0].geometry.location);
    } else {
      console.log(r.data.error_message);
    }
  })
  .catch((e) => {
    console.log(e);
  });
