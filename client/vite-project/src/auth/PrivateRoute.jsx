import auth from './auth-helper'
import { Navigate } from 'react-router'
import PropTypes from 'prop-types'

// This may be unnecessary since Auth checks are made in loaders as well
const PrivateRoute = ({ children }) => {
  return(auth.isAuthenticated() ? children : <Navigate to="/signin" />)
}

PrivateRoute.propTypes = {
  "children": PropTypes.object
}

export default PrivateRoute;
