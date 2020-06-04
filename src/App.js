import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { startRoadWarriorApiCall } from "./utils/startRoadWarriorApiCall";
import { camelCase } from "lodash";
import logo from "./breadbike_logo_final.png";
const debug = false;
function App() {
  const [working, setworking] = useState(false);
  const [responses, setResponse] = useState([]);
  // const [responseFailure, setResponseFailure] = useState()

  return (
    <div className="App">
      <header className="App-header">
        <img width={200} height={200} alt="breadbike logo" src={logo}></img>
        <h3>Weclome to the breadbike route planner</h3>
        <h5>Drag today's distribution.csv report from farmigo here: </h5>

        <br></br>
        <input
          className={"fileInput"}
          onChange={function (event) {
            var fileList = document.querySelector(".fileInput").files;
            debug && console.log(`fileList:`, fileList);
            let i = 0;
            Papa.parse(fileList[0], {
              header: true,
              transformHeader: (header) => {
                debug && console.log(`header:`, header);
                return header ? camelCase(header) : `noHeader__${i++}`;
              },
              complete: async function (results) {
                debug && console.log("Finished:", results.data);
                setworking(true);
                const responses = await startRoadWarriorApiCall(results.data);
                setResponse(responses);
                setworking(false);
              },
            });
          }}
          type="file"
        ></input>

        <br></br>
        {working && <div class="loader"></div>}
        {!!responses.length && <h3>Results:</h3>}
        {responses.map(({ name, success, error, results }, i) => {
          return (
            <div key={i}>
              {name} &nbsp;&nbsp;{" "}
              <span style={{ color: success ? "inherit" : "red" }}>
                Upload Success: {!!success + ""}
              </span>{" "}
              <br></br>
              {error
                ? typeof error === "string"
                  ? error
                  : JSON.stringify(error, null, 2)
                : success
                ? ""
                : "Undetermined error, check the logs"}{" "}
              {results && JSON.stringify(results, null, 2)}
              <br></br>
              <br></br>
            </div>
          );
        })}

        <div>Refresh the page to upload new csvs </div>
      </header>
    </div>
  );
}

export default App;
