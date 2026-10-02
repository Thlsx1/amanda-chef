/**
 * Mi Cuaderno de Pastelera - Recetas Mágicas (Chef Amanda)
 * Lógica principal del cuaderno: Mobile-first, offline, localStorage
 */

// ==========================================
// CONSTANTES Y DATOS POR DEFECTO
// ==========================================

const DEFAULT_CONFIG = {
  sueldoMensual: 12000,
  gastosMes: 2160,
  gasPorHora: 8,
  gananciaNegocio: 15,
  cobraTerminal: false,
  pagaImpuestos: false
};

const DEFAULT_INGREDIENT_PRICES = {
  harina_arroz: { id: "harina_arroz", name: "Mezcla de harinas / harina de arroz", pkgPrice: 45, pkgQty: 500, unit: "g" },
  chocolate: { id: "chocolate", name: "Chocolate o cacao en polvo", pkgPrice: 80, pkgQty: 200, unit: "g" },
  endulzante: { id: "endulzante", name: "Endulzante (eritritol o xilitol)", pkgPrice: 180, pkgQty: 500, unit: "g" },
  azucar: { id: "azucar", name: "Azúcar", pkgPrice: 30, pkgQty: 1000, unit: "g" },
  aceite: { id: "aceite", name: "Aceite", pkgPrice: 50, pkgQty: 1000, unit: "ml" },
  aceite_oliva: { id: "aceite_oliva", name: "Aceite de oliva", pkgPrice: 150, pkgQty: 500, unit: "ml" },
  huevo: { id: "huevo", name: "Huevo", pkgPrice: 90, pkgQty: 30, unit: "piezas" },
  polvo_hornear: { id: "polvo_hornear", name: "Polvo para hornear", pkgPrice: 45, pkgQty: 200, unit: "g" },
  leche_almendra: { id: "leche_almendra", name: "Leche de almendra", pkgPrice: 45, pkgQty: 1000, unit: "ml" },
  leche_coco: { id: "leche_coco", name: "Leche de coco", pkgPrice: 35, pkgQty: 400, unit: "ml" },
  naranja: { id: "naranja", name: "Naranja", pkgPrice: 30, pkgQty: 1000, unit: "g" },
  zanahoria: { id: "zanahoria", name: "Zanahoria", pkgPrice: 25, pkgQty: 1000, unit: "g" },
  vainilla: { id: "vainilla", name: "Extracto de vainilla", pkgPrice: 60, pkgQty: 120, unit: "ml" },
  coco_rallado: { id: "coco_rallado", name: "Coco rallado", pkgPrice: 40, pkgQty: 200, unit: "g" },
  harina_almendra: { id: "harina_almendra", name: "Harina de almendra", pkgPrice: 220, pkgQty: 500, unit: "g" }
};

const RECIPES_DATA = {
  chocolate: {
    name: "Pastel de Chocolate",
    ingredients: [
      { id: "harina_arroz", name: "Mezcla de harinas", qty: 195, unit: "g", checked: true },
      { id: "chocolate", name: "Chocolate en polvo", qty: 40, unit: "g", checked: true },
      { id: "endulzante", name: "Endulzante", qty: 100, unit: "g", checked: true },
      { id: "aceite", name: "Aceite", qty: 120, unit: "ml", checked: true },
      { id: "huevo", name: "Huevos", qty: 3, unit: "piezas", checked: true },
      { id: "polvo_hornear", name: "Polvo para hornear", qty: 15, unit: "g", checked: true }
    ]
  },
  naranja: {
    name: "Pastel de Naranja",
    ingredients: [
      { id: "harina_arroz", name: "Mezcla de harinas", qty: 260, unit: "g", checked: true },
      { id: "huevo", name: "Huevos", qty: 3, unit: "piezas", checked: true },
      { id: "aceite", name: "Aceite", qty: 120, unit: "ml", checked: true },
      { id: "endulzante", name: "Endulzante", qty: 100, unit: "g", checked: true },
      { id: "naranja", name: "Naranja", qty: 150, unit: "g", checked: true },
      { id: "polvo_hornear", name: "Polvo para hornear", qty: 15, unit: "g", checked: true }
    ]
  },
  zanahoria: {
    name: "Pastel de Zanahoria",
    ingredients: [
      { id: "harina_arroz", name: "Mezcla de harinas", qty: 260, unit: "g", checked: true },
      { id: "huevo", name: "Huevos", qty: 3, unit: "piezas", checked: true },
      { id: "aceite", name: "Aceite", qty: 120, unit: "ml", checked: true },
      { id: "endulzante", name: "Endulzante", qty: 100, unit: "g", checked: true },
      { id: "zanahoria", name: "Zanahoria", qty: 200, unit: "g", checked: true },
      { id: "polvo_hornear", name: "Polvo para hornear", qty: 15, unit: "g", checked: true }
    ]
  },
  vainilla: {
    name: "Pastel de Vainilla",
    ingredients: [
      { id: "harina_arroz", name: "Mezcla de harinas", qty: 260, unit: "g", checked: true },
      { id: "huevo", name: "Huevos", qty: 3, unit: "piezas", checked: true },
      { id: "aceite", name: "Aceite", qty: 120, unit: "ml", checked: true },
      { id: "leche_almendra", name: "Leche de almendra", qty: 240, unit: "ml", checked: true },
      { id: "endulzante", name: "Endulzante", qty: 100, unit: "g", checked: true },
      { id: "vainilla", name: "Extracto de vainilla", qty: 15, unit: "ml", checked: true },
      { id: "polvo_hornear", name: "Polvo para hornear", qty: 15, unit: "g", checked: true }
    ]
  },
  propia: {
    name: "Mi propia receta",
    ingredients: [
      { id: "harina_arroz", name: "Mezcla de harinas", qty: 250, unit: "g", checked: true },
      { id: "huevo", name: "Huevos", qty: 3, unit: "piezas", checked: true },
      { id: "aceite", name: "Aceite", qty: 100, unit: "ml", checked: true },
      { id: "endulzante", name: "Endulzante", qty: 100, unit: "g", checked: true },
      { id: "polvo_hornear", name: "Polvo para hornear", qty: 15, unit: "g", checked: true }
    ]
  }
};

const DIAGNOSTICS_DATA = {
  se_bajo: {
    title: "Se bajó",
    page: 7,
    cause: "Abriste el horno antes de tiempo o le faltó horno.",
    steps: [
      "Precalienta 15 minutos.",
      "No abras la puerta en los primeros 25 minutos.",
      "Haz la prueba del palillo en el centro antes de sacarlo."
    ]
  },
  crudo: {
    title: "Crudo por dentro",
    page: 8,
    cause: "El horno está muy caliente: se dora por fuera antes de cocerse por dentro.",
    steps: [
      "Usa molde con tubo en el centro.",
      "Baja el horno 10 °C y hornea unos minutos más.",
      "Llena el molde solo hasta la mitad."
    ]
  },
  seco: {
    title: "Seco o arenoso",
    page: 9,
    cause: "La harina de arroz está gruesa o lo dejaste de más en el horno.",
    steps: [
      "Usa harina de arroz muy fina y ciérnela 2 veces.",
      "Deja reposar la masa 10 minutos antes del polvo para hornear.",
      "Sácalo en cuanto el palillo salga limpio."
    ]
  },
  chicloso: {
    title: "Chicloso o pesado",
    page: 10,
    cause: "Pusiste más fécula de la cuenta o lo cortaste caliente.",
    steps: [
      "Respeta la mezcla: 140 g arroz, 60 g papa, 40 g maíz, 20 g avena.",
      "Licúa solo unos segundos después del polvo para hornear.",
      "Déjalo enfriar por completo antes de cortar."
    ]
  },
  desmorona: {
    title: "Se desmorona",
    page: 11,
    cause: "Lo cortaste caliente o le faltó huevo o linaza.",
    steps: [
      "Déjalo enfriar y refrigéralo 30 minutos.",
      "Corta con cuchillo de sierra.",
      "Revisa que pusiste todos los huevos o la linaza."
    ]
  },
  quemado: {
    title: "Quemado arriba o abajo",
    page: 12,
    cause: "La rejilla no está en medio o el horno está más caliente de lo que marca.",
    steps: [
      "Pon la rejilla en medio.",
      "Si se dora rápido, cúbrelo con papel aluminio a la mitad.",
      "Revisa la temperatura con un termómetro de horno."
    ]
  },
  no_crecio: {
    title: "No creció",
    page: 13,
    cause: "Tu polvo para hornear está viejo o el horno estaba frío.",
    steps: [
      "Prueba el polvo en agua caliente: si no burbujea, cámbialo.",
      "Precalienta 15 minutos.",
      "Mete el pastel al horno en cuanto termines la masa."
    ]
  }
};

const MESSAGES_TEMPLATES = {
  avisar_venta: {
    title: "Avisar que ya vendo (estado)",
    fields: [
      { id: "m_producto", label: "¿Qué pastel o postre ofreces?", example: "Pastel de Zanahoria" },
      { id: "m_precio", label: "¿Desde qué precio empieza?", example: "350", isNumber: true },
      { id: "m_telefono", label: "¿WhatsApp del cliente? (opcional)", example: "", isPhone: true }
    ],
    generate: (d) => `🎂 ¡Ya estoy tomando pedidos! Hago ${d.m_producto || "pasteles"} sin gluten, sin lactosa y sin azúcar, hechos a mano en casa. Desde $${d.m_precio || "350"}. Escríbeme para apartar el tuyo 💛`
  },
  ofrecer_conocidas: {
    title: "Ofrecer a conocidas",
    fields: [
      { id: "m_nombre", label: "¿Cómo se llama tu amiga o conocida?", example: "Lupita" },
      { id: "m_producto", label: "¿Qué pastel tienes esta semana?", example: "Pastel de Naranja" },
      { id: "m_precio", label: "¿Cuál es su precio?", example: "320", isNumber: true },
      { id: "m_telefono", label: "¿WhatsApp de tu conocida? (opcional)", example: "", isPhone: true }
    ],
    generate: (d) => `¡Hola, ${d.m_nombre || "amiga"}! 😊 Te cuento que empecé a hacer pasteles sin gluten en casa. Esta semana tengo ${d.m_producto || "pastel"} en $${d.m_precio || "320"}. Si se te antoja o conoces a alguien que no pueda comer gluten, ¡me encantaría que lo probaran!`
  },
  grupo_mamas: {
    title: "Grupo de mamás de la escuela",
    fields: [
      { id: "m_nombre", label: "¿Cómo te llamas tú?", example: "María" },
      { id: "m_hijo", label: "¿Cómo se llama tu hijo o hija?", example: "Santi" },
      { id: "m_telefono", label: "¿Número al que te escriben? (opcional)", example: "", isPhone: true }
    ],
    generate: (d) => `¡Hola, mamás! 👋 Soy ${d.m_nombre || "tu amiga"}, mamá de ${d.m_hijo || "mi peque"}. Hago pasteles y postres sin gluten, sin lactosa y sin azúcar para cumpleaños y festejos del salón. Si a alguien le interesa, con gusto les paso mi menú 💛`
  },
  por_que_caro: {
    title: "¿Por qué tan caro?",
    fields: [
      { id: "m_producto", label: "¿De qué pastel te preguntan?", example: "Pastel de Chocolate" },
      { id: "m_precio", label: "¿Cuál es su precio?", example: "380", isNumber: true },
      { id: "m_telefono", label: "¿WhatsApp del cliente? (opcional)", example: "", isPhone: true }
    ],
    generate: (d) => `¡Te entiendo! 😊 Mis pasteles son sin gluten y llevan ingredientes especiales que cuestan más que los normales. Además los hago a mano y el mismo día. El de ${d.m_producto || "pastel"} sale en $${d.m_precio || "380"}, y lo pueden comer todos sin preocuparse 💛`
  },
  de_verdad_sin_gluten: {
    title: "¿De verdad es sin gluten?",
    fields: [
      { id: "m_producto", label: "¿Para qué pastel quieres responder?", example: "Pastel de Vainilla" },
      { id: "m_telefono", label: "¿WhatsApp del cliente? (opcional)", example: "", isPhone: true }
    ],
    generate: (d) => `¡Sí! 😊 Uso harinas sin gluten, reviso que cada ingrediente diga "sin gluten" en la etiqueta y horneo con utensilios separados. Con gusto te paso la lista completa de ingredientes de tu ${d.m_producto || "pastel"}.`
  },
  confirmar_pedido: {
    title: "Confirmar pedido con anticipo",
    hasSubSteps: true,
    step1Fields: [
      { id: "m_nombre", label: "¿Cómo se llama tu cliente?", example: "Claudia" },
      { id: "m_producto", label: "¿Qué pastel te encargó?", example: "Pastel de Chocolate" }
    ],
    step2Fields: [
      { id: "m_fecha", label: "¿Para qué día es la entrega?", example: "este sábado" },
      { id: "m_precio", label: "¿Cuánto es el total?", example: "420", isNumber: true },
      { id: "m_telefono", label: "¿WhatsApp de tu cliente? (opcional)", example: "", isPhone: true }
    ],
    generate: (d) => `¡Hola, ${d.m_nombre || "amiga"}! 😊 Te confirmo tu pedido: ${d.m_producto || "pastel"} para el ${d.m_fecha || "este sábado"}. Total: $${d.m_precio || "420"}. Para apartar la fecha te pido el 50% de anticipo. En cuanto me mandes tu comprobante, queda apartado 💛`
  },
  recordar_entrega: {
    title: "Recordar la entrega",
    fields: [
      { id: "m_nombre", label: "¿Cómo se llama tu cliente?", example: "Paty" },
      { id: "m_fecha", label: "¿Cuándo entregas? (día u hora)", example: "a las 4 de la tarde" },
      { id: "m_producto", label: "¿Qué pastel vas a entregar?", example: "Pastel de Zanahoria" },
      { id: "m_telefono", label: "¿WhatsApp del cliente? (opcional)", example: "", isPhone: true }
    ],
    generate: (d) => `¡Hola, ${d.m_nombre || "amiga"}! 😊 Te recuerdo que mañana ${d.m_fecha || "a las 4 de la tarde"} te entrego tu ${d.m_producto || "pastel"}. ¿Me confirmas la hora y la dirección? 🎂`
  },
  pedir_recomendacion: {
    title: "Pedir que me recomienden",
    fields: [
      { id: "m_nombre", label: "¿Cómo se llama tu clienta contenta?", example: "Ana" },
      { id: "m_telefono", label: "¿WhatsApp de tu clienta? (opcional)", example: "", isPhone: true }
    ],
    generate: (d) => `¡Hola, ${d.m_nombre || "amiga"}! 💛 Me encantó hacer tu pastel. ¿Me harías un favor? Si conoces a alguien que no pueda comer gluten o que busque postres sin azúcar, ¿le pasas mi número? Me ayudas muchísimo.`
  },
  cobrar_sin_pena: {
    title: "Cobrar sin pena",
    fields: [
      { id: "m_nombre", label: "¿Cómo se llama el cliente?", example: "Rosy" },
      { id: "m_producto", label: "¿Qué pastel le entregaste?", example: "Pastel de Vainilla" },
      { id: "m_precio", label: "¿Cuánto tiene pendiente?", example: "350", isNumber: true },
      { id: "m_telefono", label: "¿WhatsApp del cliente? (opcional)", example: "", isPhone: true }
    ],
    generate: (d) => `¡Hola, ${d.m_nombre || "amiga"}! 😊 Te escribo para recordarte el pago pendiente de tu ${d.m_producto || "pastel"}: $${d.m_precio || "350"}. Cuando lo hagas, mándame tu comprobante por aquí. ¡Gracias! 💛`
  }
};

// ==========================================
// ESTADO DE LA APLICACIÓN
// ==========================================

function getRelativeDateStr(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const DEFAULT_ORDERS = [];

const DEFAULT_CASHBOOK = {
  transactions: [],
  goal: {
    name: "Pagar el gas 🔥",
    amount: 1500
  },
  currentPeriod: "semana"
};

let appState = {
  config: { ...DEFAULT_CONFIG },
  ingredientPrices: { ...DEFAULT_INGREDIENT_PRICES },
  savedCalculations: [],
  orders: [ ...DEFAULT_ORDERS ],
  cashbook: { ...DEFAULT_CASHBOOK },
  currentScreen: "screen-home",
  previousScreen: null,

  // Calculadora
  calc: {
    recipeKey: "chocolate",
    recipeName: "Pastel de Chocolate",
    ingredients: [],
    rebanadas: 12,
    horasTrabajo: 1.5,
    minutosHorno: 45,
    costoEmpaque: 25,
    lastResult: null
  },

  // Mensajes
  messages: {
    selectedSituationKey: null,
    subStep: 1,
    formData: {}
  },

  // Diagnóstico
  diagnostic: {
    selectedKey: null
  },

  // Agenda Form Temporal
  agendaForm: {
    step: 1,
    editingId: null
  },

  // Temp para confirmación de entrega en Mi Caja
  pendingDeliveredOrder: null,

  // Herramienta 6: Calculadora de Fiesta
  fiesta: {
    ninos: 20,
    adultos: 0,
    totalInvitados: 20,
    pricePastel: 25,
    hasCupcake: true,
    cupcakes: 20,
    priceCupcake: 15,
    hasGalletas: true,
    galletas: 40,
    priceGalletas: 5,
    hasGelatina: true,
    gelatinas: 20,
    priceGelatina: 8,
    fecha: "",
    mama: "Laura",
    total: 0,
    anticipo: 0,
    precioPorNino: 0,
    pans: [],
    cakeText: "",
    whatsappMessage: ""
  },

  // Herramienta 7: Tu Menú y Tus Etiquetas
  menu: {
    nombre: "Dulce Sin Gluten",
    whatsapp: "55 1234 5678",
    products: [
      { name: "Pastel de Chocolate", price: 350 },
      { name: "Pastel de Naranja", price: 320 },
      { name: "Pastel de Zanahoria", price: 340 }
    ],
    theme: "beige",
    customBgImg: null
  },
  etiqueta: {
    recipeKey: "chocolate",
    customName: "",
    fecha: "",
    ingredients: "",
    allergens: { huevo: true, nuez: false, cacahuate: false, almendra: false, coco: false },
    careLevel: "100_sin_trigo"
  }
};
window.appState = appState;

// ==========================================
// PERSISTENCIA (localStorage)
// ==========================================

function loadFromStorage() {
  try {
    const savedConfig = localStorage.getItem("mi_cuaderno_config");
    if (savedConfig) {
      appState.config = { ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) };
    }

    const savedPrices = localStorage.getItem("mi_cuaderno_precios_ingredientes");
    if (savedPrices) {
      appState.ingredientPrices = { ...DEFAULT_INGREDIENT_PRICES, ...JSON.parse(savedPrices) };
    }

    const savedCals = localStorage.getItem("mi_cuaderno_guardados");
    if (savedCals) {
      appState.savedCalculations = JSON.parse(savedCals);
    }

    const savedOrders = localStorage.getItem("mi_cuaderno_pedidos");
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      appState.orders = Array.isArray(parsedOrders) ? parsedOrders.filter(o => !["ped_1", "ped_2", "ped_3", "ped_4"].includes(o.id) && o.nombre !== "Paty Gómez") : [];
    } else {
      appState.orders = [];
    }

    const savedCash = localStorage.getItem("mi_cuaderno_caja");
    if (savedCash) {
      const parsedCash = JSON.parse(savedCash);
      const filteredTxs = Array.isArray(parsedCash.transactions) ? parsedCash.transactions.filter(t => !["tx_1", "tx_2", "tx_3"].includes(t.id)) : [];
      appState.cashbook = { ...DEFAULT_CASHBOOK, ...parsedCash, transactions: filteredTxs };
    } else {
      appState.cashbook = { ...DEFAULT_CASHBOOK };
    }

    const savedMenu = localStorage.getItem("mi_cuaderno_menu");
    if (savedMenu) {
      const parsedMenu = JSON.parse(savedMenu);
      if (parsedMenu) {
        if (parsedMenu.nombre) appState.menu.nombre = parsedMenu.nombre;
        if (parsedMenu.whatsapp) appState.menu.whatsapp = parsedMenu.whatsapp;
        if (Array.isArray(parsedMenu.products) && parsedMenu.products.length > 0) {
          appState.menu.products = parsedMenu.products;
        }
        if (parsedMenu.theme) appState.menu.theme = parsedMenu.theme;
      }
    }
  } catch (e) {
    console.error("Error al cargar datos locales:", e);
  }
}

function saveMenuToStorage() {
  try {
    const dataToSave = {
      nombre: appState.menu.nombre,
      whatsapp: appState.menu.whatsapp,
      products: appState.menu.products,
      theme: appState.menu.theme
    };
    localStorage.setItem("mi_cuaderno_menu", JSON.stringify(dataToSave));
  } catch (e) {
    console.error("Error al guardar menú:", e);
  }
}

// ==========================================
// CONTROL DE INFORMACIÓN DE EJEMPLO
// ==========================================
const STORAGE_KEY_AVISO_EJEMPLOS = "mi_cuaderno_ejemplos_usado";

function isEjemplosUsado() {
  try {
    return localStorage.getItem(STORAGE_KEY_AVISO_EJEMPLOS) === "true";
  } catch (e) {
    return false;
  }
}

function markEjemplosComoUsados() {
  if (isEjemplosUsado()) return;
  try {
    localStorage.setItem(STORAGE_KEY_AVISO_EJEMPLOS, "true");
  } catch (e) {
    console.error("Error guardando flag de ejemplos:", e);
  }
  updateAvisoEjemplosVisibility();
  if (typeof renderAgendaWeek === "function") renderAgendaWeek();
  if (typeof renderAgendaHoy === "function") renderAgendaHoy();
  if (typeof renderTxHistory === "function") renderTxHistory();
}

function updateAvisoEjemplosVisibility() {
  const usado = isEjemplosUsado();
  const bannerHome = document.getElementById("banner-aviso-ejemplos");
  const bannerAgenda = document.getElementById("banner-agenda-ejemplos");
  const bannerCaja = document.getElementById("banner-caja-ejemplos");

  if (bannerHome) bannerHome.style.display = usado ? "none" : "block";
  if (bannerAgenda) bannerAgenda.style.display = usado ? "none" : "block";
  if (bannerCaja) bannerCaja.style.display = usado ? "none" : "block";
}

function initAvisoEjemplos() {
  updateAvisoEjemplosVisibility();

  const btnDismissHome = document.getElementById("btn-dismiss-aviso-ejemplos");
  if (btnDismissHome) {
    btnDismissHome.addEventListener("click", () => {
      markEjemplosComoUsados();
      showToast("¡Listo! Tu cuaderno está preparado para tus datos 💛");
    });
  }

  const btnCloseHome = document.getElementById("btn-close-aviso-ejemplos");
  if (btnCloseHome) {
    btnCloseHome.addEventListener("click", () => {
      markEjemplosComoUsados();
    });
  }

  const btnCloseAgenda = document.getElementById("btn-close-agenda-ejemplos");
  if (btnCloseAgenda) {
    btnCloseAgenda.addEventListener("click", () => {
      markEjemplosComoUsados();
    });
  }

  const btnCloseCaja = document.getElementById("btn-close-caja-ejemplos");
  if (btnCloseCaja) {
    btnCloseCaja.addEventListener("click", () => {
      markEjemplosComoUsados();
    });
  }
}

function saveConfigToStorage() {
  try {
    localStorage.setItem("mi_cuaderno_config", JSON.stringify(appState.config));
    markEjemplosComoUsados();
  } catch (e) {
    console.error("Error al guardar config:", e);
  }
}

function savePricesToStorage() {
  try {
    localStorage.setItem("mi_cuaderno_precios_ingredientes", JSON.stringify(appState.ingredientPrices));
    markEjemplosComoUsados();
  } catch (e) {
    console.error("Error al guardar precios:", e);
  }
}

function saveCalculationsToStorage() {
  try {
    localStorage.setItem("mi_cuaderno_guardados", JSON.stringify(appState.savedCalculations));
    markEjemplosComoUsados();
  } catch (e) {
    console.error("Error al guardar cálculos:", e);
  }
}

function saveOrdersToStorage() {
  try {
    localStorage.setItem("mi_cuaderno_pedidos", JSON.stringify(appState.orders));
    markEjemplosComoUsados();
  } catch (e) {
    console.error("Error al guardar pedidos:", e);
  }
  if (typeof renderHomeDaySummary === "function") {
    renderHomeDaySummary();
  }
}

function saveCashbookToStorage() {
  try {
    localStorage.setItem("mi_cuaderno_caja", JSON.stringify(appState.cashbook));
    markEjemplosComoUsados();
  } catch (e) {
    console.error("Error al guardar caja:", e);
  }
  if (typeof renderHomeDaySummary === "function") {
    renderHomeDaySummary();
  }
}

