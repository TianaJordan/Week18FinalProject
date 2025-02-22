import {useEffect, useState } from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import type { Product } from '../types'
import { Link } from "react-router-dom"

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [addingToCart, setAddingToCart] = useState(false)
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/products")
                if (!response.ok) {
                    setError("Error: " + response.statusText)
                } else {
                    const data = await response.json()
                    setProducts(data)
                    setError(null)
                }
            } catch (error: any) {
                setError("Error: " + error.message)
            }
            setLoading(false)
        }
        getProducts()
    }, [])
    // handle quantity change 
    const handleQuantityChange = (event: any) => {
        setQuantity(parseInt(event.target.value));
    };
    // add item with selected quantity to the cart
    const addToCart = async (productId: number) => {
        const newCartItem = {
            productId: productId,
            quantity: quantity
        }
        // make the change on the backend    
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
        <div>
            <h1 className="mb-4 mt-5 text-center">Shop Our Newest Candles</h1>
            {loading ? (
                <div className="spinner-container">
                    <Spinner
                        animation="border"
                        role="status"
                        variant="secondary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? <p className="text-center">{error}</p> :
                (
                    <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
                        {products.map(product => (
                            <Card key={product.id} style={{ width: '20rem' }}>
                                <Card.Img variant="top" src={product?.image} />
                                <Card.Body>
                                    <Card.Title>
                                        <Link to={"/products/" + product.id}
                                            className="link">
                                            {product.name}
                                        </Link>
                                    </Card.Title>
                                    <Card.Text>
                                        ${product.price.toFixed(2)}
                                    </Card.Text>
                                    <div className="d-flex flex-wrap justify-content-end">
                                        <div id="select-input">
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
                                            onClick={() => addToCart(product?.id)}
                                            disabled={addingToCart}>
                                            {addingToCart ? "Adding..." : "Add to Cart"}
                                        </Button>
                                    </div>
                                    {/* tried to break add to cart button into its own component to handle each select input and button separately  
                                    <AddToCart /> */}
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                )}
        </div>
    )
}