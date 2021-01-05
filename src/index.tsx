import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider, batch } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import departmentsActions from "./actions/departmentsActions";
const { remote } = require("electron");
const dbInstance = remote.getGlobal("db");
const { ipcRenderer } = require('electron');




ipcRenderer.on('newFile', () => {
  store.dispatch(departmentsActions.resetAllPricesAndAdditionalCosts());
})

ipcRenderer.on('saveFile', () => {
  const fs = require("fs");
  const { dialog } = require("electron").remote;
  dialog
				.showSaveDialog(() => {})
				.then((file: any) =>
					file.filePath.endsWith(".json")
						? fs.writeFileSync(file.filePath, store)
						: file.filePath===""?"":fs.writeFileSync(file.filePath + ".json", JSON.stringify(store.getState().departments))	
				);
})

ipcRenderer.on('openFile', () => {
  const fs = require("fs");
  const { dialog } = require("electron").remote;
  dialog
  .showOpenDialog({filters: [
    { name: 'Kosztorex', extensions: ['json'] },
    { name: 'All Files', extensions: ['*'] }
  ]}).then((file: any) => {
      if (!file.canceled) {
        let data = fs.readFileSync(file.filePaths[0]);
        store.dispatch(departmentsActions.loadDepartmentsStateFromJSON(data));
      }
  });
})


const convertPositionsToState = (positions: any) => {
  let departments = Object.keys(positions);
  batch(()=>{ departments.forEach((name, idx) => {
    store.dispatch(departmentsActions.addDepartment(name));
    positions[name].forEach((position: any) =>
      store.dispatch(
        departmentsActions.addPositionToDepartment(
          idx,
          position.name,
          position.unit,
          position.price,
          position._id,
        )
      )
    );
  })})
 
};

let store = createStore(rootReducer);

dbInstance.populatePositionsIfEmpty().then(() => (dbInstance.getSortedPositions().then((positions: any) => convertPositionsToState(positions))));


ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.unregister();
