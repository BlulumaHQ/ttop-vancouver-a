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
    subtitle: "Celery, red onion, scallion & cilantro included",
    blurb:
      "The dish that made our name on Alexandra Food Street. Boneless chicken slow-simmered in Hua Diao wine sauce, sold as a shareable pot.",
    items: [
      { code: "A1", name: "TTOP Chicken Pot", tagline: "Small", price: "38", image: "/images/menu/a1-chicken-pot-s.webp" },
      { code: "A2", name: "TTOP Chicken Pot", tagline: "Large", price: "58", image: "/images/menu/a2-chicken-pot-l.webp" },
      { code: "A3", name: "Spicy XM Chicken Pot", tagline: "Small", price: "40", spicy: true, image: "/images/menu/a1-chicken-pot-s.webp" },
      { code: "A4", name: "Spicy XM Chicken Pot", tagline: "Large", price: "60", spicy: true, image: "/images/menu/a2-chicken-pot-l.webp" },
    ],
    notes: [
      "Pot options — Cook add-ons together (in-pot) or pack them separately (heat at home). Remove celery / red onion / scallion / cilantro at no charge. Add TTOP Sauce +$1.5 · Add Chili X / XX / XXX +$1.5.",
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
          { code: "", name: "Celtuce", price: "7.5" },
          { code: "", name: "Taiwanese Cabbage", price: "7" },
          { code: "", name: "Broccoli", price: "7" },
          { code: "", name: "Cauliflower", price: "7" },
          { code: "", name: "Baby Corn", price: "7" },
          { code: "", name: "Celery", price: "6" },
          { code: "", name: "Red Onion", price: "6" },
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
          { code: "", name: "Fried Chinese Doughnut", price: "5.5" },
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
      { code: "B3", name: "Fried Pork Chop", price: "17", image: "/images/menu/b3-df-pork-chop.webp" },
      { code: "B4", name: "Crispy Chicken Leg", price: "18.5", image: "/images/menu/b4-df-chicken-leg.webp" },
      { code: "B5", name: "Basil Fried Popcorn Chicken", price: "16.5", image: "/images/menu/b5-df-chicken-nugget.webp" },
      { code: "B6", name: "Crunchy Red Yeast Pork Belly", price: "17", image: "/images/menu/b6-red-yeast-pork.webp" },
      { code: "B7", name: "OG Stewed Pork Belly", price: "16.5", image: "/images/menu/b7-stewed-pork-belly.webp" },
      { code: "B8", name: "Marinated Pork Chop", price: "17.5", image: "/images/menu/b8-marinated-pork-chop.webp" },
      { code: "B9", name: "Grilled Pork Tenderloin", price: "16.5", image: "/images/menu/b9-grilled-pork-tenderloin.webp" },
      { code: "B10", name: "Taiwanese Sausage", price: "17.5", image: "/images/menu/b10-taiwanese-sausage.webp" },
      { code: "B11", name: "LOBA (Stewed Pork Belly)", price: "14.75", image: "/images/menu/b11-loba.webp" },
      { code: "B12", name: "Shredded Chicken", price: "16.25", image: "/images/menu/b12-shredded-chicken.webp" },
      { code: "B13", name: "Hibachi Berkshire Pork", tagline: "Black Peppercorn / Sukiyaki", price: "16.5", image: "/images/menu/b13-hibachi-pork.webp" },
      { code: "B14", name: "Hibachi Beef", tagline: "Black Peppercorn / Sukiyaki", price: "17", image: "/images/menu/b14-hibachi-beef.webp" },
      { code: "B15", name: "Wok-fry Basil Eggplant", price: "17.5", veg: true, image: "/images/menu/b15-basil-eggplant.webp" },
      { code: "B16", name: "Vegetarian Chicken Roll", price: "18.5", veg: true, image: "/images/menu/b16-veg-chicken-roll.webp" },
      { code: "B17", name: "Basic Bento", price: "9", image: "/images/menu/b17-three-sides.webp" },
    ],
    notes: [
      "B3–B17 include rice plus three rotating side dishes.",
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
      { code: "D1", name: "Basil Fried Popcorn Chicken", price: "11" },
      { code: "D2", name: "Fried Fish Cake", price: "10", image: "/images/menu/d2-df-fish-cake.webp" },
      { code: "D3", name: "Fried Squid Ball", tagline: "4 pcs / 8 pcs", price: "6 / 10", image: "/images/menu/d3-df-squid-ball.webp" },
      { code: "D4", name: "Crunchy Mini Tofu Nuggets", price: "10", veg: true, image: "/images/menu/d4-df-tofu.webp" },
      { code: "D5", name: "Taro Fries", price: "9", veg: true },
      { code: "D6", name: "Wok Wok Fries", tagline: "Pepper / Chili / Plum Powder", price: "7", veg: true, image: "/images/menu/d6-wok-fries.webp" },
      { code: "D7", name: "Crispy Chicken Leg", tagline: "2 pcs", price: "9.5", image: "/images/menu/d7-df-chicken-leg.webp" },
      { code: "D8", name: "Crispy Chicken Leg", tagline: "6 pcs + 2 FREE", price: "28.5", image: "/images/menu/d8-df-chicken-leg-6.webp" },
      { code: "D9", name: "Crispy Chicken Leg", tagline: "10 pcs + 4 FREE", price: "47.5", image: "/images/menu/d9-df-chicken-leg-10.webp" },
      { code: "D10", name: "Crunchy Red Yeast Pork Belly", price: "11", image: "/images/menu/d10-red-yeast-pork.webp" },
      { code: "D11", name: "Fried Pork Chop", price: "10.5", image: "/images/menu/d11-df-pork-chop.webp" },
      { code: "D12", name: "Marinated Pork Chop", price: "11", image: "/images/menu/d12-marinated-pork-chop.webp" },
      { code: "D13", name: "Grilled Pork Tenderloin", price: "10.5", image: "/images/menu/d13-grilled-pork-tenderloin.webp" },
      { code: "D14", name: "OG Stewed Pork Belly", price: "10.5", image: "/images/menu/d14-stewed-pork-belly.webp" },
      { code: "D15", name: "Taiwanese Sausage", tagline: "per link", price: "11", image: "/images/menu/d15-taiwanese-sausage.webp" },
      { code: "D16", name: "Marinated Quail Eggs", tagline: "12 pcs", price: "6", image: "/images/menu/d16-quail-eggs.webp" },
      { code: "D17", name: "Steamed Rice", tagline: "250g", price: "2.5", image: "/images/menu/d17-plain-rice.webp" },
      { code: "D18", name: "Taro Biscuit", tagline: "1 / 2 / 3 / 4 pcs", price: "4.5 / 8.5 / 12 / 15.5", image: "/images/menu/d18-taro-biscuit.webp" },
      { code: "D19", name: "Wok-fry Basil Eggplant", price: "13", veg: true, image: "/images/menu/d19-basil-eggplant.webp" },
      { code: "D20", name: "Wok-fry Taiwanese Cabbage", price: "13", veg: true, image: "/images/menu/d20-stir-fry-cabbage.webp" },
      { code: "D21", name: "Hibachi Berkshire Pork", tagline: "Black Peppercorn / Sukiyaki", price: "15" },
      { code: "D22", name: "Hibachi Beef", tagline: "Black Peppercorn / Sukiyaki", price: "15.5" },
      { code: "D23", name: "Gua Bao", tagline: "Contains peanuts", price: "7.99", image: "/images/menu/d23-gua-bao.webp" },
      { code: "D24", name: "Golden Gua Bao", tagline: "Contains peanuts", price: "8.99" },
      { code: "D25", name: "Vegetarian Chicken Roll", price: "9.5", veg: true, image: "/images/menu/d25-veg-chicken-roll.webp" },
    ],
  },
  {
    letter: "E",
    title: "Side Dish",
    accent: "blue",
    items: [
      { code: "E1", name: "TTOP Marinated Cucumber", price: "8", image: "/images/menu/e1-cucumber.webp" },
      { code: "E2", name: "Shredded Seaweed Salad", price: "6", image: "/images/menu/e2-seaweed.webp" },
      { code: "E3", name: "Taiwanese Preserved Cabbage", price: "6", image: "/images/menu/e3-preserved-cabbage.webp" },
    ],
  },
];