// ==========================================
// UTILIDADES
// ==========================================

// Formato de moneda mexicano: $1,234.50 o $350.00
function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return "$" + num.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Muestra notificación tostada
function showToast(message) {
  const toast = document.getElementById("app-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Copiar al portapapeles
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    showToast("¡Copiado! ✨");
  } catch (err) {
    showToast("¡Copiado! ✨");
  }
}

// Enviar a WhatsApp
function openWhatsApp(text, phone = "") {
  let cleanPhone = (phone || "").replace(/\D/g, "");
  let url = "";
  if (cleanPhone) {
    // Si no tiene prefijo 52 (México), agregarlo si tiene 10 dígitos
    if (cleanPhone.length === 10) {
      cleanPhone = "52" + cleanPhone;
    }
    url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  } else {
    url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  }
  window.open(url, "_blank");
}

// Animación de conteo suave de valores numéricos (< 600ms)
function animateValue(el, start, end, duration = 450, prefix = "$", suffix = "") {
  if (!el) return;
  const numEnd = Number(end) || 0;
  const numStart = Number(start) || 0;
  const finalFormatted = formatCurrency(numEnd);

  // En pruebas automatizadas o si la usuaria prefiere movimiento reducido, mostrar el valor final de inmediato
  if (navigator.webdriver || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    el.textContent = finalFormatted;
    return;
  }

  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - (1 - progress) * (1 - progress);
    const current = numStart + (numEnd - numStart) * ease;
    el.textContent = formatCurrency(current);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = finalFormatted;
    }
  }
  requestAnimationFrame(step);
}

