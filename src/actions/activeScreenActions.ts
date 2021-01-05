import types from "../types/activeScreenTypes";


const show_calculator_screen = () => ({
  type: types.SHOW_CALCULATOR_SCREEN
});

const show_workers_screen = () => ({
  type: types.SHOW_WORKERS_SCREEN,
});

const show_edition_screen = () => ({
  type: types.SHOW_EDITION_SCREEN,
});


export default {
  show_calculator_screen,
  show_workers_screen,
  show_edition_screen,
}
  