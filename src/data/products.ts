export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  rating: number;
  ratingCount: number;
  stock: number;
  isNew: boolean;
  description: string;
  specs: Record<string, string>;
}

export const CATEGORIES = [
  "Electronics",
  "Mobiles",
  "Fashion",
  "Shoes",
  "Home Appliances",
  "Fans",
  "Stickers",
  "Grocery",
  "Accessories",
];

export const SUBCATEGORIES = [
  { label: "Smartphones", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80" },
  { label: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" },
  { label: "Earphones", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80" },
  { label: "Smart Watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { label: "T-Shirts", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { label: "Shirts", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80" },
  { label: "Jeans", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80" },
  { label: "Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { label: "Ceiling Fans", img: "https://images.unsplash.com/photo-1565374395542-0ce18882c857?w=400&q=80" },
  { label: "Table Fans", img: "https://images.unsplash.com/photo-1620713498433-3c0a3a8f0c0a?w=400&q=80" },
  { label: "Water Bottles", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80" },
  { label: "Wall Stickers", img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&q=80" },
  { label: "LED Bulbs", img: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&q=80" },
  { label: "Kitchen Items", img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80" },
];

const img = (id: string, q = 80) => `https://images.unsplash.com/photo-${id}?w=600&q=${q}`;

function make(
  id: string,
  name: string,
  brand: string,
  category: string,
  subcategory: string,
  price: number,
  originalPrice: number,
  photos: string[],
  rating: number,
  ratingCount: number,
  description: string,
  specs: Record<string, string>,
  opts: { stock?: number; isNew?: boolean } = {},
): Product {
  return {
    id,
    name,
    brand,
    category,
    subcategory,
    price,
    originalPrice,
    image: photos[0],
    images: photos,
    rating,
    ratingCount,
    stock: opts.stock ?? 25,
    isNew: opts.isNew ?? false,
    description,
    specs,
  };
}

export const products: Product[] = [
  // Electronics
  make("p1", "Wireless Bluetooth Earbuds", "SoundMax", "Electronics", "Earphones", 799, 1999, [img("1590658268037-6bf12165a8df"), img("1606220588913-b3aacb4d2f46"), img("1572569511254-d8f925fe2cbb")], 4.3, 12450, "True wireless earbuds with deep bass, 30-hour playback and touch controls.", { Connectivity: "Bluetooth 5.3", Battery: "30 hrs total", "Water Resistant": "IPX5", Warranty: "1 Year" }, { isNew: true }),
  make("p2", "Smart Watch with Heart Rate", "FitPulse", "Electronics", "Smart Watches", 1299, 3999, [img("1523275335684-37898b6baf30"), img("1579586337278-3befd40fd17a"), img("1508685096489-7aacd43bd3b1")], 4.2, 8930, "1.85 inch HD display smartwatch with SpO2, heart rate and 100+ sport modes.", { Display: "1.85 inch HD", Battery: "7 days", Sensors: "Heart rate, SpO2", Warranty: "1 Year" }),
  make("p3", "Portable Bluetooth Speaker", "BoomBox", "Electronics", "Earphones", 699, 1499, [img("1608043152269-423dbba4e7e1"), img("1545454675-3531b543be5d")], 4.1, 5640, "Compact wireless speaker with punchy bass and 12-hour battery life.", { Output: "10W", Battery: "12 hrs", "Water Resistant": "IPX6", Warranty: "6 Months" }),
  make("p4", "LED Bulb Pack of 4", "BrightLite", "Electronics", "LED Bulbs", 349, 799, [img("1550985616-10810253b84d"), img("1556139902-7367723b433e")], 4.4, 21030, "Energy-efficient 9W LED bulbs, cool daylight, pack of 4.", { Power: "9W", Color: "Cool Daylight", Life: "25000 hrs", Warranty: "1 Year" }),
  make("p5", "Power Bank 10000mAh", "ChargeUp", "Electronics", "Accessories", 999, 1799, [img("1609091839311-d5365f9ff1c5"), img("1583863788434-e58a36330cf0")], 4.3, 16780, "Slim 10000mAh power bank with dual USB output and fast charging.", { Capacity: "10000mAh", Output: "18W", Ports: "2 USB", Warranty: "1 Year" }),
  make("p6", "USB Charging Cable", "LinkPro", "Electronics", "Accessories", 199, 499, [img("1583394838336-acd977736f90"), img("1606220588913-b3aacb4d2f46")], 4.0, 9870, "Durable braided fast-charging USB-C cable, 1.5m length.", { Length: "1.5m", Type: "USB-C", Material: "Braided Nylon", Warranty: "6 Months" }),
  make("p7", "Laptop Backpack", "TrekGear", "Electronics", "Accessories", 899, 1999, [img("1553062407-98eeb64c6a62"), img("1581605405669-fcdf81165afa")], 4.5, 13420, "Water-resistant 30L laptop backpack with USB charging port.", { Capacity: "30L", Fits: "Up to 15.6 inch", Material: "Polyester", Warranty: "1 Year" }),
  make("p8", "Laptop 14 inch Core i5", "NovaBook", "Electronics", "Laptops", 38999, 49999, [img("1496181133206-80ce9b88a853"), img("1517336714731-489689fd1ca8")], 4.4, 3210, "Thin and light laptop with Core i5, 8GB RAM, 512GB SSD.", { Processor: "Core i5", RAM: "8GB", Storage: "512GB SSD", Warranty: "1 Year" }, { isNew: true }),

  // Mobiles
  make("p9", "Budget Android Smartphone", "Zenix", "Mobiles", "Smartphones", 8999, 12999, [img("1511707171634-5f897ff02aa9"), img("1598327105666-5b89351aff97"), img("1592899677977-9c10ca588bbd")], 4.2, 28760, "6.5 inch display smartphone with 5000mAh battery and 50MP camera.", { Display: "6.5 inch", Battery: "5000mAh", Camera: "50MP", RAM: "6GB" }, { isNew: true }),
  make("p10", "Mobile Back Cover", "GuardX", "Mobiles", "Accessories", 249, 599, [img("1601784551446-20c9e07cdbdb"), img("1556656793-08538906a9f8")], 4.0, 7650, "Shockproof transparent mobile back cover with raised edges.", { Material: "TPU", Type: "Transparent", Compatibility: "Universal", Warranty: "NA" }),
  make("p11", "Tempered Glass Pack", "ShieldPro", "Mobiles", "Accessories", 199, 499, [img("1592890288564-76628a30a657"), img("1574944985070-8f3ebc6b79d2")], 4.1, 11230, "9H tempered glass screen protector, pack of 2, bubble-free.", { Hardness: "9H", Pack: "2 pcs", Finish: "Clear", Warranty: "NA" }),
  make("p12", "Fast Charger 33W", "VoltEdge", "Mobiles", "Accessories", 499, 999, [img("1583863788434-e58a36330cf0"), img("1609091839311-d5365f9ff1c5")], 4.3, 9120, "33W fast wall charger with Type-C cable included.", { Output: "33W", Type: "Type-C", Cable: "Included", Warranty: "1 Year" }),

  // Fashion
  make("p13", "Men's Cotton T-Shirt", "UrbanThread", "Fashion", "T-Shirts", 399, 999, [img("1521572163474-6864f9cf17ab"), img("1576566588028-4147f3842f27")], 4.2, 18900, "100% cotton round neck regular fit t-shirt for everyday wear.", { Fabric: "100% Cotton", Fit: "Regular", Neck: "Round", Care: "Machine Wash" }),
  make("p14", "Men's Casual Shirt", "UrbanThread", "Fashion", "Shirts", 699, 1599, [img("1602810318383-e386cc2a3ccf"), img("1620012253295-c15cc3e65df4")], 4.3, 9540, "Slim-fit cotton casual shirt with full sleeves.", { Fabric: "Cotton Blend", Fit: "Slim", Sleeve: "Full", Care: "Machine Wash" }),
  make("p15", "Men's Slim Fit Jeans", "DenimCo", "Fashion", "Jeans", 999, 2499, [img("1542272604-787c3835535d"), img("1541099649105-f69ad21f3246")], 4.1, 7430, "Stretchable slim-fit denim jeans with mid-rise waist.", { Fabric: "Stretch Denim", Fit: "Slim", Rise: "Mid", Care: "Machine Wash" }),
  make("p16", "Women's Printed Kurti", "EthnicBliss", "Fashion", "T-Shirts", 799, 1999, [img("1583391733956-6c78276477e2"), img("1596783074918-c84cb06531ca")], 4.4, 12330, "A-line printed rayon kurti with three-quarter sleeves.", { Fabric: "Rayon", Pattern: "Printed", Length: "Knee", Care: "Hand Wash" }, { isNew: true }),
  make("p17", "Women's Handbag", "Bella", "Fashion", "Accessories", 899, 2299, [img("1584917865442-de89df76afd3"), img("1591561954557-26941169b49e")], 4.2, 6890, "Stylish PU leather handbag with multiple compartments.", { Material: "PU Leather", Closure: "Zip", Compartments: "3", Warranty: "NA" }),
  make("p18", "Kids Graphic T-Shirt", "TinyTots", "Fashion", "T-Shirts", 299, 699, [img("1519238263530-99bdd11df2ea"), img("1503944168849-8bf86875bbd8")], 4.3, 5210, "Soft cotton graphic print t-shirt for kids.", { Fabric: "Cotton", Fit: "Regular", Age: "4-12 yrs", Care: "Machine Wash" }),
  make("p19", "Unisex Hoodie", "UrbanThread", "Fashion", "T-Shirts", 1199, 2999, [img("1556821840-3a63f95609a7"), img("1620799140408-edc6dcb6d633")], 4.5, 8770, "Fleece-lined pullover hoodie with kangaroo pocket.", { Fabric: "Cotton Fleece", Fit: "Regular", Hood: "Adjustable", Care: "Machine Wash" }, { isNew: true }),

  // Shoes
  make("p20", "Men's Running Shoes", "StrideX", "Shoes", "Shoes", 1299, 3499, [img("1542291026-7eec264c27ff"), img("1460353581641-37baddab0fa2")], 4.3, 15670, "Lightweight running shoes with cushioned sole and mesh upper.", { Sole: "EVA", Upper: "Mesh", Closure: "Lace-up", Warranty: "3 Months" }),
  make("p21", "Casual Sneakers", "StrideX", "Shoes", "Shoes", 1499, 3999, [img("1525966222134-fcfa99b8ae77"), img("1595950653106-6c9ebd614d3a")], 4.4, 11240, "Trendy casual sneakers for daily wear, comfortable fit.", { Sole: "Rubber", Upper: "Synthetic", Closure: "Lace-up", Warranty: "3 Months" }, { isNew: true }),
  make("p22", "Women's Fashion Sandals", "Bella", "Shoes", "Shoes", 699, 1799, [img("1543163521-1bf539c55dd2"), img("1603487742131-4160ec999306")], 4.1, 6320, "Comfortable flat sandals with cushioned footbed.", { Type: "Flats", Material: "Synthetic", Sole: "TPR", Warranty: "NA" }),
  make("p23", "Daily Wear Slippers", "ComfyStep", "Shoes", "Shoes", 299, 699, [img("1603487742131-4160ec999306"), img("1575537302964-96cd47c06b1b")], 4.0, 9450, "Soft anti-skid slippers for home and casual use.", { Material: "EVA", Sole: "Anti-skid", Type: "Slip-on", Warranty: "NA" }),

  // Home Appliances / Fans / Daily Use
  make("p24", "Ceiling Fan 1200mm", "AirFlow", "Fans", "Ceiling Fans", 1799, 2999, [img("1565374395542-0ce18882c857"), img("1558618666-fcd25c85cd64")], 4.3, 8910, "High-speed 1200mm ceiling fan with energy-efficient motor.", { Sweep: "1200mm", Speed: "380 RPM", Power: "70W", Warranty: "2 Years" }),
  make("p25", "High Speed Table Fan", "AirFlow", "Fans", "Table Fans", 1299, 2499, [img("1620713498433-3c0a3a8f0c0a"), img("1558618666-fcd25c85cd64")], 4.2, 5430, "400mm table fan with 3-speed control and wide oscillation.", { Sweep: "400mm", Speed: "1350 RPM", Power: "55W", Warranty: "1 Year" }),
  make("p26", "Extension Board 4 Socket", "VoltEdge", "Home Appliances", "Accessories", 499, 899, [img("1558002038-1055907df827"), img("1581092160562-40aa08e78837")], 4.1, 7210, "4-socket extension board with surge protection and 2m cord.", { Sockets: "4", Cord: "2m", Protection: "Surge", Warranty: "1 Year" }),
  make("p27", "Electric Kettle 1.5L", "BrewMate", "Home Appliances", "Kitchen Items", 899, 1799, [img("1556911220-bff31c812dba"), img("1594213114663-d94db9b17125")], 4.4, 13980, "1.5L stainless steel electric kettle with auto shut-off.", { Capacity: "1.5L", Power: "1500W", Body: "Stainless Steel", Warranty: "1 Year" }),
  make("p28", "Insulated Water Bottle", "HydroPlus", "Home Appliances", "Water Bottles", 299, 699, [img("1602143407151-7111542de6e8"), img("1523362628745-0c100150b504")], 4.3, 18650, "1L stainless steel water bottle, keeps drinks cold for 24 hrs.", { Capacity: "1L", Material: "Stainless Steel", Insulation: "Double Wall", Warranty: "6 Months" }),
  make("p29", "Lunch Box 3 Container", "FreshPack", "Home Appliances", "Kitchen Items", 399, 899, [img("1584990347449-a2d4c2c9b2da"), img("1546069901-ba9599a7e63c")], 4.2, 9340, "Leak-proof stainless steel lunch box with 3 containers and bag.", { Containers: "3", Material: "Steel", LeakProof: "Yes", Warranty: "NA" }),
  make("p30", "Cotton Double Bedsheet", "DreamRest", "Home Appliances", "Accessories", 699, 1799, [img("1522771739844-6a9f6d5f14af"), img("1556228578-8c89e6adf883")], 4.4, 14210, "Soft cotton double bedsheet with 2 pillow covers, floral print.", { Size: "Double", Fabric: "Cotton", Includes: "2 Pillow Covers", Care: "Machine Wash" }),
  make("p31", "Wall Sticker Set", "DecorArt", "Stickers", "Wall Stickers", 249, 599, [img("1513519245088-0e12902e35ca"), img("1493809842364-78817add7ffb")], 4.0, 4530, "Removable decorative wall sticker set for living room and bedroom.", { Type: "Removable", Coverage: "Large", Surface: "Smooth Walls", Warranty: "NA" }, { isNew: true }),
  make("p32", "Plastic Storage Box Set", "FreshPack", "Home Appliances", "Kitchen Items", 499, 999, [img("1594213114663-d94db9b17125"), img("1558997519-83ea9252edf8")], 4.2, 8120, "Stackable airtight storage boxes, set of 3 sizes.", { Set: "3 pcs", Airtight: "Yes", Material: "BPA-free Plastic", Warranty: "NA" }),
  make("p33", "Kitchen Knife Set", "ChefEdge", "Home Appliances", "Kitchen Items", 399, 999, [img("1593618998160-e34014e67546"), img("1567306226416-28f0efdc88ce")], 4.3, 6740, "Stainless steel 5-piece kitchen knife set with stand.", { Pieces: "5", Material: "Stainless Steel", Stand: "Included", Warranty: "6 Months" }),
  make("p34", "Spin Cleaning Mop", "CleanPro", "Home Appliances", "Accessories", 699, 1499, [img("1581578731548-c64695cc6952"), img("1563453392212-326f5e854473")], 4.1, 10320, "360-degree spin mop with bucket and microfiber refill.", { Type: "Spin Mop", Bucket: "Included", Refill: "Microfiber", Warranty: "NA" }),
  make("p35", "Atta Whole Wheat 5kg", "GrainHarvest", "Grocery", "Kitchen Items", 249, 320, [img("1574323347407-f5e1ad6d020b"), img("1509440159596-0249088772ff")], 4.5, 22340, "Chakki fresh whole wheat atta, 5kg pack, rich in fibre.", { Weight: "5kg", Type: "Whole Wheat", Source: "Chakki Fresh", Veg: "Yes" }),
  make("p36", "Mixed Dry Fruits 500g", "GrainHarvest", "Grocery", "Kitchen Items", 449, 799, [img("1606312619070-d48b4c652a52"), img("1599599810769-bcde5a160d32")], 4.4, 15670, "Premium assorted dry fruits and nuts, 500g resealable pack.", { Weight: "500g", Contents: "Almonds, Cashews, Raisins", Veg: "Yes", Shelf: "9 months" }),
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

export const discountPct = (p: Product) =>
  Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const relatedProducts = (p: Product, limit = 4) =>
  products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, limit);
