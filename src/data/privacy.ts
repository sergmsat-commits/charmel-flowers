// Текст Polityki prywatności на трёх языках.
// Юридическую силу имеет польская версия (pl); ru и en — переводы для удобства.
import { COMPANY, COMPANY_ADDRESS, LEGAL_EFFECTIVE_DATE } from './company';
import type { LegalDoc } from './legal-types';

const C = COMPANY;
const ADDR = COMPANY_ADDRESS;

// ─────────────────────────────── POLSKI ───────────────────────────────
const pl: LegalDoc = {
  title: 'Polityka prywatności',
  effectiveLabel: 'Polityka obowiązuje od',
  effective: LEGAL_EFFECTIVE_DATE.pl,
  sections: [
    {
      h: '1. Administrator danych',
      blocks: [
        {
          p: `Administratorem Twoich danych osobowych jest ${C.owner}, prowadząca jednoosobową działalność gospodarczą pod firmą ${C.name}, ${ADDR}, NIP: ${C.nip}, REGON: ${C.regon} (dalej: „Administrator” lub „my”).`,
        },
        {
          p: `W sprawach dotyczących danych osobowych możesz kontaktować się z nami e-mailem: ${C.email}, telefonicznie: ${C.phone} lub pisemnie na adres Administratora. Administrator nie wyznaczył inspektora ochrony danych.`,
        },
        {
          p: 'Niniejsza Polityka opisuje, jak przetwarzamy dane osobowe zgodnie z rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) w związku z korzystaniem ze strony charmelflowers.pl, składaniem zamówień i kontaktem z nami.',
        },
      ],
    },
    {
      h: '2. Jakie dane przetwarzamy',
      blocks: [
        {
          ul: [
            'dane osoby zamawiającej: imię i nazwisko, numer telefonu, adres e-mail,',
            'dane Odbiorcy zamówienia: imię i nazwisko, numer telefonu, adres dostawy,',
            'dane zamówienia: zamówione produkty, kwota, data i godzina dostawy, sposób odbioru i płatności, komentarz (np. treść kartki z życzeniami),',
            'dane dotyczące płatności online: informacja o statusie płatności przekazywana przez operatora Przelewy24 (nie mamy dostępu do danych Twojej karty ani logowania do banku),',
            'treść korespondencji, jeżeli kontaktujesz się z nami e-mailem, telefonicznie lub przez komunikator.',
          ],
        },
        {
          p: 'Dane Odbiorcy otrzymujemy od osoby zamawiającej, która powinna mieć podstawę do ich przekazania (np. wiedzę, że Odbiorca nie sprzeciwia się dostarczeniu mu przesyłki).',
        },
      ],
    },
    {
      h: '3. Cele i podstawy prawne przetwarzania',
      blocks: [
        {
          ul: [
            'zawarcie i wykonanie umowy sprzedaży, w tym kontakt w sprawie zamówienia i jego realizacja – art. 6 ust. 1 lit. b RODO,',
            'dostarczenie zamówienia Odbiorcy i kontakt z nim w sprawie dostawy – art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony interes polegający na wykonaniu zamówienia złożonego na rzecz Odbiorcy),',
            'wypełnienie obowiązków prawnych, w szczególności podatkowych i rachunkowych oraz związanych z reklamacjami i odstąpieniem od umowy – art. 6 ust. 1 lit. c RODO,',
            'ustalenie, dochodzenie lub obrona roszczeń – art. 6 ust. 1 lit. f RODO,',
            'odpowiadanie na wiadomości i zapytania – art. 6 ust. 1 lit. f RODO (lub lit. b, jeżeli zapytanie dotyczy zamówienia).',
          ],
        },
        {
          p: 'Podanie danych jest dobrowolne, ale niezbędne do złożenia i realizacji zamówienia.',
        },
      ],
    },
    {
      h: '4. Odbiorcy danych',
      blocks: [
        {
          p: 'Twoje dane możemy przekazywać wyłącznie w zakresie niezbędnym do realizacji powyższych celów:',
        },
        {
          ul: [
            'dostawcy hostingu i infrastruktury strony internetowej (Cloudflare, Inc.),',
            'dostawcy narzędzi komunikacyjnych, z których korzystamy do przyjmowania zamówień i kontaktu z Klientami (komunikator Telegram, poczta e-mail Google),',
            'kurierom realizującym dostawę (Uber, Wolt) – w zakresie imienia, numeru telefonu i adresu Odbiorcy,',
            'operatorowi płatności PayPro S.A. (Przelewy24), ul. Pastelowa 8, 60-198 Poznań – w zakresie niezbędnym do obsługi płatności; operator działa jako odrębny administrator danych,',
            'dostawcom komunikatorów i serwisów społecznościowych (WhatsApp, Instagram – Meta Platforms Ireland Ltd.; Telegram), jeżeli kontaktujesz się z nami za ich pośrednictwem – na zasadach określonych przez te serwisy,',
            'organom publicznym, jeżeli obowiązek przekazania danych wynika z przepisów prawa.',
          ],
        },
      ],
    },
    {
      h: '5. Przekazywanie danych poza Europejski Obszar Gospodarczy',
      blocks: [
        {
          p: 'Niektórzy z naszych dostawców (np. Cloudflare, Google, Meta, Telegram) mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. W takim przypadku przekazanie odbywa się na podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony (np. EU-US Data Privacy Framework), standardowych klauzul umownych zatwierdzonych przez Komisję Europejską lub innych mechanizmów przewidzianych w rozdziale V RODO.',
        },
      ],
    },
    {
      h: '6. Okres przechowywania danych',
      blocks: [
        {
          ul: [
            'dane związane z zamówieniem – przez czas realizacji umowy, a następnie do upływu okresu przedawnienia roszczeń z niej wynikających,',
            'dane w dokumentach księgowych – przez okres wymagany przepisami podatkowymi (co do zasady 5 lat od końca roku kalendarzowego, w którym upłynął termin płatności podatku),',
            'korespondencja – przez czas niezbędny do obsługi sprawy, a następnie do upływu okresu przedawnienia ewentualnych roszczeń.',
          ],
        },
      ],
    },
    {
      h: '7. Twoje prawa',
      blocks: [
        {
          p: 'W związku z przetwarzaniem danych masz prawo do:',
        },
        {
          ul: [
            'dostępu do swoich danych i otrzymania ich kopii,',
            'sprostowania danych,',
            'usunięcia danych,',
            'ograniczenia przetwarzania,',
            'przenoszenia danych (w zakresie danych przetwarzanych na podstawie umowy),',
            'wniesienia sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie,',
            'wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa, jeżeli uważasz, że przetwarzamy Twoje dane niezgodnie z prawem.',
          ],
        },
        {
          p: `Aby skorzystać ze swoich praw, napisz do nas na adres ${C.email}.`,
        },
        {
          p: 'Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym profilowaniu.',
        },
      ],
    },
    {
      h: '8. Pliki cookies i pamięć przeglądarki',
      blocks: [
        {
          ul: [
            'Strona nie wykorzystuje plików cookies analitycznych ani marketingowych.',
            'Zawartość koszyka i listy ulubionych jest zapisywana wyłącznie w pamięci Twojej przeglądarki (localStorage) na Twoim urządzeniu. Nie trafia do nas, dopóki nie złożysz zamówienia. Możesz ją usunąć, czyszcząc dane przeglądarki.',
            'Dostawca infrastruktury strony (Cloudflare) może stosować techniczne pliki cookies niezbędne do zapewnienia bezpieczeństwa i prawidłowego działania strony.',
            'Na stronie osadzona jest mapa Google Maps. Podczas jej wyświetlania Google może otrzymywać Twój adres IP i zapisywać własne pliki cookies – zgodnie z polityką prywatności Google: https://policies.google.com/privacy',
            'Ustawienia plików cookies możesz zmienić w swojej przeglądarce.',
          ],
        },
      ],
    },
    {
      h: '9. Zmiany Polityki prywatności',
      blocks: [
        {
          p: 'Polityka może być aktualizowana, np. w razie zmiany przepisów lub narzędzi, z których korzystamy. Aktualna wersja jest zawsze dostępna na tej stronie.',
        },
      ],
    },
  ],
};

