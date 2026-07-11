export type MenuItem = {
  code: string;
  name: string;
  zh: string;
  price: string;
  spicy?: boolean;
  veg?: boolean;
  note?: string;
};

export type MenuCategory = {
  letter: string;
  title: string;
  zh: string;
  subtitle?: string;
  items: MenuItem[];
  notes?: string[];
};

export const MENU: MenuCategory[] = [
  {
    letter: "A",
    title: "Signature Pot",
    zh: "招牌主鍋",
    subtitle: "Celery / Green Pepper / Scallion / Cilantro included",
    items: [
      { code: "A1", name: "TTOP Chicken Pot (S)", zh: "花雕雞鍋(小)", price: "38" },
      { code: "A2", name: "TTOP Chicken Pot (L)", zh: "花雕雞鍋(大)", price: "58" },
      { code: "A3", name: "TTOP Chicken Pot w/ Spicy XM Sauce (S)", zh: "香麻花雕雞鍋(小)", price: "40", spicy: true },
      { code: "A4", name: "TTOP Chicken Pot w/ Spicy XM Sauce (L)", zh: "香麻花雕雞鍋(大)", price: "60", spicy: true },
    ],
    notes: [
      "Pot options — Cook all add-ons together 煮配菜 · Reheat at home, add-ons packed separately 自行加熱 · Remove celery/green pepper/scallion/cilantro 走西芹/青椒/青蔥/香菜 — $0 · Add TTOP Sauce 加花雕雞神水 +$1.5 · Add Chili X/XX/XXX 加小米辣/中米辣/大米辣 +$1.5",
    ],
  },
  {
    letter: "A+",
    title: "Signature Pot Add-On Toppings",
    zh: "主鍋加料選項",
    items: [
      { code: "", name: "AAA Beef", zh: "AAA牛五花", price: "15" },
      { code: "", name: "Berkshire Pork Belly", zh: "黑豬五花", price: "15" },
      { code: "", name: "Premium Lamb Slices", zh: "羊肩肉", price: "16" },
      { code: "", name: "Mushroom Meatball", zh: "香菇貢丸", price: "8" },
      { code: "", name: "Luncheon Meat", zh: "午餐肉", price: "8" },
      { code: "", name: "Fish Dumpling", zh: "魚餃", price: "8" },
      { code: "", name: "Squid Dumpling", zh: "花枝餃", price: "8" },
      { code: "", name: "Fish Tofu", zh: "魚豆腐", price: "8" },
      { code: "", name: "Fish Cake", zh: "甜不辣", price: "8" },
      { code: "", name: "Lettuce Stem", zh: "萵筍", price: "7.5" },
      { code: "", name: "Broccoli", zh: "青花菜", price: "7" },
      { code: "", name: "Taiwanese Cabbage", zh: "高麗菜", price: "7" },
      { code: "", name: "Dried Bean Curd", zh: "腐竹", price: "7" },
      { code: "", name: "Cauliflower", zh: "白花菜", price: "7" },
      { code: "", name: "Konjac", zh: "蒟蒻絲", price: "7" },
      { code: "", name: "Udon", zh: "烏冬麵", price: "7" },
      { code: "", name: "Black Fungus", zh: "黑木耳", price: "7" },
      { code: "", name: "Potato Vermicelli", zh: "川粉", price: "7" },
      { code: "", name: "Enoki Mushroom", zh: "金針菇", price: "7" },
      { code: "", name: "Shimeji Mushroom", zh: "鴻禧菇", price: "7" },
      { code: "", name: "Quail Egg", zh: "鵪鶉蛋", price: "7" },
      { code: "", name: "King Oyster Mushroom", zh: "杏鮑菇", price: "7" },
      { code: "", name: "Oyster Mushroom", zh: "蠔菇", price: "7" },
      { code: "", name: "Frozen Tofu", zh: "凍豆腐", price: "7" },
      { code: "", name: "Baby Corn", zh: "玉米筍", price: "7" },
      { code: "", name: "Korean Rice Cake", zh: "韓式年糕", price: "7" },
      { code: "", name: "Celery", zh: "西芹", price: "6" },
      { code: "", name: "Green Pepper", zh: "青椒", price: "6" },
      { code: "", name: "Scallion", zh: "青蔥", price: "6" },
      { code: "", name: "Potato", zh: "土豆", price: "6" },
      { code: "", name: "DF Chinese Doughnut", zh: "油條", price: "5.5" },
      { code: "", name: "Cilantro", zh: "香菜", price: "1" },
    ],
  },
  {
    letter: "B",
    title: "Bento",
    zh: "便當",
    subtitle: "All bentos include rice",
    items: [
      { code: "B1", name: "TTOP Chicken Bento (includes celery/green pepper/scallion/cilantro)", zh: "花雕雞飯便當", price: "18.5" },
      { code: "B2", name: "TTOP Spicy Chicken Bento", zh: "香麻花雕雞飯便當", price: "19.5", spicy: true },
      { code: "B3", name: "DF Pork Chop Bento", zh: "炸排骨飯便當", price: "17" },
      { code: "B4", name: "DF Chicken Leg Bento", zh: "炸雞腿便當", price: "18.5" },
      { code: "B5", name: "DF Chicken Nugget Bento", zh: "鹽酥雞飯便當", price: "16.5" },
      { code: "B6", name: "DF Red Yeast Pork Belly Bento", zh: "紅糟肉飯便當", price: "17" },
      { code: "B7", name: "OG Stewed Pork Belly Bento", zh: "控肉飯便當", price: "16.5" },
      { code: "B8", name: "Marinated Pork Chop Bento", zh: "油排骨飯便當", price: "17.5" },
      { code: "B9", name: "Grilled Pork Tenderloin Bento", zh: "燒肉飯便當", price: "16.5" },
      { code: "B10", name: "Taiwanese Sausage Bento", zh: "台式香腸飯便當", price: "17.5" },
      { code: "B11", name: "LOBA Bento", zh: "滷肉飯便當", price: "14.75" },
      { code: "B12", name: "Shredded Chicken Bento", zh: "雞肉飯便當", price: "16.25" },
      { code: "B13", name: "Hibachi Berkshire Pork Bento (Black Peppercorn / Sukiyaki)", zh: "鐵板烤豬五花飯便當", price: "16.5" },
      { code: "B14", name: "Hibachi Beef Bento (Black Peppercorn / Sukiyaki)", zh: "鐵板烤牛五花飯便當", price: "17" },
      { code: "B15", name: "Basil Eggplant Stir-Fry Bento", zh: "塔香茄子便當", price: "17.5", veg: true },
      { code: "B16", name: "Vegetarian Chicken Roll Bento", zh: "素雞捲便當", price: "18.5", veg: true },
      { code: "B17", name: "Three Side Dishes Bento", zh: "菜飯便當", price: "9" },
    ],
    notes: [
      "B3–B17 include rice and 3 side dishes 均含米飯及三樣配菜.",
      "Chicken Bento options — Remove celery/green pepper/scallion/cilantro $0 · Add Chili X/XX/XXX +$1.5.",
      "Bento add-ons — AAA Beef $3.5 · Premium Lamb Slices $4 · Berkshire Pork Belly $3 · Lettuce Stem $2.5 · Mushroom Meatball / Taiwanese Cabbage / Fish Tofu / Quail Egg / Potato / Cauliflower / Konjac / Korean Rice Cake / Celery / Scallion / Frozen Tofu / Luncheon Meat / Black Fungus / Dried Bean Curd / Fish Cake / Broccoli / Baby Corn / King Oyster Mushroom / Green Pepper $2 each · Cilantro $1.",
      "Also add — Steamed Rice 100g $1.5 · LOBA Sauce $3 · Spicy Pickled Radish $1.5 · Grilled Pork Tenderloin (2 pcs) $5.5 · OG Stewed Pork Belly (1 pc) $4 · Taiwanese Sausage (1 link) $5.5 · Marinated Quail Egg (4 pcs) $2 · Pickled Mustard Green $1.5 · Garlic Slices $1.5 · Scallion Salt Sauce $1.5 · Black Peppercorn Sauce $2.5.",
    ],
  },
  {
    letter: "C",
    title: "Rice Bowls",
    zh: "丼飯",
    items: [
      { code: "C1", name: "LOBA Rice", zh: "古早味滷肉飯", price: "11" },
      { code: "C2", name: "Shredded Chicken Rice", zh: "手撕雞肉飯", price: "12.5" },
      { code: "C3", name: "Sausage Chicken Rice", zh: "香腸雞肉飯", price: "16.5" },
      { code: "C4", name: "Chicken LOBA Rice", zh: "手撕雞滷飯", price: "14.5" },
      { code: "C5", name: "Sausage LOBA Rice", zh: "香腸滷肉飯", price: "16.5" },
    ],
  },
  {
    letter: "D",
    title: "À La Carte",
    zh: "單品小吃",
    items: [
      { code: "D1", name: "DF Chicken Nugget", zh: "鹽酥雞", price: "11" },
      { code: "D2", name: "DF Fish Cake", zh: "炸甜不辣", price: "10" },
      { code: "D3", name: "DF Squid Ball", zh: "炸花枝丸", price: "6 / 10", note: "(4 pcs) / (8 pcs)" },
      { code: "D4", name: "DF Tofu", zh: "炸豆腐", price: "10", veg: true },
      { code: "D5", name: "Taro Fries", zh: "芋絲不掛", price: "9", veg: true },
      { code: "D6", name: "Wok Wok Fries (Pepper / Chili / Plum Powder)", zh: "炸薯薯", price: "7", veg: true },
      { code: "D7", name: "DF Chicken Leg (2 pcs)", zh: "炸雞腿", price: "9.5" },
      { code: "D8", name: "DF Chicken Leg (6 pcs + 2 FREE)", zh: "炸雞腿6pcs送2pcs", price: "28.5" },
      { code: "D9", name: "DF Chicken Leg (10 pcs + 4 FREE)", zh: "炸雞腿10pcs送4pcs", price: "47.5" },
      { code: "D10", name: "DF Red Yeast Pork Belly", zh: "紅糟肉", price: "11" },
      { code: "D11", name: "DF Pork Chop", zh: "炸排骨", price: "10.5" },
      { code: "D12", name: "Marinated Pork Chop", zh: "油排骨", price: "11" },
      { code: "D13", name: "Grilled Pork Tenderloin", zh: "燒肉", price: "10.5" },
      { code: "D14", name: "OG Stewed Pork Belly", zh: "油控肉", price: "10.5" },
      { code: "D15", name: "Taiwanese Sausage Link", zh: "台式香腸", price: "11" },
      { code: "D16", name: "Marinated Quail Eggs (12 pcs)", zh: "油鳥蛋", price: "6" },
      { code: "D17", name: "Plain Rice (250g)", zh: "白飯", price: "2.5" },
      { code: "D18", name: "Taro Biscuit", zh: "芋頭餅", price: "4.5 / 8.5 / 12 / 15.5", note: "1 / 2 / 3 / 4 pcs" },
      { code: "D19", name: "Basil Eggplant Stir-Fry", zh: "塔香茄子", price: "13", veg: true },
      { code: "D20", name: "Stir-Fry Taiwanese Cabbage", zh: "清炒高麗菜", price: "13", veg: true },
      { code: "D21", name: "Hibachi Berkshire Pork (Black Peppercorn / Sukiyaki)", zh: "鐵板烤豬五花", price: "15" },
      { code: "D22", name: "Hibachi Beef (Black Peppercorn / Sukiyaki)", zh: "鐵板烤牛五花", price: "15.5" },
      { code: "D23", name: "Gua Bao", zh: "刈包(含花生)", price: "7.99", note: "Contains Peanuts" },
      { code: "D24", name: "DF Gua Bao", zh: "黃金刈包(含花生)", price: "8.99", note: "Contains Peanuts" },
      { code: "D25", name: "Vegetarian Chicken Roll", zh: "素雞捲", price: "9.5", veg: true },
    ],
  },
  {
    letter: "E",
    title: "Side Dish",
    zh: "小菜",
    items: [
      { code: "E1", name: "TTOP Marinated Cucumber", zh: "TTOP蒜味小黃瓜", price: "8" },
      { code: "E2", name: "Shredded Seaweed Salad", zh: "赤油海帶絲", price: "6" },
      { code: "E3", name: "Taiwanese Preserved Cabbage", zh: "台式泡菜", price: "6" },
    ],
  },
  {
    letter: "F",
    title: "Drinks",
    zh: "飲品",
    items: [
      { code: "F1", name: "Signature Milk Tea", zh: "招牌奶茶", price: "5 / 10 / 5.5", note: "(M) / (L) / (Hot)" },
      { code: "F2", name: "Deluxe Dark Plum Juice", zh: "酸梅湯", price: "5 / 10", note: "(M) / (L)" },
      { code: "F3", name: "YoYo Pomelo Tea", zh: "柚柚茶", price: "5 / 10 / 5.5", note: "(M) / (L) / (Hot)" },
      { code: "F4", name: "Honey Lemon Aloe Chia", zh: "蜂蜜檸檬蘆薈奇亞籽", price: "5 / 10", note: "(M) / (L)" },
      { code: "F5", name: "Pop (Coke / Diet Coke / Sprite / Ginger Ale / Nestea)", zh: "汽水", price: "2" },
      { code: "F6", name: "HeySong Sarsaparilla", zh: "黑松沙士", price: "3" },
      { code: "F7", name: "Apple Sidra", zh: "蘋果西打", price: "3" },
      { code: "F8", name: "JDB Herbal Tea", zh: "加多寶", price: "3" },
    ],
  },
];

