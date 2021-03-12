import React from 'react'
import { RootState } from '../Redux/store'
// import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToogleNavbarAction } from '../Redux/GlobalStateDuck'
import './sass/Layout.sass'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const StoreLoading = useSelector((state: RootState) => state.globalState.loading)
  const dispatch = useDispatch()

  return (
    <div className="ContainerLayout">
      <div className="Layout__TopNavBar">
        <div className="left" onClick={() => dispatch(ToogleNavbarAction(true))}>
          <img src="../Images/LogoTorreCo.svg" />
          <button className="btn purple">Jobs/Gigs</button>
          <button className="btn purple">People</button>
        </div>
        <div className="right RF_Title_8 bold">My account</div>
      </div>
      <div className={`Layout__Loading ${!StoreLoading && 'hide'}`}>
        <div className="circle"></div>
      </div>
      <div className={`Layout__Content ${StoreLoading && 'hide'}`}>{children}</div>
    </div>
  )
}

export default Layout
