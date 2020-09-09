import { storage } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  cellsState: {},
  currentStyles: {},
  stylesState: {},
  title: 'Название таблицы'
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
