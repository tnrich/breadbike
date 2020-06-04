import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { startRoadWarriorApiCall } from "./utils/startRoadWarriorApiCall";
import { camelCase } from "lodash";

function App() {
  const [responses, setResponse] = useState([]);
  // const [responseFailure, setResponseFailure] = useState()

  return (
    <div className="App">
      <header className="App-header">
        Drag your distribution csv here:
        <input
          className={"fileInput"}
          onChange={function (event) {
            var fileList = document.querySelector(".fileInput").files;
            console.log(`fileList:`, fileList);
            let i = 0;
            Papa.parse(fileList[0], {
              header: true,
              transformHeader: (header) => {
                console.log(`header:`, header);
                return header ? camelCase(header) : `noHeader__${i++}`;
              },
              complete: function (results) {
                console.log("Finished:", results.data);
                startRoadWarriorApiCall(results.data, (response) => {
                  setResponse([...responses, response]);
                });
              },
            });
          }}
          type="file"
        ></input>
        {responses.map(({ name, success, error, results }, i) => {
          return (
            <div key={i}>
              {name} {success} {JSON.stringify(error, null, 2)}{" "}
              {JSON.stringify(results, null, 2)}
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
