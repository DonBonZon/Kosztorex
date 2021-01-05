import React, { useState } from "react";
import { FormControl, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import departmentsActions from "../actions/departmentsActions";
interface Props {
	department: string;
	name: string;
	unit: string;
	price: number;
	departmentIndex: number;
	positionIndex: number;
	id: string;
	deleteDepartmentIfEmpty: any;
	findDepartmentIndex: any;
	departmentLength: number;
}
function SingleEditPosition({
	department,
	name,
	unit,
	price,
	departmentIndex,
	positionIndex,
	id,
	deleteDepartmentIfEmpty,
	findDepartmentIndex,
	departmentLength,
}: any) {
	const [editionActive, setEditionActivation] = useState(false);
	const [editedPosition, setEditedPosition] = useState({
		department: department,
		name: name,
		unit: unit,
		price: price,
	});
	const dispatch = useDispatch();
	const deletePosition = () => {
		dispatch(
			departmentsActions.deletePositionInDepartmentWithDB(
				departmentIndex,
				positionIndex,
				id
			)
		);
		deleteDepartmentIfEmpty(departmentIndex);
	};

	const handleDepartmentNameEdition = (event: any) => {
		let text = event.target.value;
		setEditedPosition((prevState) =>
			Object.assign({}, prevState, { department: text })
		);
	};

	const handleNameEdition = (event: any) => {
		let text = event.target.value;
		setEditedPosition((prevState) =>
			Object.assign({}, prevState, { name: text })
		);
	};

	const handleUnitEdition = (event: any) => {
		let text = event.target.value;
		setEditedPosition((prevState) =>
			Object.assign({}, prevState, { unit: text })
		);
	};

	const handlePriceEdition = (event: any) => {
		let text = event.target.value;
		setEditedPosition((prevState) =>
			Object.assign({}, prevState, {
				price: parseFloat(parseFloat(text).toFixed(2)),
			})
		); //nie do konca eleganckie rozwiazanie, ale dziala
	};

	const handleWholeEdition = () => {
		setEditionActivation(false);
		
		if (name !== editedPosition.name) {
			dispatch(
				departmentsActions.editPositionNameInDepartment(
					departmentIndex,
					positionIndex,
					editedPosition.name,
				)
			);
		}

		if (unit !== editedPosition.unit) {
			dispatch(
				departmentsActions.editPositionUnitInDepartment(
					departmentIndex,
					positionIndex,
					editedPosition.unit,
				)
			);
		}

		if (price !== editedPosition.price) {
			dispatch(
				departmentsActions.editPositionPriceInDepartment(
					departmentIndex,
					positionIndex,
					editedPosition.price,
				)
			);
		}

		if (department !== editedPosition.department) {
			let newDepartmentIndex = findDepartmentIndex(editedPosition.department);
			if (newDepartmentIndex === -1) {
				dispatch(departmentsActions.addDepartment(editedPosition.department));
				dispatch(
					departmentsActions.movePositionToAnotherDepartment(
						departmentIndex,
						departmentLength,
						positionIndex
					)
				);
			} else {
				dispatch(
					departmentsActions.movePositionToAnotherDepartment(
						departmentIndex,
						newDepartmentIndex,
						positionIndex
					)
				);
			}
			
			//dispatch(departmentsActions.editPositionDepartmentWithDb(editedPosition.department, id));
			deleteDepartmentIfEmpty(departmentIndex);
		}
		dispatch(departmentsActions.editWholePositionInDb(id, editedPosition.department, editedPosition.name, editedPosition.unit, editedPosition.price));
	};

	return (
		<tr>
			{!editionActive && (
				<>
					<td className="align-middle">
						<Form.Label id="nameLabel">{department}</Form.Label>
					</td>
					<td className="align-middle">
						<Form.Label id="nameLabel">{name}</Form.Label>
					</td>
					<td className="align-middle">
						<Form.Label id="nameLabel">{unit}</Form.Label>
					</td>
					<td className="align-middle">
						<Form.Label id="nameLabel">{price}</Form.Label>
					</td>
					<td className="align-middle editionIconsRow">
						<i
							className="fa fa-edit editIcon"
							onClick={() => setEditionActivation(true)}></i>
						<i
							className="fa fa-trash deleteIcon"
							onClick={() => deletePosition()}></i>
					</td>
				</>
			)}

			{editionActive && (
				<>
					<td className="align-middle">
						<FormControl
							as="textarea"
							defaultValue={department}
							onChange={(e) => handleDepartmentNameEdition(e)}
						/>
					</td>
					<td className="align-middle">
						<FormControl
							as="textarea"
							defaultValue={name}
							onChange={(e) => handleNameEdition(e)}
						/>
					</td>
					<td className="align-middle">
						<FormControl
							as="textarea"
							defaultValue={unit}
							onChange={(e) => handleUnitEdition(e)}
						/>
					</td>
					<td className="align-middle">
						<FormControl
							as="textarea"
							defaultValue={price}
							onChange={(e) => handlePriceEdition(e)}
						/>
					</td>
					<td className="align-middle">
						<i
							className="fa fa-check-square  fa-2x acceptEditIcon"
							onClick={() => handleWholeEdition()}></i>
					</td>
				</>
			)}
		</tr>
	);
}

export default SingleEditPosition;
