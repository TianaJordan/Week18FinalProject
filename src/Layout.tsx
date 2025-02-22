import { Button, Container, Navbar, Offcanvas } from 'react-bootstrap'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import CartList from './components/CartList'



const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />

type OffCanvasProps = {
  name: string
}

export default function Layout({ name, ...props }: OffCanvasProps) {

  const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  
  return ( 
    <>
      <div>
        <Navbar className="bg-body-secondary">
          <Container>
            <Navbar.Brand>
                Candles Brand Name
            </Navbar.Brand>
            <Navbar.Text>
              <NavLink to="/products"
                className="inactive">
                Shop
              </NavLink>
            </Navbar.Text>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button variant="light" onClick={handleShow} className="me-2">
                  {name}
                  {cartIcon}
                </Button>
                <Offcanvas placement="end" show={show} onHide={handleClose} {...props}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="d-grid gap-2">
                      <Button
                        variant="light"
                        size="sm"
                        onClick={handleClose}>
                        <Link to={"/cart"}>
                          View Cart </Link>
                      </Button>
                    </div>
                    <CartList />
                  </Offcanvas.Body>
                </Offcanvas>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    </>
  )
}