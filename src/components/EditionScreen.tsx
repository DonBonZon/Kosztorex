import React, { useState } from "react";
import SingleEditPosition from "./SingleEditPosition";
import { FormControl, Form } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import departmentsActions from "../actions/departmentsActions";


function EditionScreen() {
	const positions = useSelector((state: RootState) => state.departments);
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		department: "",
		name: "",
		unit: "",
		price: 0,
	});

	const handleDepartmentInput = (event: any) => {
		let text = event.target.value;
		setInputs((prevState) => {
			return Object.assign({}, prevState, { department: text });
		});
	};

	const handleNameInput = (event: any) => {
		let text = event.target.value;
		setInputs((prevState) => {
			return Object.assign({}, prevState, { name: text });
		});
	};

	const handleUnitInput = (event: any) => {
		let text = event.target.value;
		setInputs((prevState) => {
			return Object.assign({}, prevState, { unit: text });
		});
	};

	const validatePrice = (event: any) => {	
		const regexPrice = /^\d*\.?\d{0,2}?$/;	// walidacja nie dziala tak jakbym chcial, moze byc np pare '.'. Sprawdza po pojedynczym znaku i nie wiem jak to lepeij zvalidowac 
		if (!regexPrice.test(event.key)) {
			event.preventDefault();
		}
	};
	
	const deleteEmptyDepartment = (departmentIndex: number) => {
		if (positions[departmentIndex].positions.length === 1) { // nie mam pojecia czemu 1 a nie 0, pewnie zanim usunie sie z db to caly czas jest 1 element
			dispatch(departmentsActions.deleteDepartment(departmentIndex));
		}
	}

	const handlePriceInput = (event: any) => {
		let text = event.target.value;
			setInputs((prevState) => {
				return Object.assign({}, prevState, { price: parseFloat(text) });
			});
		};

	const addPosition = () => {
		if (inputs.department !== "" && inputs.name !== "" && inputs.unit !== "" && inputs.price !== 0) {
			let departmentIndex = positions.findIndex((position) => position.name === inputs.department);
			if (departmentIndex === -1) {
				dispatch(departmentsActions.addDepartmentWithDB(inputs.department));
				departmentIndex = positions.length;
			}
			dispatch(departmentsActions.addPositionToDepartmentWithDB(departmentIndex, inputs.name, inputs.unit, inputs.price, inputs.department));
			console.log("dodano");
		}
	};

	const findDepartmentIndex = (departmentName:string) => {
		return positions.findIndex((position) => position.name === departmentName);
	};


	return (
		<Table borderless style={{ marginTop: "50px" }}>
			<tbody>
				<tr>
					<td colSpan={5}>
						<Form.Label className="align-middle textInTable">
							Dodawanie pozycji
						</Form.Label>
					</td>
				</tr>

				<tr>
					<td className="align-middle">
						<FormControl
							placeholder="Dział"
							name="DepartmentInput"
							onChange={(e) => handleDepartmentInput(e)}
						/>
					</td>
					<td className="align-middle">
						<FormControl placeholder="Nazwa pozycji" name="PositionNameInput" 	onChange={(e) => handleNameInput(e)} />
					</td>
					<td className="align-middle">
						<FormControl placeholder="Jednostka" name="PositionUnitInput" 	onChange={(e) => handleUnitInput(e)}/>
					</td>
					<td className="align-middle">
						<FormControl placeholder="Cena" name="PosiitonPriceInput" onKeyPress={(e:any)=>validatePrice(e)}	onChange={(e) => handlePriceInput(e)}/>
					</td>
					<td>
						<i
							className="fa fa-plus-square fa-3x addIcon"
							onClick={() => addPosition()}></i>
					</td>
				</tr>

				<tr>
					<td colSpan={5}>
						<Form.Label className="align-middle textInTable">
							Edycja pozycji
						</Form.Label>
					</td>
				</tr>

				
				{positions.map((department, index) =>
					department.positions.map((item, idx) => (
						<SingleEditPosition
						department={department.name}
						name={item.name}
						unit={item.unit}
						price={item.price}
						departmentIndex={index}
						positionIndex={idx}
						id={item.id}
							deleteDepartmentIfEmpty={deleteEmptyDepartment}
							findDepartmentIndex={findDepartmentIndex}
							departmentLength={positions.length}
						>
						</SingleEditPosition>
					))
				)}
			</tbody>
		</Table>
	);
}

export default EditionScreen;
