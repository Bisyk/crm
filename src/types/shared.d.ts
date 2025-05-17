export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  stockCount: number;
  lowStockThreshold: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderDate: string | Date;
  shopId: string;
  employeeId: string;
  customerId: string;
  deliveryStatus: string;
  paymentStatus: string;
}
export interface OrderItem {
  id?: string;
  quantity: number;
  price: string;
  productId: string;
  orderId?: string;
  name?: string;
}
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
  shopId: string;
  stage: string;
  employeeId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  leadInterests: {
    id: string;
    quantity: number;
    product: {
      price: string;
    };
  }[];
}
