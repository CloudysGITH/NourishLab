// ==========================================
// I18N (German / English)
// ==========================================
// Fixed texts (static HTML and fixed strings rendered by app.js) are translated
// automatically via the DE_* dictionaries below. Texts with computed values use
// L(en, de) directly in app.js. Missing entries simply stay English.
const LANG_KEY = 'nourishlab_lang';
let currentLang = detectLang();

function detectLang() {
    try {
        const saved = localStorage.getItem(LANG_KEY);
        if (saved === 'de' || saved === 'en') return saved;
    } catch (e) { /* storage blocked */ }
    return (navigator.language || '').toLowerCase().startsWith('de') ? 'de' : 'en';
}

function L(en, de) { return currentLang === 'de' ? de : en; }

// Bilingual value for text that is computed once and stored (e.g. in the saved plan)
function T(en, de) { return { en, de }; }
function tr(value) { return value && typeof value === 'object' ? (value[currentLang] || value.en) : value; }

function dateLocale() { return currentLang === 'de' ? 'de-DE' : 'en-US'; }
function foodLabel(name) { return currentLang === 'de' ? (DE_FOODS[name] || name) : name; }
function recipeText(text) { return currentLang === 'de' ? (DE_RECIPES[text] || text) : text; }

function mealLabel(name) {
    if (currentLang !== 'de') return name;
    return name.replace(/^(Breakfast|Lunch|Dinner)/, m => DE_MEALS[m]);
}

function dayLabel(name) {
    if (currentLang !== 'de') return name;
    return DE_DAYS[name] || name.replace(/^Day /, 'Tag ');
}

function dayShortLabel(idx) {
    if (currentLang !== 'de') return DAY_SHORT_NAMES[idx];
    return ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][idx] || 'T' + (idx + 1);
}

function unitLabel(unit) {
    if (currentLang !== 'de') return unit;
    return { piece: 'Stück', tbsp: 'EL', tsp: 'TL', cup: 'Tasse', slice: 'Scheibe(n)' }[unit] || unit;
}

const DE_MEALS = { Breakfast: 'Frühstück', Lunch: 'Mittagessen', Dinner: 'Abendessen' };
const DE_DAYS = { Monday: 'Montag', Tuesday: 'Dienstag', Wednesday: 'Mittwoch', Thursday: 'Donnerstag', Friday: 'Freitag', Saturday: 'Samstag', Sunday: 'Sonntag' };

// --- DOM translation of fixed texts ---
const I18N_ATTRS = ['placeholder', 'title', 'aria-label'];
const i18nOriginal = new WeakMap(); // text node -> English source
const i18nApplied = new WeakMap();  // text node -> German value we wrote
const i18nAttrState = new WeakMap(); // element -> { attr: { orig, applied } }
let titleOriginal = null;

function lookupDe(text) {
    const key = text.replace(/\s+/g, ' ').trim();
    if (!key) return null;
    return DE_UI[key] || DE_FOODS[key] || DE_RECIPES[key] || null;
}

function translateTextNode(node) {
    if (i18nApplied.has(node) && i18nApplied.get(node) === node.nodeValue) {
        if (currentLang === 'en') {
            node.nodeValue = i18nOriginal.get(node);
            i18nApplied.delete(node);
        }
        return;
    }
    // Fresh node or value changed by app code: its value is the English source
    i18nApplied.delete(node);
    if (currentLang !== 'de') return;
    const orig = node.nodeValue;
    const de = lookupDe(orig);
    if (!de) return;
    const value = orig.match(/^\s*/)[0] + de + orig.match(/\s*$/)[0];
    i18nOriginal.set(node, orig);
    i18nApplied.set(node, value);
    node.nodeValue = value;
}

function translateAttr(el, attr) {
    const value = el.getAttribute(attr);
    if (value === null) return;
    const states = i18nAttrState.get(el) || {};
    const st = states[attr];
    if (st && st.applied === value) {
        if (currentLang === 'en') {
            delete states[attr];
            el.setAttribute(attr, st.orig);
        }
        return;
    }
    delete states[attr];
    if (currentLang === 'de') {
        const de = lookupDe(value);
        if (de) {
            states[attr] = { orig: value, applied: de };
            el.setAttribute(attr, de);
        }
    }
    i18nAttrState.set(el, states);
}

