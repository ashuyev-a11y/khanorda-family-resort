// Content lists for the landing (RU). Extend to i18n later if needed.

export const CONTACT = {
  phone: "+7 701 777 73 66",
  phoneHref: "tel:+77017777366",
  whatsapp: "https://wa.me/77017777366",
  instagram: "https://instagram.com/",
  city: "Уральск, ЗКО",
};

// ---------------------------------------------------------------------------
//  Карта в разделе «Как добраться».
//  Замените embedSrc на «Встроить карту» из Google Maps (Поделиться → Встроить
//  карту → скопировать ссылку из src="..."), чтобы поставить точную точку.
//  Сейчас — общий район (Уральск / берег Чагана), без точного адреса.
// ---------------------------------------------------------------------------
export const MAP = {
  // Точка Khan Orda (из ссылки заказчика). Чтобы сменить — вставьте координаты
  // «lat,lng» из Google Maps в q=.
  embedSrc:
    "https://www.google.com/maps?q=51.291707,51.374457&z=14&hl=ru&output=embed",
  caption: "Khan Orda на карте — берег реки Чаган, 20 минут от Уральска.",
};

// Удобства раздела «Что входит». photos — карусель по клику на карточку.
export const AMENITIES: { icon: string; label: string; photos: string[] }[] = [
  {
    icon: "Home",
    label: "Дом до 16 гостей",
    photos: [
      "/img/ph-8857.webp",
      "/img/ph-8867.webp",
      "/img/ph-8868.webp",
      "/img/ph-8853.webp",
      "/img/ph-8863.webp",
      "/img/ph-8865.webp",
      "/img/ph-8858.webp",
      "/img/ph-8877.webp",
    ],
  },
  {
    icon: "Flame",
    label: "Баня на дровах",
    photos: [
      "/img/ph-8891.webp",
      "/img/ph-8892.webp",
      "/img/ph-8885.webp",
      "/img/ph-8881.webp",
      "/img/ph-8879.webp",
      "/img/ph-8890.webp",
      "/img/ph-8883.webp",
    ],
  },
  {
    icon: "Snowflake",
    label: "Купель с ледяной водой",
    photos: ["/img/ph-8844.webp", "/img/ph-8845.webp"],
  },
  { icon: "Waves", label: "Джакузи с подогревом", photos: ["/img/ph-8849.webp"] },
  {
    icon: "Beef",
    label: "Мангальная зона",
    photos: ["/img/ph-8887.webp", "/img/ph-8873.webp", "/img/ph-8889.webp"],
  },
  { icon: "Utensils", label: "Очаг с казаном", photos: ["/img/ph-8888.webp"] },
  {
    icon: "Baby",
    label: "Детская игровая площадка",
    photos: ["/img/ph-8850.webp"],
  },
  {
    icon: "Anchor",
    label: "Выход к реке с пирсом",
    photos: ["/img/ph-8848.webp", "/img/ph-8847.webp"],
  },
  { icon: "Trees", label: "Закрытая территория", photos: ["/img/ph-8846.webp"] },
  { icon: "Car", label: "Бесплатная парковка", photos: [] },
];

// Фото для каруселей домов (дома одинаковые — общий набор-тур).
export const HOUSE_PHOTOS = [
  "/img/ph-8844.webp", // экстерьер + купель
  "/img/ph-8857.webp", // гостиная-столовая
  "/img/ph-8868.webp", // гостиная
  "/img/ph-8863.webp", // спальня
  "/img/ph-8865.webp", // спальня
  "/img/ph-8849.webp", // джакузи
  "/img/ph-8848.webp", // пирс на реке
  "/img/ph-8877.webp", // санузел
];

export const GALLERY: { src: string; alt: string }[] = [
  { src: "/img/real-pier.webp", alt: "Пирс на реке Чаган" },
  { src: "/img/real-grounds.webp", alt: "Приватная территория с вечерней подсветкой" },
  { src: "/img/real-jacuzzi.webp", alt: "Джакузи на террасе" },
  { src: "/img/real-hottub-barrel.webp", alt: "Купель-бочка под открытым небом" },
  { src: "/img/real-sauna.webp", alt: "Сауна на дровах" },
  { src: "/img/real-sauna-relax.webp", alt: "Комната отдыха с видом на бассейн" },
  { src: "/img/real-spa-panel.webp", alt: "SPA-зона" },
  { src: "/img/real-bbq-pergola.webp", alt: "BBQ-беседка" },
  { src: "/img/real-kazan.webp", alt: "Казан на очаге" },
  { src: "/img/real-living-chandelier.webp", alt: "Гостиная с люстрой" },
  { src: "/img/real-bedroom.webp", alt: "Спальня на мансарде" },
  { src: "/img/real-playground.webp", alt: "Детская площадка" },
];

export const REVIEWS: { name: string; text: string; rating: number; source: string }[] = [
  {
    name: "Айгуль",
    text: "Отдыхали всей семьёй — дети в восторге от пляжа и площадки, а мы от бани и джакузи. Территория только наша, никого лишнего.",
    rating: 5,
    source: "2GIS",
  },
  {
    name: "Данияр",
    text: "Приезжали на день рождения. Барбекю, караоке, костёр — всё уже готово. Хозяева на связи, заезд без проблем.",
    rating: 5,
    source: "Instagram",
  },
  {
    name: "Мария",
    text: "Романтический вечер на двоих: чан, тишина, вид на Чаган. Вернёмся зимой обязательно.",
    rating: 5,
    source: "2GIS",
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Что входит в стоимость?",
    a: "Всё включено. За стоимость аренды (будни 100 000 ₸, выходные 150 000 ₸ в сутки) — весь дом A-Frame с приватной территорией: баня, купель с ледяной водой, джакузи на террасе, беседка с мангалом, детская игровая площадка и выход к реке с пирсом. Отдельно по желанию можно добавить только завтрак и трансфер.",
  },
  {
    q: "До скольки человек можно приехать?",
    a: "Каждый дом рассчитан на размещение до 16 человек. Всего в комплексе 4 одинаковых дома A-Frame. Для больших компаний можно забронировать несколько домов.",
  },
  {
    q: "Halal Friendly — что это значит?",
    a: "На территории не подаётся и не приветствуется алкоголь. Кухня и атмосфера рассчитаны на комфортный семейный отдых.",
  },
  {
    q: "Как оплатить и забронировать?",
    a: "Сейчас сайт показывает предварительный расчёт стоимости. Для брони свяжитесь с нами в WhatsApp — онлайн-оплата появится на следующем этапе.",
  },
  {
    q: "Во сколько заезд и выезд?",
    a: "Стандартный заезд с 15:00, выезд до 12:00. Поздний выезд можно добавить как отдельную услугу.",
  },
  {
    q: "Можно с детьми?",
    a: "Да, курорт семейный: детская площадка, пляж и безопасная территория. Дети размещаются бесплатно.",
  },
];
