import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AppContextProvider } from './components/context/AppContext'

import Categories from './components/categories/Categories'
import Shops from './components/shops/Shops'
import Items from './components/items/items'

function App () {
  return (
    <AppContextProvider>
      <div className='App'>
        <Router>
          <Switch>
            <Route
              path='/stores/:categoryname/:categoryid'
              exact
              component={Shops}
            />
            <Route path='/' exact component={Categories} />
            <Route path='/:categoryid/:shopname/:shopid' component={Items} />
          </Switch>
        </Router>
      </div>
    </AppContextProvider>
  )
}

export default App
