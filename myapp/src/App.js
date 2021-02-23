import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { UserContextProvider } from './components/context/user/UserContext'

import PrivateRoute from './PrivateRoute'
import PrivateDeliveryRoute from './PrivateDeliveryRoute'

import Categories from './components/categories/Categories'
import Shops from './components/shops/Shops'
import Items from './components/items/items'
import Checkout from './components/checkout/Checkout'
import Map from './components/map/Map'
import DeliveryHome from './components/delivery/DeliveryHome'
import Delivery from './components/delivery'
import Business from './components/business/business'
import PageNotFound from './components/pageNotFound'
import Profile from './components/Profile/Profile'

function App () {
  return (
    <div className='App'>
      <Router>
        <UserContextProvider>
          <Switch>
            <Route path='/' exact component={Categories} />
            <Route
              path='/stores/:categoryName/:categoryId'
              exact
              component={Shops}
            />
            <PrivateRoute path='/track-order/:orderid' component={Map} />
            <PrivateRoute path='/profile' component={Profile} />
            <Route path='/checkout/:shopid' component={Checkout} />
            <Route path='/business' component={Business} />
            <Route
              path='/:categoryid/shop/:shopName/:shopId'
              component={Items}
            />
            <Route path='/delivery' exact component={DeliveryHome} />
            <Route path='/delivery/:deliveryguyid' component={Delivery} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </UserContextProvider>
      </Router>
    </div>
  )
}

export default App
