// import { useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import type { Product } from "../types"

// export default function AddToCart() {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<null | string>(null)
//   const [product, setProduct] = useState<null | Product>(null)
//   // const [products, setProducts] = useState<Product[]>([])
//   const [addingToCart, setAddingToCart] = useState(false)
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true)
//       try {
//         const response = await fetch("http://localhost:3000/products")
//         if (!response.ok) {
//           setError("Error: " + response.statusText)
//         } else {
//           const data = await response.json()
//           setProduct(data)
//           setError(null)
//         }
//       } catch (error: any) {
//         setError("Error: " + error.message)
//       }
//       setLoading(false)
//     }
//     fetchProducts()
//   }, [])

//   // change quantity based on selected value
//   const handleQuantityChange = (event: any) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   // make the change on the backend 
//   const addToCart = async (productId: number,) => {
//     const newCartItem = {
//       productId: productId,
//       quantity: quantity
//     }
//     setAddingToCart(true)
//     try {
//       const response = await fetch("http://localhost:3000/cart", {
//         method: "POST",
//         body: JSON.stringify(newCartItem),
//         headers: {
//           "Content-Type": "application/json"
//         }
//       })
//       if (!response.ok) {
//         setError("Error: " + response.statusText)
//       }
//     } catch (error: any) {
//       setError("Error: " + error.message)
//     }
//     setAddingToCart(false)
//   }

//   return (
//     <>
//       {error ? <p className="text-center">{error}</p> :
//         <div className="d-flex flex-wrap justify-content-end">
//           <div id="select-input">
//             <Form.Select
//               aria-label="Default select example"
//               id="quantity"
//               value={quantity}
//               onChange={handleQuantityChange}>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//             </Form.Select>
//           </div>
//           <Button
//             className="add-btn"
//             variant="secondary"
//             onClick={() => addToCart(product.id)}
//             disabled={addingToCart}
//           >
//             {addingToCart ? "Adding..." : "Add to Cart"}
//           </Button>
//         </div>
//       }
//     </>
//   )
// }