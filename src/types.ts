export type CartItem = {
    id: number
    productId: number
    quantity: number
    price: number
}

export type Product = {
    id: number
    name: string
    image: string
    description: string
    notes: string
    fragranceType: string
    price: number
    weight: string
    wax: string
    quantityInStock: number
  }