/* Add-on blocks — surfaced in the per-card popover on the Menu page. */
export type AddOnLine = { name: string; price?: string };
export type AddOnBlock = { label: string; note?: string; lines?: AddOnLine[] };

export const ADDON_INCLUDED: AddOnBlock = {
  label: "Included",
  note: "Celery / red onion / scallion / cilantro. Remove any at no charge. Add Chili X / XX / XXX +$1.5.",
};

export const ADDON_POPULAR: AddOnBlock = {
  label: "Popular add-ons",
  lines: [
    { name: "AAA Beef", price: "3.5" },
    { name: "Premium Lamb Slices", price: "4" },
    { name: "Berkshire Pork Belly", price: "3" },
    { name: "Celtuce", price: "2.5" },
    { name: "Most vegetables & mushrooms", price: "2" },
    { name: "Cilantro", price: "1" },
  ],
};

export const ADDON_ALSO_ADD: AddOnBlock = {
  label: "Also add",
  lines: [
    { name: "Steamed Rice (250g)", price: "2.5" },
    { name: "LOBA Sauce", price: "3" },
    { name: "Spicy Pickled Daikon", price: "1.5" },
    { name: "Grilled Pork Tenderloin (2 pcs)", price: "5.5" },
    { name: "Stewed Pork Belly", price: "4" },
    { name: "Sausage (1 link)", price: "5.5" },
    { name: "Marinated Quail Egg (4 pcs)", price: "2" },
    { name: "Pickled Mustard Green", price: "1.5" },
    { name: "Scallion Salt Sauce", price: "1.5" },
    { name: "Black Peppercorn Sauce", price: "2.5" },
  ],
};

