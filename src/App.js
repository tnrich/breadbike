import React from "react";
import Papa from "papaparse";
import "./App.css";
import { createSpreadsheets } from "./utils/createSpreadsheets";
import { camelCase } from "lodash";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={createSpreadsheets}>click me</button>
        Drag your distribution csv here:
        <input
          className={"fileInput"}
          onChange={function (event) {
            var fileList = document.querySelector(".fileInput").files;
            console.log(`fileList:`, fileList);
            Papa.parse(fileList[0], {
              header: true,
              transformHeader: camelCase,
              complete: function(results) {
                console.log("Finished:", results.data);
                createSpreadsheets(results.data)
              }
            })
          }}
          type="file"
        ></input>
      </header>
    </div>
  );
}

export default App;


