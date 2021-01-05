import React, { useState } from "react";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import { SinglePositionState } from "../reducers/departmentsReducer";
import { useDispatch } from "react-redux";
import departmentsActions from "../actions/departmentsActions";
import AdditionalCost from "./additionalCost";
interface Props {
	key: number;
	positionData: SinglePositionState;
	parentIndex: number;
	positionIndex: number;
	calcualteAdditionalCosts: any
}

function SinglePosition({ positionData, positionIndex, parentIndex ,calcualteAdditionalCosts}: Props) {

	const dispatch = useDispatch();

	const getSumWithoutAdditional = () => positionData.count * positionData.price;

	const incrementCount = () =>
		dispatch(
			departmentsActions.editPositionCountInDepartment(
				parentIndex,
				positionIndex,
				positionData.count + 1
			)
		);
	
	const decrementCount = () => {
		if (positionData.count > 0)
			dispatch(
				departmentsActions.editPositionCountInDepartment(
					parentIndex,
					positionIndex,
					positionData.count - 1
				)
			);
	};

	const incrementPrice = () =>
		dispatch(
			departmentsActions.editPositionPriceInDepartment(
				parentIndex,
				positionIndex,
				parseFloat(positionData.price.toString()) + 1
			)
		);
	
	const decrementPrice = () => {
		if (positionData.price > 0)
			dispatch(
				departmentsActions.editPositionPriceInDepartment(
					parentIndex,
					positionIndex,
					positionData.price - 1
				)
			);
	};

	const validateAndUpdateCount = (evt: any) => {
		const regexCount = /^\d*$/;
		let text = evt.target.value;
		if (text === "") {
			text = 0;
		}
		if (regexCount.test(text)) {
			dispatch(
				departmentsActions.editPositionCountInDepartment(
					parentIndex,
					positionIndex,
					parseInt(text)
				)
			);
		}
	};

	const validateAndUpdatePrice = (evt: any) => {
		const regexPrice = /^\d*\.?\d{0,2}?$/;
		let text = evt.target.value;
		if (text === "") {
			text = 0;
		} else if (text[0] === "0") {
			//usuwa 0 z przodu
			text = text.slice(1);
		}
		if (regexPrice.test(text)) {
			dispatch(
				departmentsActions.editPositionPriceInDepartment(
					parentIndex,
					positionIndex,
					text
				)
			);
		}
	};

	const handleCheckBoxChange = (evt:any) => {
		if (evt.target.checked) {
			dispatch(departmentsActions.initializeAdditionalCosts(parentIndex, positionIndex));
		} else dispatch(departmentsActions.resetAdditionalCosts(parentIndex, positionIndex));
	};

	return (
		<>
			<tr>
				<td className="cellWithLabel align-middle">
					<Form.Label id="nameLabel">{positionData.name}</Form.Label>
				</td>

				<td className="cellWithInputs align-middle">
					<InputGroup>
						<InputGroup.Prepend id="count">
							<Button
								onClick={() => decrementCount()}
								variant="outline-secondary">
								-
							</Button>
						</InputGroup.Prepend>
						<FormControl
							onChange={(evt) => validateAndUpdateCount(evt)}
							value={positionData.count}
						/>
						<InputGroup.Append>
							<Button
								onClick={() => incrementCount()}
								variant="outline-secondary">
								+
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</td>

				<td className="cellWithUnit align-middle">
					<Form.Label>{positionData.unit}</Form.Label>
				</td>

				<td className="cellWithInputs align-middle">
					<InputGroup id="price">
						<InputGroup.Prepend>
							<Button
								onClick={() => decrementPrice()}
								variant="outline-secondary">
								-
							</Button>
						</InputGroup.Prepend>
						<FormControl
							onChange={(evt) => validateAndUpdatePrice(evt)}
							value={positionData.price}
						/>
						<InputGroup.Append>
							<Button
								onClick={() => incrementPrice()}
								variant="outline-secondary">
								+
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</td>

				<td className="align-middle">
					<Form.Label>PLN</Form.Label>
				</td>

				<td className="align-middle cellWithCheckbox">
					<Form.Check
						className="marginLeft80"
						label={"dodatkowe koszta"}
						type={"switch"}
						onChange={(evt: any) => handleCheckBoxChange(evt)}
						checked={positionData.addionalCosts!==undefined}
						id={positionData.id}></Form.Check>
				</td>

				<td className="cellWithLabel align-middle">
					<Form.Label id="sumLabel">{positionData.addionalCosts===undefined? getSumWithoutAdditional() + " PLN":getSumWithoutAdditional() +" PLN " + "(+"+calcualteAdditionalCosts(parentIndex,positionIndex)+" PLN)"}</Form.Label>
				</td>
			</tr>

			{positionData.addionalCosts!==undefined && positionData.addionalCosts.map((additionCostData, additionalCostIndex) =>
				<AdditionalCost key={additionalCostIndex} positionIndex={positionIndex} parentIndex={parentIndex} additionalCostIndex={additionalCostIndex} additionalCostsCount={ positionData.addionalCosts.length} additionCostData={additionCostData} getSumWithoutAdditional={getSumWithoutAdditional}></AdditionalCost>)
			
		}
		</>
	);
}

export default SinglePosition;
