import { Category, MenuItem } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'bakery-desserts',
    name: 'Bakery & Desserts',
    icon: 'Cake',
    description: 'Freshly baked muffins, cakes, waffles, cold cheesecakes and trifles',
    image: '/Cold-Cheese-Cake.jpg'
  },
  {
    id: 'juices-cocktails',
    name: 'Juices, Mojitos & Smoothies',
    icon: 'GlassWater',
    description: 'Fresh juices, juice blends, layered juices, mojitos, lemonades, detox cocktails and smoothies',
    image: '/juices-cocktails.jpeg'
  },
  {
    id: 'hot-cold-drinks',
    name: 'Beverages & Coffee',
    icon: 'Coffee',
    description: 'Espresso coffees, brewed teas, dawa specials, iced drinks and sodas',
    image: '/Black-Coffee.jpg'
  },
  {
    id: 'breakfast',
    name: 'Nakuru Breakfast',
    icon: 'Egg',
    description: 'Fresh eggs, French toast, arrowroots, sweet potatoes and chapatis',
    image: '/breakfast.jpeg'
  },
  {
    id: 'mains-meals',
    name: 'Chef Mains & Stews',
    icon: 'UtensilsCrossed',
    description: 'Hearty chicken stew, biryani, pilau, sautee beef and fried rice',
    image: '/mains-meal.jpeg'
  },
  {
    id: 'light-snacks',
    name: 'Snacks & Burgers',
    icon: 'Beef',
    description: 'Beef burger & chips, samosa specials, wings, chips masala and mshikaki',
    image: '/Burger&-Chips-(2).jpg'
  },
  {
    id: 'kienyeji-traditional',
    name: 'Kienyeji Specials',
    icon: 'Flame',
    description: 'Authentic Kenyan Mukimo, Matoke, Githeri, Omena, and Uji Power',
    image: '/kienyeji-traditional.jpeg'
  },
  {
    id: 'pizza-pasta',
    name: 'Italian Pizza & Pastas',
    icon: 'Pizza',
    description: 'Open-kitchen hand-stretched pizzas, bolognese, penne and traditional pies',
    image: '/pizza-pasta.jpeg'
  },
  {
    id: 'sandwiches-wraps',
    name: 'Sandwiches & Wraps',
    icon: 'Sandwich',
    description: 'Toasted beef, chicken, tuna sandwiches and filled chapati wraps',
    image: '/Chapati-Wrap-Special.jpg'
  },
  {
    id: 'bbq-platters',
    name: 'Barbecue Platters',
    icon: 'Drumstick',
    description: 'Sizzling Mbuzi Choma and Kuku Choma platters for sharing',
    image: '/bbq-platters.jpeg'
  },
  {
    id: 'waffles-triffles',
    name: 'Waffles & Triffles',
    icon: 'Cake',
    description: 'Golden waffles and layered triffle dessert cups',
    image: '/Chocolate-Wiffle.jpg'
  },
  {
    id: 'soups-salads',
    name: 'Soups & Salads',
    icon: 'Soup',
    description: 'Fresh kachumbari, garden salads, bone soup and mushroom soup',
    image: '/Chicken-Salad.jpg'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // BAKERY CORNER
  // ==========================================
  { id: 'b1', name: 'Assorted English Muffins', category: 'bakery-desserts', price: 40 },
  { id: 'b2', name: 'Assorted Butter Cookies 1pc', category: 'bakery-desserts', price: 10, image: '/cookies-10pieces.jpeg' },
  { id: 'b3', name: 'Assorted Butter Cookies 16 pcs (pct)', category: 'bakery-desserts', price: 200 },
  { id: 'b4', name: 'Assorted Butter Cooka 10 pcs (pct)', category: 'bakery-desserts', price: 150 },
  { id: 'b5', name: 'English Tea Cake', category: 'bakery-desserts', price: 80 },
  { id: 'b6', name: 'Creamed Rich Cake', category: 'bakery-desserts', price: 100 },
  { id: 'b7', name: 'Blackforest, Whiteforest And Red Velvet Cake', category: 'bakery-desserts', price: 200 },
  { id: 'b10', name: 'Caramel Cake', category: 'bakery-desserts', price: 200 },
  { id: 'b11', name: 'Chocolate Fudge Cake', category: 'bakery-desserts', price: 200 },
  { id: 'b12', name: 'Cheese Cake (Cold)', category: 'bakery-desserts', price: 250, image: '/Cold-Cheese-Cake.jpg' },
  { id: 'b13', name: 'Chocolate And Vanilla Swiss Roll', category: 'bakery-desserts', price: 150 },
  { id: 'b14', name: 'Tiramisu Cake', category: 'bakery-desserts', price: 200 },
  { id: 'b15', name: 'Strawberry Cake', category: 'bakery-desserts', price: 150 },

  // DESSERTS
  { id: 'd1', name: 'CoupJack (Fruits/Ice Cream)', category: 'bakery-desserts', price: 270, image: '/Fruit-Salad.jpg' },
  { id: 'd2', name: 'Banana Splite', category: 'bakery-desserts', price: 200 },
  { id: 'd3', name: 'Tropical Fruits Salad', category: 'bakery-desserts', price: 200, image: '/Fruit Plate.jpg' },
  { id: 'd4', name: 'Bakemart Apple Delight', category: 'bakery-desserts', price: 250 },

  // WAFFLES CORNER
  { id: 'w1', name: 'Vanilla Waffles', category: 'waffles-triffles', price: 200, image: '/Vanilla-wiffle.jpg' },
  { id: 'w2', name: 'Chocolate Waffles', category: 'waffles-triffles', price: 250 },
  { id: 'w3', name: 'Red Velvet Waffles', category: 'waffles-triffles', price: 300 },
  { id: 'w4', name: 'Peanut Butter Waffles', category: 'waffles-triffles', price: 300 },
  { id: 'w5', name: 'Vegetable Waffles', category: 'waffles-triffles', price: 300 },
  { id: 'w6', name: 'Waffle Topped Ice Cream', category: 'waffles-triffles', price: 400 },

  // TRIFFLES
  { id: 'tr1', name: 'Chocolate Triffle', category: 'waffles-triffles', price: 250, image: '/Fruit-Triffle-and-Chocolate-Triffle.jpg' },
  { id: 'tr2', name: 'Fruit Triffle', category: 'waffles-triffles', price: 250, image: '/Vanila-Triffle-and-Chocolate-Triffle.jpg' },
  { id: 'tr3', name: 'Mocca Triffle', category: 'waffles-triffles', price: 250, image: '/Mocca-Smoothie.jpg' },
  { id: 'tr4', name: 'Caramel Triffle', category: 'waffles-triffles', price: 250 },

  // ==========================================
  // JUICES, MOJITOS & SMOOTHIES
  // ==========================================
  { id: 'mj1', name: 'Sunrise Mojito', category: 'juices-cocktails', price: 200, image: '/juices-cocktails.jpeg' },
  { id: 'mj2', name: 'Lime Mojito', category: 'juices-cocktails', price: 200 },
  { id: 'mj3', name: 'Passion Mojito', category: 'juices-cocktails', price: 200 },
  { id: 'mj4', name: 'Watermelon Mojito', category: 'juices-cocktails', price: 200 },
  { id: 'mj5', name: 'Kiwi Mojito', category: 'juices-cocktails', price: 200 },
  { id: 'mj6', name: 'Blue Mojito', category: 'juices-cocktails', price: 200 },
  { id: 'mj7', name: 'Strawberry Mojito', category: 'juices-cocktails', price: 200 },

  // LEMONADES
  { id: 'lm1', name: 'Original Lemonade', category: 'juices-cocktails', price: 150, image: '/Strawberry-Lemonade.jpg' },
  { id: 'lm2', name: 'Mint Lemonade', category: 'juices-cocktails', price: 150 },
  { id: 'lm3', name: 'Strawberry Lemonade', category: 'juices-cocktails', price: 150 },
  { id: 'lm4', name: 'Watermelon Lemonade', category: 'juices-cocktails', price: 150 },

  // DETOX COCKTAILS
  { id: 'dt1', name: 'GREEN JUICE', category: 'juices-cocktails', price: 250 },
  { id: 'dt2', name: 'PAWA JUICE', category: 'juices-cocktails', price: 250 },
  { id: 'dt3', name: 'DONA COLADA', category: 'juices-cocktails', price: 250 },
  { id: 'dt4', name: 'PAPENO DOPPIO', category: 'juices-cocktails', price: 250 },
  { id: 'dt5', name: 'Detox Cubes', category: 'juices-cocktails', price: 250 },
  { id: 'dt6', name: 'Blood Cleanser', category: 'juices-cocktails', price: 250 },

  // 100% FRESH JUICE
  { id: 'fj1', name: 'Apple', category: 'juices-cocktails', price: 200 },
  { id: 'fj2', name: 'Carrot', category: 'juices-cocktails', price: 200 },
  { id: 'fj4', name: 'Beetroot', category: 'juices-cocktails', price: 200, image: '/beetroot-juice.jpeg' },
  { id: 'fj5', name: 'Mixed Fruit Cocktail', category: 'juices-cocktails', price: 200, image: '/Mixed-Fruit-Cocktail.jpg' },
  { id: 'fj6', name: 'Tamarind', category: 'juices-cocktails', price: 200 },

  // JUICE BLENDS
  { id: 'jb1', name: 'Pineapple Juice', category: 'juices-cocktails', price: 150, image: '/pineapple-juice.jpeg' },
  { id: 'jb2', name: 'Mango Juice', category: 'juices-cocktails', price: 150 },
  { id: 'jb3', name: 'Beetroot Juice', category: 'juices-cocktails', price: 150 },
  { id: 'jb5', name: 'Passion Juice', category: 'juices-cocktails', price: 150 },
  { id: 'jb6', name: 'Orange', category: 'juices-cocktails', price: 150 },

  // FRUIT JUICE LAYERS
  { id: 'fl1', name: 'Tropical Layer (Mango, Avocado, Strawberry)', category: 'juices-cocktails', price: 250, image: '/Mixed-Fruits.jpg' },
  { id: 'fl2', name: 'ABC Vitamins (Apple, Beetroot, Carrot)', category: 'juices-cocktails', price: 250 },
  { id: 'fl3', name: 'Active (Ginger, Pineapple, Carrot)', category: 'juices-cocktails', price: 250, image: '/pineapple-juice.jpeg' },
  { id: 'fl4', name: 'Organic (Carrot, Orange)', category: 'juices-cocktails', price: 250 },
  { id: 'fl5', name: 'Fruit Loop (Banana, Mango, Strawberry)', category: 'juices-cocktails', price: 250, image: '/Mixed-Fruits.jpg' },

  // SMOOTHIES
  { id: 'sm1', name: 'Oreo', category: 'juices-cocktails', price: 350, image: '/Chocolate-Smoothie.jpg' },
  { id: 'sm2', name: 'Coconut', category: 'juices-cocktails', price: 350 },
  { id: 'sm3', name: 'Avocado', category: 'juices-cocktails', price: 250 },
  { id: 'sm4', name: 'Peanut Butter', category: 'juices-cocktails', price: 350 },
  { id: 'sm5', name: 'Blueberry', category: 'juices-cocktails', price: 400 },

  // ==========================================
  // BEVERAGES & COFFEE
  // ==========================================
  { id: 'hb1', name: 'White Coffee', category: 'hot-cold-drinks', price: 200, image: '/White-Coffee.jpg' },
  { id: 'hb2', name: 'Black Coffee', category: 'hot-cold-drinks', price: 200, image: '/Black-Coffee.jpg' },
  { id: 'hb3', name: 'White Chocolate', category: 'hot-cold-drinks', price: 200 },
  { id: 'hb4', name: 'Instant Baristo Tea', category: 'hot-cold-drinks', price: 200 },
  { id: 'hb5', name: 'Mixed Tea Brew Cup', category: 'hot-cold-drinks', price: 70 },
  { id: 'hb6', name: 'Masala Tea Brew', category: 'hot-cold-drinks', price: 100 },
  { id: 'hb7', name: 'Dawa Special', category: 'hot-cold-drinks', price: 200 },
  { id: 'hb8', name: 'Black Tea', category: 'hot-cold-drinks', price: 60 },
  { id: 'hb9', name: 'Lemon Tea', category: 'hot-cold-drinks', price: 70 },
  { id: 'hb10', name: 'Hot Lemon Water', category: 'hot-cold-drinks', price: 30 },
  { id: 'hb12', name: 'Mixed Tea (Heavy)', category: 'hot-cold-drinks', price: 100 },

  // COLD DRINKS
  { id: 'cd1', name: 'Soda 300ml', category: 'hot-cold-drinks', price: 60 },
  { id: 'cd2', name: 'Soda 500ml', category: 'hot-cold-drinks', price: 80 },
  { id: 'cd3', name: 'Dasani 500ml', category: 'hot-cold-drinks', price: 50 },
  { id: 'cd4', name: 'Dasani 1L', category: 'hot-cold-drinks', price: 90 },
  { id: 'cd5', name: 'Monster', category: 'hot-cold-drinks', price: 250 },
  { id: 'cd6', name: 'PET Soda 500ml', category: 'hot-cold-drinks', price: 80 },
  { id: 'cd7', name: 'Iced Tea', category: 'hot-cold-drinks', price: 150, image: '/iced-tea.jpeg' },
  { id: 'cd10', name: 'Delmonte', category: 'hot-cold-drinks', price: 350 },
  { id: 'cd11', name: 'Red Bull', category: 'hot-cold-drinks', price: 250 },

  // ==========================================
  // NAKURU BREAKFAST
  // ==========================================
  { id: 'br1', name: 'French Toast Special (Sausage/Eggs/Toast)', category: 'breakfast', price: 250, image: '/breakfast.jpeg' },
  { id: 'br2', name: 'Eggs Omelette', category: 'breakfast', price: 150, image: '/egg-ommelete.jpeg' },
  { id: 'br3', name: 'Triple Eggs Omelette', category: 'breakfast', price: 200 },
  { id: 'br4', name: 'Boiled Eggs', category: 'breakfast', price: 80 },
  { id: 'br5', name: 'Beef Sausage', category: 'breakfast', price: 60 },
  { id: 'br6', name: 'Double Fried Eggs', category: 'breakfast', price: 80 },
  { id: 'br7', name: 'Nduma (Arrowroots)', category: 'breakfast', price: 200, image: '/nduma.jpeg' },
  { id: 'br8', name: 'Ngwaci (Sweet Potatoes)', category: 'breakfast', price: 80, image: '/Sweet-potatoes&-Fried-Eggs.jpg' },
  { id: 'br9', name: 'Cassava', category: 'breakfast', price: 100, image: '/cassava.jpeg' },
  { id: 'br10', name: 'Sweet Waffles', category: 'breakfast', price: 200 },
  { id: 'br11', name: 'Samosa', category: 'breakfast', price: 80 },
  { id: 'br13', name: 'Pancakes', category: 'breakfast', price: 120 },
  { id: 'br14', name: 'Mixed Wedges (Potatoes/Nduma)', category: 'breakfast', price: 250 },
  { id: 'br15', name: 'Chapati', category: 'breakfast', price: 50, image: '/Chapati.jpg' },
  { id: 'br16', name: 'Sandwich Vegetables', category: 'breakfast', price: 100, image: '/Cheese-Sandwitch.jpg' },
  { id: 'br17', name: 'Smocha (Chapati/Smokie)', category: 'breakfast', price: 150, image: '/Fried-Special.jpg' },

  // ==========================================
  // CHEF MAINS & STEWS
  // ==========================================
  { id: 'm1_1', name: 'Ugali Greens (Managu/Spinach)', category: 'mains-meals', price: 200, image: '/ugali-greens.jpeg' },
  { id: 'm1_2', name: 'Ugali Beef Stew', category: 'mains-meals', price: 300, image: '/Ugali-Beef-Greens.jpg' },
  { id: 'm1_3', name: 'Ugali Chicken Stew', category: 'mains-meals', price: 400, image: '/Kienyeji-Kuku-Ugali.jpg' },
  { id: 'm1_4', name: 'Ugali Fried Double Egg', category: 'mains-meals', price: 250, image: '/Ugali-Beef-Scrambled-eggs-dry-fry.jpg' },
  { id: 'm1_5', name: 'Brown Ugali & Greens', category: 'mains-meals', price: 200 },
  { id: 'm1_6', name: 'Chicken 1/4 & Chips', category: 'mains-meals', price: 550 },
  { id: 'm1_7', name: 'Rice Beef Stew', category: 'mains-meals', price: 300, image: '/Rice-Beef-Salad.jpg' },
  { id: 'm1_8', name: 'Rice Chicken Stew', category: 'mains-meals', price: 400 },
  { id: 'm1_9', name: 'Sauteed Potatoes with Beef', category: 'mains-meals', price: 400, image: '/Potato-Weges-Beef.jpg' },
  { id: 'm1_10', name: 'Chapati Beef Greens', category: 'mains-meals', price: 250, image: '/Njahi-Chapati-Cabbage.jpg' },
  { id: 'm1_11', name: 'Rice & Vegetable Stew (Minji)', category: 'mains-meals', price: 250 },
  { id: 'm1_12', name: 'Pilau Plain', category: 'mains-meals', price: 300, image: '/gallery-9.jpg' },
  { id: 'm1_13', name: 'Kienyeji Kuku', category: 'mains-meals', price: 550, image: '/Kienyeji-Kuku-Ugali.jpg' },
  { id: 'm2_1', name: 'Keema (Minced Beef with Minji Chapati)', category: 'mains-meals', price: 300, image: '/keema-chapati wrap.jpg' },
  { id: 'm2_2', name: 'Chicken Tikka Masala', category: 'mains-meals', price: 500 },
  { id: 'm2_3', name: 'Beef Chilli Starfry with Ugali', category: 'mains-meals', price: 350 },
  { id: 'm2_4', name: 'Egg Biryani', category: 'mains-meals', price: 300, image: '/Egg-Biriani.jpg' },
  { id: 'm2_5', name: 'Chicken Biryani', category: 'mains-meals', price: 500, image: '/Chicken-Biriani.jpg' },
  { id: 'm2_6', name: 'Vegetable Biryani', category: 'mains-meals', price: 250, image: '/Vegrtable-Biriani.jpg' },
  { id: 'm2_7', name: 'Mutton Biryani', category: 'mains-meals', price: 450 },
  { id: 'm2_8', name: 'Ugali Omena', category: 'mains-meals', price: 250, image: '/ugali-omena-greens.jpg' },
  { id: 'm2_9', name: 'Ugali Maini (Liver)', category: 'mains-meals', price: 400, image: '/Ugali-Maini-Greens.jpg' },
  { id: 'm2_10', name: 'Pilau Beef', category: 'mains-meals', price: 400, image: '/pilau-beef.jpeg' },
  { id: 'm2_11', name: 'Pilau Kuku', category: 'mains-meals', price: 500, image: '/pilau-chicken.jpeg' },
  { id: 'm2_12', name: 'Chicken Fried Rice', category: 'mains-meals', price: 400 },
  { id: 'm2_13', name: 'Fried Rice Beef', category: 'mains-meals', price: 350 },
  { id: 'm2_14', name: 'Chips Masala Beef', category: 'mains-meals', price: 400, image: '/Chips-Masala.jpg' },
  { id: 'm2_15', name: 'Cassava Beef', category: 'mains-meals', price: 350, image: '/Cassava-Fried-Beef.jpg' },
  { id: 'm2_16', name: 'Cassava Greens', category: 'mains-meals', price: 200 },

  // ==========================================
  // SNACKS & BURGERS
  // ==========================================
  { id: 's1', name: 'Samosa Special', category: 'light-snacks', price: 250, image: '/Beef-Samosa.jpg' },
  { id: 's2', name: 'Sausage Special', category: 'light-snacks', price: 250, image: '/Chips-masala-Sausage.jpg' },
  { id: 's3', name: 'Chicken Wings Special', category: 'light-snacks', price: 300, image: '/Quarter-Chicken.jpg' },
  { id: 's4', name: 'Fried Eggs Special', category: 'light-snacks', price: 250, image: '/Fried-Egg-sausage.jpg' },
  { id: 's5', name: 'Beef Burger & Chips', category: 'light-snacks', price: 480, image: '/Burger&-Chips-(2).jpg' },
  { id: 's6', name: 'Chips Masala', category: 'light-snacks', price: 300, image: '/Chips-Masala.jpg' },
  { id: 's7', name: 'Chips', category: 'light-snacks', price: 200 },
  { id: 's8', name: 'Smokie Special', category: 'light-snacks', price: 250, image: '/Smokie-Special.jpg' },
  { id: 's9', name: 'Chips Kubwa', category: 'light-snacks', price: 300 },
  { id: 's10', name: 'Home Fries', category: 'light-snacks', price: 300 },
  { id: 's11', name: 'Chapati Roll', category: 'light-snacks', price: 150 },
  { id: 's12', name: 'Mixed Grill Skewers (Mshikaki) (1 piece)', category: 'light-snacks', price: 150, image: '/Mixed-Grill-Skewers.jpg' },

  // ==========================================
  // KIENYEJI SPECIALS
  // ==========================================
  { id: 'k1', name: 'Githeri Special', category: 'kienyeji-traditional', price: 280, image: '/Githeri-Greens.jpg' },
  { id: 'k2', name: 'Mukimo Maize Beef', category: 'kienyeji-traditional', price: 350 },
  { id: 'k3', name: 'Mukimo Minji Beef', category: 'kienyeji-traditional', price: 350 },
  { id: 'k4', name: 'Matoke Stew Beef', category: 'kienyeji-traditional', price: 350, image: '/Matoke-Beef.jpg' },
  { id: 'k5', name: 'Mashed Potatoes Beef', category: 'kienyeji-traditional', price: 350 },
  { id: 'k6', name: 'Mashed Potatoes Kuku', category: 'kienyeji-traditional', price: 500 },
  { id: 'k7', name: 'Mashed Matoke Kuku', category: 'kienyeji-traditional', price: 550, image: '/Matoke-Beef.jpg' },
  { id: 'k8', name: 'Beans Stew Rice/Chapati', category: 'kienyeji-traditional', price: 200 },
  { id: 'k9', name: 'Ndengu Stew Rice/Chapati', category: 'kienyeji-traditional', price: 200 },
  { id: 'k10', name: 'Njahi Stew Rice/Chapati', category: 'kienyeji-traditional', price: 250, image: '/Njahi-Chapati-Cabbage.jpg' },
  { id: 'k11', name: 'Uji Wimbi (half)', category: 'kienyeji-traditional', price: 100 },
  { id: 'k12', name: 'Uji Power (Cassava)', category: 'kienyeji-traditional', price: 100 },
  { id: 'k13', name: 'Ugali Samaki Greens', category: 'kienyeji-traditional', price: 350 },
  { id: 'k14', name: 'Nduma Greens', category: 'kienyeji-traditional', price: 250, image: '/Nduma-greens-kuku.jpg' },
  { id: 'k15', name: 'Githeri Greens', category: 'kienyeji-traditional', price: 200, image: '/Githeri-Greens.jpg' },

  // ==========================================
  // BARBECUE PLATTERS
  // ==========================================
  { id: 'bbq1', name: 'Mbuzi Choma, Kuku Choma, Sausage, Chips, Wedges, Ugali, Chapati, Salad Sauce', category: 'bbq-platters', price: 1500, image: '/bbq-platters.jpeg' },
  { id: 'bbq2', name: 'Mbuzi Choma, Kuku Choma, Pilau, Wedges, Sausages, Chips Masala, Fried Cassava, Greens, Sauce', category: 'bbq-platters', price: 2000, image: '/Choma-Platter.jpg' },

  // ==========================================
  // SANDWICHES & WRAPS
  // ==========================================
  { id: 'wr1', name: 'Eggs Chapati Wrap', category: 'sandwiches-wraps', price: 150 },
  { id: 'wr2', name: 'Hot Dog Chapati Wrap', category: 'sandwiches-wraps', price: 200 },
  { id: 'wr3', name: 'Veges Chapati Wrap', category: 'sandwiches-wraps', price: 200 },
  { id: 'wr4', name: 'Keema Chapati Wrap', category: 'sandwiches-wraps', price: 300, image: '/Chapati-Wrap-Special.jpg' },
  { id: 'wr5', name: 'Mixed-Grill Chicken', category: 'sandwiches-wraps', price: 350, image: '/Chapati-Chicken-Wrap.jpg' },
  { id: 'sw1', name: 'Beef Sandwich', category: 'sandwiches-wraps', price: 250 },
  { id: 'sw2', name: 'Chicken Sandwich', category: 'sandwiches-wraps', price: 300 },
  { id: 'sw3', name: 'Ham Sandwich', category: 'sandwiches-wraps', price: 300 },
  { id: 'sw4', name: 'Cheese Sandwich', category: 'sandwiches-wraps', price: 300, image: '/Cheese-Sandwitch.jpg' },
  { id: 'sw5', name: 'Tuna Sandwich', category: 'sandwiches-wraps', price: 400 },
  { id: 'sw6', name: 'Hot Dog', category: 'sandwiches-wraps', price: 300 },
  { id: 'sw7', name: 'Kebab', category: 'sandwiches-wraps', price: 100 },
  { id: 'sw8', name: 'Egg Toast Sandwich', category: 'sandwiches-wraps', price: 300 },

  // ==========================================
  // ITALIAN PIZZA & PASTAS
  // ==========================================
  { id: 'pas1', name: 'Spaghetti Bolognese', category: 'pizza-pasta', price: 350 },
  { id: 'pas2', name: 'Penne Pasta', category: 'pizza-pasta', price: 400, image: '/Penne-Pasta.jpg' },
  { id: 'pas3', name: 'Penne Pasta / Beef Stroganoff', category: 'pizza-pasta', price: 500 },
  { id: 'pas4', name: 'Noodles', category: 'pizza-pasta', price: 150 },
  {
    id: 'p1', name: 'Margarita Pizza (Tomato/Oregano)', category: 'pizza-pasta', price: 1000, image: '/Pizza-Margarita.jpg',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p2', name: 'Chicken Tikka Pizza (Chicken/Cheese)', category: 'pizza-pasta', price: 1100,
    options: [{ name: 'Medium', price: 1100 }, { name: 'Large', price: 1450 }]
  },
  {
    id: 'p3', name: 'Vegetable Pizza (Capsicum/Onion)', category: 'pizza-pasta', price: 1000, image: '/Vegetable-Pizza.jpg',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p4', name: 'Chicken Hawai Pizza (Chicken/Pineapple)', category: 'pizza-pasta', price: 1100,
    options: [{ name: 'Medium', price: 1100 }, { name: 'Large', price: 1450 }]
  },
  {
    id: 'p5', name: 'Fiorentina Pizza (Spinach, Black Pepper)', category: 'pizza-pasta', price: 1000,
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p6', name: 'Spicy Arezzo Pizza (Minced Beef)', category: 'pizza-pasta', price: 1000,
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p7', name: 'Mix Barbeque Pizza (Beef Chicken)', category: 'pizza-pasta', price: 1100,
    options: [{ name: 'Medium', price: 1100 }, { name: 'Large', price: 1450 }]
  },
  {
    id: 'p8', name: 'Garlic Bread With Cheese', category: 'pizza-pasta', price: 200, image: '/Garlic-Bread.jpg',
    options: [{ name: 'Medium', price: 200 }, { name: 'Large', price: 350 }]
  },

  // ==========================================
  // SOUPS & SALADS
  // ==========================================
  { id: 'sl1', name: 'Garden Salad', category: 'soups-salads', price: 250 },
  { id: 'sl2', name: 'Chicken Salad', category: 'soups-salads', price: 400, image: '/Chicken-Salad.jpg' },
  { id: 'sl3', name: 'Tomato / Onion Salad (Kachumbari)', category: 'soups-salads', price: 200 },
  { id: 'sp1', name: 'Garden Soup (Vegetable)', category: 'soups-salads', price: 200 },
  { id: 'sp2', name: 'Chicken Soup', category: 'soups-salads', price: 300 },
  { id: 'sp3', name: 'Beef Broth', category: 'soups-salads', price: 250 },
  { id: 'sp4', name: 'Mushroom Soup', category: 'soups-salads', price: 400 },
  { id: 'sp5', name: 'Bone Soup', category: 'soups-salads', price: 100 }
];
