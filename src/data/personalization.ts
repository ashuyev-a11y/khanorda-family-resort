export type RestFormat =
  | "family"
  | "couple"
  | "birthday"
  | "spa"
  | "friends"
  | "browse";

export type ImportantKey = "banya" | "jacuzzi" | "fishing" | "bbq" | "play";

export const FORMAT_OPTIONS: {
  key: RestFormat;
  label: string;
  emoji: string;
  resultName: string;
  houseName: string;
}[] = [
  {
    key: "family",
    label: "Семья",
    emoji: "👨‍👩‍👧",
    resultName: "семьи",
    houseName: "A-Frame №1",
  },
  {
    key: "couple",
    label: "Вдвоём",
    emoji: "❤️",
    resultName: "вечера вдвоём",
    houseName: "A-Frame №1",
  },
  {
    key: "birthday",
    label: "День рождения",
    emoji: "🎂",
    resultName: "праздника",
    houseName: "A-Frame №2",
  },
  {
    key: "spa",
    label: "SPA",
    emoji: "♨️",
    resultName: "SPA-отдыха",
    houseName: "A-Frame №2",
  },
  {
    key: "friends",
    label: "Компания",
    emoji: "🏕",
    resultName: "компании",
    houseName: "A-Frame №2",
  },
  {
    key: "browse",
    label: "Просто смотрю",
    emoji: "✦",
    resultName: "вас",
    houseName: "A-Frame №1",
  },
];

export const IMPORTANT_OPTIONS: {
  key: ImportantKey;
  label: string;
  emoji: string;
}[] = [
  { key: "banya", label: "Баня", emoji: "♨️" },
  { key: "jacuzzi", label: "Джакузи", emoji: "🛁" },
  { key: "fishing", label: "Рыбалка", emoji: "🎣" },
  { key: "bbq", label: "BBQ", emoji: "🔥" },
  { key: "play", label: "Детская площадка", emoji: "🧸" },
];

export const INCLUDED_BY_FORMAT: Record<
  RestFormat | "default",
  {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; note: string }[];
  }
> = {
  default: {
    title: "Что входит в ваш отдых",
    subtitle: "Всё включено — дом, SPA-зона, территория у реки и приватность.",
    items: [
      { icon: "⌂", title: "Дом до 16 гостей", note: "лофт, кухня, спальня" },
      { icon: "♨", title: "Private SPA", note: "баня, купель, джакузи" },
      { icon: "◈", title: "Территория", note: "BBQ, площадка, костёр" },
      { icon: "≈", title: "У реки", note: "пирс, пляж и тишина" },
    ],
  },
  family: {
    title: "Для вашей семьи уже включено",
    subtitle: "Мы подобрали то, что важно для отдыха с детьми.",
    items: [
      { icon: "🧸", title: "Детская площадка", note: "безопасно и рядом" },
      { icon: "🌳", title: "Закрытая территория", note: "только ваша семья" },
      { icon: "♨", title: "Баня 3 в 1", note: "на дровах" },
      { icon: "🛁", title: "Джакузи", note: "круглый год" },
    ],
  },
  couple: {
    title: "Для вашего вечера вдвоём",
    subtitle: "Тихо, тепло и только вы двое.",
    items: [
      { icon: "🛁", title: "Джакузи под небом", note: "закат и звёзды" },
      { icon: "✷", title: "Костровая зона", note: "вечер у огня" },
      { icon: "🌙", title: "Полная тишина", note: "приватная территория" },
      { icon: "♨", title: "Баня и купель", note: "на двоих" },
    ],
  },
  birthday: {
    title: "Для вашего праздника включено",
    subtitle: "Всё для большого дня рождения на своей территории.",
    items: [
      { icon: "🔥", title: "BBQ и казан", note: "на большую компанию" },
      { icon: "🎤", title: "Караоке", note: "для своих" },
      { icon: "✷", title: "Костровая зона", note: "вечер у огня" },
      { icon: "🎈", title: "Место под декор", note: "удобно украсить" },
    ],
  },
  spa: {
    title: "Для вашего SPA-отдыха",
    subtitle: "Баня, купель и джакузи — весь ритуал без посторонних.",
    items: [
      { icon: "♨", title: "Баня 3 в 1", note: "финская, русская, хамам" },
      { icon: "❄", title: "Холодная купель", note: "контраст после пара" },
      { icon: "🛁", title: "Джакузи", note: "под открытым небом" },
      { icon: "🕯", title: "Зона отдыха", note: "чай и тишина" },
    ],
  },
  friends: {
    title: "Для вашей компании включено",
    subtitle: "Простор, огонь и вся территория только для вас.",
    items: [
      { icon: "🔥", title: "BBQ-зона", note: "мангал и казан" },
      { icon: "🎤", title: "Караоке", note: "для своих" },
      { icon: "🏖", title: "Пляж и пирс", note: "выход к реке" },
      { icon: "✷", title: "Костровая зона", note: "вечер допоздна" },
    ],
  },
  browse: {
    title: "Что стоит посмотреть первым",
    subtitle: "Короткий маршрут по главным зонам Khan Orda.",
    items: [
      { icon: "⌂", title: "Дом A-Frame", note: "лофт и второй свет" },
      { icon: "♨", title: "SPA-зона", note: "баня, купель, джакузи" },
      { icon: "🔥", title: "BBQ", note: "казан и мангал" },
      { icon: "≈", title: "Пирс", note: "река Чаган" },
    ],
  },
};

