/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import userImg from '../assets/images/user.png';
import logo1Img from '../assets/images/logo-1.png';
import logo2Img from '../assets/images/logo/logo.png';
import { getToken, getUserData } from '../utils/Utils';
import { useLogoutUserMutation } from '../redux/api/getMeAPI';
import toast from 'react-hot-toast';
import NotificationDropdown from './NotificationDropdown';
import { Power, User } from 'react-feather';
import Avatar from './Avatar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutUser, { isLoading, isSuccess, error, isError }] = useLogoutUserMutation();
  const accessToken = getToken();
  const userData = JSON.parse(getUserData());
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  console.log(location.pathname);
  const currentRoute = location.pathname;

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/login';
    }

    if (isError) {
      toast.error(
        <div className="d-flex align-items-center">
          <span className="toast-title">{error.data.message}</span>
        </div>,
        {
          duration: 4000,
          position: 'top-right'
        }
      );
    }
  }, [isLoading]);

  const onLogoutHandler = () => {
    logoutUser();
  };

  return (
    <header>
      <div className="container">
        <Navbar full="true" expand="md">
          <NavbarBrand
            href={
              accessToken
                ? userData?.role === 'admin'
                  ? '/admin/dashboard'
                  : userData.role === 'client'
                    ? '/client/dashboard'
                    : '/service-provider/dashboard'
                : '/'
            }>
            <img
              src={logo1Img}
              alt="beautySN"
              className="logo-image" // Apply a class for styling
            />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} className="ms-auto" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              {!accessToken && (
                <>
                  <NavItem className="nav-item-responsive">
                    <NavLink className={currentRoute.includes('login') ? 'active' : ''} onClick={() => navigate('/login')}>
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item-responsive">
                    <NavLink className={currentRoute.includes('register') ? 'active' : ''} onClick={() => navigate('/register')}>
                      Register
                    </NavLink>
                  </NavItem>
                </>
              )}
              {accessToken && userData?.role === 'admin' && (
                <>
                  <NavItem className="nav-item-responsive">
                    <NavLink className={currentRoute.includes('admin/dashboard') ? 'active' : ''} onClick={() => navigate('/admin/dashboard')}>
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item-responsive">
                    <NavLink className={currentRoute.includes('admin/clients') ? 'active' : ''} onClick={() => navigate('/admin/clients')}>
                      Clients
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item-responsive">
                    <NavLink className={currentRoute.includes('admin/service-providers') ? 'active' : ''} onClick={() => navigate('/admin/service-providers')}>
                      Service Providers
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <img src={userImg} alt="user" className="user-img" />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem onClick={onLogoutHandler}>Log out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              )}
              {accessToken && userData?.role === 'client' && (
                <>
                  <NavItem className="nav-item-responsive">
                    <NavLink onClick={() => navigate('/client/dashboard')}>Home</NavLink>
                  </NavItem>
                  <NavItem className="nav-item-responsive">
                    <NavLink
                      className={currentRoute.includes('client/service-providers') ? 'active' : ''}
                      onClick={() => navigate('/client/service-providers')}>
                      Service Providers
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item-responsive">
                    <NavLink onClick={() => navigate('/client/clients')}>Order</NavLink>
                  </NavItem>
                  <NavItem className="nav-item-responsive">
                    <NavLink onClick={() => navigate('/client/message')}>Message</NavLink>
                  </NavItem>
                  <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
                    <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
                      <div className="user-nav d-sm-flex d-none">
                        <span className="user-name fw-bold">{(userData && userData['firstName']) || ''}</span>
                        <span className="user-status">{(userData && userData.role) || 'Admin'}</span>
                      </div>
                      <Avatar img={userImg} imgHeight="40" imgWidth="40" status="online" />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem tag={Link} to="/client/profile">
                        <User size={18} className="me-50" />
                        <span className="align-middle">Profile</span>
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/login" onClick={onLogoutHandler}>
                        <Power size={18} className="me-50" />
                        <span className="align-middle">Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/* <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <img src={userImg} alt="Client" className="user-img" />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem onClick={() => navigate('/client/profile')}>
                        <User size={14} className="me-75" />
                        Profile
                      </DropdownItem>
                      <DropdownItem onClick={onLogoutHandler}>
                        <Power size={14} className="me-75" />
                        <span className="align-middle">Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
                </>
              )}
              {accessToken && userData?.role === 'serviceProvider' && (
                <>
                  <NavItem className="nav-item-responsive">
                    <NavLink onClick={() => navigate('service-provider/dashboard')}>Home</NavLink>
                  </NavItem>
                  <NavItem className="nav-item-responsive">
                    <NavLink
                      className={currentRoute.includes('service-provider/services') ? 'active' : ''}
                      onClick={() => navigate('service-provider/services')}>
                      Services
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item-responsive">
                    <NavLink className={currentRoute.includes('service-provider/orders') ? 'active' : ''} onClick={() => navigate('service-provider/orders')}>
                      Orders
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-item-responsive">
                    <NavLink
                      className={currentRoute.includes('service-provider/messages') ? 'active' : ''}
                      onClick={() => navigate('/service-provider/messages')}>
                      Message
                    </NavLink>
                  </NavItem>
                  <NotificationDropdown />
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <img src={userImg} alt="Service Provider" className="user-img" />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem onClick={() => navigate('/service-provider/profile')}>Profile</DropdownItem>
                      <DropdownItem onClick={onLogoutHandler}>Log out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
