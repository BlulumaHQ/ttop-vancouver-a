export type MenuItem = {
  code: string;
  name: string;
  price: string;
  spicy?: boolean;
  veg?: boolean;
  note?: string;
  image?: string;
  tagline?: string;
};

export type MenuCategory = {
  letter: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
  notes?: string[];
  groups?: { label: string; items: MenuItem[] }[];
  accent?: "blue" | "red";
  blurb?: string;
};

export const MENU: MenuCategory[] = [
  {
    letter: "A",
    title: "Signature Pot",
    accent: "red",
    subtitle: "Celery, green pepper, scallion & cilantro included",
    blurb:
      "The dish that put us on Food Street. Boneless chicken slow-simmered in Hua Diao wine sauce, sold as a shareable pot.",
    items: [
      { code: "A1", name: "TTOP Chicken Pot", tagline: "Small", price: "38", image: "/images/menu/a1-chicken-pot-s.webp" },
      { code: "A2", name: "TTOP Chicken Pot", tagline: "Large", price: "58", image: "/images/menu/a2-chicken-pot-l.webp" },
      { code: "A3", name: "Spicy XM Chicken Pot", tagline: "Small", price: "40", spicy: true, image: "/images/menu/a1-chicken-pot-s.webp" },
      { code: "A4", name: "Spicy XM Chicken Pot", tagline: "Large", price: "60", spicy: true, image: "/images/menu/a2-chicken-pot-l.webp" },
    ],
    notes: [
      "Pot options — Cook add-ons together (in-pot) or pack them separately (heat at home). Remove celery / green pepper / scallion / cilantro at no charge. Add TTOP Sauce +$1.5 · Add Chili X / XX / XXX +$1.5.",
    ],
  },
  {
    letter: "A+",
    title: "Signature Pot Add-On Toppings",
    accent: "blue",
    blurb: "Build out the pot. Add as many as you like — priced per topping.",
    items: [],
    groups: [
      {
        label: "Meat & Seafood",
        items: [
          { code: "", name: "AAA Beef", price: "15" },
          { code: "", name: "Berkshire Pork Belly", price: "15" },
          { code: "", name: "Premium Lamb Slices", price: "16" },
          { code: "", name: "Luncheon Meat", price: "8" },
          { code: "", name: "Mushroom Meatball", price: "8" },
          { code: "", name: "Fish Dumpling", price: "8" },
          { code: "", name: "Squid Dumpling", price: "8" },
          { code: "", name: "Fish Tofu", price: "8" },
          { code: "", name: "Fish Cake", price: "8" },
        ],
      },
      {
        label: "Mushrooms",
        items: [
          { code: "", name: "Enoki Mushroom", price: "7" },
          { code: "", name: "Shimeji Mushroom", price: "7" },
          { code: "", name: "King Oyster Mushroom", price: "7" },
          { code: "", name: "Oyster Mushroom", price: "7" },
          { code: "", name: "Black Fungus", price: "7" },
        ],
      },
      {
        label: "Vegetables",
        items: [
          { code: "", name: "Lettuce Stem", price: "7.5" },
          { code: "", name: "Taiwanese Cabbage", price: "7" },
          { code: "", name: "Broccoli", price: "7" },
          { code: "", name: "Cauliflower", price: "7" },
          { code: "", name: "Baby Corn", price: "7" },
          { code: "", name: "Celery", price: "6" },
          { code: "", name: "Green Pepper", price: "6" },
          { code: "", name: "Scallion", price: "6" },
          { code: "", name: "Potato", price: "6" },
          { code: "", name: "Cilantro", price: "1" },
        ],
      },
      {
        label: "Noodles & Starch",
        items: [
          { code: "", name: "Udon", price: "7" },
          { code: "", name: "Potato Vermicelli", price: "7" },
          { code: "", name: "Konjac", price: "7" },
          { code: "", name: "Korean Rice Cake", price: "7" },
          { code: "", name: "DF Chinese Doughnut", price: "5.5" },
        ],
      },
      {
        label: "Tofu, Bean Curd & Egg",
        items: [
          { code: "", name: "Dried Bean Curd", price: "7" },
          { code: "", name: "Frozen Tofu", price: "7" },
          { code: "", name: "Quail Egg", price: "7" },
        ],
      },
    ],
  },
  {
    letter: "B",
    title: "Bento",
    accent: "red",
    subtitle: "Rice + three rotating side dishes",
    blurb: "Rice, protein and three rotating side dishes — packed to travel, or eat in.",
    items: [
      { code: "B1", name: "TTOP Chicken", price: "18.5", image: "/images/menu/b1-chicken-bento.webp" },
      { code: "B2", name: "Spicy TTOP Chicken", price: "19.5", spicy: true, image: "/images/menu/b2-spicy-chicken-bento.webp" },
      { code: "B3", name: "DF Pork Chop", price: "17", image: "/images/menu/b3-df-pork-chop.webp" },
      { code: "B4", name: "DF Chicken Leg", price: "18.5", image: "/images/menu/b4-df-chicken-leg.webp" },
      { code: "B5", name: "DF Chicken Nugget", price: "16.5", image: "/images/menu/b5-df-chicken-nugget.webp" },
      { code: "B6", name: "DF Red Yeast Pork Belly", price: "17", image: "/images/menu/b6-red-yeast-pork.webp" },
      { code: "B7", name: "OG Stewed Pork Belly", price: "16.5", image: "/images/menu/b7-stewed-pork-belly.webp" },
      { code: "B8", name: "Marinated Pork Chop", price: "17.5", image: "/images/menu/b8-marinated-pork-chop.webp" },
      { code: "B9", name: "Grilled Pork Tenderloin", price: "16.5", image: "/images/menu/b9-grilled-pork-tenderloin.webp" },
      { code: "B10", name: "Taiwanese Sausage", price: "17.5", image: "/images/menu/b10-taiwanese-sausage.webp" },
      { code: "B11", name: "LOBA", price: "14.75", image: "/images/menu/b11-loba.webp" },
      { code: "B12", name: "Shredded Chicken", price: "16.25", image: "/images/menu/b12-shredded-chicken.webp" },
      { code: "B13", name: "Hibachi Berkshire Pork", tagline: "Black Peppercorn / Sukiyaki", price: "16.5", image: "/images/menu/b13-hibachi-pork.webp" },
      { code: "B14", name: "Hibachi Beef", tagline: "Black Peppercorn / Sukiyaki", price: "17", image: "/images/menu/b14-hibachi-beef.webp" },
      { code: "B15", name: "Basil Eggplant Stir-Fry", price: "17.5", veg: true, image: "/images/menu/b15-basil-eggplant.webp" },
      { code: "B16", name: "Vegetarian Chicken Roll", price: "18.5", veg: true, image: "/images/menu/b16-veg-chicken-roll.webp" },
      { code: "B17", name: "Three Side Dishes", price: "9", image: "/images/menu/b17-three-sides.webp" },
    ],
    notes: [
      "B3–B17 include rice plus three rotating side dishes.",
      "TTOP Chicken bentos — celery / green pepper / scallion / cilantro included; remove any at no charge. Add Chili X / XX / XXX +$1.5.",
      "Popular bento add-ons — AAA Beef $3.5 · Premium Lamb Slices $4 · Berkshire Pork Belly $3 · Lettuce Stem $2.5. Most vegetables & mushrooms $2 · Cilantro $1.",
      "Also add — Steamed Rice (100g) $1.5 · LOBA Sauce $3 · Spicy Pickled Radish $1.5 · Grilled Pork Tenderloin (2 pcs) $5.5 · Stewed Pork Belly $4 · Sausage (1 link) $5.5 · Marinated Quail Egg (4 pcs) $2 · Pickled Mustard Green $1.5 · Scallion Salt Sauce $1.5 · Black Peppercorn Sauce $2.5.",
    ],
  },
  {
    letter: "C",
    title: "Rice Bowls",
    accent: "blue",
    blurb: "A quick bowl. Choose your topping.",
    items: [
      { code: "C1", name: "LOBA Rice", price: "11", image: "/images/menu/c1-loba-rice.webp" },
      { code: "C2", name: "Shredded Chicken Rice", price: "12.5", image: "/images/menu/c2-shredded-chicken-rice.webp" },
      { code: "C3", name: "Sausage Chicken Rice", price: "16.5", image: "/images/menu/c3-sausage-chicken-rice.webp" },
      { code: "C4", name: "Chicken LOBA Rice", price: "14.5", image: "/images/menu/c4-chicken-loba-rice.webp" },
      { code: "C5", name: "Sausage LOBA Rice", price: "16.5", image: "/images/menu/c5-sausage-loba-rice.webp" },
    ],
  },
  {
    letter: "D",
    title: "À La Carte",
    accent: "red",
    blurb: "Snacks, sides and single dishes — order a few, share the table.",
    items: [
      { code: "D1", name: "DF Chicken Nugget", price: "11" },
      { code: "D2", name: "DF Fish Cake", price: "10" },
      { code: "D3", name: "DF Squid Ball", tagline: "4 pcs / 8 pcs", price: "6 / 10" },
      { code: "D4", name: "DF Tofu", price: "10", veg: true },
      { code: "D5", name: "Taro Fries", price: "9", veg: true },
      { code: "D6", name: "Wok Wok Fries", tagline: "Pepper / Chili / Plum Powder", price: "7", veg: true },
      { code: "D7", name: "DF Chicken Leg", tagline: "2 pcs", price: "9.5" },
      { code: "D8", name: "DF Chicken Leg", tagline: "6 pcs + 2 FREE", price: "28.5" },
      { code: "D9", name: "DF Chicken Leg", tagline: "10 pcs + 4 FREE", price: "47.5" },
      { code: "D10", name: "DF Red Yeast Pork Belly", price: "11" },
      { code: "D11", name: "DF Pork Chop", price: "10.5" },
      { code: "D12", name: "Marinated Pork Chop", price: "11" },
      { code: "D13", name: "Grilled Pork Tenderloin", price: "10.5" },
      { code: "D14", name: "OG Stewed Pork Belly", price: "10.5" },
      { code: "D15", name: "Taiwanese Sausage", tagline: "per link", price: "11" },
      { code: "D16", name: "Marinated Quail Eggs", tagline: "12 pcs", price: "6" },
      { code: "D17", name: "Plain Rice", tagline: "250g", price: "2.5" },
      { code: "D18", name: "Taro Biscuit", tagline: "1 / 2 / 3 / 4 pcs", price: "4.5 / 8.5 / 12 / 15.5" },
      { code: "D19", name: "Basil Eggplant Stir-Fry", price: "13", veg: true },
      { code: "D20", name: "Stir-Fry Taiwanese Cabbage", price: "13", veg: true },
      { code: "D21", name: "Hibachi Berkshire Pork", tagline: "Black Peppercorn / Sukiyaki", price: "15" },
      { code: "D22", name: "Hibachi Beef", tagline: "Black Peppercorn / Sukiyaki", price: "15.5" },
      { code: "D23", name: "Gua Bao", tagline: "Contains peanuts", price: "7.99" },
      { code: "D24", name: "DF Gua Bao", tagline: "Contains peanuts", price: "8.99" },
      { code: "D25", name: "Vegetarian Chicken Roll", price: "9.5", veg: true },
    ],
  },
  {
    letter: "E",
    title: "Side Dish",
    accent: "blue",
    items: [
      { code: "E1", name: "TTOP Marinated Cucumber", price: "8" },
      { code: "E2", name: "Shredded Seaweed Salad", price: "6" },
      { code: "E3", name: "Taiwanese Preserved Cabbage", price: "6" },
    ],
  },
  {
    letter: "F",
    title: "Drinks",
    accent: "red",
    items: [
      { code: "F1", name: "Signature Milk Tea", tagline: "M / L / Hot", price: "5 / 10 / 5.5", image: "/images/menu/f-drinks.webp" },
      { code: "F2", name: "Deluxe Dark Plum Juice", tagline: "M / L", price: "5 / 10" },
      { code: "F3", name: "YoYo Pomelo Tea", tagline: "M / L / Hot", price: "5 / 10 / 5.5" },
      { code: "F4", name: "Honey Lemon Aloe Chia", tagline: "M / L", price: "5 / 10" },
      { code: "F5", name: "Pop", tagline: "Coke, Diet Coke, Sprite, Ginger Ale, Nestea", price: "2" },
      { code: "F6", name: "HeySong Sarsaparilla", price: "3" },
      { code: "F7", name: "Apple Sidra", price: "3" },
      { code: "F8", name: "JDB Herbal Tea", price: "3" },
    ],
  },
];