export const FROZEN_H: MenuCategory = {
  letter: "H",
  title: "Frozen Cooked Foods",
  zh: "冷凍預製菜",
  items: [
    { code: "H1", name: "Frozen TTOP Chicken Pot", zh: "冷凍花雕雞", price: "36", note: "chicken 650g + Hua Diao wine 200g; add celery/green pepper/scallion +$2" },
    { code: "H2", name: "Frozen Old Country Rustic Beef Noodle", zh: "冷凍藤椒牛肉麵", price: "19.5", note: "raw noodle 180g + soup w/ beef 570g" },
    { code: "H3", name: "Frozen Classic Consommé Beef Noodle", zh: "冷凍精燉牛肉麵", price: "18.5", note: "raw noodle 180g + soup w/ beef 670g" },
    { code: "H4", name: "Frozen LOBA Sauce (500g)", zh: "冷凍滷肉汁", price: "19.5" },
    { code: "H5", name: "Frozen OG Stewed Pork Belly (400g)", zh: "冷凍油控肉", price: "17" },
    { code: "H6", name: "Frozen Chicken Soup Bamboo Shoot Confit (550g)", zh: "冷凍雞湯筍絲", price: "14.5" },
    { code: "H7", name: "Frozen Marinated Pork Chop (2 pcs)", zh: "冷凍油排骨", price: "17" },
    { code: "H8", name: "Frozen Shiitake Pork Ragu (500g)", zh: "冷凍香菇肉燥", price: "17.5" },
    { code: "H9", name: "Frozen Black Peppercorn Sauce (500g)", zh: "冷凍黑胡椒醬", price: "15" },
    { code: "H10", name: "Frozen Handmade Pork Meatballs (250g)", zh: "冷凍手工迷你獅子頭", price: "12" },
  ],
};

export const FROZEN_I: MenuCategory = {
  letter: "I",
  title: "Frozen Raw Products",
  zh: "冷凍食品",
  items: [
    { code: "I1", name: "Frozen Raw Pork Tenderloin (6 pcs)", zh: "冷凍生燒肉", price: "14" },
    { code: "I2", name: "Frozen Raw Pork Chop (2 pcs)", zh: "冷凍生排骨", price: "11" },
    { code: "I3", name: "Frozen Raw Chicken & Mushroom Marinade (500g)", zh: "冷凍生北菇滑雞", price: "13" },
  ],
};