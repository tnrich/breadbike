import React from "react";
import Papa from "papaparse";
import "./App.css";
import { startRoadWarriorApiCall } from "./utils/startRoadWarriorApiCall";
import { camelCase } from "lodash";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={startRoadWarriorApiCall}>click me</button>
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
                startRoadWarriorApiCall(results.data);
              },
            });
          }}
          type="file"
        ></input>
      </header>
    </div>
  );
}

export default App;
