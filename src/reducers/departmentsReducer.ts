import types from "../types/departmentsTypes";
import { v4 as uuidv4 } from "uuid";
import AdditionalCost from "../components/additionalCost";
const { remote } = require("electron");
const dbInstance = remote.getGlobal("db");
export interface SinglePositionState {
	name: string;
	unit: string;
	price: number;
	count: number;
	id: string;
	addionalCosts?: AdditionalCost[];
}

interface Departments {
	id: string;
	name: string;
	positions: SinglePositionState[];
}

interface AdditionalCost {
	name: string;
	calculationType: "amount" | "percentage"
	amount: number;
}
const INITIAL_STATE: Departments[] = [];

const departmentReducer = (
	state = INITIAL_STATE,
	action: any
): Departments[] => {
	switch (action.type) {
		case types.ADD_DEPARTMENT:
			return [
				...state,
				{
					id: uuidv4(),
					name: action.name,
					positions: [],
				},
			];

		case types.ADD_DEPARTMENT_WITH_DB:
			let deparments: string[] = [];
			dbInstance.getDepartments().then((item: string) => deparments.push(item));
			if (deparments.includes(action.name)) {
				return [
					...state,
					{
						id: uuidv4(),
						name: action.name,
						positions: [],
					},
				];
			}

		case types.ADD_POSITION_TO_DEPARTMENT:
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: [
							...item.positions,
							{
								name: action.name,
								unit: action.unit,
								price: action.price,
								count: 0,
								id: action.id,
							},
						],
					})
					: item
			);

		case types.ADD_POSITION_TO_DEPARTMENT_WITH_DB:
			dbInstance.addPosition(
				action.departmentName,
				action.name,
				action.unit,
				action.price
			);
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: [
							...item.positions,
							{
								name: action.name,
								unit: action.unit,
								price: action.price,
								count: 0,
								id: uuidv4(),
							},
						],
					})
					: item
			);

		case types.DELETE_DEPARTMENT:
			return state.filter((item) => item !== state[action.departmentIndex]);

		case types.DELETE_POSITION_IN_DEPARTMENT:
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.filter(
							(position) => position !== item.positions[action.positionIndex]
						),
					})
					: item
			);

		case types.DELETE_POSITION_IN_DEPARTMENT_WITH_DB:
			dbInstance.deletePosition(action.id);
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.filter(
							(position) => position !== item.positions[action.positionIndex]
						),
					})
					: item
			);

		case types.EDIT_DEPARTMENT_NAME:
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, { name: action.name })
					: item
			);

		case types.EDIT_POSITION_COUNT_IN_DEPARTMENT:
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, { count: action.count })
								: position
						),
					})
					: item
			);

		case types.EDIT_POSITION_NAME_IN_DEPARTMENT:
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, { name: action.name })
								: position
						),
					})
					: item
			);

		case types.EDIT_POSITION_NAME_IN_DEPARTMENT_WTIH_DB:
			dbInstance.changePositionName(action.id, action.name);
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, { name: action.name })
								: position
						),
					})
					: item
			);

		case types.EDIT_POSITION_PRICE_IN_DEPARTMENT:
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, { price: action.price })
								: position
						),
					})
					: item
			);

		case types.EDIT_POSITION_PRICE_IN_DEPARTMENT_WITH_DB:
			dbInstance.changePositionPrice(action.id, action.price);
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, { price: action.price })
								: position
						),
					})
					: item
			);

		case types.EDIT_POSITION_UNIT_IN_DEPARTMENT:
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, { unit: action.unit })
								: position
						),
					})
					: item
			);

		case types.EDIT_POSITION_UNIT_IN_DEPARTMENT_WITH_DB:
			dbInstance.changePositionUnit(action.id, action.unit);
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, { unit: action.unit })
								: position
						),
					})
					: item
			);

		case types.RESET_POSITIONS_IN_DEPARTMENT:
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, { positions: [] })
					: item
			);

		case types.MOVE_POSITION_TO_ANOTHER_DEPARTMENT:
			let postion =
				state[action.oldDepartmentIndex].positions[action.positionIndex];
			let newPositions = state.map((item) =>
				item === state[action.oldDepartmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.filter(
							(position) => position !== item.positions[action.positionIndex]
						),
					})
					: item
			);

			return newPositions.map((item) =>
				item === state[action.newDepartmentIndex]
					? Object.assign({}, item, {
						positions: [...item.positions, postion],
					})
					: item
			);

		case types.EDIT_WHOLE_POSITION_IN_DB:
			dbInstance.editWholePosition(
				action.id,
				action.department,
				action.name,
				action.unit,
				action.price
			);
			return state;

		case types.INITIALIZE_ADDITIONAL_COSTS:
			let additionalCosts =
				state[action.departmentIndex].positions[action.positionIndex]
					.addionalCosts;
			if (additionalCosts?.length === undefined) {
				additionalCosts = [{ name: "",calculationType:"amount", amount: 0 }];
			}
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, {
									addionalCosts: additionalCosts,
								})
								: position
						),
					})
					: item
			);
		case types.RESET_ADDITIONAL_COSTS:
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, {
									addionalCosts: undefined,
								})
								: position
						),
					})
					: item
			);
		case types.ADD_ADDITIONAL_COSTS:
			let newAdditionalCosts =
				state[action.departmentIndex].positions[action.positionIndex]
					.addionalCosts;
			newAdditionalCosts?.push({ name: "",calculationType:"amount", amount: 0 });
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, {
									addionalCosts: newAdditionalCosts,
								})
								: position
						),
					})
					: item
			);

 case types.EDIT_ADDITIONALCOST_AMOUNT:
		let additionCostWithUpdatedPrice = state[action.departmentIndex].positions[action.positionIndex].addionalCosts.map((additionalCost) => additionalCost === state[action.departmentIndex].positions[action.positionIndex].addionalCosts[action.additionalCostIndex] ? Object.assign({}, additionalCost, { amount: action.amount }):additionalCost);
		return state.map((item) =>
			item === state[action.departmentIndex]
				? Object.assign({}, item, {
					positions: item.positions.map((position) =>
						position ===
							state[action.departmentIndex].positions[action.positionIndex]
							? Object.assign({}, position, { addionalCosts: additionCostWithUpdatedPrice })
							: position
					),
				})
				: item
		);
		

		case types.EDIT_ADDITIONALCOST_NAME:
			let additionCostWithUpdatedName = state[action.departmentIndex].positions[action.positionIndex].addionalCosts.map((additionalCost) => additionalCost === state[action.departmentIndex].positions[action.positionIndex].addionalCosts[action.additionalCostIndex] ? Object.assign({}, additionalCost, { name: action.name }):additionalCost);
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
						positions: item.positions.map((position) =>
							position ===
								state[action.departmentIndex].positions[action.positionIndex]
								? Object.assign({}, position, { addionalCosts: additionCostWithUpdatedName })
								: position
						),
					})
					: item
			);

		case types.DELETE_ADDITIONAL_COST: 
			let additionCostWithDeletedItem = state[action.departmentIndex].positions[action.positionIndex].addionalCosts;
			additionCostWithDeletedItem.splice(action.additionalCostIndex, 1)
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
							positions: item.positions.map((position) =>
								position ===
								state[action.departmentIndex].positions[action.positionIndex]
									? Object.assign({}, position, {
											addionalCosts: additionCostWithDeletedItem, 
									  })
									: position
							),
					  })
					: item
			);

			case types.EDIT_ADDITIONALCOST_TYPE: 
			let additionCostWithUpdatedType =  state[action.departmentIndex].positions[action.positionIndex].addionalCosts.map((additionalCost) => additionalCost === state[action.departmentIndex].positions[action.positionIndex].addionalCosts[action.additionalCostIndex] ? Object.assign({}, additionalCost, { calculationType: action.calculationType }):additionalCost);
			return state.map((item) =>
				item === state[action.departmentIndex]
					? Object.assign({}, item, {
							positions: item.positions.map((position) =>
								position ===
								state[action.departmentIndex].positions[action.positionIndex]
									? Object.assign({}, position, {
											addionalCosts: additionCostWithUpdatedType, 
									  })
									: position
							),
					  })
					: item
			);
		
		case types.RESET_ALL_COUNTS_AND_ADDITIONAL_COSTS:
			return state.map((item)=>Object.assign({}, item, {
				positions: item.positions.map((position) =>
					Object.assign({}, position, {
						count:0,
						addionalCosts: undefined, 
			})
				),
			}))
		
		case types.RESET_DEPARTMENTS:
			return [];

		case types.LOAD_DEPARTMENTS_STATE_FROM_JSON:
			console.log(JSON.parse(action.json));
			return JSON.parse(action.json);
		
		default:
			return state;
	}
};

export default departmentReducer;