// Momentos de celebración: lluvia leve de confeti en CSS (< 1.5s) y frase de cariño
function triggerCelebration(message = "¡Bien hecho, pastelera! 💛") {
  if (message) {
    showToast(message);
  }

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const container = document.createElement("div");
  container.className = "confetti-burst-container";
  container.setAttribute("aria-hidden", "true");

  const colors = ["#F4DCDC", "#E0527A", "#C8742C", "#8FAE8B", "#F8EBC8"];
  const count = 22;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-particle";
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const size = Math.random() * 6 + 6;
    const delay = Math.random() * 0.25;
    const isRound = Math.random() > 0.5;

    piece.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${isRound ? size : size * 1.5}px;
      background-color: ${color};
      border-radius: ${isRound ? "50%" : "2px"};
      animation-delay: ${delay}s;
    `;
    container.appendChild(piece);
  }

  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 1400);
}

// 3. Saudação que muda com a hora do dia e data por extenso em espanhol
function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let salutation = "¡Buenos días";
  if (hour >= 12 && hour < 19) {
    salutation = "¡Buenas tardes";
  } else if (hour >= 19 || hour < 5) {
    salutation = "¡Buenas noches";
  }

  const titleEl = document.getElementById("home-greeting-title");
  if (titleEl) {
    titleEl.innerHTML = `${salutation}, <span class="font-script">pastelera</span>! 💛`;
  }

  const dateEl = document.getElementById("home-today-date");
  if (dateEl) {
    try {
      const options = { weekday: "long", day: "numeric", month: "long" };
      const dateStr = now.toLocaleDateString("es-MX", options);
      dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    } catch (e) {
      dateEl.textContent = "";
    }
  }
}

// 4. Resumo do dia: 3 mini-cartões deslizantes
function renderHomeDaySummary() {
  // 1. Pedidos de hoy
  const todayStr = getRelativeDateStr(0);
  const todayOrders = (appState.orders || []).filter(o => o.fecha === todayStr && o.status !== "entregado");
  const todayTotal = (appState.orders || []).filter(o => o.fecha === todayStr);
  const elHoy = document.getElementById("summary-pedidos-hoy-val");
  const elHoyLabel = document.getElementById("summary-pedidos-hoy-label");
  const countToday = todayOrders.length > 0 ? todayOrders.length : todayTotal.length;
  if (elHoy) {
    elHoy.textContent = countToday.toString();
  }
  if (elHoyLabel) {
    elHoyLabel.textContent = (appState.orders || []).length === 0 ? "Aún no tienes pedidos" : (countToday > 0 ? "Pedidos para hoy" : "0 pedidos hoy");
  }

  // 2. Por cobrar
  const porCobrar = (appState.orders || []).reduce((sum, ord) => {
    if (ord.status !== "entregado") {
      const anticipo = ord.anticipoPagado ? (ord.montoAnticipo || Math.round(ord.precioTotal * 0.5)) : 0;
      const pendiente = Math.max(0, ord.precioTotal - anticipo);
      return sum + pendiente;
    }
    return sum;
  }, 0);
  const elCobrar = document.getElementById("summary-por-cobrar-val");
  const elCobrarLabel = document.getElementById("summary-por-cobrar-label");
  if (elCobrar) {
    animateValue(elCobrar, 0, porCobrar, 450, "$");
  }
  if (elCobrarLabel) {
    elCobrarLabel.textContent = porCobrar > 0 ? "Por cobrar pendiente" : "Nada por cobrar";
  }

  // 3. Te quedaron esta semana
  let teQuedaron = 0;
  let hasTransactions = false;
  if (typeof filterTransactionsByPeriod === "function") {
    const filteredTxs = filterTransactionsByPeriod("semana");
    hasTransactions = (appState.cashbook.transactions || []).length > 0;
    let totalVendi = 0;
    let totalGaste = 0;
    filteredTxs.forEach(tx => {
      if (tx.type === "sale") totalVendi += tx.amount;
      else if (tx.type === "expense") totalGaste += tx.amount;
    });
    teQuedaron = totalVendi - totalGaste;
  }
  const elQuedaron = document.getElementById("summary-te-quedaron-val");
  const elQuedaronLabel = document.getElementById("summary-te-quedaron-label");
  if (elQuedaron) {
    animateValue(elQuedaron, 0, Math.max(0, teQuedaron), 450, "$");
  }
  if (elQuedaronLabel) {
    elQuedaronLabel.textContent = hasTransactions ? "Te quedaron esta semana" : "Registra tu primera venta";
  }
}

// Indicadores de passos com as 3 bolinhas de progresso
function enhanceStepIndicators() {
  document.querySelectorAll(".step-indicator").forEach(el => {
    const text = el.textContent || "";
    const match = text.match(/Paso\s+(\d+)\s+de\s+(\d+)/i);
    if (match && !el.querySelector(".step-dots-row")) {
      const current = parseInt(match[1], 10);
      const total = parseInt(match[2], 10);
      const dotsWrap = document.createElement("span");
      dotsWrap.className = "step-dots-row";
      dotsWrap.setAttribute("aria-hidden", "true");
      for (let i = 1; i <= total; i++) {
        const dot = document.createElement("span");
        dot.className = `step-dot ${i === current ? "active" : (i < current ? "done" : "")}`;
        dotsWrap.appendChild(dot);
      }
      el.prepend(dotsWrap);
    }
  });
}

// Feedback háptico muy sutil al tocar botones y cartões
function initHapticFeedback() {
  const targets = document.querySelectorAll(".menu-tile, .bottom-nav-fab, .summary-mini-card, .btn-primary, .btn-secondary");
  targets.forEach(t => {
    t.addEventListener("click", () => {
      if ("vibrate" in navigator && typeof navigator.vibrate === "function") {
        try { navigator.vibrate(10); } catch (e) {}
      }
    });
  });
}

// 7. Barra de navegação inferior e folha Más
function updateBottomNavState(screenId) {
  const items = document.querySelectorAll(".bottom-nav-item");
  items.forEach(it => it.classList.remove("active"));

  if (screenId === "screen-home") {
    document.getElementById("nav-btn-home")?.classList.add("active");
  } else if (screenId === "screen-agenda" || screenId === "screen-pedido-form") {
    document.getElementById("nav-btn-agenda")?.classList.add("active");
  } else if (screenId === "screen-calculadora") {
    document.getElementById("nav-btn-calc")?.classList.add("active");
  } else if (screenId === "screen-caja") {
    document.getElementById("nav-btn-caja")?.classList.add("active");
  } else {
    document.getElementById("nav-btn-more")?.classList.add("active");
  }
}

function initBottomNavigation() {
  const btnHome = document.getElementById("nav-btn-home");
  if (btnHome) {
    btnHome.addEventListener("click", () => {
      checkUrgentAlerts();
      navigateTo("screen-home");
    });
  }

  const btnAgenda = document.getElementById("nav-btn-agenda");
  if (btnAgenda) {
    btnAgenda.addEventListener("click", () => {
      initAgenda();
      navigateTo("screen-agenda");
    });
  }

  const btnNewOrder = document.getElementById("nav-btn-new-order");
  if (btnNewOrder) {
    btnNewOrder.addEventListener("click", () => {
      openNuevoPedidoForm();
    });
  }

  const btnCalc = document.getElementById("nav-btn-calc");
  if (btnCalc) {
    btnCalc.addEventListener("click", () => {
      initCalculadora();
      navigateTo("screen-calculadora");
    });
  }

  const btnCaja = document.getElementById("nav-btn-caja");
  if (btnCaja) {
    btnCaja.addEventListener("click", () => {
      initCaja();
      navigateTo("screen-caja");
    });
  }

  // Botón "Más" y Bottom Sheet
  const btnMore = document.getElementById("nav-btn-more");
  const sheet = document.getElementById("sheet-more-tools");
  const sheetBackdrop = document.getElementById("sheet-more-backdrop");
  const sheetClose = document.getElementById("sheet-more-close");

  function closeSheet() {
    if (sheet) sheet.classList.remove("active");
  }

  function openSheet() {
    if (sheet) sheet.classList.add("active");
  }

  if (btnMore) {
    btnMore.addEventListener("click", openSheet);
  }
  if (sheetBackdrop) {
    sheetBackdrop.addEventListener("click", closeSheet);
  }
  if (sheetClose) {
    sheetClose.addEventListener("click", closeSheet);
  }

  // Botones dentro de la folha Más
  document.querySelectorAll(".sheet-tile-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      closeSheet();
      if (!target) return;

      if (target === "screen-fiesta") {
        initFiesta();
        navigateTo("screen-fiesta");
      } else if (target === "screen-menu-etiquetas") {
        initMenuEtiquetas();
        navigateTo("screen-menu-etiquetas");
      } else if (target === "screen-conversor") {
        initConversor();
        navigateTo("screen-conversor");
      } else if (target === "screen-fechas") {
        initFechas();
        navigateTo("screen-fechas");
      } else if (target === "screen-cuanto-dura") {
        initShelfLife();
        navigateTo("screen-cuanto-dura");
      } else if (target === "screen-diagnostico-list") {
        navigateTo("screen-diagnostico-list");
      } else if (target === "screen-mensajes-list") {
        navigateTo("screen-mensajes-list");
      } else if (target === "screen-mis-numeros") {
        initMisNumeros();
        navigateTo("screen-mis-numeros");
      } else if (target === "screen-saved") {
        renderSavedCalculations();
        navigateTo("screen-saved");
      } else if (target === "screen-mis-precios") {
        renderIngredientPrices();
        navigateTo("screen-mis-precios");
      } else if (target === "screen-apoya") {
        navigateTo("screen-apoya");
      } else {
        navigateTo(target);
      }
    });
  });

  // Eventos de los 3 mini-cartões del Resumen del Día
  const cardHoy = document.getElementById("summary-card-hoy");
  if (cardHoy) {
    cardHoy.addEventListener("click", () => {
      initAgenda();
      switchAgendaTab("hoy");
      navigateTo("screen-agenda");
    });
  }

  const cardCobrar = document.getElementById("summary-card-cobrar");
  if (cardCobrar) {
    cardCobrar.addEventListener("click", () => {
      initAgenda();
      switchAgendaTab("semana");
      navigateTo("screen-agenda");
    });
  }

  const cardQuedaron = document.getElementById("summary-card-quedaron");
  if (cardQuedaron) {
    cardQuedaron.addEventListener("click", () => {
      initCaja();
      switchCajaPeriod("semana");
      navigateTo("screen-caja");
    });
  }
}

// Metadatos de herramientas para reanudar ("Seguir donde te quedaste")
const TOOLS_METADATA = {
  "screen-calculadora": { name: "Calculadora de Precio Justo", init: () => { if (typeof initCalculadora === "function") initCalculadora(); } },
  "screen-fiesta": { name: "Calculadora de Fiesta", init: () => { if (typeof initFiesta === "function") initFiesta(); } },
  "screen-mensajes-list": { name: "Mensajes Listos", init: () => {} },
  "screen-menu-etiquetas": { name: "Tu Menú y Tus Etiquetas", init: () => { if (typeof initMenuEtiquetas === "function") initMenuEtiquetas(); } },
  "screen-fechas": { name: "Fechas que Venden", init: () => { if (typeof initFechas === "function") initFechas(); } },
  "screen-agenda": { name: "Agenda de Pedidos", init: () => { if (typeof initAgenda === "function") initAgenda(); } },
  "screen-caja": { name: "Mi Caja", init: () => { if (typeof initCaja === "function") initCaja(); } },
  "screen-diagnostico-list": { name: "¿Qué le pasó a tu pastel?", init: () => {} },
  "screen-conversor": { name: "Conversor y Sustituciones", init: () => { if (typeof initConversor === "function") initConversor(); } },
  "screen-cuanto-dura": { name: "¿Cuánto dura?", init: () => { if (typeof initCuantoDura === "function") initCuantoDura(); else if (typeof initShelfLife === "function") initShelfLife(); } },
  "screen-mis-numeros": { name: "Mis números", init: () => { if (typeof initMisNumeros === "function") initMisNumeros(); if (typeof showMisNumerosStep === "function") showMisNumerosStep(1); } },
  "screen-mis-precios": { name: "Mis precios de ingredientes", init: () => { if (typeof renderMisPreciosScreen === "function") renderMisPreciosScreen(); else if (typeof renderIngredientPrices === "function") renderIngredientPrices(); } },
  "screen-saved": { name: "Mis cálculos guardados", init: () => { if (typeof renderSavedCalculationsScreen === "function") renderSavedCalculationsScreen(); else if (typeof renderSavedCalculations === "function") renderSavedCalculations(); } },
  "screen-ayuda": { name: "¿Cómo se usa?", init: () => {} }
};

function updateResumeBar() {
  const bar = document.getElementById("home-resume-bar");
  const textEl = document.getElementById("home-resume-text");
  if (!bar || !textEl) return;
  const lastToolId = localStorage.getItem("mi_cuaderno_last_tool");
  if (lastToolId && TOOLS_METADATA[lastToolId]) {
    const tool = TOOLS_METADATA[lastToolId];
    textEl.innerHTML = `Seguir en: <strong>${tool.name}</strong>`;
    bar.dataset.target = lastToolId;
    bar.style.display = "flex";
  } else {
    bar.style.display = "none";
  }
}

// Navegación entre pantallas
function navigateTo(screenId) {
  const current = document.querySelector(".screen-view.active");
  const target = document.getElementById(screenId);
  if (!target) return;

  if (current) {
    current.classList.remove("active");
  }

  appState.previousScreen = appState.currentScreen;
  appState.currentScreen = screenId;
  target.classList.add("active");

  // Registrar última herramienta usada (excepto la propia pantalla home)
  if (TOOLS_METADATA[screenId]) {
    try {
      localStorage.setItem("mi_cuaderno_last_tool", screenId);
    } catch (e) {
      console.warn("No se pudo guardar la última herramienta:", e);
    }
  }

  // Mostrar / ocultar botones de navegación y ayuda en el header
  const backBtn = document.getElementById("header-back-btn");
  if (backBtn) {
    backBtn.style.display = screenId === "screen-home" ? "none" : "inline-flex";
  }
  const helpBtn = document.getElementById("header-help-btn");
  if (helpBtn) {
    helpBtn.style.display = screenId === "screen-home" ? "inline-flex" : "none";
  }
  const toolHelpBtn = document.getElementById("header-tool-help-btn");
  if (toolHelpBtn) {
    toolHelpBtn.style.display = (screenId !== "screen-home" && screenId !== "screen-ayuda") ? "inline-flex" : "none";
  }

  // Actualizar barra de navegación inferior
  if (typeof updateBottomNavState === "function") {
    updateBottomNavState(screenId);
  }

  // Si volvemos al inicio, actualizar saudação, resumen del día y barra de reanudación
  if (screenId === "screen-home") {
    if (typeof updateGreeting === "function") updateGreeting();
    if (typeof renderHomeDaySummary === "function") renderHomeDaySummary();
    updateResumeBar();
  }

  // Re-aplicar bolinhas de progreso si la pantalla tiene formularios
  if (typeof enhanceStepIndicators === "function") {
    enhanceStepIndicators();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// ⚙️ MIS NÚMEROS (CONFIGURACIÓN)
// ==========================================

function initMisNumeros() {
  document.getElementById("cfg-sueldo").value = appState.config.sueldoMensual;
  document.getElementById("cfg-gastos").value = appState.config.gastosMes;
  document.getElementById("cfg-gas-hora").value = appState.config.gasPorHora;

  document.getElementById("cfg-ganancia").value = appState.config.gananciaNegocio;
  document.getElementById("cfg-terminal").checked = appState.config.cobraTerminal;
  document.getElementById("cfg-impuestos").checked = appState.config.pagaImpuestos;
}

function showMisNumerosStep(step) {
  const step1 = document.getElementById("numeros-step-1");
  const step2 = document.getElementById("numeros-step-2");
  if (step === 1) {
    step1.style.display = "flex";
    step2.style.display = "none";
  } else {
    step1.style.display = "none";
    step2.style.display = "flex";
  }
}

function saveMisNumeros() {
  appState.config.sueldoMensual = parseFloat(document.getElementById("cfg-sueldo").value) || 12000;
  appState.config.gastosMes = parseFloat(document.getElementById("cfg-gastos").value) || 2160;
  appState.config.gasPorHora = parseFloat(document.getElementById("cfg-gas-hora").value) || 8;

  appState.config.gananciaNegocio = parseFloat(document.getElementById("cfg-ganancia").value) || 15;
  appState.config.cobraTerminal = document.getElementById("cfg-terminal").checked;
  appState.config.pagaImpuestos = document.getElementById("cfg-impuestos").checked;

  saveConfigToStorage();
  showToast("¡Tus números se guardaron! 💛");
  navigateTo("screen-home");
}

// ==========================================
// HERRAMIENTA 1: CALCULADORA DE PRECIO JUSTO
// ==========================================

function initCalculadora() {
  selectRecipe("chocolate");
  document.getElementById("calc-rebanadas").value = appState.calc.rebanadas;
  document.getElementById("calc-horas").value = appState.calc.horasTrabajo;
  document.getElementById("calc-minutos-horno").value = appState.calc.minutosHorno;
  document.getElementById("calc-empaque").value = appState.calc.costoEmpaque;
  showCalcStep(1);
}

function selectRecipe(key) {
  appState.calc.recipeKey = key;
  const recipe = RECIPES_DATA[key];
  appState.calc.recipeName = recipe.name;

  // Marcar chip activo
  document.querySelectorAll(".recipe-chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.recipe === key);
  });

  // Clonar ingredientes para manipular
  appState.calc.ingredients = recipe.ingredients.map(ing => ({ ...ing }));
  renderIngredientsList();
}

function renderIngredientsList() {
  const container = document.getElementById("ingredients-list-container");
  if (!container) return;

  container.innerHTML = "";
  let totalCost = 0;

  appState.calc.ingredients.forEach((item, index) => {
    const priceData = appState.ingredientPrices[item.id] || { pkgPrice: 50, pkgQty: 1000, unit: item.unit };
    const cost = item.checked ? (priceData.pkgPrice / priceData.pkgQty) * (item.qty || 0) : 0;
    if (item.checked) totalCost += cost;

    const row = document.createElement("div");
    row.className = "ingredient-item";
    row.innerHTML = `
      <div class="ingredient-checkbox-wrap">
        <input type="checkbox" class="ingredient-checkbox" id="ing-check-${index}" ${item.checked ? "checked" : ""}>
        <div class="ingredient-info">
          <label for="ing-check-${index}" class="ingredient-name">${item.name}</label>
          <div class="ingredient-qty-edit">
            <input type="number" class="ingredient-qty-input" value="${item.qty}" min="1" step="any" data-index="${index}">
            <span class="ingredient-unit">${item.unit}</span>
          </div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="ingredient-cost-preview">${formatCurrency(cost)}</span>
        <button type="button" class="ingredient-remove-btn" title="Quitar ingrediente" data-remove="${index}">✕</button>
      </div>
    `;

    // Eventos
    const checkbox = row.querySelector(".ingredient-checkbox");
    checkbox.addEventListener("change", (e) => {
      appState.calc.ingredients[index].checked = e.target.checked;
      renderIngredientsList();
    });

    const qtyInput = row.querySelector(".ingredient-qty-input");
    qtyInput.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value) || 0;
      appState.calc.ingredients[index].qty = val;
      renderIngredientsList();
    });

    const removeBtn = row.querySelector(".ingredient-remove-btn");
    removeBtn.addEventListener("click", () => {
      appState.calc.ingredients.splice(index, 1);
      renderIngredientsList();
    });

    container.appendChild(row);
  });

  const totalEl = document.getElementById("ingredients-total-val");
  if (totalEl) totalEl.textContent = formatCurrency(totalCost);
}

function showCalcStep(step) {
  document.getElementById("calc-step-1").style.display = step === 1 ? "flex" : "none";
  document.getElementById("calc-step-2").style.display = step === 2 ? "flex" : "none";
  document.getElementById("calc-step-3").style.display = step === 3 ? "flex" : "none";
  document.getElementById("calc-step-4").style.display = step === 4 ? "flex" : "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function calculatePricing() {
  // Leer inputs de pasos 2 y 3
  const rebanadas = parseInt(document.getElementById("calc-rebanadas").value) || 12;
  const horasTrabajo = parseFloat(document.getElementById("calc-horas").value) || 1.5;
  const minutosHorno = parseFloat(document.getElementById("calc-minutos-horno").value) || 45;
  const costoEmpaque = parseFloat(document.getElementById("calc-empaque").value) || 25;

  appState.calc.rebanadas = rebanadas;
  appState.calc.horasTrabajo = horasTrabajo;
  appState.calc.minutosHorno = minutosHorno;
  appState.calc.costoEmpaque = costoEmpaque;

  // 1. Costo de ingredientes marcados
  let costoIngredientes = 0;
  appState.calc.ingredients.forEach(item => {
    if (item.checked) {
      const priceData = appState.ingredientPrices[item.id] || { pkgPrice: 50, pkgQty: 1000 };
      costoIngredientes += (priceData.pkgPrice / priceData.pkgQty) * (item.qty || 0);
    }
  });

  // 2. Fórmulas internas (sin mostrarlas directamente al usuario)
  // Sueldo por hora = sueldo mensual ÷ 208
  const sueldoPorHora = appState.config.sueldoMensual / 208;
  const tuSueldo = sueldoPorHora * horasTrabajo;

  // Gastos de casa por hora = gastos del mes ÷ 720
  const gastosPorHora = appState.config.gastosMes / 720;
  const gastosCasa = gastosPorHora * horasTrabajo;

  // Gas del horno = (minutos ÷ 60) × gasto de gas por hora
  const gasHorno = (minutosHorno / 60) * appState.config.gasPorHora;

  // COSTO TOTAL
  const costoTotal = costoIngredientes + costoEmpaque + tuSueldo + gastosCasa + gasHorno;

  // Porcentajes
  const comisionTerminal = appState.config.cobraTerminal ? 0.04 : 0;
  const impuestos = appState.config.pagaImpuestos ? 0.02 : 0;
  const porcentajes = comisionTerminal + impuestos;
  const ganancia = (appState.config.gananciaNegocio || 15) / 100;

  // Precios base:
  // Precio mínimo = costo total ÷ (1 − porcentajes)
  let rawMinimo = costoTotal / (1 - porcentajes);
  // Precio justo = costo total ÷ (1 − (porcentajes + ganancia))
  let rawJusto = costoTotal / (1 - (porcentajes + ganancia));
  // Precio especial sin gluten = costo total ÷ (1 − (porcentajes + ganancia + 0.15))
  let rawEspecial = costoTotal / (1 - (porcentajes + ganancia + 0.15));

  // Regla: Redondear hacia arriba al siguiente múltiplo de $5
  const roundToFive = (val) => Math.ceil(val / 5) * 5;

  const precioMinimo = roundToFive(rawMinimo);
  const precioJusto = roundToFive(rawJusto);
  const precioEspecial = roundToFive(rawEspecial);

  const rebanadaMinimo = precioMinimo / rebanadas;
  const rebanadaJusto = precioJusto / rebanadas;
  const rebanadaEspecial = precioEspecial / rebanadas;

  // Guardar resultado actual
  appState.calc.lastResult = {
    pastel: appState.calc.recipeName,
    rebanadas,
    horasTrabajo,
    minutosHorno,
    costoEmpaque,
    costoIngredientes,
    tuSueldo,
    gastosCasa,
    gasHorno,
    costoTotal,
    precioMinimo,
    precioJusto,
    precioEspecial,
    rebanadaMinimo,
    rebanadaJusto,
    rebanadaEspecial,
    date: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })
  };

  // Renderizar en UI
  renderCalculationResults();
  showCalcStep(4);
}

function renderCalculationResults() {
  const r = appState.calc.lastResult;
  if (!r) return;

  // Tarjeta Precio Mínimo
  animateValue(document.getElementById("res-minimo-total"), 0, r.precioMinimo, 400, "$");
  document.getElementById("res-minimo-rebanada").textContent = `${formatCurrency(r.rebanadaMinimo)} / rebanada`;

  // Tarjeta Precio Justo (El más destacado)
  animateValue(document.getElementById("res-justo-total"), 0, r.precioJusto, 500, "$");
  document.getElementById("res-justo-rebanada").textContent = `${formatCurrency(r.rebanadaJusto)} / rebanada`;

  // Tarjeta Especial Sin Gluten
  animateValue(document.getElementById("res-especial-total"), 0, r.precioEspecial, 550, "$");
  document.getElementById("res-especial-rebanada").textContent = `${formatCurrency(r.rebanadaEspecial)} / rebanada`;

  // Desglose simple
  const breakdownText = `Ingredientes ${formatCurrency(r.costoIngredientes)} · Empaque ${formatCurrency(r.costoEmpaque)} · Tu sueldo ${formatCurrency(r.tuSueldo)} · Luz, agua e internet ${formatCurrency(r.gastosCasa)} · Gas del horno ${formatCurrency(r.gasHorno)}`;
  document.getElementById("breakdown-content").textContent = breakdownText;

  // Preparar texto de objeción "¿Y si me dicen que está caro?"
  const objectionText = `¡Te entiendo! 😊 Mi pastel de ${r.pastel} es sin gluten, hecho a mano y con ingredientes especiales que cuestan más que los normales. Para ${r.rebanadas} personas sale en ${formatCurrency(r.rebanadaJusto)} por rebanada. Lo que te llevas es un pastel que todos pueden comer, sin preocuparse. 💛`;
  document.getElementById("objection-text-content").textContent = objectionText;
}

// Guardar cálculo actual en el cuaderno
function saveCurrentCalculation() {
  const r = appState.calc.lastResult;
  if (!r) return;

  const itemToSave = {
    id: "calc_" + Date.now(),
    name: r.pastel,
    rebanadas: r.rebanadas,
    precioJusto: r.precioJusto,
    rebanadaJusto: r.rebanadaJusto,
    date: r.date
  };

  appState.savedCalculations.unshift(itemToSave);
  saveCalculationsToStorage();
  showToast("¡Guardado en tu cuaderno! 📒");
}

// ==========================================
// HERRAMIENTA 2: MENSAJES LISTOS
// ==========================================

function selectMessageSituation(sitKey) {
  appState.messages.selectedSituationKey = sitKey;
  appState.messages.subStep = 1;
  appState.messages.formData = {};

  const sit = MESSAGES_TEMPLATES[sitKey];
  document.getElementById("messages-step-title").textContent = sit.title;

  renderMessageFormStep();
  navigateTo("screen-mensajes-form");
}

function renderMessageFormStep() {
  const sit = MESSAGES_TEMPLATES[appState.messages.selectedSituationKey];
  const container = document.getElementById("message-fields-container");
  container.innerHTML = "";

  let fieldsToRender = sit.fields;
  if (sit.hasSubSteps) {
    fieldsToRender = appState.messages.subStep === 1 ? sit.step1Fields : sit.step2Fields;
    document.getElementById("message-step-indicator").textContent = `Paso ${appState.messages.subStep} de 2`;
  } else {
    document.getElementById("message-step-indicator").textContent = "Paso 1 de 1";
  }

  // Regla: No más de 3 campos por pantalla, con ejemplos prellenados
  fieldsToRender.forEach(field => {
    const val = appState.messages.formData[field.id] !== undefined ? appState.messages.formData[field.id] : field.example;
    const group = document.createElement("div");
    group.className = "form-group";
    group.innerHTML = `
      <label class="form-label" for="${field.id}">${field.label}</label>
      <div class="form-input-wrap">
        ${field.isNumber ? '<span class="input-prefix">$</span>' : ''}
        <input 
          type="${field.isNumber ? 'number' : (field.isPhone ? 'tel' : 'text')}" 
          id="${field.id}" 
          class="form-input ${field.isNumber ? 'has-prefix' : ''}" 
          value="${val}" 
          placeholder="Ej: ${field.example}">
      </div>
      <span class="form-hint">Puedes tocar y cambiarlo si gustas.</span>
    `;
    container.appendChild(group);
  });

  const nextBtn = document.getElementById("btn-message-form-next");
  if (sit.hasSubSteps && appState.messages.subStep === 1) {
    nextBtn.textContent = "Siguiente →";
  } else {
    nextBtn.textContent = "Ver mensaje listo ✨";
  }
}

function handleMessageFormNext() {
  const sit = MESSAGES_TEMPLATES[appState.messages.selectedSituationKey];
  
  // Guardar campos actuales
  const container = document.getElementById("message-fields-container");
  const inputs = container.querySelectorAll("input");
  inputs.forEach(input => {
    appState.messages.formData[input.id] = input.value.trim();
  });

  if (sit.hasSubSteps && appState.messages.subStep === 1) {
    appState.messages.subStep = 2;
    renderMessageFormStep();
    return;
  }

  // Generar texto final
  const messageText = sit.generate(appState.messages.formData);
  const previewEl = document.getElementById("ready-message-text");
  previewEl.textContent = messageText;

  // Teléfono opcional
  const phone = appState.messages.formData["m_telefono"] || "";
  appState.messages.currentPhone = phone;
  appState.messages.currentText = messageText;

  navigateTo("screen-mensajes-ready");
}

// ==========================================
// HERRAMIENTA 3: ¿QUÉ LE PASÓ A TU PASTEL?
// ==========================================

function selectCakeProblem(problemKey) {
  appState.diagnostic.selectedKey = problemKey;
  const diag = DIAGNOSTICS_DATA[problemKey];
  if (!diag) return;

  // 4 Bloques exactos requeridos
  document.getElementById("diag-problem-name").textContent = `Problema: ${diag.title}`;
  document.getElementById("diag-cause-text").textContent = diag.cause;

  const stepsList = document.getElementById("diag-steps-list");
  stepsList.innerHTML = "";
  diag.steps.forEach((step, idx) => {
    const li = document.createElement("li");
    li.className = "diagnostic-step-item";
    li.innerHTML = `
      <span class="step-number-badge">${idx + 1}</span>
      <span>${step}</span>
    `;
    stepsList.appendChild(li);
  });

  document.getElementById("diag-guide-page").textContent = `📖 Lee más en tu Guía El Pastel que No Se Baja, página ${diag.page}.`;

  // Configurar botón WhatsApp: Preguntarle a una amiga
  // Texto exacto: "Me pasó esto con mi pastel: [síntoma]. Encontré que puede ser porque [causa]. ¡La próxima me sale perfecto! 💪"
  const friendText = `Me pasó esto con mi pastel: ${diag.title}. Encontré que puede ser porque ${diag.cause} ¡La próxima me sale perfecto! 💪`;
  appState.diagnostic.friendText = friendText;

  navigateTo("screen-diagnostico-result");
}

// ==========================================
// PANTALLA: MIS PRECIOS DE INGREDIENTES
// ==========================================

function renderMisPreciosScreen() {
  const container = document.getElementById("mis-precios-items-container");
  if (!container) return;

  container.innerHTML = "";
  Object.values(appState.ingredientPrices).forEach(ing => {
    const box = document.createElement("div");
    box.className = "form-group";
    box.innerHTML = `
      <label class="form-label">${ing.name}</label>
      <div style="display:flex; gap:10px; align-items:center;">
        <div class="form-input-wrap" style="flex:1;">
          <span class="input-prefix">$</span>
          <input type="number" class="form-input has-prefix ing-pkg-price" data-id="${ing.id}" value="${ing.pkgPrice}">
        </div>
        <span style="font-weight:600; color:var(--color-text-muted);">por</span>
        <div class="form-input-wrap" style="flex:1;">
          <input type="number" class="form-input ing-pkg-qty" data-id="${ing.id}" value="${ing.pkgQty}">
          <span class="input-suffix">${ing.unit}</span>
        </div>
      </div>
    `;
    container.appendChild(box);
  });
}

function saveMisPreciosFromScreen() {
  const priceInputs = document.querySelectorAll(".ing-pkg-price");
  const qtyInputs = document.querySelectorAll(".ing-pkg-qty");

  priceInputs.forEach(input => {
    const id = input.dataset.id;
    if (appState.ingredientPrices[id]) {
      appState.ingredientPrices[id].pkgPrice = parseFloat(input.value) || 0;
    }
  });

  qtyInputs.forEach(input => {
    const id = input.dataset.id;
    if (appState.ingredientPrices[id]) {
      appState.ingredientPrices[id].pkgQty = parseFloat(input.value) || 1;
    }
  });

  savePricesToStorage();
  showToast("¡Precios de ingredientes guardados! 💛");
  navigateTo("screen-home");
}

// ==========================================
// PANTALLA: CÁLCULOS GUARDADOS EN CUADERNO
// ==========================================

function renderSavedCalculationsScreen() {
  const container = document.getElementById("saved-calculations-container");
  if (!container) return;

  if (appState.savedCalculations.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 10px; color: var(--color-text-muted);">
        <p style="font-size: 22px; font-family: var(--font-serif); font-style: italic; color: var(--color-primary); margin-bottom: 8px;">
          Tu cuaderno está esperando tu primer pastel
        </p>
        <p>Cuando uses la Calculadora de Precio Justo, toca "Guardar en mi cuaderno" y aquí aparecerán todas tus recetas.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  appState.savedCalculations.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "saved-item-card";
    const shareText = `🎂 ${item.name} · ${item.rebanadas} rebanadas · ${formatCurrency(item.precioJusto)} (rebanada ${formatCurrency(item.rebanadaJusto)})`;

    card.innerHTML = `
      <div class="saved-item-header">
        <span class="saved-item-title">${item.name}</span>
        <span class="saved-item-date">${item.date}</span>
      </div>
      <div class="saved-item-prices">
        <span>${item.rebanadas} rebanadas</span>
        <strong style="color:var(--color-primary); font-size: 20px;">${formatCurrency(item.precioJusto)}</strong>
      </div>
      <div class="saved-item-actions">
        <button class="btn-copy btn-copy-saved" data-text="${encodeURIComponent(shareText)}">📋 Copiar</button>
        <button class="btn-whatsapp btn-wa-saved" data-text="${encodeURIComponent(shareText)}">💬 WhatsApp</button>
        <button class="btn-secondary btn-del-saved" style="color:#B54242;" data-idx="${idx}">🗑️</button>
      </div>
    `;

    card.querySelector(".btn-copy-saved").addEventListener("click", (e) => {
      copyToClipboard(decodeURIComponent(e.currentTarget.dataset.text));
    });

    card.querySelector(".btn-wa-saved").addEventListener("click", (e) => {
      openWhatsApp(decodeURIComponent(e.currentTarget.dataset.text));
    });

    card.querySelector(".btn-del-saved").addEventListener("click", (e) => {
      const delIdx = parseInt(e.currentTarget.dataset.idx);
      appState.savedCalculations.splice(delIdx, 1);
      saveCalculationsToStorage();
      renderSavedCalculationsScreen();
      showToast("Cálculo eliminado 🗑️");
    });

    container.appendChild(card);
  });
}

// ==========================================
// MODAL PARA AGREGAR INGREDIENTE
// ==========================================

function openAddIngredientModal() {
  const select = document.getElementById("modal-ing-select");
  select.innerHTML = '<option value="custom">✏️ Escribir otro ingrediente...</option>';
  
  Object.values(appState.ingredientPrices).forEach(ing => {
    const opt = document.createElement("option");
    opt.value = ing.id;
    opt.textContent = `${ing.name} (${ing.unit})`;
    select.appendChild(opt);
  });

  document.getElementById("modal-custom-name-wrap").style.display = "block";
  document.getElementById("modal-add-ingredient").classList.add("active");
}

function closeAddIngredientModal() {
  document.getElementById("modal-add-ingredient").classList.remove("active");
}

function confirmAddIngredient() {
  const select = document.getElementById("modal-ing-select");
  const selectedVal = select.value;
  const qty = parseFloat(document.getElementById("modal-ing-qty").value) || 50;

  if (selectedVal === "custom") {
    const customName = document.getElementById("modal-ing-custom-name").value.trim() || "Ingrediente nuevo";
    const customUnit = document.getElementById("modal-ing-custom-unit").value.trim() || "g";
    const customPrice = parseFloat(document.getElementById("modal-ing-custom-price").value) || 50;
    const customPkgQty = parseFloat(document.getElementById("modal-ing-custom-pkg-qty").value) || 500;

    const customId = "custom_" + Date.now();
    appState.ingredientPrices[customId] = {
      id: customId,
      name: customName,
      pkgPrice: customPrice,
      pkgQty: customPkgQty,
      unit: customUnit
    };
    savePricesToStorage();

    appState.calc.ingredients.push({
      id: customId,
      name: customName,
      qty: qty,
      unit: customUnit,
      checked: true
    });
  } else {
    const ingData = appState.ingredientPrices[selectedVal];
    appState.calc.ingredients.push({
      id: ingData.id,
      name: ingData.name,
      qty: qty,
      unit: ingData.unit,
      checked: true
    });
  }

  closeAddIngredientModal();
  renderIngredientsList();
  showToast("¡Ingrediente agregado! ✨");
}

// ==========================================
// UTILIDADES DE FECHAS EN ESPAÑOL (MÉXICO)
// ==========================================

const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function formatFriendlyDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const diaSemana = DIAS_SEMANA[d.getDay()];
  const dia = d.getDate();
  const mes = MESES[d.getMonth()];
  return `${diaSemana} ${dia} de ${mes}`;
}

function getDaysDiff(dateStr) {
  if (!dateStr) return 999;
  const parts = dateStr.split("-");
  const target = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

// Alerta en la pantalla de inicio si un pedido está a 2 días y no tiene anticipo
function checkUrgentAlerts() {
  const container = document.getElementById("home-urgent-alerts");
  if (!container) return;
  container.innerHTML = "";

  const urgentOrders = appState.orders.filter(ord => {
    if (ord.status === "entregado") return false;
    if (ord.anticipoPagado) return false;
    const diff = getDaysDiff(ord.fecha);
    return diff >= 0 && diff <= 2;
  });

  urgentOrders.forEach(ord => {
    const diff = getDaysDiff(ord.fecha);
    const whenText = diff === 0 ? "hoy" : (diff === 1 ? "mañana" : "en 2 días");
    const anticipoSugerido = ord.montoAnticipo || Math.round(ord.precioTotal * 0.5);

    const card = document.createElement("div");
    card.className = "urgent-alert-card";
    card.innerHTML = `
      <div class="urgent-alert-header">
        <span>⚠️</span>
        <span>Aviso de anticipo</span>
      </div>
      <p class="urgent-alert-text">
        El pedido de <strong>${ord.nombre}</strong> (${ord.producto}) es ${whenText} y todavía <strong>Falta anticipo</strong>.
      </p>
      <div class="btn-row">
        <button type="button" class="btn-whatsapp btn-wa-urgent-anticipo" data-id="${ord.id}">
          💬 Pedir anticipo por WhatsApp
        </button>
      </div>
    `;

    card.querySelector(".btn-wa-urgent-anticipo").addEventListener("click", () => {
      const fechaTxt = formatFriendlyDate(ord.fecha);
      const msg = `¡Hola, ${ord.nombre}! 😊 Para apartar tu ${ord.producto} del ${fechaTxt}, te pido el anticipo de $${anticipoSugerido}. En cuanto me mandes tu comprobante, queda apartado 💛`;
      openWhatsApp(msg, ord.whatsapp);
    });

    container.appendChild(card);
  });

  // Comprobar si hay recordatorios de fechas comerciales activos para ofrecer hoy
  if (typeof getFechasReminders === "function") {
    const activeReminders = getFechasReminders();
    if (activeReminders && activeReminders.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const currentYear = today.getFullYear();

      activeReminders.forEach(fid => {
        const fItem = FECHAS_DATA.find(f => f.id === fid);
        if (fItem) {
          let eventDate = fItem.getDate(currentYear);
          eventDate.setHours(0, 0, 0, 0);
          let empiezaDate = fItem.getEmpiezaDate(currentYear);
          empiezaDate.setHours(0, 0, 0, 0);

          if (today >= empiezaDate && today <= eventDate) {
            const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
            const reminderCard = document.createElement("div");
            reminderCard.className = "urgent-alert-card";
            reminderCard.style.borderLeftColor = "var(--color-whatsapp)";
            reminderCard.style.background = "#EBF8EE";
            reminderCard.innerHTML = `
              <div class="urgent-alert-header" style="color: #1A7A3E;">
                <span>${fItem.emoji}</span>
                <span>¡Recordatorio: Ofrecer hoy!</span>
              </div>
              <p class="urgent-alert-text" style="color: #155724;">
                Faltan <strong>${diff} días</strong> para <strong>${fItem.shortName}</strong> (${fItem.producto}). ¡Tu mensaje de WhatsApp ya está listo!
              </p>
              <div class="btn-row">
                <button type="button" class="btn-whatsapp btn-wa-f-reminder" style="width: 100%;">
                  💬 Publicar en mi WhatsApp
                </button>
              </div>
            `;
            reminderCard.querySelector(".btn-wa-f-reminder").addEventListener("click", () => {
              openWhatsApp(fItem.mensajeStatus);
            });
            container.appendChild(reminderCard);
          }
        }
      });
    }
  }

  if (typeof updateHomeHighlightDates === "function") {
    updateHomeHighlightDates();
  }
}

// ==========================================
// HERRAMIENTA 4: AGENDA DE PEDIDOS
// ==========================================

function initAgenda() {
  switchAgendaTab("semana");
  renderAgendaWeek();
  renderAgendaHoy();
  renderGroceryList();
}

function switchAgendaTab(tabKey) {
  document.getElementById("tab-agenda-semana").classList.toggle("active", tabKey === "semana");
  document.getElementById("tab-agenda-hoy").classList.toggle("active", tabKey === "hoy");
  document.getElementById("tab-agenda-compras").classList.toggle("active", tabKey === "compras");

  document.getElementById("view-agenda-semana").style.display = tabKey === "semana" ? "block" : "none";
  document.getElementById("view-agenda-hoy").style.display = tabKey === "hoy" ? "block" : "none";
  document.getElementById("view-agenda-compras").style.display = tabKey === "compras" ? "block" : "none";

  if (tabKey === "compras") {
    renderGroceryList();
  }
}

// Vista: Esta semana
function renderAgendaWeek() {
  const container = document.getElementById("agenda-semana-list");
  if (!container) return;

  if (appState.orders.length === 0) {
    container.innerHTML = `
      <div class="agenda-empty-state" style="text-align:center; padding: 44px 16px; color: var(--color-text-muted);">
        <div class="agenda-empty-illustration" aria-hidden="true" style="margin-bottom: 18px; display: inline-block;">
          <svg width="90" height="90" viewBox="0 0 80 80" fill="none" stroke="#6B3E26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="14" y="16" width="52" height="52" rx="10" fill="#FFFBF7" stroke="#6B3E26" stroke-width="2.2"/>
            <path d="M14 28h52" stroke="#6B3E26" stroke-width="2"/>
            <path d="M26 10v10" stroke="#C8742C" stroke-width="2.6"/>
            <path d="M54 10v10" stroke="#C8742C" stroke-width="2.6"/>
            <circle cx="28" cy="40" r="3.5" fill="#E8B4B8" stroke="none"/>
            <circle cx="40" cy="40" r="3.5" fill="#D4AF37" stroke="none"/>
            <circle cx="52" cy="40" r="3.5" fill="#C8742C" stroke="none"/>
            <circle cx="28" cy="54" r="3.5" fill="#98A886" stroke="none"/>
            <circle cx="40" cy="54" r="3.5" fill="#E8B4B8" stroke="none"/>
            <circle cx="52" cy="54" r="3.5" fill="#6B3E26" stroke="none"/>
          </svg>
        </div>
        <p style="font-size: 22px; font-family: var(--font-serif); font-style: italic; color: var(--color-primary-dark); margin-bottom: 8px; font-weight: 700;">
          Tu agenda está limpia
        </p>
        <p style="font-size: 16px; color: var(--color-text-muted); max-width: 280px; margin: 0 auto 20px auto; line-height: 1.4;">
          Aún no tienes pedidos registrados en tu cuaderno.
        </p>
        <button type="button" class="btn-primary" id="btn-agenda-empty-add" style="margin: 0 auto; max-width: 280px;">
          ➕ Agrega tu primer pedido
        </button>
      </div>
    `;
    const btnEmptyAdd = container.querySelector("#btn-agenda-empty-add");
    if (btnEmptyAdd) {
      btnEmptyAdd.addEventListener("click", openNuevoPedidoForm);
    }
    return;
  }

  // Agrupar pedidos por fecha
  const groups = {};
  appState.orders.forEach(ord => {
    if (!groups[ord.fecha]) groups[ord.fecha] = [];
    groups[ord.fecha].push(ord);
  });

  // Ordenar fechas cronológicamente
  const sortedDates = Object.keys(groups).sort();
  container.innerHTML = "";

  sortedDates.forEach(dateStr => {
    const ordersOnDay = groups[dateStr];
    const totalPasteles = ordersOnDay.reduce((acc, o) => acc + (parseInt(o.cantidad) || 1), 0);
    const parts = dateStr.split("-");
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const diaSemana = DIAS_SEMANA[d.getDay()];

    const groupDiv = document.createElement("div");
    groupDiv.className = "orders-day-group";

    // Frase amigable por día
    const dayHeader = document.createElement("h3");
    dayHeader.className = "orders-day-title";
    dayHeader.innerHTML = `📅 El ${diaSemana.toLowerCase()} tienes que hornear ${totalPasteles} ${totalPasteles === 1 ? 'pastel' : 'pasteles'}.`;
    groupDiv.appendChild(dayHeader);

    ordersOnDay.forEach(ord => {
      const card = createOrderCardElement(ord);
      groupDiv.appendChild(card);
    });

    container.appendChild(groupDiv);
  });
}

// Genera el elemento de tarjeta de pedido
function createOrderCardElement(ord) {
  const card = document.createElement("div");
  card.className = "order-card";

  const isDelivered = ord.status === "entregado";
  const hasAnticipo = ord.anticipoPagado;
  const montoAnticipo = ord.montoAnticipo || Math.round(ord.precioTotal * 0.5);
  const pendienteCobrar = ord.precioTotal - (hasAnticipo ? montoAnticipo : 0);

  let badgeHtml = "";
  if (isDelivered) {
    badgeHtml = '<span class="order-badge badge-delivered">✓ Entregado y pagado</span>';
  } else if (hasAnticipo) {
    badgeHtml = '<span class="order-badge badge-paid">✓ Anticipo pagado</span>';
  } else {
    badgeHtml = '<span class="order-badge badge-pending">⚠️ Falta anticipo</span>';
  }

  const isDefaultSample = !isEjemplosUsado() && (ord.id === "ped_1" || ord.id === "ped_2" || ord.id === "ped_3" || ord.id === "ped_4");
  const sampleTag = isDefaultSample ? ' <span class="badge-sample-tag">Ejemplo</span>' : '';

  card.innerHTML = `
    <div class="order-card-header">
      <div>
        <div class="order-customer-name">${ord.nombre}${sampleTag}</div>
        <div class="order-product-name">${ord.cantidad > 1 ? ord.cantidad + 'x ' : ''}${ord.producto}</div>
      </div>
      ${badgeHtml}
    </div>

    <div class="order-info-grid">
      <div class="order-info-item">
        <span class="order-info-label">Entrega</span>
        <span class="order-info-val">${formatFriendlyDate(ord.fecha)} · ${ord.hora || '16:00'}</span>
      </div>
      <div class="order-info-item">
        <span class="order-info-label">Total</span>
        <span class="order-info-val">${formatCurrency(ord.precioTotal)}</span>
      </div>
      <div class="order-info-item">
        <span class="order-info-label">Anticipo</span>
        <span class="order-info-val">${hasAnticipo ? formatCurrency(montoAnticipo) : '$0.00'}</span>
      </div>
      <div class="order-info-item">
        <span class="order-info-label">Por cobrar</span>
        <span class="order-info-val" style="color:${pendienteCobrar > 0 && !isDelivered ? 'var(--color-accent-dark)' : 'var(--color-primary)'}">
          ${isDelivered ? '$0.00' : formatCurrency(pendienteCobrar)}
        </span>
      </div>
    </div>

    <div class="order-actions-stack">
      ${!isDelivered && !hasAnticipo ? `
        <button type="button" class="btn-whatsapp order-quick-msg-btn btn-action-pedir-anticipo" data-id="${ord.id}">
          💬 Pedir anticipo
        </button>
      ` : ''}

      ${!isDelivered ? `
        <button type="button" class="btn-secondary order-quick-msg-btn btn-action-recordar-entrega" data-id="${ord.id}">
          💬 Recordar entrega
        </button>
      ` : ''}

      ${!isDelivered && pendienteCobrar > 0 ? `
        <button type="button" class="btn-secondary order-quick-msg-btn btn-action-cobrar-resto" data-id="${ord.id}">
          💬 Cobrar el resto
        </button>
      ` : ''}

      ${!isDelivered ? `
        <button type="button" class="btn-primary order-quick-msg-btn btn-action-marcar-entregado" data-id="${ord.id}" style="background-color:#25A35A;">
          ✅ Marcar como entregado y pagado
        </button>
      ` : ''}
    </div>

    <div class="order-bottom-tools">
      <button type="button" class="btn-secondary-link btn-edit-order" data-id="${ord.id}" style="padding:6px 10px; font-size:15px; min-height:40px;">
        ✏️ Editar
      </button>
      <button type="button" class="btn-secondary-link btn-del-order" data-id="${ord.id}" style="padding:6px 10px; font-size:15px; min-height:40px; color:#B54242;">
        🗑️ Borrar
      </button>
    </div>
  `;

  // Eventos de botones
  const btnAnticipo = card.querySelector(".btn-action-pedir-anticipo");
  if (btnAnticipo) {
    btnAnticipo.addEventListener("click", () => {
      const msg = `¡Hola, ${ord.nombre}! 😊 Para apartar tu ${ord.producto} del ${formatFriendlyDate(ord.fecha)}, te pido el anticipo de $${montoAnticipo}. En cuanto me mandes tu comprobante, queda apartado 💛`;
      openWhatsApp(msg, ord.whatsapp);
    });
  }

  const btnRecordar = card.querySelector(".btn-action-recordar-entrega");
  if (btnRecordar) {
    btnRecordar.addEventListener("click", () => {
      const msg = `¡Hola, ${ord.nombre}! 😊 Te recuerdo que mañana te entrego tu ${ord.producto} a las ${ord.hora || '16:00'}. ¿Me confirmas la dirección? 🎂`;
      openWhatsApp(msg, ord.whatsapp);
    });
  }

  const btnResto = card.querySelector(".btn-action-cobrar-resto");
  if (btnResto) {
    btnResto.addEventListener("click", () => {
      const msg = `¡Hola, ${ord.nombre}! 😊 Aquí está tu ${ord.producto} 🎂 Te queda pendiente $${pendienteCobrar}. ¡Gracias por tu confianza! 💛`;
      openWhatsApp(msg, ord.whatsapp);
    });
  }

  const btnEntregado = card.querySelector(".btn-action-marcar-entregado");
  if (btnEntregado) {
    btnEntregado.addEventListener("click", () => {
      appState.pendingDeliveredOrder = ord;
      document.getElementById("modal-caja-confirm-amount").textContent = formatCurrency(ord.precioTotal);
      document.getElementById("modal-confirm-caja").classList.add("active");
    });
  }

  card.querySelector(".btn-edit-order").addEventListener("click", () => {
    openPedidoFormForEdit(ord.id);
  });

  card.querySelector(".btn-del-order").addEventListener("click", () => {
    if (confirm(`¿Quieres borrar el pedido de ${ord.nombre}?`)) {
      appState.orders = appState.orders.filter(o => o.id !== ord.id);
      saveOrdersToStorage();
      renderAgendaWeek();
      renderAgendaHoy();
      checkUrgentAlerts();
      showToast("Pedido eliminado 🗑️");
    }
  });

  return card;
}

// Vista: Hoy
function renderAgendaHoy() {
  const container = document.getElementById("agenda-hoy-list");
  if (!container) return;

  const todayOrders = appState.orders.filter(ord => getDaysDiff(ord.fecha) === 0);
  const pendingOrders = todayOrders.filter(ord => ord.status !== "entregado");
  const countPending = pendingOrders.length;
  const teFaltaCobrar = pendingOrders.reduce((acc, o) => {
    const hasAnt = o.anticipoPagado;
    const ant = o.montoAnticipo || Math.round(o.precioTotal * 0.5);
    return acc + (o.precioTotal - (hasAnt ? ant : 0));
  }, 0);

  const bannerSummary = document.getElementById("agenda-hoy-summary");
  if (countPending > 0) {
    bannerSummary.textContent = `Hoy entregas ${countPending} ${countPending === 1 ? 'pedido' : 'pedidos'}. Te falta cobrar ${formatCurrency(teFaltaCobrar)}.`;
  } else if (todayOrders.length > 0) {
    bannerSummary.textContent = `¡Felicidades! Todos tus pedidos de hoy ya fueron entregados y pagados 🎉`;
  } else {
    bannerSummary.textContent = `Hoy no tienes pedidos agendados. Día para hornear con calma o descansar 💛`;
  }

  container.innerHTML = "";
  if (todayOrders.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 30px 10px; color: var(--color-text-muted);">
        <p>No hay entregas para hoy.</p>
      </div>
    `;
    return;
  }

  todayOrders.forEach(ord => {
    const card = createOrderCardElement(ord);
    container.appendChild(card);
  });
}

