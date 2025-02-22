import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Product } from "../types"
import { Accordion, Button, Card, Container, Form, Spinner } from "react-bootstrap"

export default function ProductDetails() {
    const { productId } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [product, setProduct] = useState<null | Product>(null)
    const [addingToCart, setAddingToCart] = useState(false)
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/products/" + productId)
                if (!response.ok) {
                    setError("Error: " + response.statusText)
                } else {
                    const data = await response.json()
                    setProduct(data)
                    setError(null)
                }
            } catch (error: any) {
                setError("Error: " + error.message)
            }
            setLoading(false)
        }
        fetchProducts()
    }, [])

    // change quantity to match selected amount
    const handleQuantityChange = (event: any) => {
        setQuantity(parseInt(event.target.value));
    };

    // make the change on the backend 
    const addToCart = async (productId: number) => {
        const newCartItem = {
            productId: productId,
            quantity: quantity
        }

        setAddingToCart(true)
        try {
            const response = await fetch("http://localhost:3000/cart", {
                method: "POST",
                body: JSON.stringify(newCartItem),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                setError("Error: " + response.statusText)
            }
        } catch (error: any) {
            setError("Error: " + error.message)
        }
        setAddingToCart(false)
    }

    return (
        <>
            {error && <p>{error}</p>}
            {loading ? (
                <div className="spinner-container">
                    <Spinner
                        animation="border"
                        role="status"
                        variant="secondary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Container className="mt-5 mb-5 center">
                    <Card key={product?.id} style={{ width: '40rem' }}>
                        <Card.Img variant="top" src={product?.image} />
                        <Card.Body>
                            <Card.Title className="d-flex flex-wrap justify-content-between">
                                <div>{product?.name}</div> ${product?.price.toFixed(2)}
                            </Card.Title>
                            <Card.Text>
                                {product?.description}
                            </Card.Text>
                            <div className="d-flex flex-wrap justify-content-end">
                                <div id="select-details-input">
                                    <Form.Select
                                        aria-label="Default select example"
                                        id="quantity"
                                        value={quantity}
                                        onChange={handleQuantityChange}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Form.Select>
                                </div>
                                <Button
                                    className="add-btn"
                                    variant="secondary"
                                    onClick={() => addToCart(product.id)}
                                    disabled={addingToCart}>
                                    {addingToCart ? "Adding..." : "Add to Cart"}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <Accordion style={{ width: '40rem' }}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>About this Fragrance</Accordion.Header>
                            <Accordion.Body>
                                {product?.notes}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Specifications</Accordion.Header>
                            <Accordion.Body>
                                <p>Fragrance Type: {product?.fragranceType}</p>
                                <p>Wax: {product?.wax}</p>
                                <p>Weight: {product?.weight}</p>
                                <p>Item: {product?.id}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            )}
        </>
    )
}