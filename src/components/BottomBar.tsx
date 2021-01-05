import React from "react";
import { Button } from "react-bootstrap";

interface Props {
	getWholeSum(): number
	generetePdf(): void
}

function BottomBar(props:Props) {
	return (
		<div id="bottomBarWrapper">
			<div className="verticalyCenter">
        <Button  id="generatePdfButton" variant="danger" onClick={()=> props.generetePdf()}>Generuj pdf</Button>
				<span id="wholeSumLabel">Suma: {props.getWholeSum()} PLN</span>
			</div>
		</div>
	);
}

export default BottomBar;