// Vista: Lista de compras de la semana
function renderGroceryList() {
  const container = document.getElementById("grocery-items-container");
  if (!container) return;

  // Filtrar pedidos activos de esta semana (últimos 2 días a próximos 7 días)
  const activeOrders = appState.orders.filter(ord => {
    const diff = getDaysDiff(ord.fecha);
    return diff >= -1 && diff <= 7 && ord.status !== "entregado";
  });

  if (activeOrders.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 24px 10px; color: var(--color-text-muted);">
        <p style="font-size: 19px; font-weight: 600; color: var(--color-primary); margin-bottom: 6px;">
          ¡No tienes compras pendientes!
        </p>
        <p>Cuando agregues pedidos a tu agenda, aquí verás la lista automática de ingredientes para ir al mercado.</p>
      </div>
    `;
    return;
  }

  // Sumar ingredientes
  const totals = {};
  activeOrders.forEach(ord => {
    const qtyMultiplier = parseInt(ord.cantidad) || 1;
    let recipeKey = null;

    if (ord.producto.includes("Chocolate")) recipeKey = "chocolate";
    else if (ord.producto.includes("Naranja")) recipeKey = "naranja";
    else if (ord.producto.includes("Zanahoria")) recipeKey = "zanahoria";
    else if (ord.producto.includes("Vainilla")) recipeKey = "vainilla";
    else recipeKey = "propia";

    const recipe = RECIPES_DATA[recipeKey] || RECIPES_DATA.propia;
    recipe.ingredients.forEach(ing => {
      const key = `${ing.name}__${ing.unit}`;
      if (!totals[key]) {
        totals[key] = { name: ing.name, unit: ing.unit, qty: 0 };
      }
      totals[key].qty += (ing.qty * qtyMultiplier);
    });
  });

  container.innerHTML = "";
  const groceryLines = [];

  Object.values(totals).forEach((item, idx) => {
    groceryLines.push(`▫️ ${item.name}: ${item.qty} ${item.unit}`);

    const itemRow = document.createElement("div");
    itemRow.className = "grocery-item";
    itemRow.innerHTML = `
      <input type="checkbox" id="g-check-${idx}" class="grocery-checkbox">
      <label for="g-check-${idx}" class="grocery-item-name">${item.name}</label>
      <span class="grocery-item-qty">${item.qty} ${item.unit}</span>
    `;

    itemRow.querySelector(".grocery-checkbox").addEventListener("change", (e) => {
      itemRow.classList.toggle("checked", e.target.checked);
    });

    container.appendChild(itemRow);
  });

  // Guardar texto para copiar o mandar a WhatsApp
  const shareText = `🛒 Lista de compras para mis pasteles de la semana:\n${groceryLines.join("\n")}\n\n¡Todo para entregar a tiempo y con mucho amor! 💛`;
  appState.groceryShareText = shareText;
}

// Formulario de Pedido: Paso a Paso
function openNuevoPedidoForm() {
  appState.agendaForm.step = 1;
  appState.agendaForm.editingId = null;

  document.getElementById("ped-edit-id").value = "";
  document.getElementById("ped-nombre").value = "Laura";
  document.getElementById("ped-whatsapp").value = "55 1234 5678";
  document.getElementById("ped-producto").value = "Pastel de Chocolate";
  document.getElementById("ped-producto-custom-wrap").style.display = "none";
  document.getElementById("ped-cantidad").value = "1";
  document.getElementById("ped-fecha").value = getRelativeDateStr(2);
  document.getElementById("ped-hora").value = "16:00";
  document.getElementById("ped-precio-total").value = "299";
  document.getElementById("ped-switch-anticipo").checked = false;
  document.getElementById("ped-monto-anticipo").value = "150";

  showPedidoFormStep(1);
  navigateTo("screen-pedido-form");
}

function openPedidoFormForEdit(orderId) {
  const ord = appState.orders.find(o => o.id === orderId);
  if (!ord) return;

  appState.agendaForm.step = 1;
  appState.agendaForm.editingId = ord.id;

  document.getElementById("ped-edit-id").value = ord.id;
  document.getElementById("ped-nombre").value = ord.nombre;
  document.getElementById("ped-whatsapp").value = ord.whatsapp;
  
  if (["Pastel de Chocolate", "Pastel de Naranja", "Pastel de Zanahoria", "Pastel de Vainilla"].includes(ord.producto)) {
    document.getElementById("ped-producto").value = ord.producto;
    document.getElementById("ped-producto-custom-wrap").style.display = "none";
  } else {
    document.getElementById("ped-producto").value = "Otro";
    document.getElementById("ped-producto-custom-wrap").style.display = "block";
    document.getElementById("ped-producto-custom").value = ord.producto;
  }

  document.getElementById("ped-cantidad").value = ord.cantidad || 1;
  document.getElementById("ped-fecha").value = ord.fecha;
  document.getElementById("ped-hora").value = ord.hora || "16:00";
  document.getElementById("ped-precio-total").value = ord.precioTotal;
  document.getElementById("ped-switch-anticipo").checked = !!ord.anticipoPagado;
  document.getElementById("ped-monto-anticipo").value = ord.montoAnticipo || Math.round(ord.precioTotal * 0.5);

  showPedidoFormStep(1);
  navigateTo("screen-pedido-form");
}

function showPedidoFormStep(step) {
  appState.agendaForm.step = step;
  document.getElementById("pedido-step-1").style.display = step === 1 ? "flex" : "none";
  document.getElementById("pedido-step-2").style.display = step === 2 ? "flex" : "none";
  document.getElementById("pedido-step-3").style.display = step === 3 ? "flex" : "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function savePedidoFromForm() {
  const editId = document.getElementById("ped-edit-id").value;
  const nombre = document.getElementById("ped-nombre").value.trim() || "Clienta";
  const whatsapp = document.getElementById("ped-whatsapp").value.trim() || "";

  let producto = document.getElementById("ped-producto").value;
  if (producto === "Otro") {
    producto = document.getElementById("ped-producto-custom").value.trim() || "Pastel personalizado";
  }

  const cantidad = parseInt(document.getElementById("ped-cantidad").value) || 1;
  const fecha = document.getElementById("ped-fecha").value || getRelativeDateStr(2);
  const hora = document.getElementById("ped-hora").value || "16:00";
  const precioTotal = parseFloat(document.getElementById("ped-precio-total").value) || 299;
  const anticipoPagado = document.getElementById("ped-switch-anticipo").checked;
  const montoAnticipo = parseFloat(document.getElementById("ped-monto-anticipo").value) || Math.round(precioTotal * 0.5);

  if (editId) {
    const idx = appState.orders.findIndex(o => o.id === editId);
    if (idx !== -1) {
      appState.orders[idx] = {
        ...appState.orders[idx],
        nombre,
        whatsapp,
        producto,
        cantidad,
        fecha,
        hora,
        precioTotal,
        anticipoPagado,
        montoAnticipo
      };
    }
  } else {
    const newOrd = {
      id: "ped_" + Date.now(),
      nombre,
      whatsapp,
      producto,
      cantidad,
      fecha,
      hora,
      precioTotal,
      anticipoPagado,
      montoAnticipo,
      status: "pendiente"
    };
    appState.orders.push(newOrd);
  }

  saveOrdersToStorage();
  checkUrgentAlerts();
  initAgenda();
  triggerCelebration(editId ? "¡Pedido actualizado! 💛" : "¡Bien hecho, pastelera! 💛 ¡Nuevo pedido agendado!");
  navigateTo("screen-agenda");
}

// ==========================================
// HERRAMIENTA 5: MI CAJA
// ==========================================

function initCaja() {
  renderCajaStats();
  renderTxHistory();
}

function switchCajaPeriod(periodKey) {
  appState.cashbook.currentPeriod = periodKey;
  document.getElementById("tab-caja-semana").classList.toggle("active", periodKey === "semana");
  document.getElementById("tab-caja-semana-anterior").classList.toggle("active", periodKey === "semana_anterior");
  document.getElementById("tab-caja-mes").classList.toggle("active", periodKey === "mes");
  renderCajaStats();
}

function filterTransactionsByPeriod(periodKey) {
  const txs = appState.cashbook.transactions || [];
  return txs.filter(tx => {
    if (!tx.date) return true;
    const diff = getDaysDiff(tx.date);
    if (periodKey === "semana") {
      // Últimos 7 días
      return diff <= 0 && diff >= -7;
    } else if (periodKey === "semana_anterior") {
      // Hace entre 8 y 14 días
      return diff < -7 && diff >= -14;
    } else {
      // Mismo mes
      const parts = tx.date.split("-");
      const currentMonth = new Date().getMonth() + 1;
      return parseInt(parts[1]) === currentMonth;
    }
  });
}

function renderCajaStats() {
  const period = appState.cashbook.currentPeriod || "semana";
  const filtered = filterTransactionsByPeriod(period);

  let totalVendi = 0;
  let totalGaste = 0;

  filtered.forEach(tx => {
    if (tx.type === "sale") totalVendi += tx.amount;
    else if (tx.type === "expense") totalGaste += tx.amount;
  });

  const teQuedaron = totalVendi - totalGaste;

  // División del dinero según la Calculadora:
  // Ganancia del negocio (%) configurada en Mis Números (ej: 15%)
  const gananciaPct = (appState.config.gananciaNegocio || 15) / 100;
  const paraNegocio = teQuedaron > 0 ? teQuedaron * gananciaPct : 0;
  const tuSueldoCasa = teQuedaron > 0 ? teQuedaron - paraNegocio : 0;

  document.getElementById("caja-val-vendi").textContent = formatCurrency(totalVendi);
  document.getElementById("caja-val-gaste").textContent = formatCurrency(totalGaste);
  animateValue(document.getElementById("caja-val-quedo"), 0, teQuedaron, 450, "$");

  animateValue(document.getElementById("caja-val-sueldo-casa"), 0, tuSueldoCasa, 450, "$");
  animateValue(document.getElementById("caja-val-negocio"), 0, paraNegocio, 450, "$");

  // Meta y Barra de Progreso
  renderGoalProgress();
}

function renderGoalProgress() {
  const goal = appState.cashbook.goal || { name: "Pagar el gas 🔥", amount: 1500 };
  document.getElementById("goal-display-title").textContent = `🎯 ${goal.name}`;

  // Calcular acumulado histórico o del mes para el negocio
  let acumuladoNegocio = 0;
  const allTxs = appState.cashbook.transactions || [];
  let totalSales = 0;
  let totalExpenses = 0;
  allTxs.forEach(tx => {
    if (tx.type === "sale") totalSales += tx.amount;
    else if (tx.type === "expense") totalExpenses += tx.amount;
  });
  const balanceTotal = totalSales - totalExpenses;
  const gananciaPct = (appState.config.gananciaNegocio || 15) / 100;
  if (balanceTotal > 0) {
    acumuladoNegocio = balanceTotal * gananciaPct;
  }

  const pct = Math.min(100, Math.round((acumuladoNegocio / goal.amount) * 100));
  const bar = document.getElementById("goal-progress-bar");
  bar.style.width = `${pct}%`;

  document.getElementById("goal-progress-numbers").textContent = `${formatCurrency(acumuladoNegocio)} de ${formatCurrency(goal.amount)}`;
  document.getElementById("goal-progress-pct").textContent = `${pct}%`;

  const achievedBox = document.getElementById("goal-achieved-container");
  if (pct >= 100) {
    achievedBox.style.display = "block";
    document.getElementById("goal-achieved-msg").textContent = `¡Lo lograste! 🎉 Tu ${goal.name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').trim()} la pagó tu negocio.`;
    appState.goalShareText = `¡Lo logré! 🎉 Mi ${goal.name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '').trim()} la pagó mi negocio de pasteles 💛`;
    if (!appState.goalCelebrated) {
      appState.goalCelebrated = true;
      triggerCelebration("¡Felicidades, pastelera! 💛 ¡Alcanzaste tu meta!");
    }
  } else {
    achievedBox.style.display = "none";
    appState.goalCelebrated = false;
  }
}

function renderTxHistory() {
  const container = document.getElementById("tx-history-list");
  if (!container) return;

  const txs = appState.cashbook.transactions || [];
  if (txs.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px 16px; text-align: center; color: var(--color-text-muted); background: #FAF5F0; border-radius: 12px; border: 1px dashed var(--color-border); margin-top: 8px;">
        <p style="font-size: 16px; margin: 0; line-height: 1.45; color: var(--color-primary-dark); font-weight: 500;">
          Aquí verás cuánto te quedó cada semana. Empieza tocando "Vendí".
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  txs.slice().reverse().forEach((tx, idx) => {
    const isSale = tx.type === "sale";
    const isDefaultTx = !isEjemplosUsado() && (tx.id === "tx_1" || tx.id === "tx_2" || tx.id === "tx_3");
    const sampleTag = isDefaultTx ? ' <span class="badge-sample-tag">Ejemplo</span>' : '';

    const item = document.createElement("div");
    item.className = "tx-item";
    item.innerHTML = `
      <div class="tx-info">
        <span class="tx-concept">${isSale ? '➕' : '➖'} ${tx.concept}${sampleTag}</span>
        <span class="tx-date">${formatFriendlyDate(tx.date)}</span>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <span class="tx-amount ${isSale ? 'sale' : 'expense'}">${isSale ? '+' : '-'}${formatCurrency(tx.amount)}</span>
        <button type="button" class="btn-del-tx" data-id="${tx.id}" style="background:none; border:none; color:#B54242; cursor:pointer; font-size:16px;">✕</button>
      </div>
    `;

    item.querySelector(".btn-del-tx").addEventListener("click", () => {
      appState.cashbook.transactions = appState.cashbook.transactions.filter(t => t.id !== tx.id);
      saveCashbookToStorage();
      renderCajaStats();
      renderTxHistory();
      showToast("Movimiento eliminado 🗑️");
    });

    container.appendChild(item);
  });
}

// Modal de Venta / Gasto
function openCajaMovModal(type) {
  const modal = document.getElementById("modal-caja-movimiento");
  modal.dataset.type = type;

  if (type === "sale") {
    document.getElementById("modal-caja-title").textContent = "➕ Registrar venta";
    document.getElementById("caja-vendi-wrap").style.display = "block";
    document.getElementById("caja-gaste-wrap").style.display = "none";
    document.getElementById("caja-input-monto").value = "350";
    document.getElementById("caja-input-concepto-vendi").value = "Pastel de Chocolate";
  } else {
    document.getElementById("modal-caja-title").textContent = "➖ Registrar gasto";
    document.getElementById("caja-vendi-wrap").style.display = "none";
    document.getElementById("caja-gaste-wrap").style.display = "block";
    document.getElementById("caja-input-monto").value = "120";
    document.getElementById("caja-select-gasto").value = "Ingredientes";
  }

  modal.classList.add("active");
}

function saveCajaMovModal() {
  const modal = document.getElementById("modal-caja-movimiento");
  const type = modal.dataset.type || "sale";
  const amount = parseFloat(document.getElementById("caja-input-monto").value) || 0;

  if (amount <= 0) {
    showToast("Escribe un monto mayor a cero 💵");
    return;
  }

  let concept = "";
  if (type === "sale") {
    concept = document.getElementById("caja-input-concepto-vendi").value.trim() || "Venta de pastel";
  } else {
    concept = document.getElementById("caja-select-gasto").value;
  }

  const newTx = {
    id: "tx_" + Date.now(),
    type,
    amount,
    concept,
    date: getRelativeDateStr(0)
  };

  appState.cashbook.transactions.push(newTx);
  saveCashbookToStorage();
  modal.classList.remove("active");
  renderCajaStats();
  renderTxHistory();
  showToast(type === "sale" ? "¡Venta anotada! 💰" : "Gasto registrado 🧾");
}

// ==========================================
// RESPALDO DE DATOS (EXPORTE E IMPORTE)
// ==========================================

function exportNotebookBackup() {
  const backupData = {
    appName: "Mi Cuaderno de Pastelera",
    version: "2.0",
    exportDate: new Date().toISOString(),
    config: appState.config,
    ingredientPrices: appState.ingredientPrices,
    savedCalculations: appState.savedCalculations,
    orders: appState.orders,
    cashbook: appState.cashbook
  };

  const jsonString = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const dateTag = new Date().toISOString().split("T")[0];
  const a = document.createElement("a");
  a.href = url;
  a.download = `mi_cuaderno_respaldo_${dateTag}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("¡Respaldo descargado en tu celular! 💾");
}

function importNotebookBackup(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.config) appState.config = data.config;
      if (data.ingredientPrices) appState.ingredientPrices = data.ingredientPrices;
      if (data.savedCalculations) appState.savedCalculations = data.savedCalculations;
      if (data.orders) appState.orders = data.orders;
      if (data.cashbook) appState.cashbook = data.cashbook;

      saveConfigToStorage();
      savePricesToStorage();
      saveCalculationsToStorage();
      saveOrdersToStorage();
      saveCashbookToStorage();

      checkUrgentAlerts();
      initMisNumeros();
      showToast("¡Cuaderno recuperado con éxito! 💛");
      navigateTo("screen-home");
    } catch (err) {
      alert("El archivo no es un respaldo válido de Mi Cuaderno.");
    }
  };
  reader.readAsText(file);
}

// ==========================================
// HERRAMIENTA 6: CALCULADORA DE FIESTA
// ==========================================

function getDefaultFiestaDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getTodayDateStr() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDateSpanish(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  return `${days[d.getDay()]} ${d.getDate()} de ${months[d.getMonth()]}`;
}

function addDaysToDateStr(dateStr, daysToAdd) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  d.setDate(d.getDate() + daysToAdd);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCakePansCombination(neededSlices) {
  if (neededSlices <= 0) return [];
  if (neededSlices <= 6) return [{ size: 15, count: 1, slices: 6 }];
  if (neededSlices <= 10) return [{ size: 20, count: 1, slices: 10 }];
  if (neededSlices <= 12) return [{ size: 24, count: 1, slices: 12 }];
  if (neededSlices <= 18) return [{ size: 28, count: 1, slices: 18 }];
  if (neededSlices === 20) return [{ size: 20, count: 2, slices: 10 }];
  if (neededSlices === 30) return [
    { size: 28, count: 1, slices: 18 },
    { size: 24, count: 1, slices: 12 }
  ];

  const pans = [
    { size: 28, slices: 18 },
    { size: 24, slices: 12 },
    { size: 20, slices: 10 },
    { size: 15, slices: 6 }
  ];

  const minCakes = Math.ceil(neededSlices / 18);
  const maxCakes = Math.ceil(neededSlices / 6);

  for (let k = minCakes; k <= maxCakes; k++) {
    let bestComb = null;
    let minWaste = Infinity;

    function search(panIndex, currentCount, currentSlices, currentComb) {
      if (currentCount === k) {
        if (currentSlices >= neededSlices) {
          const waste = currentSlices - neededSlices;
          if (waste < minWaste) {
            minWaste = waste;
            bestComb = { ...currentComb };
          }
        }
        return;
      }
      if (panIndex >= pans.length) return;

      const pan = pans[panIndex];
      const remainingSlots = k - currentCount;

      for (let count = remainingSlots; count >= 0; count--) {
        currentComb[pan.size] = count;
        search(panIndex + 1, currentCount + count, currentSlices + count * pan.slices, currentComb);
      }
    }

    search(0, 0, 0, {});

    if (bestComb) {
      const result = [];
      [28, 24, 20, 15].forEach(size => {
        if (bestComb[size] > 0) {
          result.push({
            size,
            count: bestComb[size],
            slices: pans.find(p => p.size === size).slices
          });
        }
      });
      return result;
    }
  }

  const count28 = Math.ceil(neededSlices / 18);
  return [{ size: 28, count: count28, slices: 18 }];
}

function formatCakePans(pansList) {
  if (!pansList || pansList.length === 0) return "1 pastel de 15 cm";
  if (pansList.length === 1) {
    const p = pansList[0];
    const word = p.count === 1 ? "pastel" : "pasteles";
    return `${p.count} ${word} de ${p.size} cm`;
  }
  const first = pansList[0];
  const firstWord = first.count === 1 ? "pastel" : "pasteles";
  let str = `${first.count} ${firstWord} de ${first.size} cm`;
  for (let i = 1; i < pansList.length; i++) {
    const p = pansList[i];
    str += ` + ${p.count} de ${p.size} cm`;
  }
  return str;
}

function initFiesta() {
  document.getElementById("fiesta-input-ninos").value = "20";
  document.getElementById("fiesta-input-adultos").value = "0";

  document.getElementById("fiesta-price-pastel").value = "25";
  document.getElementById("fiesta-check-cupcake").checked = true;
  document.getElementById("fiesta-price-cupcake").value = "15";
  document.getElementById("fiesta-check-galletas").checked = true;
  document.getElementById("fiesta-price-galletas").value = "5";
  document.getElementById("fiesta-check-gelatina").checked = true;
  document.getElementById("fiesta-price-gelatina").value = "8";

  document.getElementById("fiesta-input-fecha").value = getDefaultFiestaDate();
  document.getElementById("fiesta-input-mama").value = "Laura";

  showFiestaStep(1);
}

function showFiestaStep(step) {
  const step1 = document.getElementById("fiesta-step-1");
  const step2 = document.getElementById("fiesta-step-2");
  const step3 = document.getElementById("fiesta-step-3");
  const res = document.getElementById("fiesta-result-container");

  step1.style.display = step === 1 ? "flex" : "none";
  step2.style.display = step === 2 ? "flex" : "none";
  step3.style.display = step === 3 ? "flex" : "none";
  res.style.display = step === 4 ? "block" : "none";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function calculateFiesta() {
  const ninos = parseInt(document.getElementById("fiesta-input-ninos").value, 10) || 0;
  const adultos = parseInt(document.getElementById("fiesta-input-adultos").value, 10) || 0;

  if (ninos <= 0 && adultos <= 0) {
    alert("Por favor indica al menos 1 niño o 1 adulto.");
    return;
  }

  const pricePastel = parseFloat(document.getElementById("fiesta-price-pastel").value) || 25;
  const hasCupcake = document.getElementById("fiesta-check-cupcake").checked;
  const priceCupcake = parseFloat(document.getElementById("fiesta-price-cupcake").value) || 15;
  const hasGalletas = document.getElementById("fiesta-check-galletas").checked;
  const priceGalletas = parseFloat(document.getElementById("fiesta-price-galletas").value) || 5;
  const hasGelatina = document.getElementById("fiesta-check-gelatina").checked;
  const priceGelatina = parseFloat(document.getElementById("fiesta-price-gelatina").value) || 8;

  const fechaRaw = document.getElementById("fiesta-input-fecha").value;
  const mama = (document.getElementById("fiesta-input-mama").value || "Laura").trim();

  // Contas
  const rebanadas = ninos + adultos;
  const cupcakes = hasCupcake ? ninos : 0;
  const galletas = hasGalletas ? ninos * 2 : 0;
  const gelatinas = hasGelatina ? ninos : 0;

  const pans = getCakePansCombination(rebanadas);
  const cakeText = formatCakePans(pans);

  // Precio por invitado (niño) = suma de los ítems ligados para un niño
  let precioPorNino = pricePastel;
  if (hasCupcake) precioPorNino += priceCupcake;
  if (hasGalletas) precioPorNino += (priceGalletas * 2);
  if (hasGelatina) precioPorNino += priceGelatina;

  // Total = (precio por niño × niños) + (rebanada × adultos)
  const total = (precioPorNino * ninos) + (pricePastel * adultos);
  const anticipo = Math.round(total * 0.5);

  appState.fiesta = {
    ninos,
    adultos,
    totalInvitados: rebanadas,
    pricePastel,
    hasCupcake,
    cupcakes,
    hasGalletas,
    galletas,
    hasGelatina,
    gelatinas,
    pans,
    cakeText,
    precioPorNino,
    total,
    anticipo,
    fecha: fechaRaw,
    mama
  };

  // Renderizar resumen en pantalla
  document.getElementById("fiesta-res-intro").innerText = `Para ${ninos} niños y ${adultos} adultos necesitas:`;
  document.getElementById("fiesta-res-pastel").innerText = cakeText;

  const liCupcakes = document.getElementById("fiesta-li-cupcakes");
  if (hasCupcake && cupcakes > 0) {
    liCupcakes.style.display = "flex";
    document.getElementById("fiesta-res-cupcakes").innerText = `${cupcakes} cupcakes`;
  } else {
    liCupcakes.style.display = "none";
  }

  const liGalletas = document.getElementById("fiesta-li-galletas");
  if (hasGalletas && galletas > 0) {
    liGalletas.style.display = "flex";
    document.getElementById("fiesta-res-galletas").innerText = `${galletas} galletas`;
  } else {
    liGalletas.style.display = "none";
  }

  const liGelatinas = document.getElementById("fiesta-li-gelatinas");
  if (hasGelatina && gelatinas > 0) {
    liGelatinas.style.display = "flex";
    document.getElementById("fiesta-res-gelatinas").innerText = `${gelatinas} gelatinas`;
  } else {
    liGelatinas.style.display = "none";
  }

  document.getElementById("fiesta-res-por-nino").innerText = `$${precioPorNino.toFixed(0)}`;
  animateValue(document.getElementById("fiesta-res-total"), 0, total, 450, "$");
  animateValue(document.getElementById("fiesta-res-anticipo"), 0, anticipo, 450, "$");

  // Aviso adultos si > 0
  const warning = document.getElementById("fiesta-adultos-warning");
  warning.style.display = adultos > 0 ? "block" : "none";

  // Cotización WhatsApp
  const fechaFmt = formatDateSpanish(fechaRaw) || fechaRaw || "la fiesta";
  const treatsList = [];
  if (hasCupcake && cupcakes > 0) treatsList.push(`🧁 ${cupcakes} cupcakes`);
  if (hasGalletas && galletas > 0) treatsList.push(`🍪 ${galletas} galletas`);
  if (hasGelatina && gelatinas > 0) treatsList.push(`🍮 ${gelatinas} gelatinas`);
  const treatsStr = treatsList.length > 0 ? `\n${treatsList.join(" · ")}` : "";

  const whatsappMessage = `¡Hola, ${mama}! 😊 Te paso tu cotización para la fiesta del ${fechaFmt}:

🎂 Pastel para ${rebanadas} invitados${treatsStr}

💰 Total: ${formatCurrency(total)} ($${precioPorNino.toFixed(0)} por niño)

Para apartar la fecha te pido el 50% de anticipo: ${formatCurrency(anticipo)}. ¿Te lo aparto? 💛`;

  appState.fiesta.whatsappMessage = whatsappMessage;

  showFiestaStep(4);
}

function saveFiestaToAgenda() {
  const f = appState.fiesta;
  if (!f) return;

  const treatsSummary = [];
  if (f.hasCupcake && f.cupcakes > 0) treatsSummary.push(`${f.cupcakes} cupcakes`);
  if (f.hasGalletas && f.galletas > 0) treatsSummary.push(`${f.galletas} galletas`);
  if (f.hasGelatina && f.gelatinas > 0) treatsSummary.push(`${f.gelatinas} gelatinas`);

  const notesText = `Pastel: ${f.cakeText}${treatsSummary.length > 0 ? " · " + treatsSummary.join(" · ") : ""}`;

  const newOrder = {
    id: "ped_" + Date.now(),
    nombre: `${f.mama} (Fiesta)`,
    whatsapp: "5512345678",
    producto: `Paquete Fiesta (${f.ninos} niños${f.adultos > 0 ? ` + ${f.adultos} adultos` : ""})`,
    cantidad: 1,
    fecha: f.fecha || getDefaultFiestaDate(),
    hora: "14:00",
    precioTotal: f.total,
    anticipoPagado: true,
    montoAnticipo: f.anticipo,
    status: "pendiente",
    notas: notesText
  };

  appState.orders.push(newOrder);
  saveOrdersToStorage();
  checkUrgentAlerts();
  initAgenda();
  showToast("¡Pedido de fiesta guardado en tu Agenda! 📅");
  navigateTo("screen-agenda");
}

// ==========================================
// HERRAMIENTA 7: TU MENÚ Y TUS ETIQUETAS
// ==========================================

function initMenuEtiquetas() {
  document.getElementById("menu-input-nombre").value = appState.menu.nombre || "Dulce Sin Gluten";
  document.getElementById("menu-input-whatsapp").value = appState.menu.whatsapp || "55 1234 5678";

  document.getElementById("eti-input-fecha").value = getTodayDateStr();

  renderMenuProductsList();

  populateEtiquetaIngredients(document.getElementById("eti-select-prod").value);

  switchMenuEtiquetasTab("menu");
  showMenuStep(1);
  showEtiquetaStep(1);
}

function switchMenuEtiquetasTab(tab) {
  const btnMenu = document.getElementById("tab-btn-menu");
  const btnEti = document.getElementById("tab-btn-etiquetas");
  const viewMenu = document.getElementById("view-mi-menu");
  const viewEti = document.getElementById("view-mis-etiquetas");

  if (tab === "menu") {
    btnMenu.classList.add("active");
    btnEti.classList.remove("active");
    viewMenu.style.display = "block";
    viewEti.style.display = "none";
  } else {
    btnMenu.classList.remove("active");
    btnEti.classList.add("active");
    viewMenu.style.display = "none";
    viewEti.style.display = "block";
  }
}

function showMenuStep(step) {
  const step1 = document.getElementById("menu-step-1");
  const step2 = document.getElementById("menu-step-2");
  const step3 = document.getElementById("menu-step-3");
  const res = document.getElementById("menu-result-container");

  step1.style.display = step === 1 ? "flex" : "none";
  step2.style.display = step === 2 ? "flex" : "none";
  step3.style.display = step === 3 ? "flex" : "none";
  res.style.display = step === 4 ? "block" : "none";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderMenuProductsList() {
  const list = document.getElementById("menu-products-list");
  const counter = document.getElementById("menu-prod-counter");
  if (!list) return;

  list.innerHTML = "";
  const prods = appState.menu.products || [];
  counter.innerText = `${prods.length} de 8`;

  if (prods.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 18px; color: var(--color-text-muted); font-size: 16px;">
        Aún no has agregado productos. Haz clic en "Usar mis precios de la Calculadora" o escribe uno arriba.
      </div>
    `;
    return;
  }

  prods.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "menu-prod-row-card";
    card.innerHTML = `
      <div class="menu-prod-row-info">
        <span style="font-size: 20px;">🍰</span>
        <div>
          <div class="menu-prod-row-name">${escapeHtml(p.name)}</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="menu-prod-row-price">$${p.price}</span>
        <button type="button" class="menu-prod-delete-btn" data-index="${idx}" title="Eliminar producto" aria-label="Eliminar producto">✕</button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll(".menu-prod-delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      appState.menu.products.splice(idx, 1);
      renderMenuProductsList();
    });
  });
}

function loadMenuProductsFromCalc() {
  const prods = [];

  if (appState.savedCalculations && appState.savedCalculations.length > 0) {
    appState.savedCalculations.forEach(sc => {
      if (prods.length < 8 && !prods.some(p => p.name === sc.recipeName)) {
        prods.push({
          name: sc.recipeName,
          price: Math.round(sc.precioJusto || sc.precioSugerido || 350)
        });
      }
    });
  }

  const defaultItems = [
    { name: "Pastel de Chocolate", price: 350 },
    { name: "Pastel de Naranja", price: 320 },
    { name: "Pastel de Zanahoria", price: 340 },
    { name: "Pastel de Vainilla", price: 310 }
  ];

  defaultItems.forEach(item => {
    if (prods.length < 8 && !prods.some(p => p.name === item.name)) {
      prods.push(item);
    }
  });

  appState.menu.products = prods;
  renderMenuProductsList();
  showToast("¡Precios cargados de tu Calculadora! ✨");
}

function addMenuProduct() {
  const nameInput = document.getElementById("menu-new-prod-name");
  const priceInput = document.getElementById("menu-new-prod-price");
  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value) || 0;

  if (!name) {
    alert("Por favor escribe el nombre del producto.");
    nameInput.focus();
    return;
  }
  if (price <= 0) {
    alert("Por favor escribe un precio válido.");
    priceInput.focus();
    return;
  }
  if (appState.menu.products.length >= 8) {
    alert("Puedes agregar un máximo de 8 productos para que las letras se lean grandes y claras.");
    return;
  }

  appState.menu.products.push({ name, price });
  nameInput.value = "";
  priceInput.value = "";
  renderMenuProductsList();
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawCornerAccents(ctx, x, y, w, h, color) {
  const len = 30;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.moveTo(x + 10, y + 10 + len);
  ctx.lineTo(x + 10, y + 10);
  ctx.lineTo(x + 10 + len, y + 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w - 10 - len, y + 10);
  ctx.lineTo(x + w - 10, y + 10);
  ctx.lineTo(x + w - 10, y + 10 + len);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 10, y + h - 10 - len);
  ctx.lineTo(x + 10, y + h - 10);
  ctx.lineTo(x + 10 + len, y + h - 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w - 10 - len, y + h - 10);
  ctx.lineTo(x + w - 10, y + h - 10);
  ctx.lineTo(x + w - 10, y + h - 10 - len);
  ctx.stroke();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const words = text.split(" ");
  let line = "";
  let linesCount = 0;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[n] + " ";
      y += lineHeight;
      linesCount++;
      if (linesCount >= maxLines - 1) {
        let remaining = words.slice(n).join(" ");
        while (ctx.measureText(remaining + "...").width > maxWidth && remaining.length > 0) {
          remaining = remaining.substring(0, remaining.length - 1);
        }
        ctx.fillText(remaining + "...", x, y);
        return;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

function renderMenuCanvas() {
  const canvas = document.getElementById("canvas-menu");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = 1080;
  const H = 1920;

  const nombreNegocio = (document.getElementById("menu-input-nombre").value || "Dulce Sin Gluten").trim();
  const whatsapp = (document.getElementById("menu-input-whatsapp").value || "55 1234 5678").trim();
  appState.menu.nombre = nombreNegocio;
  appState.menu.whatsapp = whatsapp;

  // Fondo
  if (appState.menu.customBgImg) {
    const img = appState.menu.customBgImg;
    const hRatio = W / img.width;
    const vRatio = H / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (W - img.width * ratio) / 2;
    const centerShiftY = (H - img.height * ratio) / 2;
    ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);

    ctx.fillStyle = "rgba(253, 248, 243, 0.90)";
    ctx.fillRect(0, 0, W, H);
  } else {
    const theme = appState.menu.theme || "beige";
    if (theme === "rosa") {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, "#FFF5F7");
      grad.addColorStop(1, "#FCE4EC");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else if (theme === "chocolate") {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, "#2B1911");
      grad.addColorStop(1, "#180D07");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, "#FAF6EE");
      grad.addColorStop(1, "#EDE2CE");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }
  }

  const isDark = appState.menu.theme === "chocolate" && !appState.menu.customBgImg;
  const borderColor = isDark ? "#D4AF37" : (appState.menu.theme === "rosa" ? "#D88B9E" : "#B88E52");

  // Marco
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, W - 72, H - 72);

  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, W - 96, H - 96);

  drawCornerAccents(ctx, 36, 36, W - 72, H - 72, borderColor);

  // Encabezado
  ctx.textAlign = "center";
  ctx.font = "48px serif";
  ctx.fillText("✨  🎂  ✨", W / 2, 130);

  ctx.font = "bold 64px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = isDark ? "#F8EBD7" : (appState.menu.theme === "rosa" ? "#4A1224" : "#3D271D");
  ctx.fillText(nombreNegocio, W / 2, 215);

  ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = isDark ? "#D4AF37" : (appState.menu.theme === "rosa" ? "#9B3754" : "#A34825");
  ctx.fillText("PASTELERÍA ARTESANAL · 100% SIN GLUTEN", W / 2, 265);

  ctx.beginPath();
  ctx.moveTo(W / 2 - 200, 295);
  ctx.lineTo(W / 2 + 200, 295);
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = borderColor;
  ctx.beginPath();
  ctx.arc(W / 2, 295, 6, 0, Math.PI * 2);
  ctx.fill();

  // Lista de Productos
  const prods = appState.menu.products || [];
  const cardWidth = 920;
  const startX = (W - cardWidth) / 2;
  const startY = 340;
  const availableH = 1240;
  const stepH = availableH / Math.max(prods.length, 6);
  const cardHeight = Math.min(stepH - 18, 120);

  prods.forEach((p, idx) => {
    const cardY = startY + idx * stepH;

    ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(255, 255, 255, 0.9)";
    roundRect(ctx, startX, cardY, cardWidth, cardHeight, 18, true, false);

    ctx.strokeStyle = isDark ? "rgba(212, 175, 55, 0.3)" : "rgba(184, 142, 82, 0.35)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, startX, cardY, cardWidth, cardHeight, 18, false, true);

    ctx.font = "34px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("🧁", startX + 24, cardY + cardHeight / 2 + 12);

    ctx.font = "bold 38px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = isDark ? "#FFFFFF" : "#3D271D";
    ctx.fillText(p.name, startX + 80, cardY + cardHeight / 2 + 13);

    const pillW = 180;
    const pillH = cardHeight - 24;
    const pillX = startX + cardWidth - pillW - 16;
    const pillY = cardY + 12;

    ctx.fillStyle = isDark ? "rgba(212, 175, 55, 0.2)" : (appState.menu.theme === "rosa" ? "#FFF0F4" : "#F0FDF4");
    roundRect(ctx, pillX, pillY, pillW, pillH, 12, true, false);

    ctx.strokeStyle = isDark ? "#D4AF37" : (appState.menu.theme === "rosa" ? "#D88B9E" : "#25A35A");
    ctx.lineWidth = 1.5;
    roundRect(ctx, pillX, pillY, pillW, pillH, 12, false, true);

    ctx.font = "bold 42px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = isDark ? "#F8EBD7" : (appState.menu.theme === "rosa" ? "#9B3754" : "#15803D");
    ctx.textAlign = "center";
    ctx.fillText(`$${p.price}`, pillX + pillW / 2, pillY + pillH / 2 + 14);
  });

  // Pie: Botón WhatsApp
  const waBtnW = 860;
  const waBtnH = 100;
  const waBtnX = (W - waBtnW) / 2;
  const waBtnY = 1630;

  ctx.fillStyle = "#25A35A";
  roundRect(ctx, waBtnX, waBtnY, waBtnW, waBtnH, 50, true, false);

  ctx.font = "bold 38px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText(`📲  Pide por WhatsApp: ${whatsapp}`, W / 2, waBtnY + waBtnH / 2 + 13);

  ctx.font = "bold 26px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = isDark ? "#E5B869" : "#A34825";
  ctx.fillText("50% de anticipo para apartar tu fecha", W / 2, 1785);

  ctx.font = "italic 22px Georgia, serif";
  ctx.fillStyle = isDark ? "rgba(255,255,255,0.7)" : "#7D6C62";
  ctx.fillText("Hecho con amor · Chef Amanda · Recetas Mágicas", W / 2, 1835);
}

function showEtiquetaStep(step) {
  const step1 = document.getElementById("eti-step-1");
  const step2 = document.getElementById("eti-step-2");
  const step3 = document.getElementById("eti-step-3");
  const res = document.getElementById("etiqueta-result-container");

  step1.style.display = step === 1 ? "flex" : "none";
  step2.style.display = step === 2 ? "flex" : "none";
  step3.style.display = step === 3 ? "flex" : "none";
  res.style.display = step === 4 ? "block" : "none";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function populateEtiquetaIngredients(recipeKey) {
  const ta = document.getElementById("eti-textarea-ing");
  if (!ta) return;

  const chkHuevo = document.getElementById("eti-allergen-huevo");
  const chkNuez = document.getElementById("eti-allergen-nuez");
  const chkCacahuate = document.getElementById("eti-allergen-cacahuate");
  const chkAlmendra = document.getElementById("eti-allergen-almendra");
  const chkCoco = document.getElementById("eti-allergen-coco");

  chkHuevo.checked = false;
  chkNuez.checked = false;
  chkCacahuate.checked = false;
  chkAlmendra.checked = false;
  chkCoco.checked = false;

  if (recipeKey === "chocolate") {
    ta.value = "Mezcla de harinas sin gluten (arroz, almidón de maíz, fécula de mandioca), cacao puro en polvo, eritritol, huevos frescos, aceite vegetal, polvo para hornear sin gluten y extracto de vainilla.";
    chkHuevo.checked = true;
  } else if (recipeKey === "naranja") {
    ta.value = "Mezcla de harinas sin gluten (arroz, almidón de maíz, fécula de mandioca), jugo y ralladura natural de naranja, eritritol, huevos frescos, aceite vegetal y polvo para hornear sin gluten.";
    chkHuevo.checked = true;
  } else if (recipeKey === "zanahoria") {
    ta.value = "Mezcla de harinas sin gluten (arroz, almidón de maíz, fécula de mandioca), zanahoria fresca rallada, eritritol, huevos frescos, aceite vegetal, canela en polvo y polvo para hornear sin gluten.";
    chkHuevo.checked = true;
  } else if (recipeKey === "vainilla") {
    ta.value = "Mezcla de harinas sin gluten (arroz, almidón de maíz, fécula de mandioca), leche de almendra, eritritol, huevos frescos, aceite vegetal, extracto puro de vainilla y polvo para hornear sin gluten.";
    chkHuevo.checked = true;
    chkAlmendra.checked = true;
  } else {
    ta.value = "Mezcla de harinas sin gluten, endulzante natural, huevos frescos, materia grasa vegetal, esencia natural y leudante sin gluten.";
    chkHuevo.checked = true;
  }

  document.querySelectorAll(".allergen-pill").forEach(p => {
    const c = p.querySelector("input[type='checkbox']");
    if (c && c.checked) p.classList.add("active");
    else p.classList.remove("active");
  });
}

function renderEtiquetaCanvas() {
  const canvas = document.getElementById("canvas-etiqueta");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = 900;
  const H = 540;

  ctx.fillStyle = "#FCFAF6";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#3D271D";
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, W - 40, H - 40);

  ctx.strokeStyle = "#B88E52";
  ctx.lineWidth = 1;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  const selProd = document.getElementById("eti-select-prod").value;
  let prodName = "Pastel de Chocolate";
  if (selProd === "otro") {
    prodName = (document.getElementById("eti-input-custom-prod").value || "Pastel Artesanal").trim();
  } else {
    const opt = document.getElementById("eti-select-prod").querySelector(`option[value="${selProd}"]`);
    if (opt) prodName = opt.text;
  }

  const negocio = (appState.menu.nombre || "Dulce Sin Gluten").trim();
  const whatsapp = (appState.menu.whatsapp || "55 1234 5678").trim();
  const fechaElabRaw = document.getElementById("eti-input-fecha").value || getTodayDateStr();

  // Cálculo de duración y conservación según la tabla de ¿Cuánto dura?
  let shelfDays = 5;
  let conservacionTexto = "❄️ En refrigeración dura 5 días · Fuera del refri consumir en 2 días";
  const pLow = prodName.toLowerCase();
  if (pLow.includes("galleta") || pLow.includes("polvoron") || pLow.includes("polvorón")) {
    shelfDays = 7;
    conservacionTexto = "📦 Conservar en frasco cerrado · Lugar fresco y seco sin conservadores";
  } else if (pLow.includes("cocada") || pLow.includes("mazapan") || pLow.includes("mazapán")) {
    shelfDays = 5;
    conservacionTexto = "📦 Conservar en frasco cerrado · Lugar fresco y seco sin conservadores";
  } else if (pLow.includes("crema") || pLow.includes("chantilly") || pLow.includes("queso") || pLow.includes("flan") || pLow.includes("pay")) {
    shelfDays = 3;
    conservacionTexto = "❄️ Mantener en refrigeración · Producto artesanal sin conservadores";
  } else {
    shelfDays = 5;
    conservacionTexto = "❄️ En refrigeración dura 5 días · Fuera del refri consumir en 2 días";
  }

  const fechaConsumo = addDaysToDateStr(fechaElabRaw, shelfDays);
  const fechaElabFmt = addDaysToDateStr(fechaElabRaw, 0);

  const ingredientes = (document.getElementById("eti-textarea-ing").value || "").trim();

  const allergens = [];
  if (document.getElementById("eti-allergen-huevo").checked) allergens.push("Huevo");
  if (document.getElementById("eti-allergen-nuez").checked) allergens.push("Nuez");
  if (document.getElementById("eti-allergen-cacahuate").checked) allergens.push("Cacahuate");
  if (document.getElementById("eti-allergen-almendra").checked) allergens.push("Almendra");
  if (document.getElementById("eti-allergen-coco").checked) allergens.push("Coco");

  const careLevel = document.querySelector('input[name="eti-care-level"]:checked')?.value || "100_sin_trigo";

  ctx.textAlign = "center";
  ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#A34825";
  ctx.fillText(`${negocio.toUpperCase()} · PASTELERÍA ARTESANAL`, W / 2, 60);

  ctx.font = "bold 38px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#3D271D";
  ctx.fillText(prodName, W / 2, 105);

  const badgeY = 125;
  const badgeH = 46;
  const badgeW = 820;
  const badgeX = (W - badgeW) / 2;

  if (careLevel === "100_sin_trigo") {
    ctx.fillStyle = "#DCFCE7";
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 8, true, false);
    ctx.strokeStyle = "#16A34A";
    ctx.lineWidth = 1.5;
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 8, false, true);

    ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#15803D";
    ctx.fillText("🟢  COCINA 100% SIN TRIGO (Nunca se usa harina de trigo · Apto celíacos)", W / 2, badgeY + 30);
  } else {
    ctx.fillStyle = "#FEF3C7";
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 8, true, false);
    ctx.strokeStyle = "#D97706";
    ctx.lineWidth = 1.5;
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 8, false, true);

    ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#B45309";
    ctx.fillText("🟡  SIN INGREDIENTES CON GLUTEN (Cocina mixta · Posible contacto cruzado)", W / 2, badgeY + 30);
  }

  ctx.textAlign = "left";
  ctx.font = "bold 17px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#3D271D";
  ctx.fillText("Ingredientes:", 45, 205);

  ctx.font = "16px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#4B382F";
  wrapCanvasText(ctx, ingredientes, 160, 205, 680, 24, 3);

  ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#9A3412";
  const allergenStr = allergens.length > 0 ? allergens.join(", ") : "Ninguno de los frutos secos habituales";
  ctx.fillText(`⚠️  Contiene: ${allergenStr}`, 45, 305);

  const boxY = 330;
  const boxH = 95;
  const boxW = 820;
  const boxX = (W - boxW) / 2;

  ctx.fillStyle = "#FAF5EE";
  roundRect(ctx, boxX, boxY, boxW, boxH, 8, true, false);
  ctx.strokeStyle = "#E2D7C8";
  ctx.lineWidth = 1;
  roundRect(ctx, boxX, boxY, boxW, boxH, 8, false, true);

  ctx.font = "bold 19px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#3D271D";
  ctx.fillText(`📅 Elaborado: ${fechaElabFmt}`, boxX + 24, boxY + 38);

  ctx.fillStyle = "#B45309";
  ctx.fillText(`⏳ Consumir antes de: ${fechaConsumo}`, boxX + 420, boxY + 38);

  ctx.font = "bold 17px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#1E40AF";
  ctx.textAlign = "center";
  ctx.fillText(conservacionTexto, W / 2, boxY + 76);

  ctx.textAlign = "center";
  ctx.font = "bold 17px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#25A35A";
  ctx.fillText(`Pedidos y atención: WhatsApp ${whatsapp}`, W / 2, 470);

  ctx.font = "italic 14px Georgia, serif";
  ctx.fillStyle = "#8C796E";
  ctx.fillText("Elaborado con amor bajo las pautas de Chef Amanda · Recetas Mágicas", W / 2, 500);
}

function saveCanvasImage(canvasId, filename) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("¡Imagen guardada en tu dispositivo! 💾");
  }, "image/png");
}

async function shareCanvasImage(canvasId, title, text) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  try {
    if (navigator.share && canvas.toBlob) {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          openWhatsApp(text);
          return;
        }
        const filename = `${title.toLowerCase().replace(/\s+/g, "_")}.png`;
        const file = new File([blob], filename, { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: title,
              text: text
            });
            showToast("¡Compartido con éxito! 📤");
            return;
          } catch (err) {
            if (err.name !== "AbortError") {
              openWhatsApp(text);
            }
            return;
          }
        }
        try {
          await navigator.share({ title: title, text: text });
          showToast("¡Compartido con éxito! 📤");
        } catch (e) {
          openWhatsApp(text);
        }
      }, "image/png");
    } else {
      openWhatsApp(text);
    }
  } catch (e) {
    openWhatsApp(text);
  }
}

function printMultipleEtiquetas() {
  const canvas = document.getElementById("canvas-etiqueta");
  if (!canvas) return;
  const dataUrl = canvas.toDataURL("image/png");

  const printContainer = document.getElementById("print-sheet-etiquetas");
  if (!printContainer) return;

  printContainer.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const item = document.createElement("div");
    item.className = "print-label-item";
    const img = document.createElement("img");
    img.src = dataUrl;
    img.alt = "Etiqueta imprimible";
    item.appendChild(img);
    printContainer.appendChild(item);
  }

  window.print();
}

// ========================================================
// HERRAMIENTA 8: CONVERSOR Y SUSTITUCIONES
// ========================================================

const INGREDIENT_EQUIVALENCES = {
  harina: {
    name: "Mezcla de harinas o harina de arroz",
    cup: 130,
    tbsp: 8,
    tsp: 3
  },
  azucar: {
    name: "Azúcar estándar o morena",
    cup: 225,
    tbsp: 14,
    tsp: 5
  },
  endulzante: {
    name: "Eritritol o xilitol",
    cup: 200,
    tbsp: 13,
    tsp: 4
  },
  cacao: {
    name: "Chocolate en polvo o cacao",
    cup: 80,
    tbsp: 5,
    tsp: 2
  },
  liquido: {
    name: "Agua o leche",
    cup: 240,
    tbsp: 15,
    tsp: 5
  },
  aceite: {
    name: "Aceite",
    cup: 240,
    tbsp: 15,
    tsp: 5
  },
  coco: {
    name: "Coco rallado",
    cup: 80,
    tbsp: 5,
    tsp: 2
  },
  fecula: {
    name: "Fécula de maíz (maicena)",
    cup: 160,
    tbsp: 10,
    tsp: 3
  },
  polvo: {
    name: "Polvo para hornear",
    cup: 240,
    tbsp: 15,
    tsp: 5
  },
  canela: {
    name: "Canela molida",
    cup: 144,
    tbsp: 9,
    tsp: 3
  },
  huevo: {
    name: "Huevo",
    cup: 200,
    tbsp: 15,
    tsp: 5,
    piece: 50
  }
};

const PRESET_RECIPES_SCALE = {
  "receta-chocolate": {
    name: "Pastel de Chocolate Sin Gluten",
    mold: 24,
    items: [
      { name: "Harina de arroz", qty: 240, unit: "g" },
      { name: "Azúcar o endulzante", qty: 200, unit: "g" },
      { name: "Cacao en polvo", qty: 60, unit: "g" },
      { name: "Huevos", qty: 3, unit: "piezas" },
      { name: "Aceite vegetal", qty: 120, unit: "g" },
      { name: "Leche o agua", qty: 180, unit: "g" },
      { name: "Polvo para hornear", qty: 15, unit: "g" }
    ]
  },
  "receta-vainilla": {
    name: "Pastel de Vainilla y Frutos Rojos",
    mold: 24,
    items: [
      { name: "Harina de arroz", qty: 260, unit: "g" },
      { name: "Azúcar", qty: 200, unit: "g" },
      { name: "Huevos", qty: 3, unit: "piezas" },
      { name: "Aceite vegetal", qty: 110, unit: "g" },
      { name: "Leche", qty: 160, unit: "g" },
      { name: "Polvo para hornear", qty: 15, unit: "g" }
    ]
  },
  "receta-zanahoria": {
    name: "Pastel de Zanahoria con Nuez",
    mold: 24,
    items: [
      { name: "Harina de arroz", qty: 250, unit: "g" },
      { name: "Azúcar mascabado", qty: 180, unit: "g" },
      { name: "Zanahoria rallada", qty: 200, unit: "g" },
      { name: "Huevos", qty: 3, unit: "piezas" },
      { name: "Aceite vegetal", qty: 130, unit: "g" },
      { name: "Nuez picada", qty: 60, unit: "g" },
      { name: "Canela molida", qty: 6, unit: "g" },
      { name: "Polvo para hornear", qty: 15, unit: "g" }
    ]
  },
  "receta-naranja": {
    name: "Panqué de Naranja y Canela",
    mold: 24,
    items: [
      { name: "Harina de arroz", qty: 250, unit: "g" },
      { name: "Azúcar", qty: 180, unit: "g" },
      { name: "Huevos", qty: 3, unit: "piezas" },
      { name: "Jugo de naranja", qty: 140, unit: "g" },
      { name: "Aceite", qty: 110, unit: "g" },
      { name: "Polvo para hornear", qty: 15, unit: "g" }
    ]
  }
};

const MOLD_MULTIPLIERS = {
  "15": 0.4,
  "20": 0.7,
  "24": 1.0,
  "28": 1.4
};

let currentConversorState = {
  ingKey: "harina",
  measure: "1",
  origMold: "24",
  targetMold: "20",
  cakeCount: 1,
  scaledRecipeText: ""
};

function initConversor() {
  switchConversorTab("tazas");
  updateConversionResult();
  recalculateScaledRecipe();
}

function switchConversorTab(tab) {
  const btnTazas = document.getElementById("tab-conv-tazas");
  const btnTamano = document.getElementById("tab-conv-tamano");
  const btnSub = document.getElementById("tab-conv-sustituciones");
  const viewTazas = document.getElementById("view-conv-tazas");
  const viewTamano = document.getElementById("view-conv-tamano");
  const viewSub = document.getElementById("view-conv-sustituciones");

  [btnTazas, btnTamano, btnSub].forEach(b => b && b.classList.remove("active"));
  [viewTazas, viewTamano, viewSub].forEach(v => v && (v.style.display = "none"));

  if (tab === "tazas") {
    btnTazas.classList.add("active");
    viewTazas.style.display = "block";
  } else if (tab === "tamano") {
    btnTamano.classList.add("active");
    viewTamano.style.display = "block";
    recalculateScaledRecipe();
  } else if (tab === "sustituciones") {
    btnSub.classList.add("active");
    viewSub.style.display = "block";
  }
}

function updateConversionResult() {
  const ingKey = document.getElementById("conv-select-ingrediente").value;
  const ing = INGREDIENT_EQUIVALENCES[ingKey] || INGREDIENT_EQUIVALENCES.harina;
  const measure = currentConversorState.measure;

  let grams = 0;
  let measureDesc = "";

  if (measure === "cucharada") {
    grams = ing.tbsp;
    measureDesc = `1 cucharada al ras de ${ing.name} equivale a ${grams} gramos.`;
  } else if (measure === "cucharadita") {
    grams = ing.tsp;
    measureDesc = `1 cucharadita al ras de ${ing.name} equivale a ${grams} gramos.`;
  } else {
    const num = parseFloat(measure) || 1;
    grams = Math.round(ing.cup * num);
    let label = "1 taza";
    if (num === 0.25) label = "¼ de taza";
    else if (num === 0.333) label = "⅓ de taza";
    else if (num === 0.5) label = "½ taza";
    else if (num === 1.5) label = "1 taza y media";
    else if (num === 2) label = "2 tazas";

    if (ingKey === "huevo" && num === 1) {
      measureDesc = `1 taza de huevos equivale a unos 4 huevos medianos (${grams} g). Recuerda: 1 pieza de huevo = 50 g.`;
    } else {
      measureDesc = `${label} al ras de ${ing.name} equivale a ${grams} gramos.`;
    }
  }

  const resultGramsEl = document.getElementById("conv-result-grams");
  const resultExpEl = document.getElementById("conv-result-explanation");
  if (resultGramsEl) resultGramsEl.textContent = grams;
  if (resultExpEl) resultExpEl.textContent = measureDesc;
}

function recalculateScaledRecipe() {
  const recipeSel = document.getElementById("conv-scale-recipe").value;
  const origMold = document.getElementById("conv-scale-orig-mold").value;
  const targetMold = document.getElementById("conv-scale-target-mold").value;
  const cakeCount = currentConversorState.cakeCount || 1;

  const origFactor = MOLD_MULTIPLIERS[origMold] || 1.0;
  const targetFactor = MOLD_MULTIPLIERS[targetMold] || 0.7;
  const scale = (targetFactor / origFactor) * cakeCount;

  // Actualizar hint
  const hintEl = document.getElementById("conv-scale-factor-hint");
  if (hintEl) {
    hintEl.textContent = `Factor de escala: ${scale.toFixed(2)}x (${cakeCount} ${cakeCount === 1 ? 'pastel' : 'pasteles'} de ${targetMold} cm)`;
  }

  const titleEl = document.getElementById("conv-recalc-title");
  const listEl = document.getElementById("conv-recalc-list");
  if (!listEl) return;
  listEl.innerHTML = "";

  let recipeName = "Mi receta";
  let items = [];

  if (recipeSel === "receta-personalizada") {
    recipeName = "Receta personalizada";
    const customText = document.getElementById("conv-custom-recipe-text").value || "";
    const lines = customText.split("\n").filter(l => l.trim().length > 0);
    lines.forEach(line => {
      const match = line.match(/^(\d+(?:\.\d+)?)\s*([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?\s+(.+)$/);
      if (match) {
        items.push({
          qty: parseFloat(match[1]),
          unit: match[2] || "g",
          name: match[3].trim()
        });
      } else {
        items.push({ qty: 100, unit: "g", name: line.trim() });
      }
    });
  } else {
    const preset = PRESET_RECIPES_SCALE[recipeSel] || PRESET_RECIPES_SCALE["receta-chocolate"];
    recipeName = preset.name;
    items = preset.items;
  }

  if (titleEl) {
    titleEl.textContent = `${recipeName} (${cakeCount} de ${targetMold} cm)`;
  }

  let textToCopy = `🎂 Receta adaptada: ${recipeName}\n`;
  textToCopy += `Molde receta: ${origMold} cm ➔ Molde adaptado: ${targetMold} cm\n`;
  textToCopy += `Cantidad: ${cakeCount} ${cakeCount === 1 ? 'pastel' : 'pasteles'} (Factor: ${scale.toFixed(2)}x)\n\n`;

  items.forEach(item => {
    let scaledQty = item.qty * scale;
    let displayQty = "";
    if (item.unit === "piezas" || item.name.toLowerCase().includes("huevo")) {
      const roundedHuevos = Math.max(1, Math.round(scaledQty));
      displayQty = `${roundedHuevos} piezas`;
    } else {
      // Redondear a múltiplos de 5 gramos
      const roundedGrams = Math.max(5, Math.round(scaledQty / 5) * 5);
      displayQty = `${roundedGrams} ${item.unit}`;
    }

    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name}</span><strong>${displayQty}</strong>`;
    listEl.appendChild(li);

    textToCopy += `• ${item.name}: ${displayQty}\n`;
  });

  textToCopy += `\n💡 Tip: Si solo tienes un molde, hornea un pastel tras otro. Agrega el polvo para hornear justo antes de meter cada uno.\n`;
  textToCopy += `- De Mi Cuaderno de Pastelera · Chef Amanda`;

  currentConversorState.scaledRecipeText = textToCopy;
}

