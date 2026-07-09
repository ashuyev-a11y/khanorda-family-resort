// i18n scaffold. RU is the source of truth; KZ mirrors the same shape.
// Content lists (units, amenities, reviews) live in config/data — here we keep
// the UI chrome so the RU/KZ toggle visibly switches the interface.

export type Locale = "ru" | "kz";

export const ru = {
  nav: {
    units: "Домики",
    amenities: "Удобства",
    calc: "Калькулятор",
    gallery: "Галерея",
    pricing: "Цены",
    reviews: "Отзывы",
    location: "Локация",
    faq: "Вопросы",
    book: "Рассчитать",
  },
  hero: {
    eyebrow: "Halal Friendly · берег реки Чаган",
    title: "Ваш личный курорт на берегу Чагана",
    subtitle:
      "Приватная территория для семьи: сауна, купель, джакузи, барбекю, пирс и пляж. 20 минут от Уральска.",
    cta: "Рассчитать стоимость",
    ctaSecondary: "Смотреть домики",
    badges: ["Halal Friendly", "До 16 гостей днём", "20 минут от Уральска"],
  },
  units: {
    title: "Домики",
    subtitle: "Выберите формат отдыха — от домика на двоих до всей территории.",
    capacity: "гостей",
    from: "от",
    perNight: "ночь",
    select: "Выбрать и рассчитать",
  },
  amenities: {
    title: "Что входит",
    subtitle: "Всё для отдыха уже на территории — ничего не нужно докупать.",
  },
  calc: {
    title: "Калькулятор стоимости",
    subtitle: "Выберите домик, даты и услуги — сумма пересчитывается сразу.",
    unit: "Домик",
    checkin: "Заезд",
    checkout: "Выезд",
    guests: "Гости",
    guestsNote: "с ночёвкой",
    addons: "Дополнительные услуги",
    accommodation: "Проживание",
    addonsLabel: "Услуги",
    total: "Итого",
    prepay: "Предоплата",
    hintDates: "Выберите даты заезда и выезда, чтобы увидеть сумму.",
    weekday: "будни",
    weekend: "выходные",
    holiday: "праздник",
    night: "ночь",
    perNight: "за ночь",
    book: "Забронировать",
    note: "Это предварительный расчёт. Онлайн-оплата и отправка заявки появятся позже.",
    summaryTitle: "Ваш расчёт",
  },
  gallery: {
    title: "Галерея",
    subtitle: "Территория, домики и виды на реку Чаган.",
  },
  pricing: {
    title: "Цены",
    subtitle: "Будни, выходные и праздники. Всё прозрачно.",
    unit: "Домик",
    weekday: "Будни",
    weekend: "Выходные",
    holiday: "Праздники",
    services: "Дополнительные услуги",
  },
  reviews: {
    title: "Отзывы гостей",
    subtitle: "Что говорят семьи, которые уже отдохнули в Khan Orda.",
  },
  location: {
    title: "Как добраться",
    subtitle: "20 минут от Уральска, на берегу реки Чаган.",
    addressLabel: "Адрес",
    address: "ЗКО, берег реки Чаган (20 минут от Уральска)",
    routeLabel: "Маршрут",
    route: "Точную точку и инструкцию по заезду отправляем после бронирования.",
    mapNote: "Здесь будет интерактивная карта",
  },
  faq: {
    title: "Частые вопросы",
    subtitle: "Коротко о заезде, правилах и оплате.",
  },
  footer: {
    tagline: "Семейный Halal Friendly resort на берегу реки Чаган.",
    contacts: "Контакты",
    nav: "Навигация",
    rights: "© 2026 Khan Orda Family Resort",
  },
  common: {
    langRu: "RU",
    langKz: "KZ",
    whatsapp: "Написать в WhatsApp",
  },
};

export type Dict = typeof ru;

