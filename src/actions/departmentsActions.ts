import types from "../types/departmentsTypes";


const addDepartment = (name:string) => ({
  type: types.ADD_DEPARTMENT,
  name,
});

const addDepartmentWithDB = (name:string) => ({
  type: types.ADD_DEPARTMENT,
  name,
});

const addPositionToDepartment = (departmentIndex:number,name:string,unit:string,price:number,id:string) => ({
  type: types.ADD_POSITION_TO_DEPARTMENT,
  name,
  unit,
  price,
  departmentIndex,
  id,
});

const addPositionToDepartmentWithDB = (departmentIndex:number,name:string,unit:string,price:number,departmentName:string) => ({
  type: types.ADD_POSITION_TO_DEPARTMENT_WITH_DB,
  name,
  unit,
  price,
  departmentIndex,
  departmentName,
});

const deleteDepartment = (departmentIndex:number) => ({
  type: types.DELETE_DEPARTMENT,
  departmentIndex,
});

const deleteDepartmentWithDB = (departmentIndex:number) => ({
  type: types.DELETE_DEPARTMENT,
  departmentIndex,
});

const deletePositionInDepartment = (departmentIndex:number,positionIndex:number) => ({
  type: types.DELETE_POSITION_IN_DEPARTMENT,
  departmentIndex,
  positionIndex,
});

const editDepartmentName = (departmentIndex:number,name:string) => ({
  type: types.EDIT_DEPARTMENT_NAME,
  departmentIndex,
  name,
});

const editPositionCountInDepartment = (departmentIndex:number,positionIndex:number,count:number) => ({
  type: types.EDIT_POSITION_COUNT_IN_DEPARTMENT,
  departmentIndex,
  positionIndex,
  count
});

const editPositionNameInDepartment = (departmentIndex:number,positionIndex:number,name:string) => ({
  type: types.EDIT_POSITION_NAME_IN_DEPARTMENT,
  departmentIndex,
  positionIndex,
  name
});

const editPositionPriceInDepartment = (departmentIndex:number,positionIndex:number,price:number) => ({
  type: types.EDIT_POSITION_PRICE_IN_DEPARTMENT,
  departmentIndex,
  positionIndex,
  price
});

const editPositionUnitInDepartment = (departmentIndex:number,positionIndex:number,unit:string) => ({
  type: types.EDIT_POSITION_UNIT_IN_DEPARTMENT,
  departmentIndex,
  positionIndex,
  unit
});

const resetPositionsInDepartment = (departmentIndex:number) => ({
  type: types.RESET_POSITIONS_IN_DEPARTMENT,
  departmentIndex,
});

const resetDepartments = () => ({
  type: types.RESET_DEPARTMENTS,
});

const deletePositionInDepartmentWithDB = (departmentIndex:number,positionIndex:number,id:string) => ({
  type: types.DELETE_POSITION_IN_DEPARTMENT_WITH_DB,
  departmentIndex,
  positionIndex,
  id,
});

const movePositionToAnotherDepartment = (oldDepartmentIndex: number,newDepartmentIndex: number, positionIndex: number) => ({
  type: types.MOVE_POSITION_TO_ANOTHER_DEPARTMENT,
  oldDepartmentIndex,
  newDepartmentIndex,
  positionIndex
});

const editPositionNameInDepartmentWithDb = (departmentIndex:number,positionIndex:number,name:string,id:string) => ({
  type: types.EDIT_POSITION_NAME_IN_DEPARTMENT_WTIH_DB,
  departmentIndex,
  positionIndex,
  name,
  id
});

const editPositionUnitInDepartmentWithDb = (departmentIndex:number,positionIndex:number,unit:string,id:string) => ({
  type: types.EDIT_POSITION_UNIT_IN_DEPARTMENT_WITH_DB,
  departmentIndex,
  positionIndex,
  unit,
  id
});

const editPositionPriceInDepartmentWithDb = (departmentIndex: number, positionIndex: number, price: number,id:string) => ({
  type: types.EDIT_POSITION_PRICE_IN_DEPARTMENT_WITH_DB,
  departmentIndex,
  positionIndex,
  price,
  id
});

const editWholePositionInDb = (id: string, department: string, name: string, unit: string, price: number) => ({
  type: types.EDIT_WHOLE_POSITION_IN_DB,
  department,
  name,
  unit,
  price,
  id
})

const addAdditionalCosts = (departmentIndex: number, positionIndex: number) => ({
  type: types.ADD_ADDITIONAL_COSTS,
  departmentIndex,
  positionIndex,
})

const initializeAdditionalCosts = (departmentIndex: number, positionIndex: number) => ({
  type: types.INITIALIZE_ADDITIONAL_COSTS,
  departmentIndex,
  positionIndex,
})

const deleteAdditionalCost = (departmentIndex: number, positionIndex: number, additionalCostIndex: number) => ({
  type: types.DELETE_ADDITIONAL_COST,
  departmentIndex,
  positionIndex,
  additionalCostIndex
})

const resetAdditionalCosts = (departmentIndex: number, positionIndex: number) => ({
  type: types.RESET_ADDITIONAL_COSTS,
  departmentIndex,
  positionIndex,
})

const edditAdditionalCostName = (departmentIndex: number, positionIndex: number,additionalCostIndex:number, name: string) => ({
  type: types.EDIT_ADDITIONALCOST_NAME,
  departmentIndex,
  positionIndex,
  additionalCostIndex,
  name
})

const edditAdditionalCostAmount = (departmentIndex: number, positionIndex: number,additionalCostIndex:number, amount: number) => ({
  type: types.EDIT_ADDITIONALCOST_AMOUNT,
  departmentIndex,
  positionIndex,
  additionalCostIndex,
  amount
})

const edditAdditionalCostType = (departmentIndex: number, positionIndex: number,additionalCostIndex:number, calculationType: string) => ({
  type: types.EDIT_ADDITIONALCOST_TYPE,
  departmentIndex,
  positionIndex,
  additionalCostIndex,
  calculationType,
})

const resetAllPricesAndAdditionalCosts = () => ({
  type: types.RESET_ALL_COUNTS_AND_ADDITIONAL_COSTS,
})


const loadDepartmentsStateFromJSON = (json:string) => ({
  type: types.LOAD_DEPARTMENTS_STATE_FROM_JSON,
  json: json
})

export default {
  addDepartment,
  addDepartmentWithDB,
  addPositionToDepartment,
  addPositionToDepartmentWithDB,
  deleteDepartment,
  deleteDepartmentWithDB,
  deletePositionInDepartment,
  editDepartmentName,
  editPositionCountInDepartment,
  editPositionNameInDepartment,
  editPositionPriceInDepartment,
  editPositionUnitInDepartment,
  resetPositionsInDepartment,
  resetDepartments,
  deletePositionInDepartmentWithDB,
  movePositionToAnotherDepartment,
  editPositionNameInDepartmentWithDb,
  editPositionUnitInDepartmentWithDb,
  editPositionPriceInDepartmentWithDb,
  editWholePositionInDb,
  addAdditionalCosts,
  initializeAdditionalCosts,
  resetAdditionalCosts,
  deleteAdditionalCost,
  edditAdditionalCostName,
  edditAdditionalCostAmount,
  edditAdditionalCostType,
  resetAllPricesAndAdditionalCosts,
  loadDepartmentsStateFromJSON,
}
  