// ─────────────────────────────── РУССКИЙ ───────────────────────────────
const ru: LegalDoc = {
  title: 'Политика конфиденциальности (Polityka prywatności)',
  note: 'Это перевод для удобства. Юридическую силу имеет польская версия Polityki prywatności.',
  effectiveLabel: 'Действует с',
  effective: LEGAL_EFFECTIVE_DATE.ru,
  sections: [
    {
      h: '1. Администратор данных',
      blocks: [
        {
          p: `Администратором ваших персональных данных является ${C.owner}, индивидуальный предприниматель (JDG), фирма ${C.name}, ${ADDR}, NIP: ${C.nip}, REGON: ${C.regon} (далее — «Администратор» или «мы»).`,
        },
        {
          p: `По вопросам персональных данных пишите нам на e-mail ${C.email}, звоните по телефону ${C.phone} или пишите по адресу Администратора. Инспектор по защите данных не назначен.`,
        },
        {
          p: 'Эта Политика описывает, как мы обрабатываем персональные данные в соответствии с Регламентом (ЕС) 2016/679 (GDPR / RODO) при использовании сайта charmelflowers.pl, оформлении заказов и связи с нами.',
        },
      ],
    },
    {
      h: '2. Какие данные мы обрабатываем',
      blocks: [
        {
          ul: [
            'данные заказчика: имя и фамилия, номер телефона, адрес e-mail,',
            'данные Получателя заказа: имя и фамилия, номер телефона, адрес доставки,',
            'данные заказа: заказанные товары, сумма, дата и время доставки, способ получения и оплаты, комментарий (например, текст открытки),',
            'данные об онлайн-оплате: информация о статусе платежа от оператора Przelewy24 (у нас нет доступа к данным вашей карты или входу в банк),',
            'содержание переписки, если вы связываетесь с нами по e-mail, телефону или в мессенджере.',
          ],
        },
        {
          p: 'Данные Получателя мы получаем от заказчика, у которого должно быть основание для их передачи (например, он знает, что Получатель не возражает против доставки ему заказа).',
        },
      ],
    },
    {
      h: '3. Цели и правовые основания обработки',
      blocks: [
        {
          ul: [
            'заключение и исполнение договора купли-продажи, включая связь по заказу и его выполнение — ст. 6 п. 1 лит. b GDPR,',
            'доставка заказа Получателю и связь с ним по поводу доставки — ст. 6 п. 1 лит. f GDPR (наш законный интерес — выполнить заказ, оформленный для Получателя),',
            'выполнение юридических обязанностей, в частности налоговых и бухгалтерских, а также связанных с рекламациями и отказом от договора — ст. 6 п. 1 лит. c GDPR,',
            'установление, предъявление или защита от претензий — ст. 6 п. 1 лит. f GDPR,',
            'ответы на сообщения и запросы — ст. 6 п. 1 лит. f GDPR (или лит. b, если запрос касается заказа).',
          ],
        },
        {
          p: 'Предоставление данных добровольно, но необходимо для оформления и выполнения заказа.',
        },
      ],
    },
    {
      h: '4. Получатели данных',
      blocks: [
        {
          p: 'Мы можем передавать ваши данные только в объёме, необходимом для указанных целей:',
        },
        {
          ul: [
            'поставщикам хостинга и инфраструктуры сайта (Cloudflare, Inc.),',
            'поставщикам средств связи, которыми мы пользуемся для приёма заказов и общения с клиентами (мессенджер Telegram, почта e-mail Google),',
            'курьерам, выполняющим доставку (Uber, Wolt), — имя, телефон и адрес Получателя,',
            'платёжному оператору PayPro S.A. (Przelewy24), ul. Pastelowa 8, 60-198 Poznań, — в объёме, необходимом для проведения платежа; оператор действует как самостоятельный администратор данных,',
            'мессенджерам и соцсетям (WhatsApp, Instagram — Meta Platforms Ireland Ltd.; Telegram), если вы связываетесь с нами через них, — на условиях этих сервисов,',
            'государственным органам, если обязанность передачи данных следует из закона.',
          ],
        },
      ],
    },
    {
      h: '5. Передача данных за пределы Европейской экономической зоны',
      blocks: [
        {
          p: 'Некоторые наши поставщики (например, Cloudflare, Google, Meta, Telegram) могут обрабатывать данные за пределами Европейской экономической зоны. В этом случае передача происходит на основании решения Европейской комиссии о надлежащем уровне защиты (например, EU-US Data Privacy Framework), стандартных договорных условий, утверждённых Европейской комиссией, или других механизмов, предусмотренных главой V GDPR.',
        },
      ],
    },
    {
      h: '6. Срок хранения данных',
      blocks: [
        {
          ul: [
            'данные, связанные с заказом, — в течение выполнения договора, а затем до истечения срока исковой давности по претензиям из него,',
            'данные в бухгалтерских документах — в течение срока, требуемого налоговым законодательством (как правило, 5 лет с конца календарного года, в котором истёк срок уплаты налога),',
            'переписка — в течение времени, необходимого для решения вопроса, а затем до истечения срока исковой давности по возможным претензиям.',
          ],
        },
      ],
    },
    {
      h: '7. Ваши права',
      blocks: [
        {
          p: 'В связи с обработкой данных вы имеете право:',
        },
        {
          ul: [
            'на доступ к своим данным и получение их копии,',
            'на исправление данных,',
            'на удаление данных,',
            'на ограничение обработки,',
            'на перенос данных (в отношении данных, обрабатываемых на основании договора),',
            'возразить против обработки, основанной на нашем законном интересе,',
            'подать жалобу Председателю Управления по защите персональных данных (Prezes Urzędu Ochrony Danych Osobowych), ul. Stawki 2, 00-193 Warszawa, если считаете, что мы обрабатываем ваши данные с нарушением закона.',
          ],
        },
        {
          p: `Чтобы воспользоваться своими правами, напишите нам на ${C.email}.`,
        },
        {
          p: 'Мы не принимаем в отношении вас решений, основанных исключительно на автоматизированной обработке, включая профилирование.',
        },
      ],
    },
    {
      h: '8. Файлы cookies и память браузера',
      blocks: [
        {
          ul: [
            'Сайт не использует аналитические или маркетинговые cookies.',
            'Содержимое корзины и списка избранного хранится только в памяти вашего браузера (localStorage) на вашем устройстве. Оно не попадает к нам, пока вы не оформите заказ. Его можно удалить, очистив данные браузера.',
            'Поставщик инфраструктуры сайта (Cloudflare) может использовать технические cookies, необходимые для безопасности и корректной работы сайта.',
            'На сайте встроена карта Google Maps. При её показе Google может получать ваш IP-адрес и сохранять собственные cookies — в соответствии с политикой конфиденциальности Google: https://policies.google.com/privacy',
            'Настройки cookies можно изменить в вашем браузере.',
          ],
        },
      ],
    },
    {
      h: '9. Изменения Политики конфиденциальности',
      blocks: [
        {
          p: 'Политика может обновляться, например при изменении законодательства или используемых нами инструментов. Актуальная версия всегда доступна на этой странице.',
        },
      ],
    },
  ],
};

