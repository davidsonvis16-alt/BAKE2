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
  { id: 'b1', name: 'English Muffins', category: 'bakery-desserts', price: 40, image: '/White-Coffee.jpg', description: 'Warm, buttery English muffins perfect for any time of day.' },
  { id: 'b2', name: 'Butter Cookie', category: 'bakery-desserts', price: 10, image: '/cookies-10pieces.jpeg', description: 'Rich, crumbly butter cookie baked fresh daily.' },
  { id: 'b3', name: 'Butter Cookies', category: 'bakery-desserts', price: 200, image: '/Mixed-Fruits.jpg', description: 'A generous 16-piece batch of our classic butter cookies.' },
  { id: 'b4', name: 'Butter Cookies', category: 'bakery-desserts', price: 150, image: '/Vegetable-Pizza.jpg', description: 'A 10-piece pack of our classic butter cookies.' },
  { id: 'b5', name: 'English Tea Cake', category: 'bakery-desserts', price: 80, image: '/Chocolate-Wiffle.jpg', description: 'Soft, spiced tea cake served with your favourite brew.' },
  { id: 'b6', name: 'Creamed Rich Cake', category: 'bakery-desserts', price: 100, image: '/Vanilla-wiffle.jpg', description: 'Moist, creamed sponge with a smooth vanilla finish.' },
  { id: 'b7', name: 'Berry Forest Cake', category: 'bakery-desserts', price: 200, image: '/Strawberry-Smoothie.jpg', description: 'Layers of dark chocolate, white chocolate and red velvet in one slice.' },
  { id: 'b10', name: 'Caramel Cake', category: 'bakery-desserts', price: 200, image: '/Chocolate-Smoothie.jpg', description: 'Silky caramel layers with a golden, buttery crumb.' },
  { id: 'b11', name: 'Chocolate Fudge Cake', category: 'bakery-desserts', price: 200, image: '/Mocca-Smoothie.jpg', description: 'Dense, fudgy chocolate cake for true chocolate lovers.' },
  { id: 'b12', name: 'New York Cheesecake', category: 'bakery-desserts', price: 250, image: '/Cold-Cheese-Cake.jpg', description: 'Creamy, chilled cheesecake with a buttery biscuit base.' },
  { id: 'b13', name: 'Swiss Roll', category: 'bakery-desserts', price: 150, image: '/Vanila-Triffle-and-Chocolate-Triffle.jpg', description: 'Light vanilla sponge rolled with chocolate and vanilla cream.' },
  { id: 'b14', name: 'Tiramisu', category: 'bakery-desserts', price: 200, image: '/Pizza-Margarita.jpg', description: 'Classic Italian coffee-and-mascarpone dessert, lightly dusted with cocoa.' },
  { id: 'b15', name: 'Strawberry Cake', category: 'bakery-desserts', price: 150, image: '/Strawberry-Lemonade.jpg', description: 'Fresh strawberry sponge with whipped cream and berry topping.' },

  // DESSERTS
  { id: 'd1', name: 'Fruits & Ice Cream', category: 'bakery-desserts', price: 270, image: '/Fruit-Salad.jpg', description: 'Seasonal fruit served with premium vanilla ice cream.' },
  { id: 'd2', name: 'Banana Split', category: 'bakery-desserts', price: 200, image: '/Mixed-Fruits-Platter.jpg', description: 'Three scoops of ice cream with banana, sauce and cream.' },
  { id: 'd3', name: 'Tropical Fruit Salad', category: 'bakery-desserts', price: 200, image: '/Fruit Plate.jpg', description: 'Fresh-cut tropical fruits served on a chilled plate.' },
  { id: 'd4', name: 'Apple Delight', category: 'bakery-desserts', price: 250, image: '/Pilau-Plain.jpg', description: 'Bakemart\'s signature apple dessert with caramel drizzle.' },

  // WAFFLES CORNER
  { id: 'w1', name: 'Vanilla Waffles', category: 'waffles-triffles', price: 200, image: '/Pilau-Beef.jpg', description: 'Crisp golden waffles with a warm vanilla aroma.' },
  { id: 'w2', name: 'Chocolate Waffles', category: 'waffles-triffles', price: 250, image: '/noodles.jpg', description: 'Rich chocolate batter waffles served warm and soft inside.' },
  { id: 'w3', name: 'Red Velvet Waffles', category: 'waffles-triffles', price: 300, image: '/Nduma-greens-kuku.jpg', description: 'Red velvet batter with a hint of cocoa, finished with cream.' },
  { id: 'w4', name: 'Peanut Butter Waffles', category: 'waffles-triffles', price: 300, image: '/Mixed-juices.jpg', description: 'Peanut butter-infused waffles with a nutty, caramelised crust.' },
  { id: 'w5', name: 'Vegetable Waffles', category: 'waffles-triffles', price: 300, image: '/Vegetable-wiffle.jpg', description: 'Savoury veggie-packed waffles, light and wholesome.' },
  { id: 'w6', name: 'Waffle & Ice Cream', category: 'waffles-triffles', price: 400, image: '/Matumbo-Dry-Fry-Ugali.jpg', description: 'Hot waffle paired with cold ice cream and a drizzle of sauce.' },

  // TRIFFLES
  { id: 'tr1', name: 'Chocolate Trifle', category: 'waffles-triffles', price: 250, image: '/Fruit-Triffle-and-Chocolate-Triffle.jpg', description: 'Layered chocolate sponge, mousse and cream finished with shavings.' },
  { id: 'tr2', name: 'Fruit Trifle', category: 'waffles-triffles', price: 250, image: '/Matoke-Minji.jpg', description: 'Bright layers of fresh fruit, custard and light cream.' },
  { id: 'tr3', name: 'Mocha Trifle', category: 'waffles-triffles', price: 250, image: '/Matoke-Greens-Beef.jpg', description: 'Coffee-infused layers with chocolate, cream and biscuit crunch.' },
  { id: 'tr4', name: 'Caramel Trifle', category: 'waffles-triffles', price: 250, image: '/Chicken-Hawaii-Pizza.jpg', description: 'Buttery caramel layers with toffee notes and smooth cream.' },

  // ==========================================
  // JUICES, MOJITOS & SMOOTHIES
  // ==========================================
  { id: 'mj1', name: 'Sunrise Mojito', category: 'juices-cocktails', price: 200, image: '/Mixed-Fruit-Cocktail.jpg', description: 'A refreshing mint and citrus mocktail with a fruity kick.' },
  { id: 'mj2', name: 'Lime Mojito', category: 'juices-cocktails', price: 200, image: '/Boiled-beef-Cassava-&-Greens.jpg', description: 'Zesty lime, fresh mint and sparkling soda over ice.' },
  { id: 'mj3', name: 'Passion Mojito', category: 'juices-cocktails', price: 200, image: '/Pizza-Margarita.jpg', description: 'Tropical passion fruit blended with mint and lime.' },
  { id: 'mj4', name: 'Watermelon Mojito', category: 'juices-cocktails', price: 200, image: '/ugali-kuku-wetfry.jpeg', description: 'Light, juicy watermelon blended with mint and soda.' },
  { id: 'mj5', name: 'Kiwi Mojito', category: 'juices-cocktails', price: 200, image: '/Mixed-Juices.jpg', description: 'Tangy kiwi and mint refresher with a sparkling finish.' },
  { id: 'mj6', name: 'Blue Mojito', category: 'juices-cocktails', price: 200, image: '/nduma.jpeg', description: 'Cool blue curaçao twist on a classic mojito.' },
  { id: 'mj7', name: 'Strawberry Mojito', category: 'juices-cocktails', price: 200, image: '/White-Coffee.jpg', description: 'Fresh strawberries muddled with mint, lime and soda.' },

  // LEMONADES
  { id: 'lm1', name: 'Original Lemonade', category: 'juices-cocktails', price: 150, image: '/cookies-10pieces.jpeg', description: 'Classic cold-pressed lemonade with a bright, tart finish.' },
  { id: 'lm2', name: 'Mint Lemonade', category: 'juices-cocktails', price: 150, image: '/Mixed-Fruits.jpg', description: 'Chilled lemonade infused with fresh mint leaves.' },
  { id: 'lm3', name: 'Strawberry Lemonade', category: 'juices-cocktails', price: 150, image: '/Chocolate-Wiffle.jpg', description: 'Sweet strawberry blended into bright, fresh lemonade.' },
  { id: 'lm4', name: 'Watermelon Lemonade', category: 'juices-cocktails', price: 150, image: '/Vanilla-wiffle.jpg', description: 'Cool watermelon mixed with zesty lemon and a hint of mint.' },

  // DETOX COCKTAILS
  { id: 'dt1', name: 'Green Detox', category: 'juices-cocktails', price: 250, image: '/Strawberry-Smoothie.jpg', description: 'Cleansing green blend of leafy greens, apple and lime.' },
  { id: 'dt2', name: 'Pawa Juice', category: 'juices-cocktails', price: 250, image: '/Chocolate-Smoothie.jpg', description: 'Traditional sugarcane-inspired refreshing drink.' },
  { id: 'dt3', name: 'Dona Colada', category: 'juices-cocktails', price: 250, image: '/Mocca-Smoothie.jpg', description: 'Creamy pineapple and coconut cooler, served icy.' },
  { id: 'dt4', name: 'Papeno Doppio', category: 'juices-cocktails', price: 250, image: '/Cold-Cheese-Cake.jpg', description: 'Bold double-strength fruit refresher with a sharp edge.' },
  { id: 'dt5', name: 'Detox Cubes', category: 'juices-cocktails', price: 250, image: '/Vanila-Triffle-and-Chocolate-Triffle.jpg', description: 'Chilled fruit cubes in a light, refreshing cold drink.' },
  { id: 'dt6', name: 'Blood Cleanser', category: 'juices-cocktails', price: 250, image: '/Strawberry-Lemonade.jpg', description: 'Beetroot and carrot cold-pressed blend for a clean finish.' },

  // 100% FRESH JUICE
  { id: 'fj1', name: 'Apple Juice', category: 'juices-cocktails', price: 200, image: '/Fruit-Salad.jpg', description: 'Cold-pressed crisp apple juice with no added sugar.' },
  { id: 'fj2', name: 'Carrot Juice', category: 'juices-cocktails', price: 200, image: '/Mixed-Fruits-Platter.jpg', description: 'Sweet, earthy carrot juice pressed fresh to order.' },
  { id: 'fj4', name: 'Beetroot Juice', category: 'juices-cocktails', price: 200, image: '/beetroot-juice.jpeg', description: 'Earthy, vibrant beetroot juice with a naturally sweet finish.' },
  { id: 'fj5', name: 'Mixed Fruit Cocktail', category: 'juices-cocktails', price: 200, image: '/Fruit Plate.jpg', description: 'A bright blend of seasonal fruits in every sip.' },
  { id: 'fj6', name: 'Tamarind Juice', category: 'juices-cocktails', price: 200, image: '/Vegetable-wiffle.jpg', description: 'Tangy-sweet tamarind chilled and served over ice.' },

  // JUICE BLENDS
  { id: 'jb1', name: 'Pineapple Juice', category: 'juices-cocktails', price: 150, image: '/pineapple-juice.jpeg', description: 'Tart, golden pineapple juice served cold.' },
  { id: 'jb2', name: 'Mango Juice', category: 'juices-cocktails', price: 150, image: '/Fruit-Triffle-and-Chocolate-Triffle.jpg', description: 'Rich, Alphonso-style mango juice with a smooth finish.' },
  { id: 'jb3', name: 'Beetroot Juice', category: 'juices-cocktails', price: 150, image: '/Mixed-Fruit-Cocktail.jpg', description: 'Deep, sweet earthiness in every chilled glass.' },
  { id: 'jb5', name: 'Passion Juice', category: 'juices-cocktails', price: 150, image: '/Mixed-Juices.jpg', description: 'Aromatic passion fruit juice with a tropical zing.' },
  { id: 'jb6', name: 'Orange Juice', category: 'juices-cocktails', price: 150, image: '/beetroot-juice.jpeg', description: 'Freshly squeezed orange juice with bright citrus notes.' },

  // FRUIT JUICE LAYERS
  { id: 'fl1', name: 'Tropical Layer', category: 'juices-cocktails', price: 250, image: '/pineapple-juice.jpeg', description: 'Mango, avocado and strawberry layered for a fresh, creamy sip.' },
  { id: 'fl2', name: 'ABC Vitamins', category: 'juices-cocktails', price: 250, image: '/Black-Coffee.jpg', description: 'Apple, beetroot and carrot blend for a balanced boost.' },
  { id: 'fl3', name: 'Active Boost', category: 'juices-cocktails', price: 250, image: '/iced-tea.jpeg', description: 'Ginger, pineapple and carrot blended for energy.' },
  { id: 'fl4', name: 'Organic Glow', category: 'juices-cocktails', price: 250, image: '/egg-ommelete.jpeg', description: 'Carrot and orange pressed together for a clean glow.' },
  { id: 'fl5', name: 'Fruit Loop', category: 'juices-cocktails', price: 250, image: '/Smokie-Special.jpg', description: 'Banana, mango and strawberry blended into one smooth layer.' },

  // SMOOTHIES
  { id: 'sm1', name: 'Oreo Smoothie', category: 'juices-cocktails', price: 350, image: '/Nduma-sausage-fried-egg.jpg', description: 'Creamy cookies-and-cream smoothie with crushed Oreo finish.' },
  { id: 'sm2', name: 'Coconut Smoothie', category: 'juices-cocktails', price: 350, image: '/Sweet-potatoes&-Fried-Eggs.jpg', description: 'Thick coconut cream blended with ice for a tropical sip.' },
  { id: 'sm3', name: 'Avocado Smoothie', category: 'juices-cocktails', price: 250, image: '/cassava.jpeg', description: 'Creamy, silky avocado blended with milk and honey.' },
  { id: 'sm4', name: 'Peanut Butter Smoothie', category: 'juices-cocktails', price: 350, image: '/Beef-Samosa.jpg', description: 'Rich peanut butter blended with banana and milk.' },
  { id: 'sm5', name: 'Blueberry Smoothie', category: 'juices-cocktails', price: 400, image: '/Potato-Weges-Beef.jpg', description: 'Bursting with wild blueberries and a creamy finish.' },

  // ==========================================
  // BEVERAGES & COFFEE
  // ==========================================
  { id: 'hb1', name: 'White Coffee', category: 'hot-cold-drinks', price: 200, image: '/Chapati.jpg', description: 'Smooth, milky coffee with a light, creamy finish.' },
  { id: 'hb2', name: 'Black Coffee', category: 'hot-cold-drinks', price: 200, image: '/Black-Coffee.jpg', description: 'Bold, freshly brewed black coffee with rich aroma.' },
  { id: 'hb3', name: 'White Chocolate', category: 'hot-cold-drinks', price: 200, image: '/Avocado-Honey-Sandwich.jpg', description: 'Creamy white chocolate blended hot or iced.' },
  { id: 'hb4', name: 'Baristo Tea', category: 'hot-cold-drinks', price: 200, image: '/Chapati-Chicken-Wrap.jpg', description: 'Strong, spiced tea inspired by coastal Kenyan coffee houses.' },
  { id: 'hb5', name: 'Mixed Tea', category: 'hot-cold-drinks', price: 70, image: '/Ugali-Maini-Greens.jpg', description: 'House-style milky tea brewed with spice and warmth.' },
  { id: 'hb6', name: 'Masala Tea', category: 'hot-cold-drinks', price: 100, image: '/Ugali-Beef-Greens.jpg', description: 'Aromatic spiced tea with cloves, cinnamon and ginger.' },
  { id: 'hb7', name: 'Dawa Special', category: 'hot-cold-drinks', price: 200, image: '/Kienyeji-Kuku-Ugali.jpg', description: 'Honey, lemon and ginger warmed together for comfort.' },
  { id: 'hb8', name: 'Black Tea', category: 'hot-cold-drinks', price: 60, image: '/Ugali-Beef-Scrambled-eggs-dry-fry.jpg', description: 'Classic steeped black tea, clean and straightforward.' },
  { id: 'hb9', name: 'Lemon Tea', category: 'hot-cold-drinks', price: 70, image: '/ugali-greens.jpeg', description: 'Bright lemon steeped into warm tea for a soothing sip.' },
  { id: 'hb10', name: 'Hot Lemon Water', category: 'hot-cold-drinks', price: 30, image: '/Quarter-Chicken.jpg', description: 'Simple warm lemon water, light and refreshing.' },
  { id: 'hb12', name: 'Heavy Tea', category: 'hot-cold-drinks', price: 100, image: '/Rice-Beef-Salad.jpg', description: 'Extra-strong, full-bodied milky tea for true tea lovers.' },

  // COLD DRINKS
  { id: 'cd1', name: 'Soda 300ml', category: 'hot-cold-drinks', price: 60, image: '/Mixed-Grill-Skewers.jpg', description: 'Chilled 300ml soda, your choice of mixer available.' },
  { id: 'cd2', name: 'Soda 500ml', category: 'hot-cold-drinks', price: 80, image: '/Vegrtable-Biriani.jpg', description: 'Ice-cold 500ml soda for a crisp refreshment.' },
  { id: 'cd3', name: 'Dasani 500ml', category: 'hot-cold-drinks', price: 50, image: '/pilau-plain.jpeg', description: 'Pure, refreshing bottled water, 500ml.' },
  { id: 'cd4', name: 'Dasani 1L', category: 'hot-cold-drinks', price: 90, image: '/keema-chapati wrap.jpg', description: 'Large 1-litre bottle of pure drinking water.' },
  { id: 'cd5', name: 'Monster Energy', category: 'hot-cold-drinks', price: 250, image: '/Chicken-Biriani.jpg', description: 'High-energy drink for an intense boost.' },
  { id: 'cd6', name: 'PET Soda 500ml', category: 'hot-cold-drinks', price: 80, image: '/Egg-Biriani.jpg', description: '500ml chilled PET soda, selection available.' },
  { id: 'cd7', name: 'Iced Tea', category: 'hot-cold-drinks', price: 150, image: '/iced-tea.jpeg', description: 'Sweet, chilled tea served over ice.' },
  { id: 'cd10', name: 'Del Monte Juice', category: 'hot-cold-drinks', price: 350, image: '/ugali-omena-greens.jpg', description: 'Premium fruit juice from Del Monte, ready to drink.' },
  { id: 'cd11', name: 'Red Bull', category: 'hot-cold-drinks', price: 250, image: '/pilau-beef.jpeg', description: 'Classic energy drink to keep you going.' },

  // ==========================================
  // NAKURU BREAKFAST
  // ==========================================
  { id: 'br1', name: 'French Toast Special', category: 'breakfast', price: 250, image: '/pilau-chicken.jpeg', description: 'Golden egg-dipped toast served with sausage and eggs.' },
  { id: 'br2', name: 'Egg Omelette', category: 'breakfast', price: 150, image: '/egg-ommelete.jpeg', description: 'Fluffy three-egg omelette cooked to order.' },
  { id: 'br3', name: 'Triple Egg Omelette', category: 'breakfast', price: 200, image: '/Chips-Masala.jpg', description: 'Extra-rich three-egg omelette, hearty and filling.' },
  { id: 'br4', name: 'Boiled Eggs', category: 'breakfast', price: 80, image: '/Cassava-Fried-Beef.jpg', description: 'Two perfectly boiled eggs, ready to peel and eat.' },
  { id: 'br5', name: 'Beef Sausage', category: 'breakfast', price: 60, image: '/Smokie-Special.jpg', description: 'Juicy seasoned beef sausage, grilled or fried.' },
  { id: 'br6', name: 'Double Fried Eggs', category: 'breakfast', price: 80, image: '/Cassava-Boiled-Beef-Veggies.jpg', description: 'Two sunny-side-up fried eggs with crisp edges.' },
  { id: 'br7', name: 'Nduma', category: 'breakfast', price: 200, image: '/Nduma-sausage-fried-egg.jpg', description: 'Boiled arrowroots, a classic Kenyan breakfast staple.' },
  { id: 'br8', name: 'Sweet Potatoes', category: 'breakfast', price: 80, image: '/Sweet-potatoes&-Fried-Eggs.jpg', description: 'Steamed sweet potatoes, naturally sweet and warm.' },
  { id: 'br9', name: 'Cassava', category: 'breakfast', price: 100, image: '/cassava.jpeg', description: 'Tender boiled cassava, a simple and satisfying start.' },
  { id: 'br10', name: 'Sweet Waffles', category: 'breakfast', price: 200, image: '/Nduma-Egg-omellete.jpg', description: 'Light, sweet waffles served warm with syrup.' },
  { id: 'br11', name: 'Samosa', category: 'breakfast', price: 80, image: '/Beef-Samosa.jpg', description: 'Crispy triangular pastry filled with spiced minced beef.' },
  { id: 'br13', name: 'Pancakes', category: 'breakfast', price: 120, image: '/Burger&-Chips-(2).jpg', description: 'Soft, fluffy pancakes stacked and ready for syrup.' },
  { id: 'br14', name: 'Mixed Wedges', category: 'breakfast', price: 250, image: '/Potato-Weges-Beef.jpg', description: 'Golden potato and arrowroot wedges, lightly seasoned.' },
  { id: 'br15', name: 'Chapati', category: 'breakfast', price: 50, image: '/Chapati.jpg', description: 'Warm, flaky Kenyan-style chapati, served fresh.' },
  { id: 'br16', name: 'Veggie Sandwich', category: 'breakfast', price: 100, image: '/Avocado-Honey-Sandwich.jpg', description: 'Toasted sandwich packed with fresh vegetables.' },
  { id: 'br17', name: 'Smocha', category: 'breakfast', price: 150, image: '/Chapati-Chicken-Wrap.jpg', description: 'Chapati wrapped around a smoky sausage, toasted.' },

  // ==========================================
  // CHEF MAINS & STEWS
  // ==========================================
  { id: 'm1_1', name: 'Ugali with Greens', category: 'mains-meals', price: 200, image: '/Ugali-Maini-Greens.jpg', description: 'Tender managu or spinach served with hot ugali.' },
  { id: 'm1_2', name: 'Ugali Beef Stew', category: 'mains-meals', price: 300, image: '/Ugali-Beef-Greens.jpg', description: 'Slow-cooked beef stew paired with smooth ugali.' },
  { id: 'm1_3', name: 'Ugali Chicken Stew', category: 'mains-meals', price: 400, image: '/Kienyeji-Kuku-Ugali.jpg', description: 'Juicy chicken stew in rich sauce alongside ugali.' },
  { id: 'm1_4', name: 'Ugali Fried Eggs', category: 'mains-meals', price: 250, image: '/Ugali-Beef-Scrambled-eggs-dry-fry.jpg', description: 'Crispy fried eggs served over hot ugali.' },
  { id: 'm1_5', name: 'Brown Ugali & Greens', category: 'mains-meals', price: 200, image: '/ugali-greens.jpeg', description: 'Nutty brown ugali paired with farm-fresh greens.' },
  { id: 'm1_6', name: 'Quarter Chicken & Chips', category: 'mains-meals', price: 550, image: '/Quarter-Chicken.jpg', description: 'Quarter chicken marinated and served with golden chips.' },
  { id: 'm1_7', name: 'Rice Beef Stew', category: 'mains-meals', price: 300, image: '/Rice-Beef-Salad.jpg', description: 'Fluffy rice topped with slow-cooked beef stew.' },
  { id: 'm1_8', name: 'Rice Chicken Stew', category: 'mains-meals', price: 400, image: '/Mixed-Grill-Skewers.jpg', description: 'Steamed rice served with tender chicken stew.' },
  { id: 'm1_9', name: 'Sautéed Potatoes & Beef', category: 'mains-meals', price: 400, image: '/Chips Masala.jpg', description: 'Buttered sautéed potatoes tossed with seasoned beef.' },
  { id: 'm1_10', name: 'Chapati Beef Greens', category: 'mains-meals', price: 250, image: '/Chips-masala-Sausage.jpg', description: 'Warm chapati rolls filled with beef and greens.' },
  { id: 'm1_11', name: 'Rice & Vegetable Stew', category: 'mains-meals', price: 250, image: '/Vegrtable-Biriani.jpg', description: 'Steamed rice with a gentle mixed-vegetable stew.' },
  { id: 'm1_12', name: 'Plain Pilau', category: 'mains-meals', price: 300, image: '/pilau-plain.jpeg', description: 'Fragrant spiced rice cooked to a perfect golden finish.' },
  { id: 'm1_13', name: 'Kienyeji Kuku', category: 'mains-meals', price: 550, image: '/njahi-stew-matoke-greens.jpg', description: 'Slow-cooked traditional chicken in rich, aromatic broth.' },
  { id: 'm2_1', name: 'Keema & Minji', category: 'mains-meals', price: 300, image: '/keema-chapati wrap.jpg', description: 'Minced beef stew with green grams and warm chapati.' },
  { id: 'm2_2', name: 'Chicken Tikka Masala', category: 'mains-meals', price: 500, image: '/Chicken-Biriani.jpg', description: 'Tender chicken in a creamy, spiced tomato masala.' },
  { id: 'm2_3', name: 'Beef Chilli Stir-Fry', category: 'mains-meals', price: 350, image: '/Mukimo-Beef.jpg', description: 'Wok-tossed beef with chillies, peppers and ugali.' },
  { id: 'm2_4', name: 'Egg Biryani', category: 'mains-meals', price: 300, image: '/Egg-Biriani.jpg', description: 'Fragrant spiced rice layered with seasoned boiled eggs.' },
  { id: 'm2_5', name: 'Chicken Biryani', category: 'mains-meals', price: 500, image: '/mukimo-njahi beef greens.jpg', description: 'Royal-style chicken biryani with saffron and herbs.' },
  { id: 'm2_6', name: 'Vegetable Biryani', category: 'mains-meals', price: 250, image: '/Matoke-Beef.jpg', description: 'Aromatic spiced rice with seasonal vegetables.' },
  { id: 'm2_7', name: 'Mutton Biryani', category: 'mains-meals', price: 450, image: '/Njahi-Chapati-Cabbage.jpg', description: 'Slow-cooked mutton layered into fragrant spiced rice.' },
  { id: 'm2_8', name: 'Ugali & Omena', category: 'mains-meals', price: 250, image: '/ugali-omena-greens.jpg', description: 'Hot ugali served with crispy fried omena.' },
  { id: 'm2_9', name: 'Ugali & Liver', category: 'mains-meals', price: 400, image: '/Nduma-Fried-Greens-Beef.jpg', description: 'Sautéed liver in a rich onion sauce with ugali.' },
  { id: 'm2_10', name: 'Pilau Beef', category: 'mains-meals', price: 400, image: '/pilau-beef.jpeg', description: 'Spiced pilau rice topped with tender braised beef.' },
  { id: 'm2_11', name: 'Pilau Chicken', category: 'mains-meals', price: 500, image: '/pilau-chicken.jpeg', description: 'Fragrant pilau rice served with spiced chicken.' },
  { id: 'm2_12', name: 'Chicken Fried Rice', category: 'mains-meals', price: 400, image: '/Platter.jpg', description: 'Wok-fried rice tossed with chicken and vegetables.' },
  { id: 'm2_13', name: 'Beef Fried Rice', category: 'mains-meals', price: 350, image: '/Choma-Platter.jpg', description: 'Savory fried rice with seasoned beef and veg.' },
  { id: 'm2_14', name: 'Chips Masala Beef', category: 'mains-meals', price: 400, image: '/Chips-Masala.jpg', description: 'Spiced chips tossed in a rich beef masala sauce.' },
  { id: 'm2_15', name: 'Cassava Beef', category: 'mains-meals', price: 350, image: '/Cassava-Fried-Beef.jpg', description: 'Fried cassava served with spiced beef chunks.' },
  { id: 'm2_16', name: 'Cassava Greens', category: 'mains-meals', price: 200, image: '/Cassava-Boiled-Beef-Veggies.jpg', description: 'Tender cassava leaves lightly sautéed with aromatics.' },

  // ==========================================
  // SNACKS & BURGERS
  // ==========================================
  { id: 's1', name: 'Beef Samosa', category: 'light-snacks', price: 250, image: '/Chapati-Wrap-Special.jpg', description: 'Crispy golden pastry filled with spiced minced beef.' },
  { id: 's2', name: 'Sausage Special', category: 'light-snacks', price: 250, image: '/Chicken-Salad.jpg', description: 'Juicy grilled sausage served with a side of chips.' },
  { id: 's3', name: 'Chicken Wings', category: 'light-snacks', price: 300, image: '/Cheese-Sandwitch.jpg', description: 'Marinated chicken wings, grilled and glazed.' },
  { id: 's4', name: 'Fried Eggs Special', category: 'light-snacks', price: 250, image: '/Nduma-Egg-omellete.jpg', description: 'Two fried eggs served with a light side.' },
  { id: 's5', name: 'Beef Burger & Chips', category: 'light-snacks', price: 480, image: '/Burger&-Chips-(2).jpg', description: 'Crispy beef patty in a soft bun with golden chips.' },
  { id: 's6', name: 'Chips Masala', category: 'light-snacks', price: 300, image: '/Penne-Pasta.jpg', description: 'Crispy chips tossed in a warm, spiced masala.' },
  { id: 's7', name: 'Chips', category: 'light-snacks', price: 200, image: '/Chips Masala.jpg', description: 'Classic golden fries, lightly salted and hot.' },
  { id: 's8', name: 'Smokie Special', category: 'light-snacks', price: 250, image: '/Vegetable-Pizza.jpg', description: 'Smoky grilled smokie with a side of greens.' },
  { id: 's9', name: 'Chips Kubwa', category: 'light-snacks', price: 300, image: '/Chips-masala-Sausage.jpg', description: 'A large serving of crispy chips for sharing.' },
  { id: 's10', name: 'Home Fries', category: 'light-snacks', price: 300, image: '/Pilau-Plain.jpg', description: 'Rustic home-style fried potatoes with herbs.' },
  { id: 's11', name: 'Chapati Roll', category: 'light-snacks', price: 150, image: '/Pilau-Beef.jpg', description: 'Soft chapati rolled with spiced filling.' },
  { id: 's12', name: 'Mixed Grill Skewers', category: 'light-snacks', price: 150, image: '/noodles.jpg', description: 'Charcoal-grilled mshikaki skewers, one piece.' },

  // ==========================================
  // KIENYEJI SPECIALS
  // ==========================================
  { id: 'k1', name: 'Githeri Special', category: 'kienyeji-traditional', price: 280, image: '/njahi-stew-matoke-greens.jpg', description: 'Traditional mixed maize and beans stew, hearty and warm.' },
  { id: 'k2', name: 'Mukimo Maize & Beef', category: 'kienyeji-traditional', price: 350, image: '/Mukimo-Beef.jpg', description: 'Mashed maize, beans and greens mixed with beef.' },
  { id: 'k3', name: 'Mukimo Minji & Beef', category: 'kienyeji-traditional', price: 350, image: '/mukimo-njahi beef greens.jpg', description: 'Smooth mashed green grams blended with beef.' },
  { id: 'k4', name: 'Matoke Stew Beef', category: 'kienyeji-traditional', price: 350, image: '/Matoke-Beef.jpg', description: 'Green bananas stewed in a rich beef sauce.' },
  { id: 'k5', name: 'Mashed Potatoes & Beef', category: 'kienyeji-traditional', price: 350, image: '/Nduma-greens-kuku.jpg', description: 'Buttery mashed potatoes served with beef gravy.' },
  { id: 'k6', name: 'Mashed Potatoes & Chicken', category: 'kienyeji-traditional', price: 500, image: '/Mixed-juices.jpg', description: 'Creamy mashed potatoes paired with tender chicken.' },
  { id: 'k7', name: 'Mashed Matoke & Chicken', category: 'kienyeji-traditional', price: 550, image: '/Matumbo-Dry-Fry-Ugali.jpg', description: 'Matoke mashed and served with juicy chicken.' },
  { id: 'k8', name: 'Beans Stew & Rice', category: 'kienyeji-traditional', price: 200, image: '/Matoke-Minji.jpg', description: 'Hearty beans stew served with chapati or rice.' },
  { id: 'k9', name: 'Ndengu Stew & Rice', category: 'kienyeji-traditional', price: 200, image: '/Njahi-Chapati-Cabbage.jpg', description: 'Green grams stew with rice or chapati on the side.' },
  { id: 'k10', name: 'Njahi Stew & Rice', category: 'kienyeji-traditional', price: 250, image: '/Matoke-Greens-Beef.jpg', description: 'Black beans stew slow-cooked with spices.' },
  { id: 'k11', name: 'Uji Wimbi', category: 'kienyeji-traditional', price: 100, image: '/Chicken-Hawaii-Pizza.jpg', description: 'Creamy millet porridge, warming and satisfying.' },
  { id: 'k12', name: 'Uji Power', category: 'kienyeji-traditional', price: 100, image: '/Boiled-beef-Cassava-&-Greens.jpg', description: 'Cassava-based porridge with a smooth, earthy taste.' },
  { id: 'k13', name: 'Ugali Samaki Greens', category: 'kienyeji-traditional', price: 350, image: '/ugali-kuku-wetfry.jpeg', description: 'Ugali served with fresh fish and greens.' },
  { id: 'k14', name: 'Nduma Greens', category: 'kienyeji-traditional', price: 250, image: '/Nduma-Fried-Greens-Beef.jpg', description: 'Nduma greens sautéed with aromatics and chilli.' },
  { id: 'k15', name: 'Githeri Greens', category: 'kienyeji-traditional', price: 200, image: '/nduma.jpeg', description: 'Githeri served alongside fresh garden greens.' },

  // ==========================================
  // BARBECUE PLATTERS
  // ==========================================
  { id: 'bbq1', name: 'Mixed Grill Platter', category: 'bbq-platters', price: 1500, image: '/Platter.jpg', description: 'Goat meat, grilled chicken, sausage, chips, wedges, ugali, chapati, fresh salad and our signature sauce.' },
  { id: 'bbq2', name: 'Premium BBQ Feast', category: 'bbq-platters', price: 2000, image: '/Choma-Platter.jpg', description: 'Mbuzi choma, kuku choma, pilau, wedges, sausages, chips masala, fried cassava, greens and sauce.' },

  // ==========================================
  // SANDWICHES & WRAPS
  // ==========================================
  { id: 'wr1', name: 'Egg Chapati Wrap', category: 'sandwiches-wraps', price: 150, image: '/White-Coffee.jpg', description: 'Soft chapati wrapped around seasoned egg and fresh greens.' },
  { id: 'wr2', name: 'Hot Dog Wrap', category: 'sandwiches-wraps', price: 200, image: '/Chapati-Wrap-Special.jpg', description: 'Chapati wrap filled with a grilled hot dog and relish.' },
  { id: 'wr3', name: 'Veggie Chapati Wrap', category: 'sandwiches-wraps', price: 200, image: '/cookies-10pieces.jpeg', description: 'Fresh vegetable wrap with herbs and light dressing.' },
  { id: 'wr4', name: 'Keema Chapati Wrap', category: 'sandwiches-wraps', price: 300, image: '/Mixed-Fruits.jpg', description: 'Minced beef keema rolled in a warm chapati.' },
  { id: 'wr5', name: 'Grilled Chicken Wrap', category: 'sandwiches-wraps', price: 350, image: '/Chocolate-Wiffle.jpg', description: 'Marinated grilled chicken with salad in a chapati.' },
  { id: 'sw1', name: 'Beef Sandwich', category: 'sandwiches-wraps', price: 250, image: '/Vanilla-wiffle.jpg', description: 'Toasted sandwich filled with seasoned beef slices.' },
  { id: 'sw2', name: 'Chicken Sandwich', category: 'sandwiches-wraps', price: 300, image: '/Chicken-Salad.jpg', description: 'Grilled chicken breast in a toasted sandwich roll.' },
  { id: 'sw3', name: 'Ham Sandwich', category: 'sandwiches-wraps', price: 300, image: '/Strawberry-Smoothie.jpg', description: 'Classic ham sandwich with lettuce and mustard.' },
  { id: 'sw4', name: 'Cheese Sandwich', category: 'sandwiches-wraps', price: 300, image: '/Cheese-Sandwitch.jpg', description: 'Melted cheese between toasted bread, simple and warm.' },
  { id: 'sw5', name: 'Tuna Sandwich', category: 'sandwiches-wraps', price: 400, image: '/Chocolate-Smoothie.jpg', description: 'Flaky tuna mixed with mayo, served on toasted bread.' },
  { id: 'sw6', name: 'Hot Dog', category: 'sandwiches-wraps', price: 300, image: '/Mocca-Smoothie.jpg', description: 'Grilled hot dog in a soft bun with mustard and ketchup.' },
  { id: 'sw7', name: 'Kebab', category: 'sandwiches-wraps', price: 100, image: '/Cold-Cheese-Cake.jpg', description: 'Spiced minced meat kebab, grilled and served hot.' },
  { id: 'sw8', name: 'Egg Toast Sandwich', category: 'sandwiches-wraps', price: 300, image: '/Vanila-Triffle-and-Chocolate-Triffle.jpg', description: 'Fried egg sandwich on toasted bread with butter.' },

  // ==========================================
  // ITALIAN PIZZA & PASTAS
  // ==========================================
  { id: 'pas1', name: 'Spaghetti Bolognese', category: 'pizza-pasta', price: 350, image: '/Strawberry-Lemonade.jpg', description: 'Classic minced beef ragu served over al dente spaghetti.' },
  { id: 'pas2', name: 'Penne Pasta', category: 'pizza-pasta', price: 400, image: '/Penne-Pasta.jpg', description: 'Penne tossed in a rich tomato and cream sauce.' },
  { id: 'pas3', name: 'Beef Stroganoff', category: 'pizza-pasta', price: 500, image: '/Fruit-Salad.jpg', description: 'Tender beef strips in a creamy mushroom sauce with penne.' },
  { id: 'pas4', name: 'Noodles', category: 'pizza-pasta', price: 150, image: '/Mixed-Fruits-Platter.jpg', description: 'Stir-fried egg noodles with vegetables and soy.' },
  {
    id: 'p1', name: 'Margherita Pizza', category: 'pizza-pasta', price: 1000, image: '/Pizza-Margarita.jpg', description: 'Tomato, mozzarella and fresh basil on a thin crust.',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p2', name: 'Chicken Tikka Pizza', category: 'pizza-pasta', price: 1100, image: '/Mixed-Grill-Skewers.jpg', description: 'Spiced chicken tikka with cheese and peppers.',
    options: [{ name: 'Medium', price: 1100 }, { name: 'Large', price: 1450 }]
  },
  {
    id: 'p3', name: 'Vegetable Pizza', category: 'pizza-pasta', price: 1000, image: '/Vegetable-Pizza.jpg', description: 'Colorful capsicum, onion and olive garden pizza.',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p4', name: 'Hawaiian Chicken Pizza', category: 'pizza-pasta', price: 1100, image: '/Chicken-Hawaii-Pizza.jpg', description: 'Grilled chicken with pineapple and melted cheese.',
    options: [{ name: 'Medium', price: 1100 }, { name: 'Large', price: 1450 }]
  },
  {
    id: 'p5', name: 'Fiorentina Pizza', category: 'pizza-pasta', price: 1000, image: '/Vegetable-Pizza.jpg', description: 'Spinach, black pepper and mozzarella on a crisp base.',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p6', name: 'Spicy Arezzo Pizza', category: 'pizza-pasta', price: 1000, image: '/Mixed-Grill-Skewers.jpg', description: 'Minced beef with chilli, herbs and melted cheese.',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p7', name: 'BBQ Mix Pizza', category: 'pizza-pasta', price: 1100, image: '/Choma-Platter.jpg', description: 'Loaded with BBQ beef, chicken and smoky sauce.',
    options: [{ name: 'Medium', price: 1100 }, { name: 'Large', price: 1450 }]
  },
  {
    id: 'p8', name: 'Garlic Cheese Bread', category: 'pizza-pasta', price: 200, image: '/Cheese-Sandwitch.jpg', description: 'Warm garlic bread stuffed with melted cheese.',
    options: [{ name: 'Medium', price: 200 }, { name: 'Large', price: 350 }]
  },

  // ==========================================
  // SOUPS & SALADS
  // ==========================================
  { id: 'sl1', name: 'Garden Salad', category: 'soups-salads', price: 250, image: '/Fruit Plate.jpg', description: 'Mixed leaves, tomato, cucumber and light vinaigrette.' },
  { id: 'sl2', name: 'Chicken Salad', category: 'soups-salads', price: 400, image: '/Vegetable-wiffle.jpg', description: 'Grilled chicken over fresh greens with dressing.' },
  { id: 'sl3', name: 'Kachumbari', category: 'soups-salads', price: 200, image: '/Fruit-Triffle-and-Chocolate-Triffle.jpg', description: 'Fresh tomato, onion and chilli salad, bright and zesty.' },
  { id: 'sp1', name: 'Garden Soup', category: 'soups-salads', price: 200, image: '/Mixed-Fruit-Cocktail.jpg', description: 'Light vegetable soup with seasonal garden produce.' },
  { id: 'sp2', name: 'Chicken Soup', category: 'soups-salads', price: 300, image: '/Mixed-Juices.jpg', description: 'Warming chicken soup with herbs and root vegetables.' },
  { id: 'sp3', name: 'Beef Broth', category: 'soups-salads', price: 250, image: '/beetroot-juice.jpeg', description: 'Rich, slow-simmered beef broth for comfort.' },
  { id: 'sp4', name: 'Mushroom Soup', category: 'soups-salads', price: 400, image: '/pineapple-juice.jpeg', description: 'Creamy mushroom soup with thyme and garlic.' },
  { id: 'sp5', name: 'Bone Soup', category: 'soups-salads', price: 100, image: '/Black-Coffee.jpg', description: 'Traditional bone broth served hot and nourishing.' },
];