// ========================================================
// HERRAMIENTA 9: FECHAS QUE VENDEN
// ========================================================

function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function getFathersDay(year) {
  let count = 0;
  for (let day = 1; day <= 30; day++) {
    const d = new Date(year, 5, day);
    if (d.getDay() === 0) {
      count++;
      if (count === 3) return d;
    }
  }
  return new Date(year, 5, 21);
}

const FECHAS_DATA = [
  {
    id: "reyes",
    nombre: "6 de enero – Día de Reyes",
    shortName: "Día de Reyes",
    emoji: "👑",
    producto: "Rosca de Reyes sin gluten",
    empiezaTexto: "26 de diciembre",
    cierraTexto: "4 de enero",
    precioEjemplo: "$350 - $450",
    tip: "Decora con ate, higos y costra de azúcar glass sin gluten para que luzca tradicional y hermosa.",
    mensajeStatus: "👑 ¡Ya llegó la Rosca de Reyes sin gluten! Para que nadie se quede sin su rebanada este 6 de enero. Aparta la tuya 👇",
    getDate: (y) => new Date(y, 0, 6),
    getEmpiezaDate: (y) => new Date(y - 1, 11, 26),
    getCierraDate: (y) => new Date(y, 0, 4)
  },
  {
    id: "amor",
    nombre: "14 de febrero – Día del Amor y la Amistad",
    shortName: "Día del Amor y la Amistad",
    emoji: "💝",
    producto: "Cajitas de cupcakes",
    empiezaTexto: "25 de enero",
    cierraTexto: "12 de febrero",
    precioEjemplo: "$180 - $260 por cajita",
    tip: "Usa capacillos rojos o rosas y cajitas con ventana transparente amarradas con listón bonito.",
    mensajeStatus: "💝 Regala algo rico que todos puedan comer. Cajitas de amor y amistad sin gluten. Aparta la tuya 👇",
    getDate: (y) => new Date(y, 1, 14),
    getEmpiezaDate: (y) => new Date(y, 0, 25),
    getCierraDate: (y) => new Date(y, 1, 12)
  },
  {
    id: "semana_santa",
    nombre: "Semana Santa (Pascua)",
    shortName: "Semana Santa",
    emoji: "🌿",
    producto: "Pastel de queso y flan",
    empiezaTexto: "2 semanas antes",
    cierraTexto: "Miércoles Santo",
    precioEjemplo: "$320 - $420",
    tip: "Los postres frescos y tradicionales son los reyes de las reuniones familiares de Semana Santa.",
    mensajeStatus: "🌿 ¿Reunión familiar en Semana Santa? Llévate un pastel de queso o un flan que todos puedan disfrutar. Pedidos abiertos 👇",
    getDate: (y) => getEasterDate(y),
    getEmpiezaDate: (y) => new Date(getEasterDate(y).getTime() - 14 * 86400000),
    getCierraDate: (y) => new Date(getEasterDate(y).getTime() - 3 * 86400000)
  },
  {
    id: "nino",
    nombre: "30 de abril – Día del Niño",
    shortName: "Día del Niño",
    emoji: "🎈",
    producto: "Bolsitas y cupcakes",
    empiezaTexto: "10 de abril",
    cierraTexto: "27 de abril",
    precioEjemplo: "$150 - $220 por paquete",
    tip: "Usa chispas de colores sin gluten y personajes divertidos para festejos escolares y en casa.",
    mensajeStatus: "🎈 ¡Que ningún niño se quede sin festejar! Bolsitas y cupcakes sin gluten para el Día del Niño 👇",
    getDate: (y) => new Date(y, 3, 30),
    getEmpiezaDate: (y) => new Date(y, 3, 10),
    getCierraDate: (y) => new Date(y, 3, 27)
  },
  {
    id: "madres",
    nombre: "10 de mayo – Día de las Madres",
    shortName: "Día de las Madres",
    emoji: "🌸",
    producto: "Pasteles y cajas de regalo",
    empiezaTexto: "15 de abril",
    cierraTexto: "7 de mayo",
    precioEjemplo: "$380 - $550",
    tip: "Es la fecha con más demanda del año: pide 50% de anticipo para asegurar insumos a tiempo.",
    mensajeStatus: "🌸 Para la mamá que lo dio todo, un pastel que sí puede comer. Pasteles sin gluten para el 10 de mayo. Quedan pocos lugares 👇",
    getDate: (y) => new Date(y, 4, 10),
    getEmpiezaDate: (y) => new Date(y, 3, 15),
    getCierraDate: (y) => new Date(y, 4, 7)
  },
  {
    id: "padre",
    nombre: "Tercer domingo de junio – Día del Padre",
    shortName: "Día del Padre",
    emoji: "☕",
    producto: "Chocolate, moka y nuez",
    empiezaTexto: "2 semanas antes",
    cierraTexto: "3 días antes",
    precioEjemplo: "$350 - $490",
    tip: "Los sabores profundos a café de olla, chocolate mexicano y nuez tostada se venden solos.",
    mensajeStatus: "☕ Para el papá que no perdona el postre. Pasteles de chocolate mexicano, moka y café de olla sin gluten 👇",
    getDate: (y) => getFathersDay(y),
    getEmpiezaDate: (y) => new Date(getFathersDay(y).getTime() - 14 * 86400000),
    getCierraDate: (y) => new Date(getFathersDay(y).getTime() - 3 * 86400000)
  },
  {
    id: "graduaciones",
    nombre: "Junio y julio – Graduaciones",
    shortName: "Graduaciones",
    emoji: "🎓",
    producto: "Pasteles y cupcakes",
    empiezaTexto: "25 de mayo",
    cierraTexto: "10 de julio",
    precioEjemplo: "$360 - $520",
    tip: "Ofrece toppers de birrete y paquetes de cupcakes para reuniones familiares de graduación.",
    mensajeStatus: "🎓 ¡Festeja el logro de tu graduado! Pasteles y cupcakes sin gluten para graduaciones 👇",
    getDate: (y) => new Date(y, 5, 30),
    getEmpiezaDate: (y) => new Date(y, 4, 25),
    getCierraDate: (y) => new Date(y, 6, 10)
  },
  {
    id: "clases",
    nombre: "Finales de agosto – Regreso a clases",
    shortName: "Regreso a clases",
    emoji: "🎒",
    producto: "Caja del lonche",
    empiezaTexto: "14 de agosto",
    cierraTexto: "25 de agosto",
    precioEjemplo: "$140 - $200",
    tip: "Muffins nutritivos en porciones individuales listos para congelar y mandar en la lonchera escolar.",
    mensajeStatus: "🎒 ¿Qué le pongo de postre en el lonche? Caja de la semana con 5 postres sin gluten 👇",
    getDate: (y) => new Date(y, 7, 28),
    getEmpiezaDate: (y) => new Date(y, 7, 14),
    getCierraDate: (y) => new Date(y, 7, 25)
  },
  {
    id: "patrias",
    nombre: "15 y 16 de septiembre – Fiestas Patrias",
    shortName: "Fiestas Patrias",
    emoji: "🇲🇽",
    producto: "Cupcakes tricolor, cocadas y mazapanes",
    empiezaTexto: "1 de septiembre",
    cierraTexto: "13 de septiembre",
    precioEjemplo: "$180 - $320 por paquete",
    tip: "Los dulces típicos mexicanos sin gluten tienen un margen de ganancia excelente.",
    mensajeStatus: "🇲🇽 ¡Viva México! Postres sin gluten para tu noche mexicana: cupcakes tricolor, cocadas y mazapanes 👇",
    getDate: (y) => new Date(y, 8, 15),
    getEmpiezaDate: (y) => new Date(y, 8, 1),
    getCierraDate: (y) => new Date(y, 8, 13)
  },
  {
    id: "calabaza",
    nombre: "Octubre – Temporada de calabaza",
    shortName: "Temporada de calabaza",
    emoji: "🎃",
    producto: "Calabaza, camote y manzana",
    empiezaTexto: "1 de octubre",
    cierraTexto: "28 de octubre",
    precioEjemplo: "$300 - $420",
    tip: "La canela y el clavo de olor llenan tu cocina de un aroma irresistible para vender por rebanadas.",
    mensajeStatus: "🎃 Llegó el sabor del otoño: pastel de calabaza y de camote con canela, sin gluten. Solo este mes 👇",
    getDate: (y) => new Date(y, 9, 20),
    getEmpiezaDate: (y) => new Date(y, 9, 1),
    getCierraDate: (y) => new Date(y, 9, 28)
  },
  {
    id: "muertos",
    nombre: "1 y 2 de noviembre – Día de Muertos",
    shortName: "Día de Muertos",
    emoji: "🌼",
    producto: "Paquete ofrenda",
    empiezaTexto: "15 de octubre",
    cierraTexto: "30 de octubre",
    precioEjemplo: "$200 - $350",
    tip: "Prepara porciones individuales y empaques tradicionales ideales para colocar en el altar familiar.",
    mensajeStatus: "🌼 Para recordar con cariño a los que ya no están. Cocadas, mazapanes y pastel de camote sin gluten para tu ofrenda 👇",
    getDate: (y) => new Date(y, 10, 1),
    getEmpiezaDate: (y) => new Date(y, 9, 15),
    getCierraDate: (y) => new Date(y, 9, 30)
  },
  {
    id: "navidad",
    nombre: "16 al 31 de diciembre – Posadas y Navidad",
    shortName: "Posadas y Navidad",
    emoji: "🎄",
    producto: "Cajas navideñas",
    empiezaTexto: "20 de noviembre",
    cierraTexto: "20 de diciembre",
    precioEjemplo: "$350 - $600",
    tip: "La temporada de regalos corporativos y familiares: amarra pedidos con anticipo desde noviembre.",
    mensajeStatus: "🎄 Este año, regala algo hecho a mano que todos puedan comer. Cajas navideñas y pasteles sin gluten 👇",
    getDate: (y) => new Date(y, 11, 24),
    getEmpiezaDate: (y) => new Date(y, 10, 20),
    getCierraDate: (y) => new Date(y, 11, 20)
  }
];

