// Content lists for the landing (RU). Extend to i18n later if needed.

export const CONTACT = {
  phone: "+7 700 000 00 00",
  phoneHref: "tel:+77000000000",
  whatsapp: "https://wa.me/77000000000",
  instagram: "https://instagram.com/",
  city: "Уральск, ЗКО",
};

export const AMENITIES: { icon: string; label: string }[] = [
  { icon: "Flame", label: "Сауна 3-в-1" },
  { icon: "Snowflake", label: "Холодная купель" },
  { icon: "Waves", label: "Джакузи круглый год" },
  { icon: "Beef", label: "Барбекю и мангал" },
  { icon: "Utensils", label: "Казан и коптильня" },
  { icon: "Tent", label: "Костровая зона" },
  { icon: "Anchor", label: "Пирс на реке Чаган" },
  { icon: "Umbrella", label: "Пляж и волейбол" },
  { icon: "Baby", label: "Детская площадка" },
  { icon: "Mic", label: "Караоке" },
  { icon: "BedDouble", label: "Халаты и полотенца" },
  { icon: "Coffee", label: "Посуда на 16 персон" },
];

export const GALLERY: { src: string; alt: string }[] = [
  { src: "/img/dawn-cabin.webp", alt: "Домик на рассвете у воды" },
  { src: "/img/sunset-tub.webp", alt: "Джакузи на закате" },
  { src: "/img/deck-chairs.webp", alt: "Терраса с шезлонгами" },
  { src: "/img/campfire-family.webp", alt: "Семья у костра" },
  { src: "/img/kids-beach.webp", alt: "Дети на пляже" },
  { src: "/img/hottub-couple-night.webp", alt: "Джакузи ночью" },
  { src: "/img/autumn-tea.webp", alt: "Осенний чай на террасе" },
  { src: "/img/aerial-golden.webp", alt: "Вид на территорию сверху" },
  { src: "/img/family-pier.webp", alt: "Семья на пирсе" },
  { src: "/img/bbq-dinner.webp", alt: "Ужин-барбекю" },
  { src: "/img/cabins-row.webp", alt: "Домики у леса" },
  { src: "/img/night-pier-stars.webp", alt: "Пирс под звёздами" },
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
    a: "Аренда всей приватной территории выбранного домика: сауна, купель, джакузи, барбекю-зона, пирс и пляж. Доп. услуги (баня, чан, завтрак, трансфер) добавляются по желанию в калькуляторе.",
  },
  {
    q: "До скольки человек можно приехать?",
    a: "С ночёвкой — по вместимости домика. Днём территория Riverside рассчитана до 16 гостей. Точную вместимость смотрите в карточке домика.",
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
