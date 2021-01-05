import { combineReducers } from 'redux';
import departmentsReducer from './departmentsReducer'
import activeScreenReducer from './activeScreenReducer';
const rootReducer = combineReducers({
  departments: departmentsReducer,
  activeScreen: activeScreenReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;