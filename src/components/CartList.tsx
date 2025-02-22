import "./CartList.css"
import { useEffect, useState} from 'react'
import type { CartItem, Product } from '../types'
import CartItemGroup from './CartItemGroup'
import { Spinner } from 'react-bootstrap'

export default function CartList() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/cart")
                if (!response.ok) {
                    setError("Error: " + response.statusText)
                } else {
                    const data = await response.json()
                    setCartItems(data)
                }
            } catch (error: any) {
                setError("Error: " + error.message)
            }
            setLoading(false)
        }
        fetchCart()

        const fetchProducts = async () => {
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
        fetchProducts()
    }, [])

    return (
        <>
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
                    <div className="mb-5">
                        <h3 className="container mt-3 mb-3">Cart Items</h3>
                        <div>
                            {cartItems.map(item => (
                                <CartItemGroup
                                    key={item.id}
                                    item={item}
                                    products={products}
                                />
                            ))}
                        </div>
                    </div>
                )}
        </>
    )
}