import React from "react";
import { InputGroup, FormControl, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import departmentsActions from "../actions/departmentsActions";

interface Props {
	parentIndex: number;
	positionIndex: number;
	additionalCostIndex: number;
	additionalCostsCount: number;
	additionCostData: {
		name: string;
		calculationType: "amount" | "percentage";
		amount: number;
	};
	getSumWithoutAdditional:any
}

function AdditionalCost({
	positionIndex,
	parentIndex,
	additionalCostIndex,
	additionalCostsCount,
	additionCostData,
	getSumWithoutAdditional
}: Props) {
	const dispatch = useDispatch();
	const handleRadioButtons = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			departmentsActions.edditAdditionalCostType(
				parentIndex,
				positionIndex,
				additionalCostIndex,
				event.target.value
			)
		);
	};

	const getAdditionalCost = () => {
		if (additionCostData.name !== "" && additionCostData.amount !== 0) {
		return	additionCostData.calculationType === "amount" ? additionCostData.amount : getSumWithoutAdditional() * additionCostData.amount / 100;
		} else return 0 
	}
	

	const validateAndUpdateAmount = (evt: any) => {
		const regexAmount = /^\d*\.?\d{0,2}?$/;
		let text = evt.target.value;
		if (text === "") {
			text = 0;
		}
		if (regexAmount.test(text)) {
			dispatch(
				departmentsActions.edditAdditionalCostAmount(
					parentIndex,
					positionIndex,
					additionalCostIndex,
					parseInt(text)
				)
			);
		}
	};

	const incrementAmount = () =>
		dispatch(
			departmentsActions.edditAdditionalCostAmount(
				parentIndex,
				positionIndex,
				additionalCostIndex,
				parseFloat(additionCostData.amount.toString()) + 1
			)
		);
	
	const decrementAmount = () => {
		if (additionCostData.amount > 0)
			dispatch(
				departmentsActions.edditAdditionalCostAmount(
					parentIndex,
					positionIndex,
					additionalCostIndex,
					additionCostData.amount - 1
				)
			);
	};

	const helper = () => {
	  if (additionCostData.name !== "" && additionCostData.amount === 0) {
			return "brak wartości"
		} else if (additionCostData.name === "" && additionCostData.amount !== 0) {
			return "brak nazwy"
		}
	}


	return (
		<tr>
			<td className="align-middle additionalCostHelper">{ helper() }</td>
			<td className="align-middle" colSpan={2}>
				<FormControl
					placeholder="Dodatkowe koszta"
					value={additionCostData.name}
					onChange={(event) =>
						dispatch(
							departmentsActions.edditAdditionalCostName(
								parentIndex,
								positionIndex,
								additionalCostIndex,
								event.target.value
							)
						)
					}
				/>
			</td>

			<td className="align-middle" colSpan={2}>
				<div className="spaceAround">
					<Form.Check
						inline
						label="Kwota"
						type="radio"
						name={
							"CheckBox" + parentIndex + positionIndex + additionalCostIndex
						} //taka nazwa daje pewnosc ze name dla kazdego dodatkowego kosztu sie nie powt.
						value="amount"
						checked={additionCostData.calculationType === "amount"}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleRadioButtons(event)
						}
					/>
					<Form.Check
						inline
						label="% od kwoty"
						type="radio"
						name={
							"CheckBox" + parentIndex + positionIndex + additionalCostIndex
						}
						value="percentage"
						checked={additionCostData.calculationType === "percentage"}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleRadioButtons(event)
						}
					/>
				</div>
			</td>

			<td className="align-middle">
				<div className="marginLeft80">
					<InputGroup id="additionalCost">
						<InputGroup.Prepend>
							<Button
								onClick={() => decrementAmount()}
								variant="outline-secondary">
								-
							</Button>
						</InputGroup.Prepend>
						<FormControl
							placeholder={
								additionCostData.calculationType === "amount" ? "PLN" : "%"
							}
							value={
								additionCostData.amount === 0 ? "" : additionCostData.amount
							}
							onChange={(evt) => validateAndUpdateAmount(evt)}
						/>
						<InputGroup.Append>
							<Button
								onClick={() => incrementAmount()}
								variant="outline-secondary">
								+
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</div>
			</td>

			<td className="align-middle">
		
				<div className="additionalCostIconWrapper">
					{additionalCostsCount - 1 === additionalCostIndex && (
						<i
							className="fa fa-plus-square fa-2x"
							onClick={() => {
								dispatch(
									departmentsActions.addAdditionalCosts(
										parentIndex,
										positionIndex
									)
								)
							}}></i>
					)}
					{additionalCostsCount - 1 !== additionalCostIndex && (
						
						<i
							className="fa fa-minus-square fa-2x"
							onClick={() =>
								dispatch(
									departmentsActions.deleteAdditionalCost(
										parentIndex,
										positionIndex,
										additionalCostIndex
									)
								)
							}></i>
					)}
						<Form.Label className="additionalCostLabel">{"+ "+getAdditionalCost()+ " PLN"}</Form.Label>
				</div>

			</td>
		</tr>
	);
}

export default AdditionalCost;