export const FROZEN_H: MenuCategory = {
  letter: "H",
  title: "Frozen Cooked Foods",
  accent: "blue",
  items: [
    { code: "H1", name: "Frozen TTOP Chicken Pot", price: "36", note: "Chicken 650g + Hua Diao wine 200g; add celery / green pepper / scallion +$2.", image: "/images/menu/h1-frozen-chicken-pot.webp" },
    { code: "H2", name: "Frozen Rustic Beef Noodle", price: "19.5", note: "Raw noodle 180g + soup with beef 570g.", image: "/images/menu/h2-frozen-rustic-beef-noodle.webp" },
    { code: "H3", name: "Frozen Classic Consommé Beef Noodle", price: "18.5", note: "Raw noodle 180g + soup with beef 670g.", image: "/images/menu/h3-frozen-consomme-beef-noodle.webp" },
    { code: "H4", name: "Frozen LOBA Sauce", tagline: "500g", price: "19.5", image: "/images/menu/h4-frozen-loba-sauce.webp" },
    { code: "H5", name: "Frozen OG Stewed Pork Belly", tagline: "400g", price: "17", image: "/images/menu/h5-frozen-stewed-pork.webp" },
    { code: "H6", name: "Frozen Chicken Soup Bamboo Shoot Confit", tagline: "550g", price: "14.5", image: "/images/menu/h6-frozen-bamboo-shoot.webp" },
    { code: "H7", name: "Frozen Marinated Pork Chop", tagline: "2 pcs", price: "17", image: "/images/menu/h7-frozen-marinated-pork-chop.webp" },
    { code: "H8", name: "Frozen Shiitake Pork Ragu", tagline: "500g", price: "17.5", image: "/images/menu/h8-frozen-shiitake-ragu.webp" },
    { code: "H9", name: "Frozen Black Peppercorn Sauce", tagline: "500g", price: "15", image: "/images/menu/h9-frozen-pepper-sauce.webp" },
    { code: "H10", name: "Frozen Handmade Pork Meatballs", tagline: "250g", price: "12", image: "/images/menu/h10-frozen-meatballs.webp" },
  ],
};

export const FROZEN_I: MenuCategory = {
  letter: "I",
  title: "Frozen Raw Products",
  accent: "red",
  items: [
    { code: "I1", name: "Frozen Raw Pork Tenderloin", tagline: "6 pcs", price: "14", image: "/images/menu/i1-raw-pork-tenderloin.webp" },
    { code: "I2", name: "Frozen Raw Pork Chop", tagline: "2 pcs", price: "11", image: "/images/menu/i2-raw-pork-chop.webp" },
    { code: "I3", name: "Frozen Raw Chicken & Mushroom Marinade", tagline: "500g", price: "13", image: "/images/menu/i3-raw-chicken-mushroom.webp" },
  ],
};
