import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        Introduction: "Introduction",
        Home: "Home",
        "Create Advert": "Create Advert",
        "Type": "Type",
        "all": "all",
        "Tag": "Tag",
        "Minimal Price": "Minimal Price",
        "Maximal Price": "Maximal Price",
        "buy": "buy",
        "sell": "sell",
        "Search": "Search",
        "Search Advert": "Search Advert",
        "Detail": "Detail",
        "Edit": "Edit",
        "Money Back Guarantee": "Money Back Guarantee",
        "International Delivery": "International Delivery",
        "Name": "Name", 
        "Description": "Description",
        "Price": "Price",
        "Photo": "Photo",
        "Tags": "Tags",
        "Logout": "Logout",
        "Design by": "Design by",
        "Update": "Update",
        "Create": "Create",
        "SignIn": "SignIn",
        "SignOut": "SignOut",
        "Private": "Private",
        "My Adverts": "My Adverts",
        "Create new Advert": "Create new Advert",
        "Adverts": "Adverts",
        "Nickname": "Nickname",
        "Password": "Password",
        "I do not have an account": "I do not have an account",
        "Sign up with your email, username and password": "Sign up with your email, username and password",
        "Remember, the fields can not be empty": "Remember, the fields can not be empty",
        "I already have an account": "I already have an account",
        "Sign in with your nickname and password": "Sign in with your nickname and password",
        "Forgot Password?": "Forgot Password?",
        "Newest": "Newest"
      }
    },
    es: {
      translations: {
        Introduction: "Introducción",
        Home: "Inicio",
        "Create Advert": "Crear Anuncio",
        "Type": "Tipo",
        "all": "Todos",
        "Tag": "Categoría",
        "Minimal Price": "Precio Mínimo",
        "Maximal Price": "Precio Máximo",
        "buy": "compra",
        "sell": "venta",
        "Search": "Buscar",
        "Search Advert": "Buscar Anuncio",
        "Detail": "Detalle",
        "Edit": "Editar",
        "Money Back Guarantee": "Devolución de dinero garantizada",
        "International Delivery": "Entrega Internacional",
        "Name": "Nombre",
        "Description": "Descripción",
        "Price": "Precio",
        "Photo": "Foto",
        "Tags": "Categorías",
        "Logout": "Salir",
        "Design by": "Diseñado por",
        "Update": "Actualizar",
        "Create": "Crear",
        "SignIn": "Iniciar sesión",
        "SignOut": "Cerrar Sesión",
        "Private": "Privado",
        "My Adverts": "Mis Anuncios",
        "Create new Advert": "Crear nuevo Anuncio",
        "Adverts": "Anuncios",
        "Nickname": "Nombre de usuario",
        "Password": "Contraseña",
        "I do not have an account": "No tengo una cuenta",
        "Sign up with your email, username and password": "Registrate con tu email, nombre de usaurio y contraseña",
        "Remember, the fields can not be empty": "Recuerda, los campos no pueden estar vacíos",
        "I already have an account": "Ya tengo una cuenta",
        "Sign in with your nickname and password": "Inicia sesión con tu nombre de usuario y contraseña",
        "Forgot Password?": "¿Olvidaste la contraseña?",
        "Newest": "Mas recientes"
      }
    },
  },
  fallbackLng: "en",
  debug: true,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false, 
  interpolation: {
    escapeValue: false, 
    formatSeparator: ","
  },
  react: {
    wait: true
  }
});

export default i18n;