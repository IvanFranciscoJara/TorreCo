import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../GlobalFiles/Global.sass'
import Home from '../Pages/Home'
// import Question from '../Pages/Question'
// import End from '../Pages/End'
import Layout from './Layout'

export const ReactRouter: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/Question/:index" component={Question} />
        <Route exact path="/End" component={End} /> */}
      </Switch>
    </Layout>
  </BrowserRouter>
)
