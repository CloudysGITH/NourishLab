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
            "Eggs": { kcal: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european", "asian", "indian", "mediterranean", "latin"], breakfast: true },
            "Egg Whites": { kcal: 52, protein: 11, carbs: 0.7, fat: 0.2, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european", "asian", "indian", "mediterranean", "latin"], breakfast: true },
            "Magerquark (low-fat quark)": { kcal: 67, protein: 12, carbs: 4, fat: 0.3, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Greek Yogurt": { kcal: 97, protein: 9, carbs: 3.6, fat: 5, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: true },
            "Skyr": { kcal: 63, protein: 11, carbs: 4, fat: 0.2, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Cottage Cheese": { kcal: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Natural Yogurt 3.8%": { kcal: 66, protein: 4, carbs: 4.7, fat: 3.8, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european", "indian", "mediterranean"], breakfast: true },
            "Harzer Cheese": { kcal: 126, protein: 27, carbs: 0.5, fat: 0.7, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Turkey Ham": { kcal: 104, protein: 19, carbs: 1, fat: 2.5, fiber: 0, tags: ["omnivore"], cuisine: ["european", "mediterranean"], breakfast: true },
            "Smoked Turkey Breast": { kcal: 99, protein: 21, carbs: 0.5, fat: 1.5, fiber: 0, tags: ["omnivore"], cuisine: ["european"], breakfast: true },

            // === LUNCH/DINNER PROTEINS (EUROPEAN) ===
            "Chicken Breast": { kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, tags: ["omnivore"], cuisine: ["european", "asian", "indian", "mediterranean", "latin"], breakfast: false },
            "Turkey Breast": { kcal: 135, protein: 30, carbs: 0, fat: 1.5, fiber: 0, tags: ["omnivore"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Lean Beef Steak": { kcal: 187, protein: 28, carbs: 0, fat: 8, fiber: 0, tags: ["omnivore"], cuisine: ["european", "latin"], breakfast: false },
            "Beef Filet": { kcal: 155, protein: 28, carbs: 0, fat: 4.5, fiber: 0, tags: ["omnivore"], cuisine: ["european"], breakfast: false },
            "Pork Filet": { kcal: 143, protein: 23, carbs: 0, fat: 5.4, fiber: 0, tags: ["omnivore"], cuisine: ["european", "asian"], breakfast: false },
            "Lamb Loin": { kcal: 178, protein: 25, carbs: 0, fat: 8.5, fiber: 0, tags: ["omnivore"], cuisine: ["european", "indian", "mediterranean"], breakfast: false },
            "Duck Breast": { kcal: 132, protein: 23, carbs: 0, fat: 4, fiber: 0, tags: ["omnivore"], cuisine: ["european", "asian"], breakfast: false },
            "Rabbit": { kcal: 136, protein: 21, carbs: 0, fat: 5.5, fiber: 0, tags: ["omnivore"], cuisine: ["european", "mediterranean"], breakfast: false },

            // === FISH ===
            "Salmon": { kcal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "asian"], breakfast: false },
            "Tuna (natural)": { kcal: 130, protein: 29, carbs: 0, fat: 1, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "asian", "mediterranean"], breakfast: false },
            "Shrimp": { kcal: 99, protein: 24, carbs: 0, fat: 0.3, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "asian", "mediterranean", "latin"], breakfast: false },
            "Cod": { kcal: 82, protein: 18, carbs: 0, fat: 0.7, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Trout": { kcal: 148, protein: 21, carbs: 0, fat: 7, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Herring": { kcal: 158, protein: 18, carbs: 0, fat: 9, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Mackerel": { kcal: 205, protein: 19, carbs: 0, fat: 14, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "asian"], breakfast: false },
            "Sardines": { kcal: 208, protein: 25, carbs: 0, fat: 11, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Sea Bass": { kcal: 97, protein: 18, carbs: 0, fat: 2.3, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "mediterranean", "asian"], breakfast: false },
            "Sole": { kcal: 86, protein: 18, carbs: 0, fat: 1.2, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Turbot": { kcal: 95, protein: 16, carbs: 0, fat: 3.3, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Perch": { kcal: 82, protein: 18, carbs: 0, fat: 0.8, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Pollock": { kcal: 81, protein: 18, carbs: 0, fat: 0.6, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Swordfish": { kcal: 144, protein: 20, carbs: 0, fat: 7, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },

            // === SEAFOOD ===
            "Scallops": { kcal: 69, protein: 12, carbs: 3, fat: 0.5, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "asian"], breakfast: false },
            "Mussels": { kcal: 86, protein: 12, carbs: 4, fat: 2, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Squid": { kcal: 92, protein: 18, carbs: 3, fat: 1.4, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["european", "asian", "mediterranean"], breakfast: false },

            // === CHEESE ===
            "Feta": { kcal: 264, protein: 14, carbs: 4, fat: 21, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: true },
            "Mozzarella": { kcal: 280, protein: 22, carbs: 2, fat: 17, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: true },
            "Ricotta": { kcal: 174, protein: 11, carbs: 3, fat: 13, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: true },
            "Halloumi": { kcal: 321, protein: 25, carbs: 2, fat: 25, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["mediterranean"], breakfast: false },
            "Labneh": { kcal: 154, protein: 6, carbs: 4, fat: 13, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["mediterranean", "indian"], breakfast: true },

            // === VEGAN/VEGETARIAN ===
            "Tofu": { kcal: 144, protein: 17, carbs: 3, fat: 8, fiber: 0.3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "european"], breakfast: false },
            "Tempeh": { kcal: 192, protein: 20, carbs: 8, fat: 11, fiber: 1.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "european"], breakfast: false },
            "Seitan": { kcal: 148, protein: 28, carbs: 4, fat: 2, fiber: 0.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "european"], breakfast: false },
            "Silken Tofu": { kcal: 55, protein: 5, carbs: 2, fat: 3, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: true },

            // === INDIAN PROTEINS ===
            "Paneer": { kcal: 265, protein: 18, carbs: 1, fat: 21, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["indian"], breakfast: false },
            "Chicken Tikka (lean)": { kcal: 148, protein: 25, carbs: 2, fat: 4.5, fiber: 0, tags: ["omnivore"], cuisine: ["indian"], breakfast: false },
            "Tandoori Fish": { kcal: 120, protein: 22, carbs: 2, fat: 3, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["indian"], breakfast: false },

            // === ASIAN PROTEINS ===
            "Teriyaki Chicken": { kcal: 155, protein: 26, carbs: 5, fat: 3, fiber: 0, tags: ["omnivore"], cuisine: ["asian"], breakfast: false },
            "Steamed Fish Fillet": { kcal: 96, protein: 20, carbs: 0, fat: 1.5, fiber: 0, tags: ["omnivore", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Korean Beef (Bulgogi)": { kcal: 165, protein: 24, carbs: 6, fat: 5, fiber: 0, tags: ["omnivore"], cuisine: ["asian"], breakfast: false },

            // === LATIN PROTEINS ===
            "Carne Asada": { kcal: 170, protein: 26, carbs: 0, fat: 7, fiber: 0, tags: ["omnivore"], cuisine: ["latin"], breakfast: false },
            "Pollo Asado": { kcal: 150, protein: 28, carbs: 1, fat: 4, fiber: 0, tags: ["omnivore"], cuisine: ["latin"], breakfast: false },

            // === LEGUMES AS PROTEIN ===
            "Chickpeas": { kcal: 164, protein: 9, carbs: 27, fat: 2.6, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "mediterranean"], breakfast: false },
            "Lentils": { kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "mediterranean"], breakfast: false },
            "Red Lentils": { kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian"], breakfast: false },
            "Green Lentils": { kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "mediterranean"], breakfast: false },
            "Kidney Beans": { kcal: 127, protein: 9, carbs: 22, fat: 0.5, fiber: 6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "latin"], breakfast: false },
            "Black Beans": { kcal: 132, protein: 9, carbs: 24, fat: 0.5, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin", "european"], breakfast: false },
            "Mung Beans": { kcal: 105, protein: 7, carbs: 19, fat: 0.4, fiber: 5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "indian"], breakfast: false },
            "Edamame": { kcal: 122, protein: 11, carbs: 10, fat: 5, fiber: 5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Pinto Beans": { kcal: 143, protein: 9, carbs: 27, fat: 0.6, fiber: 9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin"], breakfast: false },
            "Dal (Toor Dal)": { kcal: 128, protein: 8, carbs: 22, fat: 0.4, fiber: 5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian"], breakfast: false },
            "Chana Dal": { kcal: 148, protein: 9, carbs: 25, fat: 2, fiber: 7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian"], breakfast: false },
        }
    },
    kohlenhydrate: {
        label: "&#127834; Carbohydrate Sources",
        items: {
            // === BREAKFAST CARBS ===
            "Oatmeal (Haferflocken)": { kcal: 379, protein: 13.5, carbs: 67, fat: 7, fiber: 10, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian"], breakfast: true },
            "Spelt Flakes (Dinkelflocken)": { kcal: 352, protein: 12, carbs: 69, fat: 2.7, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Whole Grain Bread (Vollkornbrot)": { kcal: 213, protein: 7, carbs: 41, fat: 1.3, fiber: 6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Rye Crispbread (Knaeckebrot)": { kcal: 366, protein: 11, carbs: 65, fat: 3.5, fiber: 15, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Rye Mixed Bread": { kcal: 219, protein: 6.6, carbs: 43, fat: 1.1, fiber: 6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Pita Bread": { kcal: 275, protein: 9, carbs: 55, fat: 1.2, fiber: 2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["mediterranean"], breakfast: true },

            // === LUNCH/DINNER CARBS ===
            "Brown Rice": { kcal: 350, protein: 7.5, carbs: 74, fat: 2.7, fiber: 3.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian", "indian", "latin"], breakfast: false },
            "Basmati Rice": { kcal: 354, protein: 7, carbs: 78, fat: 0.6, fiber: 1.3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "asian"], breakfast: false },
            "Jasmine Rice": { kcal: 350, protein: 7, carbs: 79, fat: 0.4, fiber: 0.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Whole Wheat Pasta": { kcal: 348, protein: 13, carbs: 65, fat: 2.5, fiber: 7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Potatoes": { kcal: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "latin"], breakfast: false },
            "Sweet Potatoes": { kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian", "latin"], breakfast: false },
            "Quinoa": { kcal: 368, protein: 14, carbs: 64, fat: 6, fiber: 7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "latin", "mediterranean"], breakfast: false },
            "Couscous": { kcal: 376, protein: 12.8, carbs: 77, fat: 0.6, fiber: 5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["mediterranean", "european"], breakfast: false },
            "Millet (Hirse)": { kcal: 378, protein: 11, carbs: 73, fat: 4.2, fiber: 3.9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian"], breakfast: false },
            "Buckwheat": { kcal: 343, protein: 13.3, carbs: 72, fat: 3.4, fiber: 10, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian"], breakfast: false },
            "Bulgur": { kcal: 342, protein: 12, carbs: 76, fat: 1.3, fiber: 8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["mediterranean"], breakfast: false },

            // === ASIAN CARBS ===
            "Rice Noodles": { kcal: 360, protein: 3.4, carbs: 83, fat: 0.6, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Soba Noodles": { kcal: 336, protein: 14, carbs: 74, fat: 0.7, fiber: 3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Udon Noodles": { kcal: 338, protein: 10, carbs: 74, fat: 1, fiber: 2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Glass Noodles": { kcal: 334, protein: 0.1, carbs: 82, fat: 0.1, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },

            // === INDIAN CARBS ===
            "Naan Bread": { kcal: 290, protein: 9, carbs: 50, fat: 5, fiber: 2, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["indian"], breakfast: false },
            "Chapati": { kcal: 240, protein: 8, carbs: 48, fat: 3, fiber: 4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian"], breakfast: true },
            "Idli (steamed rice cake)": { kcal: 130, protein: 4, carbs: 26, fat: 0.5, fiber: 1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian"], breakfast: true },
            "Dosa (plain)": { kcal: 168, protein: 4, carbs: 28, fat: 4, fiber: 1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian"], breakfast: true },

            // === LATIN CARBS ===
            "Corn Tortilla": { kcal: 218, protein: 6, carbs: 44, fat: 3, fiber: 5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin"], breakfast: true },
            "Plantain": { kcal: 122, protein: 1.3, carbs: 32, fat: 0.4, fiber: 2.3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin"], breakfast: false },
            "Yuca (Cassava)": { kcal: 160, protein: 1.4, carbs: 38, fat: 0.3, fiber: 1.8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin"], breakfast: false },
        }
    },
    gemuese: {
        label: "&#129382; Vegetables",
        items: {
            "Broccoli": { kcal: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian", "mediterranean"], breakfast: false },
            "Spinach": { kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "mediterranean", "asian"], breakfast: false },
            "Zucchini": { kcal: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Bell Pepper": { kcal: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean", "latin"], breakfast: false },
            "Tomatoes": { kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "mediterranean", "latin"], breakfast: true },
            "Cucumber": { kcal: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "mediterranean", "asian"], breakfast: true },
            "Cauliflower": { kcal: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian"], breakfast: false },
            "Green Beans": { kcal: 31, protein: 1.8, carbs: 7, fat: 0.1, fiber: 3.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian"], breakfast: false },
            "Mushrooms": { kcal: 22, protein: 3.1, carbs: 3.3, fat: 0.3, fiber: 1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian"], breakfast: false },
            "Carrots": { kcal: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian", "indian"], breakfast: false },
            "Eggplant": { kcal: 25, protein: 1, carbs: 6, fat: 0.2, fiber: 3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "mediterranean", "asian"], breakfast: false },
            "Asparagus": { kcal: 20, protein: 2.2, carbs: 3.9, fat: 0.1, fiber: 2.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Brussels Sprouts": { kcal: 43, protein: 3.4, carbs: 9, fat: 0.3, fiber: 3.8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Fennel": { kcal: 31, protein: 1.2, carbs: 7.3, fat: 0.2, fiber: 3.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Artichoke": { kcal: 47, protein: 3.3, carbs: 11, fat: 0.2, fiber: 5.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Sauerkraut": { kcal: 19, protein: 0.9, carbs: 4.3, fat: 0.1, fiber: 2.9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Kohlrabi": { kcal: 27, protein: 1.7, carbs: 6.2, fat: 0.1, fiber: 3.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Pumpkin": { kcal: 26, protein: 1, carbs: 6.5, fat: 0.1, fiber: 0.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "latin", "asian"], breakfast: false },
            "Swiss Chard (Mangold)": { kcal: 19, protein: 1.8, carbs: 3.7, fat: 0.2, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Pak Choi": { kcal: 13, protein: 1.5, carbs: 2.2, fat: 0.2, fiber: 1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Romanesco": { kcal: 25, protein: 2.5, carbs: 4.1, fat: 0.4, fiber: 2.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Celery Stalk": { kcal: 16, protein: 0.7, carbs: 3, fat: 0.2, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Radishes": { kcal: 16, protein: 0.7, carbs: 3.4, fat: 0.1, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },

            // === ASIAN VEGETABLES ===
            "Bok Choy": { kcal: 13, protein: 1.5, carbs: 2.2, fat: 0.2, fiber: 1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Bean Sprouts": { kcal: 31, protein: 3, carbs: 6, fat: 0.2, fiber: 1.8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Snow Peas": { kcal: 42, protein: 2.8, carbs: 7.6, fat: 0.2, fiber: 2.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Daikon Radish": { kcal: 18, protein: 0.6, carbs: 4.1, fat: 0.1, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Napa Cabbage": { kcal: 16, protein: 1.2, carbs: 3.2, fat: 0.2, fiber: 1.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Bamboo Shoots": { kcal: 27, protein: 2.6, carbs: 5.2, fat: 0.3, fiber: 2.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Lotus Root": { kcal: 74, protein: 2.6, carbs: 17, fat: 0.1, fiber: 4.9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Shiitake Mushrooms": { kcal: 34, protein: 2.2, carbs: 7, fat: 0.5, fiber: 2.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Edamame Pods": { kcal: 122, protein: 11, carbs: 10, fat: 5, fiber: 5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },

            // === INDIAN VEGETABLES ===
            "Okra (Bhindi)": { kcal: 33, protein: 1.9, carbs: 7, fat: 0.2, fiber: 3.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian"], breakfast: false },
            "Bitter Gourd (Karela)": { kcal: 17, protein: 1, carbs: 3.7, fat: 0.2, fiber: 2.8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian", "asian"], breakfast: false },
            "Drumstick (Moringa Pods)": { kcal: 37, protein: 2, carbs: 8.5, fat: 0.2, fiber: 3.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian"], breakfast: false },
            "Ridge Gourd (Tori)": { kcal: 18, protein: 1.2, carbs: 3.4, fat: 0.2, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian"], breakfast: false },

            // === LATIN VEGETABLES ===
            "Chayote": { kcal: 19, protein: 0.8, carbs: 4.5, fat: 0.1, fiber: 1.7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin"], breakfast: false },
            "Nopales (Cactus)": { kcal: 16, protein: 1.3, carbs: 3.3, fat: 0.1, fiber: 2.2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin"], breakfast: false },
            "Jicama": { kcal: 38, protein: 0.7, carbs: 9, fat: 0.1, fiber: 4.9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin"], breakfast: false },

            // === MEDITERRANEAN VEGETABLES ===
            "Sun-dried Tomatoes": { kcal: 258, protein: 14, carbs: 56, fat: 3, fiber: 12, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["mediterranean"], breakfast: false },
            "Roasted Red Pepper": { kcal: 28, protein: 0.9, carbs: 5.5, fat: 0.3, fiber: 1.7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["mediterranean"], breakfast: false },
        }
    },
    salate: {
        label: "&#129388; Salads & Leafy Greens",
        items: {
            "Mixed Leaf Salad": { kcal: 14, protein: 1.3, carbs: 2.2, fat: 0.2, fiber: 1.8, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian", "indian", "mediterranean", "latin"], breakfast: false },
            "Lamb's Lettuce (Feldsalat)": { kcal: 14, protein: 1.8, carbs: 2, fat: 0.4, fiber: 1.7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: false },
            "Endive": { kcal: 17, protein: 1.3, carbs: 3.4, fat: 0.2, fiber: 3.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Frisee": { kcal: 17, protein: 1.3, carbs: 3.4, fat: 0.2, fiber: 3.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Lollo Rosso": { kcal: 16, protein: 1.4, carbs: 2.3, fat: 0.2, fiber: 1.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Rocket (Rucola)": { kcal: 25, protein: 2.6, carbs: 3.7, fat: 0.7, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: false },
            "Seaweed Salad (Wakame)": { kcal: 45, protein: 3, carbs: 9, fat: 0.6, fiber: 0.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: false },
            "Tabbouleh Base": { kcal: 20, protein: 1.5, carbs: 3, fat: 0.5, fiber: 2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["mediterranean"], breakfast: false },
        }
    },
    obst: {
        label: "&#127815; Fruits",
        items: {
            "Apple": { kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian", "indian", "mediterranean", "latin"], breakfast: true },
            "Banana": { kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian", "indian", "latin"], breakfast: true },
            "Mixed Berries": { kcal: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Orange": { kcal: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: true },
            "Pear": { kcal: 57, protein: 0.4, carbs: 15, fat: 0.1, fiber: 3.1, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Kiwi": { kcal: 61, protein: 1.1, carbs: 15, fat: 0.5, fiber: 3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Mango": { kcal: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian", "indian", "latin"], breakfast: true },
            "Papaya": { kcal: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "asian", "latin"], breakfast: true },
            "Peach": { kcal: 39, protein: 0.9, carbs: 10, fat: 0.3, fiber: 1.5, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: true },
            "Currants": { kcal: 56, protein: 1.4, carbs: 14, fat: 0.4, fiber: 4.3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Avocado": { kcal: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "latin", "mediterranean"], breakfast: true },
            "Lychee": { kcal: 66, protein: 0.8, carbs: 17, fat: 0.4, fiber: 1.3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian"], breakfast: true },
            "Dragon Fruit": { kcal: 50, protein: 1.1, carbs: 11, fat: 0.4, fiber: 3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "latin"], breakfast: true },
            "Guava": { kcal: 68, protein: 2.6, carbs: 14, fat: 1, fiber: 5.4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian", "latin"], breakfast: true },
            "Passion Fruit": { kcal: 97, protein: 2.2, carbs: 23, fat: 0.7, fiber: 10, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin"], breakfast: true },
            "Pomegranate Seeds": { kcal: 83, protein: 1.7, carbs: 19, fat: 1.2, fiber: 4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian", "mediterranean"], breakfast: true },
        }
    },
    huelsenfruechte: {
        label: "&#129372; Nuts & Seeds",
        items: {
            "Almonds": { kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian", "mediterranean"], breakfast: true },
            "Walnuts": { kcal: 654, protein: 15, carbs: 14, fat: 65, fiber: 7, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: true },
            "Chia Seeds": { kcal: 486, protein: 17, carbs: 42, fat: 31, fiber: 34, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "latin"], breakfast: true },
            "Flaxseed (Leinsamen)": { kcal: 534, protein: 18, carbs: 29, fat: 42, fiber: 27, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "indian"], breakfast: true },
            "Sunflower Seeds": { kcal: 584, protein: 21, carbs: 20, fat: 51, fiber: 9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Sesame Seeds": { kcal: 573, protein: 18, carbs: 23, fat: 50, fiber: 12, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "indian", "mediterranean"], breakfast: true },
            "Cashews": { kcal: 553, protein: 18, carbs: 30, fat: 44, fiber: 3, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "indian"], breakfast: true },
            "Peanuts": { kcal: 567, protein: 26, carbs: 16, fat: 49, fiber: 9, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "latin"], breakfast: true },
            "Pumpkin Seeds (Pepitas)": { kcal: 559, protein: 30, carbs: 11, fat: 49, fiber: 6, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "latin"], breakfast: true },
            "Pine Nuts": { kcal: 673, protein: 14, carbs: 13, fat: 68, fiber: 4, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["mediterranean"], breakfast: true },
        }
    },
    oele: {
        label: "&#129361; Oils & Fats",
        items: {
            "Olive Oil": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european", "mediterranean"], breakfast: true },
            "Coconut Oil": { kcal: 862, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "indian"], breakfast: true },
            "Flaxseed Oil (Leinoel)": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Butter": { kcal: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["european", "indian"], breakfast: true },
            "Avocado Oil": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["latin", "european"], breakfast: true },
            "Walnut Oil": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["european"], breakfast: true },
            "Ghee": { kcal: 900, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "pescatarian"], cuisine: ["indian", "european"], breakfast: true },
            "Sesame Oil": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["asian", "indian"], breakfast: true },
            "Mustard Oil": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, tags: ["omnivore", "vegetarian", "vegan", "pescatarian"], cuisine: ["indian"], breakfast: true },
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

// Grains/noodles in FOODS are stored as dry weight (the meal plan doses them dry)
const DRY_WEIGHT_FOODS = new Set([
    "Oatmeal (Haferflocken)", "Spelt Flakes (Dinkelflocken)", "Brown Rice", "Basmati Rice", "Jasmine Rice",
    "Whole Wheat Pasta", "Quinoa", "Couscous", "Millet (Hirse)", "Buckwheat", "Bulgur",
    "Rice Noodles", "Soba Noodles", "Udon Noodles", "Glass Noodles",
]);

// Tracker-only foods: cooked weights, so a weighed plate of cooked rice counts correctly (per 100 g cooked)
const TRACKER_FOODS = {
    "Brown Rice (cooked)": { kcal: 123, protein: 2.7, carbs: 25.6, fat: 1, fiber: 1.6 },
    "Basmati Rice (cooked)": { kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
    "Jasmine Rice (cooked)": { kcal: 129, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
    "Pasta (cooked)": { kcal: 158, protein: 5.8, carbs: 31, fat: 0.9, fiber: 1.8 },
    "Whole Wheat Pasta (cooked)": { kcal: 149, protein: 6, carbs: 30, fat: 1.7, fiber: 3.9 },
    "Quinoa (cooked)": { kcal: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8 },
    "Couscous (cooked)": { kcal: 112, protein: 3.8, carbs: 23.2, fat: 0.2, fiber: 1.4 },
    "Millet (Hirse) (cooked)": { kcal: 119, protein: 3.5, carbs: 23.7, fat: 1, fiber: 1.3 },
    "Buckwheat (cooked)": { kcal: 92, protein: 3.4, carbs: 19.9, fat: 0.6, fiber: 2.7 },
    "Bulgur (cooked)": { kcal: 83, protein: 3.1, carbs: 18.6, fat: 0.2, fiber: 4.5 },
    "Rice Noodles (cooked)": { kcal: 108, protein: 1.8, carbs: 24, fat: 0.2, fiber: 1 },
    "Soba Noodles (cooked)": { kcal: 99, protein: 5.1, carbs: 21.4, fat: 0.1, fiber: 1 },
};

const MEAL_ICONS = { 'Breakfast': '&#127749;', 'Lunch': '&#9728;', 'Dinner': '&#127769;', 'Snack': '&#127856;', 'Snack 1': '&#127856;', 'Snack 2': '&#127838;', 'Snack 3': '&#127815;' };

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
        // === INDIAN BREAKFAST ===
        { match: ['Idli'], name: 'Idli with Chutney', tip: 'Steamed rice cakes with coconut chutney and sambar.' },
        { match: ['Dosa'], name: 'Masala Dosa', tip: 'Crispy fermented crepe - serve with potato filling and coconut chutney.' },
        { match: ['Chapati', 'Paneer'], name: 'Paneer Paratha', tip: 'Stuffed chapati with spiced paneer filling.' },
        { match: ['Chapati', 'Eggs'], name: 'Egg Paratha', tip: 'Chapati with spiced egg filling - a protein-rich Indian breakfast.' },
        // === ASIAN BREAKFAST ===
        { match: ['Silken Tofu'], name: 'Silken Tofu Bowl', tip: 'Warm silken tofu with soy sauce, ginger and scallions.' },
        // === LATIN BREAKFAST ===
        { match: ['Tortilla', 'Eggs'], name: 'Huevos Rancheros', tip: 'Eggs on corn tortilla with salsa, beans and avocado.' },
        { match: ['Tortilla'], name: 'Breakfast Quesadilla', tip: 'Warm tortilla with cheese, eggs and fresh salsa.' },
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
        // === ASIAN LUNCH ===
        { match: ['Teriyaki'], name: 'Teriyaki Chicken Bowl', tip: 'Glazed chicken with rice, edamame and pickled ginger.' },
        { match: ['Bulgogi|Korean'], name: 'Korean BBQ Bowl', tip: 'Marinated beef with rice, kimchi and sesame seeds.' },
        { match: ['Tofu', 'Soba|Udon|Rice Noodles'], name: 'Asian Noodle Bowl', tip: 'Stir-fried tofu with noodles, pak choi and soy-sesame dressing.' },
        { match: ['Steamed Fish'], name: 'Cantonese Steamed Fish', tip: 'Steam with ginger, scallions and light soy sauce.' },
        { match: ['Shrimp', 'Rice Noodles|Glass Noodles'], name: 'Pad Thai Style Bowl', tip: 'Stir-fry shrimp with noodles, bean sprouts, peanuts and lime.' },
        // === INDIAN LUNCH ===
        { match: ['Tikka'], name: 'Chicken Tikka Masala', tip: 'Spiced chicken in a tomato-cream sauce with basmati rice.' },
        { match: ['Tandoori'], name: 'Tandoori Fish Plate', tip: 'Yogurt-marinated fish with mint chutney and salad.' },
        { match: ['Paneer', 'Spinach'], name: 'Palak Paneer', tip: 'Paneer cubes in creamy spinach sauce with cumin and garam masala.' },
        { match: ['Paneer'], name: 'Paneer Tikka Bowl', tip: 'Grilled spiced paneer with raita and salad.' },
        { match: ['Dal', 'Rice'], name: 'Dal Rice', tip: 'Yellow lentil stew with turmeric and cumin, served over basmati rice.' },
        { match: ['Dal'], name: 'Comforting Dal', tip: 'Simmer with onion, tomato, turmeric and tempered spices.' },
        { match: ['Chana'], name: 'Chana Masala', tip: 'Spiced chickpea curry with tomato, cumin and coriander.' },
        // === MEDITERRANEAN LUNCH ===
        { match: ['Halloumi', 'Salad|Rocket'], name: 'Halloumi Salad', tip: 'Pan-fried halloumi over mixed greens with pomegranate and lemon.' },
        { match: ['Halloumi'], name: 'Grilled Halloumi Plate', tip: 'Grill until golden, serve with hummus and roasted vegetables.' },
        { match: ['Bulgur'], name: 'Bulgur Salad Bowl', tip: 'Fluffy bulgur with herbs, tomatoes, cucumber and lemon-olive oil dressing.' },
        // === LATIN LUNCH ===
        { match: ['Carne Asada'], name: 'Carne Asada Bowl', tip: 'Grilled marinated beef with rice, beans, salsa and fresh cilantro.' },
        { match: ['Pollo Asado'], name: 'Pollo Asado Plate', tip: 'Citrus-marinated grilled chicken with rice, beans and avocado.' },
        { match: ['Black Beans', 'Rice'], name: 'Arroz con Frijoles', tip: 'Classic rice and beans with sofrito, cilantro and lime.' },
        { match: ['Tortilla'], name: 'Taco Bowl', tip: 'Build a bowl with protein, corn tortilla strips, salsa and guacamole.' },
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

function getMealType(mealIndex) {
    const numMeals = (state.preferences && state.preferences.numMeals) || 3;
    const typeMap = {
        3: ['breakfast', 'lunch', 'dinner'],
        4: ['breakfast', 'lunch', 'snack', 'dinner'],
        5: ['breakfast', 'snack', 'lunch', 'snack', 'dinner'],
        6: ['breakfast', 'snack', 'lunch', 'snack', 'dinner', 'snack'],
    };
    const types = typeMap[numMeals] || typeMap[3];
    return types[mealIndex] || 'lunch';
}

function getRecipeName(mealIndex, items) {
    const mealType = getMealType(mealIndex);

    // Snacks don't have recipes - return a simple fallback
    if (mealType === 'snack') {
        return { name: 'Balanced Snack', tip: 'A protein-rich snack keeps you satisfied until your next meal.' };
    }

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
const PLAN_KEY = 'nourishlab_plan';
const DAY_KEY = 'nourishlab_day';

function saveToStorage() {
    const data = {};

    ['name', 'alter', 'groesse', 'gewicht', 'zielgewicht', 'koerperfett', 'customKcal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) data[id] = el.value;
    });

    const akt = document.getElementById('aktivitaet');
    if (akt) data.aktivitaet = akt.value;

    const slider = document.getElementById('weightlossRate');
    if (slider) data.weightlossRate = slider.value;

    const planDays = document.getElementById('planDays');
    if (planDays) data.planDays = planDays.value;

    const mealsPerDay = document.getElementById('mealsPerDay');
    if (mealsPerDay) data.mealsPerDay = mealsPerDay.value;

    ['geschlecht', 'ernaehrungsform', 'mealsplit'].forEach(name => {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        if (checked) data['radio_' + name] = checked.value;
    });

    ['ziel', 'sportart', 'umstaende', 'allergie', 'cuisine'].forEach(name => {
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

    ['name', 'alter', 'groesse', 'gewicht', 'zielgewicht', 'koerperfett', 'customKcal'].forEach(id => {
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

    const mealsPerDay = document.getElementById('mealsPerDay');
    if (mealsPerDay && data.mealsPerDay) {
        mealsPerDay.value = data.mealsPerDay;
        updateMealSplitOptions(); // rebuild split options for saved meal count
    }

    ['geschlecht', 'ernaehrungsform', 'mealsplit'].forEach(name => {
        const val = data['radio_' + name];
        if (val) {
            const el = document.querySelector(`input[name="${name}"][value="${val}"]`);
            if (el) el.checked = true;
        }
    });

    ['ziel', 'sportart', 'umstaende', 'allergie', 'cuisine'].forEach(name => {
        const vals = data['check_' + name] || [];
        if (vals.length > 0) {
            document.querySelectorAll(`input[name="${name}"]`).forEach(el => {
                el.checked = vals.includes(el.value);
            });
        }
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
    if (confirm(L('Clear all saved data? This will reset all your inputs.', 'Alle gespeicherten Daten löschen? Deine Eingaben werden zurückgesetzt.'))) {
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
    planCreatedDate: null,
    day: null,
    waterGlasses: 0,
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initForm();
    initGoalToggle();
    initConditionConflicts();
    initWeightLossSlider();
    initFoodSelection();
    initDayTabs();
    initTracker();
    loadFromStorage();
    loadWaterTracker();
    renderWaterTracker();
    loadPlan();
    loadDay();
    renderTracker();
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) checkDayRollover();
    });
    initAutoSave();
    renderHistory();
    renderCharts();
});

// Re-render everything app.js builds with language-dependent text (fixed texts are handled by i18n.js)
function onLanguageChange() {
    const scrollY = window.scrollY;
    updateNutritionRules(parseInt(document.getElementById('mealsPerDay').value) || 3);
    if (state.results.bmi !== undefined) renderResults();
    if (state.weekPlan.length) {
        buildDayTabs(state.currentDay);
        updateMealplanSubtitle();
        renderDayPlan(state.currentDay);
    }
    if (state.day) renderTracker();
    if (trackerSelectedFood) document.getElementById('trackerFoodInput').value = foodLabel(trackerSelectedFood);
    updateTrackerPreview();
    renderWaterTracker();
    renderHistory();
    if (!document.getElementById('trackerFeedback').classList.contains('hidden')) {
        const entry = getTrackingHistory().find(d => d.date === state.day.date);
        if (entry) generateFeedback(entry);
    }
    if (!document.getElementById('shoppinglist').classList.contains('hidden')) generateShoppingList();
    // Re-rendering may trigger smooth scrolls; stay where the user is
    window.scrollTo({ top: scrollY, behavior: 'instant' });
}

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

// === CONDITION CONFLICT HANDLING ===
const CONDITION_CONFLICTS = [
    { a: 'hypothyroid', b: 'hyperthyroid', msg: T('Hypothyroidism and Hyperthyroidism are opposites — you can only select one.', 'Schilddrüsenunter- und -überfunktion schließen sich aus – du kannst nur eins wählen.') },
    { a: 'pregnant', b: 'menopause', msg: T('Pregnancy and Menopause cannot be selected together.', 'Schwangerschaft und Wechseljahre können nicht zusammen gewählt werden.') },
    { a: 'pregnant', b: 'edrecovery', msg: T('Pregnancy with Eating Disorder Recovery requires specialized medical care. Please consult your healthcare team. Both remain selected, but be aware of limitations.', 'Schwangerschaft während einer Essstörungs-Genesung braucht spezielle medizinische Betreuung. Bitte sprich mit deinem Behandlungsteam. Beides bleibt ausgewählt, aber beachte die Einschränkungen.') },
];

function initConditionConflicts() {
    document.querySelectorAll('input[name="umstaende"]').forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (!e.target.checked) return;
            const val = e.target.value;
            for (const conflict of CONDITION_CONFLICTS) {
                const otherVal = val === conflict.a ? conflict.b : val === conflict.b ? conflict.a : null;
                if (!otherVal) continue;
                const otherCb = document.querySelector(`input[name="umstaende"][value="${otherVal}"]`);
                if (!otherCb || !otherCb.checked) continue;
                // For warning-only conflicts (no uncheck), skip unchecking
                if (val === 'pregnant' && otherVal === 'edrecovery' || val === 'edrecovery' && otherVal === 'pregnant') {
                    showConditionWarning(conflict.msg, 'warning');
                    continue;
                }
                // Mutual exclusion: uncheck the other
                otherCb.checked = false;
                otherCb.dispatchEvent(new Event('change', { bubbles: true }));
                showConditionWarning(conflict.msg, 'conflict');
            }
            // Handle trimester visibility
            document.getElementById('trimesterGroup').classList.toggle('hidden',
                !document.querySelector('input[name="umstaende"][value="pregnant"]').checked);
        });
    });
}

function showConditionWarning(msg, type) {
    // Remove existing warning
    const existing = document.querySelector('.condition-warning');
    if (existing) existing.remove();

    msg = tr(msg);
    const div = document.createElement('div');
    div.className = 'condition-warning';
    div.style.cssText = `
        background: ${type === 'conflict' ? '#2d1b1b' : '#2d2a1b'};
        border: 1px solid ${type === 'conflict' ? '#e74c3c' : '#f39c12'};
        color: ${type === 'conflict' ? '#ff6b6b' : '#ffd93d'};
        padding: 0.75rem 1rem;
        border-radius: 8px;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        animation: fadeIn 0.3s ease;
    `;
    div.textContent = msg;

    const checkboxGroup = document.querySelector('input[name="umstaende"]').closest('.checkbox-group');
    checkboxGroup.parentElement.appendChild(div);

    setTimeout(() => {
        div.style.transition = 'opacity 0.5s';
        div.style.opacity = '0';
        setTimeout(() => div.remove(), 500);
    }, 4000);
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
                label.innerHTML = `<input type="checkbox" name="oil" value="${name}"><span>${name}</span>`;
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

function updateMealSplitOptions() {
    const numMeals = parseInt(document.getElementById('mealsPerDay').value) || 3;
    const container = document.getElementById('mealSplitSelector');

    const splitOptions = {
        3: [
            { value: '30-40-30', label: '30 / 40 / 30', desc: 'Breakfast / Lunch / Dinner' },
            { value: '25-45-30', label: '25 / 45 / 30', desc: 'Light Breakfast' },
            { value: '35-35-30', label: '35 / 35 / 30', desc: 'Evenly Distributed' },
        ],
        4: [
            { value: '25-35-15-25', label: '25 / 35 / 15 / 25', desc: 'Breakfast / Lunch / Snack / Dinner' },
            { value: '20-35-15-30', label: '20 / 35 / 15 / 30', desc: 'Light Breakfast, Bigger Dinner' },
            { value: '25-30-20-25', label: '25 / 30 / 20 / 25', desc: 'Evenly Distributed' },
        ],
        5: [
            { value: '25-10-30-10-25', label: '25 / 10 / 30 / 10 / 25', desc: 'BF / Snack / Lunch / Snack / Dinner' },
            { value: '20-10-30-15-25', label: '20 / 10 / 30 / 15 / 25', desc: 'Light Breakfast' },
            { value: '20-15-25-15-25', label: '20 / 15 / 25 / 15 / 25', desc: 'Evenly Distributed' },
        ],
        6: [
            { value: '20-10-25-10-25-10', label: '20 / 10 / 25 / 10 / 25 / 10', desc: 'Main meals + 3 snacks' },
            { value: '17-17-17-17-16-16', label: '17 / 17 / 17 / 17 / 16 / 16', desc: 'Evenly Distributed' },
            { value: '20-10-25-15-20-10', label: '20 / 10 / 25 / 15 / 20 / 10', desc: 'Bigger Lunch' },
        ],
    };

    const options = splitOptions[numMeals] || splitOptions[3];
    container.innerHTML = options.map((opt, i) => `
        <label class="radio-card">
            <input type="radio" name="mealsplit" value="${opt.value}" ${i === 0 ? 'checked' : ''}>
            <span class="radio-label">${opt.label}<br><small>${opt.desc}</small></span>
        </label>
    `).join('');

    // Update nutrition rules based on meal count
    updateNutritionRules(numMeals);
}

function updateNutritionRules(numMeals) {
    const mealsContent = document.getElementById('ruleMealsContent');
    const gapContent = document.getElementById('ruleMealGapContent');

    if (numMeals === 3) {
        mealsContent.innerHTML = `
            <h4>Only 3 Meals Per Day</h4>
            <p>Eat exactly three meals per day. No snacking between meals. Research shows this allows insulin levels to drop between meals, promoting fat oxidation and improving insulin sensitivity over time.</p>
        `;
        gapContent.innerHTML = `
            <h4>5-Hour Gap Between Meals</h4>
            <p>Leave at least 5 hours between each meal. This activates the migrating motor complex (MMC) - your gut's natural cleansing wave - and ensures full digestion before the next meal.</p>
        `;
        document.getElementById('ruleMealGap').style.display = '';
    } else if (numMeals === 4) {
        mealsContent.innerHTML = `
            <h4>${L(`${numMeals} Meals Per Day`, `${numMeals} Mahlzeiten pro Tag`)}</h4>
            <p>${L('Eat four meals per day: 3 main meals plus 1 snack. Keep snacks protein-rich and moderate in size to maintain stable blood sugar levels without over-stimulating insulin.', 'Iss vier Mahlzeiten am Tag: 3 Hauptmahlzeiten plus 1 Snack. Halte Snacks eiweißreich und moderat, damit dein Blutzucker stabil bleibt, ohne das Insulin zu stark anzuregen.')}</p>
        `;
        gapContent.innerHTML = `
            <h4>${L('3-4 Hour Gap Between Meals', '3–4 Stunden Pause zwischen den Mahlzeiten')}</h4>
            <p>${L('With 4 meals per day, aim for 3-4 hours between meals. This keeps your metabolism active while still allowing adequate digestion time between meals.', 'Bei 4 Mahlzeiten am Tag plane 3–4 Stunden dazwischen ein. So bleibt dein Stoffwechsel aktiv und du hast trotzdem genug Zeit zum Verdauen.')}</p>
        `;
        document.getElementById('ruleMealGap').style.display = '';
    } else {
        mealsContent.innerHTML = `
            <h4>${L(`${numMeals} Meals Per Day`, `${numMeals} Mahlzeiten pro Tag`)}</h4>
            <p>${L(`Eat ${numMeals} smaller meals spread throughout the day. This approach keeps blood sugar stable and can help manage hunger, especially at higher calorie targets. Focus on balanced macros at each meal.`, `Iss ${numMeals} kleinere Mahlzeiten über den Tag verteilt. Das hält den Blutzucker stabil und hilft gegen Hunger, besonders bei höherem Kalorienziel. Achte bei jeder Mahlzeit auf ausgewogene Makros.`)}</p>
        `;
        gapContent.innerHTML = `
            <h4>${L('2-3 Hour Gap Between Meals', '2–3 Stunden Pause zwischen den Mahlzeiten')}</h4>
            <p>${L(`With ${numMeals} meals per day, eat every 2-3 hours. Keep portion sizes moderate - the goal is steady energy, not large spikes. Plan your last meal at least 2 hours before sleep.`, `Bei ${numMeals} Mahlzeiten am Tag iss alle 2–3 Stunden. Halte die Portionen moderat: Ziel ist gleichmäßige Energie statt großer Spitzen. Plane die letzte Mahlzeit mindestens 2 Stunden vor dem Schlafen.`)}</p>
        `;
        document.getElementById('ruleMealGap').style.display = '';
    }
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
        customKcal: parseInt(document.getElementById('customKcal').value) || null,
        umstaende: Array.from(document.querySelectorAll('input[name="umstaende"]:checked')).map(el => el.value),
        allergien: Array.from(document.querySelectorAll('input[name="allergie"]:checked')).map(el => el.value),
    };

    if (!profile.geschlecht || !profile.alter || !profile.groesse || !profile.gewicht || !profile.aktivitaet || goals.length === 0) {
        alert(L('Please fill in all required fields and select at least one goal.', 'Bitte fülle alle Pflichtfelder aus und wähle mindestens ein Ziel.'));
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
    if (profile.umstaende.includes('hypothyroid')) bmrAdjust -= 0.10;
    if (profile.umstaende.includes('hyperthyroid')) bmrAdjust += 0.15;
    if (profile.umstaende.includes('pcos')) bmrAdjust -= 0.10;
    if (profile.umstaende.includes('stress')) bmrAdjust -= 0.03;
    if (profile.umstaende.includes('autoimmune')) bmrAdjust -= 0.07;
    if (profile.umstaende.includes('depression')) bmrAdjust -= 0.04;
    if (profile.umstaende.includes('recovery')) bmrAdjust += 0.17;
    bmr *= bmrAdjust;

    // TDEE
    let tdee = Math.round(bmr * profile.aktivitaet);

    // Additional calorie needs for pregnancy and breastfeeding
    let extraKcal = 0;
    if (profile.umstaende.includes('pregnant')) {
        const trimester = parseInt(document.getElementById('trimester').value) || 3;
        if (trimester === 2) extraKcal += 340;
        else if (trimester === 3) extraKcal += 450;
    }
    if (profile.umstaende.includes('breastfeeding')) extraKcal += 400;

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
        targetDetail = T(`Recomp: -${adjustedDeficit} kcal/day (${profile.weightlossRate} kg fat loss/week + muscle support)`, `Recomp: -${adjustedDeficit} kcal/Tag (${profile.weightlossRate} kg Fettabbau/Woche + Muskelerhalt)`);
    } else if (hasFatloss) {
        const dailyDeficit = Math.round(profile.weightlossRate * 7700 / 7);
        targetKcal = tdee - dailyDeficit;
        targetDetail = T(`Fat loss: -${dailyDeficit} kcal/day (target ${profile.weightlossRate} kg/week)`, `Fettabbau: -${dailyDeficit} kcal/Tag (Ziel ${profile.weightlossRate} kg/Woche)`);
    } else if (hasMuscle) {
        targetKcal = Math.round(tdee * 1.10);
        targetDetail = T('+10% caloric surplus for muscle building', '+10 % Kalorienüberschuss für Muskelaufbau');
    } else if (hasMaintain) {
        targetKcal = tdee;
        targetDetail = T('Maintenance calories', 'Erhaltungskalorien');
    } else {
        targetKcal = tdee;
        targetDetail = T('Maintenance calories', 'Erhaltungskalorien');
    }

    // Eating disorder recovery: never suggest a deficit
    if (profile.umstaende.includes('edrecovery')) {
        if (targetKcal < tdee) {
            targetKcal = tdee;
            targetDetail = T('Maintenance calories (deficit disabled for ED recovery)', 'Erhaltungskalorien (kein Defizit während der Essstörungs-Genesung)');
        }
    }

    // Add extra calories for pregnancy / breastfeeding
    if (extraKcal > 0) {
        targetKcal += extraKcal;
        const preg = profile.umstaende.includes('pregnant');
        const bf = profile.umstaende.includes('breastfeeding');
        const reasonEn = [preg && 'pregnancy', bf && 'breastfeeding'].filter(Boolean).join(' & ');
        const reasonDe = [preg && 'Schwangerschaft', bf && 'Stillzeit'].filter(Boolean).join(' & ');
        targetDetail = T(`${targetDetail.en} (+${extraKcal} kcal for ${reasonEn})`, `${targetDetail.de} (+${extraKcal} kcal für ${reasonDe})`);
    }

    if (targetKcal < Math.round(bmr)) {
        targetKcal = Math.round(bmr);
        targetDetail = T(`${targetDetail.en} (raised to BMR minimum)`, `${targetDetail.de} (auf Grundumsatz angehoben)`);
    }

    // Own calorie target replaces the calculated one (but never a deficit during ED recovery)
    const targetWarnings = [];
    if (profile.customKcal) {
        const calculatedKcal = targetKcal;
        if (profile.umstaende.includes('edrecovery') && profile.customKcal < tdee) {
            targetDetail = T(`Custom target ignored: no deficit during ED recovery (calculated: ${calculatedKcal} kcal)`, `Eigenes Ziel ignoriert: kein Defizit während der Essstörungs-Genesung (berechnet: ${calculatedKcal} kcal)`);
        } else {
            targetKcal = profile.customKcal;
            targetDetail = T(`Custom target (calculated: ${calculatedKcal} kcal)`, `Eigenes Ziel (berechnet: ${calculatedKcal} kcal)`);
            if (targetKcal < Math.round(bmr)) {
                targetWarnings.push(T(`Below your BMR (${Math.round(bmr)} kcal). Long-term this can slow your metabolism and cost muscle.`, `Unter deinem Grundumsatz (${Math.round(bmr)} kcal). Auf Dauer kann das den Stoffwechsel bremsen und Muskeln kosten.`));
            }
        }
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
    // Condition-based protein adjustments
    if (profile.umstaende.includes('pregnant') || profile.umstaende.includes('breastfeeding')) proteinPerKg = Math.max(proteinPerKg, 1.6);
    if (profile.umstaende.includes('recovery')) proteinPerKg = Math.max(proteinPerKg, 1.8);
    if (profile.umstaende.includes('pcos')) proteinPerKg = Math.max(proteinPerKg, 1.6);

    const proteinGrams = Math.round(profile.gewicht * proteinPerKg);
    const proteinKcal = proteinGrams * 4;
    const proteinPercent = Math.round((proteinKcal / targetKcal) * 100);

    let fatPercent = 30;
    if (hasFatloss && !hasMuscle) fatPercent = 28;
    if (profile.umstaende.includes('menopause')) fatPercent = 32;
    if (profile.umstaende.includes('pcos')) fatPercent = 30; // balanced, lower carb emphasis instead
    const fatKcal = Math.round(targetKcal * fatPercent / 100);
    const fatGrams = Math.round(fatKcal / 9);

    const carbsKcal = Math.max(targetKcal - proteinKcal - fatKcal, 0);
    const carbsGrams = Math.round(carbsKcal / 4);
    const carbsPercent = Math.round((carbsKcal / targetKcal) * 100);
    if (carbsPercent < 15) {
        targetWarnings.push(T(`Protein and fat use up almost the whole target, leaving only ${carbsGrams} g carbs. The meal plan can't hit this precisely.`, `Protein und Fett verbrauchen fast das ganze Ziel, für Kohlenhydrate bleiben nur ${carbsGrams} g. Der Plan kann das nicht genau treffen.`));
    }

    let fiberTarget = 30;
    if (profile.umstaende.includes('digestion')) fiberTarget = 35;

    state.results = { bmi, bmr: Math.round(bmr), tdee, targetKcal, targetDetail, targetWarnings };
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
    if (bmi < 18.5) bmiCategory = L('Underweight', 'Untergewicht');
    else if (bmi < 25) bmiCategory = L('Normal weight', 'Normalgewicht');
    else if (bmi < 30) bmiCategory = L('Overweight', 'Übergewicht');
    else bmiCategory = L('Obese', 'Adipositas');
    document.getElementById('resultBMIDetail').textContent = bmiCategory;

    const bmiPos = Math.min(Math.max((bmi - 16) / (40 - 16) * 100, 0), 100);
    document.getElementById('bmiIndicator').style.left = `calc(${bmiPos}% - 8px)`;

    document.getElementById('resultBMR').textContent = bmr + ' kcal';
    document.getElementById('resultTDEE').textContent = tdee + ' kcal';
    document.getElementById('resultTarget').textContent = targetKcal + ' kcal';
    document.getElementById('resultTargetDetail').textContent = tr(targetDetail);
    const warningEl = document.getElementById('resultTargetWarning');
    const warnings = (state.results.targetWarnings || []).map(w => '⚠ ' + tr(w));
    warningEl.textContent = warnings.join(' ');
    warningEl.classList.toggle('hidden', warnings.length === 0);

    const badgeContainer = document.getElementById('goalBadgeContainer');
    const goalLabels = {
        fatloss: { label: '&#128293; ' + L('Fat Loss', 'Fettabbau'), cls: 'fatloss' },
        muscle: { label: '&#128170; ' + L('Muscle Building', 'Muskelaufbau'), cls: 'muscle' },
        maintain: { label: '&#9878; ' + L('Maintain', 'Gewicht halten'), cls: 'maintain' },
        wellbeing: { label: '&#127804; ' + L('Wellbeing', 'Wohlbefinden'), cls: 'wellbeing' }
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
    document.getElementById('waterTarget').textContent = waterLiters + L(' liters (', ' Liter (') + Math.round(state.profile.gewicht * 35) + ' ml)';

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
            text: L(`<strong>Muscle Building - How it affects your plan:</strong><br>
            <span class="hint-effect">&#10132; Your calories are set ${Math.round(state.results.targetKcal - state.results.tdee)} kcal <em>above</em> your maintenance (+10% surplus).</span><br>
            <span class="hint-effect">&#10132; Protein is set to ${m.protein.grams}g/day (2.2g per kg body weight).</span><br>
            <span class="hint-why"><strong>Why?</strong> Building muscle tissue requires extra energy (caloric surplus) and amino acids (protein). Without a surplus, your body lacks the building blocks for new muscle. The 2.2g/kg protein target is based on research showing this is the upper threshold where muscle protein synthesis is maximized. Going higher provides no additional benefit. The +10% surplus is moderate - enough for muscle growth while minimizing fat gain.</span>`,
            `<strong>Muskelaufbau – so wirkt es sich auf deinen Plan aus:</strong><br>
            <span class="hint-effect">&#10132; Deine Kalorien liegen ${Math.round(state.results.targetKcal - state.results.tdee)} kcal <em>über</em> deinem Erhaltungsbedarf (+10 % Überschuss).</span><br>
            <span class="hint-effect">&#10132; Protein ist auf ${m.protein.grams}g/Tag gesetzt (2,2 g pro kg Körpergewicht).</span><br>
            <span class="hint-why"><strong>Warum?</strong> Für den Aufbau von Muskelgewebe braucht dein Körper zusätzliche Energie (Kalorienüberschuss) und Aminosäuren (Protein). Ohne Überschuss fehlen ihm die Bausteine für neue Muskulatur. Das Ziel von 2,2 g/kg Protein beruht auf Studien, die zeigen, dass hier die obere Schwelle liegt, ab der die Muskelproteinsynthese maximal ist. Mehr bringt keinen zusätzlichen Nutzen. Der Überschuss von +10 % ist moderat – genug für Muskelwachstum, bei möglichst wenig Fettzunahme.</span>`)
        });
    }

    if (p.goals.includes('fatloss') && p.goals.includes('muscle')) {
        const adjustedDeficit = Math.round(p.weightlossRate * 7700 / 7 * 0.80);
        hints.push({
            icon: '&#128170;&#128293;',
            text: L(`<strong>Body Recomposition - The Science:</strong><br>
            <span class="hint-effect">&#10132; Deficit reduced to -${adjustedDeficit} kcal/day (80% of a pure fat-loss deficit).</span><br>
            <span class="hint-effect">&#10132; Protein maximized at ${m.protein.grams}g/day (2.2g/kg) to preserve & build muscle.</span><br>
            <span class="hint-why"><strong>Why?</strong> Body recomposition (losing fat while gaining muscle) is possible but requires precision. A smaller deficit gives your body enough energy to support muscle protein synthesis while still losing fat. Research shows that higher protein intakes (1.8-2.2g/kg) during a caloric deficit significantly reduce muscle loss. Your body can redirect stored fat energy toward muscle building - but only if protein is high enough and the deficit isn't too aggressive. Strength training is essential: it provides the stimulus that tells your body to keep (and build) muscle instead of breaking it down.</span>`,
            `<strong>Body Recomposition – die Wissenschaft dahinter:</strong><br>
            <span class="hint-effect">&#10132; Defizit reduziert auf -${adjustedDeficit} kcal/Tag (80 % eines reinen Fettabbau-Defizits).</span><br>
            <span class="hint-effect">&#10132; Protein maximiert auf ${m.protein.grams}g/Tag (2,2 g/kg), um Muskeln zu erhalten und aufzubauen.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Body Recomposition (Fett verlieren und gleichzeitig Muskeln aufbauen) ist möglich, erfordert aber Präzision. Ein kleineres Defizit gibt deinem Körper genug Energie für die Muskelproteinsynthese, während du trotzdem Fett verlierst. Studien zeigen, dass eine höhere Proteinzufuhr (1,8–2,2 g/kg) im Kaloriendefizit den Muskelabbau deutlich verringert. Dein Körper kann gespeicherte Fettenergie in den Muskelaufbau umleiten – aber nur, wenn genug Protein da ist und das Defizit nicht zu aggressiv ist. Krafttraining ist unverzichtbar: Es liefert den Reiz, der deinem Körper signalisiert, Muskeln zu behalten (und aufzubauen) statt sie abzubauen.</span>`)
        });
    }

    if (p.goals.includes('fatloss') && !p.goals.includes('muscle')) {
        const dailyDeficit = Math.round(p.weightlossRate * 7700 / 7);
        hints.push({
            icon: '&#128293;',
            text: L(`<strong>Fat Loss - How your plan is calculated:</strong><br>
            <span class="hint-effect">&#10132; Daily deficit: -${dailyDeficit} kcal (target: ${p.weightlossRate} kg/week).</span><br>
            <span class="hint-effect">&#10132; Protein set to ${m.protein.grams}g/day (1.8g/kg) - higher than normal to protect muscle.</span><br>
            <span class="hint-why"><strong>Why?</strong> 1 kg of body fat stores approximately 7,700 kcal. So to lose ${p.weightlossRate} kg per week, you need a daily deficit of ~${dailyDeficit} kcal. Your protein is elevated because during a caloric deficit, your body may break down muscle for energy. High protein intake (1.6-2.0g/kg) has been shown in multiple studies to significantly preserve lean mass during weight loss. The 5-hour gaps between meals allow insulin to drop, which promotes fat oxidation (burning). No snacking is critical - every snack spikes insulin and stops fat burning.</span>`,
            `<strong>Fettabbau – so wird dein Plan berechnet:</strong><br>
            <span class="hint-effect">&#10132; Tägliches Defizit: -${dailyDeficit} kcal (Ziel: ${p.weightlossRate} kg/Woche).</span><br>
            <span class="hint-effect">&#10132; Protein auf ${m.protein.grams}g/Tag gesetzt (1,8 g/kg) – höher als normal, um deine Muskeln zu schützen.</span><br>
            <span class="hint-why"><strong>Warum?</strong> 1 kg Körperfett speichert etwa 7.700 kcal. Um ${p.weightlossRate} kg pro Woche zu verlieren, brauchst du also ein tägliches Defizit von ca. ${dailyDeficit} kcal. Dein Protein ist erhöht, weil dein Körper im Kaloriendefizit Muskeln zur Energiegewinnung abbauen kann. Eine hohe Proteinzufuhr (1,6–2,0 g/kg) erhält laut mehreren Studien die fettfreie Masse beim Abnehmen deutlich besser. Die 5-Stunden-Pausen zwischen den Mahlzeiten lassen den Insulinspiegel sinken, was die Fettverbrennung fördert. Nicht zu snacken ist entscheidend – jeder Snack lässt das Insulin steigen und stoppt die Fettverbrennung.</span>`)
        });
    }

    if (p.goals.includes('maintain')) {
        hints.push({
            icon: '&#9878;',
            text: L(`<strong>Weight Maintenance - Your TDEE explained:</strong><br>
            <span class="hint-effect">&#10132; Calories set at ${state.results.targetKcal} kcal (= your Total Daily Energy Expenditure).</span><br>
            <span class="hint-effect">&#10132; Balanced macros: ${m.protein.percent}% protein, ${m.carbs.percent}% carbs, ${m.fats.percent}% fats.</span><br>
            <span class="hint-why"><strong>Why?</strong> Your TDEE (${state.results.tdee} kcal) is calculated from your Basal Metabolic Rate (${state.results.bmr} kcal - the energy your body needs at complete rest) multiplied by your activity factor (${p.aktivitaet}). Eating at TDEE means energy in = energy out, maintaining your current weight. The ${m.protein.grams}g protein (${(m.protein.grams/p.gewicht).toFixed(1)}g/kg) is sufficient to maintain muscle mass and support daily recovery.</span>`,
            `<strong>Gewicht halten – dein TDEE erklärt:</strong><br>
            <span class="hint-effect">&#10132; Kalorien auf ${state.results.targetKcal} kcal gesetzt (= dein täglicher Gesamtenergieverbrauch).</span><br>
            <span class="hint-effect">&#10132; Ausgewogene Makros: ${m.protein.percent} % Protein, ${m.carbs.percent} % Kohlenhydrate, ${m.fats.percent} % Fett.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Dein TDEE (${state.results.tdee} kcal) berechnet sich aus deinem Grundumsatz (${state.results.bmr} kcal – die Energie, die dein Körper in völliger Ruhe braucht), multipliziert mit deinem Aktivitätsfaktor (${p.aktivitaet}). Isst du auf TDEE-Niveau, gilt: Energie rein = Energie raus, und dein Gewicht bleibt stabil. Die ${m.protein.grams}g Protein (${(m.protein.grams/p.gewicht).toFixed(1)}g/kg) reichen aus, um deine Muskelmasse zu erhalten und die tägliche Regeneration zu unterstützen.</span>`)
        });
    }

    if (p.goals.includes('wellbeing')) {
        hints.push({
            icon: '&#127804;',
            text: L(`<strong>General Wellbeing - Nutrition as Medicine:</strong><br>
            <span class="hint-effect">&#10132; Focus on nutrient density, variety, and meal timing.</span><br>
            <span class="hint-effect">&#10132; Fiber target: ${m.fiber.grams}g/day for gut health.</span><br>
            <span class="hint-why"><strong>Why?</strong> Modern nutritional science increasingly views food as medicine. The 3-meal structure with 5-hour gaps isn't just about weight - it regulates your circadian insulin rhythm, which affects energy, mood, and sleep quality. Starting each meal with protein stabilizes blood sugar for hours, preventing the energy crashes that come from carb-first eating. The "one apple before bed" rule provides pectin, a prebiotic fiber that feeds beneficial gut bacteria overnight. Your gut microbiome influences everything from immune function to serotonin production (95% of serotonin is made in the gut!).</span>`,
            `<strong>Allgemeines Wohlbefinden – Ernährung als Medizin:</strong><br>
            <span class="hint-effect">&#10132; Fokus auf Nährstoffdichte, Abwechslung und Mahlzeiten-Timing.</span><br>
            <span class="hint-effect">&#10132; Ballaststoffziel: ${m.fiber.grams}g/Tag für deine Darmgesundheit.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Die moderne Ernährungswissenschaft sieht Essen zunehmend als Medizin. Die Struktur mit 3 Mahlzeiten und 5-Stunden-Pausen dient nicht nur dem Gewicht – sie reguliert deinen zirkadianen Insulinrhythmus, der Energie, Stimmung und Schlafqualität beeinflusst. Jede Mahlzeit mit Protein zu beginnen, stabilisiert deinen Blutzucker für Stunden und verhindert die Energietiefs, die entstehen, wenn du zuerst Kohlenhydrate isst. Die Regel „ein Apfel vor dem Schlafen“ liefert Pektin, einen präbiotischen Ballaststoff, der über Nacht nützliche Darmbakterien ernährt. Dein Darmmikrobiom beeinflusst alles – von der Immunfunktion bis zur Serotoninproduktion (95 % des Serotonins entstehen im Darm!).</span>`)
        });
    }

    // === CONDITION-BASED EDUCATIONAL HINTS ===

    if (p.umstaende.includes('pregnant')) {
        const tri = parseInt(document.getElementById('trimester').value) || 3;
        const extraP = tri === 1 ? 0 : tri === 2 ? 340 : 450;
        hints.push({
            icon: '&#129328;',
            text: L(`<strong>Pregnancy (Trimester ${tri}) - Eating for two, wisely:</strong><br>
            <span class="hint-effect">&#10132; Calories increased by +${extraP} kcal/day for trimester ${tri}.</span><br>
            <span class="hint-effect">&#10132; Protein raised to ${m.protein.grams}g/day to support fetal growth.</span><br>
            <span class="hint-why"><strong>Why?</strong> In the 1st trimester, the embryo is tiny and calorie needs don't increase yet - focus on nutrient quality (folate!). From the 2nd trimester, fetal growth accelerates and your body needs +340 kcal/day. In the 3rd trimester, this rises to +450 kcal/day as the baby gains most of its weight. <em>Critical nutrients:</em> Folate (600 mcg/day - leafy greens, legumes) prevents neural tube defects. Iron (27 mg/day - nearly double normal) supports the 50% increase in blood volume. DHA/Omega-3 (fatty fish, walnuts) is essential for fetal brain development. <em>Avoid:</em> alcohol, high-mercury fish (swordfish, king mackerel), excess vitamin A from liver. Always consult your healthcare provider for personalized guidance.</span>`,
            `<strong>Schwangerschaft (${tri}. Trimester) – klug für zwei essen:</strong><br>
            <span class="hint-effect">&#10132; Kalorien um +${extraP} kcal/Tag erhöht für das ${tri}. Trimester.</span><br>
            <span class="hint-effect">&#10132; Protein auf ${m.protein.grams}g/Tag erhöht, um das Wachstum des Babys zu unterstützen.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Im 1. Trimester ist der Embryo winzig und der Kalorienbedarf steigt noch nicht – konzentriere dich auf Nährstoffqualität (Folat!). Ab dem 2. Trimester beschleunigt sich das Wachstum und dein Körper braucht +340 kcal/Tag. Im 3. Trimester steigt das auf +450 kcal/Tag, da das Baby den Großteil seines Gewichts zulegt. <em>Wichtige Nährstoffe:</em> Folat (600 µg/Tag – Blattgemüse, Hülsenfrüchte) beugt Neuralrohrdefekten vor. Eisen (27 mg/Tag – fast doppelt so viel wie normal) unterstützt die 50-prozentige Zunahme des Blutvolumens. DHA/Omega-3 (fetter Fisch, Walnüsse) ist essenziell für die Gehirnentwicklung des Babys. <em>Meiden:</em> Alkohol, quecksilberreicher Fisch (Schwertfisch, Königsmakrele), zu viel Vitamin A aus Leber. Sprich für eine persönliche Beratung immer mit deiner Ärztin, deinem Arzt oder deiner Hebamme.</span>`)
        });
    }

    if (p.umstaende.includes('breastfeeding')) {
        hints.push({
            icon: '&#129329;',
            text: L(`<strong>Breastfeeding - Fueling milk production:</strong><br>
            <span class="hint-effect">&#10132; Calories increased by +400 kcal/day for milk production.</span><br>
            <span class="hint-effect">&#10132; Protein raised to ${m.protein.grams}g/day. Hydration is critical.</span><br>
            <span class="hint-why"><strong>Why?</strong> Producing breast milk costs approximately 67-77 kcal per 100 mL. Exclusive breastfeeding typically produces 750-800 mL/day, requiring significant extra energy. Your body also draws from fat stores laid down during pregnancy, so the caloric supplement doesn't need to cover 100% of milk energy. <em>Key nutrients:</em> Iodine (290 mcg/day - seafood, dairy) is essential for your baby's thyroid and brain development. Choline (550 mg/day - eggs, liver) supports infant brain development. Vitamin D (600+ IU/day) and calcium (1000 mg/day) protect both your bones and your baby's skeletal development. Drink at least 2.5-3L of water daily - thirst is a reliable guide. Avoid strict dieting during breastfeeding as it can reduce milk supply.</span>`,
            `<strong>Stillzeit – Energie für die Milchbildung:</strong><br>
            <span class="hint-effect">&#10132; Kalorien um +400 kcal/Tag für die Milchbildung erhöht.</span><br>
            <span class="hint-effect">&#10132; Protein auf ${m.protein.grams}g/Tag erhöht. Ausreichend trinken ist entscheidend.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Die Bildung von Muttermilch kostet etwa 67–77 kcal pro 100 ml. Bei ausschließlichem Stillen entstehen typischerweise 750–800 ml/Tag, was deutlich mehr Energie erfordert. Dein Körper greift außerdem auf die in der Schwangerschaft angelegten Fettreserven zurück, sodass der Kalorienzuschlag nicht 100 % der Milchenergie abdecken muss. <em>Wichtige Nährstoffe:</em> Jod (290 µg/Tag – Meeresfrüchte, Milchprodukte) ist essenziell für die Schilddrüsen- und Gehirnentwicklung deines Babys. Cholin (550 mg/Tag – Eier, Leber) unterstützt die Gehirnentwicklung des Säuglings. Vitamin D (600+ IE/Tag) und Calcium (1000 mg/Tag) schützen deine Knochen und die Skelettentwicklung deines Babys. Trink täglich mindestens 2,5–3 l Wasser – Durst ist ein verlässlicher Wegweiser. Verzichte in der Stillzeit auf strenge Diäten, da sie die Milchmenge verringern können.</span>`)
        });
    }

    if (p.umstaende.includes('pcos')) {
        hints.push({
            icon: '&#9792;&#65039;',
            text: L(`<strong>PCOS - Insulin & hormonal balance:</strong><br>
            <span class="hint-effect">&#10132; BMR reduced by 10% (hormonal metabolic impact).</span><br>
            <span class="hint-effect">&#10132; Higher protein (${m.protein.grams}g/day), emphasis on low-GI carbs.</span><br>
            <span class="hint-why"><strong>Why?</strong> PCOS affects 6-12% of women and is strongly linked to insulin resistance, even in lean individuals. Studies show women with PCOS have a resting metabolic rate 40-80 kcal/day lower than weight-matched controls. The insulin resistance drives excess androgen production, worsening symptoms. <em>Nutritional strategy:</em> Low glycemic index carbohydrates (oats, legumes, sweet potatoes) help stabilize blood sugar and reduce insulin spikes. Higher protein increases satiety and supports stable blood sugar. Anti-inflammatory foods (omega-3 rich fish, turmeric, berries) may help reduce chronic low-grade inflammation associated with PCOS. Inositol (found in citrus fruits, beans) has shown promise in improving insulin sensitivity in PCOS.</span>`,
            `<strong>PCOS – Insulin & hormonelles Gleichgewicht:</strong><br>
            <span class="hint-effect">&#10132; Grundumsatz um 10 % reduziert (hormoneller Einfluss auf den Stoffwechsel).</span><br>
            <span class="hint-effect">&#10132; Mehr Protein (${m.protein.grams}g/Tag), Schwerpunkt auf Kohlenhydraten mit niedrigem GI.</span><br>
            <span class="hint-why"><strong>Warum?</strong> PCOS betrifft 6–12 % der Frauen und hängt eng mit Insulinresistenz zusammen, auch bei schlanken Personen. Studien zeigen, dass Frauen mit PCOS einen um 40–80 kcal/Tag niedrigeren Ruheumsatz haben als gleich schwere Vergleichspersonen. Die Insulinresistenz treibt eine übermäßige Androgenproduktion an und verstärkt die Symptome. <em>Ernährungsstrategie:</em> Kohlenhydrate mit niedrigem glykämischem Index (Haferflocken, Hülsenfrüchte, Süßkartoffeln) stabilisieren den Blutzucker und verringern Insulinspitzen. Mehr Protein sättigt länger und unterstützt einen stabilen Blutzucker. Entzündungshemmende Lebensmittel (omega-3-reicher Fisch, Kurkuma, Beeren) können die mit PCOS verbundene chronische, unterschwellige Entzündung verringern. Inositol (in Zitrusfrüchten, Bohnen) zeigt vielversprechende Ergebnisse bei der Verbesserung der Insulinsensitivität bei PCOS.</span>`)
        });
    }

    if (p.umstaende.includes('menopause')) {
        hints.push({
            icon: '&#127804;',
            text: L(`<strong>Menopause - Metabolic changes & your plan:</strong><br>
            <span class="hint-effect">&#10132; BMR reduced by 5% (hormonal metabolic slowdown).</span><br>
            <span class="hint-effect">&#10132; Fat ratio increased to ${m.fats.percent}% (vs. standard 30%).</span><br>
            <span class="hint-why"><strong>Why?</strong> During menopause, declining estrogen levels cause several metabolic shifts: (1) BMR decreases ~5-10% because estrogen normally supports metabolic rate, (2) the body tends to redistribute fat toward the abdomen, and (3) bone density decreases. The higher fat intake supports hormone production - your body still makes estrogen in smaller amounts via fat tissue and adrenal glands, and dietary fat is the precursor for all steroid hormones. <em>Focus foods:</em> Phytoestrogens (flaxseed, soy) can mildly mimic estrogen. Calcium (1200 mg/day) + Vitamin D are critical for bone health. Strength training is the single most effective intervention against both muscle and bone loss during menopause.</span>`,
            `<strong>Wechseljahre – Stoffwechselveränderungen & dein Plan:</strong><br>
            <span class="hint-effect">&#10132; Grundumsatz um 5 % reduziert (hormonell bedingte Verlangsamung des Stoffwechsels).</span><br>
            <span class="hint-effect">&#10132; Fettanteil auf ${m.fats.percent} % erhöht (statt standardmäßig 30 %).</span><br>
            <span class="hint-why"><strong>Warum?</strong> In den Wechseljahren führt der sinkende Östrogenspiegel zu mehreren Stoffwechselveränderungen: (1) Der Grundumsatz sinkt um ca. 5–10 %, weil Östrogen normalerweise den Stoffwechsel unterstützt, (2) der Körper neigt dazu, Fett in Richtung Bauch umzuverteilen, und (3) die Knochendichte nimmt ab. Die höhere Fettzufuhr unterstützt die Hormonproduktion – dein Körper bildet weiterhin in kleineren Mengen Östrogen über das Fettgewebe und die Nebennieren, und Nahrungsfett ist die Vorstufe aller Steroidhormone. <em>Fokus-Lebensmittel:</em> Phytoöstrogene (Leinsamen, Soja) können Östrogen leicht nachahmen. Calcium (1200 mg/Tag) und Vitamin D sind entscheidend für die Knochengesundheit. Krafttraining ist die wirksamste einzelne Maßnahme gegen Muskel- und Knochenabbau in den Wechseljahren.</span>`)
        });
    }

    if (p.umstaende.includes('hypothyroid')) {
        hints.push({
            icon: '&#129516;',
            text: L(`<strong>Hypothyroidism - Slowed metabolism:</strong><br>
            <span class="hint-effect">&#10132; Your BMR has been reduced by 10% (from ${Math.round(state.results.bmr / 0.90)} to ${state.results.bmr} kcal).</span><br>
            <span class="hint-effect">&#10132; Meal plan includes iodine and selenium-rich foods when available.</span><br>
            <span class="hint-why"><strong>Why?</strong> Hypothyroidism means your thyroid produces insufficient T3 and T4 hormones, which directly regulate metabolic rate. This can reduce BMR by 10-15%, even with medication. <em>Key nutrients:</em> Iodine is the raw material for thyroid hormones (found in fish, seaweed, dairy). Selenium is needed by the enzyme that converts T4 into the active T3 form (Brazil nuts - just 1-2 per day). Zinc also supports thyroid function (pumpkin seeds, legumes). <em>Note:</em> If you take levothyroxine, take it on an empty stomach 30-60 min before eating, and avoid calcium/iron supplements within 4 hours as they impair absorption.</span>`,
            `<strong>Schilddrüsenunterfunktion – verlangsamter Stoffwechsel:</strong><br>
            <span class="hint-effect">&#10132; Dein Grundumsatz wurde um 10 % reduziert (von ${Math.round(state.results.bmr / 0.90)} auf ${state.results.bmr} kcal).</span><br>
            <span class="hint-effect">&#10132; Der Plan enthält jod- und selenreiche Lebensmittel, sofern verfügbar.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Bei einer Schilddrüsenunterfunktion bildet deine Schilddrüse zu wenig T3- und T4-Hormone, die den Stoffwechsel direkt steuern. Das kann den Grundumsatz um 10–15 % senken, selbst mit Medikamenten. <em>Wichtige Nährstoffe:</em> Jod ist der Rohstoff für Schilddrüsenhormone (in Fisch, Algen, Milchprodukten). Selen braucht das Enzym, das T4 in die aktive Form T3 umwandelt (Paranüsse – nur 1–2 pro Tag). Auch Zink unterstützt die Schilddrüsenfunktion (Kürbiskerne, Hülsenfrüchte). <em>Hinweis:</em> Wenn du Levothyroxin nimmst, nimm es nüchtern 30–60 Minuten vor dem Essen ein und meide Calcium- oder Eisenpräparate innerhalb von 4 Stunden, da sie die Aufnahme beeinträchtigen.</span>`)
        });
    }

    if (p.umstaende.includes('hyperthyroid')) {
        hints.push({
            icon: '&#128293;',
            text: L(`<strong>Hyperthyroidism - Elevated metabolism:</strong><br>
            <span class="hint-effect">&#10132; Your BMR has been increased by 15% (from ${Math.round(state.results.bmr / 1.15)} to ${state.results.bmr} kcal).</span><br>
            <span class="hint-effect">&#10132; Higher calorie and protein targets to prevent muscle wasting.</span><br>
            <span class="hint-why"><strong>Why?</strong> An overactive thyroid floods your body with T3/T4 hormones, accelerating metabolism by 10-30%. This causes rapid weight loss, muscle breakdown, and bone density loss if not managed. <em>Nutritional strategy:</em> Higher calorie intake prevents unintended weight loss. Extra protein (1.5-2g/kg) helps counteract muscle catabolism. Calcium and Vitamin D are crucial as hyperthyroidism accelerates bone turnover. <em>Important:</em> Avoid excess iodine (seaweed, kelp supplements) as it can worsen the condition. Cruciferous vegetables (broccoli, cauliflower) have mild anti-thyroid properties and are generally beneficial. Work closely with your endocrinologist.</span>`,
            `<strong>Schilddrüsenüberfunktion – erhöhter Stoffwechsel:</strong><br>
            <span class="hint-effect">&#10132; Dein Grundumsatz wurde um 15 % erhöht (von ${Math.round(state.results.bmr / 1.15)} auf ${state.results.bmr} kcal).</span><br>
            <span class="hint-effect">&#10132; Höhere Kalorien- und Proteinziele, um Muskelabbau zu verhindern.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Eine überaktive Schilddrüse überschwemmt deinen Körper mit T3/T4-Hormonen und beschleunigt den Stoffwechsel um 10–30 %. Unbehandelt führt das zu schnellem Gewichtsverlust, Muskelabbau und abnehmender Knochendichte. <em>Ernährungsstrategie:</em> Eine höhere Kalorienzufuhr verhindert ungewollten Gewichtsverlust. Zusätzliches Protein (1,5–2 g/kg) wirkt dem Muskelabbau entgegen. Calcium und Vitamin D sind entscheidend, da eine Überfunktion den Knochenumbau beschleunigt. <em>Wichtig:</em> Meide zu viel Jod (Algen, Kelp-Präparate), da es die Erkrankung verschlimmern kann. Kreuzblütlergemüse (Brokkoli, Blumenkohl) hat leicht schilddrüsenhemmende Eigenschaften und ist meist vorteilhaft. Arbeite eng mit deiner Endokrinologin bzw. deinem Endokrinologen zusammen.</span>`)
        });
    }

    if (p.umstaende.includes('diabetes')) {
        hints.push({
            icon: '&#128137;',
            text: L(`<strong>Insulin Resistance / Diabetes - Your plan adjustments:</strong><br>
            <span class="hint-effect">&#10132; Carbs distributed evenly across all 3 meals (no carb-heavy single meals).</span><br>
            <span class="hint-effect">&#10132; Complex carbs only (whole grains, legumes). 5h meal gaps enforced.</span><br>
            <span class="hint-why"><strong>Why?</strong> Insulin resistance means your cells respond poorly to insulin, so your pancreas must produce more to clear blood sugar. Large carb loads worsen this - they spike blood sugar, requiring even more insulin. By spreading carbs evenly and choosing complex sources (low glycemic index), you create smaller, slower blood sugar rises. Eating protein first is especially important for you: protein triggers a small insulin response that "primes" your cells, making them more receptive when carbs arrive later in the meal. The 5-hour gap between meals allows insulin to return to baseline - this is when your body can switch to fat burning. Constant snacking keeps insulin perpetually elevated, worsening resistance over time.</span>`,
            `<strong>Insulinresistenz / Diabetes – Anpassungen in deinem Plan:</strong><br>
            <span class="hint-effect">&#10132; Kohlenhydrate gleichmäßig auf alle 3 Mahlzeiten verteilt (keine kohlenhydratlastigen Einzelmahlzeiten).</span><br>
            <span class="hint-effect">&#10132; Nur komplexe Kohlenhydrate (Vollkorn, Hülsenfrüchte). 5-Stunden-Pausen zwischen den Mahlzeiten.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Bei Insulinresistenz reagieren deine Zellen schlecht auf Insulin, deshalb muss deine Bauchspeicheldrüse mehr davon bilden, um den Blutzucker zu senken. Große Kohlenhydratmengen verschlimmern das – sie lassen den Blutzucker stark ansteigen und erfordern noch mehr Insulin. Wenn du Kohlenhydrate gleichmäßig verteilst und komplexe Quellen (niedriger glykämischer Index) wählst, steigt dein Blutzucker langsamer und weniger stark an. Zuerst Protein zu essen ist für dich besonders wichtig: Protein löst eine kleine Insulinantwort aus, die deine Zellen „vorbereitet“, sodass sie empfänglicher sind, wenn später in der Mahlzeit die Kohlenhydrate kommen. Die 5-Stunden-Pause zwischen den Mahlzeiten lässt das Insulin auf den Ausgangswert zurückkehren – dann kann dein Körper auf Fettverbrennung umschalten. Ständiges Snacken hält das Insulin dauerhaft erhöht und verschlimmert die Resistenz mit der Zeit.</span>`)
        });
    }

    if (p.umstaende.includes('anemia')) {
        hints.push({
            icon: '&#129656;',
            text: L(`<strong>Anemia / Iron Deficiency - Nutritional priorities:</strong><br>
            <span class="hint-effect">&#10132; Focus on iron-rich foods paired with vitamin C for absorption.</span><br>
            <span class="hint-effect">&#10132; Avoid calcium, tea, and coffee with iron-rich meals.</span><br>
            <span class="hint-why"><strong>Why?</strong> Iron deficiency is the most common nutritional deficiency worldwide, affecting ~30% of women of reproductive age. Iron is essential for hemoglobin, which carries oxygen to your cells. Without sufficient iron, your body can't produce enough healthy red blood cells, causing fatigue, weakness, and reduced exercise capacity. <em>Two types of dietary iron:</em> Heme iron (red meat, organ meats, shellfish) is absorbed 2-3x better than non-heme iron (spinach, lentils, fortified cereals). Vitamin C (citrus, bell peppers) dramatically boosts non-heme iron absorption. Tannins in tea/coffee and calcium in dairy compete with iron absorption - separate them from iron-rich meals by 1-2 hours. Folate and B12 are also important for red blood cell production.</span>`,
            `<strong>Anämie / Eisenmangel – Ernährungsprioritäten:</strong><br>
            <span class="hint-effect">&#10132; Fokus auf eisenreiche Lebensmittel, kombiniert mit Vitamin C für eine bessere Aufnahme.</span><br>
            <span class="hint-effect">&#10132; Calcium, Tee und Kaffee nicht zu eisenreichen Mahlzeiten.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Eisenmangel ist weltweit der häufigste Nährstoffmangel und betrifft ca. 30 % der Frauen im gebärfähigen Alter. Eisen ist essenziell für Hämoglobin, das Sauerstoff zu deinen Zellen transportiert. Ohne ausreichend Eisen kann dein Körper nicht genug gesunde rote Blutkörperchen bilden – die Folgen sind Müdigkeit, Schwäche und geringere Belastbarkeit. <em>Zwei Arten von Nahrungseisen:</em> Häm-Eisen (rotes Fleisch, Innereien, Schalentiere) wird 2–3-mal besser aufgenommen als Nicht-Häm-Eisen (Spinat, Linsen, angereicherte Getreideprodukte). Vitamin C (Zitrusfrüchte, Paprika) steigert die Aufnahme von Nicht-Häm-Eisen deutlich. Gerbstoffe in Tee/Kaffee und Calcium in Milchprodukten konkurrieren mit der Eisenaufnahme – halte 1–2 Stunden Abstand zu eisenreichen Mahlzeiten. Auch Folat und B12 sind wichtig für die Bildung roter Blutkörperchen.</span>`)
        });
    }

    if (p.umstaende.includes('digestion')) {
        hints.push({
            icon: '&#129756;',
            text: L(`<strong>Digestive Health / IBS - Fiber & gut strategy:</strong><br>
            <span class="hint-effect">&#10132; Fiber target increased to ${m.fiber.grams}g/day (vs. standard 30g).</span><br>
            <span class="hint-effect">&#10132; Emphasis on fermented foods and diverse fiber sources.</span><br>
            <span class="hint-why"><strong>Why?</strong> Your gut hosts ~100 trillion bacteria (the microbiome) that influence digestion, immunity, and even mood. Fiber is their primary food source - without it, they start breaking down your gut lining instead. There are two types: <em>soluble fiber</em> (oats, legumes, apples) forms a gel that slows digestion and feeds beneficial bacteria. <em>Insoluble fiber</em> (vegetables, whole grains) adds bulk and promotes regular bowel movements. Important: increase fiber gradually (5g more per week) to avoid bloating. The 5-hour gaps are therapeutic here - they trigger the "migrating motor complex" (MMC), a cleansing wave that sweeps through your intestines between meals, clearing debris. Constant eating suppresses this natural cleaning mechanism.</span>`,
            `<strong>Verdauungsgesundheit / Reizdarm – Ballaststoffe & Darmstrategie:</strong><br>
            <span class="hint-effect">&#10132; Ballaststoffziel auf ${m.fiber.grams}g/Tag erhöht (statt standardmäßig 30 g).</span><br>
            <span class="hint-effect">&#10132; Schwerpunkt auf fermentierten Lebensmitteln und vielfältigen Ballaststoffquellen.</span><br>
            <span class="hint-why"><strong>Warum?</strong> In deinem Darm leben ca. 100 Billionen Bakterien (das Mikrobiom), die Verdauung, Immunsystem und sogar die Stimmung beeinflussen. Ballaststoffe sind ihre wichtigste Nahrung – ohne sie beginnen sie stattdessen, deine Darmschleimhaut abzubauen. Es gibt zwei Arten: <em>Lösliche Ballaststoffe</em> (Haferflocken, Hülsenfrüchte, Äpfel) bilden ein Gel, das die Verdauung verlangsamt und nützliche Bakterien ernährt. <em>Unlösliche Ballaststoffe</em> (Gemüse, Vollkorn) sorgen für Volumen und eine regelmäßige Verdauung. Wichtig: Steigere die Ballaststoffe langsam (5 g mehr pro Woche), um Blähungen zu vermeiden. Die 5-Stunden-Pausen wirken hier therapeutisch – sie lösen den „migrierenden motorischen Komplex“ (MMC) aus, eine Reinigungswelle, die zwischen den Mahlzeiten durch deinen Darm läuft und Reste beseitigt. Ständiges Essen unterdrückt diesen natürlichen Reinigungsmechanismus.</span>`)
        });
    }

    if (p.umstaende.includes('autoimmune')) {
        hints.push({
            icon: '&#129516;',
            text: L(`<strong>Autoimmune / Chronic Inflammation - Anti-inflammatory nutrition:</strong><br>
            <span class="hint-effect">&#10132; TDEE reduced by ~7% (elevated resting metabolism offset by reduced activity).</span><br>
            <span class="hint-effect">&#10132; Emphasis on omega-3 fatty acids and anti-inflammatory foods.</span><br>
            <span class="hint-why"><strong>Why?</strong> Autoimmune conditions cause chronic systemic inflammation, where your immune system attacks healthy tissue. While inflammation slightly raises BMR (the body burns energy fighting itself), physical activity often decreases, resulting in a net lower TDEE. <em>Anti-inflammatory nutrition:</em> Omega-3 fatty acids (2-3g/day from fatty fish, flaxseed, walnuts) directly reduce inflammatory markers (IL-6, TNF-alpha). Vitamin D (1000-2000 IU/day) modulates immune function - deficiency is extremely common in autoimmune patients. Antioxidant-rich foods (berries, leafy greens, turmeric) help neutralize oxidative stress. Reducing refined carbohydrates and processed foods can lower systemic inflammation. Some patients benefit from identifying food triggers (common: gluten, dairy) with guidance from their healthcare provider.</span>`,
            `<strong>Autoimmunerkrankung / chronische Entzündung – entzündungshemmende Ernährung:</strong><br>
            <span class="hint-effect">&#10132; TDEE um ca. 7 % reduziert (erhöhter Ruheumsatz, ausgeglichen durch geringere Aktivität).</span><br>
            <span class="hint-effect">&#10132; Schwerpunkt auf Omega-3-Fettsäuren und entzündungshemmenden Lebensmitteln.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Autoimmunerkrankungen verursachen eine chronische, den ganzen Körper betreffende Entzündung, bei der dein Immunsystem gesundes Gewebe angreift. Die Entzündung erhöht den Grundumsatz zwar leicht (der Körper verbraucht Energie im Kampf gegen sich selbst), doch die körperliche Aktivität nimmt oft ab, sodass der TDEE unterm Strich niedriger ist. <em>Entzündungshemmende Ernährung:</em> Omega-3-Fettsäuren (2–3 g/Tag aus fettem Fisch, Leinsamen, Walnüssen) senken Entzündungsmarker (IL-6, TNF-alpha) direkt. Vitamin D (1000–2000 IE/Tag) moduliert die Immunfunktion – ein Mangel ist bei Autoimmunerkrankten sehr häufig. Antioxidantienreiche Lebensmittel (Beeren, Blattgemüse, Kurkuma) helfen, oxidativen Stress zu neutralisieren. Weniger raffinierte Kohlenhydrate und verarbeitete Lebensmittel können systemische Entzündungen senken. Manche Betroffene profitieren davon, mit ärztlicher Begleitung individuelle Auslöser zu finden (häufig: Gluten, Milchprodukte).</span>`)
        });
    }

    if (p.umstaende.includes('stress')) {
        hints.push({
            icon: '&#128164;',
            text: L(`<strong>High Stress - Cortisol & nutrition:</strong><br>
            <span class="hint-effect">&#10132; BMR reduced by 3% (stress-induced metabolic adaptation).</span><br>
            <span class="hint-effect">&#10132; Focus on magnesium, B-vitamins, and blood-sugar-stabilizing meals.</span><br>
            <span class="hint-why"><strong>Why?</strong> Chronic stress elevates cortisol, your primary stress hormone. Elevated cortisol has several effects: (1) it promotes abdominal fat storage, (2) it increases appetite and cravings for high-calorie foods, (3) it can break down muscle tissue for energy (catabolic), and (4) it can reduce your metabolic rate over time. <em>Nutritional counter-strategy:</em> Magnesium (found in nuts, spinach, dark chocolate) is nature's relaxation mineral - it calms the nervous system and is depleted faster under stress. B-vitamins (whole grains, eggs, legumes) support neurotransmitter production. Regular, balanced meals prevent the blood sugar crashes that trigger additional cortisol release. A structured 3-meal approach with 5h gaps provides stable energy without the stress of constant meal decisions.</span>`,
            `<strong>Hoher Stress – Cortisol & Ernährung:</strong><br>
            <span class="hint-effect">&#10132; Grundumsatz um 3 % reduziert (stressbedingte Stoffwechselanpassung).</span><br>
            <span class="hint-effect">&#10132; Fokus auf Magnesium, B-Vitamine und blutzuckerstabilisierende Mahlzeiten.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Chronischer Stress erhöht Cortisol, dein wichtigstes Stresshormon. Ein erhöhter Cortisolspiegel hat mehrere Effekte: (1) Er fördert die Fetteinlagerung am Bauch, (2) er steigert Appetit und Heißhunger auf kalorienreiche Lebensmittel, (3) er kann Muskelgewebe zur Energiegewinnung abbauen (katabol) und (4) er kann deinen Stoffwechsel mit der Zeit verlangsamen. <em>Ernährungsstrategie dagegen:</em> Magnesium (in Nüssen, Spinat, Zartbitterschokolade) ist das Entspannungsmineral der Natur – es beruhigt das Nervensystem und wird unter Stress schneller verbraucht. B-Vitamine (Vollkorn, Eier, Hülsenfrüchte) unterstützen die Bildung von Neurotransmittern. Regelmäßige, ausgewogene Mahlzeiten verhindern Blutzuckerabstürze, die zusätzlich Cortisol freisetzen. Eine feste Struktur mit 3 Mahlzeiten und 5-Stunden-Pausen gibt dir stabile Energie, ohne den Stress ständiger Essensentscheidungen.</span>`)
        });
    }

    if (p.umstaende.includes('depression')) {
        hints.push({
            icon: '&#128546;',
            text: L(`<strong>Depression (on medication) - Metabolic & nutritional impact:</strong><br>
            <span class="hint-effect">&#10132; BMR reduced by 4% (medication-related metabolic adjustment).</span><br>
            <span class="hint-effect">&#10132; Focus on omega-3, magnesium, and B-vitamins for mood support.</span><br>
            <span class="hint-why"><strong>Why?</strong> Many antidepressants (SSRIs, SNRIs, atypical antipsychotics) can cause weight gain of 2-10 kg over months through metabolic changes and increased appetite. We adjust your BMR down by 4% to account for this. <em>Nutritional support for mental health:</em> Omega-3 fatty acids (1-2g/day EPA from fatty fish) have evidence for anti-depressant effects. Magnesium (400 mg/day - nuts, dark chocolate, leafy greens) is often depleted and affects mood regulation. B-vitamins (especially B6, B12, folate) are essential for neurotransmitter synthesis (serotonin, dopamine). Tryptophan-rich foods (turkey, eggs, cheese, nuts) provide the precursor for serotonin. Regular meal timing helps stabilize energy and mood throughout the day.</span>`,
            `<strong>Depression (mit Medikamenten) – Einfluss auf Stoffwechsel & Ernährung:</strong><br>
            <span class="hint-effect">&#10132; Grundumsatz um 4 % reduziert (medikamentenbedingte Stoffwechselanpassung).</span><br>
            <span class="hint-effect">&#10132; Fokus auf Omega-3, Magnesium und B-Vitamine zur Unterstützung der Stimmung.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Viele Antidepressiva (SSRI, SNRI, atypische Antipsychotika) können über Monate eine Gewichtszunahme von 2–10 kg verursachen – durch Stoffwechselveränderungen und mehr Appetit. Wir senken deinen Grundumsatz deshalb um 4 %. <em>Ernährung für die mentale Gesundheit:</em> Für Omega-3-Fettsäuren (1–2 g/Tag EPA aus fettem Fisch) gibt es Hinweise auf eine antidepressive Wirkung. Magnesium (400 mg/Tag – Nüsse, Zartbitterschokolade, Blattgemüse) ist oft erschöpft und beeinflusst die Stimmungsregulation. B-Vitamine (besonders B6, B12, Folat) sind essenziell für die Bildung von Neurotransmittern (Serotonin, Dopamin). Tryptophanreiche Lebensmittel (Pute, Eier, Käse, Nüsse) liefern die Vorstufe von Serotonin. Regelmäßige Essenszeiten helfen, Energie und Stimmung über den Tag zu stabilisieren.</span>`)
        });
    }

    if (p.umstaende.includes('recovery')) {
        hints.push({
            icon: '&#129657;',
            text: L(`<strong>Recovery from Surgery / Injury - Healing nutrition:</strong><br>
            <span class="hint-effect">&#10132; BMR increased by 17% (elevated energy demands for tissue repair).</span><br>
            <span class="hint-effect">&#10132; Protein raised to ${m.protein.grams}g/day (1.8g/kg) for wound healing.</span><br>
            <span class="hint-why"><strong>Why?</strong> Your body's metabolic rate increases significantly during recovery - minor surgery adds 10-15%, major surgery or fractures 20-30%. This energy fuels tissue repair, immune function, and inflammation management. <em>Critical healing nutrients:</em> Protein (1.5-2.0 g/kg/day) provides amino acids for rebuilding tissue and collagen. Vitamin C (500-1000 mg/day from citrus, bell peppers, kiwi) is essential for collagen synthesis - without it, wounds simply cannot heal properly. Zinc (15-40 mg/day from pumpkin seeds, beef, lentils) supports immune function and cell division. Iron supports oxygen delivery to healing tissues. Do not restrict calories during recovery - inadequate nutrition significantly delays healing and increases infection risk.</span>`,
            `<strong>Erholung nach OP / Verletzung – Ernährung für die Heilung:</strong><br>
            <span class="hint-effect">&#10132; Grundumsatz um 17 % erhöht (höherer Energiebedarf für die Gewebereparatur).</span><br>
            <span class="hint-effect">&#10132; Protein auf ${m.protein.grams}g/Tag erhöht (1,8 g/kg) für die Wundheilung.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Dein Stoffwechsel steigt während der Genesung deutlich an – kleine Operationen um 10–15 %, große Operationen oder Knochenbrüche um 20–30 %. Diese Energie treibt Gewebereparatur, Immunfunktion und die Steuerung von Entzündungen an. <em>Entscheidende Nährstoffe für die Heilung:</em> Protein (1,5–2,0 g/kg/Tag) liefert Aminosäuren zum Wiederaufbau von Gewebe und Kollagen. Vitamin C (500–1000 mg/Tag aus Zitrusfrüchten, Paprika, Kiwi) ist essenziell für die Kollagenbildung – ohne es können Wunden schlicht nicht richtig heilen. Zink (15–40 mg/Tag aus Kürbiskernen, Rindfleisch, Linsen) unterstützt Immunfunktion und Zellteilung. Eisen unterstützt die Sauerstoffversorgung des heilenden Gewebes. Schränke während der Genesung keine Kalorien ein – unzureichende Ernährung verzögert die Heilung deutlich und erhöht das Infektionsrisiko.</span>`)
        });
    }

    if (p.umstaende.includes('edrecovery')) {
        hints.push({
            icon: '&#128154;',
            text: L(`<strong>Eating Disorder Recovery - Safety-first approach:</strong><br>
            <span class="hint-effect">&#10132; Caloric deficit has been disabled. Your plan will never suggest eating below maintenance.</span><br>
            <span class="hint-effect">&#10132; Balanced macros with no food group restrictions.</span><br>
            <span class="hint-why"><strong>Why?</strong> During ED recovery, calorie-counting apps can be triggering and potentially harmful. We've disabled any deficit recommendations as a safety measure. During recovery from restrictive eating, the body often enters a hypermetabolic state where caloric needs can be 50-100% above calculated BMR due to elevated diet-induced thermogenesis - your body is working overtime to repair. <em>Important principles:</em> No food should be labeled as "bad" or restricted. All macronutrients are essential. Gradual caloric increases help prevent refeeding syndrome (monitor phosphorus, magnesium, potassium). This app is a tool, not a treatment - please work closely with a healthcare team (therapist, dietitian, physician) specialized in eating disorders. If calorie tracking feels triggering, it's okay to step away from tracking entirely.</span>`,
            `<strong>Genesung von einer Essstörung – Sicherheit zuerst:</strong><br>
            <span class="hint-effect">&#10132; Das Kaloriendefizit wurde deaktiviert. Dein Plan schlägt nie vor, unter deinem Erhaltungsbedarf zu essen.</span><br>
            <span class="hint-effect">&#10132; Ausgewogene Makros ohne Einschränkung von Lebensmittelgruppen.</span><br>
            <span class="hint-why"><strong>Warum?</strong> In der Genesung von einer Essstörung können Kalorienzähl-Apps triggern und potenziell schaden. Wir haben deshalb jede Defizit-Empfehlung als Schutzmaßnahme deaktiviert. Bei der Genesung von restriktivem Essverhalten gerät der Körper oft in einen hypermetabolen Zustand, in dem der Kalorienbedarf durch eine erhöhte nahrungsinduzierte Thermogenese 50–100 % über dem berechneten Grundumsatz liegen kann – dein Körper arbeitet auf Hochtouren an der Reparatur. <em>Wichtige Grundsätze:</em> Kein Lebensmittel sollte als „schlecht“ gelten oder verboten sein. Alle Makronährstoffe sind essenziell. Eine schrittweise Steigerung der Kalorien hilft, ein Refeeding-Syndrom zu verhindern (Phosphor, Magnesium und Kalium überwachen). Diese App ist ein Werkzeug, keine Behandlung – bitte arbeite eng mit einem auf Essstörungen spezialisierten Behandlungsteam zusammen (Therapie, Ernährungsberatung, ärztliche Betreuung). Wenn sich Kalorientracking triggernd anfühlt, ist es völlig in Ordnung, ganz darauf zu verzichten.</span>`)
        });
    }

    // === SPORT-BASED EDUCATIONAL HINTS ===

    if (p.sportarten.includes('strength')) {
        hints.push({
            icon: '&#127947;',
            text: L(`<strong>Strength Training - Protein timing & muscle science:</strong><br>
            <span class="hint-effect">&#10132; Protein: ${m.protein.grams}g/day (~${(m.protein.grams/3).toFixed(0)}g per meal across 3 meals).</span><br>
            <span class="hint-effect">&#10132; Each meal prioritizes a protein source first (Rule #3).</span><br>
            <span class="hint-why"><strong>Why?</strong> After strength training, your muscle fibers have micro-tears that need repair. This repair process (muscle protein synthesis, or MPS) requires amino acids from dietary protein. Research shows MPS is maximized at ~0.4g protein per kg per meal, which is why we distribute your ${m.protein.grams}g evenly across 3 meals (~${(m.protein.grams/3).toFixed(0)}g each) rather than loading one meal. MPS stays elevated for 24-48 hours after training, so consistent daily protein matters more than a single post-workout shake. The leucine threshold (~2.5-3g) is key - it's the amino acid that "triggers" MPS. Animal proteins (eggs, dairy, meat, fish) are leucine-rich; plant sources may need larger portions to hit this threshold.</span>`,
            `<strong>Krafttraining – Protein-Timing & Muskelwissenschaft:</strong><br>
            <span class="hint-effect">&#10132; Protein: ${m.protein.grams}g/Tag (ca. ${(m.protein.grams/3).toFixed(0)}g pro Mahlzeit bei 3 Mahlzeiten).</span><br>
            <span class="hint-effect">&#10132; Jede Mahlzeit beginnt mit einer Proteinquelle (Regel Nr. 3).</span><br>
            <span class="hint-why"><strong>Warum?</strong> Nach dem Krafttraining haben deine Muskelfasern Mikrorisse, die repariert werden müssen. Dieser Reparaturprozess (Muskelproteinsynthese, MPS) braucht Aminosäuren aus Nahrungsprotein. Studien zeigen, dass die MPS bei ca. 0,4 g Protein pro kg pro Mahlzeit maximal ist – deshalb verteilen wir deine ${m.protein.grams}g gleichmäßig auf 3 Mahlzeiten (je ca. ${(m.protein.grams/3).toFixed(0)}g), statt eine Mahlzeit zu überladen. Die MPS bleibt 24–48 Stunden nach dem Training erhöht, daher ist eine gleichmäßige tägliche Proteinzufuhr wichtiger als ein einzelner Shake nach dem Training. Entscheidend ist die Leucin-Schwelle (ca. 2,5–3 g) – Leucin ist die Aminosäure, die die MPS „auslöst“. Tierische Proteine (Eier, Milchprodukte, Fleisch, Fisch) sind leucinreich; bei pflanzlichen Quellen brauchst du eventuell größere Portionen, um diese Schwelle zu erreichen.</span>`)
        });
    }

    if (p.sportarten.includes('cardio')) {
        hints.push({
            icon: '&#127939;',
            text: L(`<strong>Cardio / Endurance - Fueling your training:</strong><br>
            <span class="hint-effect">&#10132; Carbohydrate intake: ${m.carbs.grams}g/day for glycogen replenishment.</span><br>
            <span class="hint-effect">&#10132; Pre-training meal should include complex carbs.</span><br>
            <span class="hint-why"><strong>Why?</strong> During cardio, your primary fuel sources are muscle glycogen (stored carbohydrates) and fat. At moderate intensity, your body uses roughly a 50/50 mix. Your muscles can store ~300-500g of glycogen, and depleted stores lead to fatigue ("hitting the wall"). Carbohydrates before training top off glycogen stores. For sessions under 60 minutes, your normal meal plan provides sufficient fuel - just ensure you eat 2-3 hours before. For longer sessions, consider placing your carb-heaviest meal before training. Interestingly, maintaining 5-hour gaps between meals trains your body to be more efficient at fat oxidation - this actually improves your endurance capacity over time.</span>`,
            `<strong>Cardio / Ausdauer – Energie für dein Training:</strong><br>
            <span class="hint-effect">&#10132; Kohlenhydratzufuhr: ${m.carbs.grams}g/Tag zum Auffüllen der Glykogenspeicher.</span><br>
            <span class="hint-effect">&#10132; Die Mahlzeit vor dem Training sollte komplexe Kohlenhydrate enthalten.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Beim Cardio sind deine wichtigsten Energiequellen Muskelglykogen (gespeicherte Kohlenhydrate) und Fett. Bei moderater Intensität nutzt dein Körper etwa eine 50/50-Mischung. Deine Muskeln können ca. 300–500 g Glykogen speichern; leere Speicher führen zu Erschöpfung („der Mann mit dem Hammer“). Kohlenhydrate vor dem Training füllen die Glykogenspeicher auf. Für Einheiten unter 60 Minuten liefert dein normaler Plan genug Energie – iss einfach 2–3 Stunden vorher. Bei längeren Einheiten lege deine kohlenhydratreichste Mahlzeit vor das Training. Interessanterweise trainieren die 5-Stunden-Pausen zwischen den Mahlzeiten deinen Körper darauf, Fett effizienter zu verbrennen – das verbessert mit der Zeit sogar deine Ausdauer.</span>`)
        });
    }

    if (p.sportarten.includes('yoga')) {
        hints.push({
            icon: '&#129496;',
            text: L(`<strong>Yoga / Pilates - Mindful nutrition synergy:</strong><br>
            <span class="hint-effect">&#10132; Light, nutrient-dense meals that don't weigh you down.</span><br>
            <span class="hint-why"><strong>Why?</strong> Yoga and Pilates emphasize body awareness - and this extends to eating. This aligns beautifully with evidence-based nutrition: mindful eating (starting with protein, eating slowly) enhances the parasympathetic "rest and digest" state. Magnesium-rich foods (nuts, leafy greens) support flexibility by helping muscles relax after contraction. Adequate hydration is especially important - even mild dehydration (2%) reduces flexibility and balance. Practice on a mostly empty stomach for best results (2-3h after eating).</span>`,
            `<strong>Yoga / Pilates – Synergie mit achtsamer Ernährung:</strong><br>
            <span class="hint-effect">&#10132; Leichte, nährstoffreiche Mahlzeiten, die dich nicht beschweren.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Yoga und Pilates schulen die Körperwahrnehmung – und das gilt auch fürs Essen. Das passt wunderbar zu evidenzbasierter Ernährung: Achtsames Essen (mit Protein beginnen, langsam essen) stärkt den parasympathischen „Ruhe und Verdauung“-Zustand. Magnesiumreiche Lebensmittel (Nüsse, Blattgemüse) unterstützen die Beweglichkeit, indem sie den Muskeln helfen, sich nach der Anspannung zu entspannen. Ausreichend trinken ist besonders wichtig – schon leichte Dehydrierung (2 %) verringert Beweglichkeit und Gleichgewicht. Übe am besten mit weitgehend leerem Magen (2–3 Stunden nach dem Essen).</span>`)
        });
    }

    if (p.sportarten.includes('swimming')) {
        hints.push({
            icon: '&#127946;',
            text: L(`<strong>Swimming - Full-body demands:</strong><br>
            <span class="hint-effect">&#10132; Higher caloric needs due to thermoregulation in water.</span><br>
            <span class="hint-why"><strong>Why?</strong> Swimming burns more calories than many other activities because water conducts heat ~25x faster than air - your body works harder to maintain core temperature. This means swimmers often have slightly higher energy needs than the activity level alone suggests. Post-swim hunger is very real and physiological, not just psychological. Ensure adequate protein for the full-body muscle engagement and sufficient carbs if swimming for more than 45 minutes. Eat within 1-2 hours after swimming for optimal recovery.</span>`,
            `<strong>Schwimmen – Anforderungen an den ganzen Körper:</strong><br>
            <span class="hint-effect">&#10132; Höherer Kalorienbedarf durch die Wärmeregulation im Wasser.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Schwimmen verbrennt mehr Kalorien als viele andere Aktivitäten, weil Wasser Wärme ca. 25-mal schneller ableitet als Luft – dein Körper arbeitet härter, um seine Kerntemperatur zu halten. Schwimmerinnen und Schwimmer haben deshalb oft einen etwas höheren Energiebedarf, als das Aktivitätsniveau allein vermuten lässt. Der Hunger nach dem Schwimmen ist echt und körperlich bedingt, nicht nur psychisch. Achte auf genug Protein für die Ganzkörper-Muskelarbeit und auf ausreichend Kohlenhydrate, wenn du länger als 45 Minuten schwimmst. Iss innerhalb von 1–2 Stunden nach dem Schwimmen für eine optimale Regeneration.</span>`)
        });
    }

    // === ALLERGY/INTOLERANCE EDUCATIONAL HINTS ===

    if (p.allergien.includes('lactose')) {
        hints.push({
            icon: '&#129371;',
            text: L(`<strong>Lactose Intolerance - Calcium strategy:</strong><br>
            <span class="hint-effect">&#10132; Dairy-based proteins replaced with lactose-free alternatives where possible.</span><br>
            <span class="hint-why"><strong>Why?</strong> Lactose intolerance means your body produces insufficient lactase, the enzyme that breaks down lactose (milk sugar). Undigested lactose ferments in the colon, causing gas, bloating, and discomfort. <em>Important:</em> You still need calcium (~1000mg/day). Non-dairy sources: broccoli (47mg/100g), almonds (264mg/100g), kale (150mg/100g), canned sardines with bones (382mg/100g). Note: fermented dairy (yogurt, aged cheese) is often tolerated because bacteria pre-digest much of the lactose. Harzer cheese is virtually lactose-free despite being dairy.</span>`,
            `<strong>Laktoseintoleranz – Calcium-Strategie:</strong><br>
            <span class="hint-effect">&#10132; Milchbasierte Proteine wo möglich durch laktosefreie Alternativen ersetzt.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Bei Laktoseintoleranz bildet dein Körper zu wenig Laktase, das Enzym, das Laktose (Milchzucker) spaltet. Unverdaute Laktose gärt im Dickdarm und verursacht Gase, Blähungen und Beschwerden. <em>Wichtig:</em> Du brauchst trotzdem Calcium (ca. 1000 mg/Tag). Milchfreie Quellen: Brokkoli (47 mg/100 g), Mandeln (264 mg/100 g), Grünkohl (150 mg/100 g), Sardinen aus der Dose mit Gräten (382 mg/100 g). Hinweis: Fermentierte Milchprodukte (Joghurt, gereifter Käse) werden oft vertragen, weil Bakterien einen Großteil der Laktose bereits abgebaut haben. Harzer Käse ist praktisch laktosefrei, obwohl er ein Milchprodukt ist.</span>`)
        });
    }

    if (p.allergien.includes('gluten')) {
        hints.push({
            icon: '&#127838;',
            text: L(`<strong>Gluten Intolerance - Carb alternatives:</strong><br>
            <span class="hint-effect">&#10132; Wheat, rye, barley, and spelt removed from carb sources.</span><br>
            <span class="hint-effect">&#10132; Plan uses: rice, potatoes, quinoa, buckwheat, millet, corn.</span><br>
            <span class="hint-why"><strong>Why?</strong> Gluten is a protein found in wheat, rye, and barley that triggers an immune response in sensitive individuals, damaging the small intestine's villi (absorptive surface). This impairs nutrient absorption - iron, calcium, B12, and folate deficiencies are common. The good news: many naturally gluten-free grains are nutritionally superior. Quinoa has more protein than wheat. Buckwheat (despite the name, not wheat!) is rich in rutin, which strengthens blood vessels. Oats are naturally gluten-free but often cross-contaminated - look for certified GF oats if you tolerate them.</span>`,
            `<strong>Glutenunverträglichkeit – Kohlenhydrat-Alternativen:</strong><br>
            <span class="hint-effect">&#10132; Weizen, Roggen, Gerste und Dinkel aus den Kohlenhydratquellen entfernt.</span><br>
            <span class="hint-effect">&#10132; Der Plan nutzt: Reis, Kartoffeln, Quinoa, Buchweizen, Hirse, Mais.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Gluten ist ein Protein in Weizen, Roggen und Gerste, das bei empfindlichen Menschen eine Immunreaktion auslöst und die Zotten des Dünndarms (die Aufnahmefläche) schädigt. Das beeinträchtigt die Nährstoffaufnahme – Mängel an Eisen, Calcium, B12 und Folat sind häufig. Die gute Nachricht: Viele von Natur aus glutenfreie Getreide sind ernährungsphysiologisch sogar überlegen. Quinoa enthält mehr Protein als Weizen. Buchweizen (trotz des Namens kein Weizen!) ist reich an Rutin, das die Blutgefäße stärkt. Hafer ist von Natur aus glutenfrei, aber oft verunreinigt – greif zu zertifiziert glutenfreiem Hafer, wenn du ihn verträgst.</span>`)
        });
    }

    if (p.allergien.includes('fructose')) {
        hints.push({
            icon: '&#127815;',
            text: L(`<strong>Fructose Intolerance - Fruit selection matters:</strong><br>
            <span class="hint-effect">&#10132; Low-fructose fruits preferred (berries, kiwi, citrus).</span><br>
            <span class="hint-why"><strong>Why?</strong> Fructose malabsorption means your small intestine struggles to absorb fructose efficiently. When excess fructose reaches the colon, bacteria ferment it, causing bloating and discomfort. Key insight: the fructose-to-glucose ratio matters more than total fructose. Foods with equal or more glucose than fructose are better tolerated because glucose aids fructose absorption. Berries, kiwi, and bananas have favorable ratios. Apples, pears, and mangoes are high in excess fructose. The "apple a day" recommendation can be adapted - substitute with a banana or a handful of berries.</span>`,
            `<strong>Fruktoseintoleranz – die Obstauswahl zählt:</strong><br>
            <span class="hint-effect">&#10132; Fruktosearme Obstsorten bevorzugt (Beeren, Kiwi, Zitrusfrüchte).</span><br>
            <span class="hint-why"><strong>Warum?</strong> Bei Fruktosemalabsorption kann dein Dünndarm Fruktose nur schlecht aufnehmen. Gelangt überschüssige Fruktose in den Dickdarm, wird sie von Bakterien vergoren – das verursacht Blähungen und Beschwerden. Wichtige Erkenntnis: Das Verhältnis von Fruktose zu Glukose ist wichtiger als die Gesamtmenge an Fruktose. Lebensmittel mit gleich viel oder mehr Glukose als Fruktose werden besser vertragen, weil Glukose die Fruktoseaufnahme unterstützt. Beeren, Kiwi und Bananen haben ein günstiges Verhältnis. Äpfel, Birnen und Mangos enthalten viel überschüssige Fruktose. Die Empfehlung „ein Apfel am Tag“ lässt sich anpassen – nimm stattdessen eine Banane oder eine Handvoll Beeren.</span>`)
        });
    }

    if (p.allergien.includes('histamine')) {
        hints.push({
            icon: '&#129472;',
            text: L(`<strong>Histamine Intolerance - Freshness is key:</strong><br>
            <span class="hint-effect">&#10132; Avoid aged, fermented, and long-stored foods.</span><br>
            <span class="hint-why"><strong>Why?</strong> Histamine is naturally present in all foods and increases with age/fermentation. Your body normally breaks it down with the enzyme diamine oxidase (DAO). With histamine intolerance, DAO activity is reduced, causing headaches, flushing, digestive issues, or skin reactions. <em>High histamine:</em> aged cheese, canned fish, sauerkraut, vinegar, wine, cured meats. <em>Low histamine:</em> fresh meat/fish (cook immediately after buying), fresh vegetables, rice, potatoes, most fresh fruits. Tip: cook fresh and eat immediately - leftovers accumulate histamine quickly.</span>`,
            `<strong>Histaminintoleranz – Frische ist entscheidend:</strong><br>
            <span class="hint-effect">&#10132; Gereifte, fermentierte und lange gelagerte Lebensmittel meiden.</span><br>
            <span class="hint-why"><strong>Warum?</strong> Histamin kommt natürlich in allen Lebensmitteln vor und nimmt mit Reifung/Fermentation zu. Normalerweise baut dein Körper es mit dem Enzym Diaminoxidase (DAO) ab. Bei Histaminintoleranz ist die DAO-Aktivität verringert, was Kopfschmerzen, Hautrötungen, Verdauungsprobleme oder Hautreaktionen verursacht. <em>Histaminreich:</em> gereifter Käse, Fischkonserven, Sauerkraut, Essig, Wein, Pökelwaren. <em>Histaminarm:</em> frisches Fleisch/frischer Fisch (direkt nach dem Kauf zubereiten), frisches Gemüse, Reis, Kartoffeln, die meisten frischen Früchte. Tipp: frisch kochen und sofort essen – in Resten reichert sich Histamin schnell an.</span>`)
        });
    }

    // === BMI-BASED EDUCATIONAL HINT ===
    const bmi = state.results.bmi;
    if (bmi < 18.5) {
        hints.push({
            icon: '&#9888;',
            text: L(`<strong>Underweight (BMI ${bmi.toFixed(1)}) - Important note:</strong><br>
            <span class="hint-why">A BMI below 18.5 can indicate insufficient nutrient reserves. If unintentional, please consult a healthcare professional. For healthy weight gain, focus on calorie-dense nutrient-rich foods: nuts, avocados, olive oil, whole grains, and adequate protein. Gaining weight healthily means adding muscle, not just fat - combine a caloric surplus with resistance training.</span>`,
            `<strong>Untergewicht (BMI ${bmi.toFixed(1)}) – wichtiger Hinweis:</strong><br>
            <span class="hint-why">Ein BMI unter 18,5 kann auf zu geringe Nährstoffreserven hinweisen. Wenn das ungewollt ist, wende dich bitte an eine Ärztin oder einen Arzt. Für eine gesunde Gewichtszunahme setze auf kalorien- und nährstoffreiche Lebensmittel: Nüsse, Avocados, Olivenöl, Vollkorn und ausreichend Protein. Gesund zunehmen heißt, Muskeln aufzubauen und nicht nur Fett – kombiniere einen Kalorienüberschuss mit Krafttraining.</span>`)
        });
    }

    // === GENERAL EDUCATIONAL HINT (always shown) ===
    hints.push({
        icon: '&#129504;',
        text: L(`<strong>Understanding Your Numbers:</strong><br>
        Your <em>Basal Metabolic Rate</em> (BMR: ${state.results.bmr} kcal) is the energy your body burns just existing - breathing, circulation, cell repair. It accounts for ~60-70% of daily calorie burn. Your <em>TDEE</em> (${state.results.tdee} kcal) adds your physical activity on top. The macros are calculated as: <strong>Protein</strong> (${m.protein.grams}g = ${(m.protein.grams/p.gewicht).toFixed(1)}g per kg body weight), <strong>Fats</strong> (${m.fats.percent}% of calories = ${m.fats.grams}g, essential for hormone production and vitamin absorption), <strong>Carbs</strong> (${m.carbs.grams}g = the remaining calories, your body's preferred energy source).`,
            `<strong>Deine Zahlen verstehen:</strong><br>
        Dein <em>Grundumsatz</em> (BMR: ${state.results.bmr} kcal) ist die Energie, die dein Körper allein fürs Existieren verbraucht – Atmung, Kreislauf, Zellreparatur. Er macht ca. 60–70 % deines täglichen Kalorienverbrauchs aus. Dein <em>TDEE</em> (${state.results.tdee} kcal) rechnet deine körperliche Aktivität obendrauf. Die Makros werden so berechnet: <strong>Protein</strong> (${m.protein.grams}g = ${(m.protein.grams/p.gewicht).toFixed(1)}g pro kg Körpergewicht), <strong>Fett</strong> (${m.fats.percent} % der Kalorien = ${m.fats.grams}g, essenziell für die Hormonproduktion und die Aufnahme von Vitaminen), <strong>Kohlenhydrate</strong> (${m.carbs.grams}g = die restlichen Kalorien, die bevorzugte Energiequelle deines Körpers).`)
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
    const selectedCuisines = Array.from(document.querySelectorAll('input[name="cuisine"]:checked')).map(el => el.value);
    if (selectedCuisines.length === 0) selectedCuisines.push('european'); // default fallback
    const numMeals = parseInt(document.getElementById('mealsPerDay').value) || 3;
    const mealSplit = (document.querySelector('input[name="mealsplit"]:checked')?.value || '30-40-30').split('-').map(Number);
    const numDays = parseInt(document.getElementById('planDays').value) || 7;

    const matchesCuisine = (food) => {
        if (!food.cuisine) return true; // backwards compat
        return food.cuisine.some(c => selectedCuisines.includes(c));
    };

    const selectedFoods = {};
    Object.keys(FOODS).forEach(catKey => {
        if (catKey === 'oele') {
            selectedFoods.oele = Array.from(document.querySelectorAll('input[name="oil"]:checked')).map(el => el.value);
            if (selectedFoods.oele.length === 0) {
                selectedFoods.oele = Object.entries(FOODS.oele.items)
                    .filter(([, food]) => food.tags.includes(diet) && matchesCuisine(food))
                    .map(([name]) => name);
            }
            return;
        }
        const checked = Array.from(document.querySelectorAll(`input[name="food_${catKey}"]:checked`)).map(el => el.value);
        const filtered = checked.filter(name => {
            const food = FOODS[catKey]?.items[name];
            return food && food.tags.includes(diet) && matchesCuisine(food);
        });
        if (filtered.length === 0) {
            selectedFoods[catKey] = Object.entries(FOODS[catKey].items)
                .filter(([, food]) => food.tags.includes(diet) && matchesCuisine(food))
                .map(([name]) => name);
        } else {
            selectedFoods[catKey] = filtered;
        }
    });

    state.preferences = { diet, mealSplit, selectedFoods, numMeals };

    const weekPlan = [];
    for (let d = 0; d < numDays; d++) {
        const dayPlan = generateDayPlan(mealSplit, selectedFoods, d);
        weekPlan.push({ name: DAY_NAMES[d], meals: dayPlan });
    }

    state.weekPlan = weekPlan;
    state.planCreatedDate = localDateStr();
    buildDayTabs(0);

    showSection('mealplan');

    updateMealplanSubtitle();

    renderDayPlan(0);
    state.currentDay = 0;

    // Also show tracker section
    document.getElementById('tracker').classList.remove('hidden');

    savePlan();
    syncDayWithPlan();
}

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
                   'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14'];
const DAY_SHORT_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
                         'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14'];

function buildDayTabs(activeDay) {
    const dayTabsContainer = document.getElementById('dayTabs');
    dayTabsContainer.innerHTML = '';
    state.weekPlan.forEach((_, d) => {
        const btn = document.createElement('button');
        btn.className = 'day-tab' + (d === activeDay ? ' active' : '');
        btn.dataset.day = d;
        btn.textContent = dayShortLabel(d);
        btn.addEventListener('click', () => {
            document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            state.currentDay = d;
            renderDayPlan(d);
        });
        dayTabsContainer.appendChild(btn);
    });
}

function updateMealplanSubtitle() {
    const p = state.profile;
    const numDays = state.weekPlan.length;
    const daysText = numDays === 1 ? L('1 day', '1 Tag') : numDays + L(' days', ' Tage');
    const mealsText = state.preferences.numMeals + L(' meals/day', ' Mahlzeiten/Tag');
    document.getElementById('mealplanSubtitle').textContent =
        `${L('For', 'Für')} ${p.name} | ${state.results.targetKcal} kcal/${L('day', 'Tag')} | ${state.macros.protein.grams}g P / ${state.macros.carbs.grams}g ${L('C', 'KH')} / ${state.macros.fats.grams}g F | ${mealsText} | ${daysText}`;
}

function savePlan() {
    try {
        localStorage.setItem(PLAN_KEY, JSON.stringify({
            weekPlan: state.weekPlan,
            preferences: state.preferences,
            profile: state.profile,
            results: state.results,
            macros: state.macros,
            createdDate: state.planCreatedDate,
        }));
    } catch (e) { /* quota exceeded, ignore */ }
}

// Restores the last generated plan so it survives reloads on the phone
function loadPlan() {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(PLAN_KEY));
    } catch (e) { return; }
    if (!data || !data.weekPlan || data.weekPlan.length === 0) return;

    state.weekPlan = data.weekPlan;
    state.preferences = data.preferences;
    state.profile = data.profile;
    state.results = data.results;
    state.macros = data.macros;
    state.planCreatedDate = data.createdDate;

    try {
        renderResults();
        document.getElementById('ergebnis').classList.remove('hidden');
    } catch (e) { /* results view is optional */ }

    state.currentDay = getPlanDayForDate(localDateStr());
    buildDayTabs(state.currentDay);
    updateMealplanSubtitle();
    renderDayPlan(state.currentDay);
    document.getElementById('mealplan').classList.remove('hidden');
    document.getElementById('tracker').classList.remove('hidden');
}

function generateDayPlan(mealSplit, selectedFoods, daySeed) {
    const targetKcal = state.results.targetKcal;
    const targetProtein = state.macros.protein.grams;
    const targetCarbs = state.macros.carbs.grams;
    const targetFat = state.macros.fats.grams;

    const numMeals = state.preferences.numMeals || 3;
    const mealNamesByCount = {
        3: ['Breakfast', 'Lunch', 'Dinner'],
        4: ['Breakfast', 'Lunch', 'Snack', 'Dinner'],
        5: ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'],
        6: ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner', 'Snack 3'],
    };
    const mealNames = mealNamesByCount[numMeals] || mealNamesByCount[3];
    const meals = [];

    const usedProteins = new Set();

    for (let m = 0; m < numMeals; m++) {
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

    // Day-level calibration: fix remaining macro errors across all meals
    calibrateDay(meals, { protein: targetProtein, carbs: targetCarbs, fat: targetFat, kcal: targetKcal });

    return meals;
}

function buildMeal(mealIndex, targets, selectedFoods, daySeed, isBreakfast, usedProteins) {
    const items = [];
    let remainP = targets.protein;
    let remainC = targets.carbs;
    let remainF = targets.fat;

    // Target protein-to-fat ratio determines how lean we need protein sources
    const targetPFRatio = targets.protein / Math.max(targets.fat, 1);

    const pick = (arr, offset = 0, filterFn = null) => {
        let filtered = filterFn ? arr.filter(filterFn) : arr;
        if (filtered.length === 0) filtered = arr;
        if (filtered.length === 0) return null;
        return filtered[(daySeed * 7 + mealIndex * 3 + offset) % filtered.length];
    };

    // Macro-aware protein selection: simulate each candidate to find best fit
    const pickProtein = (arr, filterFn) => {
        let candidates = filterFn ? arr.filter(filterFn) : arr;
        if (candidates.length === 0) candidates = arr;
        if (candidates.length === 0) return null;

        // For each candidate, simulate: how many grams to hit protein target,
        // and how much fat does that produce vs the fat budget?
        const scored = candidates.map(name => {
            const food = findFood(name);
            if (!food) return { name, score: -Infinity };

            // Grams needed to cover ~85% of meal protein target
            const gramsForProtein = (targets.protein * 0.85) / Math.max(food.protein / 100, 0.01);
            // Cap by fat: don't use more than 80% of fat budget
            const gramsForFat = food.fat > 0.5 ? (targets.fat * 0.8) / (food.fat / 100) : 999;
            const grams = Math.min(gramsForProtein, gramsForFat, isBreakfast ? 250 : 300);
            const actualGrams = Math.max(grams, 40);

            // What macros would this deliver?
            const deliveredP = food.protein * actualGrams / 100;
            const deliveredF = food.fat * actualGrams / 100;

            // Score: protein delivery (higher=better) minus fat overshoot penalty
            const proteinScore = deliveredP / Math.max(targets.protein, 1); // 0-1, how much of target met
            const fatPenalty = Math.max(0, deliveredF - targets.fat) / Math.max(targets.fat, 1); // overshoot ratio
            const score = proteinScore * 100 - fatPenalty * 200;

            return { name, score, food, optimalGrams: actualGrams };
        });

        scored.sort((a, b) => b.score - a.score);

        // Pick from top candidates with rotation for variety
        const poolSize = Math.min(targetPFRatio > 3 ? 3 : 5, scored.length);
        const idx = (daySeed * 7 + mealIndex * 3) % poolSize;
        return scored[idx].name;
    };

    // 1) PROTEIN SOURCE
    const protSources = selectedFoods.proteinquellen || [];
    const protName = pickProtein(protSources, (name) => {
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
            // Calculate optimal grams: hit protein target but respect fat budget
            const gramsForProtein = Math.round((targets.protein * 0.85 / Math.max(food.protein / 100, 0.01)));
            const gramsForFat = food.fat > 0.5
                ? Math.round((remainF * 0.8) / (food.fat / 100))
                : 999;
            const maxGrams = isBreakfast ? 250 : 300;
            let grams = Math.min(gramsForProtein, gramsForFat, maxGrams);
            grams = Math.max(grams, 40);
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

    // Only add a dedicated carb source if the carb budget has room for a realistic portion
    // Estimate incidental carbs from veggies, fruit, protein (~15-20g per meal)
    const incidentalCarbs = isBreakfast ? 12 : 18;
    const carbBudgetForSource = remainC - incidentalCarbs;

    if (carbName && carbBudgetForSource > 8) {
        const food = findFood(carbName);
        if (food) {
            const targetCGrams = Math.max(carbBudgetForSource * 0.85, 10);
            let grams = Math.round((targetCGrams / Math.max(food.carbs, 1)) * 100);
            const minRealistic = getRealisticMinGrams(carbName, food);
            // Low budgets: still use the smallest realistic portion if the meal's carbs allow it,
            // otherwise the day ends up without any scalable carb source
            if (grams < minRealistic && food.carbs * minRealistic / 100 <= remainC) grams = minRealistic;
            // Only add if we can afford a realistic portion
            if (grams >= minRealistic) {
                grams = Math.min(grams, 250);
                items.push(makeItem(carbName, grams, food));
                remainP -= (food.protein * grams / 100);
                remainC -= (food.carbs * grams / 100);
                remainF -= (food.fat * grams / 100);
            }
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

    // 6) OIL/FAT — only if meaningful fat budget remains (at least 8g)
    const oilSources = selectedFoods.oele || [];
    const oilName = pick(oilSources, 5);
    if (oilName && remainF > 8) {
        const food = findFood(oilName);
        if (food) {
            // Use at most 70% of remaining fat budget for oil, capped at 15g
            const grams = Math.min(Math.max(Math.round((remainF * 0.7 / Math.max(food.fat, 1)) * 100), 3), 15);
            items.push(makeItem(oilName, grams, food));
        }
    } else if (oilName && remainF > 3) {
        // Very tight fat budget: tiny drizzle of 5g max
        const food = findFood(oilName);
        if (food) {
            const grams = Math.min(Math.round((remainF * 0.5 / Math.max(food.fat, 1)) * 100), 5);
            if (grams >= 3) items.push(makeItem(oilName, grams, food));
        }
    }

    // === CALIBRATION: scale portions to hit calorie & macro targets ===
    calibrateMeal(items, targets);

    return items;
}

// Realistic minimum portions - below these, drop the item entirely
function getRealisticMinGrams(name, food) {
    if (!food) return 10;
    // Oils: realistic drizzle
    if (food.fat > 60) return 5;
    // Seeds/nuts (high fat, used as toppings): small amount is fine
    if (food.fat > 15 && food.kcal > 400) return 10;
    // Bread/grain products: at least one small slice
    if (food.carbs > 30 && food.fiber > 3 && food.kcal > 200) return 30;
    // Rice/pasta (dry weight): at least a small portion
    if (food.carbs > 60 && food.kcal > 300) return 30;
    // Main protein sources (lean, dominant protein): at least a meaningful portion
    if (food.protein > 15 && food.protein > food.fat * 2) return 80;
    // Fattier protein sources (cheese, eggs): smaller portions ok
    if (food.protein > 10) return 40;
    // Fruits: at least a few bites
    if (food.carbs > 10 && food.fiber > 1 && food.kcal < 100) return 50;
    return 10;
}

function calibrateMeal(items, targets) {
    if (items.length === 0) return;

    // Classify each item by its dominant macro role
    const itemInfo = items.map((item, i) => {
        const food = findFood(item.name);
        if (!food) return null;
        const isVeg = food.kcal < 50;
        const realisticMin = getRealisticMinGrams(item.name, food);
        // Determine role: what macro does this item primarily contribute?
        let role = 'other';
        if (food.fat > 60) role = 'fat';           // oils, butter
        else if (food.protein > 12 && food.protein >= food.carbs) role = 'protein';
        else if (food.carbs > 15 && food.carbs > food.protein) role = 'carb';

        // Realistic max portions by food type
        let maxG = 300;
        if (isVeg) maxG = item.grams;              // fixed
        else if (food.fat > 60) maxG = 20;         // oils: max 20g
        else if (food.fat > 15 && food.kcal > 400) maxG = 30; // seeds/nuts
        else if (role === 'protein' && food.protein < 15) maxG = 350; // dairy (lower density)
        else if (role === 'protein') maxG = 300;   // meat/fish
        else if (role === 'carb') maxG = 250;      // carb sources

        return {
            idx: i, food, role, isVeg,
            pPer100: food.protein, cPer100: food.carbs, fPer100: food.fat,
            minG: isVeg ? item.grams : realisticMin,
            maxG,
            scalable: !isVeg,
        };
    });

    const grams = items.map(it => it.grams);

    // Find the primary item for each role
    const protIdx = itemInfo.findIndex(d => d && d.role === 'protein');
    const carbIdx = itemInfo.findIndex(d => d && d.role === 'carb');
    const fatIdx = itemInfo.findIndex(d => d && d.role === 'fat');

    // Direct iterative scaling: 8 passes to converge
    for (let pass = 0; pass < 8; pass++) {
        // Calculate current totals
        let totP = 0, totC = 0, totF = 0;
        for (let i = 0; i < items.length; i++) {
            const d = itemInfo[i];
            if (!d) continue;
            totP += d.pPer100 * grams[i] / 100;
            totC += d.cPer100 * grams[i] / 100;
            totF += d.fPer100 * grams[i] / 100;
        }

        const errP = targets.protein - totP;
        const errC = targets.carbs - totC;
        const errF = targets.fat - totF;

        // Converged? (within 2g protein, 3g carbs, 2g fat)
        if (Math.abs(errP) <= 2 && Math.abs(errC) <= 3 && Math.abs(errF) <= 2) break;

        // Scale protein source to fix protein error
        if (protIdx >= 0 && itemInfo[protIdx].scalable && Math.abs(errP) > 2) {
            const d = itemInfo[protIdx];
            const addGrams = (errP / d.pPer100) * 100;
            grams[protIdx] = Math.max(d.minG, Math.min(d.maxG, grams[protIdx] + addGrams));
        }

        // Recalculate totals after protein adjustment
        totC = 0; totF = 0; totP = 0;
        for (let i = 0; i < items.length; i++) {
            const d = itemInfo[i];
            if (!d) continue;
            totP += d.pPer100 * grams[i] / 100;
            totC += d.cPer100 * grams[i] / 100;
            totF += d.fPer100 * grams[i] / 100;
        }

        // Scale carb source to fix carb error
        const errC2 = targets.carbs - totC;
        if (carbIdx >= 0 && itemInfo[carbIdx].scalable && Math.abs(errC2) > 3) {
            const d = itemInfo[carbIdx];
            const addGrams = (errC2 / d.cPer100) * 100;
            grams[carbIdx] = Math.max(d.minG, Math.min(d.maxG, grams[carbIdx] + addGrams));
        }

        // Recalculate fat total after carb adjustment
        totF = 0;
        for (let i = 0; i < items.length; i++) {
            const d = itemInfo[i];
            if (!d) continue;
            totF += d.fPer100 * grams[i] / 100;
        }

        // Scale fat source to fix fat error
        const errF2 = targets.fat - totF;
        if (fatIdx >= 0 && itemInfo[fatIdx].scalable) {
            const d = itemInfo[fatIdx];
            const addGrams = (errF2 / d.fPer100) * 100;
            grams[fatIdx] = Math.max(d.minG, Math.min(d.maxG, grams[fatIdx] + addGrams));
        }
    }

    // Round to nearest 5g
    for (let i = 0; i < items.length; i++) {
        const d = itemInfo[i];
        if (!d) continue;
        let rounded = Math.round(grams[i] / 5) * 5;
        grams[i] = Math.max(rounded, d.minG);
    }

    // Post-rounding: greedy ±5g corrections (up to 20 steps)
    for (let step = 0; step < 20; step++) {
        let totP = 0, totC = 0, totF = 0;
        for (let i = 0; i < items.length; i++) {
            const d = itemInfo[i];
            if (!d) continue;
            totP += d.pPer100 * grams[i] / 100;
            totC += d.cPer100 * grams[i] / 100;
            totF += d.fPer100 * grams[i] / 100;
        }

        const errP = targets.protein - totP;
        const errC = targets.carbs - totC;
        const errF = targets.fat - totF;

        if (Math.abs(errP) <= 2 && Math.abs(errC) <= 3 && Math.abs(errF) <= 2) break;

        // Weight: protein and fat errors matter most
        const currentCost = errP * errP * 9 + errC * errC + errF * errF * 9;
        let bestCost = currentCost, bestIdx = -1, bestDelta = 0;

        for (let i = 0; i < items.length; i++) {
            const d = itemInfo[i];
            if (!d || !d.scalable) continue;

            for (const delta of [5, -5]) {
                const ng = grams[i] + delta;
                if (ng < d.minG || ng > d.maxG) continue;

                const nP = errP - d.pPer100 * delta / 100;
                const nC = errC - d.cPer100 * delta / 100;
                const nF = errF - d.fPer100 * delta / 100;
                const cost = nP * nP * 9 + nC * nC + nF * nF * 9;

                if (cost < bestCost - 0.01) {
                    bestCost = cost;
                    bestIdx = i;
                    bestDelta = delta;
                }
            }
        }

        if (bestIdx < 0) break;
        grams[bestIdx] += bestDelta;
    }

    // Remove unrealistically small items
    let removed = false;
    for (let i = items.length - 1; i >= 0; i--) {
        const d = itemInfo[i];
        if (!d || !d.scalable) continue;
        if (grams[i] < d.minG * 0.7) {
            items.splice(i, 1);
            grams.splice(i, 1);
            itemInfo.splice(i, 1);
            removed = true;
        }
    }

    // Rebuild items with final grams
    for (let i = 0; i < items.length; i++) {
        const d = itemInfo[i];
        if (!d) continue;
        items[i] = makeItem(items[i].name, grams[i], d.food);
    }

    // If items were removed, re-run calibration on remaining items
    if (removed && items.length > 0) {
        calibrateMeal(items, targets);
    }
}

function calibrateDay(meals, dayTargets) {
    // Collect all scalable items across all meals with their food data
    const allItems = [];
    meals.forEach((meal, mi) => {
        meal.items.forEach((item, ii) => {
            const food = findFood(item.name);
            if (!food) return;
            const isVeg = food.kcal < 50;
            let role = 'other';
            if (food.fat > 60) role = 'fat';
            else if (food.protein > 12 && food.protein >= food.carbs) role = 'protein';
            else if (food.carbs > 15 && food.carbs > food.protein) role = 'carb';

            let maxG = 300;
            if (isVeg) maxG = item.grams;
            else if (food.fat > 60) maxG = 20;
            else if (food.fat > 15 && food.kcal > 400) maxG = 30;
            else if (role === 'protein' && food.protein < 15) maxG = 350;
            else if (role === 'carb') maxG = 250;

            allItems.push({
                mealIdx: mi, itemIdx: ii, food, role,
                scalable: !isVeg,
                minG: isVeg ? item.grams : getRealisticMinGrams(item.name, food),
                maxG,
                pPer100: food.protein, cPer100: food.carbs, fPer100: food.fat,
            });
        });
    });

    // Working grams array
    const grams = allItems.map(ai => meals[ai.mealIdx].items[ai.itemIdx].grams);

    // Greedy ±5g corrections across entire day (up to 40 steps)
    for (let step = 0; step < 40; step++) {
        let totP = 0, totC = 0, totF = 0;
        for (let i = 0; i < allItems.length; i++) {
            const d = allItems[i];
            totP += d.pPer100 * grams[i] / 100;
            totC += d.cPer100 * grams[i] / 100;
            totF += d.fPer100 * grams[i] / 100;
        }

        const errP = dayTargets.protein - totP;
        const errC = dayTargets.carbs - totC;
        const errF = dayTargets.fat - totF;

        // Converged? (within 3g protein, 4g carbs, 3g fat for entire day)
        if (Math.abs(errP) <= 3 && Math.abs(errC) <= 4 && Math.abs(errF) <= 3) break;

        // Find the single best ±5g adjustment across all items
        const currentCost = errP * errP * 9 + errC * errC + errF * errF * 9;
        let bestCost = currentCost, bestIdx = -1, bestDelta = 0;

        for (let i = 0; i < allItems.length; i++) {
            const d = allItems[i];
            if (!d.scalable) continue;

            for (const delta of [5, -5]) {
                const ng = grams[i] + delta;
                if (ng < d.minG || ng > d.maxG) continue;

                const nP = errP - d.pPer100 * delta / 100;
                const nC = errC - d.cPer100 * delta / 100;
                const nF = errF - d.fPer100 * delta / 100;
                const cost = nP * nP * 9 + nC * nC + nF * nF * 9;

                if (cost < bestCost - 0.1) {
                    bestCost = cost;
                    bestIdx = i;
                    bestDelta = delta;
                }
            }
        }

        if (bestIdx < 0) break;
        grams[bestIdx] += bestDelta;
    }

    // Write adjusted grams back to meals
    for (let i = 0; i < allItems.length; i++) {
        const ai = allItems[i];
        const food = ai.food;
        const g = grams[i];
        meals[ai.mealIdx].items[ai.itemIdx] = makeItem(meals[ai.mealIdx].items[ai.itemIdx].name, g, food);
    }
}

function findFood(name) {
    for (const cat of Object.values(FOODS)) {
        if (cat.items[name]) return cat.items[name];
    }
    return TRACKER_FOODS[name] || null;
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
        const mealIcon = MEAL_ICONS[meal.name] || '&#127860;';
        const recipe = getRecipeName(mi, meal.items);
        return `
            <div class="meal-card">
                <div class="meal-card-header">
                    <span>${mealIcon} ${mealLabel(meal.name)}</span>
                    <span style="display:flex;align-items:center;gap:0.5rem;">
                        <span class="meal-kcal">${Math.round(totals.kcal)} kcal</span>
                        <button onclick="swapMeal(${dayIndex}, ${mi})" title="${L('Swap this meal', 'Mahlzeit tauschen')}"
                            style="width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:opacity 0.2s,background 0.2s;opacity:0.5;padding:0;line-height:1;"
                            onmouseover="this.style.opacity='1';this.style.background='rgba(255,255,255,0.12)'"
                            onmouseout="this.style.opacity='0.5';this.style.background='rgba(255,255,255,0.05)'"
                        >&#8635;</button>
                    </span>
                </div>
                <div class="meal-recipe-name">${recipeText(recipe.name)}</div>
                <div class="meal-card-body">
                    ${meal.items.map(item => `
                        <div class="meal-item">
                            <span class="meal-item-name">${foodLabel(item.name)}</span>
                            <span class="meal-item-amount">${item.grams} g${DRY_WEIGHT_FOODS.has(item.name) ? L(' dry', ' roh') : ''}</span>
                        </div>
                    `).join('')}
                    <div class="meal-tip">${recipeText(recipe.tip)}</div>
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
    savePlan();
    syncDayWithPlan();
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
    allFoodNames.push(...Object.keys(TRACKER_FOODS));

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        if (query.length < 1) {
            autocomplete.classList.add('hidden');
            trackerSelectedFood = null;
            updateTrackerPreview();
            return;
        }

        const matches = allFoodNames.filter(name =>
            name.toLowerCase().includes(query) || foodLabel(name).toLowerCase().includes(query)
        ).slice(0, 12);

        if (matches.length === 0) {
            autocomplete.classList.add('hidden');
            return;
        }

        autocomplete.innerHTML = matches.map(name => {
            const food = findFood(name);
            return `<div class="px-4 py-3 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0 transition-colors" data-food="${name}">
                <div class="font-medium text-sm text-slate-100">${foodLabel(name)}${DRY_WEIGHT_FOODS.has(name) ? ` <span class="text-xs text-amber-400">${L('dry', 'roh')}</span>` : ''}</div>
                <div class="text-xs text-slate-400 mt-0.5">${food.kcal} kcal/100g &middot; P: ${food.protein}g &middot; ${L('C', 'KH')}: ${food.carbs}g &middot; F: ${food.fat}g</div>
            </div>`;
        }).join('');

        autocomplete.classList.remove('hidden');

        autocomplete.querySelectorAll('[data-food]').forEach(el => {
            el.addEventListener('click', () => {
                const foodName = el.dataset.food;
                input.value = foodLabel(foodName);
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

    let gramsNote = `= ${Math.round(grams)} g`;
    if (unit === 'piece' && !PIECE_WEIGHTS[trackerSelectedFood]) gramsNote += L(' (no piece weight known, 100 g assumed: better use grams)', ' (kein Stückgewicht bekannt, 100 g angenommen: besser Gramm verwenden)');
    if (DRY_WEIGHT_FOODS.has(trackerSelectedFood)) gramsNote += L(' · dry weight! For cooked food pick the "(cooked)" entry', ' · Rohgewicht! Für Gekochtes den Eintrag „(gekocht)“ wählen');
    document.getElementById('previewGrams').textContent = gramsNote;
    document.getElementById('previewKcal').textContent = Math.round(food.kcal * grams / 100);
    document.getElementById('previewProtein').textContent = (food.protein * grams / 100).toFixed(1) + 'g';
    document.getElementById('previewCarbs').textContent = (food.carbs * grams / 100).toFixed(1) + 'g';
    document.getElementById('previewFat').textContent = (food.fat * grams / 100).toFixed(1) + 'g';
    document.getElementById('previewFiber').textContent = (food.fiber * grams / 100).toFixed(1) + 'g';
    preview.classList.remove('hidden');
}

// ==========================================
// DAILY LOG (plan meals + own entries, persisted per day)
// ==========================================
function localDateStr(d = new Date()) {
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function getPlanDayForDate(dateStr) {
    const n = state.weekPlan.length;
    if (!n) return null;
    const date = new Date(dateStr + 'T00:00:00');
    if (n === 7) return (date.getDay() + 6) % 7; // 7-day plans are named Monday..Sunday
    const start = new Date((state.planCreatedDate || dateStr) + 'T00:00:00');
    const diff = Math.round((date - start) / 86400000);
    return ((diff % n) + n) % n;
}

function planMealsFor(planDay) {
    const day = planDay === null ? null : state.weekPlan[planDay];
    if (!day) return [];
    return day.meals.map(m => ({ name: m.name, items: m.items.map(i => ({ ...i })), status: 'pending' }));
}

function createDay(dateStr) {
    const planDay = getPlanDayForDate(dateStr);
    return { date: dateStr, planDay, meals: planMealsFor(planDay), extras: [] };
}

function saveDay() {
    try {
        localStorage.setItem(DAY_KEY, JSON.stringify(state.day));
    } catch (e) { /* quota exceeded, ignore */ }
}

function loadDay() {
    let saved = null;
    try {
        saved = JSON.parse(localStorage.getItem(DAY_KEY));
    } catch (e) { /* corrupt entry, start fresh */ }

    const today = localDateStr();
    if (saved && saved.date === today) {
        state.day = saved;
        return;
    }
    if (saved) archiveDay(saved);
    state.day = createDay(today);
    saveDay();
}

// The installed app often resumes from the background on a later day
function checkDayRollover() {
    if (!state.day || state.day.date === localDateStr()) return;
    loadDay();
    loadWaterTracker();
    renderWaterTracker();
    renderTracker();
    renderHistory();
}

// Keep pending plan meals in sync after the plan was regenerated or a meal swapped
function syncDayWithPlan() {
    if (!state.day) return;
    const old = state.day.meals;
    const untouched = old.every(m => m.status === 'pending');
    if (untouched) state.day.planDay = getPlanDayForDate(state.day.date);
    const fresh = planMealsFor(state.day.planDay);
    const len = Math.max(fresh.length, old.length);
    const meals = [];
    for (let i = 0; i < len; i++) {
        if (old[i] && old[i].status !== 'pending') meals.push(old[i]);
        else if (fresh[i]) meals.push(fresh[i]);
    }
    state.day.meals = meals;
    saveDay();
    renderTracker();
}

function getEatenItems(day = state.day) {
    if (!day) return [];
    return [
        ...day.meals.filter(m => m.status === 'done').flatMap(m => m.items),
        ...day.extras,
    ];
}

function toggleMealDone(idx) {
    const meal = state.day.meals[idx];
    meal.status = meal.status === 'done' ? 'pending' : 'done';
    saveDay();
    renderTracker();
}

function removeMeal(idx) {
    state.day.meals[idx].status = 'removed';
    saveDay();
    renderTracker();
    // Jump straight to entering what was eaten instead
    document.getElementById('trackerSlot').value = String(idx);
    const input = document.getElementById('trackerFoodInput');
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    input.focus({ preventScroll: true });
}

function restoreMeal(idx) {
    state.day.meals[idx].status = 'pending';
    saveDay();
    renderTracker();
}

function changePlanDay(value) {
    const planDay = parseInt(value);
    const touched = state.day.meals.some(m => m.status !== 'pending');
    if (touched && !confirm(L('Switch plan day? Ticked and removed meals of today will be reset.', 'Plantag wechseln? Abgehakte und entfernte Mahlzeiten von heute werden zurückgesetzt.'))) {
        renderTracker();
        return;
    }
    state.day.planDay = planDay;
    state.day.meals = planMealsFor(planDay);
    saveDay();
    renderTracker();
}

function addTrackerItem() {
    const input = document.getElementById('trackerFoodInput');
    const foodName = trackerSelectedFood || input.value.trim();

    if (!foodName) {
        alert(L('Please select a food item first.', 'Bitte wähle zuerst ein Lebensmittel aus.'));
        return;
    }

    const food = findFood(foodName);
    if (!food) {
        alert(L('Food not found in database. Please select from the suggestions.', 'Lebensmittel nicht gefunden. Bitte wähle aus den Vorschlägen.'));
        return;
    }

    const amount = parseFloat(document.getElementById('trackerAmount').value) || 100;
    const unit = document.getElementById('trackerUnit').value;
    const grams = getGramsFromUnit(foodName, amount, unit);
    const slotValue = document.getElementById('trackerSlot').value;

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
        slot: slotValue === 'extra' ? 'extra' : parseInt(slotValue),
    };

    state.day.extras.push(item);
    saveDay();
    renderTracker();

    // Reset input (meal slot stays, often several foods go into one meal)
    input.value = '';
    trackerSelectedFood = null;
    document.getElementById('trackerPreview').classList.add('hidden');
    document.getElementById('trackerAmount').value = 100;
    document.getElementById('trackerUnit').value = 'g';
}

function removeTrackerItem(id) {
    state.day.extras = state.day.extras.filter(item => item.id !== id);
    saveDay();
    renderTracker();
}

function clearTracker() {
    if (confirm(L('Reset today\'s log? Plan meals are un-ticked and your own entries removed.', 'Heutiges Protokoll zurücksetzen? Planmahlzeiten werden abgewählt und eigene Einträge gelöscht.'))) {
        state.day.meals.forEach(m => { m.status = 'pending'; });
        state.day.extras = [];
        saveDay();
        renderTracker();
    }
}

function renderTrackerControls() {
    const day = state.day;
    const date = new Date(day.date + 'T00:00:00');
    document.getElementById('trackerDateLabel').textContent =
        date.toLocaleDateString(dateLocale(), { weekday: 'long', day: 'numeric', month: 'short' });

    const planDayWrap = document.getElementById('trackerPlanDayWrap');
    const planDaySelect = document.getElementById('trackerPlanDay');
    if (state.weekPlan.length) {
        planDayWrap.classList.remove('hidden');
        planDaySelect.innerHTML = state.weekPlan.map((d, i) =>
            `<option value="${i}"${i === day.planDay ? ' selected' : ''}>${dayLabel(d.name)}</option>`).join('');
    } else {
        planDayWrap.classList.add('hidden');
    }

    const slotSelect = document.getElementById('trackerSlot');
    const current = slotSelect.value;
    slotSelect.innerHTML = day.meals.map((m, i) => `<option value="${i}">${mealLabel(m.name)}</option>`).join('') +
        '<option value="extra">Snack / Extra</option>';
    slotSelect.value = [...slotSelect.options].some(o => o.value === current) ? current : 'extra';
}

function renderTracker() {
    const listDiv = document.getElementById('trackerList');
    const totalDiv = document.getElementById('trackerTotal');
    const day = state.day;

    renderTrackerControls();

    const slotOf = e => (e.slot !== 'extra' && day.meals[e.slot]) ? e.slot : 'extra';
    const extrasFor = slot => day.extras.filter(e => slotOf(e) === slot);
    const itemRow = item => `
        <div class="tracker-item">
            <div class="tracker-item-info">
                <div class="tracker-item-name">${foodLabel(item.name)}</div>
                <div class="tracker-item-detail">${item.unit === 'g' ? '' : `${item.amount} ${unitLabel(item.unit)} `}(${item.grams}g) &middot; ${item.kcal} kcal</div>
            </div>
            <div class="tracker-item-macros">
                <div class="tracker-item-macro"><div class="tracker-item-macro-value" style="color:var(--protein-color)">${item.protein}g</div><div class="tracker-item-macro-label">P</div></div>
                <div class="tracker-item-macro"><div class="tracker-item-macro-value" style="color:var(--carbs-color)">${item.carbs}g</div><div class="tracker-item-macro-label">${L('C', 'KH')}</div></div>
                <div class="tracker-item-macro"><div class="tracker-item-macro-value" style="color:var(--fats-color)">${item.fat}g</div><div class="tracker-item-macro-label">F</div></div>
            </div>
            <button class="tracker-item-delete" onclick="removeTrackerItem(${item.id})">&#10005;</button>
        </div>`;

    const mealsHtml = day.meals.map((meal, i) => {
        const icon = MEAL_ICONS[meal.name] || '&#127860;';
        const own = extrasFor(i);
        const ownHtml = own.map(itemRow).join('');
        const ownKcal = Math.round(sumItems(own).kcal);

        if (meal.status === 'removed') {
            return `
                <div class="log-meal removed">
                    <div class="log-meal-header">
                        <span class="log-meal-title">${icon} ${mealLabel(meal.name)}</span>
                        <span class="log-meal-kcal">${ownKcal} kcal</span>
                        <button class="log-meal-restore" onclick="restoreMeal(${i})">Restore plan</button>
                    </div>
                    ${ownHtml || `<div class="log-meal-empty">${L(`Plan meal removed. Add what you actually ate with "Add to: ${mealLabel(meal.name)}".`, `Planmahlzeit entfernt. Trag ein, was du wirklich gegessen hast, mit „Hinzufügen zu: ${mealLabel(meal.name)}“.`)}</div>`}
                </div>`;
        }

        const done = meal.status === 'done';
        const planKcal = Math.round(sumItems(meal.items).kcal);
        return `
            <div class="log-meal${done ? ' done' : ''}">
                <div class="log-meal-header">
                    <button class="log-meal-check" onclick="toggleMealDone(${i})" aria-label="Mark as eaten">${done ? '&#10003;' : ''}</button>
                    <span class="log-meal-title">${icon} ${mealLabel(meal.name)}</span>
                    <span class="log-meal-kcal">${planKcal + ownKcal} kcal</span>
                    <button class="tracker-item-delete" onclick="removeMeal(${i})" title="Remove plan meal">&#10005;</button>
                </div>
                <div class="log-meal-items">${meal.items.map(it =>
                    `${foodLabel(it.name)} ${it.grams} g${DRY_WEIGHT_FOODS.has(it.name) ? L(' (dry)', ' (roh)') : ''}`).join(' &middot; ')}</div>
                ${ownHtml}
            </div>`;
    }).join('');

    const snacks = extrasFor('extra');
    const snacksHtml = `
        <div class="log-meal">
            <div class="log-meal-header">
                <span class="log-meal-title">&#127850; Snacks &amp; Extras</span>
                <span class="log-meal-kcal">${Math.round(sumItems(snacks).kcal)} kcal</span>
            </div>
            ${snacks.length ? snacks.map(itemRow).join('') : '<div class="log-meal-empty">Nothing extra yet.</div>'}
        </div>`;

    const noPlanHint = day.meals.length ? '' :
        '<div class="text-center text-slate-400 text-sm py-2">No meal plan for today. Create one to pre-fill your day.</div>';
    listDiv.innerHTML = noPlanHint + mealsHtml + snacksHtml;

    const totals = sumItems(getEatenItems());
    document.getElementById('totalKcal').textContent = Math.round(totals.kcal);
    document.getElementById('totalProtein').textContent = totals.protein.toFixed(1);
    document.getElementById('totalCarbs').textContent = totals.carbs.toFixed(1);
    document.getElementById('totalFat').textContent = totals.fat.toFixed(1);
    document.getElementById('totalFiber').textContent = totals.fiber.toFixed(1);
    totalDiv.classList.remove('hidden');

    const pendingKcal = Math.round(sumItems(day.meals.filter(m => m.status === 'pending').flatMap(m => m.items)).kcal);
    const remainingDiv = document.getElementById('trackerPending');
    remainingDiv.textContent = pendingKcal > 0 ? L(`Still planned today: ${pendingKcal} kcal (not ticked yet)`, `Heute noch geplant: ${pendingKcal} kcal (noch nicht abgehakt)`) : '';

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
        if (saved && saved.date === localDateStr()) {
            state.waterGlasses = saved.glasses || 0;
        } else {
            state.waterGlasses = 0;
        }
    } catch {
        state.waterGlasses = 0;
    }
}

function saveWaterTracker() {
    const today = localDateStr();
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
    if (targetLabel) targetLabel.textContent = L('Target: ', 'Ziel: ') + target + 'L';

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

function getWaterGlassesForDate(dateStr) {
    try {
        const saved = JSON.parse(localStorage.getItem('nourishlab_water_today'));
        return saved && saved.date === dateStr ? saved.glasses || 0 : 0;
    } catch { return 0; }
}

function buildHistoryEntry(day) {
    const items = getEatenItems(day);
    const totals = sumItems(items);
    const glasses = getWaterGlassesForDate(day.date);

    return {
        date: day.date,
        items: items.map(i => ({ name: i.name, grams: i.grams, kcal: i.kcal, protein: i.protein, carbs: i.carbs, fat: i.fat, fiber: i.fiber })),
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
        mealCount: countMeals(day),
        water: {
            glasses: glasses,
            liters: parseFloat((glasses * 0.25).toFixed(2)),
            target: getWaterTarget(),
        },
    };
}

function storeHistoryEntry(entry) {
    const history = getTrackingHistory().filter(d => d.date !== entry.date);
    history.push(entry);
    history.sort((a, b) => b.date.localeCompare(a.date));
    if (history.length > 90) history.length = 90; // keep 90 days max
    saveTrackingHistory(history);
}

// A past day that was never finished still ends up in the history
function archiveDay(day) {
    if (getEatenItems(day).length === 0) return;
    storeHistoryEntry(buildHistoryEntry(day));
}

function finishDay() {
    if (getEatenItems().length === 0) {
        alert(L('Nothing logged as eaten today. Tick off meals or add items first.', 'Heute ist noch nichts als gegessen eingetragen. Hake Mahlzeiten ab oder füge etwas hinzu.'));
        return;
    }

    if (getTrackingHistory().some(d => d.date === state.day.date)) {
        if (!confirm(L('You already have an entry for today. Replace it?', 'Für heute gibt es schon einen Eintrag. Ersetzen?'))) return;
    }

    const entry = buildHistoryEntry(state.day);
    storeHistoryEntry(entry);

    generateFeedback(entry);
    renderHistory();
}

function countMeals(day = state.day) {
    const slots = new Set();
    day.meals.forEach((m, i) => { if (m.status === 'done') slots.add(i); });
    day.extras.forEach(e => slots.add(e.slot));
    return Math.max(slots.size, 1);
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
            tips.push({ icon: '&#9888;', type: 'warning', text: L(
                `<strong>Undereating:</strong> You ate only <strong>${kcalPct}%</strong> of your calorie target (${t.kcal} of ${tgt.kcal} kcal). Chronic undereating slows metabolism and leads to muscle loss. Try adding a portion of complex carbs or healthy fats.`,
                `<strong>Zu wenig gegessen:</strong> Du hast nur <strong>${kcalPct}%</strong> deines Kalorienziels erreicht (${t.kcal} von ${tgt.kcal} kcal). Dauerhaft zu wenig zu essen bremst den Stoffwechsel und führt zu Muskelabbau. Ergänze eine Portion komplexer Kohlenhydrate oder gesunder Fette.`) });
        } else if (kcalPct > 115) {
            tips.push({ icon: '&#128200;', type: 'over', text: L(
                `<strong>Over target:</strong> You consumed <strong>${kcalPct}%</strong> of your calorie target (${t.kcal} of ${tgt.kcal} kcal). An occasional surplus is normal — if this is frequent, consider smaller portions or less calorie-dense foods.`,
                `<strong>Über dem Ziel:</strong> Du hast <strong>${kcalPct}%</strong> deines Kalorienziels gegessen (${t.kcal} von ${tgt.kcal} kcal). Ein gelegentlicher Überschuss ist normal – passiert das häufiger, wähle kleinere Portionen oder weniger kalorienreiche Lebensmittel.`) });
        } else {
            tips.push({ icon: '&#9989;', type: 'good', text: L(
                `<strong>Calories on point!</strong> You hit <strong>${kcalPct}%</strong> of your target (${t.kcal} of ${tgt.kcal} kcal). Well done!`,
                `<strong>Kalorien punktgenau!</strong> Du hast <strong>${kcalPct}%</strong> deines Ziels erreicht (${t.kcal} von ${tgt.kcal} kcal). Gut gemacht!`) });
        }

        // Protein
        if (protPct < 80) {
            tips.push({ icon: '&#127830;', type: 'warning', text: L(
                `<strong>Low protein:</strong> Only ${t.protein}g of ${tgt.protein}g target (${protPct}%). Protein is critical for muscle maintenance and satiety. Consider adding a protein-rich food to your next meal.`,
                `<strong>Wenig Protein:</strong> Nur ${t.protein}g von ${tgt.protein}g Ziel (${protPct}%). Protein ist entscheidend für den Muskelerhalt und die Sättigung. Ergänze bei der nächsten Mahlzeit ein proteinreiches Lebensmittel.`) });
        } else if (protPct >= 95) {
            tips.push({ icon: '&#128170;', type: 'good', text: L(
                `<strong>Protein target hit!</strong> ${t.protein}g of ${tgt.protein}g (${protPct}%). Your muscles are well-supplied.`,
                `<strong>Proteinziel erreicht!</strong> ${t.protein}g von ${tgt.protein}g (${protPct}%). Deine Muskeln sind gut versorgt.`) });
        }

        // Fiber
        if (fiberPct < 70) {
            tips.push({ icon: '&#129382;', type: 'warning', text: L(
                `<strong>Low fiber:</strong> ${t.fiber}g of ${tgt.fiber}g target. Fiber supports digestion, gut health, and satiety. Add more vegetables, legumes, or whole grains.`,
                `<strong>Wenig Ballaststoffe:</strong> ${t.fiber}g von ${tgt.fiber}g Ziel. Ballaststoffe unterstützen Verdauung, Darmgesundheit und Sättigung. Iss mehr Gemüse, Hülsenfrüchte oder Vollkorn.`) });
        } else if (fiberPct >= 90) {
            tips.push({ icon: '&#127793;', type: 'good', text: L(
                `<strong>Great fiber intake!</strong> ${t.fiber}g — excellent for your gut microbiome.`,
                `<strong>Super Ballaststoffzufuhr!</strong> ${t.fiber}g – hervorragend für dein Darmmikrobiom.`) });
        }

        // Fat
        if (fatPct > 130) {
            tips.push({ icon: '&#129361;', type: 'over', text: L(
                `<strong>High fat day:</strong> ${t.fat}g vs. ${tgt.fat}g target (${fatPct}%). Check if oils, nuts, or cheese portions were larger than planned.`,
                `<strong>Fettreicher Tag:</strong> ${t.fat}g statt ${tgt.fat}g Ziel (${fatPct}%). Prüfe, ob Öl-, Nuss- oder Käseportionen größer waren als geplant.`) });
        }

        // Carbs
        if (carbPct < 60) {
            tips.push({ icon: '&#127834;', type: 'warning', text: L(
                `<strong>Very low carbs:</strong> Only ${t.carbs}g of ${tgt.carbs}g (${carbPct}%). Unless intentional, low carbs can reduce energy and workout performance.`,
                `<strong>Sehr wenig Kohlenhydrate:</strong> Nur ${t.carbs}g von ${tgt.carbs}g (${carbPct}%). Wenn das nicht beabsichtigt ist, können wenig Kohlenhydrate Energie und Trainingsleistung mindern.`) });
        }
    } else {
        tips.push({ icon: '&#128161;', type: 'info', text: L(
            `<strong>No targets set.</strong> Fill out your profile and generate a meal plan first to get personalized feedback comparing your intake to your goals.`,
            `<strong>Keine Ziele festgelegt.</strong> Fülle zuerst dein Profil aus und erstelle einen Ernährungsplan, um persönliches Feedback zu deiner Aufnahme im Vergleich zu deinen Zielen zu bekommen.`) });
    }

    // --- Rule compliance ---
    const mealCount = entry.mealCount;
    if (mealCount > 3) {
        tips.push({ icon: '&#128337;', type: 'warning', text: L(
            `<strong>Rule #1 — 3 meals/day:</strong> It looks like you may have had ${mealCount} distinct protein sources today, which could indicate more than 3 meals. Try to consolidate into 3 meals with 5-hour gaps.`,
            `<strong>Regel Nr. 1 – 3 Mahlzeiten/Tag:</strong> Es sieht so aus, als hättest du heute ${mealCount} verschiedene Mahlzeiten gehabt – also mehr als 3. Versuche, alles auf 3 Mahlzeiten mit 5 Stunden Abstand zu bündeln.`) });
    } else if (mealCount <= 3) {
        tips.push({ icon: '&#128337;', type: 'good', text: L(
            `<strong>Rule #1 &#9989;</strong> Looks like approximately ${mealCount} meal(s) — good structure!`,
            `<strong>Regel Nr. 1 &#9989;</strong> Etwa ${mealCount} Mahlzeit(en) – gute Struktur!`) });
    }

    // --- Protein variety ---
    const proteinItems = items.filter(i => { const f = findFood(i.name); return f && f.protein > 8; });
    const uniqueProteins = [...new Set(proteinItems.map(i => i.name))];
    if (uniqueProteins.length >= 2) {
        const proteinList = uniqueProteins.map(foodLabel).join(', ');
        tips.push({ icon: '&#128256;', type: 'good', text: L(
            `<strong>Rule #8 — Protein rotation:</strong> You had ${uniqueProteins.length} different protein sources today (${proteinList}). Great variety!`,
            `<strong>Regel Nr. 8 – Proteinrotation:</strong> Du hattest heute ${uniqueProteins.length} verschiedene Proteinquellen (${proteinList}). Tolle Abwechslung!`) });
    }

    // --- Water reminder ---
    tips.push({ icon: '&#128167;', type: 'info', text: L(
        `<strong>Hydration reminder:</strong> Don't forget your daily water target${tgt ? '' : ' (fill in your profile to calculate it)'}. Drink between meals, not during.`,
        `<strong>Trink-Erinnerung:</strong> Denk an dein tägliches Wasserziel${tgt ? '' : ' (fülle dein Profil aus, um es zu berechnen)'}. Trink zwischen den Mahlzeiten, nicht währenddessen.`) });

    // --- Trend (if history available) ---
    const history = getTrackingHistory();
    if (history.length >= 3 && tgt) {
        const last3 = history.slice(0, 3);
        const avgKcal = Math.round(last3.reduce((s, d) => s + d.totals.kcal, 0) / last3.length);
        const avgProt = Math.round(last3.reduce((s, d) => s + d.totals.protein, 0) / last3.length);
        const kcalTrend = Math.round((avgKcal / tgt.kcal) * 100);
        const trendText = kcalTrend > 105
            ? L('Slight surplus trend — watch portions.', 'Leichter Trend zum Überschuss – achte auf die Portionen.')
            : kcalTrend < 90
                ? L('Slight deficit trend — make sure you eat enough.', 'Leichter Trend zum Defizit – achte darauf, genug zu essen.')
                : L('Right on track!', 'Genau im Plan!');
        tips.push({ icon: '&#128200;', type: 'info', text: L(
            `<strong>3-day trend:</strong> Average ${avgKcal} kcal/day (${kcalTrend}% of target), ${avgProt}g protein. ${trendText}`,
            `<strong>3-Tage-Trend:</strong> Durchschnittlich ${avgKcal} kcal/Tag (${kcalTrend}% des Ziels), ${avgProt}g Protein. ${trendText}`) });
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
        container.innerHTML = `<p class="text-center text-slate-500 text-sm">${L('No days tracked yet. Finish a day to build your history.', 'Noch keine Tage erfasst. Schließe einen Tag ab, um deinen Verlauf aufzubauen.')}</p>`;
        renderCharts();
        return;
    }

    container.innerHTML = history.map((entry, idx) => {
        const d = new Date(entry.date);
        const dayName = d.toLocaleDateString(dateLocale(), { weekday: 'short', month: 'short', day: 'numeric' });
        const t = entry.totals;
        const tgt = entry.targets;
        const kcalPct = tgt ? Math.round((t.kcal / tgt.kcal) * 100) : null;
        const kcalColor = kcalPct === null ? 'text-slate-400' : kcalPct >= 90 && kcalPct <= 110 ? 'text-emerald-400' : kcalPct < 90 ? 'text-amber-400' : 'text-red-400';
        const protColor = tgt && t.protein >= tgt.protein * 0.9 ? 'text-emerald-400' : 'text-slate-300';

        return `<div class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 cursor-pointer transition-all hover:border-primary/30 hover:bg-white/8" onclick="toggleHistoryDetail(${idx})">
            <div class="flex justify-between items-center">
                <div>
                    <div class="font-semibold text-sm">${dayName}</div>
                    <div class="text-xs text-slate-500">${entry.items.length} ${L('items', 'Einträge')}</div>
                </div>
                <div class="flex gap-4 text-right text-sm">
                    <div><span class="font-bold ${kcalColor}">${t.kcal}</span> <span class="text-xs text-slate-500">kcal${kcalPct !== null ? ' (' + kcalPct + '%)' : ''}</span></div>
                    <div><span class="font-bold ${protColor}">${t.protein}g</span> <span class="text-xs text-slate-500">${L('P', 'E')}</span></div>
                    <div><span class="font-bold text-slate-300">${t.carbs}g</span> <span class="text-xs text-slate-500">${L('C', 'K')}</span></div>
                    <div><span class="font-bold text-slate-300">${t.fat}g</span> <span class="text-xs text-slate-500">F</span></div>
                </div>
            </div>
            <div id="historyDetail${idx}" class="hidden mt-3 pt-3 border-t border-white/5">
                <div class="grid gap-1 text-xs text-slate-400">
                    ${entry.items.map(i => `<div class="flex justify-between"><span>${foodLabel(i.name)}</span><span class="text-slate-500">${i.grams}g — ${i.kcal} kcal</span></div>`).join('')}
                </div>
                <div class="mt-3 text-right">
                    <button onclick="event.stopPropagation(); deleteHistoryEntry(${idx})" class="text-xs text-red-400/60 hover:text-red-400 transition-colors">${L('Delete this day', 'Diesen Tag löschen')}</button>
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
    if (!confirm(L('Delete this tracking entry?', 'Diesen Eintrag löschen?'))) return;
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
        return d.toLocaleDateString(dateLocale(), { month: 'short', day: 'numeric' });
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
                        label: L('Actual Calories', 'Tatsächliche Kalorien'),
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
                        label: L('Target', 'Ziel'),
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
                label: L('Avg Protein (g)', 'Ø Protein (g)'),
                data: [avgProtein],
                backgroundColor: '#f87171',
                borderColor: '#f87171',
                borderWidth: 1,
                borderRadius: 6,
            },
            {
                label: L('Avg Carbs (g)', 'Ø Kohlenhydrate (g)'),
                data: [avgCarbs],
                backgroundColor: '#60a5fa',
                borderColor: '#60a5fa',
                borderWidth: 1,
                borderRadius: 6,
            },
            {
                label: L('Avg Fat (g)', 'Ø Fett (g)'),
                data: [avgFat],
                backgroundColor: '#fbbf24',
                borderColor: '#fbbf24',
                borderWidth: 1,
                borderRadius: 6,
            }
        ];

        if (avgTargetP !== null) {
            datasets.push(
                { label: L('Target P', 'Ziel Protein'), data: [avgTargetP], backgroundColor: 'rgba(248,113,113,0.25)', borderColor: '#f87171', borderWidth: 1, borderDash: [4, 3], borderRadius: 6 },
                { label: L('Target C', 'Ziel KH'), data: [avgTargetC], backgroundColor: 'rgba(96,165,250,0.25)', borderColor: '#60a5fa', borderWidth: 1, borderDash: [4, 3], borderRadius: 6 },
                { label: L('Target F', 'Ziel Fett'), data: [avgTargetF], backgroundColor: 'rgba(251,191,36,0.25)', borderColor: '#fbbf24', borderWidth: 1, borderDash: [4, 3], borderRadius: 6 }
            );
        }

        macroChartInstance = new Chart(macroCtx, {
            type: 'bar',
            data: {
                labels: [L('Average Daily Macros', 'Durchschnittliche Makros pro Tag')],
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
        alert(L('PDF library not loaded. Please check your internet connection and reload.',
                'PDF-Bibliothek nicht geladen. Bitte prüfe deine Internetverbindung und lade die Seite neu.'));
        return;
    }

    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const pw = 210;
    const ph = 297;
    const margin = 12;
    const cw = pw - margin * 2;
    let y = margin;

    const p = state.profile;
    const goalNames = {
        fatloss: L('Fat Loss', 'Fettabbau'),
        muscle: L('Muscle Building', 'Muskelaufbau'),
        maintain: L('Maintain', 'Gewicht halten'),
        wellbeing: L('Wellbeing', 'Wohlbefinden'),
    };
    const goalText = p.goals.map(g => goalNames[g]).join(' + ');
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
    doc.text(L('NourishLab - Meal Plan', 'NourishLab - Ernährungsplan'), pw / 2, y + 8, { align: 'center' });
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text(L(
        `${p.name}  |  ${state.results.targetKcal} kcal/day  |  P: ${state.macros.protein.grams}g  |  C: ${state.macros.carbs.grams}g  |  F: ${state.macros.fats.grams}g  |  Fiber: ${state.macros.fiber.grams}g+`,
        `${p.name}  |  ${state.results.targetKcal} kcal/Tag  |  E: ${state.macros.protein.grams}g  |  KH: ${state.macros.carbs.grams}g  |  F: ${state.macros.fats.grams}g  |  Ballaststoffe: ${state.macros.fiber.grams}g+`),
        pw / 2, y, { align: 'center' });
    y += 5;
    const createdDate = new Date().toLocaleDateString(dateLocale() === 'de-DE' ? 'de-DE' : 'en-GB');
    doc.text(L(
        `Goals: ${goalText}  |  BMI: ${state.results.bmi.toFixed(1)}  |  ${state.weekPlan.length} days  |  Created: ${createdDate}`,
        `Ziele: ${goalText}  |  BMI: ${state.results.bmi.toFixed(1)}  |  ${state.weekPlan.length} Tage  |  Erstellt: ${createdDate}`),
        pw / 2, y, { align: 'center' });
    y += 6;

    // Nutrition rules box
    doc.setFillColor(240, 250, 246);
    doc.setDrawColor(...green);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, cw, 10, 2, 2, 'FD');
    doc.setFontSize(7.5);
    doc.setTextColor(...green);
    doc.setFont('helvetica', 'bold');
    doc.text(L('Rules:', 'Regeln:'), margin + 3, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text(L(
        `3 meals/day  |  5h gaps  |  Start with protein  |  1 protein/meal  |  No food after 9 PM  |  ${waterL}L water  |  1 apple/day  |  7-9h sleep`,
        `3 Mahlzeiten/Tag  |  5 h Abstand  |  Mit Protein starten  |  1 Protein/Mahlzeit  |  Nach 21 Uhr nichts essen  |  ${waterL} L Wasser  |  1 Apfel/Tag  |  7-9 h Schlaf`),
        margin + 22, y + 4);
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
        doc.text(dayLabel(day.name), margin, y);
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
            doc.text(`${mealLabel(meal.name)}: ${recipeText(recipe.name)}`, margin, y);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...green);
            doc.text(`${Math.round(totals.kcal)} kcal`, pw - margin, y, { align: 'right' });
            y += 4;

            doc.setFontSize(7);
            doc.setTextColor(...gray);
            doc.setFont('helvetica', 'italic');
            const tipLines = doc.splitTextToSize(recipeText(recipe.tip), cw - 4);
            doc.text(tipLines, margin + 2, y);
            y += tipLines.length * 3 + 2;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7);
            doc.setTextColor(...gray);
            doc.setFillColor(240, 242, 245);
            doc.rect(margin, y - 1, cw, 5, 'F');
            doc.text(L('Food', 'Lebensmittel'), colX[0] + 1, y + 2.5);
            doc.text(L('Amount', 'Menge'), colX[1] + 1, y + 2.5);
            doc.text('Kcal', colX[2] + 1, y + 2.5);
            doc.text(L('Prot', 'Eiw.'), colX[3] + 1, y + 2.5);
            doc.text(L('Carbs', 'KH'), colX[4] + 1, y + 2.5);
            doc.text(L('Fat', 'Fett'), colX[5] + 1, y + 2.5);
            y += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(...dark);
            meal.items.forEach(item => {
                checkPage(6);
                doc.text(foodLabel(item.name), colX[0] + 1, y);
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
        doc.text(`${dt.protein.toFixed(1)}g ${L('P', 'E')}`, margin + sumSpacing * 1.5, sumY, { align: 'center' });
        doc.setTextColor(41, 128, 185);
        doc.text(`${dt.carbs.toFixed(1)}g ${L('C', 'KH')}`, margin + sumSpacing * 2.5, sumY, { align: 'center' });
        doc.setTextColor(212, 160, 23);
        doc.text(`${dt.fat.toFixed(1)}g F`, margin + sumSpacing * 3.5, sumY, { align: 'center' });
        doc.setTextColor(39, 174, 96);
        doc.text(`${dt.fiber.toFixed(1)}g ${L('Fiber', 'Ballaststoffe')}`, margin + sumSpacing * 4.5, sumY, { align: 'center' });
        y += 14;
    });

    doc.save(`NourishLab_${L('MealPlan', 'Ernaehrungsplan')}_${p.name}_${localDateStr()}.pdf`);
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

// Display label for a FOODS category (the label in FOODS itself stays English)
function shoppingCategoryLabel(catKey) {
    const de = {
        proteinquellen: '&#127830; Proteinquellen',
        kohlenhydrate: '&#127834; Kohlenhydratquellen',
        gemuese: '&#129382; Gemüse',
        salate: '&#129388; Salate &amp; Blattgemüse',
        obst: '&#127815; Obst',
        huelsenfruechte: '&#129372; Nüsse &amp; Samen',
        oele: '&#129361; Öle &amp; Fette',
    };
    const en = FOODS[catKey]?.label || catKey;
    return L(en, de[catKey] || en);
}

function generateShoppingList() {
    if (!state.weekPlan || state.weekPlan.length === 0) {
        alert(L('Please generate a meal plan first.', 'Bitte erstelle zuerst einen Ernährungsplan.'));
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
        const label = shoppingCategoryLabel(catKey);
        html += `
            <div class="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-4">
                <h3 class="text-lg font-semibold text-slate-100 mb-3">${label}</h3>
                <ul class="space-y-2">
                    ${grouped[catKey].map(item => `
                        <li class="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                            <span class="text-slate-300">${foodLabel(item.name)}</span>
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
                <h3 class="text-lg font-semibold text-slate-100 mb-3">${L('Other', 'Sonstiges')}</h3>
                <ul class="space-y-2">
                    ${grouped['other'].map(item => `
                        <li class="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                            <span class="text-slate-300">${foodLabel(item.name)}</span>
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

    let text = L(
        `NourishLab Shopping List (${state.weekPlan.length} days)\n${'='.repeat(40)}\n\n`,
        `NourishLab Einkaufsliste (${state.weekPlan.length} Tage)\n${'='.repeat(40)}\n\n`);

    categoryOrder.forEach(catKey => {
        if (!grouped[catKey]) return;
        const label = stripHtml(shoppingCategoryLabel(catKey));
        text += `${label}\n${'-'.repeat(30)}\n`;
        grouped[catKey].forEach(item => {
            text += `  ${foodLabel(item.name)} — ${item.grams}g\n`;
        });
        text += '\n';
    });

    if (grouped['other']) {
        text += `${L('Other', 'Sonstiges')}\n${'-'.repeat(30)}\n`;
        grouped['other'].forEach(item => {
            text += `  ${foodLabel(item.name)} — ${item.grams}g\n`;
        });
    }

    navigator.clipboard.writeText(text.trim()).then(() => {
        const btn = document.querySelector('#shoppinglist .btn-primary');
        const original = btn.innerHTML;
        btn.innerHTML = L('&#10004; Copied!', '&#10004; Kopiert!');
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
