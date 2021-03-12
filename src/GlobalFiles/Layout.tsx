import React from 'react'
import { IconMenu } from './Icons'
import { RootState } from '../Redux/store'
// import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToogleNavbarAction } from '../Redux/GlobalStateDuck'
import './sass/Layout.sass'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  // const sideNavBar = useRef()
  // const history = useHistory()
  // const StoreNavBarOpen = useSelector((state: RootState) => state.globalState.Navbar)
  const StoreLoading = useSelector((state: RootState) => state.globalState.loading)
  const dispatch = useDispatch()
  // const Redirect = (path) => {
  //   console.log('hola', path)
  //   history.push(path)
  // }

  // const handleClickOutside = e => {
  //   if (!sideNavBar.current.contains(e.target)) {
  //     dispatch(ToogleNavbarAction(false)) //outside click
  //   }
  // }

  // useEffect(() => {
  //   if (open) {
  //     document.addEventListener('mousedown', handleClickOutside)
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [open])

  return (
    <div className="ContainerLayout">
      <div className="Layout__TopNavBar">
        <div className="left" onClick={() => dispatch(ToogleNavbarAction(true))}>
          <div className="left__menu">
            <IconMenu />
          </div>
          <img src="../images/LogoRimac.png" />
        </div>
        <div className="right RF_Title_8 bold">MI CUENTA</div>
      </div>
      {/* <div ref={sideNavBar} className={`Layout__SideNavBar ${!StoreNavBarOpen ? 'hide' : ''}`}>
        <div className="item logo" onClick={() => dispatch(ToogleNavbarAction(false))}>
          <img src="../images/LogoRimacRojo.png" />
        </div>
        <div className="item" onClick={() => Redirect('OperadorGeneraLotes')}>
          Generar Lotes
        </div>
        <div className="item" onClick={() => Redirect('LotesGenerados')}>
          Lotes Generados
        </div>
        <div className="item" onClick={() => Redirect('RevisionLotes')}>
          Revisión de Lotes
        </div>
        <div className="item" onClick={() => Redirect('FirmaLotes')}>
          Firma de Lotes
        </div>
        <div className="item" onClick={() => Redirect('Configuracion')}>
          Configuraciones
        </div>
      </div> */}
      <div className={`Layout__Loading ${!StoreLoading && 'hide'}`}>
        <div className="circle"></div>
      </div>
      <div className={`Layout__Content ${StoreLoading && 'hide'}`}>{children}</div>
    </div>
  )
}

export default Layout
