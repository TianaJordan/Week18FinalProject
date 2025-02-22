import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import { CartItem, Product } from "../types"
import { useState } from "react"
import { Link } from "react-router-dom"

type Props = {
    item: CartItem
    products: Product[]
}

export default function CartItemGroup({ item, products }: Props) {
  const product = products.find(p => p.id === item.productId)

  const [error, setError] = useState<null | string>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [removingFromCart, setRemovingFromCart] = useState(false)
  const [updatingCart, setUpdatingCart] = useState(false)
  const [quantity, setQuantity] = useState(1);


  // API request to delete item from cart  
  const removeFromCart = async (productId: number) => {
    setRemovingFromCart(true)
    try {
      const response = await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        setError("Error: " + response.statusText)
      } else {
        const newCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(newCartItems);
        setError(null)

      }
    }
    catch (error: any) {
      setError("Error: " + error.message)
    }
    setRemovingFromCart(false)
  };
  // handle quantity change
  const handleQuantityChange = (event: any) => {
    setQuantity(parseInt(event.target.value));
  };

  // update cart to display new quantity
  async function updateCart(productId: number) {
    const updatedCart = {
      productId: productId,
      quantity: quantity
    }
    setUpdatingCart(true)
    await fetch(`http://localhost:3000/cart/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCart)
    });
    updateCart(productId);
    setUpdatingCart(false)
  };  

  return (
    error ? <p className="text-center">{error}</p> :
      <Container>
        <ListGroup>
          <ListGroup.Item
            className="d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold">
                <Link to={"/products/" + product?.id}
                  className="link">{product?.name || "PRODUCT NOT FOUND"}
                </Link>
              </div>
              ${product?.price.toFixed(2)} each
              <p>Quantity: {item.quantity}</p>
            </div>
            <div>
              <Row>
                <Col>
                  <div className="d-flex flex-wrap justify-content-end">
                    <div>
                      <Form.Select
                        aria-label="Default select example"
                        id="select-cart-input"
                        size="sm"
                        value={quantity}
                        onChange={handleQuantityChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Form.Select>
                    </div>
                    <Button
                      className="add-btn"
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateCart(product.id)}>
                      {updatingCart ? "Updating..." : "Update"}
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-end p-2">
                  <div>
                    <Button
                      className="remove-btn"
                      variant="secondary"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      disabled={removingFromCart}>
                      {removingFromCart ? "Removing..." : "Remove"}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Container>
  )
}