// ─────────────────────────────── ENGLISH ───────────────────────────────
const en: LegalDoc = {
  title: 'Privacy Policy (Polityka prywatności)',
  note: 'This translation is provided for convenience. The Polish version of the Privacy Policy is legally binding.',
  effectiveLabel: 'Effective from',
  effective: LEGAL_EFFECTIVE_DATE.en,
  sections: [
    {
      h: '1. Data controller',
      blocks: [
        {
          p: `The controller of your personal data is ${C.owner}, a sole trader (JDG) operating under the business name ${C.name}, ${ADDR}, NIP: ${C.nip}, REGON: ${C.regon} (the "Controller" or "we").`,
        },
        {
          p: `For any personal data matters, contact us by e-mail at ${C.email}, by phone at ${C.phone} or in writing at the Controller's address. The Controller has not appointed a data protection officer.`,
        },
        {
          p: 'This Policy explains how we process personal data in accordance with Regulation (EU) 2016/679 (GDPR) when you use charmelflowers.pl, place orders and contact us.',
        },
      ],
    },
    {
      h: '2. What data we process',
      blocks: [
        {
          ul: [
            'orderer\'s data: full name, phone number, e-mail address,',
            'Recipient\'s data: full name, phone number, delivery address,',
            'order data: products ordered, amount, delivery date and time, fulfilment and payment method, comment (e.g. card message),',
            'online payment data: payment status information provided by the operator Przelewy24 (we have no access to your card details or bank login),',
            'the content of correspondence if you contact us by e-mail, phone or messenger.',
          ],
        },
        {
          p: 'We receive the Recipient\'s data from the person placing the order, who should have a basis for providing it (e.g. knowing that the Recipient does not object to receiving the delivery).',
        },
      ],
    },
    {
      h: '3. Purposes and legal bases',
      blocks: [
        {
          ul: [
            'concluding and performing the contract of sale, including contact about the order and fulfilling it – Art. 6(1)(b) GDPR,',
            'delivering the order to the Recipient and contacting them about delivery – Art. 6(1)(f) GDPR (our legitimate interest in fulfilling an order placed for the Recipient),',
            'complying with legal obligations, in particular tax and accounting obligations and those related to complaints and withdrawals – Art. 6(1)(c) GDPR,',
            'establishing, pursuing or defending claims – Art. 6(1)(f) GDPR,',
            'replying to messages and enquiries – Art. 6(1)(f) GDPR (or (b) if the enquiry concerns an order).',
          ],
        },
        {
          p: 'Providing data is voluntary but necessary to place and fulfil an order.',
        },
      ],
    },
    {
      h: '4. Recipients of data',
      blocks: [
        {
          p: 'We may share your data only to the extent necessary for the purposes above:',
        },
        {
          ul: [
            'website hosting and infrastructure providers (Cloudflare, Inc.),',
            'providers of communication tools we use to receive orders and contact customers (Telegram messenger, Google e-mail),',
            'couriers performing delivery (Uber, Wolt) – the Recipient\'s name, phone number and address,',
            'the payment operator PayPro S.A. (Przelewy24), ul. Pastelowa 8, 60-198 Poznań – to the extent necessary to process payments; the operator acts as an independent controller,',
            'messenger and social media providers (WhatsApp, Instagram – Meta Platforms Ireland Ltd.; Telegram) if you contact us through them – under those services\' terms,',
            'public authorities where required by law.',
          ],
        },
      ],
    },
    {
      h: '5. Transfers outside the European Economic Area',
      blocks: [
        {
          p: 'Some of our providers (e.g. Cloudflare, Google, Meta, Telegram) may process data outside the European Economic Area. In such cases the transfer is based on a European Commission adequacy decision (e.g. the EU-US Data Privacy Framework), standard contractual clauses approved by the European Commission, or other mechanisms provided for in Chapter V GDPR.',
        },
      ],
    },
    {
      h: '6. How long we keep data',
      blocks: [
        {
          ul: [
            'order-related data – for the duration of the contract and then until the limitation period for claims arising from it expires,',
            'data in accounting documents – for the period required by tax law (as a rule, 5 years from the end of the calendar year in which the tax payment deadline expired),',
            'correspondence – for as long as needed to handle the matter and then until the limitation period for any claims expires.',
          ],
        },
      ],
    },
    {
      h: '7. Your rights',
      blocks: [
        {
          p: 'You have the right to:',
        },
        {
          ul: [
            'access your data and receive a copy,',
            'rectify your data,',
            'erase your data,',
            'restrict processing,',
            'data portability (for data processed under a contract),',
            'object to processing based on our legitimate interest,',
            'lodge a complaint with the President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych), ul. Stawki 2, 00-193 Warszawa, if you believe we process your data unlawfully.',
          ],
        },
        {
          p: `To exercise your rights, write to us at ${C.email}.`,
        },
        {
          p: 'We do not make decisions about you based solely on automated processing, including profiling.',
        },
      ],
    },
    {
      h: '8. Cookies and browser storage',
      blocks: [
        {
          ul: [
            'The website does not use analytics or marketing cookies.',
            'Your cart and favourites are stored only in your browser\'s storage (localStorage) on your device. They are not sent to us until you place an order. You can delete them by clearing your browser data.',
            'Our website infrastructure provider (Cloudflare) may use technical cookies necessary for security and proper operation of the site.',
            'The website embeds a Google Maps map. When it is displayed, Google may receive your IP address and set its own cookies, in accordance with Google\'s privacy policy: https://policies.google.com/privacy',
            'You can change your cookie settings in your browser.',
          ],
        },
      ],
    },
    {
      h: '9. Changes to this Privacy Policy',
      blocks: [
        {
          p: 'This Policy may be updated, e.g. if the law or the tools we use change. The current version is always available on this page.',
        },
      ],
    },
  ],
};

export const PRIVACY: Record<'pl' | 'ru' | 'en', LegalDoc> = { pl, ru, en };
