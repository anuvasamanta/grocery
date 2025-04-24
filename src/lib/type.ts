export interface GroceryItem {
    id: string;
    name: string;
    price: number;
    category?: string;
    url?:string
  }
  
  export interface CartItem extends GroceryItem {
    quantity: number;
  }