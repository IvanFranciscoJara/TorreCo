import { saveStorage, getStorage } from './localStorageUtils'
import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from './store'
import { createNoSubstitutionTemplateLiteral } from 'typescript'
interface Props {
  name: string
  status: string[]
  type: string[]
  compensationrange: string[]
  skill: string[]
}
let initialData: Props[] = []

let SAVE_CUSTOM_FILTER = 'SAVE_CUSTOM_FILTER'
let DELETE_CURSOM_FILTER = 'DELETE_CURSOM_FILTER'
let RESTORE_STORAGE_CUSTOM_FILTERS = 'RESTORE_STORAGE_CUSTOM_FILTERS'

export default function reducer(
  state: Props[] = initialData,
  action: {
    type: typeof SAVE_CUSTOM_FILTER | typeof DELETE_CURSOM_FILTER
    payload: any
  },
) {
  switch (action.type) {
    case SAVE_CUSTOM_FILTER:
      return action.payload
    case DELETE_CURSOM_FILTER:
      return action.payload
    case RESTORE_STORAGE_CUSTOM_FILTERS:
      return action.payload
    default:
      return state
  }
}
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const SaveCustomFilter = (value: Props): AppThunk => {
  return (dispatch: ThunkDispatch<RootState, void, Action>, getstore: () => RootState) => {
    let NewCustomFilters = [...getstore().customFilters]
    NewCustomFilters.push(value)
    saveStorage(NewCustomFilters)
    dispatch({ type: SAVE_CUSTOM_FILTER, payload: NewCustomFilters })
  }
}

export const DeleteCustomFilter = (index: number) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getstore: () => RootState,
) => {
  let NewCustomFilters = [...getstore().customFilters]
  NewCustomFilters.splice(index, 1)
  saveStorage(NewCustomFilters)
  dispatch({ type: DELETE_CURSOM_FILTER, payload: NewCustomFilters })
}

// export const CleanQuestions = () => (dispatch: ThunkDispatch<RootState, void, Action>) => {
//   // saveStorage([])
//   // dispatch({ type: CLEAN_QUESTION })
// }
export const CleanQuestions = () => {}
export let restoreStorageCustomFilters = () => (dispatch: ThunkDispatch<RootState, void, Action>) => {
  let ReduxStore = getStorage()
  if (ReduxStore) {
    dispatch({
      type: RESTORE_STORAGE_CUSTOM_FILTERS,
      payload: ReduxStore,
    })
  }
}
