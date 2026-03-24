import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  it: {
    translation: {
      "hero_title": "Evoluzione del Benessere",
      "hero_sub": "NUOVA COLLEZIONE 2026",
      "hero_p": "Sblocca il potenziale del tuo corpo attraverso una nutrizione premium e una scienza più intelligente. Scopri il nuovo standard di vita.",
      "hero_cta": "Sfoglia la Collezione",
      "hero_email_placeholder": "Inserisci la tua email...",
      "hero_join": "Unisciti a noi",
      "cat_kits": "Kit & Pacchetti",
      "cat_shakes": "Formula 1 Shakes",
      "cat_protein": "Protein Boost",
      "cat_tea_aloe": "Tè & Aloe",
      "cat_sport": "Sport H24",
      "cat_skin": "Pelle & Corpo",
      "cat_snacks": "Snack Proteici",
      "cat_accessories": "Accessori",
      "price": "Prezzo",
      "sold_out": "Esaurito",
      "premium_formula": "Formula nutrizionale avanzata",
      "add_to_cart": "Aggiungi al carrello",
      "buy_now": "Acquista ora",
      "description": "Descrizione",
      "back_to_shop": "Torna allo shop",
      "guaranteed_purity": "Purezza garantita",
      "nutrition_facts": "Valori nutrizionali",
      "how_to_use": "Come usare"
    }
  },
  en: {
    translation: {
      "hero_title": "Evolution of Wellness",
      "hero_sub": "NEW COLLECTION 2026",
      "hero_p": "Unlocking your body potential through premium nutrition and smarter science. Discover the new standard of life.",
      "hero_cta": "Shop Collection",
      "hero_email_placeholder": "Enter your email...",
      "hero_join": "Join us",
      "cat_kits": "Packs & Bundles",
      "cat_shakes": "Formula 1 Shakes",
      "cat_protein": "Protein Boost",
      "cat_tea_aloe": "Tea & Aloe",
      "cat_sport": "Sport H24",
      "cat_skin": "Face & Body",
      "cat_snacks": "Healthy Snacking",
      "cat_accessories": "Accessories",
      "price": "Price",
      "sold_out": "Sold Out",
      "premium_formula": "Advanced nutrition formula",
      "add_to_cart": "Add to cart",
      "buy_now": "Buy now",
      "description": "Description",
      "back_to_shop": "Back to shop",
      "guaranteed_purity": "Guaranteed purity",
      "nutrition_facts": "Nutrition facts",
      "how_to_use": "How to use"
    }
  },
  fr: {
    translation: {
      "hero_title": "L'Évolution du Bien-être",
      "hero_sub": "NOUVELLE COLLECTION 2026",
      "hero_p": "Libérez le potentiel de votre corps grâce à une nutrition haut de gamme et une science più intelligente. Découvrez le nouveau standard de vie.",
      "hero_cta": "Acheter la collection",
      "hero_email_placeholder": "Entrez votre email...",
      "hero_join": "Rejoignez-nous",
      "cat_kits": "Packs & Assortiments",
      "cat_shakes": "Shakes Formula 1",
      "cat_protein": "Booster de Protéines",
      "cat_tea_aloe": "Thé & Aloès",
      "cat_sport": "Sport H24",
      "cat_skin": "Visage & Corps",
      "cat_snacks": "Snacks Sains",
      "cat_accessories": "Accessoires",
      "price": "Prix",
      "sold_out": "Épuisé",
      "premium_formula": "Formule nutritionnelle avancée",
      "add_to_cart": "Ajouter au panier",
      "buy_now": "Acheter maintenant",
      "description": "Description",
      "back_to_shop": "Retour à la boutique",
      "guaranteed_purity": "Pureté garantie",
      "nutrition_facts": "Valeurs nutritionnelles",
      "how_to_use": "Comment utiliser"
    }
  },
  es: {
    translation: {
      "hero_title": "Evolución del Bienestar",
      "hero_sub": "NUEVA COLLECCIÓN 2026",
      "hero_p": "Libera el potencial de tu corpo attraverso una nutrizione di prima qualità e una scienza più intelligente. Scopri il nuovo standard di vita.",
      "hero_cta": "Comprar colección",
      "hero_email_placeholder": "Tu email aquí...",
      "hero_join": "Únete a nosotros",
      "cat_kits": "Packs & Lotes",
      "cat_shakes": "Batidos Formula 1",
      "cat_protein": "Proteína Plus",
      "cat_tea_aloe": "Té & Aloe",
      "cat_sport": "Deporte H24",
      "cat_skin": "Cara & Cuerpo",
      "cat_snacks": "Snacks Saludables",
      "cat_accessories": "Accesorios",
      "price": "Precio",
      "sold_out": "Agotado",
      "premium_formula": "Fórmula nutricional avanzada",
      "add_to_cart": "Añadir al carrito",
      "buy_now": "Comprar ahora",
      "description": "Descripción",
      "back_to_shop": "Volver a la tienda",
      "guaranteed_purity": "Pureza garantizada",
      "nutrition_facts": "Información nutricional",
      "how_to_use": "Cómo usar"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "it",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
