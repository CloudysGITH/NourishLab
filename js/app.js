/* ========================================
   NourishLab - Application Logic
   English version with science-based nutrition rules,
   combined goals, German-style breakfasts,
   adjustable weight loss rate, food tracker,
   configurable plan duration
   ======================================== */

// ==========================================
// FOOD DATABASE (per 100g)
// Tags: omnivore, vegetarian, vegan, pescatarian
// breakfast: true = suitable for breakfast
// ==========================================
const FOODS = {
    proteinquellen: {
        label: "&#127830; Protein Sources",
        items: {
            // === BREAKFAST-SUITABLE PROTEINS ===
            "Eggs": { kcal: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
            "Magerquark (low-fat quark)": { kcal: 67, protein: 12, carbs: 4, fat: 0.3, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
            "Greek Yogurt": { kcal: 97, protein: 9, carbs: 3.6, fat: 5, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
            "Skyr": { kcal: 63, protein: 11, carbs: 4, fat: 0.2, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
            "Cottage Cheese": { kcal: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
            "Natural Yogurt 3.8%": { kcal: 66, protein: 4, carbs: 4.7, fat: 3.8, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
            "Harzer Cheese": { kcal: 126, protein: 27, carbs: 0.5, fat: 0.7, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },

            // === LUNCH/DINNER PROTEINS ===
            "Chicken Breast": { kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, tags: ["omnivore"], breakfast: false },
            "Turkey Breast": { kcal: 135, protein: 30, carbs: 0, fat: 1.5, fiber: 0, tags: ["omnivore"], breakfast: false },
            "Lean Beef Steak": { kcal: 187, protein: 28, carbs: 0, fat: 8, fiber: 0, tags: ["omnivore"], breakfast: false },
            "Beef Filet": { kcal: 155, protein: 28, carbs: 0, fat: 4.5, fiber: 0, tags: ["omnivore"], breakfast: false },
            "Pork Filet": { kcal: 143, protein: 23, carbs: 0, fat: 5.4, fiber: 0, tags: ["omnivore"], breakfast: false },
            "Lamb Loin": { kcal: 178, protein: 25, carbs: 0, fat: 8.5, fiber: 0, tags: ["omnivore"], breakfast: false },
            "Duck Breast": { kcal: 132, protein: 23, carbs: 0, fat: 4, fiber: 0, tags: ["omnivore"], breakfast: false },
            "Rabbit": { kcal: 136, protein: 21, carbs: 0, fat: 5.5, fiber: 0, tags: ["omnivore"], breakfast: false },

            // === FISH ===
            "Salmon": { kcal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Tuna (natural)": { kcal: 130, protein: 29, carbs: 0, fat: 1, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Shrimp": { kcal: 99, protein: 24, carbs: 0, fat: 0.3, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Cod": { kcal: 82, protein: 18, carbs: 0, fat: 0.7, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Trout": { kcal: 148, protein: 21, carbs: 0, fat: 7, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Herring": { kcal: 158, protein: 18, carbs: 0, fat: 9, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Mackerel": { kcal: 205, protein: 19, carbs: 0, fat: 14, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Sardines": { kcal: 208, protein: 25, carbs: 0, fat: 11, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Sea Bass": { kcal: 97, protein: 18, carbs: 0, fat: 2.3, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Sole": { kcal: 86, protein: 18, carbs: 0, fat: 1.2, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Turbot": { kcal: 95, protein: 16, carbs: 0, fat: 3.3, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Perch": { kcal: 82, protein: 18, carbs: 0, fat: 0.8, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Pollock": { kcal: 81, protein: 18, carbs: 0, fat: 0.6, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Swordfish": { kcal: 144, protein: 20, carbs: 0, fat: 7, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },

            // === SEAFOOD ===
            "Scallops": { kcal: 69, protein: 12, carbs: 3, fat: 0.5, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Mussels": { kcal: 86, protein: 12, carbs: 4, fat: 2, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },
            "Squid": { kcal: 92, protein: 18, carbs: 3, fat: 1.4, fiber: 0, tags: ["omnivore", "pescatarian"], breakfast: false },

            // === CHEESE (some breakfast, some lunch) ===
            "Feta": { kcal: 264, protein: 14, carbs: 4, fat: 21, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
            "Mozzarella": { kcal: 280, protein: 22, carbs: 2, fat: 17, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
            "Ricotta": { kcal: 174, protein: 11, carbs: 3, fat: 13, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },

            // === VEGAN/VEGETARIAN ===
            "Tofu": { kcal: 144, protein: 17, carbs: 3, fat: 8, fiber: 0.3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Tempeh": { kcal: 192, protein: 20, carbs: 8, fat: 11, fiber: 1.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Seitan": { kcal: 148, protein: 28, carbs: 4, fat: 2, fiber: 0.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },

            // === LEGUMES AS PROTEIN (lunch/dinner) ===
            "Chickpeas": { kcal: 164, protein: 9, carbs: 27, fat: 2.6, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Lentils": { kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Red Lentils": { kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Green Lentils": { kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Kidney Beans": { kcal: 127, protein: 9, carbs: 22, fat: 0.5, fiber: 6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Black Beans": { kcal: 132, protein: 9, carbs: 24, fat: 0.5, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Mung Beans": { kcal: 105, protein: 7, carbs: 19, fat: 0.4, fiber: 5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Edamame": { kcal: 122, protein: 11, carbs: 10, fat: 5, fiber: 5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
        }
    },
    kohlenhydrate: {
        label: "&#127834; Carbohydrate Sources",
        items: {
            // === BREAKFAST CARBS ===
            "Oatmeal (Haferflocken)": { kcal: 379, protein: 13.5, carbs: 67, fat: 7, fiber: 10, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Spelt Flakes (Dinkelflocken)": { kcal: 352, protein: 12, carbs: 69, fat: 2.7, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Whole Grain Bread (Vollkornbrot)": { kcal: 213, protein: 7, carbs: 41, fat: 1.3, fiber: 6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Rye Crispbread (Knaeckebrot)": { kcal: 366, protein: 11, carbs: 65, fat: 3.5, fiber: 15, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Rye Mixed Bread": { kcal: 219, protein: 6.6, carbs: 43, fat: 1.1, fiber: 6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },

            // === LUNCH/DINNER CARBS ===
            "Brown Rice": { kcal: 350, protein: 7.5, carbs: 74, fat: 2.7, fiber: 3.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Basmati Rice": { kcal: 354, protein: 7, carbs: 78, fat: 0.6, fiber: 1.3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Whole Wheat Pasta": { kcal: 348, protein: 13, carbs: 65, fat: 2.5, fiber: 7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Potatoes": { kcal: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Sweet Potatoes": { kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Quinoa": { kcal: 368, protein: 14, carbs: 64, fat: 6, fiber: 7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Couscous": { kcal: 376, protein: 12.8, carbs: 77, fat: 0.6, fiber: 5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Millet (Hirse)": { kcal: 378, protein: 11, carbs: 73, fat: 4.2, fiber: 3.9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Buckwheat": { kcal: 343, protein: 13.3, carbs: 72, fat: 3.4, fiber: 10, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
        }
    },
    gemuese: {
        label: "&#129382; Vegetables",
        items: {
            "Broccoli": { kcal: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Spinach": { kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Zucchini": { kcal: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Bell Pepper": { kcal: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Tomatoes": { kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Cucumber": { kcal: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Cauliflower": { kcal: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Green Beans": { kcal: 31, protein: 1.8, carbs: 7, fat: 0.1, fiber: 3.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Mushrooms": { kcal: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Carrots": { kcal: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Eggplant": { kcal: 25, protein: 1, carbs: 6, fat: 0.2, fiber: 3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Asparagus": { kcal: 20, protein: 2.2, carbs: 3.9, fat: 0.1, fiber: 2.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Brussels Sprouts": { kcal: 43, protein: 3.4, carbs: 9, fat: 0.3, fiber: 3.8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Fennel": { kcal: 31, protein: 1.2, carbs: 7.3, fat: 0.2, fiber: 3.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Artichoke": { kcal: 47, protein: 3.3, carbs: 11, fat: 0.2, fiber: 5.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Sauerkraut": { kcal: 19, protein: 0.9, carbs: 4.3, fat: 0.1, fiber: 2.9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Kohlrabi": { kcal: 27, protein: 1.7, carbs: 6.2, fat: 0.1, fiber: 3.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Pumpkin": { kcal: 26, protein: 1, carbs: 6.5, fat: 0.1, fiber: 0.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Swiss Chard (Mangold)": { kcal: 19, protein: 1.8, carbs: 3.7, fat: 0.2, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Pak Choi": { kcal: 13, protein: 1.5, carbs: 2.2, fat: 0.2, fiber: 1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Romanesco": { kcal: 25, protein: 2.5, carbs: 4.1, fat: 0.4, fiber: 2.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Celery Stalk": { kcal: 16, protein: 0.7, carbs: 3, fat: 0.2, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Radishes": { kcal: 16, protein: 0.7, carbs: 3.4, fat: 0.1, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
        }
    },
    salate: {
        label: "&#129388; Salads & Leafy Greens",
        items: {
            "Mixed Leaf Salad": { kcal: 14, protein: 1.3, carbs: 2.2, fat: 0.2, fiber: 1.8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Lamb's Lettuce (Feldsalat)": { kcal: 14, protein: 1.8, carbs: 2, fat: 0.4, fiber: 1.7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Endive": { kcal: 17, protein: 1.3, carbs: 3.4, fat: 0.2, fiber: 3.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Frisee": { kcal: 17, protein: 1.3, carbs: 3.4, fat: 0.2, fiber: 3.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Lollo Rosso": { kcal: 16, protein: 1.4, carbs: 2.3, fat: 0.2, fiber: 1.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
            "Rocket (Rucola)": { kcal: 25, protein: 2.6, carbs: 3.7, fat: 0.7, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: false },
        }
    },
    obst: {
        label: "&#127815; Fruits",
        items: {
            "Apple": { kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Banana": { kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Mixed Berries": { kcal: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Orange": { kcal: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Pear": { kcal: 57, protein: 0.4, carbs: 15, fat: 0.1, fiber: 3.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Kiwi": { kcal: 61, protein: 1.1, carbs: 15, fat: 0.5, fiber: 3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Mango": { kcal: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Papaya": { kcal: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Peach": { kcal: 39, protein: 0.9, carbs: 10, fat: 0.3, fiber: 1.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Currants": { kcal: 56, protein: 1.4, carbs: 14, fat: 0.4, fiber: 4.3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Avocado": { kcal: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
        }
    },
    huelsenfruechte: {
        label: "&#129372; Nuts & Seeds",
        items: {
            "Almonds": { kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Walnuts": { kcal: 654, protein: 15, carbs: 14, fat: 65, fiber: 7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Chia Seeds": { kcal: 486, protein: 17, carbs: 42, fat: 31, fiber: 34, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Flaxseed (Leinsamen)": { kcal: 534, protein: 18, carbs: 29, fat: 42, fiber: 27, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Sunflower Seeds": { kcal: 584, protein: 21, carbs: 20, fat: 51, fiber: 9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
        }
    },
    oele: {
        label: "&#129361; Oils & Fats",
        items: {
            "Olive Oil": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Coconut Oil": { kcal: 862, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Flaxseed Oil (Leinoel)": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Butter": { kcal: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
            "Avocado Oil": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Walnut Oil": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], breakfast: true },
            "Ghee": { kcal: 900, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], breakfast: true },
        }
    }
};

// ==========================================
// MOBILE NAV
// ==========================================
function closeNav() {
    document.getElementById('navLinks').classList.remove('open');
}

// ==========================================
// UNIT CONVERSION TABLE
// Approximate conversions to grams
// ==========================================
const UNIT_CONVERSIONS = {
    g: 1,
    ml: 1,          // approximate for most foods
    piece: 100,     // default piece weight
    tbsp: 15,       // 1 tablespoon ≈ 15g
    tsp: 5,         // 1 teaspoon ≈ 5g
    cup: 240,       // 1 cup ≈ 240g
    slice: 30,      // 1 slice ≈ 30g
};

// Specific piece weights for common foods
const PIECE_WEIGHTS = {
    "Eggs": 60,
    "Apple": 180,
    "Banana": 120,
    "Orange": 170,
    "Pear": 180,
    "Kiwi": 75,
    "Mango": 200,
    "Papaya": 300,
    "Peach": 150,
    "Avocado": 150,
    "Tomatoes": 120,
    "Cucumber": 400,
    "Bell Pepper": 160,
    "Carrots": 80,
    "Radishes": 10,
};

// ==========================================
// RECIPE DATABASE
// ==========================================
const RECIPES = {
    breakfast: [
        { match: ['Oatmeal', 'Berries', 'Yogurt|Quark|Skyr'], name: 'Berry Overnight Oats', tip: 'Soak oats overnight in yogurt, top with berries and seeds in the morning.' },
        { match: ['Oatmeal', 'Banana'], name: 'Banana Porridge', tip: 'Cook oats with water, mash banana in. Top with cinnamon and nuts.' },
        { match: ['Oatmeal', 'Apple'], name: 'Apple Cinnamon Porridge', tip: 'Cook oats, stir in grated apple, cinnamon and a drizzle of honey.' },
        { match: ['Eggs', 'Bread'], name: 'Eggs on Toast', tip: 'Scrambled, fried or poached eggs on whole grain toast with fresh tomatoes.' },
        { match: ['Eggs', 'Tomatoes'], name: 'Scrambled Eggs with Tomatoes', tip: 'Scramble eggs with diced tomatoes, fresh herbs and a pinch of salt.' },
        { match: ['Eggs', 'Cucumber'], name: 'Egg Breakfast Plate', tip: 'Soft-boiled eggs with cucumber slices, bread and butter.' },
        { match: ['Eggs'], name: 'Classic Egg Breakfast', tip: 'Boiled or scrambled eggs with bread, topped with fresh veggies.' },
        { match: ['Quark', 'Berries|Mango|Peach'], name: 'Quark Berry Bowl', tip: 'Mix quark with fruit, add seeds and a drizzle of flaxseed oil.' },
        { match: ['Quark', 'Oatmeal|Flakes'], name: 'Quark Muesli', tip: 'Combine quark with oats, fruit and seeds for a protein-rich start.' },
        { match: ['Quark'], name: 'Quark Power Bowl', tip: 'Top quark with fruit, nuts/seeds and a drizzle of oil.' },
        { match: ['Skyr', 'Berries|Banana'], name: 'Skyr Fruit Bowl', tip: 'Skyr with fresh fruit, seeds and a touch of honey.' },
        { match: ['Skyr'], name: 'Skyr Breakfast', tip: 'Skyr with fruit and granola or oats for extra fiber.' },
        { match: ['Yogurt', 'Oatmeal|Flakes'], name: 'Yogurt Muesli Bowl', tip: 'Layer yogurt with oats, fruit and a sprinkle of seeds.' },
        { match: ['Yogurt'], name: 'Yogurt Breakfast Bowl', tip: 'Yogurt topped with fruit, nuts and a drizzle of honey.' },
        { match: ['Cottage', 'Bread'], name: 'Cottage Cheese on Toast', tip: 'Spread on whole grain bread, top with tomatoes or radishes.' },
        { match: ['Cottage'], name: 'Cottage Cheese Bowl', tip: 'Cottage cheese with fruit and seeds - light and protein-rich.' },
        { match: ['Feta', 'Bread'], name: 'Feta Breakfast Plate', tip: 'Crumbled feta on bread with tomatoes, cucumber and olive oil.' },
        { match: ['Mozzarella', 'Tomatoes'], name: 'Caprese Breakfast', tip: 'Fresh mozzarella with tomatoes, basil and olive oil on bread.' },
        { match: ['Ricotta', 'Bread'], name: 'Ricotta Toast', tip: 'Spread ricotta on toast, drizzle with oil, add fruit or tomatoes.' },
        { match: ['Avocado', 'Bread|Toast'], name: 'Avocado Toast', tip: 'Mash avocado on bread, season with salt, pepper and lemon.' },
        { match: ['Avocado', 'Eggs'], name: 'Avocado Egg Plate', tip: 'Halved avocado with eggs, salt and chili flakes.' },
    ],
    lunch: [
        { match: ['Chicken', 'Rice', 'Broccoli'], name: 'Chicken Rice Bowl', tip: 'Pan-sear chicken, serve over rice with steamed broccoli and soy sauce.' },
        { match: ['Chicken', 'Quinoa'], name: 'Chicken Quinoa Power Bowl', tip: 'Grilled chicken over fluffy quinoa with roasted veggies.' },
        { match: ['Chicken', 'Pasta'], name: 'Chicken Pasta Primavera', tip: 'Toss pasta with sliced chicken, sauteed vegetables and olive oil.' },
        { match: ['Chicken', 'Potatoes'], name: 'Herb Roasted Chicken & Potatoes', tip: 'Bake chicken with potatoes, rosemary, garlic and olive oil.' },
        { match: ['Chicken', 'Salad|Lettuce'], name: 'Grilled Chicken Salad', tip: 'Sliced chicken over mixed greens with a lemon vinaigrette.' },
        { match: ['Chicken'], name: 'Pan-Seared Chicken', tip: 'Season with herbs, pan-sear until golden. Serve with sides.' },
        { match: ['Turkey', 'Rice|Quinoa'], name: 'Turkey Grain Bowl', tip: 'Sliced turkey over grains with roasted vegetables.' },
        { match: ['Turkey'], name: 'Herb Turkey Plate', tip: 'Pan-fried turkey breast with seasonal vegetables.' },
        { match: ['Beef', 'Rice'], name: 'Beef Stir-Fry', tip: 'Slice beef thin, stir-fry with vegetables and serve over rice.' },
        { match: ['Beef', 'Potatoes|Sweet'], name: 'Steak with Potatoes', tip: 'Sear steak to your liking. Serve with roasted potatoes and veggies.' },
        { match: ['Beef'], name: 'Seared Beef with Vegetables', tip: 'Pan-sear, let rest, slice against the grain. Season simply.' },
        { match: ['Salmon', 'Rice'], name: 'Teriyaki Salmon Bowl', tip: 'Bake salmon with a soy-honey glaze, serve over rice with veggies.' },
        { match: ['Salmon', 'Quinoa'], name: 'Salmon Quinoa Bowl', tip: 'Baked salmon over quinoa with roasted vegetables and lemon.' },
        { match: ['Salmon', 'Salad|Lettuce|Rocket'], name: 'Salmon Salad', tip: 'Flaked salmon over mixed greens with avocado and lemon dressing.' },
        { match: ['Salmon'], name: 'Oven-Baked Salmon', tip: 'Bake at 200C for 12-15 min with lemon, dill and olive oil.' },
        { match: ['Cod|Pollock|Sole|Perch|Sea Bass|Turbot'], name: 'Pan-Fried White Fish', tip: 'Lightly flour, pan-fry in olive oil. Serve with lemon and veggies.' },
        { match: ['Trout'], name: 'Whole Baked Trout', tip: 'Stuff with lemon and herbs, bake in foil at 180C for 20 min.' },
        { match: ['Shrimp', 'Rice|Pasta'], name: 'Garlic Shrimp', tip: 'Saute shrimp with garlic, chili and parsley. Serve over rice or pasta.' },
        { match: ['Shrimp'], name: 'Lemon Garlic Shrimp', tip: 'Quick saute with garlic, butter and lemon juice. 3 min per side.' },
        { match: ['Tofu', 'Rice'], name: 'Crispy Tofu Rice Bowl', tip: 'Press and cube tofu, pan-fry until crispy. Serve with rice and veggies.' },
        { match: ['Tofu'], name: 'Pan-Fried Tofu', tip: 'Press well, marinate in soy sauce, pan-fry until golden.' },
        { match: ['Tempeh'], name: 'Smoky Tempeh Bowl', tip: 'Slice and marinate in smoked paprika + soy, pan-fry until crispy.' },
        { match: ['Lentils', 'Rice'], name: 'Lentil Dal with Rice', tip: 'Simmer lentils with cumin, turmeric, garlic. Serve over rice.' },
        { match: ['Lentils'], name: 'Warm Lentil Bowl', tip: 'Cook lentils with onion, garlic and spices. Top with fresh herbs.' },
        { match: ['Chickpeas', 'Couscous'], name: 'Moroccan Chickpea Couscous', tip: 'Spice chickpeas with cumin and paprika, serve over couscous.' },
        { match: ['Chickpeas'], name: 'Roasted Chickpea Bowl', tip: 'Roast with spices at 200C for 25 min until crispy.' },
        { match: ['Pork'], name: 'Herb Pork Medallions', tip: 'Slice filet into medallions, sear 3 min each side with rosemary.' },
        { match: ['Lamb'], name: 'Rosemary Lamb', tip: 'Season with rosemary, garlic and olive oil. Sear, then rest.' },
        { match: ['Duck'], name: 'Duck Breast with Vegetables', tip: 'Score skin, sear skin-side down 6 min, flip 4 min. Rest well.' },
    ],
    dinner: [
        { match: ['Chicken', 'Salad|Lettuce'], name: 'Light Chicken Salad', tip: 'Grilled chicken strips over a fresh garden salad.' },
        { match: ['Chicken', 'Broccoli|Zucchini|Spinach'], name: 'Chicken & Greens', tip: 'Saute chicken with green vegetables, garlic and a splash of lemon.' },
        { match: ['Chicken'], name: 'Simple Herb Chicken', tip: 'Pan-sear with herbs, serve with a side of vegetables.' },
        { match: ['Turkey'], name: 'Light Turkey Dinner', tip: 'Grilled turkey with steamed vegetables and a light dressing.' },
        { match: ['Salmon', 'Asparagus|Spinach'], name: 'Salmon with Green Vegetables', tip: 'Bake salmon, serve with sauteed greens and lemon.' },
        { match: ['Salmon'], name: 'Simple Baked Salmon', tip: 'Bake with olive oil, lemon, salt. Pair with salad.' },
        { match: ['Cod|Pollock|Sole|Perch|Sea Bass'], name: 'Steamed White Fish', tip: 'Steam or poach gently with herbs. Light, easy to digest for dinner.' },
        { match: ['Trout|Herring|Mackerel'], name: 'Baked Fish Dinner', tip: 'Bake with herbs and lemon, serve with vegetables.' },
        { match: ['Shrimp', 'Salad|Lettuce'], name: 'Shrimp Salad', tip: 'Pan-seared shrimp over mixed greens with lemon dressing.' },
        { match: ['Shrimp'], name: 'Garlic Butter Shrimp', tip: 'Quick saute with garlic and butter, serve with vegetables.' },
        { match: ['Beef', 'Salad'], name: 'Steak Salad', tip: 'Sliced seared steak over arugula with balsamic vinaigrette.' },
        { match: ['Beef'], name: 'Lean Beef with Vegetables', tip: 'Sear beef, serve with roasted seasonal vegetables.' },
        { match: ['Tofu', 'Spinach|Pak Choi'], name: 'Asian Tofu Stir-Fry', tip: 'Stir-fry tofu with greens, ginger, soy sauce and sesame oil.' },
        { match: ['Tofu'], name: 'Crispy Tofu Plate', tip: 'Pan-fry tofu cubes, serve with salad and a tahini drizzle.' },
        { match: ['Eggs', 'Spinach|Tomatoes'], name: 'Veggie Omelette', tip: 'Whisk eggs, pour into pan, fill with veggies. Fold and serve.' },
        { match: ['Eggs'], name: 'Egg Dinner Plate', tip: 'Boiled or scrambled eggs with salad and bread.' },
        { match: ['Lentils'], name: 'Lentil Soup', tip: 'Simmer lentils with carrots, celery, onion and cumin. Warm and filling.' },
        { match: ['Chickpeas'], name: 'Chickpea Stew', tip: 'Stew with tomatoes, spinach and cumin. Hearty and satisfying.' },
        { match: ['Feta', 'Salad|Tomatoes'], name: 'Greek Salad', tip: 'Feta, tomatoes, cucumber, olives, olive oil. Classic and fresh.' },
        { match: ['Mozzarella', 'Tomatoes'], name: 'Caprese Plate', tip: 'Fresh mozzarella, sliced tomatoes, basil and balsamic.' },
    ]
};

function getRecipeName(mealIndex, items) {
    const mealType = mealIndex === 0 ? 'breakfast' : mealIndex === 1 ? 'lunch' : 'dinner';
    const recipes = RECIPES[mealType];
    const itemNames = items.map(i => i.name.toLowerCase());
    const nameStr = itemNames.join(' ');

    for (const recipe of recipes) {
        const allMatch = recipe.match.every(pattern => {
            const alternatives = pattern.toLowerCase().split('|');
            return alternatives.some(alt => nameStr.includes(alt));
        });
        if (allMatch) return recipe;
    }

    const fallbacks = {
        breakfast: { name: 'Balanced Breakfast', tip: 'Combine protein, carbs and healthy fats for a nutritious start.' },
        lunch: { name: 'Balanced Lunch Bowl', tip: 'Start with your protein, add sides. Season with herbs and good oil.' },
        dinner: { name: 'Light Dinner Plate', tip: 'Keep it simple - protein with vegetables. Easy on the carbs in the evening.' },
    };
    return fallbacks[mealType];
}

// ==========================================
// LOCAL STORAGE PERSISTENCE
// ==========================================
const STORAGE_KEY = 'nourishlab_v1';

function saveToStorage() {
    const data = {};

    ['name', 'alter', 'groesse', 'gewicht', 'zielgewicht', 'koerperfett'].forEach(id => {
        const el = document.getElementById(id);
        if (el) data[id] = el.value;
    });

    const akt = document.getElementById('aktivitaet');
    if (akt) data.aktivitaet = akt.value;

    const slider = document.getElementById('weightlossRate');
    if (slider) data.weightlossRate = slider.value;

    const planDays = document.getElementById('planDays');
    if (planDays) data.planDays = planDays.value;

    ['geschlecht', 'ernaehrungsform', 'mealsplit'].forEach(name => {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        if (checked) data['radio_' + name] = checked.value;
    });

    ['ziel', 'sportart', 'umstaende', 'allergie'].forEach(name => {
        data['check_' + name] = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
    });

    Object.keys(FOODS).forEach(catKey => {
        const inputName = catKey === 'oele' ? 'oil' : `food_${catKey}`;
        data['food_' + catKey] = Array.from(document.querySelectorAll(`input[name="${inputName}"]:checked`)).map(el => el.value);
    });

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* quota exceeded, ignore */ }
}

function loadFromStorage() {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) { return; }
    if (!data) return;

    ['name', 'alter', 'groesse', 'gewicht', 'zielgewicht', 'koerperfett'].forEach(id => {
        const el = document.getElementById(id);
        if (el && data[id]) el.value = data[id];
    });

    const akt = document.getElementById('aktivitaet');
    if (akt && data.aktivitaet) akt.value = data.aktivitaet;

    const slider = document.getElementById('weightlossRate');
    if (slider && data.weightlossRate) {
        slider.value = data.weightlossRate;
        document.getElementById('weightlossRateValue').textContent = parseFloat(data.weightlossRate).toFixed(2) + ' kg/week';
    }

    const planDays = document.getElementById('planDays');
    if (planDays && data.planDays) {
        planDays.value = data.planDays;
        document.getElementById('planDaysValue').textContent = data.planDays + ' days';
    }

    ['geschlecht', 'ernaehrungsform', 'mealsplit'].forEach(name => {
        const val = data['radio_' + name];
        if (val) {
            const el = document.querySelector(`input[name="${name}"][value="${val}"]`);
            if (el) el.checked = true;
        }
    });

    ['ziel', 'sportart', 'umstaende', 'allergie'].forEach(name => {
        const vals = data['check_' + name] || [];
        document.querySelectorAll(`input[name="${name}"]`).forEach(el => {
            el.checked = vals.includes(el.value);
        });
    });

    if ((data['check_ziel'] || []).includes('fatloss')) {
        document.getElementById('weightlossRateGroup').style.display = 'block';
    }

    Object.keys(FOODS).forEach(catKey => {
        const vals = data['food_' + catKey] || [];
        const inputName = catKey === 'oele' ? 'oil' : `food_${catKey}`;
        document.querySelectorAll(`input[name="${inputName}"]`).forEach(el => {
            el.checked = vals.includes(el.value);
        });
    });
}

function clearSavedData() {
    if (confirm('Clear all saved data? This will reset all your inputs.')) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}

function initAutoSave() {
    document.addEventListener('change', () => {
        setTimeout(saveToStorage, 100);
    });
    document.addEventListener('input', (e) => {
        if (e.target.matches('input[type="text"], input[type="number"], input[type="range"]')) {
            setTimeout(saveToStorage, 300);
        }
    });
}

// ==========================================
// STATE
// ==========================================
let state = {
    profile: {},
    results: {},
    macros: {},
    preferences: {},
    weekPlan: [],
    currentDay: 0,
    trackerItems: [],
    waterGlasses: 0,
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initForm();
    initGoalToggle();
    initWeightLossSlider();
    initFoodSelection();
    initDayTabs();
    initTracker();
    loadFromStorage();
    loadWaterTracker();
    renderWaterTracker();
    initAutoSave();
    renderHistory();
    renderCharts();
});

function initNavigation() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });
}

function initForm() {
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        calculateResults();
    });
}

function initGoalToggle() {
    document.querySelectorAll('input[name="ziel"]').forEach(cb => {
        cb.addEventListener('change', () => {
            const fatlossChecked = document.querySelector('input[name="ziel"][value="fatloss"]').checked;
            document.getElementById('weightlossRateGroup').style.display = fatlossChecked ? 'block' : 'none';
        });
    });
}

function initWeightLossSlider() {
    const slider = document.getElementById('weightlossRate');
    const display = document.getElementById('weightlossRateValue');
    slider.addEventListener('input', () => {
        display.textContent = parseFloat(slider.value).toFixed(2) + ' kg/week';
    });
}

function initFoodSelection() {
    const container = document.getElementById('foodCategories');
    const oilContainer = document.getElementById('oilSelection');

    Object.entries(FOODS).forEach(([key, category]) => {
        if (key === 'oele') {
            Object.keys(category.items).forEach(name => {
                const label = document.createElement('label');
                label.className = 'checkbox-card';
                label.innerHTML = `<input type="checkbox" name="oil" value="${name}" checked><span>${name}</span>`;
                oilContainer.appendChild(label);
            });
            return;
        }

        const div = document.createElement('div');
        div.className = 'food-category open';
        div.innerHTML = `
            <div class="food-category-header" onclick="this.parentElement.classList.toggle('open')">
                <span>${category.label}</span>
                <span class="toggle">&#9660;</span>
            </div>
            <div class="food-category-body">
                <div class="food-items">
                    ${Object.keys(category.items).map(name => `
                        <label class="food-item">
                            <input type="checkbox" name="food_${key}" value="${name}">
                            <span>${name}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function initDayTabs() {
    // Will be dynamically created when meal plan is generated
}

// ==========================================
// CALCULATIONS
// ==========================================
function calculateResults() {
    const goals = Array.from(document.querySelectorAll('input[name="ziel"]:checked')).map(el => el.value);

    const profile = {
        name: document.getElementById('name').value || 'User',
        alter: parseInt(document.getElementById('alter').value),
        geschlecht: document.querySelector('input[name="geschlecht"]:checked')?.value,
        groesse: parseInt(document.getElementById('groesse').value),
        gewicht: parseFloat(document.getElementById('gewicht').value),
        zielgewicht: parseFloat(document.getElementById('zielgewicht').value),
        koerperfett: parseFloat(document.getElementById('koerperfett').value) || null,
        aktivitaet: parseFloat(document.getElementById('aktivitaet').value),
        sportarten: Array.from(document.querySelectorAll('input[name="sportart"]:checked')).map(el => el.value),
        goals: goals,
        weightlossRate: goals.includes('fatloss') ? parseFloat(document.getElementById('weightlossRate').value) : 0,
        umstaende: Array.from(document.querySelectorAll('input[name="umstaende"]:checked')).map(el => el.value),
        allergien: Array.from(document.querySelectorAll('input[name="allergie"]:checked')).map(el => el.value),
    };

    if (!profile.geschlecht || !profile.alter || !profile.groesse || !profile.gewicht || !profile.aktivitaet || goals.length === 0) {
        alert('Please fill in all required fields and select at least one goal.');
        return;
    }

    state.profile = profile;

    // BMI
    const heightM = profile.groesse / 100;
    const bmi = profile.gewicht / (heightM * heightM);

    // BMR (Mifflin-St Jeor)
    let bmr;
    if (profile.geschlecht === 'male') {
        bmr = 10 * profile.gewicht + 6.25 * profile.groesse - 5 * profile.alter + 5;
    } else {
        bmr = 10 * profile.gewicht + 6.25 * profile.groesse - 5 * profile.alter - 161;
    }

    // Adjustments for special conditions
    let bmrAdjust = 1.0;
    if (profile.umstaende.includes('menopause')) bmrAdjust -= 0.05;
    if (profile.umstaende.includes('thyroid')) bmrAdjust -= 0.05;
    if (profile.umstaende.includes('stress')) bmrAdjust -= 0.03;
    bmr *= bmrAdjust;

    // TDEE
    const tdee = Math.round(bmr * profile.aktivitaet);

    // === CALORIE TARGET ===
    let targetKcal;
    let targetDetail;
    const hasFatloss = goals.includes('fatloss');
    const hasMuscle = goals.includes('muscle');
    const hasMaintain = goals.includes('maintain');

    if (hasFatloss && hasMuscle) {
        const dailyDeficit = Math.round(profile.weightlossRate * 7700 / 7);
        const adjustedDeficit = Math.round(dailyDeficit * 0.80);
        targetKcal = tdee - adjustedDeficit;
        targetDetail = `Recomp: -${adjustedDeficit} kcal/day (${profile.weightlossRate} kg fat loss/week + muscle support)`;
    } else if (hasFatloss) {
        const dailyDeficit = Math.round(profile.weightlossRate * 7700 / 7);
        targetKcal = tdee - dailyDeficit;
        targetDetail = `Fat loss: -${dailyDeficit} kcal/day (target ${profile.weightlossRate} kg/week)`;
    } else if (hasMuscle) {
        targetKcal = Math.round(tdee * 1.10);
        targetDetail = '+10% caloric surplus for muscle building';
    } else if (hasMaintain) {
        targetKcal = tdee;
        targetDetail = 'Maintenance calories';
    } else {
        targetKcal = tdee;
        targetDetail = 'Maintenance calories';
    }

    if (targetKcal < Math.round(bmr)) {
        targetKcal = Math.round(bmr);
        targetDetail += ' (raised to BMR minimum)';
    }

    // === MACRO CALCULATION ===
    let proteinPerKg;
    if (hasMuscle || profile.sportarten.includes('strength')) {
        proteinPerKg = 2.2;
    } else if (hasFatloss) {
        proteinPerKg = 1.8;
    } else {
        proteinPerKg = 1.4;
    }
    if (hasFatloss && hasMuscle) proteinPerKg = 2.2;

    const proteinGrams = Math.round(profile.gewicht * proteinPerKg);
    const proteinKcal = proteinGrams * 4;
    const proteinPercent = Math.round((proteinKcal / targetKcal) * 100);

    let fatPercent = 30;
    if (hasFatloss && !hasMuscle) fatPercent = 28;
    if (profile.umstaende.includes('menopause')) fatPercent = 32;
    const fatKcal = Math.round(targetKcal * fatPercent / 100);
    const fatGrams = Math.round(fatKcal / 9);

    const carbsKcal = Math.max(targetKcal - proteinKcal - fatKcal, 0);
    const carbsGrams = Math.round(carbsKcal / 4);
    const carbsPercent = Math.round((carbsKcal / targetKcal) * 100);

    let fiberTarget = 30;
    if (profile.umstaende.includes('digestion')) fiberTarget = 35;

    state.results = { bmi, bmr: Math.round(bmr), tdee, targetKcal, targetDetail };
    state.macros = {
        protein: { grams: proteinGrams, kcal: proteinKcal, percent: proteinPercent },
        carbs: { grams: carbsGrams, kcal: carbsKcal, percent: carbsPercent },
        fats: { grams: fatGrams, kcal: fatKcal, percent: fatPercent },
        fiber: { grams: fiberTarget }
    };

    renderResults();
    showSection('ergebnis');
}

// ==========================================
// RENDER RESULTS
// ==========================================
function renderResults() {
    const { bmi, bmr, tdee, targetKcal, targetDetail } = state.results;
    const { protein, carbs, fats, fiber } = state.macros;

    document.getElementById('resultBMI').textContent = bmi.toFixed(1);
    let bmiCategory;
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal weight';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';
    document.getElementById('resultBMIDetail').textContent = bmiCategory;

    const bmiPos = Math.min(Math.max((bmi - 16) / (40 - 16) * 100, 0), 100);
    document.getElementById('bmiIndicator').style.left = `calc(${bmiPos}% - 8px)`;

    document.getElementById('resultBMR').textContent = bmr + ' kcal';
    document.getElementById('resultTDEE').textContent = tdee + ' kcal';
    document.getElementById('resultTarget').textContent = targetKcal + ' kcal';
    document.getElementById('resultTargetDetail').textContent = targetDetail;

    const badgeContainer = document.getElementById('goalBadgeContainer');
    const goalLabels = {
        fatloss: { label: '&#128293; Fat Loss', cls: 'fatloss' },
        muscle: { label: '&#128170; Muscle Building', cls: 'muscle' },
        maintain: { label: '&#9878; Maintain', cls: 'maintain' },
        wellbeing: { label: '&#127804; Wellbeing', cls: 'wellbeing' }
    };
    badgeContainer.innerHTML = state.profile.goals.map(g => {
        const info = goalLabels[g];
        return info ? `<span class="goal-badge ${info.cls}">${info.label}</span>` : '';
    }).join('');

    renderMacroRing('protein', protein.percent, protein.grams, protein.kcal);
    renderMacroRing('carbs', carbs.percent, carbs.grams, carbs.kcal);
    renderMacroRing('fats', fats.percent, fats.grams, fats.kcal);

    document.getElementById('fiberPercent').textContent = fiber.grams + 'g';
    document.getElementById('fiberGrams').textContent = fiber.grams + ' g';
    document.getElementById('fiberRing').style.strokeDashoffset = 251.2 * 0.5;

    const waterLiters = (state.profile.gewicht * 35 / 1000).toFixed(1);
    document.getElementById('waterTarget').textContent = waterLiters + ' liters (' + Math.round(state.profile.gewicht * 35) + ' ml)';

    renderHints();
}

function renderMacroRing(id, percent, grams, kcal) {
    document.getElementById(id + 'Percent').textContent = percent + '%';
    document.getElementById(id + 'Grams').textContent = grams + ' g';
    document.getElementById(id + 'Kcal').textContent = kcal + ' kcal';
    const ring = document.getElementById(id + 'Ring');
    setTimeout(() => { ring.style.strokeDashoffset = 251.2 * (1 - percent / 100); }, 300);
}

function renderHints() {
    const hints = [];
    const p = state.profile;
    const m = state.macros;

    // === GOAL-BASED EDUCATIONAL HINTS ===

    if (p.goals.includes('muscle') && !p.goals.includes('fatloss')) {
        hints.push({
            icon: '&#128170;',
            text: `<strong>Muscle Building - How it affects your plan:</strong><br>
            <span class="hint-effect">&#10132; Your calories are set ${Math.round(state.results.targetKcal - state.results.tdee)} kcal <em>above</em> your maintenance (+10% surplus).</span><br>
            <span class="hint-effect">&#10132; Protein is set to ${m.protein.grams}g/day (2.2g per kg body weight).</span><br>
            <span class="hint-why"><strong>Why?</strong> Building muscle tissue requires extra energy (caloric surplus) and amino acids (protein). Without a surplus, your body lacks the building blocks for new muscle. The 2.2g/kg protein target is based on research showing this is the upper threshold where muscle protein synthesis is maximized. Going higher provides no additional benefit. The +10% surplus is moderate - enough for muscle growth while minimizing fat gain.</span>`
        });
    }

    if (p.goals.includes('fatloss') && p.goals.includes('muscle')) {
        const adjustedDeficit = Math.round(p.weightlossRate * 7700 / 7 * 0.80);
        hints.push({
            icon: '&#128170;&#128293;',
            text: `<strong>Body Recomposition - The Science:</strong><br>
            <span class="hint-effect">&#10132; Deficit reduced to -${adjustedDeficit} kcal/day (80% of a pure fat-loss deficit).</span><br>
            <span class="hint-effect">&#10132; Protein maximized at ${m.protein.grams}g/day (2.2g/kg) to preserve & build muscle.</span><br>
            <span class="hint-why"><strong>Why?</strong> Body recomposition (losing fat while gaining muscle) is possible but requires precision. A smaller deficit gives your body enough energy to support muscle protein synthesis while still losing fat. Research shows that higher protein intakes (1.8-2.2g/kg) during a caloric deficit significantly reduce muscle loss. Your body can redirect stored fat energy toward muscle building - but only if protein is high enough and the deficit isn't too aggressive. Strength training is essential: it provides the stimulus that tells your body to keep (and build) muscle instead of breaking it down.</span>`
        });
    }

    if (p.goals.includes('fatloss') && !p.goals.includes('muscle')) {
        const dailyDeficit = Math.round(p.weightlossRate * 7700 / 7);
        hints.push({
            icon: '&#128293;',
            text: `<strong>Fat Loss - How your plan is calculated:</strong><br>
            <span class="hint-effect">&#10132; Daily deficit: -${dailyDeficit} kcal (target: ${p.weightlossRate} kg/week).</span><br>
            <span class="hint-effect">&#10132; Protein set to ${m.protein.grams}g/day (1.8g/kg) - higher than normal to protect muscle.</span><br>
            <span class="hint-why"><strong>Why?</strong> 1 kg of body fat stores approximately 7,700 kcal. So to lose ${p.weightlossRate} kg per week, you need a daily deficit of ~${dailyDeficit} kcal. Your protein is elevated because during a caloric deficit, your body may break down muscle for energy. High protein intake (1.6-2.0g/kg) has been shown in multiple studies to significantly preserve lean mass during weight loss. The 5-hour gaps between meals allow insulin to drop, which promotes fat oxidation (burning). No snacking is critical - every snack spikes insulin and stops fat burning.</span>`
        });
    }

    if (p.goals.includes('maintain')) {
        hints.push({
            icon: '&#9878;',
            text: `<strong>Weight Maintenance - Your TDEE explained:</strong><br>
            <span class="hint-effect">&#10132; Calories set at ${state.results.targetKcal} kcal (= your Total Daily Energy Expenditure).</span><br>
            <span class="hint-effect">&#10132; Balanced macros: ${m.protein.percent}% protein, ${m.carbs.percent}% carbs, ${m.fats.percent}% fats.</span><br>
            <span class="hint-why"><strong>Why?</strong> Your TDEE (${state.results.tdee} kcal) is calculated from your Basal Metabolic Rate (${state.results.bmr} kcal - the energy your body needs at complete rest) multiplied by your activity factor (${p.aktivitaet}). Eating at TDEE means energy in = energy out, maintaining your current weight. The ${m.protein.grams}g protein (${(m.protein.grams/p.gewicht).toFixed(1)}g/kg) is sufficient to maintain muscle mass and support daily recovery.</span>`
        });
    }

    if (p.goals.includes('wellbeing')) {
        hints.push({
            icon: '&#127804;',
            text: `<strong>General Wellbeing - Nutrition as Medicine:</strong><br>
            <span class="hint-effect">&#10132; Focus on nutrient density, variety, and meal timing.</span><br>
            <span class="hint-effect">&#10132; Fiber target: ${m.fiber.grams}g/day for gut health.</span><br>
            <span class="hint-why"><strong>Why?</strong> Modern nutritional science increasingly views food as medicine. The 3-meal structure with 5-hour gaps isn't just about weight - it regulates your circadian insulin rhythm, which affects energy, mood, and sleep quality. Starting each meal with protein stabilizes blood sugar for hours, preventing the energy crashes that come from carb-first eating. The "one apple before bed" rule provides pectin, a prebiotic fiber that feeds beneficial gut bacteria overnight. Your gut microbiome influences everything from immune function to serotonin production (95% of serotonin is made in the gut!).</span>`
        });
    }

    // === CONDITION-BASED EDUCATIONAL HINTS ===

    if (p.umstaende.includes('thyroid')) {
        hints.push({
            icon: '&#129516;',
            text: `<strong>Thyroid Issues - Impact on your metabolism:</strong><br>
            <span class="hint-effect">&#10132; Your BMR has been reduced by 5% (from ${Math.round(state.results.bmr / 0.95)} to ${state.results.bmr} kcal).</span><br>
            <span class="hint-effect">&#10132; Meal plan includes iodine and selenium-rich foods when available.</span><br>
            <span class="hint-why"><strong>Why?</strong> Your thyroid gland produces hormones (T3 and T4) that directly regulate your metabolic rate - essentially how fast your body burns calories. With thyroid issues (especially hypothyroidism), this rate drops, meaning your body needs fewer calories than the standard formula predicts. We reduce your BMR by 5% to account for this. <em>Key nutrients:</em> Iodine is the raw material for thyroid hormones (found in fish, seaweed, dairy). Selenium is needed by the enzyme that converts T4 into the active T3 form (Brazil nuts are the richest source - just 1-2 per day). Zinc also supports thyroid function (pumpkin seeds, legumes).</span>`
        });
    }

    if (p.umstaende.includes('menopause')) {
        hints.push({
            icon: '&#127804;',
            text: `<strong>Menopause - Metabolic changes & your plan:</strong><br>
            <span class="hint-effect">&#10132; BMR reduced by 5% (hormonal metabolic slowdown).</span><br>
            <span class="hint-effect">&#10132; Fat ratio increased to ${m.fats.percent}% (vs. standard 30%).</span><br>
            <span class="hint-why"><strong>Why?</strong> During menopause, declining estrogen levels cause several metabolic shifts: (1) BMR decreases ~5-10% because estrogen normally supports metabolic rate, (2) the body tends to redistribute fat toward the abdomen, and (3) bone density decreases. The higher fat intake supports hormone production - your body still makes estrogen in smaller amounts via fat tissue and adrenal glands, and dietary fat is the precursor for all steroid hormones. <em>Focus foods:</em> Phytoestrogens (flaxseed, soy) can mildly mimic estrogen. Calcium + Vitamin D are critical for bone health. Strength training is the single most effective intervention against both muscle and bone loss during menopause.</span>`
        });
    }

    if (p.umstaende.includes('diabetes')) {
        hints.push({
            icon: '&#128137;',
            text: `<strong>Insulin Resistance / Diabetes - Your plan adjustments:</strong><br>
            <span class="hint-effect">&#10132; Carbs distributed evenly across all 3 meals (no carb-heavy single meals).</span><br>
            <span class="hint-effect">&#10132; Complex carbs only (whole grains, legumes). 5h meal gaps enforced.</span><br>
            <span class="hint-why"><strong>Why?</strong> Insulin resistance means your cells respond poorly to insulin, so your pancreas must produce more to clear blood sugar. Large carb loads worsen this - they spike blood sugar, requiring even more insulin. By spreading carbs evenly and choosing complex sources (low glycemic index), you create smaller, slower blood sugar rises. Eating protein first is especially important for you: protein triggers a small insulin response that "primes" your cells, making them more receptive when carbs arrive later in the meal. The 5-hour gap between meals allows insulin to return to baseline - this is when your body can switch to fat burning. Constant snacking keeps insulin perpetually elevated, worsening resistance over time.</span>`
        });
    }

    if (p.umstaende.includes('digestion')) {
        hints.push({
            icon: '&#129756;',
            text: `<strong>Digestive Health / IBS - Fiber & gut strategy:</strong><br>
            <span class="hint-effect">&#10132; Fiber target increased to ${m.fiber.grams}g/day (vs. standard 30g).</span><br>
            <span class="hint-effect">&#10132; Emphasis on fermented foods and diverse fiber sources.</span><br>
            <span class="hint-why"><strong>Why?</strong> Your gut hosts ~100 trillion bacteria (the microbiome) that influence digestion, immunity, and even mood. Fiber is their primary food source - without it, they start breaking down your gut lining instead. There are two types: <em>soluble fiber</em> (oats, legumes, apples) forms a gel that slows digestion and feeds beneficial bacteria. <em>Insoluble fiber</em> (vegetables, whole grains) adds bulk and promotes regular bowel movements. Important: increase fiber gradually (5g more per week) to avoid bloating. The 5-hour gaps are therapeutic here - they trigger the "migrating motor complex" (MMC), a cleansing wave that sweeps through your intestines between meals, clearing debris. Constant eating suppresses this natural cleaning mechanism.</span>`
        });
    }

    if (p.umstaende.includes('stress')) {
        hints.push({
            icon: '&#128164;',
            text: `<strong>High Stress - Cortisol & nutrition:</strong><br>
            <span class="hint-effect">&#10132; BMR reduced by 3% (stress-induced metabolic adaptation).</span><br>
            <span class="hint-effect">&#10132; Focus on magnesium, B-vitamins, and blood-sugar-stabilizing meals.</span><br>
            <span class="hint-why"><strong>Why?</strong> Chronic stress elevates cortisol, your primary stress hormone. Elevated cortisol has several effects: (1) it promotes abdominal fat storage, (2) it increases appetite and cravings for high-calorie foods, (3) it can break down muscle tissue for energy (catabolic), and (4) it can reduce your metabolic rate over time. <em>Nutritional counter-strategy:</em> Magnesium (found in nuts, spinach, dark chocolate) is nature's relaxation mineral - it calms the nervous system and is depleted faster under stress. B-vitamins (whole grains, eggs, legumes) support neurotransmitter production. Regular, balanced meals prevent the blood sugar crashes that trigger additional cortisol release. A structured 3-meal approach with 5h gaps provides stable energy without the stress of constant meal decisions.</span>`
        });
    }

    // === SPORT-BASED EDUCATIONAL HINTS ===

    if (p.sportarten.includes('strength')) {
        hints.push({
            icon: '&#127947;',
            text: `<strong>Strength Training - Protein timing & muscle science:</strong><br>
            <span class="hint-effect">&#10132; Protein: ${m.protein.grams}g/day (~${(m.protein.grams/3).toFixed(0)}g per meal across 3 meals).</span><br>
            <span class="hint-effect">&#10132; Each meal prioritizes a protein source first (Rule #3).</span><br>
            <span class="hint-why"><strong>Why?</strong> After strength training, your muscle fibers have micro-tears that need repair. This repair process (muscle protein synthesis, or MPS) requires amino acids from dietary protein. Research shows MPS is maximized at ~0.4g protein per kg per meal, which is why we distribute your ${m.protein.grams}g evenly across 3 meals (~${(m.protein.grams/3).toFixed(0)}g each) rather than loading one meal. MPS stays elevated for 24-48 hours after training, so consistent daily protein matters more than a single post-workout shake. The leucine threshold (~2.5-3g) is key - it's the amino acid that "triggers" MPS. Animal proteins (eggs, dairy, meat, fish) are leucine-rich; plant sources may need larger portions to hit this threshold.</span>`
        });
    }

    if (p.sportarten.includes('cardio')) {
        hints.push({
            icon: '&#127939;',
            text: `<strong>Cardio / Endurance - Fueling your training:</strong><br>
            <span class="hint-effect">&#10132; Carbohydrate intake: ${m.carbs.grams}g/day for glycogen replenishment.</span><br>
            <span class="hint-effect">&#10132; Pre-training meal should include complex carbs.</span><br>
            <span class="hint-why"><strong>Why?</strong> During cardio, your primary fuel sources are muscle glycogen (stored carbohydrates) and fat. At moderate intensity, your body uses roughly a 50/50 mix. Your muscles can store ~300-500g of glycogen, and depleted stores lead to fatigue ("hitting the wall"). Carbohydrates before training top off glycogen stores. For sessions under 60 minutes, your normal meal plan provides sufficient fuel - just ensure you eat 2-3 hours before. For longer sessions, consider placing your carb-heaviest meal before training. Interestingly, maintaining 5-hour gaps between meals trains your body to be more efficient at fat oxidation - this actually improves your endurance capacity over time.</span>`
        });
    }

    if (p.sportarten.includes('yoga')) {
        hints.push({
            icon: '&#129496;',
            text: `<strong>Yoga / Pilates - Mindful nutrition synergy:</strong><br>
            <span class="hint-effect">&#10132; Light, nutrient-dense meals that don't weigh you down.</span><br>
            <span class="hint-why"><strong>Why?</strong> Yoga and Pilates emphasize body awareness - and this extends to eating. This aligns beautifully with evidence-based nutrition: mindful eating (starting with protein, eating slowly) enhances the parasympathetic "rest and digest" state. Magnesium-rich foods (nuts, leafy greens) support flexibility by helping muscles relax after contraction. Adequate hydration is especially important - even mild dehydration (2%) reduces flexibility and balance. Practice on a mostly empty stomach for best results (2-3h after eating).</span>`
        });
    }

    if (p.sportarten.includes('swimming')) {
        hints.push({
            icon: '&#127946;',
            text: `<strong>Swimming - Full-body demands:</strong><br>
            <span class="hint-effect">&#10132; Higher caloric needs due to thermoregulation in water.</span><br>
            <span class="hint-why"><strong>Why?</strong> Swimming burns more calories than many other activities because water conducts heat ~25x faster than air - your body works harder to maintain core temperature. This means swimmers often have slightly higher energy needs than the activity level alone suggests. Post-swim hunger is very real and physiological, not just psychological. Ensure adequate protein for the full-body muscle engagement and sufficient carbs if swimming for more than 45 minutes. Eat within 1-2 hours after swimming for optimal recovery.</span>`
        });
    }

    // === ALLERGY/INTOLERANCE EDUCATIONAL HINTS ===

    if (p.allergien.includes('lactose')) {
        hints.push({
            icon: '&#129371;',
            text: `<strong>Lactose Intolerance - Calcium strategy:</strong><br>
            <span class="hint-effect">&#10132; Dairy-based proteins replaced with lactose-free alternatives where possible.</span><br>
            <span class="hint-why"><strong>Why?</strong> Lactose intolerance means your body produces insufficient lactase, the enzyme that breaks down lactose (milk sugar). Undigested lactose ferments in the colon, causing gas, bloating, and discomfort. <em>Important:</em> You still need calcium (~1000mg/day). Non-dairy sources: broccoli (47mg/100g), almonds (264mg/100g), kale (150mg/100g), canned sardines with bones (382mg/100g). Note: fermented dairy (yogurt, aged cheese) is often tolerated because bacteria pre-digest much of the lactose. Harzer cheese is virtually lactose-free despite being dairy.</span>`
        });
    }

    if (p.allergien.includes('gluten')) {
        hints.push({
            icon: '&#127838;',
            text: `<strong>Gluten Intolerance - Carb alternatives:</strong><br>
            <span class="hint-effect">&#10132; Wheat, rye, barley, and spelt removed from carb sources.</span><br>
            <span class="hint-effect">&#10132; Plan uses: rice, potatoes, quinoa, buckwheat, millet, corn.</span><br>
            <span class="hint-why"><strong>Why?</strong> Gluten is a protein found in wheat, rye, and barley that triggers an immune response in sensitive individuals, damaging the small intestine's villi (absorptive surface). This impairs nutrient absorption - iron, calcium, B12, and folate deficiencies are common. The good news: many naturally gluten-free grains are nutritionally superior. Quinoa has more protein than wheat. Buckwheat (despite the name, not wheat!) is rich in rutin, which strengthens blood vessels. Oats are naturally gluten-free but often cross-contaminated - look for certified GF oats if you tolerate them.</span>`
        });
    }

    if (p.allergien.includes('fructose')) {
        hints.push({
            icon: '&#127815;',
            text: `<strong>Fructose Intolerance - Fruit selection matters:</strong><br>
            <span class="hint-effect">&#10132; Low-fructose fruits preferred (berries, kiwi, citrus).</span><br>
            <span class="hint-why"><strong>Why?</strong> Fructose malabsorption means your small intestine struggles to absorb fructose efficiently. When excess fructose reaches the colon, bacteria ferment it, causing bloating and discomfort. Key insight: the fructose-to-glucose ratio matters more than total fructose. Foods with equal or more glucose than fructose are better tolerated because glucose aids fructose absorption. Berries, kiwi, and bananas have favorable ratios. Apples, pears, and mangoes are high in excess fructose. The "apple a day" recommendation can be adapted - substitute with a banana or a handful of berries.</span>`
        });
    }

    if (p.allergien.includes('histamine')) {
        hints.push({
            icon: '&#129472;',
            text: `<strong>Histamine Intolerance - Freshness is key:</strong><br>
            <span class="hint-effect">&#10132; Avoid aged, fermented, and long-stored foods.</span><br>
            <span class="hint-why"><strong>Why?</strong> Histamine is naturally present in all foods and increases with age/fermentation. Your body normally breaks it down with the enzyme diamine oxidase (DAO). With histamine intolerance, DAO activity is reduced, causing headaches, flushing, digestive issues, or skin reactions. <em>High histamine:</em> aged cheese, canned fish, sauerkraut, vinegar, wine, cured meats. <em>Low histamine:</em> fresh meat/fish (cook immediately after buying), fresh vegetables, rice, potatoes, most fresh fruits. Tip: cook fresh and eat immediately - leftovers accumulate histamine quickly.</span>`
        });
    }

    // === BMI-BASED EDUCATIONAL HINT ===
    const bmi = state.results.bmi;
    if (bmi < 18.5) {
        hints.push({
            icon: '&#9888;',
            text: `<strong>Underweight (BMI ${bmi.toFixed(1)}) - Important note:</strong><br>
            <span class="hint-why">A BMI below 18.5 can indicate insufficient nutrient reserves. If unintentional, please consult a healthcare professional. For healthy weight gain, focus on calorie-dense nutrient-rich foods: nuts, avocados, olive oil, whole grains, and adequate protein. Gaining weight healthily means adding muscle, not just fat - combine a caloric surplus with resistance training.</span>`
        });
    }

    // === GENERAL EDUCATIONAL HINT (always shown) ===
    hints.push({
        icon: '&#129504;',
        text: `<strong>Understanding Your Numbers:</strong><br>
        Your <em>Basal Metabolic Rate</em> (BMR: ${state.results.bmr} kcal) is the energy your body burns just existing - breathing, circulation, cell repair. It accounts for ~60-70% of daily calorie burn. Your <em>TDEE</em> (${state.results.tdee} kcal) adds your physical activity on top. The macros are calculated as: <strong>Protein</strong> (${m.protein.grams}g = ${(m.protein.grams/p.gewicht).toFixed(1)}g per kg body weight), <strong>Fats</strong> (${m.fats.percent}% of calories = ${m.fats.grams}g, essential for hormone production and vitamin absorption), <strong>Carbs</strong> (${m.carbs.grams}g = the remaining calories, your body's preferred energy source).`
    });

    const grid = document.getElementById('hintsGrid');
    grid.innerHTML = hints.map(h => `
        <div class="hint-card">
            <div class="hint-icon">${h.icon}</div>
            <div class="hint-text">${h.text}</div>
        </div>
    `).join('');
    document.getElementById('hintsSection').style.display = hints.length > 0 ? 'block' : 'none';
}

// ==========================================
// SHOW/HIDE SECTIONS
// ==========================================
function showSection(id) {
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).querySelectorAll('.section-header, .form-card, .result-card, .macro-card').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = '';
    });
    setTimeout(() => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ==========================================
// MEAL PLAN GENERATION
// ==========================================
function generateMealPlan() {
    const diet = document.querySelector('input[name="ernaehrungsform"]:checked')?.value || 'omnivore';
    const mealSplit = (document.querySelector('input[name="mealsplit"]:checked')?.value || '30-40-30').split('-').map(Number);
    const numDays = parseInt(document.getElementById('planDays').value) || 7;

    const selectedFoods = {};
    Object.keys(FOODS).forEach(catKey => {
        if (catKey === 'oele') {
            selectedFoods.oele = Array.from(document.querySelectorAll('input[name="oil"]:checked')).map(el => el.value);
            if (selectedFoods.oele.length === 0) selectedFoods.oele = Object.keys(FOODS.oele.items);
            return;
        }
        const checked = Array.from(document.querySelectorAll(`input[name="food_${catKey}"]:checked`)).map(el => el.value);
        const filtered = checked.filter(name => {
            const food = FOODS[catKey]?.items[name];
            return food && food.tags.includes(diet);
        });
        if (filtered.length === 0) {
            selectedFoods[catKey] = Object.entries(FOODS[catKey].items)
                .filter(([, food]) => food.tags.includes(diet))
                .map(([name]) => name);
        } else {
            selectedFoods[catKey] = filtered;
        }
    });

    state.preferences = { diet, mealSplit, selectedFoods };

    const allDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
                         'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14'];
    const shortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
                        'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14'];

    const weekPlan = [];
    for (let d = 0; d < numDays; d++) {
        const dayPlan = generateDayPlan(mealSplit, selectedFoods, d);
        weekPlan.push({ name: allDayNames[d], meals: dayPlan });
    }

    state.weekPlan = weekPlan;

    // Build day tabs dynamically
    const dayTabsContainer = document.getElementById('dayTabs');
    dayTabsContainer.innerHTML = '';
    for (let d = 0; d < numDays; d++) {
        const btn = document.createElement('button');
        btn.className = 'day-tab' + (d === 0 ? ' active' : '');
        btn.dataset.day = d;
        btn.textContent = shortNames[d];
        btn.addEventListener('click', () => {
            document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            state.currentDay = d;
            renderDayPlan(d);
        });
        dayTabsContainer.appendChild(btn);
    }

    showSection('mealplan');

    const p = state.profile;
    const daysText = numDays === 1 ? '1 day' : numDays + ' days';
    document.getElementById('mealplanSubtitle').textContent =
        `For ${p.name} | ${state.results.targetKcal} kcal/day | ${state.macros.protein.grams}g P / ${state.macros.carbs.grams}g C / ${state.macros.fats.grams}g F | ${daysText}`;

    renderDayPlan(0);
    state.currentDay = 0;

    // Also show tracker section
    document.getElementById('tracker').classList.remove('hidden');
}

function generateDayPlan(mealSplit, selectedFoods, daySeed) {
    const targetKcal = state.results.targetKcal;
    const targetProtein = state.macros.protein.grams;
    const targetCarbs = state.macros.carbs.grams;
    const targetFat = state.macros.fats.grams;

    const mealNames = ['Breakfast', 'Lunch', 'Dinner'];
    const meals = [];

    const usedProteins = new Set();

    for (let m = 0; m < 3; m++) {
        const fraction = mealSplit[m] / 100;
        const mealTargets = {
            kcal: Math.round(targetKcal * fraction),
            protein: Math.round(targetProtein * fraction),
            carbs: Math.round(targetCarbs * fraction),
            fat: Math.round(targetFat * fraction),
        };

        const isBreakfast = (m === 0);
        const mealItems = buildMeal(m, mealTargets, selectedFoods, daySeed, isBreakfast, usedProteins);

        meals.push({
            name: mealNames[m],
            targetKcal: mealTargets.kcal,
            items: mealItems
        });
    }

    return meals;
}

function buildMeal(mealIndex, targets, selectedFoods, daySeed, isBreakfast, usedProteins) {
    const items = [];
    let remainP = targets.protein;
    let remainC = targets.carbs;
    let remainF = targets.fat;

    const pick = (arr, offset = 0, filterFn = null) => {
        let filtered = filterFn ? arr.filter(filterFn) : arr;
        if (filtered.length === 0) filtered = arr;
        if (filtered.length === 0) return null;
        return filtered[(daySeed * 7 + mealIndex * 3 + offset) % filtered.length];
    };

    // 1) PROTEIN SOURCE
    const protSources = selectedFoods.proteinquellen || [];
    const protName = pick(protSources, 0, (name) => {
        const food = findFood(name);
        if (!food) return false;
        if (isBreakfast && !food.breakfast) return false;
        if (usedProteins.has(name)) return false;
        return true;
    });

    if (protName) {
        usedProteins.add(protName);
        const food = findFood(protName);
        if (food) {
            const targetPGrams = Math.max(remainP * 0.9, 12);
            let grams = Math.round((targetPGrams / Math.max(food.protein, 1)) * 100);
            const maxGrams = isBreakfast ? 200 : 250;
            grams = Math.min(Math.max(grams, 40), maxGrams);
            items.push(makeItem(protName, grams, food));
            remainP -= (food.protein * grams / 100);
            remainC -= (food.carbs * grams / 100);
            remainF -= (food.fat * grams / 100);
        }
    }

    // 2) CARB SOURCE
    const carbSources = selectedFoods.kohlenhydrate || [];
    const carbName = pick(carbSources, 1, (name) => {
        const food = findFood(name);
        if (!food) return false;
        if (isBreakfast && !food.breakfast) return false;
        return true;
    });

    if (carbName && remainC > 8) {
        const food = findFood(carbName);
        if (food) {
            const targetCGrams = Math.max(remainC * 0.65, 10);
            let grams = Math.round((targetCGrams / Math.max(food.carbs, 1)) * 100);
            const isBread = food.kcal > 200 && food.fiber > 5;
            const maxG = isBread ? 80 : (isBreakfast ? 60 : 200);
            grams = Math.min(Math.max(grams, 20), maxG);
            items.push(makeItem(carbName, grams, food));
            remainP -= (food.protein * grams / 100);
            remainC -= (food.carbs * grams / 100);
            remainF -= (food.fat * grams / 100);
        }
    }

    // 3) VEGETABLE
    if (!isBreakfast) {
        const saladSources = selectedFoods.salate || [];
        const saladName = pick(saladSources, 6);
        if (saladName) {
            const food = findFood(saladName);
            if (food) {
                items.push(makeItem(saladName, 80, food));
                remainP -= (food.protein * 80 / 100);
                remainC -= (food.carbs * 80 / 100);
                remainF -= (food.fat * 80 / 100);
            }
        }

        const vegSources = selectedFoods.gemuese || [];
        const vegName = pick(vegSources, 2, (name) => {
            const food = findFood(name);
            return food && !food.breakfast;
        });
        if (vegName) {
            const food = findFood(vegName);
            if (food) {
                items.push(makeItem(vegName, 150, food));
                remainP -= (food.protein * 150 / 100);
                remainC -= (food.carbs * 150 / 100);
                remainF -= (food.fat * 150 / 100);
            }
        }
    } else {
        const bfVeg = pick(selectedFoods.gemuese || [], 2, (name) => {
            const food = findFood(name);
            return food && food.breakfast;
        });
        if (bfVeg) {
            const food = findFood(bfVeg);
            if (food) {
                items.push(makeItem(bfVeg, 80, food));
                remainC -= (food.carbs * 80 / 100);
            }
        }
    }

    // 4) FRUIT
    if (isBreakfast) {
        const fruitSources = selectedFoods.obst || [];
        const fruitName = pick(fruitSources, 3);
        if (fruitName) {
            const food = findFood(fruitName);
            if (food) {
                const grams = fruitName === 'Avocado' ? 50 : 120;
                items.push(makeItem(fruitName, grams, food));
                remainC -= (food.carbs * grams / 100);
                remainF -= (food.fat * grams / 100);
            }
        }
    }

    // 5) SEEDS/NUTS as topping (breakfast only, small amounts)
    // Rule #4: Only one protein source per meal — no legumes at lunch/dinner
    if (isBreakfast) {
        const seedSources = (selectedFoods.huelsenfruechte || []).filter(name => {
            const food = findFood(name);
            return food && food.breakfast;
        });
        const seedName = pick(seedSources, 4);
        if (seedName) {
            const food = findFood(seedName);
            if (food) {
                const grams = food.fat > 20 ? 10 : 12;
                items.push(makeItem(seedName, grams, food));
                remainP -= (food.protein * grams / 100);
                remainF -= (food.fat * grams / 100);
            }
        }
    } else {
        // For lunch/dinner: add extra vegetables instead of legumes to respect Rule #4
        const extraVeg = selectedFoods.gemuese || [];
        const extraVegName = pick(extraVeg, 4, (name) => {
            const food = findFood(name);
            if (!food) return false;
            // Pick a different vegetable than the one already added
            return !items.some(it => it.name === name);
        });
        if (extraVegName && remainC > 3) {
            const food = findFood(extraVegName);
            if (food) {
                items.push(makeItem(extraVegName, 100, food));
                remainP -= (food.protein * 100 / 100);
                remainC -= (food.carbs * 100 / 100);
            }
        }
    }

    // 6) OIL/FAT
    const oilSources = selectedFoods.oele || [];
    const oilName = pick(oilSources, 5);
    if (oilName && remainF > 2) {
        const food = findFood(oilName);
        if (food) {
            const grams = Math.min(Math.max(Math.round((Math.max(remainF, 0) / Math.max(food.fat, 1)) * 100), 3), 15);
            items.push(makeItem(oilName, grams, food));
        }
    }

    return items;
}

function findFood(name) {
    for (const cat of Object.values(FOODS)) {
        if (cat.items[name]) return cat.items[name];
    }
    return null;
}

function makeItem(name, grams, food) {
    grams = Math.round(grams);
    return {
        name,
        grams,
        kcal: Math.round(food.kcal * grams / 100),
        protein: Math.round(food.protein * grams / 100 * 10) / 10,
        carbs: Math.round(food.carbs * grams / 100 * 10) / 10,
        fat: Math.round(food.fat * grams / 100 * 10) / 10,
        fiber: Math.round(food.fiber * grams / 100 * 10) / 10,
    };
}

// ==========================================
// RENDER MEAL PLAN
// ==========================================
function renderDayPlan(dayIndex) {
    const day = state.weekPlan[dayIndex];
    if (!day) return;

    const planDiv = document.getElementById('dayPlan');
    planDiv.innerHTML = day.meals.map((meal, mi) => {
        const totals = sumItems(meal.items);
        const mealIcons = ['&#127749;', '&#9728;', '&#127769;'];
        const recipe = getRecipeName(mi, meal.items);
        return `
            <div class="meal-card">
                <div class="meal-card-header">
                    <span>${mealIcons[mi]} ${meal.name}</span>
                    <span style="display:flex;align-items:center;gap:0.5rem;">
                        <span class="meal-kcal">${Math.round(totals.kcal)} kcal</span>
                        <button onclick="swapMeal(${dayIndex}, ${mi})" title="Swap this meal"
                            style="width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:opacity 0.2s,background 0.2s;opacity:0.5;padding:0;line-height:1;"
                            onmouseover="this.style.opacity='1';this.style.background='rgba(255,255,255,0.12)'"
                            onmouseout="this.style.opacity='0.5';this.style.background='rgba(255,255,255,0.05)'"
                        >&#8635;</button>
                    </span>
                </div>
                <div class="meal-recipe-name">${recipe.name}</div>
                <div class="meal-card-body">
                    ${meal.items.map(item => `
                        <div class="meal-item">
                            <span class="meal-item-name">${item.name}</span>
                            <span class="meal-item-amount">${item.grams} g</span>
                        </div>
                    `).join('')}
                    <div class="meal-tip">${recipe.tip}</div>
                </div>
                <div class="meal-card-footer">
                    <div class="meal-macro p"><div class="meal-macro-value">${totals.protein.toFixed(1)}g</div><div class="meal-macro-label">Protein</div></div>
                    <div class="meal-macro c"><div class="meal-macro-value">${totals.carbs.toFixed(1)}g</div><div class="meal-macro-label">Carbs</div></div>
                    <div class="meal-macro f"><div class="meal-macro-value">${totals.fat.toFixed(1)}g</div><div class="meal-macro-label">Fat</div></div>
                    <div class="meal-macro fi"><div class="meal-macro-value">${totals.fiber.toFixed(1)}g</div><div class="meal-macro-label">Fiber</div></div>
                </div>
            </div>
        `;
    }).join('');

    const dayTotals = day.meals.reduce((acc, meal) => {
        const t = sumItems(meal.items);
        return { kcal: acc.kcal + t.kcal, protein: acc.protein + t.protein, carbs: acc.carbs + t.carbs, fat: acc.fat + t.fat, fiber: acc.fiber + t.fiber };
    }, { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

    document.getElementById('daySummary').innerHTML = `
        <div class="summary-item total"><div class="summary-value">${Math.round(dayTotals.kcal)}</div><div class="summary-label">kcal total</div></div>
        <div class="summary-item prot"><div class="summary-value">${dayTotals.protein.toFixed(1)}g</div><div class="summary-label">Protein</div></div>
        <div class="summary-item carb"><div class="summary-value">${dayTotals.carbs.toFixed(1)}g</div><div class="summary-label">Carbs</div></div>
        <div class="summary-item fat"><div class="summary-value">${dayTotals.fat.toFixed(1)}g</div><div class="summary-label">Fat</div></div>
        <div class="summary-item fib"><div class="summary-value">${dayTotals.fiber.toFixed(1)}g</div><div class="summary-label">Fiber</div></div>
    `;
}

function swapMeal(dayIndex, mealIndex) {
    const day = state.weekPlan[dayIndex];
    if (!day) return;

    const { mealSplit, selectedFoods } = state.preferences;
    const targetKcal = state.results.targetKcal;
    const targetProtein = state.macros.protein.grams;
    const targetCarbs = state.macros.carbs.grams;
    const targetFat = state.macros.fats.grams;

    const fraction = mealSplit[mealIndex] / 100;
    const mealTargets = {
        kcal: Math.round(targetKcal * fraction),
        protein: Math.round(targetProtein * fraction),
        carbs: Math.round(targetCarbs * fraction),
        fat: Math.round(targetFat * fraction),
    };

    // Collect used proteins from the OTHER meals of this day
    const usedProteins = new Set();
    day.meals.forEach((meal, mi) => {
        if (mi === mealIndex) return;
        meal.items.forEach(item => {
            const protSources = selectedFoods.proteinquellen || [];
            if (protSources.includes(item.name)) {
                usedProteins.add(item.name);
            }
        });
    });

    const isBreakfast = (mealIndex === 0);
    const newSeed = Date.now(); // random seed different from original

    const newItems = buildMeal(mealIndex, mealTargets, selectedFoods, newSeed, isBreakfast, usedProteins);

    day.meals[mealIndex].items = newItems;

    renderDayPlan(dayIndex);
}

function sumItems(items) {
    return items.reduce((acc, item) => ({
        kcal: acc.kcal + item.kcal, protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs, fat: acc.fat + item.fat, fiber: acc.fiber + item.fiber,
    }), { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
}

// ==========================================
// FOOD TRACKER (Reverse Tracking)
// ==========================================
let trackerSelectedFood = null;

function initTracker() {
    const input = document.getElementById('trackerFoodInput');
    const autocomplete = document.getElementById('trackerAutocomplete');
    const amountInput = document.getElementById('trackerAmount');
    const unitSelect = document.getElementById('trackerUnit');

    // Build flat food list for autocomplete
    const allFoodNames = [];
    Object.values(FOODS).forEach(cat => {
        Object.keys(cat.items).forEach(name => {
            if (!allFoodNames.includes(name)) allFoodNames.push(name);
        });
    });

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        if (query.length < 1) {
            autocomplete.classList.add('hidden');
            trackerSelectedFood = null;
            updateTrackerPreview();
            return;
        }

        const matches = allFoodNames.filter(name =>
            name.toLowerCase().includes(query)
        ).slice(0, 12);

        if (matches.length === 0) {
            autocomplete.classList.add('hidden');
            return;
        }

        autocomplete.innerHTML = matches.map(name => {
            const food = findFood(name);
            return `<div class="px-4 py-3 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0 transition-colors" data-food="${name}">
                <div class="font-medium text-sm text-slate-100">${name}</div>
                <div class="text-xs text-slate-400 mt-0.5">${food.kcal} kcal/100g &middot; P: ${food.protein}g &middot; C: ${food.carbs}g &middot; F: ${food.fat}g</div>
            </div>`;
        }).join('');

        autocomplete.classList.remove('hidden');

        autocomplete.querySelectorAll('[data-food]').forEach(el => {
            el.addEventListener('click', () => {
                const foodName = el.dataset.food;
                input.value = foodName;
                trackerSelectedFood = foodName;
                autocomplete.classList.add('hidden');
                updateTrackerPreview();
            });
        });
    });

    // Close autocomplete on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#trackerFoodInput') && !e.target.closest('#trackerAutocomplete')) {
            autocomplete.classList.add('hidden');
        }
    });

    // Update preview on amount/unit change
    amountInput.addEventListener('input', updateTrackerPreview);
    unitSelect.addEventListener('change', updateTrackerPreview);
}

function getGramsFromUnit(foodName, amount, unit) {
    if (unit === 'g' || unit === 'ml') return amount;
    if (unit === 'piece' && PIECE_WEIGHTS[foodName]) {
        return amount * PIECE_WEIGHTS[foodName];
    }
    const factor = UNIT_CONVERSIONS[unit] || 1;
    return amount * factor;
}

function updateTrackerPreview() {
    const preview = document.getElementById('trackerPreview');
    if (!trackerSelectedFood) {
        preview.classList.add('hidden');
        return;
    }

    const food = findFood(trackerSelectedFood);
    if (!food) {
        preview.classList.add('hidden');
        return;
    }

    const amount = parseFloat(document.getElementById('trackerAmount').value) || 0;
    const unit = document.getElementById('trackerUnit').value;
    const grams = getGramsFromUnit(trackerSelectedFood, amount, unit);

    document.getElementById('previewKcal').textContent = Math.round(food.kcal * grams / 100);
    document.getElementById('previewProtein').textContent = (food.protein * grams / 100).toFixed(1) + 'g';
    document.getElementById('previewCarbs').textContent = (food.carbs * grams / 100).toFixed(1) + 'g';
    document.getElementById('previewFat').textContent = (food.fat * grams / 100).toFixed(1) + 'g';
    document.getElementById('previewFiber').textContent = (food.fiber * grams / 100).toFixed(1) + 'g';
    preview.classList.remove('hidden');
}

function addTrackerItem() {
    const input = document.getElementById('trackerFoodInput');
    const foodName = input.value.trim();

    if (!foodName) {
        alert('Please select a food item first.');
        return;
    }

    const food = findFood(foodName);
    if (!food) {
        alert('Food not found in database. Please select from the suggestions.');
        return;
    }

    const amount = parseFloat(document.getElementById('trackerAmount').value) || 100;
    const unit = document.getElementById('trackerUnit').value;
    const grams = getGramsFromUnit(foodName, amount, unit);

    const item = {
        id: Date.now(),
        name: foodName,
        amount: amount,
        unit: unit,
        grams: Math.round(grams),
        kcal: Math.round(food.kcal * grams / 100),
        protein: Math.round(food.protein * grams / 100 * 10) / 10,
        carbs: Math.round(food.carbs * grams / 100 * 10) / 10,
        fat: Math.round(food.fat * grams / 100 * 10) / 10,
        fiber: Math.round(food.fiber * grams / 100 * 10) / 10,
    };

    state.trackerItems.push(item);
    renderTracker();

    // Reset input
    input.value = '';
    trackerSelectedFood = null;
    document.getElementById('trackerPreview').classList.add('hidden');
    document.getElementById('trackerAmount').value = 100;
    document.getElementById('trackerUnit').value = 'g';
}

function removeTrackerItem(id) {
    state.trackerItems = state.trackerItems.filter(item => item.id !== id);
    renderTracker();
}

function clearTracker() {
    if (state.trackerItems.length === 0) return;
    if (confirm('Clear all tracked items?')) {
        state.trackerItems = [];
        renderTracker();
    }
}

function renderTracker() {
    const listDiv = document.getElementById('trackerList');
    const totalDiv = document.getElementById('trackerTotal');

    if (state.trackerItems.length === 0) {
        listDiv.innerHTML = '<div class="text-center text-gray-400 py-8">No foods tracked yet. Add items above.</div>';
        totalDiv.classList.add('hidden');
        return;
    }

    listDiv.innerHTML = state.trackerItems.map(item => `
        <div class="tracker-item">
            <div class="tracker-item-info">
                <div class="tracker-item-name">${item.name}</div>
                <div class="tracker-item-detail">${item.amount} ${item.unit} (${item.grams}g) &middot; ${item.kcal} kcal</div>
            </div>
            <div class="tracker-item-macros">
                <div class="tracker-item-macro"><div class="tracker-item-macro-value" style="color:var(--protein-color)">${item.protein}g</div><div class="tracker-item-macro-label">P</div></div>
                <div class="tracker-item-macro"><div class="tracker-item-macro-value" style="color:var(--carbs-color)">${item.carbs}g</div><div class="tracker-item-macro-label">C</div></div>
                <div class="tracker-item-macro"><div class="tracker-item-macro-value" style="color:var(--fats-color)">${item.fat}g</div><div class="tracker-item-macro-label">F</div></div>
            </div>
            <button class="tracker-item-delete" onclick="removeTrackerItem(${item.id})">&#10005;</button>
        </div>
    `).join('');

    // Calculate totals
    const totals = state.trackerItems.reduce((acc, item) => ({
        kcal: acc.kcal + item.kcal,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat,
        fiber: acc.fiber + item.fiber,
    }), { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

    document.getElementById('totalKcal').textContent = Math.round(totals.kcal);
    document.getElementById('totalProtein').textContent = totals.protein.toFixed(1);
    document.getElementById('totalCarbs').textContent = totals.carbs.toFixed(1);
    document.getElementById('totalFat').textContent = totals.fat.toFixed(1);
    document.getElementById('totalFiber').textContent = totals.fiber.toFixed(1);
    totalDiv.classList.remove('hidden');

    // Show target comparison if results are available
    const compDiv = document.getElementById('trackerTargetComparison');
    if (state.results.targetKcal) {
        compDiv.classList.remove('hidden');
        const diffKcal = Math.round(totals.kcal) - state.results.targetKcal;
        const diffP = totals.protein - state.macros.protein.grams;
        const diffC = totals.carbs - state.macros.carbs.grams;
        const diffF = totals.fat - state.macros.fats.grams;
        const diffFi = totals.fiber - state.macros.fiber.grams;

        const fmt = (val, suffix = '') => {
            const sign = val >= 0 ? '+' : '';
            const color = val > 0 ? 'color: var(--danger)' : val < 0 ? 'color: var(--primary)' : 'color: var(--text-muted)';
            return `<span style="${color}">${sign}${val.toFixed(suffix ? 1 : 0)}${suffix}</span>`;
        };

        document.getElementById('diffKcal').innerHTML = fmt(diffKcal);
        document.getElementById('diffProtein').innerHTML = fmt(diffP, 'g');
        document.getElementById('diffCarbs').innerHTML = fmt(diffC, 'g');
        document.getElementById('diffFat').innerHTML = fmt(diffF, 'g');
        document.getElementById('diffFiber').innerHTML = fmt(diffFi, 'g');
    } else {
        compDiv.classList.add('hidden');
    }
}

// ==========================================
// TRACKING HISTORY & DAILY FEEDBACK
// ==========================================
function getTrackingHistory() {
    try {
        return JSON.parse(localStorage.getItem('nourishlab_history') || '[]');
    } catch { return []; }
}

function saveTrackingHistory(history) {
    localStorage.setItem('nourishlab_history', JSON.stringify(history));
}

// ==========================================
// WATER TRACKER
// ==========================================

function getWaterTarget() {
    if (state.profile && state.profile.gewicht) {
        return parseFloat((state.profile.gewicht * 35 / 1000).toFixed(1));
    }
    return 2.5;
}

function loadWaterTracker() {
    try {
        const saved = JSON.parse(localStorage.getItem('nourishlab_water_today'));
        if (saved && saved.date === new Date().toISOString().split('T')[0]) {
            state.waterGlasses = saved.glasses || 0;
        } else {
            state.waterGlasses = 0;
        }
    } catch {
        state.waterGlasses = 0;
    }
}

function saveWaterTracker() {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('nourishlab_water_today', JSON.stringify({
        date: today,
        glasses: state.waterGlasses,
    }));
}

function toggleWaterGlass(idx) {
    // If clicking a filled glass, unfill from that point; if clicking empty, fill up to it
    if (idx < state.waterGlasses) {
        state.waterGlasses = idx;
    } else {
        state.waterGlasses = idx + 1;
    }
    saveWaterTracker();
    renderWaterTracker();
}

function renderWaterTracker() {
    const grid = document.getElementById('waterGlassGrid');
    if (!grid) return;

    const target = getWaterTarget();
    const glassSize = 0.25; // each glass = 250ml
    const totalLiters = state.waterGlasses * glassSize;
    const percent = Math.min(Math.round((totalLiters / target) * 100), 100);

    // Update target label
    const targetLabel = document.getElementById('waterTargetLabel');
    if (targetLabel) targetLabel.textContent = 'Target: ' + target + 'L';

    // Render 8 glass buttons
    let html = '';
    for (let i = 0; i < 8; i++) {
        const filled = i < state.waterGlasses;
        html += `<button onclick="toggleWaterGlass(${i})" class="flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
            filled
                ? 'bg-blue-500/20 border-blue-400/50 text-blue-400 shadow-lg shadow-blue-500/10'
                : 'bg-white/5 border-white/10 text-slate-500 hover:border-blue-400/30 hover:text-blue-400/60'
        }">
            <span class="text-2xl">${filled ? '&#128167;' : '&#129699;'}</span>
            <span class="text-xs mt-1 font-medium">${((i + 1) * 250)}ml</span>
        </button>`;
    }
    grid.innerHTML = html;

    // Update progress bar
    const bar = document.getElementById('waterProgressBar');
    if (bar) bar.style.width = percent + '%';

    // Update total display
    const totalDisplay = document.getElementById('waterTotalDisplay');
    if (totalDisplay) totalDisplay.textContent = totalLiters.toFixed(1) + 'L / ' + target + 'L';

    // Update percent display
    const percentDisplay = document.getElementById('waterPercentDisplay');
    if (percentDisplay) percentDisplay.textContent = percent + '%';
}

function finishDay() {
    if (state.trackerItems.length === 0) {
        alert('No foods tracked today. Add some items first.');
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    const history = getTrackingHistory();

    // Check if already tracked today
    if (history.some(d => d.date === today)) {
        if (!confirm('You already have an entry for today. Replace it?')) return;
        const idx = history.findIndex(d => d.date === today);
        history.splice(idx, 1);
    }

    const totals = state.trackerItems.reduce((acc, item) => ({
        kcal: acc.kcal + item.kcal,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat,
        fiber: acc.fiber + item.fiber,
    }), { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

    const entry = {
        date: today,
        items: state.trackerItems.map(i => ({ name: i.name, grams: i.grams, kcal: i.kcal, protein: i.protein, carbs: i.carbs, fat: i.fat, fiber: i.fiber })),
        totals: {
            kcal: Math.round(totals.kcal),
            protein: Math.round(totals.protein * 10) / 10,
            carbs: Math.round(totals.carbs * 10) / 10,
            fat: Math.round(totals.fat * 10) / 10,
            fiber: Math.round(totals.fiber * 10) / 10,
        },
        targets: state.results.targetKcal ? {
            kcal: state.results.targetKcal,
            protein: state.macros.protein.grams,
            carbs: state.macros.carbs.grams,
            fat: state.macros.fats.grams,
            fiber: state.macros.fiber.grams,
        } : null,
        mealCount: countMeals(),
        water: {
            glasses: state.waterGlasses,
            liters: parseFloat((state.waterGlasses * 0.25).toFixed(2)),
            target: getWaterTarget(),
        },
    };

    history.unshift(entry);
    if (history.length > 90) history.length = 90; // keep 90 days max
    saveTrackingHistory(history);

    generateFeedback(entry);
    renderHistory();
}

function countMeals() {
    // Rough estimation: items added with significant time gaps or large calorie jumps
    // Simple heuristic: count distinct protein sources as meals
    const proteins = new Set();
    state.trackerItems.forEach(item => {
        const food = findFood(item.name);
        if (food && food.protein > 8) proteins.add(item.name);
    });
    return Math.max(proteins.size, 1);
}

function generateFeedback(entry) {
    const fb = document.getElementById('feedbackContent');
    const t = entry.totals;
    const tgt = entry.targets;
    const items = entry.items;
    const tips = [];

    // --- Macro analysis ---
    if (tgt) {
        const kcalPct = Math.round((t.kcal / tgt.kcal) * 100);
        const protPct = Math.round((t.protein / tgt.protein) * 100);
        const carbPct = Math.round((t.carbs / tgt.carbs) * 100);
        const fatPct = Math.round((t.fat / tgt.fat) * 100);
        const fiberPct = Math.round((t.fiber / tgt.fiber) * 100);

        // Calories
        if (kcalPct < 85) {
            tips.push({ icon: '&#9888;', type: 'warning', text: `<strong>Undereating:</strong> You ate only <strong>${kcalPct}%</strong> of your calorie target (${t.kcal} of ${tgt.kcal} kcal). Chronic undereating slows metabolism and leads to muscle loss. Try adding a portion of complex carbs or healthy fats.` });
        } else if (kcalPct > 115) {
            tips.push({ icon: '&#128200;', type: 'over', text: `<strong>Over target:</strong> You consumed <strong>${kcalPct}%</strong> of your calorie target (${t.kcal} of ${tgt.kcal} kcal). An occasional surplus is normal — if this is frequent, consider smaller portions or less calorie-dense foods.` });
        } else {
            tips.push({ icon: '&#9989;', type: 'good', text: `<strong>Calories on point!</strong> You hit <strong>${kcalPct}%</strong> of your target (${t.kcal} of ${tgt.kcal} kcal). Well done!` });
        }

        // Protein
        if (protPct < 80) {
            tips.push({ icon: '&#127830;', type: 'warning', text: `<strong>Low protein:</strong> Only ${t.protein}g of ${tgt.protein}g target (${protPct}%). Protein is critical for muscle maintenance and satiety. Consider adding a protein-rich food to your next meal.` });
        } else if (protPct >= 95) {
            tips.push({ icon: '&#128170;', type: 'good', text: `<strong>Protein target hit!</strong> ${t.protein}g of ${tgt.protein}g (${protPct}%). Your muscles are well-supplied.` });
        }

        // Fiber
        if (fiberPct < 70) {
            tips.push({ icon: '&#129382;', type: 'warning', text: `<strong>Low fiber:</strong> ${t.fiber}g of ${tgt.fiber}g target. Fiber supports digestion, gut health, and satiety. Add more vegetables, legumes, or whole grains.` });
        } else if (fiberPct >= 90) {
            tips.push({ icon: '&#127793;', type: 'good', text: `<strong>Great fiber intake!</strong> ${t.fiber}g — excellent for your gut microbiome.` });
        }

        // Fat
        if (fatPct > 130) {
            tips.push({ icon: '&#129361;', type: 'over', text: `<strong>High fat day:</strong> ${t.fat}g vs. ${tgt.fat}g target (${fatPct}%). Check if oils, nuts, or cheese portions were larger than planned.` });
        }

        // Carbs
        if (carbPct < 60) {
            tips.push({ icon: '&#127834;', type: 'warning', text: `<strong>Very low carbs:</strong> Only ${t.carbs}g of ${tgt.carbs}g (${carbPct}%). Unless intentional, low carbs can reduce energy and workout performance.` });
        }
    } else {
        tips.push({ icon: '&#128161;', type: 'info', text: `<strong>No targets set.</strong> Fill out your profile and generate a meal plan first to get personalized feedback comparing your intake to your goals.` });
    }

    // --- Rule compliance ---
    const mealCount = entry.mealCount;
    if (mealCount > 3) {
        tips.push({ icon: '&#128337;', type: 'warning', text: `<strong>Rule #1 — 3 meals/day:</strong> It looks like you may have had ${mealCount} distinct protein sources today, which could indicate more than 3 meals. Try to consolidate into 3 meals with 5-hour gaps.` });
    } else if (mealCount <= 3) {
        tips.push({ icon: '&#128337;', type: 'good', text: `<strong>Rule #1 &#9989;</strong> Looks like approximately ${mealCount} meal(s) — good structure!` });
    }

    // --- Protein variety ---
    const proteinItems = items.filter(i => { const f = findFood(i.name); return f && f.protein > 8; });
    const uniqueProteins = [...new Set(proteinItems.map(i => i.name))];
    if (uniqueProteins.length >= 2) {
        tips.push({ icon: '&#128256;', type: 'good', text: `<strong>Rule #8 — Protein rotation:</strong> You had ${uniqueProteins.length} different protein sources today (${uniqueProteins.join(', ')}). Great variety!` });
    }

    // --- Water reminder ---
    tips.push({ icon: '&#128167;', type: 'info', text: `<strong>Hydration reminder:</strong> Don't forget your daily water target${tgt ? '' : ' (fill in your profile to calculate it)'}. Drink between meals, not during.` });

    // --- Trend (if history available) ---
    const history = getTrackingHistory();
    if (history.length >= 3 && tgt) {
        const last3 = history.slice(0, 3);
        const avgKcal = Math.round(last3.reduce((s, d) => s + d.totals.kcal, 0) / last3.length);
        const avgProt = Math.round(last3.reduce((s, d) => s + d.totals.protein, 0) / last3.length);
        const kcalTrend = Math.round((avgKcal / tgt.kcal) * 100);
        tips.push({ icon: '&#128200;', type: 'info', text: `<strong>3-day trend:</strong> Average ${avgKcal} kcal/day (${kcalTrend}% of target), ${avgProt}g protein. ${kcalTrend > 105 ? 'Slight surplus trend — watch portions.' : kcalTrend < 90 ? 'Slight deficit trend — make sure you eat enough.' : 'Right on track!'}` });
    }

    // Render
    fb.innerHTML = tips.map(tip => {
        const borderColor = tip.type === 'good' ? 'border-emerald-500/30' : tip.type === 'warning' ? 'border-amber-500/30' : tip.type === 'over' ? 'border-red-500/30' : 'border-blue-500/30';
        const bgColor = tip.type === 'good' ? 'bg-emerald-500/5' : tip.type === 'warning' ? 'bg-amber-500/5' : tip.type === 'over' ? 'bg-red-500/5' : 'bg-blue-500/5';
        return `<div class="flex gap-3 items-start p-4 rounded-xl border ${borderColor} ${bgColor} mb-3">
            <span class="text-xl flex-shrink-0">${tip.icon}</span>
            <div class="text-sm text-slate-300 leading-relaxed">${tip.text}</div>
        </div>`;
    }).join('');

    document.getElementById('trackerFeedback').classList.remove('hidden');
    document.getElementById('trackerFeedback').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderHistory() {
    const container = document.getElementById('trackerHistory');
    const history = getTrackingHistory();

    if (history.length === 0) {
        container.innerHTML = '<p class="text-center text-slate-500 text-sm">No days tracked yet. Finish a day to build your history.</p>';
        renderCharts();
        return;
    }

    container.innerHTML = history.map((entry, idx) => {
        const d = new Date(entry.date);
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const t = entry.totals;
        const tgt = entry.targets;
        const kcalPct = tgt ? Math.round((t.kcal / tgt.kcal) * 100) : null;
        const kcalColor = kcalPct === null ? 'text-slate-400' : kcalPct >= 90 && kcalPct <= 110 ? 'text-emerald-400' : kcalPct < 90 ? 'text-amber-400' : 'text-red-400';
        const protColor = tgt && t.protein >= tgt.protein * 0.9 ? 'text-emerald-400' : 'text-slate-300';

        return `<div class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 cursor-pointer transition-all hover:border-primary/30 hover:bg-white/8" onclick="toggleHistoryDetail(${idx})">
            <div class="flex justify-between items-center">
                <div>
                    <div class="font-semibold text-sm">${dayName}</div>
                    <div class="text-xs text-slate-500">${entry.items.length} items</div>
                </div>
                <div class="flex gap-4 text-right text-sm">
                    <div><span class="font-bold ${kcalColor}">${t.kcal}</span> <span class="text-xs text-slate-500">kcal${kcalPct !== null ? ' (' + kcalPct + '%)' : ''}</span></div>
                    <div><span class="font-bold ${protColor}">${t.protein}g</span> <span class="text-xs text-slate-500">P</span></div>
                    <div><span class="font-bold text-slate-300">${t.carbs}g</span> <span class="text-xs text-slate-500">C</span></div>
                    <div><span class="font-bold text-slate-300">${t.fat}g</span> <span class="text-xs text-slate-500">F</span></div>
                </div>
            </div>
            <div id="historyDetail${idx}" class="hidden mt-3 pt-3 border-t border-white/5">
                <div class="grid gap-1 text-xs text-slate-400">
                    ${entry.items.map(i => `<div class="flex justify-between"><span>${i.name}</span><span class="text-slate-500">${i.grams}g — ${i.kcal} kcal</span></div>`).join('')}
                </div>
                <div class="mt-3 text-right">
                    <button onclick="event.stopPropagation(); deleteHistoryEntry(${idx})" class="text-xs text-red-400/60 hover:text-red-400 transition-colors">Delete this day</button>
                </div>
            </div>
        </div>`;
    }).join('');

    renderCharts();
}

function toggleHistoryDetail(idx) {
    const el = document.getElementById('historyDetail' + idx);
    if (el) el.classList.toggle('hidden');
}

function deleteHistoryEntry(idx) {
    if (!confirm('Delete this tracking entry?')) return;
    const history = getTrackingHistory();
    history.splice(idx, 1);
    saveTrackingHistory(history);
    renderHistory();
}

// ==========================================
// PROGRESS CHARTS (Chart.js)
// ==========================================
let calorieChartInstance = null;
let macroChartInstance = null;

function toggleProgressCharts() {
    const container = document.getElementById('progressChartsContainer');
    const label = document.getElementById('toggleChartsLabel');
    const isHidden = container.classList.toggle('hidden');
    label.textContent = isHidden ? 'Show Progress Charts' : 'Hide Progress Charts';
    if (!isHidden) renderCharts();
}

function renderCharts() {
    const history = getTrackingHistory();
    const section = document.getElementById('progressChartsSection');
    if (!section) return;

    if (history.length < 2) {
        section.classList.add('hidden');
        return;
    }
    section.classList.remove('hidden');

    // Destroy existing chart instances
    if (calorieChartInstance) { calorieChartInstance.destroy(); calorieChartInstance = null; }
    if (macroChartInstance) { macroChartInstance.destroy(); macroChartInstance = null; }

    const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sorted.map(e => {
        const d = new Date(e.date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    // --- Calorie Trend Line Chart ---
    const calorieCtx = document.getElementById('calorieChart');
    if (calorieCtx) {
        const actualCalories = sorted.map(e => e.totals.kcal);
        const targetCalories = sorted.map(e => e.targets ? e.targets.kcal : null);

        calorieChartInstance = new Chart(calorieCtx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Actual Calories',
                        data: actualCalories,
                        borderColor: '#34d399',
                        backgroundColor: 'rgba(52,211,153,0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3,
                        pointBackgroundColor: '#34d399',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                    },
                    {
                        label: 'Target',
                        data: targetCalories,
                        borderColor: '#475569',
                        borderWidth: 2,
                        borderDash: [6, 4],
                        fill: false,
                        tension: 0.3,
                        pointRadius: 0,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8', font: { size: 11 } }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8', font: { size: 10 } },
                        grid: { color: 'rgba(255,255,255,0.06)' },
                        border: { color: 'rgba(255,255,255,0.06)' }
                    },
                    y: {
                        ticks: { color: '#94a3b8', font: { size: 10 } },
                        grid: { color: 'rgba(255,255,255,0.06)' },
                        border: { color: 'rgba(255,255,255,0.06)' },
                        beginAtZero: false
                    }
                }
            }
        });
    }

    // --- Macro Breakdown Bar Chart ---
    const macroCtx = document.getElementById('macroChart');
    if (macroCtx) {
        const avgProtein = Math.round(sorted.reduce((s, e) => s + e.totals.protein, 0) / sorted.length);
        const avgCarbs = Math.round(sorted.reduce((s, e) => s + e.totals.carbs, 0) / sorted.length);
        const avgFat = Math.round(sorted.reduce((s, e) => s + e.totals.fat, 0) / sorted.length);

        const entriesWithTargets = sorted.filter(e => e.targets);
        let avgTargetP = null, avgTargetC = null, avgTargetF = null;
        if (entriesWithTargets.length > 0) {
            avgTargetP = Math.round(entriesWithTargets.reduce((s, e) => s + e.targets.protein, 0) / entriesWithTargets.length);
            avgTargetC = Math.round(entriesWithTargets.reduce((s, e) => s + e.targets.carbs, 0) / entriesWithTargets.length);
            avgTargetF = Math.round(entriesWithTargets.reduce((s, e) => s + e.targets.fat, 0) / entriesWithTargets.length);
        }

        const datasets = [
            {
                label: 'Avg Protein (g)',
                data: [avgProtein],
                backgroundColor: '#f87171',
                borderColor: '#f87171',
                borderWidth: 1,
                borderRadius: 6,
            },
            {
                label: 'Avg Carbs (g)',
                data: [avgCarbs],
                backgroundColor: '#60a5fa',
                borderColor: '#60a5fa',
                borderWidth: 1,
                borderRadius: 6,
            },
            {
                label: 'Avg Fat (g)',
                data: [avgFat],
                backgroundColor: '#fbbf24',
                borderColor: '#fbbf24',
                borderWidth: 1,
                borderRadius: 6,
            }
        ];

        if (avgTargetP !== null) {
            datasets.push(
                { label: 'Target P', data: [avgTargetP], backgroundColor: 'rgba(248,113,113,0.25)', borderColor: '#f87171', borderWidth: 1, borderDash: [4, 3], borderRadius: 6 },
                { label: 'Target C', data: [avgTargetC], backgroundColor: 'rgba(96,165,250,0.25)', borderColor: '#60a5fa', borderWidth: 1, borderDash: [4, 3], borderRadius: 6 },
                { label: 'Target F', data: [avgTargetF], backgroundColor: 'rgba(251,191,36,0.25)', borderColor: '#fbbf24', borderWidth: 1, borderDash: [4, 3], borderRadius: 6 }
            );
        }

        macroChartInstance = new Chart(macroCtx, {
            type: 'bar',
            data: {
                labels: ['Average Daily Macros'],
                datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8', font: { size: 11 } }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8', font: { size: 10 } },
                        grid: { color: 'rgba(255,255,255,0.06)' },
                        border: { color: 'rgba(255,255,255,0.06)' }
                    },
                    y: {
                        ticks: { color: '#94a3b8', font: { size: 10 } },
                        grid: { color: 'rgba(255,255,255,0.06)' },
                        border: { color: 'rgba(255,255,255,0.06)' },
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// ==========================================
// PDF EXPORT - Direct jsPDF (no html2canvas)
// ==========================================
function exportPDF() {
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) {
        alert('PDF library not loaded. Please check your internet connection and reload.');
        return;
    }

    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const pw = 210;
    const ph = 297;
    const margin = 12;
    const cw = pw - margin * 2;
    let y = margin;

    const p = state.profile;
    const goalText = p.goals.map(g => ({ fatloss: 'Fat Loss', muscle: 'Muscle Building', maintain: 'Maintain', wellbeing: 'Wellbeing' }[g])).join(' + ');
    const waterL = (p.gewicht * 35 / 1000).toFixed(1);

    const green = [45, 138, 110];
    const dark = [26, 26, 46];
    const gray = [107, 114, 128];

    function checkPage(needed) {
        if (y + needed > ph - margin) {
            doc.addPage();
            y = margin;
        }
    }

    function drawLine(x1, yy, x2, color) {
        doc.setDrawColor(...color);
        doc.setLineWidth(0.3);
        doc.line(x1, yy, x2, yy);
    }

    // === HEADER ===
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...green);
    doc.text('NourishLab - Meal Plan', pw / 2, y + 8, { align: 'center' });
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text(`${p.name}  |  ${state.results.targetKcal} kcal/day  |  P: ${state.macros.protein.grams}g  |  C: ${state.macros.carbs.grams}g  |  F: ${state.macros.fats.grams}g  |  Fiber: ${state.macros.fiber.grams}g+`, pw / 2, y, { align: 'center' });
    y += 5;
    doc.text(`Goals: ${goalText}  |  BMI: ${state.results.bmi.toFixed(1)}  |  ${state.weekPlan.length} days  |  Created: ${new Date().toLocaleDateString('en-GB')}`, pw / 2, y, { align: 'center' });
    y += 6;

    // Nutrition rules box
    doc.setFillColor(240, 250, 246);
    doc.setDrawColor(...green);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, cw, 10, 2, 2, 'FD');
    doc.setFontSize(7.5);
    doc.setTextColor(...green);
    doc.setFont('helvetica', 'bold');
    doc.text('Rules:', margin + 3, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text(`3 meals/day  |  5h gaps  |  Start with protein  |  1 protein/meal  |  No food after 9 PM  |  ${waterL}L water  |  1 apple/day  |  7-9h sleep`, margin + 22, y + 4);
    y += 14;

    drawLine(margin, y, pw - margin, green);
    y += 6;

    // === DAYS ===
    const colX = [margin, margin + cw * 0.45, margin + cw * 0.58, margin + cw * 0.68, margin + cw * 0.78, margin + cw * 0.88];

    state.weekPlan.forEach((day) => {
        checkPage(75);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(...green);
        doc.text(day.name, margin, y);
        y += 2;
        drawLine(margin, y, pw - margin, green);
        y += 5;

        day.meals.forEach((meal, mi) => {
            const totals = sumItems(meal.items);
            const recipe = getRecipeName(mi, meal.items);

            checkPage(40);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(...dark);
            doc.text(`${meal.name}: ${recipe.name}`, margin, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...green);
            doc.text(`${Math.round(totals.kcal)} kcal`, pw - margin, y, { align: 'right' });
            y += 4;

            doc.setFontSize(7);
            doc.setTextColor(...gray);
            doc.setFont('helvetica', 'italic');
            const tipLines = doc.splitTextToSize(recipe.tip, cw - 4);
            doc.text(tipLines, margin + 2, y);
            y += tipLines.length * 3 + 2;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7);
            doc.setTextColor(...gray);
            doc.setFillColor(240, 242, 245);
            doc.rect(margin, y - 1, cw, 5, 'F');
            doc.text('Food', colX[0] + 1, y + 2.5);
            doc.text('Amount', colX[1] + 1, y + 2.5);
            doc.text('Kcal', colX[2] + 1, y + 2.5);
            doc.text('Prot', colX[3] + 1, y + 2.5);
            doc.text('Carbs', colX[4] + 1, y + 2.5);
            doc.text('Fat', colX[5] + 1, y + 2.5);
            y += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(...dark);
            meal.items.forEach(item => {
                checkPage(6);
                doc.text(item.name, colX[0] + 1, y);
                doc.text(`${item.grams} g`, colX[1] + 1, y);
                doc.text(`${item.kcal}`, colX[2] + 1, y);
                doc.text(`${item.protein.toFixed(1)}`, colX[3] + 1, y);
                doc.text(`${item.carbs.toFixed(1)}`, colX[4] + 1, y);
                doc.text(`${item.fat.toFixed(1)}`, colX[5] + 1, y);
                y += 4.5;
            });

            y += 2;
        });

        // Day summary bar
        checkPage(10);
        const dt = day.meals.reduce((acc, meal) => {
            const t = sumItems(meal.items);
            return { kcal: acc.kcal + t.kcal, protein: acc.protein + t.protein, carbs: acc.carbs + t.carbs, fat: acc.fat + t.fat, fiber: acc.fiber + t.fiber };
        }, { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

        doc.setFillColor(240, 250, 246);
        doc.setDrawColor(...green);
        doc.roundedRect(margin, y, cw, 7, 1.5, 1.5, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        const sumY = y + 4.5;
        const sumSpacing = cw / 5;
        doc.setTextColor(...green);
        doc.text(`${Math.round(dt.kcal)} kcal`, margin + sumSpacing * 0.5, sumY, { align: 'center' });
        doc.setTextColor(192, 57, 43);
        doc.text(`${dt.protein.toFixed(1)}g P`, margin + sumSpacing * 1.5, sumY, { align: 'center' });
        doc.setTextColor(41, 128, 185);
        doc.text(`${dt.carbs.toFixed(1)}g C`, margin + sumSpacing * 2.5, sumY, { align: 'center' });
        doc.setTextColor(212, 160, 23);
        doc.text(`${dt.fat.toFixed(1)}g F`, margin + sumSpacing * 3.5, sumY, { align: 'center' });
        doc.setTextColor(39, 174, 96);
        doc.text(`${dt.fiber.toFixed(1)}g Fiber`, margin + sumSpacing * 4.5, sumY, { align: 'center' });
        y += 14;
    });

    doc.save(`NourishLab_MealPlan_${p.name}_${new Date().toISOString().split('T')[0]}.pdf`);
}

// ==========================================
// SHOPPING LIST
// ==========================================
function findFoodCategory(foodName) {
    for (const [catKey, cat] of Object.entries(FOODS)) {
        if (cat.items[foodName]) return catKey;
    }
    return null;
}

function generateShoppingList() {
    if (!state.weekPlan || state.weekPlan.length === 0) {
        alert('Please generate a meal plan first.');
        return;
    }

    // Aggregate all items: { foodName: { grams, category } }
    const aggregated = {};

    state.weekPlan.forEach(day => {
        day.meals.forEach(meal => {
            meal.items.forEach(item => {
                if (aggregated[item.name]) {
                    aggregated[item.name].grams += item.grams;
                } else {
                    aggregated[item.name] = {
                        grams: item.grams,
                        category: findFoodCategory(item.name) || 'other'
                    };
                }
            });
        });
    });

    // Group by category
    const grouped = {};
    for (const [name, data] of Object.entries(aggregated)) {
        const cat = data.category;
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push({ name, grams: data.grams });
    }

    // Sort items within each group by grams descending
    for (const cat of Object.keys(grouped)) {
        grouped[cat].sort((a, b) => b.grams - a.grams);
    }

    // Category display order
    const categoryOrder = ['proteinquellen', 'kohlenhydrate', 'gemuese', 'salate', 'obst', 'huelsenfruechte', 'oele'];

    // Render
    let html = '';
    categoryOrder.forEach(catKey => {
        if (!grouped[catKey]) return;
        const label = FOODS[catKey]?.label || catKey;
        html += `
            <div class="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-4">
                <h3 class="text-lg font-semibold text-slate-100 mb-3">${label}</h3>
                <ul class="space-y-2">
                    ${grouped[catKey].map(item => `
                        <li class="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                            <span class="text-slate-300">${item.name}</span>
                            <span class="text-primary font-semibold">${item.grams}g</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });

    // Handle uncategorized items
    if (grouped['other']) {
        html += `
            <div class="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-4">
                <h3 class="text-lg font-semibold text-slate-100 mb-3">Other</h3>
                <ul class="space-y-2">
                    ${grouped['other'].map(item => `
                        <li class="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                            <span class="text-slate-300">${item.name}</span>
                            <span class="text-primary font-semibold">${item.grams}g</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    document.getElementById('shoppingListContent').innerHTML = html;
    const section = document.getElementById('shoppinglist');
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });
}

function copyShoppingList() {
    if (!state.weekPlan || state.weekPlan.length === 0) return;

    // Build plain text version
    const aggregated = {};
    state.weekPlan.forEach(day => {
        day.meals.forEach(meal => {
            meal.items.forEach(item => {
                if (aggregated[item.name]) {
                    aggregated[item.name].grams += item.grams;
                } else {
                    aggregated[item.name] = {
                        grams: item.grams,
                        category: findFoodCategory(item.name) || 'other'
                    };
                }
            });
        });
    });

    const grouped = {};
    for (const [name, data] of Object.entries(aggregated)) {
        const cat = data.category;
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push({ name, grams: data.grams });
    }
    for (const cat of Object.keys(grouped)) {
        grouped[cat].sort((a, b) => b.grams - a.grams);
    }

    const categoryOrder = ['proteinquellen', 'kohlenhydrate', 'gemuese', 'salate', 'obst', 'huelsenfruechte', 'oele'];
    // Strip HTML entities from labels for plain text
    const stripHtml = (str) => { const el = document.createElement('span'); el.innerHTML = str; return el.textContent; };

    let text = `NourishLab Shopping List (${state.weekPlan.length} days)\n${'='.repeat(40)}\n\n`;

    categoryOrder.forEach(catKey => {
        if (!grouped[catKey]) return;
        const label = stripHtml(FOODS[catKey]?.label || catKey);
        text += `${label}\n${'-'.repeat(30)}\n`;
        grouped[catKey].forEach(item => {
            text += `  ${item.name} — ${item.grams}g\n`;
        });
        text += '\n';
    });

    if (grouped['other']) {
        text += `Other\n${'-'.repeat(30)}\n`;
        grouped['other'].forEach(item => {
            text += `  ${item.name} — ${item.grams}g\n`;
        });
    }

    navigator.clipboard.writeText(text.trim()).then(() => {
        const btn = document.querySelector('#shoppinglist .btn-primary');
        const original = btn.innerHTML;
        btn.innerHTML = '&#10004; Copied!';
        btn.classList.add('bg-emerald-600');
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('bg-emerald-600');
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text.trim();
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    });
}
