import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AppContextProvider } from './components/context/App/AppContext'

import Categories from './components/categories/Categories'
import Shops from './components/shops/Shops'
import Items from './components/items/items'
import Checkout from './components/checkout/Checkout'
import Map from './components/map/Map'
import DeliveryHome from './components/delivery/DeliveryHome'
import Delivery from './components/delivery/delivery'
import Business from './components/business/business'
import PageNotFound from './components/pageNotFound/PageNotFound'

function App () {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/delivery' exact component={DeliveryHome} />
          <Route path='/delivery/:deliveryguyid' component={Delivery} />
          <AppContextProvider>
            <Switch>
              <Route
                path='/stores/:categoryname/:categoryid'
                exact
                component={Shops}
              />
              <Route path='/' exact component={Categories} />
              <Route path='/checkout' component={Checkout} />
              <Route path='/business' component={Business} />
              <Route path='/track-order' component={Map} />
              <Route
                path='/:categoryid/shop/:shopname/:shopid'
                component={Items}
              />

              <Route path='*' component={PageNotFound} />
            </Switch>
          </AppContextProvider>
        </Switch>
      </Router>
    </div>
  )
}

export default App