export const kz: Dict = {
  nav: {
    units: "Үйлер",
    amenities: "Ыңғайлылық",
    calc: "Калькулятор",
    gallery: "Галерея",
    pricing: "Бағалар",
    reviews: "Пікірлер",
    location: "Орналасуы",
    faq: "Сұрақтар",
    book: "Есептеу",
  },
  hero: {
    eyebrow: "Halal Friendly · Шаған өзенінің жағасы",
    title: "Шаған жағасындағы жеке демалыс орталығыңыз",
    subtitle:
      "Отбасыға арналған жеке аумақ: сауна, мұздай шомылу, джакузи, барбекю, айлақ және жағажай. Оралдан 20 минут.",
    cta: "Бағасын есептеу",
    ctaSecondary: "Үйлерді көру",
    badges: ["Halal Friendly", "Күндіз 16 қонаққа дейін", "Оралдан 20 минут"],
  },
  units: {
    title: "Үйлер",
    subtitle: "Демалыс форматын таңдаңыз — екі кісілік үйден бүкіл аумаққа дейін.",
    capacity: "қонақ",
    from: "бастап",
    perNight: "түн",
    select: "Таңдап, есептеу",
  },
  amenities: {
    title: "Не кіреді",
    subtitle: "Демалысқа қажеттің бәрі аумақта — қосымша сатып алудың қажеті жоқ.",
  },
  calc: {
    title: "Баға калькуляторы",
    subtitle: "Үйді, күндерді және қызметтерді таңдаңыз — сома бірден есептеледі.",
    unit: "Үй",
    checkin: "Кіру",
    checkout: "Шығу",
    guests: "Қонақтар",
    guestsNote: "түнеумен",
    addons: "Қосымша қызметтер",
    accommodation: "Тұру",
    addonsLabel: "Қызметтер",
    total: "Барлығы",
    prepay: "Алдын ала төлем",
    hintDates: "Соманы көру үшін кіру және шығу күндерін таңдаңыз.",
    weekday: "жұмыс күні",
    weekend: "демалыс",
    holiday: "мереке",
    night: "түн",
    perNight: "бір түнге",
    book: "Брондау",
    note: "Бұл алдын ала есеп. Онлайн төлем мен өтінім кейінірек қосылады.",
    summaryTitle: "Сіздің есебіңіз",
  },
  gallery: {
    title: "Галерея",
    subtitle: "Аумақ, үйлер және Шаған өзеніне көрініс.",
  },
  pricing: {
    title: "Бағалар",
    subtitle: "Жұмыс күндері, демалыс және мерекелер. Бәрі ашық.",
    unit: "Үй",
    weekday: "Жұмыс күні",
    weekend: "Демалыс",
    holiday: "Мерекелер",
    services: "Қосымша қызметтер",
  },
  reviews: {
    title: "Қонақтар пікірлері",
    subtitle: "Khan Orda-да демалған отбасылар не дейді.",
  },
  location: {
    title: "Қалай жетуге болады",
    subtitle: "Оралдан 20 минут, Шаған өзенінің жағасында.",
    addressLabel: "Мекенжай",
    address: "БҚО, Шаған өзенінің жағасы (Оралдан 20 минут)",
    routeLabel: "Маршрут",
    route: "Нақты нүкте мен кіру нұсқаулығын брондаудан кейін жібереміз.",
    mapNote: "Мұнда интерактивті карта болады",
  },
  faq: {
    title: "Жиі қойылатын сұрақтар",
    subtitle: "Кіру, ережелер және төлем туралы қысқаша.",
  },
  footer: {
    tagline: "Шаған өзенінің жағасындағы отбасылық Halal Friendly resort.",
    contacts: "Байланыс",
    nav: "Навигация",
    rights: "© 2026 Khan Orda Family Resort",
  },
  common: {
    langRu: "RU",
    langKz: "KZ",
    whatsapp: "WhatsApp-қа жазу",
  },
};

export const dictionaries: Record<Locale, Dict> = { ru, kz };
