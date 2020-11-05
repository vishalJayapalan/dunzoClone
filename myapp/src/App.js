import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AppContextProvider } from './components/context/App/AppContext'

import Categories from './components/categories/Categories'
import Shops from './components/shops/Shops'
import Items from './components/items/items'
import Checkout from './components/checkout/Checkout'
import Map from './components/map/Map'
import DeliveryHome from './components/delivery/DeliveryHome'
import Delivery from './components/delivery'
import Business from './components/business/business'
import PageNotFound from './components/pageNotFound'

function App () {
  return (
    <div className='App'>
      <Router>
        <AppContextProvider>
          <Switch>
            <Route path='/' exact component={Categories} />
            <Route
              path='/stores/:categoryname/:categoryid'
              exact
              component={Shops}
            />
            <Route path='/checkout/:shopid' component={Checkout} />
            <Route path='/business' component={Business} />
            <Route path='/track-order/:orderid' component={Map} />
            <Route
              path='/:categoryid/shop/:shopname/:shopid'
              component={Items}
            />
            <Route path='/delivery' exact component={DeliveryHome} />
            <Route path='/delivery/:deliveryguyid' component={Delivery} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </AppContextProvider>
      </Router>
    </div>
  )
}

export default App
