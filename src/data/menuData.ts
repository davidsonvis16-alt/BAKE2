import { Category, MenuItem } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'bakery-desserts',
    name: 'Bakery & Desserts',
    icon: 'Cake',
    description: 'Freshly baked muffins, cakes, waffles, cold cheesecakes and trifles',
    image: '/bakery-desserts.jpeg'
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
    description: 'Espresso coffees, brewed teas, dawa specials, iced drinks and sodas'
  },
  {
    id: 'breakfast',
    name: 'Nakuru Breakfast',
    icon: 'Egg',
    description: 'Fresh eggs, French toast, arrowroots, sweet potatoes and chapatis'
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
    description: 'Beef burger & chips, samosa specials, wings, chips masala and mshikaki'
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
    description: 'Toasted beef, chicken, tuna sandwiches and filled chapati wraps'
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
    description: 'Golden waffles and layered triffle dessert cups'
  },
  {
    id: 'soups-salads',
    name: 'Soups & Salads',
    icon: 'Soup',
    description: 'Fresh kachumbari, garden salads, bone soup and mushroom soup'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // BAKERY CORNER
  // ==========================================
  { id: 'b1', name: 'Assorted English Muffins', category: 'bakery-desserts', price: 40, description: 'Freshly baked individual muffin' },
  { id: 'b2', name: 'Butter Cookies (1pc)', category: 'bakery-desserts', price: 10, description: 'Crisp rich butter cookie' },
  { id: 'b3', name: 'Butter Cookies (16pc packet)', category: 'bakery-desserts', price: 200, description: 'Family pack crisp butter cookies' },
  { id: 'b4', name: 'Butter Cookies (10pc packet)', category: 'bakery-desserts', price: 150, description: 'Freshly packed butter cookies' },
  { id: 'b5', name: 'English Tea Cake', category: 'bakery-desserts', price: 80, description: 'Classic buttery tea slice' },
  { id: 'b6', name: 'Creamed Rich Cake', category: 'bakery-desserts', price: 100, description: 'Moist vanilla creamed cake slice' },
  { id: 'b7', name: 'Black Forest / White Forest / Red Velvet Cake', category: 'bakery-desserts', price: 200, badge: 'Popular', description: 'Choice of rich chocolate, vanilla or red velvet cake slice' },
  { id: 'b10', name: 'Caramel Cake Slice', category: 'bakery-desserts', price: 200, description: 'Decadent salted caramel glazed sponge' },
  { id: 'b11', name: 'Chocolate Fudge Cake', category: 'bakery-desserts', price: 200, badge: 'Chef Special', description: 'Rich gooey dark chocolate fudge cake' },
  { id: 'b12', name: 'Cheese Cake (Cold)', category: 'bakery-desserts', price: 250, badge: 'Popular', description: 'Creamy cold setting cheesecake with fruit topping', image: '/Cold-Cheese-Cake.jpg' },
  { id: 'b13', name: 'Chocolate & Vanilla Swiss Roll', category: 'bakery-desserts', price: 150, description: 'Soft rolled sponge filled with sweet vanilla cream' },
  { id: 'b14', name: 'Tiramisu Cake Slice', category: 'bakery-desserts', price: 200, description: 'Italian coffee layered dessert slice' },
  { id: 'b15', name: 'Strawberry Cake Slice', category: 'bakery-desserts', price: 150, description: 'Fresh strawberry layered sponge cake' },

  // DESSERTS
  { id: 'd1', name: 'CoupJack (Fruits & Ice Cream)', category: 'bakery-desserts', price: 270, description: 'Tropical fresh fruit medley topped with premium ice cream' },
  { id: 'd2', name: 'Banana Split', category: 'bakery-desserts', price: 200, description: 'Split ripe banana with ice cream, chocolate drizzle and cherries' },
  { id: 'd3', name: 'Tropical Fruits Salad', category: 'bakery-desserts', price: 200, description: 'Fresh Nakuru local seasonal fruits in natural juice' },
  { id: 'd4', name: 'Bakemart Apple Delight', category: 'bakery-desserts', price: 250, badge: 'Chef Special', description: 'Warm baked spiced apples topped with cold vanilla scoop', image: '/Fruit-Salad.jpg' },

  // WAFFLES CORNER
  { id: 'w1', name: 'Vanilla Waffle', category: 'waffles-triffles', price: 200, description: 'Freshly ironed golden waffle with maple drizzle' },
  { id: 'w2', name: 'Chocolate Waffle', category: 'waffles-triffles', price: 250, description: 'Crisp cocoa waffle with hot fudge' },
  { id: 'w3', name: 'Red Velvet Waffle', category: 'waffles-triffles', price: 300, description: 'Signature red velvet waffle with cream sauce' },
  { id: 'w4', name: 'Peanut Butter Waffle', category: 'waffles-triffles', price: 300, description: 'Creamy peanut butter drizzle and crushed nuts', image: '/Vanilla-wiffle.jpg' },
  { id: 'w5', name: 'Vegetable Waffle', category: 'waffles-triffles', price: 300, description: 'Savory herb waffle' },
  { id: 'w6', name: 'Waffle Topped with Ice Cream', category: 'waffles-triffles', price: 400, badge: 'Popular', description: 'Warm waffle topped with premium ice cream' },

  // TRIFFLES
  { id: 'tr1', name: 'Chocolate Triffle', category: 'waffles-triffles', price: 250, description: 'Layered chocolate pudding, sponge and whipped cream' },
  { id: 'tr2', name: 'Fruit Triffle', category: 'waffles-triffles', price: 250, description: 'Custard layered with fresh fruit and soft cake' },
  { id: 'tr3', name: 'Mocca Triffle', category: 'waffles-triffles', price: 250, description: 'Espresso infused dessert layer cup' },
  { id: 'tr4', name: 'Caramel Triffle', category: 'waffles-triffles', price: 250, description: 'Rich buttery caramel layered dessert', image: '/Fruit-Triffle-and-Chocolate-Triffle.jpg' },

  // ==========================================
  // JUICES, MOJITOS & SMOOTHIES
  // ==========================================
  { id: 'mj1', name: 'Sunrise Mojito', category: 'juices-cocktails', price: 200, description: 'Refreshing citrus mojito blend' },
  { id: 'mj2', name: 'Lime Mojito', category: 'juices-cocktails', price: 200, description: 'Classic fresh lime mojito' },
  { id: 'mj3', name: 'Passion Mojito', category: 'juices-cocktails', price: 200, description: 'Tangy passion fruit mojito' },
  { id: 'mj4', name: 'Watermelon Mojito', category: 'juices-cocktails', price: 200, description: 'Cool watermelon mojito' },
  { id: 'mj5', name: 'Kiwi Mojito', category: 'juices-cocktails', price: 200, description: 'Zesty kiwi mojito' },
  { id: 'mj6', name: 'Blue Mojito', category: 'juices-cocktails', price: 200, badge: 'Popular', description: 'Signature blue curacao style mojito' },
  { id: 'mj7', name: 'Strawberry Mojito', category: 'juices-cocktails', price: 200, description: 'Sweet strawberry mojito' },

  // LEMONADES
  { id: 'lm1', name: 'Original Lemonade', category: 'juices-cocktails', price: 150, description: 'Classic fresh lemonade' },
  { id: 'lm2', name: 'Mint Lemonade', category: 'juices-cocktails', price: 150, description: 'Cool mint infused lemonade' },
  { id: 'lm3', name: 'Strawberry Lemonade', category: 'juices-cocktails', price: 150, description: 'Sweet strawberry lemonade', image: '/Strawberry-Lemonade.jpg' },
  { id: 'lm4', name: 'Watermelon Lemonade', category: 'juices-cocktails', price: 150, description: 'Refreshing watermelon lemonade' },

  // DETOX COCKTAILS
  { id: 'dt1', name: 'Green Juice', category: 'juices-cocktails', price: 250, badge: 'Healthy', description: 'Freshly squeezed kiwi, cucumber & garden spinach — blood system cleanser' },
  { id: 'dt2', name: 'Pawa Juice', category: 'juices-cocktails', price: 250, description: 'Freshly juiced passion of thorn melon' },
  { id: 'dt3', name: 'Dona Colada', category: 'juices-cocktails', price: 250, description: 'Freshly blended pineapple and coconut juice' },
  { id: 'dt4', name: 'Papeno Doppio', category: 'juices-cocktails', price: 250, description: 'Fresh blend of rich Papino melon with antioxidants and apple fruit' },
  { id: 'dt5', name: 'Detox Cubes', category: 'juices-cocktails', price: 250, badge: 'Healthy', description: 'Iced herbs detox blend' },
  { id: 'dt6', name: 'Blood Cleanser', category: 'juices-cocktails', price: 250, badge: 'Healthy', description: 'Beetroot ginger detox blend' },

  // 100% FRESH JUICE
  { id: 'fj1', name: 'Apple Juice', category: 'juices-cocktails', price: 200, description: '100% fresh pressed apple juice' },
  { id: 'fj2', name: 'Carrot Juice', category: 'juices-cocktails', price: 200, description: '100% fresh pressed carrot juice' },
  { id: 'fj3', name: 'Orange Juice', category: 'juices-cocktails', price: 200, description: '100% fresh pressed orange juice' },
  { id: 'fj4', name: 'Beetroot Juice', category: 'juices-cocktails', price: 200, description: '100% fresh pressed beetroot juice' },
  { id: 'fj5', name: 'Mixed Fruit Cocktail', category: 'juices-cocktails', price: 200, description: '100% fresh mixed fruit juice cocktail' },
  { id: 'fj6', name: 'Tamarind Juice', category: 'juices-cocktails', price: 200, description: '100% fresh tamarind juice' },

  // JUICE BLENDS
  { id: 'jb1', name: 'Pineapple Juice Blend', category: 'juices-cocktails', price: 150, description: 'Fresh pineapple juice blend' },
  { id: 'jb2', name: 'Mango Juice Blend', category: 'juices-cocktails', price: 150, description: 'Fresh mango juice blend' },
  { id: 'jb3', name: 'Beetroot Juice Blend', category: 'juices-cocktails', price: 150, description: 'Fresh beetroot juice blend' },
  { id: 'jb4', name: 'Mint Lemon Blend', category: 'juices-cocktails', price: 150, description: 'Refreshing mint lemon blend' },
  { id: 'jb5', name: 'Passion Juice Blend', category: 'juices-cocktails', price: 150, description: 'Fresh passion fruit juice blend' },
  { id: 'jb6', name: 'Orange Juice Blend', category: 'juices-cocktails', price: 150, description: 'Fresh orange juice blend' },

  // FRUIT JUICE LAYERS
  { id: 'fl1', name: 'Tropical Layer', category: 'juices-cocktails', price: 250, description: 'Layered mango, avocado & strawberry juice' },
  { id: 'fl2', name: 'ABC Vitamins Layer', category: 'juices-cocktails', price: 250, badge: 'Healthy', description: 'Layered apple, beetroot & carrot juice' },
  { id: 'fl3', name: 'Active Layer', category: 'juices-cocktails', price: 250, description: 'Layered ginger, pineapple & carrot juice', image: '/Mixed-juices.jpg' },
  { id: 'fl4', name: 'Organic Layer', category: 'juices-cocktails', price: 250, description: 'Layered carrot & orange juice' },
  { id: 'fl5', name: 'Fruit Loop Layer', category: 'juices-cocktails', price: 250, description: 'Layered banana, mango & strawberry juice', image: '/Mixed-Fruits.jpg' },

  // SMOOTHIES
  { id: 'sm1', name: 'Oreo Smoothie', category: 'juices-cocktails', price: 350, badge: 'Popular', description: 'Creamy Oreo cookie blended smoothie', image: '/Chocolate-Smoothie.jpg' },
  { id: 'sm2', name: 'Coconut Smoothie', category: 'juices-cocktails', price: 350, description: 'Tropical coconut blended smoothie', image: '/Mocca-Smoothie.jpg' },
  { id: 'sm3', name: 'Avocado Smoothie', category: 'juices-cocktails', price: 250, description: 'Creamy fresh avocado smoothie' },
  { id: 'sm4', name: 'Peanut Butter Smoothie', category: 'juices-cocktails', price: 350, description: 'Rich peanut butter blended smoothie' },
  { id: 'sm5', name: 'Blueberry Smoothie', category: 'juices-cocktails', price: 400, description: 'Fresh blueberry blended smoothie' },

  // ==========================================
  // BEVERAGES & COFFEE
  // ==========================================
  { id: 'hb1', name: 'White Coffee', category: 'hot-cold-drinks', price: 200, description: 'Fresh Nakuru roast coffee with steamed whole milk' },
  { id: 'hb2', name: 'Black Coffee', category: 'hot-cold-drinks', price: 200, description: 'Freshly brewed aromatic dark roast coffee' },
  { id: 'hb3', name: 'White Chocolate Hot Drink', category: 'hot-cold-drinks', price: 200, description: 'Velvety melted white chocolate with hot milk' },
  { id: 'hb4', name: 'Instant Baristo Tea', category: 'hot-cold-drinks', price: 200, description: 'Rich barista style spiced milk tea' },
  { id: 'hb5', name: 'Mixed Tea Brew Cup', category: 'hot-cold-drinks', price: 70, description: 'Traditional Kenyan brewed milk tea cup' },
  { id: 'hb6', name: 'Masala Tea Brew', category: 'hot-cold-drinks', price: 100, description: 'Milk tea infused with cardamon, ginger, cloves and cinnamon' },
  { id: 'hb7', name: 'Dawa Special Brew', category: 'hot-cold-drinks', price: 200, badge: 'Popular', description: 'Hot lemon, natural ginger, garlic & pure honey immunity elixir' },
  { id: 'hb8', name: 'Black Tea', category: 'hot-cold-drinks', price: 60, description: 'Steeped Kenyan tea leaves cup' },
  { id: 'hb9', name: 'Lemon Tea', category: 'hot-cold-drinks', price: 70, description: 'Hot black tea infused with fresh lemon juice' },
  { id: 'hb10', name: 'Hot Lemon Water', category: 'hot-cold-drinks', price: 30, description: 'Pure hot water with freshly squeezed lemon' },
  { id: 'hb11', name: 'Milo White', category: 'hot-cold-drinks', price: 100, description: 'Hot malted chocolate drink with whole milk' },
  { id: 'hb12', name: 'Mixed Tea (Heavy Brew)', category: 'hot-cold-drinks', price: 100, description: 'Concentrated full-cream brewed tea' },

  // COLD DRINKS
  { id: 'cd1', name: 'Soda 300ml', category: 'hot-cold-drinks', price: 60, description: 'Cold Coca-Cola, Fanta or Sprite' },
  { id: 'cd2', name: 'Soda 500ml', category: 'hot-cold-drinks', price: 80, description: 'Chilled 500ml soda' },
  { id: 'cd3', name: 'Dasani Water 500ml', category: 'hot-cold-drinks', price: 50, description: 'Chilled 500ml bottled water' },
  { id: 'cd4', name: 'Dasani Water 1L', category: 'hot-cold-drinks', price: 90, description: '1 Liter bottled water' },
  { id: 'cd5', name: 'Monster Energy Drink', category: 'hot-cold-drinks', price: 250, description: '500ml Monster energy can' },
  { id: 'cd6', name: 'PET Soda 500ml', category: 'hot-cold-drinks', price: 80, description: 'Takeaway plastic bottle soda' },
  { id: 'cd7', name: 'Iced Tea', category: 'hot-cold-drinks', price: 150, description: 'House brewed chilled black tea' },
  { id: 'cd8', name: 'Iced Coffee', category: 'hot-cold-drinks', price: 200, description: 'Double espresso over ice with milk', image: '/Black-Coffee.jpg' },
  { id: 'cd9', name: 'Frapochino', category: 'hot-cold-drinks', price: 300, badge: 'Popular', description: 'Blended iced coffee topped with cream', image: '/White-Coffee.jpg' },
  { id: 'cd10', name: 'Delmonte Fruit Juice', category: 'hot-cold-drinks', price: 350, description: 'Tropical fruit juice box', image: '/Mixed-Fruit-Cocktail.jpg' },
  { id: 'cd11', name: 'Red Bull Energy Drink', category: 'hot-cold-drinks', price: 250, description: 'Chilled Red Bull can' },

  // ==========================================
  // NAKURU BREAKFAST
  // ==========================================
  { id: 'br1', name: 'French Toast Special (Sausage/Eggs/Toast)', category: 'breakfast', price: 250, badge: 'Popular', description: 'Golden French toast served with beef sausage and eggs' },
  { id: 'br2', name: 'Eggs Omelette', category: 'breakfast', price: 150, description: 'Double egg omelette with onions, tomatoes and green pepper' },
  { id: 'br3', name: 'Triple Eggs Omelette', category: 'breakfast', price: 200, description: 'Hearty 3-egg omelette loaded with herbs', image: '/Nduma-Egg-omellete.jpg' },
  { id: 'br4', name: 'Boiled Eggs', category: 'breakfast', price: 80, description: 'Hard or soft boiled eggs with kachumbari' },
  { id: 'br5', name: 'Beef Sausage', category: 'breakfast', price: 60, description: 'Sizzling fried beef sausages' },
  { id: 'br6', name: 'Double Fried Eggs', category: 'breakfast', price: 80, description: 'Two sunny-side or fried eggs' },
  { id: 'br7', name: 'Nduma (Arrowroots)', category: 'breakfast', price: 200, badge: 'Healthy', description: 'Boiled indigenous Nakuru arrowroot roots', image: '/Fried-Banana.jpg' },
  { id: 'br8', name: 'Ngwaci (Sweet Potatoes)', category: 'breakfast', price: 80, badge: 'Healthy', description: 'Naturally sweet steamed orange & white sweet potatoes', image: '/Sweet-potatoes&-Fried-Eggs.jpg' },
  { id: 'br9', name: 'Cassava', category: 'breakfast', price: 100, description: 'Soft boiled cassava served with chili butter' },
  { id: 'br10', name: 'Sweet Waffles', category: 'breakfast', price: 200, description: 'Golden crispy waffles served with syrup', image: '/Chocolate-Wiffle.jpg' },
  { id: 'br11', name: 'Samosa', category: 'breakfast', price: 80, description: 'Crispy fried pastry triangle with spiced filling' },
  { id: 'br12', name: 'Vegetarian Waffles', category: 'breakfast', price: 250, description: 'Savory waffles with sautéed spinach and tomatoes', image: '/Vegetable-wiffle.jpg' },
  { id: 'br13', name: 'Pancakes', category: 'breakfast', price: 120, description: 'Stack of sweet buttermilk pancakes' },
  { id: 'br14', name: 'Mixed Wedges (Potatoes/Nduma)', category: 'breakfast', price: 250, description: 'Fried potato and arrowroot wedges' },
  { id: 'br15', name: 'Chapati', category: 'breakfast', price: 50, description: 'Traditional flaky Kenyan layered chapati' },
  { id: 'br16', name: 'Sandwich Vegetables', category: 'breakfast', price: 100, description: 'Toasted bread filled with cucumber, tomatoes and lettuce', image: '/breakfast.jpeg' },
  { id: 'br17', name: 'Smocha (Chapati/Smokie)', category: 'breakfast', price: 150, badge: 'Popular', description: 'Warm chapati wrapped around a smokie sausage with kachumbari' },

  // ==========================================
  // CHEF MAINS & STEWS
  // ==========================================
  { id: 'm1_1', name: 'Ugali Greens (Managu/Spinach)', category: 'mains-meals', price: 200, description: 'Traditional ugali served with sautéed indigenous greens' },
  { id: 'm1_2', name: 'Ugali Beef Stew', category: 'mains-meals', price: 300, badge: 'Popular', description: 'Tender beef chunks in rich tomato gravy with white ugali' },
  { id: 'm1_3', name: 'Ugali Chicken Stew', category: 'mains-meals', price: 400, description: 'Slow cooked farm chicken in spiced curry gravy with ugali' },
  { id: 'm1_4', name: 'Ugali Fried Double Egg', category: 'mains-meals', price: 250, description: 'Pan fried eggs served with hot ugali and kachumbari', image: '/Ugali-Beef-Scrambled-eggs-dry-fry.jpg' },
  { id: 'm1_5', name: 'Brown Ugali & Greens', category: 'mains-meals', price: 200, badge: 'Low Carb', description: 'Wholesome millet/sorghum ugali with sautéed greens' },
  { id: 'm1_6', name: 'Chicken 1/4 & Chips', category: 'mains-meals', price: 550, description: 'Quarter chicken served with golden fries', image: '/Quarter-Chicken.jpg' },
  { id: 'm1_7', name: 'Rice Beef Stew', category: 'mains-meals', price: 300, description: 'Steamed pishori rice served with savory beef stew', image: '/Rice-Beef-Salad.jpg' },
  { id: 'm1_8', name: 'Rice Chicken Stew', category: 'mains-meals', price: 400, description: 'Steamed pishori rice served with savory chicken stew' },
  { id: 'm1_9', name: 'Sautee Potatoes with Beef', category: 'mains-meals', price: 400, description: 'Crispy cubed potatoes sautéed with spicy beef strip gravy' },
  { id: 'm1_10', name: 'Chapati Beef Greens', category: 'mains-meals', price: 250, description: 'Layered chapatis with beef stew and managu' },
  { id: 'm1_11', name: 'Rice & Vegetable Stew (Minji)', category: 'mains-meals', price: 250, description: 'Steamed rice served with green peas vegetable stew' },
  { id: 'm1_12', name: 'Pilau Plain', category: 'mains-meals', price: 300, description: 'Fragrant Swahili spiced rice served with kachumbari', image: '/Pilau-Plain.jpg' },
  { id: 'm1_13', name: 'Kienyeji Kuku', category: 'mains-meals', price: 550, badge: 'Chef Special', description: 'Authentic free-range local chicken stew' },
  { id: 'm2_1', name: 'Keema (Minced Beef with Minji & Chapati)', category: 'mains-meals', price: 300, badge: 'Popular', description: 'Spiced minced beef cooked with green peas served with chapati' },
  { id: 'm2_2', name: 'Chicken Tikka Masala', category: 'mains-meals', price: 500, description: 'Roasted chicken tikka in thick aromatic cream tomato masala' },
  { id: 'm2_3', name: 'Beef Chilli Stirfry with Ugali', category: 'mains-meals', price: 350, description: 'Sizzling beef strip stir fry with bell peppers and hot ugali' },
  { id: 'm2_4', name: 'Egg Biryani', category: 'mains-meals', price: 300, description: 'Basmati rice layered with spiced boiled eggs and biryani sauce' },
  { id: 'm2_5', name: 'Chicken Biryani', category: 'mains-meals', price: 500, badge: 'Popular', description: 'Aromatic basmati rice cooked with marinated chicken and Swahili spices', image: '/Chicken-Biriani.jpg' },
  { id: 'm2_6', name: 'Vegetable Biryani', category: 'mains-meals', price: 250, description: 'Saffron rice with garden vegetables and biryani masala', image: '/Vegrtable-Biriani.jpg' },
  { id: 'm2_7', name: 'Mutton Biryani', category: 'mains-meals', price: 450, description: 'Tender goat mutton cooked in authentic biryani gravy', image: '/Egg-Biriani.jpg' },
  { id: 'm2_8', name: 'Ugali Omena', category: 'mains-meals', price: 400, description: 'Crispy fried Lake Victoria silver cyprinid in tomato garlic stew with ugali' },
  { id: 'm2_9', name: 'Ugali Maini (Liver)', category: 'mains-meals', price: 400, badge: 'Chef Special', description: 'Tender beef liver sautéed with caramelized onions served with ugali', image: '/Ugali-Maini-Greens.jpg' },
  { id: 'm2_10', name: 'Pilau Beef', category: 'mains-meals', price: 350, badge: 'Popular', description: 'Rich Swahili spiced beef rice served with kachumbari' },
  { id: 'm2_11', name: 'Pilau Kuku', category: 'mains-meals', price: 400, description: 'Spiced pilau rice cooked with tender chicken pieces' },
  { id: 'm2_12', name: 'Chicken Fried Rice', category: 'mains-meals', price: 350, description: 'Wok tossed rice with shredded chicken, veggies and soy' },
  { id: 'm2_13', name: 'Fried Rice Beef', category: 'mains-meals', price: 400, description: 'Savory fried rice with beef cubes and spring onions', image: '/Pilau-Beef.jpg' },
  { id: 'm2_14', name: 'Chips Masala Beef', category: 'mains-meals', price: 350, description: 'Spicy masala chips topped with tender beef gravy' },
  { id: 'm2_15', name: 'Cassava Beef', category: 'mains-meals', price: 450, description: 'Boiled cassava tossed in rich beef stew', image: '/Cassava-Fried-Beef.jpg' },
  { id: 'm2_16', name: 'Cassava Greens', category: 'mains-meals', price: 200, description: 'Steamed cassava with managu & spinach' },

  // ==========================================
  // SNACKS & BURGERS
  // ==========================================
  { id: 's1', name: 'Samosa Special', category: 'light-snacks', price: 250, description: 'Golden beef samosas served with kachumbari', image: '/Beef-Samosa.jpg' },
  { id: 's2', name: 'Sausage Special', category: 'light-snacks', price: 250, description: 'Fried beef sausages special' },
  { id: 's3', name: 'Chicken Wings Special', category: 'light-snacks', price: 300, badge: 'Popular', description: 'Sticky BBQ or spicy buffalo chicken wings', image: '/Chips-masala-Sausage.jpg' },
  { id: 's4', name: 'Fried Eggs Special', category: 'light-snacks', price: 250, description: 'Fried eggs served special style' },
  { id: 's5', name: 'Beef Burger & Chips', category: 'light-snacks', price: 480, badge: 'Popular', description: 'Handcrafted beef patty, cheddar, lettuce, tomato & house sauce with golden chips', image: '/Burger&-Chips-(2).jpg' },
  { id: 's6', name: 'Chips Masala', category: 'light-snacks', price: 300, description: 'French fries tossed in tomato chili masala garlic sauce' },
  { id: 's7', name: 'Chips', category: 'light-snacks', price: 200, description: 'Crispy golden potato fries' },
  { id: 's8', name: 'Smokie Special', category: 'light-snacks', price: 250, description: 'Smokies with kachumbari', image: '/Smokie-Special.jpg' },
  { id: 's9', name: 'Chips Kubwa (Large Chips)', category: 'light-snacks', price: 300, description: 'Extra large portion of French fries', image: '/Chips-Masala.jpg' },
  { id: 's10', name: 'Home Fries', category: 'light-snacks', price: 300, description: 'Hand cut seasoned potato wedges pan fried with herbs', image: '/Potato-Weges-Beef.jpg' },
  { id: 's11', name: 'Chapati Roll', category: 'light-snacks', price: 150, description: 'Flaky chapati wrapped with seasoned scrambled eggs' },
  { id: 's12', name: 'Mixed Grill Skewers (Mshikaki, 1pc)', category: 'light-snacks', price: 150, badge: 'Chef Special', description: 'Marinated grilled beef and chicken skewer with pepper sauce', image: '/Mixed-Grill-Skewers.jpg' },

  // ==========================================
  // KIENYEJI SPECIALS
  // ==========================================
  { id: 'k1', name: 'Githeri Special', category: 'kienyeji-traditional', price: 280, description: 'Traditional corn and beans stew' },
  { id: 'k2', name: 'Mukimo Maize Beef', category: 'kienyeji-traditional', price: 350, badge: 'Popular', description: 'Traditional mashed potatoes, maize, pumpkin leaves served with beef stew' },
  { id: 'k3', name: 'Mukimo Minji Beef', category: 'kienyeji-traditional', price: 350, description: 'Mukimo served with green peas and beef stew', image: '/Mukimo-Beef.jpg' },
  { id: 'k4', name: 'Matoke Stew Beef', category: 'kienyeji-traditional', price: 350, description: 'Green plantain banana stew slow cooked with tender beef' },
  { id: 'k5', name: 'Mashed Potatoes Beef', category: 'kienyeji-traditional', price: 350, description: 'Creamy potato mash served with beef stew' },
  { id: 'k6', name: 'Mashed Potatoes Kuku', category: 'kienyeji-traditional', price: 500, description: 'Creamy mash served with chicken stew' },
  { id: 'k7', name: 'Mashed Matoke Kuku', category: 'kienyeji-traditional', price: 550, description: 'Steamed mashed plantain bananas served with chicken gravy', image: '/Matoke-Beef.jpg' },
  { id: 'k8', name: 'Beans Stew Rice/Chapati', category: 'kienyeji-traditional', price: 200, description: 'Bean stew served with rice or chapati' },
  { id: 'k9', name: 'Ndengu Stew Rice/Chapati', category: 'kienyeji-traditional', price: 200, description: 'Green grams lentil stew served with rice or chapati' },
  { id: 'k10', name: 'Njahi Stew Rice/Chapati', category: 'kienyeji-traditional', price: 250, badge: 'Healthy', description: 'Nutritious black turtle bean stew served with rice or chapati', image: '/Njahi-Chapati-Cabbage.jpg' },
  { id: 'k11', name: 'Uji Wimbi (Half)', category: 'kienyeji-traditional', price: 100, description: 'Nutritious fermented finger millet porridge' },
  { id: 'k12', name: 'Uji Power (Cassava)', category: 'kienyeji-traditional', price: 100, badge: 'Popular', description: 'Energy packed cassava traditional drink' },
  { id: 'k13', name: 'Ugali Samaki Greens', category: 'kienyeji-traditional', price: 350, description: 'Deep fried Tilapia fish served with hot ugali and managu' },
  { id: 'k14', name: 'Nduma Greens', category: 'kienyeji-traditional', price: 250, description: 'Steamed arrowroots with sautéed traditional spinach', image: '/Nduma-Fried-Greens-Beef.jpg' },
  { id: 'k15', name: 'Githeri Greens', category: 'kienyeji-traditional', price: 200, description: 'Corn and bean stew cooked with fresh greens', image: '/Githeri-Greens.jpg' },

  // ==========================================
  // BARBECUE PLATTERS
  // ==========================================
  { id: 'bbq1', name: 'Barbecue Platter #1 (Serves 2)', category: 'bbq-platters', price: 1500, badge: 'Chef Special', description: 'Mbuzi Choma, Kuku Choma, Sausage, Chips, Wedges, Ugali, Chapati, Salad & Sauce' },
  { id: 'bbq2', name: 'Barbecue Grand Feast #2 (Serves 2)', category: 'bbq-platters', price: 2000, badge: 'Popular', description: 'Mbuzi Choma, Kuku Choma, Pilau, Wedges, Sausages, Chips Masala, Fried Cassava, Greens & Sauce', image: '/Choma-Platter.jpg' },

  // ==========================================
  // SANDWICHES & WRAPS
  // ==========================================
  { id: 'wr1', name: 'Eggs Chapati Wrap', category: 'sandwiches-wraps', price: 150, description: 'Soft chapati rolled with spiced herb omelette' },
  { id: 'wr2', name: 'Hot Dog Chapati Wrap', category: 'sandwiches-wraps', price: 200, description: 'Smokie sausage rolled with chapati & mustard kachumbari' },
  { id: 'wr3', name: 'Veges Chapati Wrap', category: 'sandwiches-wraps', price: 200, description: 'Sautéed vegetable wrap' },
  { id: 'wr4', name: 'Keema Chapati Wrap', category: 'sandwiches-wraps', price: 300, description: 'Juicy spiced minced beef rolled in warm layered chapati', image: '/Chapati.jpg' },
  { id: 'wr5', name: 'Mixed-Grill Chicken Wrap', category: 'sandwiches-wraps', price: 350, badge: 'Popular', description: 'Grilled chicken strips, peppers and garlic mayo in chapati', image: '/Chapati-Chicken-Wrap.jpg' },
  { id: 'sw1', name: 'Beef Sandwich', category: 'sandwiches-wraps', price: 250, description: 'Toasted bread loaded with sliced roast beef & mayo' },
  { id: 'sw2', name: 'Chicken Sandwich', category: 'sandwiches-wraps', price: 300, badge: 'Popular', description: 'Shredded chicken breast with creamy mayo and lettuce' },
  { id: 'sw3', name: 'Ham Sandwich', category: 'sandwiches-wraps', price: 300, description: 'Classic ham slice sandwich' },
  { id: 'sw4', name: 'Cheese Sandwich', category: 'sandwiches-wraps', price: 300, description: 'Melted cheddar and mozzarella toastie', image: '/Cheese-Sandwitch.jpg' },
  { id: 'sw5', name: 'Tuna Sandwich', category: 'sandwiches-wraps', price: 400, description: 'Flaked tuna, capers, sweetcorn & light mayonnaise' },
  { id: 'sw6', name: 'Hot Dog', category: 'sandwiches-wraps', price: 300, description: 'Jumbo beef sausage in long bun with caramelized onions', image: '/Hotdog.jpg' },
  { id: 'sw7', name: 'Kebab', category: 'sandwiches-wraps', price: 100, description: 'Minced beef kebab patty with tomato' },
  { id: 'sw8', name: 'Egg Toast Sandwich', category: 'sandwiches-wraps', price: 300, description: 'Fried egg, beef slice and tomato on thick toasted bread' },

  // ==========================================
  // ITALIAN PIZZA & PASTAS
  // ==========================================
  { id: 'pas1', name: 'Spaghetti Bolognese', category: 'pizza-pasta', price: 350, description: 'Al dente spaghetti in slow simmered Italian minced beef tomato sauce' },
  { id: 'pas2', name: 'Penne Pasta', category: 'pizza-pasta', price: 400, description: 'Penne tubes tossed in garlic tomato basil sauce', image: '/Penne-Pasta.jpg' },
  { id: 'pas3', name: 'Penne Pasta / Beef Stroganoff', category: 'pizza-pasta', price: 500, badge: 'Popular', description: 'Creamy mushroom and beef strip sauce served over penne' },
  { id: 'pas4', name: 'Noodles', category: 'pizza-pasta', price: 150, description: 'Pan fried egg noodles with soy & spring onion' },
  {
    id: 'p1', name: 'Margarita Pizza', category: 'pizza-pasta', price: 1000, image: '/Pizza-Margarita.jpg',
    description: 'Classic pizza with fresh tomato sauce, mozzarella cheese & oregano',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p2', name: 'Chicken Tikka Pizza', category: 'pizza-pasta', price: 1100, badge: 'Popular',
    description: 'Marinated tikka chicken strips and mozzarella',
    options: [{ name: 'Medium', price: 1100 }, { name: 'Large', price: 1450 }]
  },
  {
    id: 'p3', name: 'Vegetable Pizza', category: 'pizza-pasta', price: 1000,
    description: 'Capsicum, onion and mozzarella',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p4', name: 'Chicken Hawaii Pizza', category: 'pizza-pasta', price: 1100,
    description: 'Tender chicken pieces, sweet pineapple chunks and melted cheese',
    options: [{ name: 'Medium', price: 1100 }, { name: 'Large', price: 1450 }]
  },
  {
    id: 'p5', name: 'Fiorentina Pizza', category: 'pizza-pasta', price: 1000, image: '/Vegetable-Pizza.jpg',
    description: 'Fresh spinach, black pepper and creamy mozzarella',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p6', name: 'Spicy Arezzo Pizza', category: 'pizza-pasta', price: 1000,
    description: 'Spiced minced beef pizza',
    options: [{ name: 'Medium', price: 1000 }, { name: 'Large', price: 1250 }]
  },
  {
    id: 'p7', name: 'Mix Barbeque Pizza', category: 'pizza-pasta', price: 1100, badge: 'Popular', image: '/Chicken-Hawaii-Pizza.jpg',
    description: 'Loaded with BBQ beef and chicken',
    options: [{ name: 'Medium', price: 1100 }, { name: 'Large', price: 1450 }]
  },
  {
    id: 'p8', name: 'Garlic Bread with Cheese', category: 'pizza-pasta', price: 200,
    description: 'Freshly baked pizza dough with herb garlic butter & mozzarella',
    options: [{ name: 'Medium', price: 200 }, { name: 'Large', price: 350 }]
  },

  // ==========================================
  // SOUPS & SALADS
  // ==========================================
  { id: 'sl1', name: 'Garden Salad', category: 'soups-salads', price: 250, description: 'Crisp lettuce, cucumber, tomatoes, bell peppers with vinaigrette' },
  { id: 'sl2', name: 'Chicken Salad', category: 'soups-salads', price: 400, badge: 'Popular', description: 'Grilled chicken strips over fresh garden greens' },
  { id: 'sl3', name: 'Tomato/Onion Salad (Kachumbari)', category: 'soups-salads', price: 200, description: 'Freshly chopped Kenyan tomatoes, red onions, lemon juice & chili' },
  { id: 'sp1', name: 'Garden Soup (Vegetable)', category: 'soups-salads', price: 200, description: 'Clear fresh vegetable broth with celery and herbs' },
  { id: 'sp2', name: 'Chicken Soup', category: 'soups-salads', price: 300, badge: 'Popular', description: 'Warm chicken broth with tender chicken shredding' },
  { id: 'sp3', name: 'Beef Broth', category: 'soups-salads', price: 250, description: 'Slow simmered beef bone broth' },
  { id: 'sp4', name: 'Mushroom Soup', category: 'soups-salads', price: 400, description: 'Rich creamy button mushroom soup', image: '/Chicken-Salad.jpg' },
  { id: 'sp5', name: 'Bone Soup', category: 'soups-salads', price: 100, badge: 'Popular', description: 'Traditional piping hot beef bone soup broth' }
];
