export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  image?: string;
}

export interface MenuItemOption {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  badge?: 'Popular' | 'Chef Special' | 'Healthy' | 'Low Carb';
  options?: MenuItemOption[];
  image?: string;
}

export interface CartItem {
  id: string; // unique ID for cart item (itemId + optionName)
  item: MenuItem;
  quantity: number;
  selectedOption?: MenuItemOption;
  notes?: string;
}

export interface PastOrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptionName?: string;
  category?: string;
}

export interface PastOrder {
  id: string; // e.g. "BM-9042"
  date: string; // ISO date string or human readable
  status: 'Delivered' | 'Completed' | 'In Kitchen' | 'Preparing';
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  items: PastOrderItem[];
  totalAmount: number;
  deliveryAddress?: string;
  tableNumber?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bakePoints: number;
  memberTier: string;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  area?: string;
  specialRequests?: string;
  specialNotes?: string;
}
