import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AppContextProvider } from './components/context/App/AppContext'

import Categories from './components/categories/Categories'
import Shops from './components/shops/Shops'
import Items from './components/items/items'
import Checkout from './components/checkout/Checkout'
import Map from './components/map/Map'

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
            <Route path='/checkout' component={Checkout} />
            <Route path='/track-order' component={Map} />
            <Route path='/:categoryid/:shopname/:shopid' component={Items} />
          </Switch>
        </Router>
      </div>
    </AppContextProvider>
  )
}

export default App
