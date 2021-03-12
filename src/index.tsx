import React from 'react'
import * as reactDOM from 'react-dom'
import { ReactRouter } from './GlobalFiles/ReactRouter'
import { Provider } from 'react-redux'
import generateStore from './Redux/store'

let store = generateStore()

const Component: React.FC<{}> = () => (
  <Provider store={store}>
    <ReactRouter />
  </Provider>
)

reactDOM.render(<Component />, document.getElementById('app'))