let activeModalFechaId = null;

function getNextFechaInfo() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = today.getFullYear();

  let candidate = null;
  let minDiff = Infinity;

  FECHAS_DATA.forEach(item => {
    let eventDate = item.getDate(currentYear);
    eventDate.setHours(0, 0, 0, 0);
    let empiezaDate = item.getEmpiezaDate(currentYear);
    empiezaDate.setHours(0, 0, 0, 0);

    // Si el evento de este año ya pasó, proyectar al siguiente año
    if (today > eventDate) {
      eventDate = item.getDate(currentYear + 1);
      eventDate.setHours(0, 0, 0, 0);
      empiezaDate = item.getEmpiezaDate(currentYear + 1);
      empiezaDate.setHours(0, 0, 0, 0);
    }

    const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays < minDiff) {
      minDiff = diffDays;
      const isOfferingNow = today >= empiezaDate;
      candidate = {
        item,
        eventDate,
        empiezaDate,
        diffDays,
        isOfferingNow
      };
    }
  });

  return candidate;
}

function updateHomeHighlightDates() {
  const info = getNextFechaInfo();
  if (!info) return;

  const emojiEl = document.getElementById("highlight-dates-emoji");
  const badgeEl = document.getElementById("highlight-dates-badge");
  const titleEl = document.getElementById("highlight-dates-title");
  const textEl = document.getElementById("highlight-dates-text");

  if (emojiEl) emojiEl.textContent = info.item.emoji;

  if (info.isOfferingNow) {
    if (badgeEl) badgeEl.textContent = "¡Momento de ofrecer hoy!";
    if (titleEl) titleEl.textContent = `Faltan ${info.diffDays} días para ${info.item.shortName}: ¡empieza a ofrecer hoy!`;
    if (textEl) textEl.textContent = `Tus clientas ya están buscando ${info.item.producto}. Toca aquí para ver tu mensaje de WhatsApp listo.`;
  } else {
    if (badgeEl) badgeEl.textContent = "Próxima Gran Temporada";
    if (titleEl) titleEl.textContent = `Faltan ${info.diffDays} días para el ${info.item.shortName}`;
    if (textEl) textEl.textContent = `Empieza a ofrecer a partir del ${info.item.empiezaTexto}. Toca aquí para preparar tus pedidos.`;
  }
}