function translateTree(root) {
    if (root.nodeType === Node.TEXT_NODE) { translateTextNode(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE || root.closest('script,style,[data-no-i18n]')) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: n => n.parentElement.closest('script,style,[data-no-i18n]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    let node;
    while ((node = walker.nextNode())) translateTextNode(node);
    const selector = I18N_ATTRS.map(a => `[${a}]`).join(',');
    [root, ...root.querySelectorAll(selector)].forEach(el => {
        I18N_ATTRS.forEach(attr => { if (el.hasAttribute && el.hasAttribute(attr)) translateAttr(el, attr); });
    });
}

function applyLanguage() {
    document.documentElement.lang = currentLang;
    if (titleOriginal === null) titleOriginal = document.title;
    document.title = currentLang === 'de' ? (lookupDe(titleOriginal) || titleOriginal) : titleOriginal;
    translateTree(document.body);
    document.querySelectorAll('[data-lang]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    try {
        localStorage.setItem(LANG_KEY, lang);
    } catch (e) { /* storage blocked */ }
    applyLanguage();
    if (typeof onLanguageChange === 'function') onLanguageChange();
}

// Called at the end of this file, once the dictionaries exist
function initI18n() {
    new MutationObserver(mutations => {
        for (const m of mutations) {
            if (m.type === 'characterData') translateTextNode(m.target);
            else if (m.type === 'attributes') translateAttr(m.target, m.attributeName);
            else m.addedNodes.forEach(translateTree);
        }
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: I18N_ATTRS });

    applyLanguage();
}

// ==========================================
// DICTIONARIES (English source -> German)
// ==========================================
const DE_UI = {
    "+ Add to Log": "+ Eintragen",
    "0.25 kg": "0,25 kg",
    "0.50 kg/week": "0,50 kg/Woche",
    "0x per week (sedentary / office work)": "0x pro Woche (sitzend / Büroarbeit)",
    "1 day": "1 Tag",
    "1.0 kg": "1,0 kg",
    "14 days": "14 Tage",
    "1st Trimester": "1. Trimester",
    "1x per week": "1x pro Woche",
    "2nd Trimester": "2. Trimester",
    "2x per week": "2x pro Woche",
    "3 meals (Breakfast, Lunch, Dinner)": "3 Mahlzeiten (Frühstück, Mittagessen, Abendessen)",
    "3rd Trimester": "3. Trimester",
    "3x per week": "3x pro Woche",
    "4 meals (Breakfast, Lunch, Snack, Dinner)": "4 Mahlzeiten (Frühstück, Mittagessen, Snack, Abendessen)",
    "4x per week": "4x pro Woche",
    "5 meals (Breakfast, Snack, Lunch, Snack, Dinner)": "5 Mahlzeiten (Frühstück, Snack, Mittagessen, Snack, Abendessen)",
    "5-Hour Gap Between Meals": "5 Stunden Pause zwischen den Mahlzeiten",
    "5x per week": "5x pro Woche",
    "6 meals (every 2-3 hours)": "6 Mahlzeiten (alle 2–3 Stunden)",
    "6x per week": "6x pro Woche",
    "7 days": "7 Tage",
    "7x per week (daily training)": "7x pro Woche (tägliches Training)",
    "Add What You Ate": "Was hast du gegessen?",
    "Add to": "Hinzufügen zu",
    "Age": "Alter",
    "Aim for 7-9 hours of quality sleep per night. Sleep deprivation increases ghrelin (hunger hormone) by up to 28% and decreases leptin (satiety hormone), leading to overeating. Poor sleep also raises cortisol, promoting visceral fat storage and impairing muscle recovery. Growth hormone - essential for repair and fat metabolism - is released primarily during deep sleep.": "Ziel sind 7–9 Stunden guter Schlaf pro Nacht. Schlafmangel erhöht Ghrelin (Hungerhormon) um bis zu 28 % und senkt Leptin (Sättigungshormon) – das führt zu übermäßigem Essen. Schlechter Schlaf erhöht außerdem Cortisol, was die Einlagerung von Bauchfett fördert und die Muskelregeneration bremst. Wachstumshormon – wichtig für Reparatur und Fettstoffwechsel – wird vor allem im Tiefschlaf ausgeschüttet.",
    "All ingredients aggregated across your meal plan": "Alle Zutaten aus deinem Essensplan zusammengefasst",
    "Always begin eating with your protein source first. Studies show this stimulates glucagon release, promotes satiety, and reduces the blood sugar spike from carbohydrates eaten afterwards.": "Iss immer zuerst deine Proteinquelle. Studien zeigen, dass das die Glukagonausschüttung anregt, die Sättigung fördert und den Blutzuckeranstieg durch danach gegessene Kohlenhydrate verringert.",
    "Amount": "Menge",
    "Analysis": "Analyse",
    "Average Macro Breakdown": "Durchschnittliche Makroverteilung",
    "BF / Snack / Lunch / Snack / Dinner": "Frühstück / Snack / Mittag / Snack / Abend",
    "Balanced Breakfast": "Ausgewogenes Frühstück",
    "Basal Metabolic Rate": "Grundumsatz",
    "Based on your body data, goals and preferences, we create your optimal meal plan - grounded in nutritional science.": "Auf Basis deiner Körperdaten, Ziele und Vorlieben erstellen wir deinen optimalen Essensplan – fundiert auf Ernährungswissenschaft.",
    "Based on your data, we calculated the following values.": "Auf Basis deiner Daten haben wir folgende Werte berechnet.",
    "Bigger Lunch": "Großes Mittagessen",
    "Body Fat % (optional)": "Körperfett % (optional)",
    "Breakfast": "Frühstück",
    "Breakfast / Lunch / Dinner": "Frühstück / Mittagessen / Abendessen",
    "Breakfast / Lunch / Snack / Dinner": "Frühstück / Mittagessen / Snack / Abendessen",
    "Calculate Analysis ➔": "Analyse berechnen ➔",
    "Calorie Trend": "Kalorienverlauf",
    "Calories at rest": "Kalorien in Ruhe",
    "Calories incl. activity": "Kalorien inkl. Aktivität",
    "Carbohydrates": "Kohlenhydrate",
    "Carbs": "KH",
    "Carbs (g)": "KH (g)",
    "Combine protein, carbs and healthy fats for a nutritious start.": "Kombiniere Protein, Kohlenhydrate und gesunde Fette für einen nahrhaften Start.",
    "Cup": "Tasse",
    "Current Weight": "Aktuelles Gewicht",
    "Daily Macronutrient Distribution": "Tägliche Makronährstoff-Verteilung",
    "Delete this day": "Diesen Tag löschen",
    "Dinner": "Abendessen",
    "Disclaimer: This app does not replace professional nutrition counseling. For health issues, please consult a doctor or certified nutritionist.": "Hinweis: Diese App ersetzt keine professionelle Ernährungsberatung. Bei gesundheitlichen Problemen wende dich bitte an eine Ärztin, einen Arzt oder eine zertifizierte Ernährungsfachkraft.",
    "Don't eat the same protein source twice in one day. Rotating proteins ensures a broad amino acid spectrum and diverse micronutrient intake across the week.": "Iss nicht zweimal am Tag dieselbe Proteinquelle. Durch Abwechslung bekommst du ein breites Aminosäurespektrum und vielfältige Mikronährstoffe über die Woche.",
    "Drink Plenty of Water": "Trink ausreichend Wasser",
    "Drink at least 35 ml of water per kg of body weight daily. Hydration supports every metabolic process. Drink between meals rather than during to avoid diluting digestive enzymes.": "Trink täglich mindestens 35 ml Wasser pro kg Körpergewicht. Flüssigkeit unterstützt jeden Stoffwechselprozess. Trink lieber zwischen den Mahlzeiten als während, um die Verdauungsenzyme nicht zu verdünnen.",
    "Each meal should contain only one protein source (e.g., either chicken OR fish OR eggs - never mixed). This simplifies digestion and supports optimal enzymatic breakdown and nutrient absorption.": "Jede Mahlzeit sollte nur eine Proteinquelle enthalten (z. B. entweder Hähnchen ODER Fisch ODER Eier – nie gemischt). Das erleichtert die Verdauung und unterstützt die optimale enzymatische Aufspaltung und Nährstoffaufnahme.",
    "Eat exactly three meals per day. No snacking between meals. Research shows this allows insulin levels to drop between meals, promoting fat oxidation and improving insulin sensitivity over time.": "Iss genau drei Mahlzeiten am Tag. Keine Snacks zwischendurch. Studien zeigen, dass der Insulinspiegel so zwischen den Mahlzeiten sinken kann – das fördert die Fettverbrennung und verbessert langfristig die Insulinsensitivität.",
    "Eat one apple daily - ideally in the evening. Apples are rich in pectin, a prebiotic fiber that feeds beneficial gut bacteria, supports detoxification, and helps regulate cholesterol levels.": "Iss täglich einen Apfel – am besten abends. Äpfel sind reich an Pektin, einem präbiotischen Ballaststoff, der nützliche Darmbakterien nährt, die Entgiftung unterstützt und den Cholesterinspiegel reguliert.",
    "Eaten Today": "Heute gegessen",
    "Enter your data so we can calculate your individual needs.": "Gib deine Daten ein, damit wir deinen individuellen Bedarf berechnen können.",
    "Evenly Distributed": "Gleichmäßig verteilt",
    "Evidence-Based": "Evidenzbasiert",
    "Fat": "Fett",
    "Fat (g)": "Fett (g)",
    "Fats": "Fette",
    "Fiber": "Ballaststoffe",
    "Fiber (g)": "Ballastst. (g)",
    "Finish your last meal by 9 PM. Chrononutrition research shows that late eating disrupts circadian rhythms, impairs glucose tolerance, and reduces sleep quality and overnight recovery.": "Beende deine letzte Mahlzeit bis 21 Uhr. Die Chrononutrition-Forschung zeigt, dass spätes Essen den circadianen Rhythmus stört, die Glukosetoleranz verschlechtert und Schlafqualität sowie nächtliche Regeneration mindert.",
    "Food Name": "Lebensmittel",
    "Food Tracker": "Ernährungstagebuch",
    "Fri": "Fr",
    "Friday": "Freitag",
    "Gender": "Geschlecht",
    "Generate Meal Plan ➔": "Essensplan erstellen ➔",
    "Get Started": "Los geht's",
    "Goals (select all that apply)": "Ziele (Mehrfachauswahl möglich)",
    "Gram-precise": "Grammgenau",
    "Grams (g)": "Gramm (g)",
    "Height": "Größe",
    "Hide Progress Charts": "Fortschritt ausblenden",
    "Home": "Start",
    "How many days should your meal plan cover?": "Wie viele Tage soll dein Essensplan umfassen?",
    "How many meals do you want per day?": "Wie viele Mahlzeiten möchtest du am Tag?",
    "Individual Recommendations": "Individuelle Empfehlungen",
    "Intolerances / Allergies": "Unverträglichkeiten / Allergien",
    "Keep it simple - protein with vegetables. Easy on the carbs in the evening.": "Halte es einfach – Protein mit Gemüse. Abends wenig Kohlenhydrate.",
    "Leave at least 5 hours between each meal. This activates the migrating motor complex (MMC) - your gut's natural cleansing wave - and ensures full digestion before the next meal.": "Lass mindestens 5 Stunden zwischen den Mahlzeiten. Das aktiviert den migrierenden motorischen Komplex (MMC) – die natürliche Reinigungswelle deines Darms – und sorgt für eine vollständige Verdauung vor der nächsten Mahlzeit.",
    "Light Breakfast": "Leichtes Frühstück",
    "Light Breakfast, Bigger Dinner": "Leichtes Frühstück, großes Abendessen",
    "Light Dinner Plate": "Leichter Abendteller",
    "Log what you actually ate and see your calorie & macro intake.": "Trag ein, was du wirklich gegessen hast, und sieh deine Kalorien- und Makroaufnahme.",
    "Lunch": "Mittagessen",
    "Main meals + 3 snacks": "Hauptmahlzeiten + 3 Snacks",
    "Mark as eaten": "Als gegessen markieren",
    "Meal Plan": "Essensplan",
    "Menu": "Menü",
    "Milliliters (ml)": "Milliliter (ml)",
    "Mon": "Mo",
    "Monday": "Montag",
    "My Profile": "Mein Profil",
    "Name": "Name",
    "No Eating After 9 PM": "Nach 21 Uhr nichts mehr essen",
    "No days tracked yet. Finish a day to build your history.": "Noch keine Tage erfasst. Schließe einen Tag ab, um deinen Verlauf aufzubauen.",
    "No meal plan for today. Create one to pre-fill your day.": "Kein Essensplan für heute. Erstelle einen, um deinen Tag vorauszufüllen.",
    "Normal weight": "Normalgewicht",
    "Nothing extra yet.": "Noch nichts extra.",
    "NourishLab - Your Personal Nutrition Coach": "NourishLab – Dein persönlicher Ernährungscoach",
    "Nutrition Plan": "Ernährungsplan",
    "Nutrition preview": "Nährwert-Vorschau",
    "Omnivore (everything)": "Omnivor (alles)",
    "One Apple a Day": "Ein Apfel am Tag",
    "Only 3 Meals Per Day": "Nur 3 Mahlzeiten am Tag",
    "Only One Type of Protein Per Meal": "Nur eine Proteinsorte pro Mahlzeit",
    "Pan-Seared Chicken": "Gebratenes Hähnchen",
    "Personalized": "Personalisiert",
    "Pescatarian": "Pescetarisch",
    "Piece(s)": "Stück",
    "Plan day": "Plantag",
    "Please select...": "Bitte auswählen...",
    "Preferences": "Vorlieben",
    "Prioritize Sufficient Sleep": "Achte auf ausreichend Schlaf",
    "Protein": "Protein",
    "Protein (g)": "Protein (g)",
    "Recommended: 0.5 kg/week for sustainable fat loss while preserving muscle mass.": "Empfohlen: 0,5 kg/Woche für nachhaltigen Fettabbau bei Erhalt der Muskelmasse.",
    "Remove plan meal": "Planmahlzeit entfernen",
    "Reset Day": "Tag zurücksetzen",
    "Restore plan": "Zurückholen",
    "Reverse Tracking": "Rückwärts-Tracking",
    "Rotate Your Protein Sources": "Wechsle deine Proteinquellen ab",
    "Rules": "Regeln",
    "Sat": "Sa",
    "Saturday": "Samstag",
    "Science-based": "Wissenschaftlich",
    "Science-based. Individually tailored. Calculated to the gram.": "Wissenschaftlich fundiert. Individuell angepasst. Auf das Gramm genau berechnet.",
    "Season with herbs, pan-sear until golden. Serve with sides.": "Mit Kräutern würzen und goldbraun anbraten. Mit Beilagen servieren.",
    "Select at least 3-4 items per category for a varied plan. If none selected, all compatible foods will be used.": "Wähle mindestens 3–4 Lebensmittel pro Kategorie für einen abwechslungsreichen Plan. Wenn du nichts auswählst, werden alle passenden Lebensmittel verwendet.",
    "Select one or more cuisines. Foods from all selected styles will be available.": "Wähle eine oder mehrere Küchen. Lebensmittel aus allen gewählten Stilen stehen dann zur Verfügung.",
    "Select your preferred foods. The meal plan will be built around them.": "Wähle deine Lieblingslebensmittel. Der Essensplan wird darauf aufgebaut.",
    "Set Preferences ➔": "Vorlieben festlegen ➔",
    "Shopping": "Einkauf",
    "Show Progress Charts": "Fortschritt anzeigen",
    "Slice(s)": "Scheibe(n)",
    "Snack / Extra": "Snack / Extra",
    "Snacks & Extras": "Snacks & Extras",
    "Special Conditions": "Besondere Umstände",
    "Sports / Training": "Sport / Training",
    "Start Each Meal with Protein": "Beginne jede Mahlzeit mit Protein",
    "Start each meal with protein first. Keep 5h gaps between meals. Finish by 9 PM. One apple before bed!": "Beginne jede Mahlzeit mit Protein. 5 Stunden Pause zwischen den Mahlzeiten. Bis 21 Uhr fertig essen. Ein Apfel vor dem Schlafengehen!",
    "Start typing to search (e.g. Chicken Breast, Apple...)": "Tippen zum Suchen (z. B. Hähnchenbrust, Apfel...)",
    "Step 1": "Schritt 1",
    "Step 2": "Schritt 2",
    "Step 3": "Schritt 3",
    "Sun": "So",
    "Sunday": "Sonntag",
    "Swap this meal": "Diese Mahlzeit tauschen",
    "Tablespoon (tbsp)": "Esslöffel (EL)",
    "Target Weight": "Zielgewicht",
    "Target Weight Loss per Week": "Ziel-Gewichtsverlust pro Woche",
    "Teaspoon (tsp)": "Teelöffel (TL)",
    "The 9 Golden Nutrition Rules": "Die 9 goldenen Ernährungsregeln",
    "These science-backed principles optimize your metabolism, digestion, and body composition.": "Diese wissenschaftlich gestützten Prinzipien optimieren deinen Stoffwechsel, deine Verdauung und deine Körperzusammensetzung.",
    "Thu": "Do",
    "Thursday": "Donnerstag",
    "Total Daily Energy": "Gesamtumsatz",
    "Tracker": "Tracker",
    "Trimester": "Trimester",
    "Tue": "Di",
    "Tuesday": "Dienstag",
    "Unit": "Einheit",
    "Vegan": "Vegan",
    "Vegetarian": "Vegetarisch",
    "View Nutrition Rules ➔": "Ernährungsregeln ansehen ➔",
    "Water Tracker": "Wasser-Tracker",
    "Wed": "Mi",
    "Wednesday": "Mittwoch",
    "Weekly Exercise Frequency": "Training pro Woche",
    "Your Analysis": "Deine Analyse",
    "Your Body Profile": "Dein Körperprofil",
    "Your Calorie Target": "Dein Kalorienziel",
    "Your Daily Water Target:": "Dein tägliches Wasserziel:",
    "Your Food Preferences": "Deine Essensvorlieben",
    "Your Personal Meal Plan": "Dein persönlicher Essensplan",
    "Your Personalized": "Dein persönlicher",
    "Your Plan": "Dein Plan",
    "Your Shopping List": "Deine Einkaufsliste",
    "Your name": "Dein Name",
    "kcal total": "kcal gesamt",
    "min. target": "Mindestziel",
    "vs. your daily target": "im Vergleich zu deinem Tagesziel",
    "years": "Jahre",
    "© 2026 NourishLab - Calculations based on Mifflin-St Jeor formula & DGE recommendations": "© 2026 NourishLab – Berechnungen nach Mifflin-St-Jeor-Formel & DGE-Empfehlungen",
    "☀ Lunch": "☀ Mittagessen",
    "♀ Female": "♀ Weiblich",
    "♀️ PCOS": "♀️ PCOS",
    "♂ Male": "♂ Männlich",
    "⚖ Maintain Weight": "⚖ Gewicht halten",
    "⚽ Team Sports": "⚽ Mannschaftssport",
    "⛢ Other": "⛢ Divers",
    "⛰ Hiking": "⛰ Wandern",
    "⛷ Skiing / Snowboarding": "⛷ Ski / Snowboard",
    "✅ Finish Day & Get Feedback": "✅ Tag abschließen & Feedback erhalten",
    "🇪🇺 European": "🇪🇺 Europäisch",
    "🇬🇷 Mediterranean": "🇬🇷 Mediterran",
    "🇮🇳 Indian": "🇮🇳 Indisch",
    "🇯🇵 Asian": "🇯🇵 Asiatisch",
    "🇲🇽 Latin American": "🇲🇽 Lateinamerikanisch",
    "🌅 Breakfast": "🌅 Frühstück",
    "🌙 Dinner": "🌙 Abendessen",
    "🌱 Diet Type": "🌱 Ernährungsform",
    "🌼 General Wellbeing": "🌼 Allgemeines Wohlbefinden",
    "🌼 Menopause / Perimenopause": "🌼 Wechseljahre / Perimenopause",
    "🍅 Soy Allergy": "🍅 Sojaallergie",
    "🍇 Fructose Intolerance": "🍇 Fruktoseintoleranz",
    "🍇 Fruits": "🍇 Obst",
    "🍖 Protein Sources": "🍖 Proteinquellen",
    "🍚 Carbohydrate Sources": "🍚 Kohlenhydratquellen",
    "🍞 Gluten Intolerance": "🍞 Glutenunverträglichkeit",
    "🍪 Snacks & Extras": "🍪 Snacks & Extras",
    "🍳 Preferred Foods": "🍳 Bevorzugte Lebensmittel",
    "🍴 Cuisine Style": "🍴 Küchenstil",
    "🍴 Meals Per Day": "🍴 Mahlzeiten pro Tag",
    "🎯 Goals & Health": "🎯 Ziele & Gesundheit",
    "🎾 Tennis / Badminton": "🎾 Tennis / Badminton",
    "🏃 Activity Level": "🏃 Aktivitätslevel",
    "🏃 Cardio / Running": "🏃 Cardio / Laufen",
    "🏊 Swimming": "🏊 Schwimmen",
    "🏋 CrossFit": "🏋 CrossFit",
    "🏋 Strength Training": "🏋 Krafttraining",
    "👤 Personal Data": "👤 Persönliche Daten",
    "💃 Dancing": "💃 Tanzen",
    "💉 Diabetes / Insulin Resistance": "💉 Diabetes / Insulinresistenz",
    "💚 Eating Disorder Recovery": "💚 Genesung von einer Essstörung",
    "💤 High Stress Level": "💤 Hohes Stresslevel",
    "💪 Muscle Building": "💪 Muskelaufbau",
    "💾 Your entries are automatically saved in your browser.": "💾 Deine Eingaben werden automatisch in deinem Browser gespeichert.",
    "📄 Export as PDF": "📄 Als PDF exportieren",
    "📅 Plan Duration": "📅 Plandauer",
    "📅 Tracking History": "📅 Verlauf",
    "📊 Daily Report & Learnings": "📊 Tagesbericht & Erkenntnisse",
    "📋 Copy to Clipboard": "📋 In Zwischenablage kopieren",
    "📏 Body Measurements": "📏 Körpermaße",
    "🔄 Regenerate": "🔄 Neu erstellen",
    "🔥 Fat Loss": "🔥 Fettabbau",
    "🔥 HIIT": "🔥 HIIT",
    "🔥 Hyperthyroidism": "🔥 Schilddrüsenüberfunktion",
    "🕒 Meal Calorie Distribution": "🕒 Kalorienverteilung der Mahlzeiten",
    "🗑 Clear Saved Data": "🗑 Gespeicherte Daten löschen",
    "🗑 Reset Day": "🗑 Tag zurücksetzen",
    "😢 Depression (on medication)": "😢 Depression (mit Medikamenten)",
    "🚣 Rowing": "🚣 Rudern",
    "🚴 Cycling": "🚴 Radfahren",
    "🛒 Shopping List": "🛒 Einkaufsliste",
    "🤰 Pregnant": "🤰 Schwanger",
    "🤱 Breastfeeding": "🤱 Stillzeit",
    "🥊 Martial Arts / Boxing": "🥊 Kampfsport / Boxen",
    "🥑 Oils & Fats": "🥑 Öle & Fette",
    "🥑 Preferred Oils & Fats": "🥑 Bevorzugte Öle & Fette",
    "🥚 Egg Allergy": "🥚 Eiallergie",
    "🥛 Lactose Intolerance": "🥛 Laktoseintoleranz",
    "🥜 Nut Allergy": "🥜 Nussallergie",
    "🥜 Nuts & Seeds": "🥜 Nüsse & Samen",
    "🥦 Vegetables": "🥦 Gemüse",
    "🥬 Salads & Leafy Greens": "🥬 Salate & Blattgemüse",
    "🧀 Histamine Intolerance": "🧀 Histaminintoleranz",
    "🧗 Climbing / Bouldering": "🧗 Klettern / Bouldern",
    "🧘 Yoga / Pilates": "🧘 Yoga / Pilates",
    "🧪 Remember:": "🧪 Denk dran:",
    "🧬 Autoimmune / Chronic Inflammation": "🧬 Autoimmun / chronische Entzündung",
    "🧬 Hypothyroidism": "🧬 Schilddrüsenunterfunktion",
    "🩸 Anemia / Iron Deficiency": "🩸 Anämie / Eisenmangel",
    "🩹 Recovery from Surgery / Injury": "🩹 Erholung nach OP / Verletzung",
    "🫜 Digestive Issues / IBS": "🫜 Verdauungsprobleme / Reizdarm"
};

const DE_FOODS = {
    "Almonds": "Mandeln",
    "Apple": "Apfel",
    "Artichoke": "Artischocke",
    "Asparagus": "Spargel",
    "Avocado": "Avocado",
    "Avocado Oil": "Avocadoöl",
    "Bamboo Shoots": "Bambussprossen",
    "Banana": "Banane",
    "Basmati Rice": "Basmatireis",
    "Basmati Rice (cooked)": "Basmatireis (gekocht)",
    "Bean Sprouts": "Sojasprossen",
    "Beef Filet": "Rinderfilet",
    "Bell Pepper": "Paprika",
    "Bitter Gourd (Karela)": "Bittermelone (Karela)",
    "Black Beans": "Schwarze Bohnen",
    "Bok Choy": "Bok Choy",
    "Broccoli": "Brokkoli",
    "Brown Rice": "Naturreis",
    "Brown Rice (cooked)": "Naturreis (gekocht)",
    "Brussels Sprouts": "Rosenkohl",
    "Buckwheat": "Buchweizen",
    "Buckwheat (cooked)": "Buchweizen (gekocht)",
    "Bulgur": "Bulgur",
    "Bulgur (cooked)": "Bulgur (gekocht)",
    "Butter": "Butter",
    "Carne Asada": "Carne Asada",
    "Carrots": "Karotten",
    "Cashews": "Cashewkerne",
    "Cauliflower": "Blumenkohl",
    "Celery Stalk": "Staudensellerie",
    "Chana Dal": "Chana Dal",
    "Chapati": "Chapati",
    "Chayote": "Chayote",
    "Chia Seeds": "Chiasamen",
    "Chicken Breast": "Hähnchenbrust",
    "Chicken Tikka (lean)": "Chicken Tikka (mager)",
    "Chickpeas": "Kichererbsen",
    "Coconut Oil": "Kokosöl",
    "Cod": "Kabeljau",
    "Corn Tortilla": "Maistortilla",
    "Cottage Cheese": "Hüttenkäse",
    "Couscous": "Couscous",
    "Couscous (cooked)": "Couscous (gekocht)",
    "Cucumber": "Gurke",
    "Currants": "Johannisbeeren",
    "Daikon Radish": "Rettich (Daikon)",
    "Dal (Toor Dal)": "Dal (Toor Dal)",
    "Dosa (plain)": "Dosa (natur)",
    "Dragon Fruit": "Drachenfrucht",
    "Drumstick (Moringa Pods)": "Moringa-Schoten",
    "Duck Breast": "Entenbrust",
    "Edamame": "Edamame",
    "Edamame Pods": "Edamame-Schoten",
    "Egg Whites": "Eiklar",
    "Eggplant": "Aubergine",
    "Eggs": "Eier",
    "Endive": "Endivie",
    "Fennel": "Fenchel",
    "Feta": "Feta",
    "Flaxseed (Leinsamen)": "Leinsamen",
    "Flaxseed Oil (Leinoel)": "Leinöl",
    "Frisee": "Friséesalat",
    "Ghee": "Ghee",
    "Glass Noodles": "Glasnudeln",
    "Greek Yogurt": "Griechischer Joghurt",
    "Green Beans": "Grüne Bohnen",
    "Green Lentils": "Grüne Linsen",
    "Guava": "Guave",
    "Halloumi": "Halloumi",
    "Harzer Cheese": "Harzer Käse",
    "Herring": "Hering",
    "Idli (steamed rice cake)": "Idli (gedämpfter Reiskuchen)",
    "Jasmine Rice": "Jasminreis",
    "Jasmine Rice (cooked)": "Jasminreis (gekocht)",
    "Jicama": "Yambohne (Jicama)",
    "Kidney Beans": "Kidneybohnen",
    "Kiwi": "Kiwi",
    "Kohlrabi": "Kohlrabi",
    "Korean Beef (Bulgogi)": "Koreanisches Rindfleisch (Bulgogi)",
    "Labneh": "Labneh",
    "Lamb Loin": "Lammrücken",
    "Lamb's Lettuce (Feldsalat)": "Feldsalat",
    "Lean Beef Steak": "Mageres Rindersteak",
    "Lentils": "Linsen",
    "Lollo Rosso": "Lollo Rosso",
    "Lotus Root": "Lotuswurzel",
    "Lychee": "Litschi",
    "Mackerel": "Makrele",
    "Magerquark (low-fat quark)": "Magerquark",
    "Mango": "Mango",
    "Millet (Hirse)": "Hirse",
    "Millet (Hirse) (cooked)": "Hirse (gekocht)",
    "Mixed Berries": "Gemischte Beeren",
    "Mixed Leaf Salad": "Gemischter Blattsalat",
    "Mozzarella": "Mozzarella",
    "Mung Beans": "Mungbohnen",
    "Mushrooms": "Champignons",
    "Mussels": "Miesmuscheln",
    "Mustard Oil": "Senföl",
    "Naan Bread": "Naan-Brot",
    "Napa Cabbage": "Chinakohl",
    "Natural Yogurt 3.8%": "Naturjoghurt 3,8 %",
    "Nopales (Cactus)": "Nopales (Kaktus)",
    "Oatmeal (Haferflocken)": "Haferflocken",
    "Okra (Bhindi)": "Okra",
    "Olive Oil": "Olivenöl",
    "Orange": "Orange",
    "Pak Choi": "Pak Choi",
    "Paneer": "Paneer",
    "Papaya": "Papaya",
    "Passion Fruit": "Maracuja",
    "Pasta (cooked)": "Nudeln (gekocht)",
    "Peach": "Pfirsich",
    "Peanuts": "Erdnüsse",
    "Pear": "Birne",
    "Perch": "Barsch",
    "Pine Nuts": "Pinienkerne",
    "Pinto Beans": "Wachtelbohnen (Pinto)",
    "Pita Bread": "Pitabrot",
    "Plantain": "Kochbanane",
    "Pollo Asado": "Pollo Asado",
    "Pollock": "Seelachs",
    "Pomegranate Seeds": "Granatapfelkerne",
    "Pork Filet": "Schweinefilet",
    "Potatoes": "Kartoffeln",
    "Pumpkin": "Kürbis",
    "Pumpkin Seeds (Pepitas)": "Kürbiskerne",
    "Quinoa": "Quinoa",
    "Quinoa (cooked)": "Quinoa (gekocht)",
    "Rabbit": "Kaninchen",
    "Radishes": "Radieschen",
    "Red Lentils": "Rote Linsen",
    "Rice Noodles": "Reisnudeln",
    "Rice Noodles (cooked)": "Reisnudeln (gekocht)",
    "Ricotta": "Ricotta",
    "Ridge Gourd (Tori)": "Schwammkürbis (Tori)",
    "Roasted Red Pepper": "Geröstete Paprika",
    "Rocket (Rucola)": "Rucola",
    "Romanesco": "Romanesco",
    "Rye Crispbread (Knaeckebrot)": "Roggen-Knäckebrot",
    "Rye Mixed Bread": "Roggenmischbrot",
    "Salmon": "Lachs",
    "Sardines": "Sardinen",
    "Sauerkraut": "Sauerkraut",
    "Scallops": "Jakobsmuscheln",
    "Sea Bass": "Wolfsbarsch",
    "Seaweed Salad (Wakame)": "Algensalat (Wakame)",
    "Seitan": "Seitan",
    "Sesame Oil": "Sesamöl",
    "Sesame Seeds": "Sesam",
    "Shiitake Mushrooms": "Shiitake-Pilze",
    "Shrimp": "Garnelen",
    "Silken Tofu": "Seidentofu",
    "Skyr": "Skyr",
    "Smoked Turkey Breast": "Geräucherte Putenbrust",
    "Snow Peas": "Zuckerschoten",
    "Soba Noodles": "Soba-Nudeln",
    "Soba Noodles (cooked)": "Soba-Nudeln (gekocht)",
    "Sole": "Seezunge",
    "Spelt Flakes (Dinkelflocken)": "Dinkelflocken",
    "Spinach": "Spinat",
    "Squid": "Tintenfisch",
    "Steamed Fish Fillet": "Gedämpftes Fischfilet",
    "Sun-dried Tomatoes": "Getrocknete Tomaten",
    "Sunflower Seeds": "Sonnenblumenkerne",
    "Sweet Potatoes": "Süßkartoffeln",
    "Swiss Chard (Mangold)": "Mangold",
    "Swordfish": "Schwertfisch",
    "Tabbouleh Base": "Taboulé-Basis",
    "Tandoori Fish": "Tandoori-Fisch",
    "Tempeh": "Tempeh",
    "Teriyaki Chicken": "Teriyaki-Hähnchen",
    "Tofu": "Tofu",
    "Tomatoes": "Tomaten",
    "Trout": "Forelle",
    "Tuna (natural)": "Thunfisch (naturell)",
    "Turbot": "Steinbutt",
    "Turkey Breast": "Putenbrust",
    "Turkey Ham": "Putenschinken",
    "Udon Noodles": "Udon-Nudeln",
    "Walnut Oil": "Walnussöl",
    "Walnuts": "Walnüsse",
    "Whole Grain Bread (Vollkornbrot)": "Vollkornbrot",
    "Whole Wheat Pasta": "Vollkornnudeln",
    "Whole Wheat Pasta (cooked)": "Vollkornnudeln (gekocht)",
    "Yuca (Cassava)": "Maniok",
    "Zucchini": "Zucchini"
};

const DE_RECIPES = {
    "A protein-rich snack keeps you satisfied until your next meal.": "Ein proteinreicher Snack hält dich bis zur nächsten Mahlzeit satt.",
    "Apple Cinnamon Porridge": "Apfel-Zimt-Porridge",
    "Arroz con Frijoles": "Arroz con Frijoles",
    "Asian Noodle Bowl": "Asiatische Nudel-Bowl",
    "Asian Tofu Stir-Fry": "Asiatischer Tofu aus dem Wok",
    "Avocado Egg Plate": "Avocado-Eier-Teller",
    "Avocado Toast": "Avocado-Toast",
    "Bake at 200C for 12-15 min with lemon, dill and olive oil.": "Bei 200 °C 12–15 Min. mit Zitrone, Dill und Olivenöl backen.",
    "Bake chicken with potatoes, rosemary, garlic and olive oil.": "Hähnchen mit Kartoffeln, Rosmarin, Knoblauch und Olivenöl im Ofen backen.",
    "Bake salmon with a soy-honey glaze, serve over rice with veggies.": "Lachs mit Soja-Honig-Glasur im Ofen backen, auf Reis mit Gemüse servieren.",
    "Bake salmon, serve with sauteed greens and lemon.": "Lachs im Ofen backen, mit angebratenem Blattgemüse und Zitrone servieren.",
    "Bake with herbs and lemon, serve with vegetables.": "Mit Kräutern und Zitrone backen, mit Gemüse servieren.",
    "Bake with olive oil, lemon, salt. Pair with salad.": "Mit Olivenöl, Zitrone und Salz backen. Dazu Salat.",
    "Baked Fish Dinner": "Fisch aus dem Ofen",
    "Baked salmon over quinoa with roasted vegetables and lemon.": "Ofenlachs auf Quinoa mit Ofengemüse und Zitrone.",
    "Balanced Breakfast": "Ausgewogenes Frühstück",
    "Balanced Lunch Bowl": "Ausgewogene Mittags-Bowl",
    "Balanced Snack": "Ausgewogener Snack",
    "Banana Porridge": "Bananen-Porridge",
    "Beef Stir-Fry": "Rindfleisch aus dem Wok",
    "Berry Overnight Oats": "Beeren-Overnight-Oats",
    "Boiled or scrambled eggs with bread, topped with fresh veggies.": "Gekochte Eier oder Rührei mit Brot, dazu frisches Gemüse.",
    "Boiled or scrambled eggs with salad and bread.": "Gekochte Eier oder Rührei mit Salat und Brot.",
    "Breakfast Quesadilla": "Frühstücks-Quesadilla",
    "Build a bowl with protein, corn tortilla strips, salsa and guacamole.": "Bowl aus Protein, Maistortilla-Streifen, Salsa und Guacamole zusammenstellen.",
    "Bulgur Salad Bowl": "Bulgursalat-Bowl",
    "Cantonese Steamed Fish": "Kantonesisch gedämpfter Fisch",
    "Caprese Breakfast": "Caprese-Frühstück",
    "Caprese Plate": "Caprese-Teller",
    "Carne Asada Bowl": "Carne-Asada-Bowl",
    "Chana Masala": "Chana Masala",
    "Chapati with spiced egg filling - a protein-rich Indian breakfast.": "Chapati mit würziger Eierfüllung – ein proteinreiches indisches Frühstück.",
    "Chicken & Greens": "Hähnchen mit Grüngemüse",
    "Chicken Pasta Primavera": "Hähnchen-Pasta Primavera",
    "Chicken Quinoa Power Bowl": "Hähnchen-Quinoa-Power-Bowl",
    "Chicken Rice Bowl": "Hähnchen-Reis-Bowl",
    "Chicken Tikka Masala": "Chicken Tikka Masala",
    "Chickpea Stew": "Kichererbsen-Eintopf",
    "Citrus-marinated grilled chicken with rice, beans and avocado.": "In Zitrus marinierte gegrillte Hähnchenbrust mit Reis, Bohnen und Avocado.",
    "Classic Egg Breakfast": "Klassisches Eier-Frühstück",
    "Classic rice and beans with sofrito, cilantro and lime.": "Klassischer Reis mit Bohnen, Sofrito, Koriander und Limette.",
    "Combine protein, carbs and healthy fats for a nutritious start.": "Kombiniere Protein, Kohlenhydrate und gesunde Fette für einen nährstoffreichen Start.",
    "Combine quark with oats, fruit and seeds for a protein-rich start.": "Quark mit Haferflocken, Obst und Samen mischen – ein proteinreicher Start in den Tag.",
    "Comforting Dal": "Wohlfühl-Dal",
    "Cook lentils with onion, garlic and spices. Top with fresh herbs.": "Linsen mit Zwiebel, Knoblauch und Gewürzen kochen. Mit frischen Kräutern toppen.",
    "Cook oats with water, mash banana in. Top with cinnamon and nuts.": "Haferflocken in Wasser kochen, Banane hineinzerdrücken. Mit Zimt und Nüssen toppen.",
    "Cook oats, stir in grated apple, cinnamon and a drizzle of honey.": "Haferflocken kochen, geriebenen Apfel, Zimt und etwas Honig unterrühren.",
    "Cottage Cheese Bowl": "Hüttenkäse-Bowl",
    "Cottage Cheese on Toast": "Hüttenkäse auf Toast",
    "Cottage cheese with fruit and seeds - light and protein-rich.": "Hüttenkäse mit Obst und Samen – leicht und proteinreich.",
    "Crispy Tofu Plate": "Knusper-Tofu-Teller",
    "Crispy Tofu Rice Bowl": "Knusper-Tofu-Reis-Bowl",
    "Crispy fermented crepe - serve with potato filling and coconut chutney.": "Knuspriger fermentierter Crêpe – mit Kartoffelfüllung und Kokos-Chutney servieren.",
    "Crumbled feta on bread with tomatoes, cucumber and olive oil.": "Zerbröselter Feta auf Brot mit Tomaten, Gurke und Olivenöl.",
    "Dal Rice": "Dal mit Reis",
    "Duck Breast with Vegetables": "Entenbrust mit Gemüse",
    "Egg Breakfast Plate": "Eier-Frühstücksteller",
    "Egg Dinner Plate": "Eier-Abendteller",
    "Egg Paratha": "Eier-Paratha",
    "Eggs on Toast": "Eier auf Toast",
    "Eggs on corn tortilla with salsa, beans and avocado.": "Eier auf Maistortilla mit Salsa, Bohnen und Avocado.",
    "Feta Breakfast Plate": "Feta-Frühstücksteller",
    "Feta, tomatoes, cucumber, olives, olive oil. Classic and fresh.": "Feta, Tomaten, Gurke, Oliven, Olivenöl. Klassisch und frisch.",
    "Flaked salmon over mixed greens with avocado and lemon dressing.": "Zerpflückter Lachs auf gemischtem Blattsalat mit Avocado und Zitronendressing.",
    "Fluffy bulgur with herbs, tomatoes, cucumber and lemon-olive oil dressing.": "Lockerer Bulgur mit Kräutern, Tomaten, Gurke und Zitronen-Olivenöl-Dressing.",
    "Fresh mozzarella with tomatoes, basil and olive oil on bread.": "Frischer Mozzarella mit Tomaten, Basilikum und Olivenöl auf Brot.",
    "Fresh mozzarella, sliced tomatoes, basil and balsamic.": "Frischer Mozzarella, Tomatenscheiben, Basilikum und Balsamico.",
    "Garlic Butter Shrimp": "Garnelen in Knoblauchbutter",
    "Garlic Shrimp": "Knoblauch-Garnelen",
    "Glazed chicken with rice, edamame and pickled ginger.": "Glasiertes Hähnchen mit Reis, Edamame und eingelegtem Ingwer.",
    "Greek Salad": "Griechischer Salat",
    "Grill until golden, serve with hummus and roasted vegetables.": "Goldbraun grillen, mit Hummus und Ofengemüse servieren.",
    "Grilled Chicken Salad": "Gegrillter Hähnchensalat",
    "Grilled Halloumi Plate": "Gegrillter Halloumi-Teller",
    "Grilled chicken over fluffy quinoa with roasted veggies.": "Gegrilltes Hähnchen auf lockerem Quinoa mit Ofengemüse.",
    "Grilled chicken strips over a fresh garden salad.": "Gegrillte Hähnchenstreifen auf frischem Gartensalat.",
    "Grilled marinated beef with rice, beans, salsa and fresh cilantro.": "Gegrilltes mariniertes Rindfleisch mit Reis, Bohnen, Salsa und frischem Koriander.",
    "Grilled spiced paneer with raita and salad.": "Gegrillter, gewürzter Paneer mit Raita und Salat.",
    "Grilled turkey with steamed vegetables and a light dressing.": "Gegrillte Pute mit gedämpftem Gemüse und leichtem Dressing.",
    "Halloumi Salad": "Halloumi-Salat",
    "Halved avocado with eggs, salt and chili flakes.": "Halbierte Avocado mit Eiern, Salz und Chiliflocken.",
    "Herb Pork Medallions": "Kräuter-Schweinemedaillons",
    "Herb Roasted Chicken & Potatoes": "Kräuter-Ofenhähnchen mit Kartoffeln",
    "Herb Turkey Plate": "Kräuter-Putenteller",
    "Huevos Rancheros": "Huevos Rancheros",
    "Idli with Chutney": "Idli mit Chutney",
    "Keep it simple - protein with vegetables. Easy on the carbs in the evening.": "Halte es einfach – Protein mit Gemüse. Abends wenig Kohlenhydrate.",
    "Korean BBQ Bowl": "Korean-BBQ-Bowl",
    "Layer yogurt with oats, fruit and a sprinkle of seeds.": "Joghurt abwechselnd mit Haferflocken und Obst schichten, mit Samen bestreuen.",
    "Lean Beef with Vegetables": "Mageres Rind mit Gemüse",
    "Lemon Garlic Shrimp": "Zitronen-Knoblauch-Garnelen",
    "Lentil Dal with Rice": "Linsen-Dal mit Reis",
    "Lentil Soup": "Linsensuppe",
    "Light Chicken Salad": "Leichter Hähnchensalat",
    "Light Dinner Plate": "Leichter Abendteller",
    "Light Turkey Dinner": "Leichtes Puten-Abendessen",
    "Lightly flour, pan-fry in olive oil. Serve with lemon and veggies.": "Leicht mehlieren, in Olivenöl braten. Mit Zitrone und Gemüse servieren.",
    "Marinated beef with rice, kimchi and sesame seeds.": "Mariniertes Rindfleisch mit Reis, Kimchi und Sesam.",
    "Masala Dosa": "Masala Dosa",
    "Mash avocado on bread, season with salt, pepper and lemon.": "Avocado auf Brot zerdrücken, mit Salz, Pfeffer und Zitrone würzen.",
    "Mix quark with fruit, add seeds and a drizzle of flaxseed oil.": "Quark mit Obst verrühren, Samen und etwas Leinöl dazugeben.",
    "Moroccan Chickpea Couscous": "Marokkanischer Kichererbsen-Couscous",
    "Oven-Baked Salmon": "Ofenlachs",
    "Pad Thai Style Bowl": "Bowl im Pad-Thai-Stil",
    "Palak Paneer": "Palak Paneer",
    "Pan-Fried Tofu": "Gebratener Tofu",
    "Pan-Fried White Fish": "Gebratener Weißfisch",
    "Pan-Seared Chicken": "Gebratenes Hähnchen",
    "Pan-fried halloumi over mixed greens with pomegranate and lemon.": "Gebratener Halloumi auf gemischtem Blattsalat mit Granatapfel und Zitrone.",
    "Pan-fried turkey breast with seasonal vegetables.": "Gebratene Putenbrust mit saisonalem Gemüse.",
    "Pan-fry tofu cubes, serve with salad and a tahini drizzle.": "Tofuwürfel braten, mit Salat und einem Schuss Tahini servieren.",
    "Pan-sear chicken, serve over rice with steamed broccoli and soy sauce.": "Hähnchen scharf anbraten, auf Reis mit gedämpftem Brokkoli und Sojasauce servieren.",
    "Pan-sear with herbs, serve with a side of vegetables.": "Mit Kräutern scharf anbraten, mit Gemüse als Beilage servieren.",
    "Pan-sear, let rest, slice against the grain. Season simply.": "Scharf anbraten, ruhen lassen, quer zur Faser aufschneiden. Schlicht würzen.",
    "Pan-seared shrimp over mixed greens with lemon dressing.": "Gebratene Garnelen auf gemischtem Blattsalat mit Zitronendressing.",
    "Paneer Paratha": "Paneer-Paratha",
    "Paneer Tikka Bowl": "Paneer-Tikka-Bowl",
    "Paneer cubes in creamy spinach sauce with cumin and garam masala.": "Paneer-Würfel in cremiger Spinatsauce mit Kreuzkümmel und Garam Masala.",
    "Pollo Asado Plate": "Pollo-Asado-Teller",
    "Press and cube tofu, pan-fry until crispy. Serve with rice and veggies.": "Tofu auspressen, würfeln und knusprig braten. Mit Reis und Gemüse servieren.",
    "Press well, marinate in soy sauce, pan-fry until golden.": "Gut auspressen, in Sojasauce marinieren, goldbraun braten.",
    "Quark Berry Bowl": "Quark-Beeren-Bowl",
    "Quark Muesli": "Quark-Müsli",
    "Quark Power Bowl": "Quark-Power-Bowl",
    "Quick saute with garlic and butter, serve with vegetables.": "Kurz mit Knoblauch und Butter anbraten, mit Gemüse servieren.",
    "Quick saute with garlic, butter and lemon juice. 3 min per side.": "Kurz mit Knoblauch, Butter und Zitronensaft anbraten. 3 Min. pro Seite.",
    "Ricotta Toast": "Ricotta-Toast",
    "Roast with spices at 200C for 25 min until crispy.": "Mit Gewürzen bei 200 °C 25 Min. knusprig rösten.",
    "Roasted Chickpea Bowl": "Bowl mit gerösteten Kichererbsen",
    "Rosemary Lamb": "Rosmarin-Lamm",
    "Salmon Quinoa Bowl": "Lachs-Quinoa-Bowl",
    "Salmon Salad": "Lachssalat",
    "Salmon with Green Vegetables": "Lachs mit grünem Gemüse",
    "Saute chicken with green vegetables, garlic and a splash of lemon.": "Hähnchen mit grünem Gemüse, Knoblauch und einem Spritzer Zitrone anbraten.",
    "Saute shrimp with garlic, chili and parsley. Serve over rice or pasta.": "Garnelen mit Knoblauch, Chili und Petersilie anbraten. Auf Reis oder Pasta servieren.",
    "Score skin, sear skin-side down 6 min, flip 4 min. Rest well.": "Haut einritzen, 6 Min. auf der Hautseite braten, wenden, 4 Min. weiter. Gut ruhen lassen.",
    "Scramble eggs with diced tomatoes, fresh herbs and a pinch of salt.": "Eier mit gewürfelten Tomaten, frischen Kräutern und einer Prise Salz verrühren und stocken lassen.",
    "Scrambled Eggs with Tomatoes": "Rührei mit Tomaten",
    "Scrambled, fried or poached eggs on whole grain toast with fresh tomatoes.": "Rührei, Spiegelei oder pochierte Eier auf Vollkorntoast mit frischen Tomaten.",
    "Sear beef, serve with roasted seasonal vegetables.": "Rindfleisch scharf anbraten, mit saisonalem Ofengemüse servieren.",
    "Sear steak to your liking. Serve with roasted potatoes and veggies.": "Steak nach Wunsch braten. Mit Ofenkartoffeln und Gemüse servieren.",
    "Seared Beef with Vegetables": "Scharf angebratenes Rind mit Gemüse",
    "Season with herbs, pan-sear until golden. Serve with sides.": "Mit Kräutern würzen und goldbraun anbraten. Mit Beilagen servieren.",
    "Season with rosemary, garlic and olive oil. Sear, then rest.": "Mit Rosmarin, Knoblauch und Olivenöl würzen. Anbraten, dann ruhen lassen.",
    "Shrimp Salad": "Garnelensalat",
    "Silken Tofu Bowl": "Seidentofu-Bowl",
    "Simmer lentils with carrots, celery, onion and cumin. Warm and filling.": "Linsen mit Karotten, Sellerie, Zwiebel und Kreuzkümmel köcheln lassen. Wärmend und sättigend.",
    "Simmer lentils with cumin, turmeric, garlic. Serve over rice.": "Linsen mit Kreuzkümmel, Kurkuma und Knoblauch köcheln lassen. Auf Reis servieren.",
    "Simmer with onion, tomato, turmeric and tempered spices.": "Mit Zwiebel, Tomate, Kurkuma und in Öl angerösteten Gewürzen köcheln lassen.",
    "Simple Baked Salmon": "Einfacher Ofenlachs",
    "Simple Herb Chicken": "Einfaches Kräuterhähnchen",
    "Skyr Breakfast": "Skyr-Frühstück",
    "Skyr Fruit Bowl": "Skyr-Frucht-Bowl",
    "Skyr with fresh fruit, seeds and a touch of honey.": "Skyr mit frischem Obst, Samen und etwas Honig.",
    "Skyr with fruit and granola or oats for extra fiber.": "Skyr mit Obst und Granola oder Haferflocken für extra Ballaststoffe.",
    "Slice and marinate in smoked paprika + soy, pan-fry until crispy.": "In Scheiben schneiden, in Räucherpaprika und Soja marinieren, knusprig braten.",
    "Slice beef thin, stir-fry with vegetables and serve over rice.": "Rindfleisch in dünne Streifen schneiden, mit Gemüse im Wok braten und auf Reis servieren.",
    "Slice filet into medallions, sear 3 min each side with rosemary.": "Filet in Medaillons schneiden, mit Rosmarin 3 Min. pro Seite anbraten.",
    "Sliced chicken over mixed greens with a lemon vinaigrette.": "Hähnchenstreifen auf gemischtem Blattsalat mit Zitronen-Vinaigrette.",
    "Sliced seared steak over arugula with balsamic vinaigrette.": "Aufgeschnittenes, scharf angebratenes Steak auf Rucola mit Balsamico-Vinaigrette.",
    "Sliced turkey over grains with roasted vegetables.": "Putenstreifen auf Getreide mit Ofengemüse.",
    "Smoky Tempeh Bowl": "Rauchige Tempeh-Bowl",
    "Soak oats overnight in yogurt, top with berries and seeds in the morning.": "Haferflocken über Nacht in Joghurt einweichen, morgens mit Beeren und Samen toppen.",
    "Soft-boiled eggs with cucumber slices, bread and butter.": "Weichgekochte Eier mit Gurkenscheiben, Brot und Butter.",
    "Spice chickpeas with cumin and paprika, serve over couscous.": "Kichererbsen mit Kreuzkümmel und Paprika würzen, auf Couscous servieren.",
    "Spiced chicken in a tomato-cream sauce with basmati rice.": "Gewürztes Hähnchen in Tomaten-Sahne-Sauce mit Basmatireis.",
    "Spiced chickpea curry with tomato, cumin and coriander.": "Würziges Kichererbsen-Curry mit Tomate, Kreuzkümmel und Koriander.",
    "Spread on whole grain bread, top with tomatoes or radishes.": "Auf Vollkornbrot streichen, mit Tomaten oder Radieschen belegen.",
    "Spread ricotta on toast, drizzle with oil, add fruit or tomatoes.": "Ricotta auf Toast streichen, mit Öl beträufeln, Obst oder Tomaten dazu.",
    "Start with your protein, add sides. Season with herbs and good oil.": "Beginne mit dem Protein, ergänze die Beilagen. Mit Kräutern und gutem Öl würzen.",
    "Steak Salad": "Steak-Salat",
    "Steak with Potatoes": "Steak mit Kartoffeln",
    "Steam or poach gently with herbs. Light, easy to digest for dinner.": "Sanft mit Kräutern dämpfen oder pochieren. Leicht und gut bekömmlich am Abend.",
    "Steam with ginger, scallions and light soy sauce.": "Mit Ingwer, Frühlingszwiebeln und heller Sojasauce dämpfen.",
    "Steamed White Fish": "Gedämpfter Weißfisch",
    "Steamed rice cakes with coconut chutney and sambar.": "Gedämpfte Reisküchlein mit Kokos-Chutney und Sambar.",
    "Stew with tomatoes, spinach and cumin. Hearty and satisfying.": "Mit Tomaten, Spinat und Kreuzkümmel schmoren. Herzhaft und sättigend.",
    "Stir-fried tofu with noodles, pak choi and soy-sesame dressing.": "Tofu aus dem Wok mit Nudeln, Pak Choi und Soja-Sesam-Dressing.",
    "Stir-fry shrimp with noodles, bean sprouts, peanuts and lime.": "Garnelen mit Nudeln, Sojasprossen, Erdnüssen und Limette im Wok braten.",
    "Stir-fry tofu with greens, ginger, soy sauce and sesame oil.": "Tofu mit Blattgemüse, Ingwer, Sojasauce und Sesamöl im Wok braten.",
    "Stuff with lemon and herbs, bake in foil at 180C for 20 min.": "Mit Zitrone und Kräutern füllen, in Alufolie bei 180 °C 20 Min. backen.",
    "Stuffed chapati with spiced paneer filling.": "Gefülltes Chapati mit würziger Paneer-Füllung.",
    "Taco Bowl": "Taco-Bowl",
    "Tandoori Fish Plate": "Tandoori-Fischteller",
    "Teriyaki Chicken Bowl": "Teriyaki-Hähnchen-Bowl",
    "Teriyaki Salmon Bowl": "Teriyaki-Lachs-Bowl",
    "Top quark with fruit, nuts/seeds and a drizzle of oil.": "Quark mit Obst, Nüssen/Samen und etwas Öl toppen.",
    "Toss pasta with sliced chicken, sauteed vegetables and olive oil.": "Pasta mit Hähnchenstreifen, angebratenem Gemüse und Olivenöl vermengen.",
    "Turkey Grain Bowl": "Puten-Getreide-Bowl",
    "Veggie Omelette": "Gemüse-Omelett",
    "Warm Lentil Bowl": "Warme Linsen-Bowl",
    "Warm silken tofu with soy sauce, ginger and scallions.": "Warmer Seidentofu mit Sojasauce, Ingwer und Frühlingszwiebeln.",
    "Warm tortilla with cheese, eggs and fresh salsa.": "Warme Tortilla mit Käse, Eiern und frischer Salsa.",
    "Whisk eggs, pour into pan, fill with veggies. Fold and serve.": "Eier verquirlen, in die Pfanne geben, mit Gemüse füllen. Zusammenklappen und servieren.",
    "Whole Baked Trout": "Ganze Forelle aus dem Ofen",
    "Yellow lentil stew with turmeric and cumin, served over basmati rice.": "Gelber Linseneintopf mit Kurkuma und Kreuzkümmel, auf Basmatireis serviert.",
    "Yogurt Breakfast Bowl": "Joghurt-Frühstücksbowl",
    "Yogurt Muesli Bowl": "Joghurt-Müsli-Bowl",
    "Yogurt topped with fruit, nuts and a drizzle of honey.": "Joghurt mit Obst, Nüssen und etwas Honig toppen.",
    "Yogurt-marinated fish with mint chutney and salad.": "In Joghurt marinierter Fisch mit Minz-Chutney und Salat."
};

initI18n();
