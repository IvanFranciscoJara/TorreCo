import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from './store'

let initialData = {
  loading: false,
  Navbar: false,
  NavbarUsu: false,
}

let TOOGLE_LOADING_PAGE = 'TOOGLE_LOADING_PAGE'
let TOOGLE_NAVBAR = 'TOOGLE_NAVBAR'
let TOOGLE_NAVBAR_USU = 'TOOGLE_NAVBAR_USU'

export default function reducer(
  state = initialData,
  action: {
    type: typeof TOOGLE_LOADING_PAGE | typeof TOOGLE_NAVBAR | typeof TOOGLE_NAVBAR_USU
    payload: any
  },
) {
  switch (action.type) {
    case TOOGLE_LOADING_PAGE:
      return { loading: action.payload, Navbar: false, NavbarUsu: false }
    case TOOGLE_NAVBAR:
      return { ...state, Navbar: action.payload }
    case TOOGLE_NAVBAR_USU:
      return { ...state, NavbarUsu: action.payload }
    default:
      return state
  }
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const ToogleLoadingAction = (value: boolean): AppThunk => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    dispatch({ type: TOOGLE_LOADING_PAGE, payload: value })
  }
}

export const ToogleNavbarAction = (value: boolean) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    dispatch({ type: TOOGLE_NAVBAR, payload: value })
  }
}

export const ToogleNavbarUsuAction = (value: boolean) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    dispatch({ type: TOOGLE_NAVBAR_USU, payload: value })
  }
}
