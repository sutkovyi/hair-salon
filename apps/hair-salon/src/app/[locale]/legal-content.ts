type LegalDocument = {
  privacy: string;
  terms: string;
};

export const legalContent: Record<'uk' | 'en' | 'ru', LegalDocument> = {
  uk: {
    privacy: `<h1>Політика конфіденційності (Privacy Policy)</h1>
<p><em>Дата останнього оновлення: 22 вересня 2026 року</em><br /><em>Вебсайт: https://care-of-your-hair.n-sutkovoy.workers.dev/</em></p>
<h3>1. Загальні положення та Контролер даних</h3>
<p>Ця Політика конфіденційності регулює порядок збору, обробки та захисту персональних даних користувачів сайту. Контролером ваших персональних даних є власник сервісу / майстер (далі — «Виконавець»).</p>
<ul><li><strong>Електронна пошта для запитів із захисту даних:</strong> [Ваш e-mail]</li><li><strong>Телефон:</strong> [Ваш номер телефону]</li></ul>
<h3>2. Законодавча база (GDPR &amp; LOPDGDD)</h3>
<p>Обробка персональних даних здійснюється відповідно до:</p>
<ul><li>Регламенту ЄС 2016/679 (GDPR — General Data Protection Regulation);</li><li>Органичного закону Іспанії 3/2018 про захист персональних даних та гарантію цифрових прав (LOPDGDD);</li><li>Закону України «Про захист персональних даних».</li></ul>
<h3>3. Які дані ми збираємо</h3>
<p>Для забезпечення онлайн-запису ми збираємо такі категорії даних:</p>
<ul><li><strong>Ідентифікаційні дані:</strong> ім'я та прізвище;</li><li><strong>Контактні дані:</strong> номер телефону, адреса електронної пошти, нікнейм у месенджерах (Telegram, WhatsApp, Instagram);</li><li><strong>Дані бронювання:</strong> обрана послуга, дата та час візиту, історія відвідувань;</li><li><strong>Технічні дані:</strong> IP-адреса, файли cookies, технічні параметри браузера та пристрою.</li></ul>
<h3>4. Мета та законні підстави обробки</h3>
<ul><li><strong>Організація запису:</strong> підтвердження, нагадування про візит (через SMS, e-mail чи месенджери) та зв'язок у разі зміни графіка (підстава: виконання договору/послуги);</li><li><strong>Юридичні зобов'язання:</strong> ведення обліку та виконання податкових вимог;</li><li><strong>Технічна робота сайту:</strong> забезпечення коректного функціонування веб-сервісу.</li></ul>
<h3>5. Зберігання та передача даних третім особам</h3>
<p>Персональні дані зберігаються лише протягом строку, необхідного для надання послуг.<br />Ми не продаємо і не передаємо ваші дані третім особам у маркетингових цілях. Передача можлива лише постачальникам технічних інфраструктурних послуг (хостинг Cloudflare Workers, автоматизовані сервіси сповіщень) виключно в обсязі, необхідному для забезпечення роботи сервісу.</p>
<h3>6. Ваші права відповідно до GDPR</h3>
<p>Як суб'єкт даних ви маєте право на:</p>
<ul><li><strong>Право на доступ (Access):</strong> отримати підтвердження та копію ваших персональних даних;</li><li><strong>Право на виправлення (Rectification):</strong> виправити неточні або застарілі дані;</li><li><strong>Право на видалення (Erasure / "Right to be forgotten"):</strong> вимагати повного видалення ваших даних із нашої системи;</li><li><strong>Право на обмеження та заперечення (Restriction &amp; Objection):</strong> обмежити або заборонити обробку даних;</li><li><strong>Право на переносність даних (Data Portability).</strong></li></ul>
<p>Для реалізації будь-якого з цих прав надішліть запит на електронну пошту Контролера. Ви також маєте право подати скаргу до Іспанського агентства з захисту даних (AEPD — Agencia Española de Protección de Datos, aepd.es).</p>`,
    terms: `<h1>Умови використання та правила обслуговування (Terms of Service)</h1>
<p><em>Дата останнього оновлення: 22 вересня 2026 року</em><br /><em>Вебсайт: https://care-of-your-hair.n-sutkovoy.workers.dev/</em></p>
<h3>1. Предмет договору</h3>
<p>Цей документ є публічною офертою (умовами обслуговування) та регулює порядок бронювання, проведення та скасування послуг майстра-перукаря (далі — «Виконавець»), що замовляються через даний Сайт.</p>
<h3>2. Правила запізнення</h3>
<ul><li><strong>2.1. Допустиме запізнення:</strong> Час процедури розраховано за чітким графіком. Максимально допустимий час запізнення Клієнта становить 15 хвилин.</li><li><strong>2.2. Запізнення до 15 хвилин:</strong> Виконавець має право скоротити обсяг або час процедури (наприклад, скасувати додаткове укладання) без зменшення підсумкової вартості замовленої послуги.</li><li><strong>2.3. Запізнення понад 15 хвилин:</strong> Вважається нез'явленням на візит. Виконавець залишає за собою право скасувати запис для збереження графіка обслуговування наступних клієнтів.</li></ul>
<h3>3. Скасування та перенесення візиту</h3>
<ul><li><strong>3.1. Вчасне скасування:</strong> Клієнт може безкоштовно скасувати або перенести свій візит, повідомивши про це не пізніше ніж за 24 години до заброньованого часу.</li><li><strong>3.2. Пізнє скасування:</strong> У разі скасування візиту менше ніж за 24 години або нез'явлення без попередження, Виконавець має право вимагати передоплату для здійснення будь-яких наступних записів.</li></ul>
<h3>4. Передоплата (Завдаток)</h3>
<ul><li><strong>4.1.</strong> Для складних, тривалих або дорогих процедур Виконавець може встановлювати вимогу обов’язкової передоплати.</li><li><strong>4.2. Умови повернення:</strong><ul><li>Якщо візит скасовано/перенесено більше ніж за 24 години — передоплата повертається у повному обсязі або зараховується на наступне відвідування.</li><li>Якщо візит скасовано/перенесено менше ніж за 24 години або Клієнт не з'явився — передоплата не повертається і компенсує заброньований час майстра.</li></ul></li></ul>
<h3>5. Скасування з боку Виконавця</h3>
<p>У разі форс-мажорних обставин (хвороба, вимкнення комунікацій тощо) Виконавець зобов’язується негайно повідомити Клієнта та запропонувати найближчий зручний час для перенесення візиту або повернути внесену передоплату в повному обсязі.</p>
<h3>6. Контакти</h3>
<p>З усіх питань щодо обслуговування звертайтеся:</p>
<ul><li><strong>Телефон:</strong> [Ваш номер телефону]</li><li><strong>Email:</strong> [Ваш e-mail]</li></ul>`,
  },
  en: {
    privacy: `<h1>Privacy Policy</h1>
<p><em>Last Updated: September 22, 2026</em><br /><em>Website: https://care-of-your-hair.n-sutkovoy.workers.dev/</em></p>
<h3>1. General Provisions and Data Controller</h3>
<p>This Privacy Policy outlines how we collect, process, and protect your personal information when you use our website. The Data Controller responsible for your personal data is the service owner / stylist (hereinafter referred to as the "Service Provider").</p>
<ul><li><strong>Contact Email for Privacy Queries:</strong> [Your Email]</li><li><strong>Phone:</strong> [Your Phone Number]</li></ul>
<h3>2. Legal Framework (GDPR &amp; LOPDGDD)</h3>
<p>Your personal data is processed strictly in compliance with:</p>
<ul><li>EU Regulation 2016/679 (General Data Protection Regulation — GDPR);</li><li>Spanish Organic Law 3/2018 on Personal Data Protection and Guarantee of Digital Rights (LOPDGDD).</li></ul>
<h3>3. Data We Collect</h3>
<p>To process and manage online bookings, we collect the following information:</p>
<ul><li><strong>Identity Data:</strong> First name and last name;</li><li><strong>Contact Data:</strong> Phone number, email address, messaging handles (Telegram, WhatsApp, Instagram);</li><li><strong>Booking Details:</strong> Selected service, appointment date and time, appointment history;</li><li><strong>Technical Data:</strong> IP address, cookies, and device/browser details.</li></ul>
<h3>4. Purpose and Legal Basis for Processing</h3>
<ul><li><strong>Appointment Management:</strong> Processing bookings, sending appointment reminders (via SMS, email, or messaging apps), and managing schedule changes (Legal basis: Performance of a contract/service);</li><li><strong>Legal Compliance:</strong> Fulfilling tax, legal, and accounting requirements;</li><li><strong>Website Functionality:</strong> Ensuring proper operation and security of the web platform.</li></ul>
<h3>5. Data Retention and Third-Party Sharing</h3>
<p>Personal data is retained only as long as necessary to fulfill the booking service and legal obligations.<br />We do not sell or rent your personal data to third parties for marketing purposes. Data may only be shared with trusted technical service providers (Cloudflare Workers infrastructure, automated notification services) strictly to support core booking functions.</p>
<h3>6. Your GDPR Rights</h3>
<p>Under European privacy laws, you have the following rights:</p>
<ul><li><strong>Right of Access:</strong> Request confirmation and copies of your personal data;</li><li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data;</li><li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request the deletion of your personal data;</li><li><strong>Right to Restrict or Object:</strong> Limit or object to data processing activities;</li><li><strong>Right to Data Portability.</strong></li></ul>
<p>To exercise any of these rights, please contact us via email. You also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD — Agencia Española de Protección de Datos, aepd.es).</p>`,
    terms: `<h1>Terms of Service and Appointment Rules</h1>
<p><em>Last Updated: September 22, 2026</em><br /><em>Website: https://care-of-your-hair.n-sutkovoy.workers.dev/</em></p>
<h3>1. Scope of Agreement</h3>
<p>These Terms of Service govern the booking, scheduling, and delivery of hair care and styling services (hereinafter referred to as the "Services") booked through this Website.</p>
<h3>2. Late Arrival Policy</h3>
<ul><li><strong>2.1. Grace Period:</strong> Services are scheduled strictly on time. The maximum allowable delay for an appointment is 15 minutes.</li><li><strong>2.2. Arrivals within 15 Minutes:</strong> The Service Provider reserves the right to shorten the duration or scope of the service (e.g., omitting final styling) while charging the full original service price.</li><li><strong>2.3. Arrivals beyond 15 Minutes:</strong> Delays exceeding 15 minutes will be treated as a no-show. The appointment may be canceled to prevent delays for subsequent clients.</li></ul>
<h3>3. Cancellation and Rescheduling Policy</h3>
<ul><li><strong>3.1. Advance Notice:</strong> Clients can cancel or reschedule their appointment free of charge at least 24 hours prior to the scheduled time.</li><li><strong>3.2. Late Cancellation:</strong> For cancellations made less than 24 hours in advance or no-shows, the Service Provider reserves the right to require a non-refundable deposit for any future bookings.</li></ul>
<h3>4. Deposit Policy</h3>
<ul><li><strong>4.1.</strong> Complex or long-duration services may require an upfront deposit to secure the time slot.</li><li><strong>4.2. Refund Conditions:</strong><ul><li>Deposits are fully refundable if the cancellation or rescheduling request is made at least 24 hours before the scheduled appointment.</li><li>Deposits are non-refundable for late cancellations (less than 24 hours notice) or no-shows.</li></ul></li></ul>
<h3>5. Cancellations by the Service Provider</h3>
<p>In the event of unforeseen circumstances or force majeure (e.g., illness, utility outages), the Service Provider will notify the Client as early as possible and offer an alternative appointment time or issue a full refund of any deposit paid.</p>
<h3>6. Contact Information</h3>
<p>For questions or schedule modifications, please contact:</p>
<ul><li><strong>Phone:</strong> [Your Phone Number]</li><li><strong>Email:</strong> [Your Email]</li></ul>`,
  },
  ru: {
    privacy: `<h1>Политика конфиденциальности</h1>
<p><em>Последнее обновление: 22 сентября 2026 года</em><br /><em>Сайт: https://care-of-your-hair.n-sutkovoy.workers.dev/</em></p>
<h3>1. Общие положения</h3>
<p>Эта политика объясняет, как мы собираем, используем и защищаем ваши персональные данные при использовании сайта.</p>
<h3>2. Какие данные мы собираем</h3>
<p>Мы можем получать ваше имя, телефон, электронную почту, выбранную услугу и технические данные, необходимые для связи и записи.</p>
<h3>3. Ваши права</h3>
<p>Вы можете запросить доступ, исправление или удаление ваших персональных данных, связавшись с нами по электронной почте.</p>`,
    terms: `<h1>Условия обслуживания и правила записи</h1>
<p><em>Последнее обновление: 22 сентября 2026 года</em><br /><em>Сайт: https://care-of-your-hair.n-sutkovoy.workers.dev/</em></p>
<h3>1. Запись</h3>
<p>Визит считается подтвержденным после согласования даты и времени с мастером.</p>
<h3>2. Опоздания и отмены</h3>
<p>Максимально допустимое опоздание составляет 15 минут. Об отмене или переносе визита необходимо сообщить заранее.</p>
<h3>3. Контакты</h3>
<p>По вопросам услуг и записи свяжитесь с мастером по телефону или через WhatsApp.</p>`,
  },
};
