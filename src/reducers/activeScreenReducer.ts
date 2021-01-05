import types from "../types/activeScreenTypes";

interface ActiveScreen {
	showCalculator: boolean;
	showWorkers: boolean;
	showEdition: boolean;
}

const INITIAL_STATE: ActiveScreen = {
	showCalculator: true,
	showWorkers: false,
	showEdition: false,
};

const activeScreenReducer = (
	state = INITIAL_STATE,
	action: any
): ActiveScreen => {
	switch (action.type) {
		case types.SHOW_CALCULATOR_SCREEN:
			return {
				showCalculator: true,
				showWorkers: false,
				showEdition: false,
			};

		case types.SHOW_WORKERS_SCREEN:
			return {
				showCalculator: false,
				showWorkers: true,
				showEdition: false,
			};

		case types.SHOW_EDITION_SCREEN:
			return {
				showCalculator: false,
				showWorkers: false,
				showEdition: true,
			};

		default:
			return state;
	}
};

export default activeScreenReducer;