/* ChuChu Bar — vinegar cubes + drinks (own page at /chuchu-bar) */
export const VINEGAR_G: MenuCategory = {
  letter: "G",
  title: "ChuChu Bar Organic Vinegar Cubes",
  subtitle: "新醋感天然醋飲",
  accent: "red",
  items: [
    { code: "G1", name: "Honey Apple Vinegar Cube", tagline: "M / L", price: "6.5 / 7" },
    { code: "G2", name: "Lychee Vinegar Cube", tagline: "M / L", price: "6.5 / 7" },
    { code: "G3", name: "Cranberry Vinegar Cube", tagline: "M / L", price: "6.5 / 7" },
    { code: "G4", name: "Peach Vinegar Cube", tagline: "M / L", price: "6.5 / 7" },
  ],
  notes: ["Add Chia Seed +$1 · Add Aloe Vera +$1"],
};

export const DRINKS_F: MenuCategory = {
  letter: "F",
  title: "Refreshments",
  accent: "blue",
  items: [
    { code: "F1", name: "Signature Milk Tea", tagline: "M / L / Hot", price: "5 / 10 / 5.5", image: "/images/drinks/f1-signature-milk-tea.webp" },
    { code: "F2", name: "Deluxe Dark Plum Juice", tagline: "M / L", price: "5 / 10", image: "/images/drinks/f2-deluxe-dark-plum-juice.webp" },
    { code: "F3", name: "YoYo Pomelo Tea", tagline: "M / L / Hot", price: "5 / 10 / 5.5", image: "/images/drinks/f3-yoyo-pomelo-tea.webp" },
    { code: "F4", name: "Honey Lemon Aloe Chia", tagline: "M / L", price: "5 / 10", image: "/images/drinks/f4-honey-lemon-aloe-chia.webp" },
    { code: "F5", name: "Pop", tagline: "Coke, Diet Coke, Sprite, Ginger Ale, Nestea", price: "2" },
    { code: "F6", name: "HeySong Sarsaparilla", price: "3" },
    { code: "F7", name: "Apple Sidra", price: "3" },
    { code: "F8", name: "JDB Herbal Tea", price: "3" },
  ],
};

export const FROZEN_H: MenuCategory = {
  letter: "H",
  title: "Formosa Chef-Pacs",
  accent: "blue",
  items: [
    { code: "H1", name: "Frozen TTOP Chicken Pot", price: "36", note: "Chicken 650g + Hua Diao wine 200g; add celery / red onion / scallion +$2.", image: "/images/menu/h1-frozen-chicken-pot.webp" },
    { code: "H2", name: "Frozen Old Country Rustic Beef Noodle", price: "19.5", note: "Raw noodle 180g + soup with beef 570g.", image: "/images/menu/h2-frozen-rustic-beef-noodle.webp" },
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
  title: "Formosa Prep-Pacs",
  accent: "red",
  items: [
    { code: "I1", name: "Frozen Raw Pork Tenderloin Marinade", tagline: "6 pcs", price: "14", image: "/images/menu/i1-raw-pork-tenderloin.webp" },
    { code: "I2", name: "Frozen Raw Pork Chop Marinade", tagline: "2 pcs", price: "11", image: "/images/menu/i2-raw-pork-chop.webp" },
    { code: "I3", name: "Frozen Raw Chicken & Mushroom Marinade", tagline: "500g", price: "13", image: "/images/menu/i3-raw-chicken-mushroom.webp" },
  ],
};