function initFechas() {
  const info = getNextFechaInfo();
  const heroBadge = document.getElementById("fechas-hero-badge");
  const heroIcon = document.getElementById("fechas-hero-icon");
  const heroTitle = document.getElementById("fechas-hero-headline");
  const heroStatus = document.getElementById("fechas-hero-status-text");

  if (info) {
    if (heroIcon) heroIcon.textContent = info.item.emoji;
    if (info.isOfferingNow) {
      if (heroBadge) heroBadge.textContent = "¡Ya es momento de ofrecer!";
      if (heroTitle) heroTitle.textContent = `Faltan ${info.diffDays} días para el ${info.item.shortName}`;
      if (heroStatus) heroStatus.textContent = "¡Empieza a ofrecer hoy con tu mensaje listo!";
    } else {
      if (heroBadge) heroBadge.textContent = "Próxima Gran Temporada";
      if (heroTitle) heroTitle.textContent = `Faltan ${info.diffDays} días para el ${info.item.shortName}`;
      if (heroStatus) heroStatus.textContent = `Comienza a levantar pedidos el ${info.item.empiezaTexto}.`;
    }

    const btnOpenNext = document.getElementById("fechas-btn-open-next");
    if (btnOpenNext) {
      btnOpenNext.onclick = () => openFechaDetalle(info.item.id);
    }
  }

  renderFechasCards();
}

