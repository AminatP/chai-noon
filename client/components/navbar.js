import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUserOrder, logout, syncCart} from '../store'
import {Spin as Hamburger} from 'hamburger-react'

class Navbar extends React.Component {
  constructor(props) {
    super()
    this.state = {
      menu: false,
      checked: false
    }
  }
  componentDidMount() {
    this.props.getOrder()
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (!this.state.checked) {
      this.props.syncCart(cart)
      this.setState({checked: true})
    }
  }
  render() {
    const {user} = this.props

    return (
      <div className="navbox">
        <nav className="navbar">
          <div className="navbar-center">
            <div className="nav-left">
              <Hamburger
                className="nav-icon"
                onToggle={toggled => {
                  if (toggled) {
                    this.setState({menu: true})
                  } else {
                    this.setState({menu: false})
                  }
                }}
              />
              <Link to="/" className="link">
                <h5>
                  {' '}
                  <div className="main-text">
                    <h4>
                      <b>CHAI NOON</b>
                    </h4>
                  </div>
                </h5>
              </Link>
            </div>
            <div className="nav-right">
              <Link to="/cart" className="link">
                <div className="cart-btn">
                  <span className="nav-icon">
                    <i className="fa fa-cart-plus" aria-hidden="true" />
                  </span>
                  <div className="cart-items">
                    {this.props.totalCartItems || 0}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </nav>
        {this.state.menu ? (
          <div>
            {this.props.isLoggedIn ? (
              <div className="menuLinks">
                {user.isAdmin && (
                  <Link to="/users" className="link">
                    Users
                  </Link>
                )}
                {/* The navbar will show these links after you log in */}
                <Link to="/home" className="link">
                  Home
                </Link>
                <a href="#" onClick={this.props.handleClick} className="link">
                  Logout
                </a>
                <Link to="/products" className="link">
                  Products
                </Link>
              </div>
            ) : (
              <div className="menuLinks">
                {/* The navbar will show these links before you log in */}
                <Link to="/login" className="link">
                  Login
                </Link>
                <Link to="/signup" className="link">
                  Sign Up
                </Link>
                <Link to="/products" className="link">
                  Products
                </Link>
              </div>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    totalCartItems: state.order.totalProducts,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => {
      dispatch(logout())
    },
    getOrder: () => {
      dispatch(fetchUserOrder())
    },
    syncCart: (userId, cart) => {
      dispatch(syncCart(userId, cart))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
