// Реквизиты фирмы — единый источник для страницы «Контакты», подвала,
// Regulaminu и Polityki prywatności. Меняешь здесь — меняется везде.
export const COMPANY = {
  name: 'Volha Serbina Charmel Flowers Studio',
  owner: 'Volha Serbina',
  street: 'ul. Stryjeńskich 6/lok. UH1B',
  postalCode: '02-791',
  city: 'Warszawa',
  nip: '5214152885',
  regon: '544002526',
  email: 'charmelflowers.warsaw@gmail.com',
  phone: '+48 514 011 410',
  phoneHref: 'tel:+48514011410',
  site: 'charmelflowers.pl',
} as const;

export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;

// Дата вступления документов в силу (показывается в Regulaminie и Polityce).
export const LEGAL_EFFECTIVE_DATE = {
  pl: '14 października 2026 r.',
  ru: '14 октября 2026 г.',
  en: '14 October 2026',
} as const;