export const DAY_CARDS = [
  {
    src: "/img/real-pier.webp",
    time: "Утро",
    title: "Кофе у реки",
    text: "Тишина, пирс на Чагане и медленное начало дня.",
  },
  {
    src: "/img/real-bbq-pergola.webp",
    time: "День",
    title: "Обед на огне",
    text: "BBQ, казан и время только для своих.",
  },
  {
    src: "/img/real-jacuzzi.webp",
    time: "Вечер",
    title: "Баня и джакузи",
    text: "Пар, купель и горячая вода под открытым небом.",
  },
  {
    src: "/img/real-lounge-ornament.webp",
    time: "Ночь",
    title: "Костёр и звёзды",
    text: "Тёплый вечер, разговоры и полная приватность.",
  },
];

export const PERSONAL_GALLERY: {
  src: string;
  cap: string;
  cats: string[];
}[] = [
  { src: "/img/real-pier.webp", cap: "Собственный пирс", cats: ["river", "family", "friends"] },
  { src: "/img/real-jacuzzi.webp", cap: "Джакузи под небом", cats: ["evening", "couple", "spa"] },
  { src: "/img/real-sauna.webp", cap: "Баня 3 в 1", cats: ["spa"] },
  { src: "/img/real-hottub-barrel.webp", cap: "Холодная купель", cats: ["spa"] },
  { src: "/img/real-lounge-ornament.webp", cap: "Вечер у камина", cats: ["evening", "couple", "birthday"] },
  { src: "/img/real-bbq-pergola.webp", cap: "BBQ-зона", cats: ["bbq", "friends", "birthday", "family"] },
  { src: "/img/real-kazan.webp", cap: "Казан и мангал", cats: ["bbq", "friends", "birthday"] },
  { src: "/img/real-playground.webp", cap: "Детская площадка", cats: ["kids", "family"] },
  { src: "/img/real-dining-aerial.webp", cap: "Ужин большой семьёй", cats: ["evening", "family", "friends", "birthday"] },
  { src: "/img/real-living-wide.webp", cap: "Двусветная гостиная", cats: ["home"] },
  { src: "/img/real-grounds.webp", cap: "Закрытая территория", cats: ["family", "kids", "friends"] },
  { src: "/img/real-exterior.webp", cap: "Дом у воды", cats: ["river", "home"] },
];

export const REVIEWS_BY_FORMAT: Record<
  Exclude<RestFormat, "browse">,
  { initial: string; name: string; source: string; text: string; color: string }
> = {
  family: {
    initial: "А",
    name: "Айгуль",
    source: "2GIS · июнь 2026",
    color: "#8B6849",
    text: "Дети почти весь день были на площадке и у воды, а мы спокойно готовили BBQ. Территория полностью закрытая.",
  },
  couple: {
    initial: "А",
    name: "Аружан",
    source: "Instagram · май 2026",
    color: "#C67B52",
    text: "Отмечали годовщину. Джакузи на закате, костёр и полная тишина — идеально вдвоём.",
  },
  birthday: {
    initial: "Д",
    name: "Данияр",
    source: "Instagram · май 2026",
    color: "#2F4B63",
    text: "Отмечали день рождения. Караоке, казан, костёр — гости в восторге.",
  },
  spa: {
    initial: "М",
    name: "Мадина",
    source: "2GIS · апрель 2026",
    color: "#8B6849",
    text: "Баня — отдельная история. Пар мягкий, купель ледяная, джакузи топили до полуночи.",
  },
  friends: {
    initial: "Т",
    name: "Тимур",
    source: "2GIS · июль 2026",
    color: "#2F4B63",
    text: "Собрались компанией. Места хватило всем, BBQ и караоке — то что нужно.",
  },
};

export function formatLabel(format: RestFormat): string {
  return FORMAT_OPTIONS.find((f) => f.key === format)?.resultName ?? "вас";
}

export function galleryCategories(format: RestFormat): string[] | null {
  const map: Partial<Record<RestFormat, string[]>> = {
    family: ["family", "kids", "river"],
    couple: ["couple", "evening", "spa"],
    birthday: ["birthday", "evening", "bbq"],
    spa: ["spa", "evening"],
    friends: ["friends", "bbq", "river"],
  };
  return map[format] ?? null;
}
