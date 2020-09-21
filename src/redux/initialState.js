// import { storage } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  cellsState: {},
  currentStyles: {},
  stylesState: {},
  title: 'Название таблицы',
  date: new Date().toJSON(),
}

export const normalizeInitialState = (state) => {
  return state ? state : defaultState;
}
