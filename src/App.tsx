import React from "react";
import NavigationBar from "./components/NavigationBar";
import CalculatorScreen from "./components/CalculatorScreen";
import EditionScreen from "./components/EditionScreen";
import { useSelector } from 'react-redux';
import { RootState } from './reducers/rootReducer';
//style
import 'bootstrap/dist/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.min.css";
import "./components/css/style.css";
function App() {
	const state = useSelector((state: RootState) => state.activeScreen);
	return (
		<div>
			<NavigationBar/>
			{state.showCalculator && <CalculatorScreen />}
			{state.showEdition && <EditionScreen/>}
		</div>
	);
}

export default App;
