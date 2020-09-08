import { storage } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  cellsState: {},
  currentStyles: {}
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
