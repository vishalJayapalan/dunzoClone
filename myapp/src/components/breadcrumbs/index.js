import React from 'react'
import { withRouter } from 'react-router-dom'

const BreadCrumbs = ({ history, location: { pathname } }) => {
  const pathNames = pathname.split('/').filter(param => param)
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
        console.log(routeTo)
        return (
          <div key={index}>
            <i className='fas fa-arrow-right' />
            <span onClick={() => history.push(routeTo)} className='breadcrum'>
              {pathName}
            </span>
          </div>
        )
      })}
      {/* <span className='breadcrum'>{categoryName}</span> */}
    </div>
  )
}

export default withRouter(BreadCrumbs)
