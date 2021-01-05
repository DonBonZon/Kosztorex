import React from 'react';
import { Nav ,Navbar} from 'react-bootstrap';
import  {useDispatch} from 'react-redux'
import activeScreenActions from '../actions/activeScreenActions';

function NavigationBar() {
    const dispatch = useDispatch()

    return (
      <Navbar bg="dark" variant="dark" id="navbarWrapper">
      <Navbar.Brand href="#1">Kosztorex</Navbar.Brand>
      <Nav className="mr-auto" defaultActiveKey="#1">
        <Nav.Link href="#1" onClick={()=>dispatch(activeScreenActions.show_calculator_screen())}>Kalkulator</Nav.Link>
        <Nav.Link href="#2" onClick={()=>dispatch(activeScreenActions.show_edition_screen())}>Edycja pozycji</Nav.Link>
      </Nav>
    </Navbar>
    );
  }
  
  export default NavigationBar;