function renderFechasCards() {
  const list = document.getElementById("fechas-cards-list");
  if (!list) return;
  list.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = today.getFullYear();
  const nextInfo = getNextFechaInfo();

  FECHAS_DATA.forEach(item => {
    let eventDate = item.getDate(currentYear);
    eventDate.setHours(0, 0, 0, 0);
    let empiezaDate = item.getEmpiezaDate(currentYear);
    empiezaDate.setHours(0, 0, 0, 0);

    const isNext = nextInfo && nextInfo.item.id === item.id;
    const isNow = today >= empiezaDate && today <= eventDate;
    const isPast = today > eventDate;

    let pillHtml = "";
    if (isNow) {
      pillHtml = `<span class="fecha-status-pill pill-now">🔥 ¡Ofrecer hoy!</span>`;
    } else if (isNext) {
      pillHtml = `<span class="fecha-status-pill pill-next">⭐ Próxima</span>`;
    } else if (isPast) {
      pillHtml = `<span class="fecha-status-pill pill-past">Próximo año</span>`;
    }

    const card = document.createElement("div");
    card.className = "fecha-row-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
      <div class="fecha-row-top">
        <div style="flex: 1;">
          <span class="fecha-row-date">${item.emoji} ${item.nombre.split('–')[0].trim()}</span>
          <h3 class="fecha-row-name">${item.nombre.includes('–') ? item.nombre.split('–')[1].trim() : item.nombre}</h3>
          <p class="fecha-row-prod">🍰 ${item.producto}</p>
        </div>
        ${pillHtml}
      </div>
    `;

    card.addEventListener("click", () => openFechaDetalle(item.id));
    list.appendChild(card);
  });
}

function openFechaDetalle(fechaId) {
  const item = FECHAS_DATA.find(f => f.id === fechaId);
  if (!item) return;

  activeModalFechaId = fechaId;
  const modal = document.getElementById("modal-fecha-detalle");
  if (!modal) return;

  document.getElementById("mfecha-title").textContent = `${item.emoji} ${item.nombre}`;
  document.getElementById("mfecha-producto").textContent = item.producto;
  document.getElementById("mfecha-empieza").textContent = item.empiezaTexto;
  document.getElementById("mfecha-cierra").textContent = item.cierraTexto;
  document.getElementById("mfecha-precio").textContent = item.precioEjemplo;
  document.getElementById("mfecha-msg-quote").textContent = item.mensajeStatus;
  document.getElementById("mfecha-tip").textContent = item.tip;

  updateModalReminderBtn(fechaId);
  modal.classList.add("active");
}

function updateModalReminderBtn(fechaId) {
  const btn = document.getElementById("mfecha-btn-reminder");
  if (!btn) return;
  const reminders = getFechasReminders();
  if (reminders.includes(fechaId)) {
    btn.innerHTML = `✓ Recordatorio activo (Guardado en Inicio)`;
    btn.style.backgroundColor = "var(--color-whatsapp)";
  } else {
    btn.innerHTML = `➕ Recordármelo`;
    btn.style.backgroundColor = "var(--color-primary)";
  }
}

function getFechasReminders() {
  try {
    const raw = localStorage.getItem("mi_cuaderno_fechas_recordatorios");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function toggleFechaReminder(fechaId) {
  let reminders = getFechasReminders();
  if (reminders.includes(fechaId)) {
    reminders = reminders.filter(id => id !== fechaId);
    showToast("Recordatorio eliminado 🗑️");
  } else {
    reminders.push(fechaId);
    showToast("¡Recordatorio guardado! Te avisaremos en Inicio 🔔");
  }
  localStorage.setItem("mi_cuaderno_fechas_recordatorios", JSON.stringify(reminders));
  updateModalReminderBtn(fechaId);
  checkUrgentAlerts();
}

// ========================================================
// EXTRA: ¿CUÁNTO DURA?
// ========================================================

const CUANTO_DURA_DATA = {
  "panque-sin-cobertura": {
    name: "Pastel o panqué sin relleno ni cobertura",
    icon: "🎂",
    fuera: "2 días",
    refri: "5 días",
    congelado: "hasta 1 mes (bien envuelto, sin cobertura)",
    consumirDias: 5,
    notaConservacion: "En refrigeración dura 5 días · Fuera del refri consumir en 2 días"
  },
  "pastel-crema": {
    name: "Pastel con relleno o cobertura de crema",
    icon: "🍰",
    fuera: "No",
    refri: "2 a 3 días",
    congelado: "No recomendado",
    consumirDias: 3,
    notaConservacion: "Mantener siempre en refrigeración · Consumir en 2 a 3 días"
  },
  "cupcakes-crema": {
    name: "Cupcakes con cobertura de crema",
    icon: "🧁",
    fuera: "No",
    refri: "2 a 3 días",
    congelado: "No recomendado",
    consumirDias: 3,
    notaConservacion: "Mantener siempre en refrigeración · Consumir en 2 a 3 días"
  },
  "galletas": {
    name: "Polvorones y galletas",
    icon: "🍪",
    fuera: "7 días en frasco cerrado",
    refri: "No hace falta",
    congelado: "hasta 1 mes",
    consumirDias: 7,
    notaConservacion: "Conservar en frasco cerrado herméticamente · Lugar fresco y seco"
  },
  "cocadas": {
    name: "Cocadas y mazapanes",
    icon: "🥥",
    fuera: "5 días en frasco cerrado",
    refri: "No hace falta",
    congelado: "No recomendado",
    consumirDias: 5,
    notaConservacion: "Conservar en frasco cerrado herméticamente · Lugar fresco y seco"
  },
  "flan-pay": {
    name: "Flan, pay de queso y postres con leche",
    icon: "🍮",
    fuera: "No",
    refri: "3 días",
    congelado: "No recomendado",
    consumirDias: 3,
    notaConservacion: "Mantener siempre en refrigeración · Consumir en 3 días"
  }
};

let currentShelfProd = "panque-sin-cobertura";

function initCuantoDura() {
  selectShelfProduct("panque-sin-cobertura");
}

function selectShelfProduct(prodKey) {
  currentShelfProd = prodKey;
  const data = CUANTO_DURA_DATA[prodKey] || CUANTO_DURA_DATA["panque-sin-cobertura"];

  document.querySelectorAll(".shelf-prod-btn").forEach(btn => {
    if (btn.getAttribute("data-prod") === prodKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const fueraEl = document.getElementById("shelf-val-fuera");
  const refriEl = document.getElementById("shelf-val-refri");
  const congEl = document.getElementById("shelf-val-congelado");

  if (fueraEl) fueraEl.textContent = data.fuera;
  if (refriEl) refriEl.textContent = data.refri;
  if (congEl) congEl.textContent = data.congelado;
}

// ==========================================
// REGISTRO DE EVENTOS E INICIALIZACIÓN
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  initAvisoEjemplos();

  // Registrar Service Worker para PWA Offline
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("Service Worker de Mi Cuaderno activo"))
      .catch((err) => console.log("SW error:", err));
  }

  // Comprobar alertas urgentes de 2 días en Inicio
  checkUrgentAlerts();

  // Actualizar saludo dinámico con hora del día y fecha en español
  updateGreeting();

  // Renderizar los 3 mini-cartones del Resumen del Día
  renderHomeDaySummary();

  // Actualizar barra de reanudación ("Seguir donde te quedaste")
  updateResumeBar();

  // Inicializar barra de navegación inferior y folha Más
  initBottomNavigation();

  // Bolinhas de progreso en formularios
  enhanceStepIndicators();

  // Feedback háptico
  initHapticFeedback();

  // Navegación de Marca / Header
  document.getElementById("brand-header-link").addEventListener("click", () => {
    checkUrgentAlerts();
    navigateTo("screen-home");
  });

  document.getElementById("header-back-btn").addEventListener("click", () => {
    checkUrgentAlerts();
    navigateTo("screen-home");
  });

  // Botones de Menú en Inicio
  document.getElementById("tile-calc").addEventListener("click", () => {
    initCalculadora();
    navigateTo("screen-calculadora");
  });

  document.getElementById("tile-agenda").addEventListener("click", () => {
    initAgenda();
    navigateTo("screen-agenda");
  });

  document.getElementById("tile-mensajes").addEventListener("click", () => {
    navigateTo("screen-mensajes-list");
  });

  document.getElementById("tile-diagnostico").addEventListener("click", () => {
    navigateTo("screen-diagnostico-list");
  });

  document.getElementById("tile-caja").addEventListener("click", () => {
    initCaja();
    navigateTo("screen-caja");
  });

  document.getElementById("tile-fiesta").addEventListener("click", () => {
    initFiesta();
    navigateTo("screen-fiesta");
  });

  document.getElementById("tile-menu-etiquetas").addEventListener("click", () => {
    initMenuEtiquetas();
    navigateTo("screen-menu-etiquetas");
  });

  document.getElementById("tile-conversor").addEventListener("click", () => {
    initConversor();
    navigateTo("screen-conversor");
  });

  document.getElementById("tile-fechas").addEventListener("click", () => {
    initFechas();
    navigateTo("screen-fechas");
  });

  document.getElementById("tile-cuanto-dura").addEventListener("click", () => {
    initCuantoDura();
    navigateTo("screen-cuanto-dura");
  });

  document.getElementById("highlight-dates-card").addEventListener("click", () => {
    initFechas();
    navigateTo("screen-fechas");
  });

  document.getElementById("btn-go-numeros").addEventListener("click", () => {
    initMisNumeros();
    showMisNumerosStep(1);
    navigateTo("screen-mis-numeros");
  });

  document.getElementById("btn-go-saved").addEventListener("click", () => {
    renderSavedCalculationsScreen();
    navigateTo("screen-saved");
  });

  document.getElementById("btn-go-precios").addEventListener("click", () => {
    renderMisPreciosScreen();
    navigateTo("screen-mis-precios");
  });

  const btnGoAyuda = document.getElementById("btn-go-ayuda");
  if (btnGoAyuda) {
    btnGoAyuda.addEventListener("click", () => {
      navigateTo("screen-ayuda");
    });
  }

  // Barra de reanudación dinámica ("Seguir donde te quedaste")
  const resumeBar = document.getElementById("home-resume-bar");
  if (resumeBar) {
    resumeBar.addEventListener("click", () => {
      const target = resumeBar.dataset.target;
      if (target && TOOLS_METADATA[target]) {
        TOOLS_METADATA[target].init();
        navigateTo(target);
      }
    });
  }

  // 1. Acciones Rápidas en Inicio
  const quickNewOrder = document.getElementById("btn-quick-new-order");
  if (quickNewOrder) {
    quickNewOrder.addEventListener("click", () => {
      openNuevoPedidoForm();
    });
  }

  const quickCalc = document.getElementById("btn-quick-calc");
  if (quickCalc) {
    quickCalc.addEventListener("click", () => {
      initCalculadora();
      navigateTo("screen-calculadora");
    });
  }

  // Eventos: Mis Números y Respaldo
  document.getElementById("btn-numeros-step1-next").addEventListener("click", () => {
    showMisNumerosStep(2);
  });
  document.getElementById("btn-numeros-step2-back").addEventListener("click", () => {
    showMisNumerosStep(1);
  });
  document.getElementById("btn-numeros-save").addEventListener("click", () => {
    saveMisNumeros();
  });

  document.getElementById("btn-export-backup").addEventListener("click", exportNotebookBackup);
  document.getElementById("btn-import-backup-trigger").addEventListener("click", () => {
    document.getElementById("input-restore-backup").click();
  });
  document.getElementById("input-restore-backup").addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      importNotebookBackup(e.target.files[0]);
    }
  });

  // Eventos: Calculadora
  document.querySelectorAll(".recipe-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      selectRecipe(e.currentTarget.dataset.recipe);
    });
  });

  document.getElementById("btn-add-ingredient").addEventListener("click", openAddIngredientModal);
  document.getElementById("btn-modal-cancel").addEventListener("click", closeAddIngredientModal);
  document.getElementById("btn-modal-confirm").addEventListener("click", confirmAddIngredient);

  document.getElementById("modal-ing-select").addEventListener("change", (e) => {
    const isCustom = e.target.value === "custom";
    document.getElementById("modal-custom-name-wrap").style.display = isCustom ? "block" : "none";
    document.getElementById("modal-custom-details-wrap").style.display = isCustom ? "block" : "none";
  });

  document.getElementById("btn-calc-step1-next").addEventListener("click", () => showCalcStep(2));
  document.getElementById("btn-calc-step2-back").addEventListener("click", () => showCalcStep(1));
  document.getElementById("btn-calc-step2-next").addEventListener("click", () => showCalcStep(3));
  document.getElementById("btn-calc-step3-back").addEventListener("click", () => showCalcStep(2));
  document.getElementById("btn-calc-do-calculate").addEventListener("click", calculatePricing);

  // Resultados de Calculadora
  document.getElementById("btn-toggle-breakdown").addEventListener("click", () => {
    const box = document.getElementById("breakdown-box");
    box.classList.toggle("active");
  });

  document.getElementById("btn-toggle-objection").addEventListener("click", () => {
    const card = document.getElementById("objection-card");
    card.classList.toggle("active");
  });

  document.getElementById("btn-save-calc").addEventListener("click", saveCurrentCalculation);

  document.getElementById("btn-copy-calc-result").addEventListener("click", () => {
    const r = appState.calc.lastResult;
    if (!r) return;
    const txt = `🎂 ${r.pastel} · ${r.rebanadas} rebanadas · ${formatCurrency(r.precioJusto)} (rebanada ${formatCurrency(r.rebanadaJusto)})`;
    copyToClipboard(txt);
  });

  document.getElementById("btn-wa-calc-result").addEventListener("click", () => {
    const r = appState.calc.lastResult;
    if (!r) return;
    const txt = `🎂 ${r.pastel} · ${r.rebanadas} rebanadas · ${formatCurrency(r.precioJusto)} (rebanada ${formatCurrency(r.rebanadaJusto)})`;
    openWhatsApp(txt);
  });

  document.getElementById("btn-copy-objection").addEventListener("click", () => {
    const txt = document.getElementById("objection-text-content").textContent;
    copyToClipboard(txt);
  });

  document.getElementById("btn-wa-objection").addEventListener("click", () => {
    const txt = document.getElementById("objection-text-content").textContent;
    openWhatsApp(txt);
  });

  document.getElementById("btn-recalc-again").addEventListener("click", () => {
    showCalcStep(1);
  });

  // Eventos: Agenda de Pedidos
  document.getElementById("btn-open-nuevo-pedido").addEventListener("click", openNuevoPedidoForm);

  document.getElementById("tab-agenda-semana").addEventListener("click", () => switchAgendaTab("semana"));
  document.getElementById("tab-agenda-hoy").addEventListener("click", () => switchAgendaTab("hoy"));
  document.getElementById("tab-agenda-compras").addEventListener("click", () => switchAgendaTab("compras"));

  document.getElementById("btn-copy-grocery-list").addEventListener("click", () => {
    if (appState.groceryShareText) copyToClipboard(appState.groceryShareText);
  });

  document.getElementById("btn-wa-grocery-list").addEventListener("click", () => {
    if (appState.groceryShareText) openWhatsApp(appState.groceryShareText);
  });

  // Pasos de Nuevo Pedido
  document.getElementById("btn-ped-step1-cancel").addEventListener("click", () => navigateTo("screen-agenda"));
  document.getElementById("btn-ped-step1-next").addEventListener("click", () => showPedidoFormStep(2));
  document.getElementById("btn-ped-step2-back").addEventListener("click", () => showPedidoFormStep(1));
  document.getElementById("btn-ped-step2-next").addEventListener("click", () => {
    // Sugerir precio del pastel seleccionado
    const prod = document.getElementById("ped-producto").value;
    const savedPrice = appState.savedCalculations.find(s => s.name === prod);
    const priceField = document.getElementById("ped-precio-total");
    if (savedPrice && savedPrice.precioJusto) {
      priceField.value = savedPrice.precioJusto;
    } else if (prod === "Pastel de Chocolate" || prod === "Pastel de Zanahoria") {
      priceField.value = "350";
    } else if (prod === "Pastel de Naranja") {
      priceField.value = "320";
    } else {
      priceField.value = "299";
    }
    document.getElementById("ped-monto-anticipo").value = Math.round(parseFloat(priceField.value) * 0.5);
    showPedidoFormStep(3);
  });

  document.getElementById("btn-ped-step3-back").addEventListener("click", () => showPedidoFormStep(2));
  document.getElementById("btn-ped-save").addEventListener("click", savePedidoFromForm);

  document.getElementById("ped-producto").addEventListener("change", (e) => {
    document.getElementById("ped-producto-custom-wrap").style.display = e.target.value === "Otro" ? "block" : "none";
  });

  document.getElementById("ped-precio-total").addEventListener("input", (e) => {
    const val = parseFloat(e.target.value) || 0;
    document.getElementById("ped-monto-anticipo").value = Math.round(val * 0.5);
  });

  // Confirmar Entrega en Mi Caja
  document.getElementById("btn-confirm-order-to-caja").addEventListener("click", () => {
    const ord = appState.pendingDeliveredOrder;
    if (ord) {
      const idx = appState.orders.findIndex(o => o.id === ord.id);
      if (idx !== -1) {
        appState.orders[idx].status = "entregado";
        appState.orders[idx].anticipoPagado = true;
      }
      saveOrdersToStorage();

      // Anotar en Mi Caja
      appState.cashbook.transactions.push({
        id: "tx_" + Date.now(),
        type: "sale",
        amount: ord.precioTotal,
        concept: `${ord.producto} (${ord.nombre})`,
        date: getRelativeDateStr(0)
      });
      saveCashbookToStorage();

      document.getElementById("modal-confirm-caja").classList.remove("active");
      appState.pendingDeliveredOrder = null;
      checkUrgentAlerts();
      initAgenda();
      triggerCelebration("¡Bien hecho, pastelera! 💛 ¡Venta agregada a Mi Caja!");
    }
  });

  document.getElementById("btn-skip-order-to-caja").addEventListener("click", () => {
    const ord = appState.pendingDeliveredOrder;
    if (ord) {
      const idx = appState.orders.findIndex(o => o.id === ord.id);
      if (idx !== -1) {
        appState.orders[idx].status = "entregado";
      }
      saveOrdersToStorage();
      document.getElementById("modal-confirm-caja").classList.remove("active");
      appState.pendingDeliveredOrder = null;
      checkUrgentAlerts();
      initAgenda();
      triggerCelebration("¡Bien hecho, pastelera! 💛 ¡Pedido marcado como entregado!");
    }
  });

  document.getElementById("btn-cancel-order-delivered").addEventListener("click", () => {
    document.getElementById("modal-confirm-caja").classList.remove("active");
    appState.pendingDeliveredOrder = null;
  });

  // Eventos: Mi Caja
  document.getElementById("btn-open-caja-sale").addEventListener("click", () => openCajaMovModal("sale"));
  document.getElementById("btn-open-caja-expense").addEventListener("click", () => openCajaMovModal("expense"));
  document.getElementById("btn-cancel-caja-mov").addEventListener("click", () => {
    document.getElementById("modal-caja-movimiento").classList.remove("active");
  });
  document.getElementById("btn-save-caja-mov").addEventListener("click", saveCajaMovModal);

  document.getElementById("tab-caja-semana").addEventListener("click", () => switchCajaPeriod("semana"));
  document.getElementById("tab-caja-semana-anterior").addEventListener("click", () => switchCajaPeriod("semana_anterior"));
  document.getElementById("tab-caja-mes").addEventListener("click", () => switchCajaPeriod("mes"));

  // Meta de Mi Caja
  document.getElementById("btn-edit-goal").addEventListener("click", () => {
    const goal = appState.cashbook.goal || { name: "Pagar el gas 🔥", amount: 1500 };
    document.getElementById("goal-input-amount").value = goal.amount;
    document.getElementById("modal-edit-goal").classList.add("active");
  });

  document.getElementById("goal-select-predefined").addEventListener("change", (e) => {
    document.getElementById("goal-custom-name-wrap").style.display = e.target.value === "Otra" ? "block" : "none";
  });

  document.getElementById("btn-cancel-goal-modal").addEventListener("click", () => {
    document.getElementById("modal-edit-goal").classList.remove("active");
  });

  document.getElementById("btn-save-goal-modal").addEventListener("click", () => {
    const sel = document.getElementById("goal-select-predefined").value;
    let name = sel;
    if (sel === "Otra") {
      name = document.getElementById("goal-custom-name").value.trim() || "Meta de ahorro";
    }
    const amount = parseFloat(document.getElementById("goal-input-amount").value) || 1500;

    appState.cashbook.goal = { name, amount };
    saveCashbookToStorage();
    document.getElementById("modal-edit-goal").classList.remove("active");
    renderCajaStats();
    showToast("¡Meta actualizada! 🎯");
  });

  document.getElementById("btn-copy-goal").addEventListener("click", () => {
    if (appState.goalShareText) copyToClipboard(appState.goalShareText);
  });

  document.getElementById("btn-wa-goal").addEventListener("click", () => {
    if (appState.goalShareText) openWhatsApp(appState.goalShareText);
  });

  // Eventos: Mensajes Listos
  document.querySelectorAll(".situation-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      selectMessageSituation(e.currentTarget.dataset.situation);
    });
  });

  document.getElementById("btn-message-form-back").addEventListener("click", () => {
    const sit = MESSAGES_TEMPLATES[appState.messages.selectedSituationKey];
    if (sit.hasSubSteps && appState.messages.subStep === 2) {
      appState.messages.subStep = 1;
      renderMessageFormStep();
      return;
    }
    navigateTo("screen-mensajes-list");
  });

  document.getElementById("btn-message-form-next").addEventListener("click", handleMessageFormNext);

  document.getElementById("btn-copy-message").addEventListener("click", () => {
    copyToClipboard(appState.messages.currentText);
  });

  document.getElementById("btn-wa-message").addEventListener("click", () => {
    openWhatsApp(appState.messages.currentText, appState.messages.currentPhone);
  });

  document.getElementById("btn-message-edit-data").addEventListener("click", () => {
    navigateTo("screen-mensajes-form");
  });

  document.getElementById("btn-message-change-situation").addEventListener("click", () => {
    navigateTo("screen-mensajes-list");
  });

  // Eventos: Diagnóstico
  document.querySelectorAll(".cake-problem-card").forEach(card => {
    card.addEventListener("click", (e) => {
      selectCakeProblem(e.currentTarget.dataset.problem);
    });
  });

  document.getElementById("btn-wa-ask-friend").addEventListener("click", () => {
    if (appState.diagnostic.friendText) {
      openWhatsApp(appState.diagnostic.friendText);
    }
  });

  document.getElementById("btn-diag-back-list").addEventListener("click", () => {
    navigateTo("screen-diagnostico-list");
  });

  // ==========================================
  // EVENTOS: HERRAMIENTA 6 – CALCULADORA DE FIESTA
  // ==========================================
  document.getElementById("btn-fiesta-step1-cancel").addEventListener("click", () => {
    navigateTo("screen-home");
  });
  document.getElementById("btn-fiesta-step1-next").addEventListener("click", () => {
    const ninos = parseInt(document.getElementById("fiesta-input-ninos").value, 10) || 0;
    const adultos = parseInt(document.getElementById("fiesta-input-adultos").value, 10) || 0;
    if (ninos <= 0 && adultos <= 0) {
      alert("Por favor anota al menos 1 niño o 1 adulto.");
      return;
    }
    showFiestaStep(2);
  });

  document.getElementById("btn-fiesta-step2-prev").addEventListener("click", () => {
    showFiestaStep(1);
  });
  document.getElementById("btn-fiesta-step2-next").addEventListener("click", () => {
    showFiestaStep(3);
  });

  document.getElementById("btn-fiesta-step3-prev").addEventListener("click", () => {
    showFiestaStep(2);
  });
  document.getElementById("btn-fiesta-calc").addEventListener("click", () => {
    calculateFiesta();
  });

  document.getElementById("btn-fiesta-whatsapp").addEventListener("click", () => {
    if (appState.fiesta && appState.fiesta.whatsappMessage) {
      openWhatsApp(appState.fiesta.whatsappMessage);
    }
  });
  document.getElementById("btn-fiesta-copy").addEventListener("click", () => {
    if (appState.fiesta && appState.fiesta.whatsappMessage) {
      copyToClipboard(appState.fiesta.whatsappMessage);
    }
  });
  document.getElementById("btn-fiesta-save-agenda").addEventListener("click", () => {
    saveFiestaToAgenda();
  });
  document.getElementById("btn-fiesta-restart").addEventListener("click", () => {
    initFiesta();
  });

  // ==========================================
  // EVENTOS: HERRAMIENTA 7 – TU MENÚ Y TUS ETIQUETAS
  // ==========================================
  // Pestañas
  document.getElementById("tab-btn-menu").addEventListener("click", () => {
    switchMenuEtiquetasTab("menu");
  });
  document.getElementById("tab-btn-etiquetas").addEventListener("click", () => {
    switchMenuEtiquetasTab("etiquetas");
  });

  // Menú Paso 1
  document.getElementById("btn-menu-step1-cancel").addEventListener("click", () => {
    navigateTo("screen-home");
  });
  document.getElementById("btn-menu-step1-next").addEventListener("click", () => {
    const nombre = document.getElementById("menu-input-nombre").value.trim();
    if (!nombre) {
      alert("Por favor escribe el nombre de tu negocio.");
      return;
    }
    showMenuStep(2);
  });

  // Menú Paso 2
  document.getElementById("btn-menu-load-calc").addEventListener("click", loadMenuProductsFromCalc);
  document.getElementById("btn-menu-add-prod").addEventListener("click", addMenuProduct);
  document.getElementById("btn-menu-step2-prev").addEventListener("click", () => {
    showMenuStep(1);
  });
  document.getElementById("btn-menu-step2-next").addEventListener("click", () => {
    if (!appState.menu.products || appState.menu.products.length === 0) {
      alert("Por favor agrega al menos un producto a tu menú.");
      return;
    }
    showMenuStep(3);
  });

  // Menú Paso 3 (Temas)
  document.querySelectorAll(".theme-card").forEach(card => {
    card.addEventListener("click", (e) => {
      document.querySelectorAll(".theme-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const rad = card.querySelector("input[type='radio']");
      if (rad) {
        rad.checked = true;
        appState.menu.theme = rad.value;
      }
    });
  });

  document.getElementById("menu-file-bg").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          appState.menu.customBgImg = img;
          showToast("¡Foto lista para el fondo de tu menú! 📸");
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      appState.menu.customBgImg = null;
    }
  });

  document.getElementById("btn-menu-step3-prev").addEventListener("click", () => {
    showMenuStep(2);
  });
  document.getElementById("btn-menu-generate").addEventListener("click", () => {
    saveMenuToStorage();
    renderMenuCanvas();
    showMenuStep(4);
  });

  // Menú Resultado
  document.getElementById("btn-menu-save-img").addEventListener("click", () => {
    saveCanvasImage("canvas-menu", "menu_sin_gluten.png");
  });
  document.getElementById("btn-menu-share").addEventListener("click", () => {
    const neg = appState.menu.nombre || "Dulce Sin Gluten";
    const wa = appState.menu.whatsapp || "55 1234 5678";
    shareCanvasImage("canvas-menu", "Mi Menú Sin Gluten", `¡Hola! 😊 Te comparto nuestro menú artesanal 100% sin gluten de ${neg}. ¡Pide por WhatsApp: ${wa}! 🍰`);
  });
  document.getElementById("btn-menu-print").addEventListener("click", () => {
    window.print();
  });
  document.getElementById("btn-menu-edit").addEventListener("click", () => {
    showMenuStep(1);
  });

  // Etiquetas Paso 1
  document.getElementById("eti-select-prod").addEventListener("change", (e) => {
    const customWrap = document.getElementById("eti-custom-prod-wrap");
    if (e.target.value === "otro") {
      customWrap.style.display = "block";
    } else {
      customWrap.style.display = "none";
    }
    populateEtiquetaIngredients(e.target.value);
  });

  document.getElementById("btn-eti-step1-cancel").addEventListener("click", () => {
    navigateTo("screen-home");
  });
  document.getElementById("btn-eti-step1-next").addEventListener("click", () => {
    showEtiquetaStep(2);
  });

  // Etiquetas Paso 2
  document.querySelectorAll(".allergen-pill input[type='checkbox']").forEach(chk => {
    chk.addEventListener("change", () => {
      const pill = chk.closest(".allergen-pill");
      if (pill) {
        if (chk.checked) pill.classList.add("active");
        else pill.classList.remove("active");
      }
    });
  });

  document.getElementById("btn-eti-step2-prev").addEventListener("click", () => {
    showEtiquetaStep(1);
  });
  document.getElementById("btn-eti-step2-next").addEventListener("click", () => {
    showEtiquetaStep(3);
  });

  // Etiquetas Paso 3 (Nivel de cuidado)
  document.querySelectorAll(".care-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".care-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const rad = card.querySelector("input[type='radio']");
      if (rad) rad.checked = true;
    });
  });

  document.getElementById("btn-eti-step3-prev").addEventListener("click", () => {
    showEtiquetaStep(2);
  });
  document.getElementById("btn-eti-generate").addEventListener("click", () => {
    renderEtiquetaCanvas();
    showEtiquetaStep(4);
  });

  // Etiquetas Resultado
  document.getElementById("btn-eti-save-img").addEventListener("click", () => {
    saveCanvasImage("canvas-etiqueta", "etiqueta_sin_gluten.png");
  });
  document.getElementById("btn-eti-share").addEventListener("click", () => {
    shareCanvasImage("canvas-etiqueta", "Etiqueta Sin Gluten", "Etiqueta artesanal para empaque de repostería sin gluten.");
  });
  document.getElementById("btn-eti-print-sheet").addEventListener("click", () => {
    printMultipleEtiquetas();
  });
  document.getElementById("btn-eti-edit").addEventListener("click", () => {
    showEtiquetaStep(1);
  });

  // ==========================================
  // EVENTOS: HERRAMIENTA 8 – CONVERSOR Y SUSTITUCIONES
  // ==========================================
  document.getElementById("tab-conv-tazas").addEventListener("click", () => switchConversorTab("tazas"));
  document.getElementById("tab-conv-tamano").addEventListener("click", () => switchConversorTab("tamano"));
  document.getElementById("tab-conv-sustituciones").addEventListener("click", () => switchConversorTab("sustituciones"));

  document.getElementById("conv-select-ingrediente").addEventListener("change", () => {
    updateConversionResult();
  });

  const measureBtns = document.querySelectorAll(".measure-pill-btn");
  measureBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      measureBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentConversorState.measure = btn.getAttribute("data-measure");
      updateConversionResult();
    });
  });

  // Cambiar el tamaño
  const recipeScaleSelect = document.getElementById("conv-scale-recipe");
  const customRecipeWrap = document.getElementById("conv-custom-recipe-wrap");
  recipeScaleSelect.addEventListener("change", (e) => {
    if (e.target.value === "receta-personalizada") {
      customRecipeWrap.style.display = "block";
    } else {
      customRecipeWrap.style.display = "none";
    }
    recalculateScaledRecipe();
  });

  document.getElementById("conv-custom-recipe-text").addEventListener("input", recalculateScaledRecipe);
  document.getElementById("conv-scale-orig-mold").addEventListener("change", recalculateScaledRecipe);
  document.getElementById("conv-scale-target-mold").addEventListener("change", recalculateScaledRecipe);

  document.getElementById("conv-btn-minus-cakes").addEventListener("click", () => {
    if (currentConversorState.cakeCount > 1) {
      currentConversorState.cakeCount--;
      document.getElementById("conv-cake-count").textContent = currentConversorState.cakeCount;
      recalculateScaledRecipe();
    }
  });

  document.getElementById("conv-btn-plus-cakes").addEventListener("click", () => {
    if (currentConversorState.cakeCount < 10) {
      currentConversorState.cakeCount++;
      document.getElementById("conv-cake-count").textContent = currentConversorState.cakeCount;
      recalculateScaledRecipe();
    }
  });

  document.getElementById("conv-btn-copy-recipe").addEventListener("click", () => {
    copyToClipboard(currentConversorState.scaledRecipeText);
  });

  document.getElementById("conv-btn-share-recipe").addEventListener("click", () => {
    openWhatsApp(currentConversorState.scaledRecipeText);
  });

  // ==========================================
  // EVENTOS: HERRAMIENTA 9 – FECHAS QUE VENDEN
  // ==========================================
  const modalFecha = document.getElementById("modal-fecha-detalle");
  document.getElementById("btn-close-mfecha").addEventListener("click", () => {
    modalFecha.classList.remove("active");
  });
  document.getElementById("mfecha-btn-close-bottom").addEventListener("click", () => {
    modalFecha.classList.remove("active");
  });

  modalFecha.addEventListener("click", (e) => {
    if (e.target === modalFecha) {
      modalFecha.classList.remove("active");
    }
  });

  document.getElementById("mfecha-btn-copy").addEventListener("click", () => {
    const text = document.getElementById("mfecha-msg-quote").textContent.trim();
    copyToClipboard(text);
  });

  document.getElementById("mfecha-btn-wa").addEventListener("click", () => {
    const text = document.getElementById("mfecha-msg-quote").textContent.trim();
    openWhatsApp(text);
  });

  document.getElementById("mfecha-btn-reminder").addEventListener("click", () => {
    if (activeModalFechaId) {
      toggleFechaReminder(activeModalFechaId);
    }
  });

  // ==========================================
  // EVENTOS: EXTRA – ¿CUÁNTO DURA?
  // ==========================================
  document.querySelectorAll(".shelf-prod-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const prodKey = btn.getAttribute("data-prod");
      selectShelfProduct(prodKey);
    });
  });

  // Guardar Precios de Ingredientes
  document.getElementById("btn-save-mis-precios").addEventListener("click", saveMisPreciosFromScreen);
  document.getElementById("btn-back-mis-precios").addEventListener("click", () => navigateTo("screen-home"));

  // ==========================================
  // EVENTOS: APOYO A LA AUTORA (SPEI)
  // ==========================================
  const CLABE_CODE = "684180330083521897";

  async function copyClabeToClipboard() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CLABE_CODE);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = CLABE_CODE;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch (err) {}
    showToast("¡CLABE copiada! Gracias 💛");
  }

  document.querySelectorAll(".btn-copy-clabe, .btn-copy-clabe-small").forEach(btn => {
    btn.addEventListener("click", copyClabeToClipboard);
  });

  // Toggle do cartão discreto da autora (Chef Amanda)
  document.querySelectorAll(".author-discreet-toggle").forEach(toggleBtn => {
    toggleBtn.addEventListener("click", () => {
      const panelId = toggleBtn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : toggleBtn.nextElementSibling;
      if (!panel) return;

      const isCurrentlyOpen = panel.style.display === "block" || (panel.style.display !== "none" && window.getComputedStyle(panel).display !== "none");
      if (isCurrentlyOpen) {
        panel.style.display = "none";
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.classList.remove("is-open");
      } else {
        panel.style.display = "block";
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.classList.add("is-open");
      }
    });
  });

  const footerApoyoBtn = document.getElementById("btn-footer-apoyo");
  if (footerApoyoBtn) {
    footerApoyoBtn.addEventListener("click", () => {
      navigateTo("screen-apoya");
    });
  }

  const backFromApoyaBtn = document.getElementById("btn-back-from-apoya");
  if (backFromApoyaBtn) {
    backFromApoyaBtn.addEventListener("click", () => {
      navigateTo("screen-home");
    });
  }

  // Inicializar área de ayuda y primeros pasos
  initAyuda();

  // Detección de conectividad para el banner offline
  window.addEventListener("online", () => {
    const b = document.getElementById("offline-banner");
    if (b) b.style.display = "none";
  });
  window.addEventListener("offline", () => {
    const b = document.getElementById("offline-banner");
    if (b) b.style.display = "block";
  });
  if (!navigator.onLine) {
    const b = document.getElementById("offline-banner");
    if (b) b.style.display = "block";
  }
});

// Listener para instalación PWA si el navegador lo permite
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  window.deferredPwaPrompt = e;
});

// ==========================================
// ❓ ÁREA DE AYUDA: ¿CÓMO SE USA?
// ==========================================

function initAyuda() {
  const cards = document.querySelectorAll(".ayuda-card");

  // 1. Acordeones de los temas
  cards.forEach(card => {
    const headerBtn = card.querySelector(".ayuda-card-header");
    const body = card.querySelector(".ayuda-card-body");
    if (!headerBtn || !body) return;

    headerBtn.addEventListener("click", () => {
      const isExpanded = headerBtn.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        headerBtn.setAttribute("aria-expanded", "false");
        body.hidden = true;
        card.classList.remove("open");
      } else {
        headerBtn.setAttribute("aria-expanded", "true");
        body.hidden = false;
        card.classList.add("open");
      }
    });
  });

  // 2. Buscador en tiempo real
  const searchInput = document.getElementById("ayuda-search-input");
  const clearBtn = document.getElementById("ayuda-search-clear");
  const noResults = document.getElementById("ayuda-no-results");

  function normalizeText(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = normalizeText(searchInput.value);
      if (clearBtn) {
        clearBtn.style.display = query.length > 0 ? "inline-flex" : "none";
      }

      let matchesCount = 0;
      cards.forEach(card => {
        if (!query) {
          card.style.display = "";
          return;
        }

        const keywords = card.dataset.keywords || "";
        const titleText = card.querySelector(".ayuda-card-title")?.textContent || "";
        const bodyText = card.querySelector(".ayuda-card-body")?.textContent || "";
        const allContent = normalizeText(`${keywords} ${titleText} ${bodyText}`);

        if (allContent.includes(query)) {
          card.style.display = "";
          matchesCount++;
          // Al buscar, expandir la tarjeta para ver el contenido coincidente
          const headerBtn = card.querySelector(".ayuda-card-header");
          const body = card.querySelector(".ayuda-card-body");
          if (headerBtn && body) {
            headerBtn.setAttribute("aria-expanded", "true");
            body.hidden = false;
            card.classList.add("open");
          }
        } else {
          card.style.display = "none";
        }
      });

      if (noResults) {
        noResults.style.display = (query && matchesCount === 0) ? "block" : "none";
      }
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input"));
      searchInput.focus();
    });
  }

  // 3. Botones "Ir a [herramienta]" dentro de la ayuda
  document.querySelectorAll(".ayuda-goto-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (!target) return;
      if (target === "screen-calculadora") initCalculadora();
      else if (target === "screen-agenda") initAgenda();
      else if (target === "screen-caja") initCaja();
      else if (target === "screen-fiesta") initFiesta();
      else if (target === "screen-menu-etiquetas") initMenuEtiquetas();
      else if (target === "screen-conversor") initConversor();
      else if (target === "screen-fechas") initFechas();
      else if (target === "screen-cuanto-dura") initShelfLife();
      else if (target === "screen-mis-numeros") initMisNumeros();
      navigateTo(target);

      // Si es el botón de respaldo, hacer scroll suave hasta la sección de respaldo
      if (btn.id === "btn-ayuda-ir-respaldo") {
        setTimeout(() => {
          const exportBtn = document.getElementById("btn-backup-export");
          if (exportBtn) {
            exportBtn.scrollIntoView({ behavior: "smooth", block: "center" });
            exportBtn.focus();
          }
        }, 300);
      }
    });
  });

  // 4. Checklist de Primeros Pasos con persistencia
  initPrimerosPasosChecklist();

  // 5. Botones contextuales '?' en cada herramienta
  document.querySelectorAll(".btn-tool-help").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const secId = btn.dataset.helpSec;
      if (secId) {
        openAyudaSection(secId);
      } else {
        navigateTo("screen-ayuda");
      }
    });
  });

  // Botón '?' en el encabezado de inicio
  const headerHelpBtn = document.getElementById("header-help-btn");
  if (headerHelpBtn) {
    headerHelpBtn.addEventListener("click", () => {
      navigateTo("screen-ayuda");
    });
  }

  // Botón contextual en el encabezado dentro de herramientas
  const headerToolHelpBtn = document.getElementById("header-tool-help-btn");
  if (headerToolHelpBtn) {
    headerToolHelpBtn.addEventListener("click", () => {
      const mapScreenToSection = {
        "screen-calculadora": "ayuda-sec-calculadora",
        "screen-agenda": "ayuda-sec-agenda",
        "screen-pedido-form": "ayuda-sec-agenda",
        "screen-mensajes-list": "ayuda-sec-mensajes",
        "screen-mensajes-form": "ayuda-sec-mensajes",
        "screen-mensajes-ready": "ayuda-sec-mensajes",
        "screen-diagnostico-list": "ayuda-sec-diagnostico",
        "screen-diagnostico-result": "ayuda-sec-diagnostico",
        "screen-fiesta": "ayuda-sec-fiesta",
        "screen-menu-etiquetas": "ayuda-sec-menu-etiquetas",
        "screen-caja": "ayuda-sec-caja",
        "screen-conversor": "ayuda-sec-conversor",
        "screen-fechas": "ayuda-sec-fechas",
        "screen-cuanto-dura": "ayuda-sec-duracion",
        "screen-mis-numeros": "ayuda-sec-mis-numeros",
        "screen-mis-precios": "ayuda-sec-mis-numeros",
        "screen-saved": "ayuda-sec-calculadora"
      };
      const targetSec = mapScreenToSection[appState.currentScreen] || "ayuda-sec-primeros-pasos";
      openAyudaSection(targetSec);
    });
  }

  // Botón volver desde ayuda
  const btnBackAyuda = document.getElementById("btn-back-from-ayuda");
  if (btnBackAyuda) {
    btnBackAyuda.addEventListener("click", () => {
      navigateTo(appState.previousScreen && appState.previousScreen !== "screen-ayuda" ? appState.previousScreen : "screen-home");
    });
  }

  // Tarjeta de Primeros Pasos en el Inicio
  const homePasosCard = document.getElementById("home-primeros-pasos-card");
  if (homePasosCard) {
    homePasosCard.addEventListener("click", () => {
      openAyudaSection("ayuda-sec-primeros-pasos");
    });
  }

  // Botón de instalación PWA
  const btnInstall = document.getElementById("btn-install-pwa-ayuda");
  if (btnInstall) {
    btnInstall.addEventListener("click", () => {
      if (window.deferredPwaPrompt) {
        window.deferredPwaPrompt.prompt();
        window.deferredPwaPrompt.userChoice.then(() => {
          window.deferredPwaPrompt = null;
        });
      } else {
        showToast("Sigue los pasos arriba según tu celular (Android o iPhone) 📲");
      }
    });
  }
}

// Abrir una sección específica de la ayuda y hacer scroll suave hasta ella
function openAyudaSection(sectionId) {
  navigateTo("screen-ayuda");

  // Limpiar buscador si había texto para que todas las secciones estén accesibles
  const searchInput = document.getElementById("ayuda-search-input");
  if (searchInput && searchInput.value) {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
  }

  setTimeout(() => {
    const targetCard = document.getElementById(sectionId);
    if (!targetCard) return;

    // Asegurarse de que esté expandida
    const headerBtn = targetCard.querySelector(".ayuda-card-header");
    const body = targetCard.querySelector(".ayuda-card-body");
    if (headerBtn && body) {
      headerBtn.setAttribute("aria-expanded", "true");
      body.hidden = false;
      targetCard.classList.add("open");
    }

    targetCard.scrollIntoView({ behavior: "smooth", block: "start" });
    targetCard.classList.add("highlight-flash");
    setTimeout(() => {
      targetCard.classList.remove("highlight-flash");
    }, 2000);
  }, 100);
}

// Lógica de Checklist de Primeros Pasos
function initPrimerosPasosChecklist() {
  const STORAGE_KEY = "cuaderno_primeros_pasos";
  let saved = [false, false, false, false, false];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch (e) {
    console.error("Error al cargar primeros pasos:", e);
  }

  const checkboxes = document.querySelectorAll(".pasos-checkbox");
  const successMsg = document.getElementById("primeros-pasos-success-msg");
  const homeCard = document.getElementById("home-primeros-pasos-card");

  function updateUi(isInitial = false) {
    let completedCount = 0;
    checkboxes.forEach((cb, idx) => {
      const isChecked = !!saved[idx];
      cb.checked = isChecked;
      const label = cb.closest(".ayuda-check-item");
      if (label) {
        if (isChecked) label.classList.add("done");
        else label.classList.remove("done");
      }
      if (isChecked) completedCount++;
    });

    const allDone = completedCount === 5;
    if (successMsg) {
      successMsg.style.display = allDone ? "block" : "none";
    }
    if (homeCard) {
      homeCard.style.display = allDone ? "none" : "flex";
    }

    if (!isInitial && allDone) {
      triggerCelebration("¡Listo, pastelera! Tu cuaderno ya está preparado 💛");
    }
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      const idx = parseInt(cb.dataset.stepIndex, 10);
      saved[idx] = cb.checked;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      } catch (e) {}
      updateUi(false);
    });
  });

  updateUi(true);
}

