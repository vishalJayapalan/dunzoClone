import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Categories from './components/categories/Categories'
import Shops from './components/shops/Shops'
import Items from './components/items/items'

function App () {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route
            path='/stores/:categoryname/:categoryid'
            exact
            component={Shops}
          />
          <Route path='/' exact component={Categories} />
          <Route path='/:categoryid/:shopname' component={Items} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
