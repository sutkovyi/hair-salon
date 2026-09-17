export type Language = 'uk' | 'en';

export const copy = {
  uk: {
    nav: ['Послуги', 'Ціни', 'Про нас', 'Контакти'], book: 'Записатися', eyebrow: 'Салон краси · Київ', title: 'Підкресліть вашу природну красу', intro: 'Професійний догляд, досвідчені майстри та атмосфера релаксу в центрі міста.', servicesTitle: 'Наші послуги', servicesIntro: 'Індивідуальний підхід до кожного клієнта', pricesTitle: 'Прайс-лист', pricesIntro: 'Популярні процедури та вартість', aboutTitle: 'Про L’Élégance', about: 'Ми створили простір, де ви можете відпочити від міського шуму та довірити турботу про свою зовнішність справжнім професіоналам.', aboutSecond: 'У своїй роботі ми використовуємо преміальну косметику, сертифіковане обладнання та дотримуємося найсуворіших стандартів стерилізації.', visitTitle: 'Завітайте до нас', visitIntro: 'Чекаємо на вас щодня', address: 'м. Київ, вул. Хрещатик, 15', hours: 'Пн–Нд: 09:00 — 21:00', name: 'Ваше ім’я', phone: 'Номер телефону', service: 'Оберіть послугу', comment: 'Бажана дата або коментар', submit: 'Надіслати заявку', sent: 'Дякуємо! Ми зателефонуємо вам для підтвердження.', close: 'Закрити',
  },
  en: {
    nav: ['Services', 'Prices', 'About us', 'Contact'], book: 'Book now', eyebrow: 'Beauty salon · Kyiv', title: 'Reveal your natural beauty', intro: 'Professional care, experienced stylists, and an atmosphere of calm in the heart of the city.', servicesTitle: 'Our services', servicesIntro: 'A personal approach for every client', pricesTitle: 'Price list', pricesIntro: 'Popular treatments and pricing', aboutTitle: 'About L’Élégance', about: 'We created a space where you can step away from the city and trust your beauty to true professionals.', aboutSecond: 'We work with premium cosmetics, certified equipment, and the highest standards of sterilization.', visitTitle: 'Come visit us', visitIntro: 'We are here for you every day', address: '15 Khreshchatyk Street, Kyiv', hours: 'Mon–Sun: 09:00 — 21:00', name: 'Your name', phone: 'Phone number', service: 'Choose a service', comment: 'Preferred date or comment', submit: 'Send request', sent: 'Thank you! We will call you to confirm.', close: 'Close',
  },
} as const;

export const services = [
  { icon: '✂', title: { uk: 'Перукарські послуги', en: 'Hair services' }, text: { uk: 'Стрижки, укладки, складні техніки фарбування та догляд за волоссям.', en: 'Cuts, styling, advanced colour techniques, and hair care.' } },
  { icon: '✦', title: { uk: 'Нігтьовий сервіс', en: 'Nail service' }, text: { uk: 'Манікюр, педикюр, покриття гелем та авторський дизайн нігтів.', en: 'Manicure, pedicure, gel polish, and signature nail design.' } },
  { icon: '✧', title: { uk: 'Косметологія', en: 'Cosmetology' }, text: { uk: 'Догляд за шкірою, чистки, пілінги та антивікові процедури.', en: 'Facial care, cleansing, peels, and age-defying treatments.' } },
  { icon: '◌', title: { uk: 'Візаж та брови', en: 'Makeup & brows' }, text: { uk: 'Денний та вечірній макіяж, ламінування та корекція брів.', en: 'Day and evening makeup, brow lamination, and shaping.' } },
];

export const prices = [
  { uk: 'Жіноча стрижка + укладка', en: 'Women’s cut + styling', price: 'від 600 грн' },
  { uk: 'Складне фарбування AirTouch / Balayage', en: 'AirTouch / Balayage colour', price: 'від 2 200 грн' },
  { uk: 'Комплексний манікюр з покриттям', en: 'Manicure with gel polish', price: '650 грн' },
  { uk: 'Педикюр: догляд + покриття', en: 'Pedicure: care + polish', price: '800 грн' },
  { uk: 'Комбінована чистка обличчя', en: 'Combined facial cleansing', price: '950 грн' },
  { uk: 'Ламінування брів та вій', en: 'Brow and lash lamination', price: '750 грн' },
];

export type Copy = (typeof copy)[Language];
