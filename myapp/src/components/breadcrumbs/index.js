import React from 'react'
import { withRouter } from 'react-router-dom'

const BreadCrumbs = ({ history, location: { pathname } }) => {
  const pathNames = pathname.split('/').filter(param => param)
  console.log('PATHNAMES', pathNames)
  return (
    <div className='breadcrumps-container'>
      {/* <Link style={{ textDecoration: 'none' }} className='breadcrum'>
        Home
      </Link> */}
      <span onClick={() => history.push('/')} className='breadcrum'>
        Home
      </span>
      {pathNames.map((pathName, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`
        return (
          <div className='breadcrum-inner-container' key={index}>
            <i className='fas fa-arrow-right' />
            <span onClick={() => history.push(routeTo)} className='breadcrum'>
              {pathName}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default withRouter(BreadCrumbs)
