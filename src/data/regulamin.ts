// Текст Regulaminu (правил магазина) на трёх языках.
// Юридическую силу имеет польская версия (pl); ru и en — переводы для удобства.
import { COMPANY, COMPANY_ADDRESS, LEGAL_EFFECTIVE_DATE } from './company';
import type { LegalDoc } from './legal-types';

const C = COMPANY;
const ADDR = COMPANY_ADDRESS;

// ─────────────────────────────── POLSKI ───────────────────────────────
const pl: LegalDoc = {
  title: 'Regulamin sklepu internetowego Charmel Flowers',
  effectiveLabel: 'Regulamin obowiązuje od',
  effective: LEGAL_EFFECTIVE_DATE.pl,
  sections: [
    {
      h: '§ 1. Postanowienia ogólne',
      blocks: [
        {
          ol: [
            `Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego Charmel Flowers dostępnego pod adresem ${C.site} (dalej: „Sklep”), w szczególności zasady składania zamówień, płatności, dostawy, anulowania zamówień, odstąpienia od umowy oraz składania reklamacji.`,
            `Sklep prowadzi ${C.owner}, prowadząca jednoosobową działalność gospodarczą pod firmą ${C.name}, ${ADDR}, NIP: ${C.nip}, REGON: ${C.regon}, wpisana do Centralnej Ewidencji i Informacji o Działalności Gospodarczej (CEIDG) (dalej: „Sprzedawca”).`,
            {
              t: 'Kontakt ze Sprzedawcą:',
              ul: [
                `e-mail: ${C.email}`,
                `telefon: ${C.phone}`,
                `adres do korespondencji (także dla reklamacji i zwrotów): ${ADDR}`,
              ],
            },
            'Regulamin jest udostępniony nieodpłatnie na stronie Sklepu w sposób umożliwiający jego pobranie, utrwalenie i wydrukowanie. Przed złożeniem zamówienia Klient zobowiązany jest zapoznać się z Regulaminem i go zaakceptować.',
          ],
        },
      ],
    },
    {
      h: '§ 2. Definicje',
      blocks: [
        {
          ul: [
            'Klient – osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, która składa zamówienie w Sklepie.',
            'Konsument – Klient będący osobą fizyczną, dokonujący ze Sprzedawcą czynności prawnej niezwiązanej bezpośrednio z jego działalnością gospodarczą lub zawodową.',
            'Przedsiębiorca na prawach konsumenta – osoba fizyczna zawierająca umowę bezpośrednio związaną z jej działalnością gospodarczą, gdy z treści tej umowy wynika, że nie posiada ona dla niej charakteru zawodowego (art. 38a Ustawy).',
            'Odbiorca – osoba wskazana przez Klienta, której ma zostać doręczone zamówienie (może nią być sam Klient).',
            'Produkt – bukiet, kompozycja kwiatowa, wieniec lub inny towar (w tym dodatek do bukietu) prezentowany w Sklepie.',
            'Zamówienie – oświadczenie woli Klienta zmierzające do zawarcia umowy sprzedaży Produktów.',
            'Ustawa – ustawa z dnia 30 maja 2014 r. o prawach konsumenta.',
          ],
        },
      ],
    },
    {
      h: '§ 3. Wymagania techniczne',
      blocks: [
        {
          ol: [
            'Do korzystania ze Sklepu niezbędne jest urządzenie z dostępem do internetu, aktualna przeglądarka internetowa z włączoną obsługą JavaScript, aktywny adres e-mail oraz numer telefonu.',
            'Zakazane jest dostarczanie przez Klienta treści o charakterze bezprawnym.',
          ],
        },
      ],
    },
    {
      h: '§ 4. Produkty i ceny',
      blocks: [
        {
          ol: [
            'Ceny Produktów podane w Sklepie są cenami całkowitymi wyrażonymi w złotych polskich (PLN). Cena Produktu zależy od wybranego rozmiaru (wariantu).',
            'Cena Produktów nie obejmuje kosztu dostawy. Koszt dostawy zależy od adresu Odbiorcy oraz aktualnej stawki przewoźnika (Uber lub Wolt). Sprzedawca informuje Klienta o wysokości kosztu dostawy przed realizacją zamówienia. Jeżeli Klient nie zaakceptuje kosztu dostawy, może zrezygnować z zamówienia bez ponoszenia jakichkolwiek kosztów.',
            'Bukiety i kompozycje są wykonywane ręcznie z naturalnych kwiatów, dlatego każdy z nich jest niepowtarzalny. Zdjęcia w Sklepie przedstawiają przykładowe wykonanie Produktu. Rzeczywisty wygląd może nieznacznie różnić się od zdjęcia (np. odcieniem kwiatów lub stopniem rozwinięcia pąków), przy zachowaniu stylu, kolorystyki i wartości Produktu.',
            'W przypadku chwilowego braku danego gatunku lub odmiany kwiatów Sprzedawca może, wyłącznie po uzgodnieniu z Klientem, zastąpić go innym o podobnym charakterze i nie niższej wartości. Jeżeli Klient nie wyrazi zgody, może anulować zamówienie na zasadach określonych w § 8.',
          ],
        },
      ],
    },
    {
      h: '§ 5. Składanie zamówień i zawarcie umowy',
      blocks: [
        {
          ol: [
            'Zamówienia można składać przez stronę Sklepu przez całą dobę. Zamówienia można też składać telefonicznie lub za pośrednictwem komunikatorów (WhatsApp, Telegram, Instagram) – w takim przypadku postanowienia Regulaminu stosuje się odpowiednio.',
            {
              t: 'Aby złożyć zamówienie przez stronę Sklepu, Klient:',
              ul: [
                'dodaje wybrane Produkty (w wybranym rozmiarze) do koszyka,',
                'podaje w formularzu swoje imię i nazwisko, numer telefonu i adres e-mail, dane Odbiorcy (imię i nazwisko, numer telefonu), sposób odbioru (dostawa lub odbiór osobisty), adres dostawy, datę i preferowaną godzinę, sposób płatności oraz – opcjonalnie – komentarz (np. treść kartki),',
                'akceptuje Regulamin,',
                'klika przycisk „Zamawiam i płacę”, co oznacza złożenie zamówienia z obowiązkiem zapłaty.',
              ],
            },
            'Po złożeniu zamówienia Sprzedawca kontaktuje się z Klientem (telefonicznie, wiadomością lub e-mailem) w celu potwierdzenia przyjęcia zamówienia do realizacji. Umowa sprzedaży zostaje zawarta z chwilą otrzymania przez Klienta tego potwierdzenia.',
            'Potwierdzenie zawarcia umowy, obejmujące jej istotne postanowienia, Sprzedawca przesyła Klientowi na podany adres e-mail najpóźniej w chwili dostarczenia Produktu.',
            'Dostawa w dniu złożenia zamówienia jest możliwa, jeżeli zamówienie zostało złożone i potwierdzone do godz. 17:00 oraz pod warunkiem dostępności kwiatów.',
            'Jeżeli realizacja zamówienia nie jest możliwa (np. z powodu braku kwiatów lub zbyt krótkiego terminu), Sprzedawca niezwłocznie informuje o tym Klienta, a dokonaną płatność zwraca w terminie do 14 dni.',
          ],
        },
      ],
    },
    {
      h: '§ 6. Płatności',
      blocks: [
        {
          ol: [
            {
              t: 'Dostępne sposoby płatności:',
              ul: [
                'płatność online za pośrednictwem serwisu Przelewy24 – BLIK, szybki przelew bankowy, karta płatnicza, Apple Pay, Google Pay (aktualnie dostępne metody są prezentowane na stronie płatności),',
                'gotówką lub kartą płatniczą przy odbiorze osobistym w pracowni Sprzedawcy.',
              ],
            },
            'Płatności online obsługuje PayPro S.A. z siedzibą w Poznaniu, ul. Pastelowa 8, 60-198 Poznań, wpisana do rejestru przedsiębiorców KRS pod numerem 0000347935, NIP: 7792369887 – operator serwisu Przelewy24.',
            'W przypadku płatności online Klient dokonuje zapłaty niezwłocznie po złożeniu zamówienia. Realizacja zamówienia rozpoczyna się po otrzymaniu przez Sprzedawcę potwierdzenia płatności. Jeżeli płatność nie zostanie dokonana, zamówienie nie jest realizowane.',
            'Płatność gotówką lub kartą w pracowni jest dostępna wyłącznie przy odbiorze osobistym.',
            'Sprzedawca wydaje Klientowi dowód zakupu zgodny z obowiązującymi przepisami.',
          ],
        },
      ],
    },
    {
      h: '§ 7. Dostawa i odbiór osobisty',
      blocks: [
        {
          ol: [
            'Dostawa odbywa się na terenie Warszawy za pośrednictwem kurierów Uber lub Wolt, w godzinach pracy pracowni Sprzedawcy: poniedziałek–piątek 10:00–20:00, sobota 10:00–18:00, niedziela 10:00–17:00.',
            'Termin dostawy (data i preferowana godzina) jest ustalany przy składaniu zamówienia. Sprzedawca dokłada starań, aby dotrzymać wskazanej godziny; dokładny czas dojazdu zależy od adresu Odbiorcy i dostępności kurierów.',
            'Klient odpowiada za podanie prawidłowych danych Odbiorcy. Jeżeli Klient nie zna dokładnego adresu Odbiorcy, powinien podać w komentarzu jego numer telefonu – Sprzedawca skontaktuje się z Odbiorcą w celu ustalenia szczegółów dostawy.',
            'Jeżeli Odbiorcy nie ma pod wskazanym adresem, odmówi przyjęcia zamówienia lub nie odbierze go od kuriera w ustalonym czasie, dostawa jest uznawana za nieudaną, a zamówienie wraca do pracowni Sprzedawcy. Klient lub Odbiorca może odebrać je osobiście w ciągu 24 godzin od nieudanej próby dostawy.',
            'Ponowna dostawa jest możliwa za dodatkową opłatą odpowiadającą kosztowi kolejnego kursu kuriera. Jeżeli zamówienie nie zostanie odebrane w ciągu 24 godzin i nie zostanie uzgodniona ponowna dostawa, Sprzedawca nie zwraca ceny zamówienia, ponieważ Produkt został wykonany i podjęto próbę jego dostarczenia.',
            'Za zgodą Odbiorcy kurier może pozostawić zamówienie w innym bezpiecznym miejscu (np. w recepcji, u sąsiadów, pod drzwiami). Od tej chwili Sprzedawca nie odpowiada za stan Produktu.',
            `Odbiór osobisty jest możliwy w pracowni Sprzedawcy: ${ADDR}, w godzinach jej pracy.`,
          ],
        },
      ],
    },
    {
      h: '§ 8. Anulowanie zamówienia',
      blocks: [
        {
          ol: [
            'Klient może bezpłatnie anulować zamówienie do chwili rozpoczęcia jego przygotowania (wykonywania bukietu). Ze względu na krótki czas realizacji najlepiej zrobić to telefonicznie; można też napisać e-mail lub wiadomość w komunikatorze.',
            'W przypadku anulowania zamówienia Sprzedawca zwraca dokonaną płatność niezwłocznie, nie później niż w terminie 14 dni, przy użyciu takiego samego sposobu płatności, jakiego użył Klient (w przypadku płatności online – za pośrednictwem Przelewy24 na kartę lub rachunek Klienta).',
            'Po rozpoczęciu przygotowania bukietu anulowanie zamówienia nie jest możliwe, ponieważ Produkt z żywych kwiatów ulega szybkiemu zepsuciu (zob. § 9 ust. 2).',
          ],
        },
      ],
    },
    {
      h: '§ 9. Prawo odstąpienia od umowy',
      blocks: [
        {
          ol: [
            'Konsument oraz Przedsiębiorca na prawach konsumenta mogą w terminie 14 dni odstąpić od umowy zawartej na odległość bez podania przyczyny i bez ponoszenia kosztów, z wyjątkiem kosztów określonych w ust. 7. Termin biegnie od dnia objęcia Produktu w posiadanie przez Konsumenta lub wskazaną przez niego osobę trzecią inną niż przewoźnik (np. Odbiorcę).',
            {
              t: 'Zgodnie z art. 38 ust. 1 Ustawy prawo odstąpienia od umowy nie przysługuje w odniesieniu do umów:',
              ul: [
                'w których przedmiotem świadczenia jest towar ulegający szybkiemu zepsuciu lub mający krótki termin przydatności do użycia (pkt 4) – dotyczy to w szczególności bukietów i kompozycji z żywych kwiatów oraz roślin ciętych,',
                'w których przedmiotem świadczenia jest towar nieprefabrykowany, wyprodukowany według specyfikacji Konsumenta lub służący zaspokojeniu jego zindywidualizowanych potrzeb (pkt 3) – np. bukiet lub wieniec wykonany według indywidualnego projektu Klienta,',
                'w których przedmiotem świadczenia jest towar dostarczany w zapieczętowanym opakowaniu, którego po otwarciu opakowania nie można zwrócić ze względu na ochronę zdrowia lub ze względów higienicznych, jeżeli opakowanie zostało otwarte po dostarczeniu (pkt 5) – np. słodycze.',
              ],
            },
            'Prawo odstąpienia od umowy przysługuje w szczególności w odniesieniu do Produktów, które nie ulegają szybkiemu zepsuciu i nie zostały wykonane według specyfikacji Klienta, np. kompozycji i wieńców z suszonych kwiatów, wazonów, akcesoriów florystycznych oraz słodyczy w nienaruszonym opakowaniu.',
            `Aby odstąpić od umowy, Konsument składa Sprzedawcy jednoznaczne oświadczenie – e-mailem na adres ${C.email} lub pisemnie na adres ${ADDR}. Konsument może skorzystać ze wzoru formularza odstąpienia od umowy zamieszczonego na końcu Regulaminu, nie jest to jednak obowiązkowe. Do zachowania terminu wystarczy wysłanie oświadczenia przed jego upływem.`,
            'Sprzedawca niezwłocznie, nie później niż w terminie 14 dni od dnia otrzymania oświadczenia o odstąpieniu, zwraca Konsumentowi wszystkie dokonane przez niego płatności, w tym koszt dostawy (z wyjątkiem dodatkowych kosztów wynikających z wybranego przez Konsumenta sposobu dostawy innego niż najtańszy zwykły sposób dostawy oferowany przez Sprzedawcę). Zwrot następuje przy użyciu takiego samego sposobu płatności, jakiego użył Konsument, chyba że Konsument wyraźnie zgodził się na inny sposób, niewiążący się dla niego z żadnymi kosztami.',
            'Sprzedawca może wstrzymać się ze zwrotem płatności do chwili otrzymania Produktu z powrotem lub dostarczenia przez Konsumenta dowodu jego odesłania, w zależności od tego, które zdarzenie nastąpi wcześniej.',
            `Konsument zwraca Produkt niezwłocznie, nie później niż w terminie 14 dni od dnia odstąpienia od umowy – odsyłając go na adres ${ADDR} lub dostarczając osobiście do pracowni. Bezpośredni koszt zwrotu Produktu ponosi Konsument.`,
            'Konsument ponosi odpowiedzialność za zmniejszenie wartości Produktu będące wynikiem korzystania z niego w sposób wykraczający poza konieczny do stwierdzenia jego charakteru, cech i funkcjonowania.',
          ],
        },
      ],
    },
    {
      h: '§ 10. Reklamacje (niezgodność Produktu z umową)',
      blocks: [
        {
          ol: [
            'Sprzedawca odpowiada wobec Konsumenta oraz Przedsiębiorcy na prawach konsumenta za zgodność Produktu z umową na zasadach określonych w rozdziale 5a Ustawy.',
            `Reklamację można złożyć e-mailem na adres ${C.email}, telefonicznie pod numerem ${C.phone}, za pośrednictwem komunikatora lub pisemnie na adres ${ADDR}. Zalecamy podanie: imienia i nazwiska, daty zamówienia, opisu problemu oraz żądania.`,
            'Ze względu na naturalny charakter i ograniczoną trwałość kwiatów prosimy o zgłaszanie zastrzeżeń w ciągu 24 godzin od otrzymania zamówienia i dołączenie zdjęć Produktu – pozwoli to nam szybko i rzetelnie rozpatrzyć reklamację. Jest to wyłącznie zalecenie: niezachowanie tego terminu nie pozbawia Konsumenta uprawnień przysługujących mu z mocy prawa.',
            'Sprzedawca ustosunkowuje się do reklamacji w terminie 14 dni od dnia jej otrzymania. Brak odpowiedzi w tym terminie oznacza uznanie reklamacji.',
            'W przypadku niezgodności Produktu z umową Konsument może żądać jego naprawy lub wymiany, a w przypadkach przewidzianych w Ustawie – obniżenia ceny lub odstąpienia od umowy. W przypadku bukietów z żywych kwiatów zwykle oznacza to wymianę bukietu lub zwrot zapłaconej ceny.',
            'Nie stanowią niezgodności z umową naturalne procesy zachodzące w kwiatach, takie jak stopniowe rozwijanie się i przekwitanie kwiatów po upływie ich typowej trwałości, zwłaszcza w przypadku nieprzestrzegania zaleceń pielęgnacyjnych.',
            'Wobec Klientów niebędących Konsumentami ani Przedsiębiorcami na prawach konsumenta odpowiedzialność Sprzedawcy z tytułu rękojmi jest wyłączona (art. 558 § 1 Kodeksu cywilnego).',
          ],
        },
      ],
    },
    {
      h: '§ 11. Pozasądowe sposoby rozpatrywania reklamacji i dochodzenia roszczeń',
      blocks: [
        {
          ol: [
            'Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, w szczególności zwrócić się o pomoc do miejskiego lub powiatowego rzecznika konsumentów, złożyć wniosek o przeprowadzenie mediacji do Wojewódzkiego Inspektora Inspekcji Handlowej lub zwrócić się do stałego polubownego sądu konsumenckiego działającego przy Wojewódzkim Inspektorze Inspekcji Handlowej.',
            'Szczegółowe informacje o tych sposobach są dostępne na stronie Urzędu Ochrony Konkurencji i Konsumentów: https://uokik.gov.pl oraz https://prawakonsumenta.uokik.gov.pl.',
            'Skorzystanie z pozasądowych sposobów rozwiązywania sporów jest dobrowolne. W przypadku nieuwzględnienia reklamacji Sprzedawca informuje Konsumenta, czy wyraża zgodę na pozasądowe rozwiązanie sporu.',
          ],
        },
      ],
    },
    {
      h: '§ 12. Dane osobowe',
      blocks: [
        {
          p: `Administratorem danych osobowych Klientów i Odbiorców jest Sprzedawca. Zasady przetwarzania danych osobowych opisuje Polityka prywatności: https://${C.site}/polityka-prywatnosci`,
        },
      ],
    },
    {
      h: '§ 13. Postanowienia końcowe',
      blocks: [
        {
          ol: [
            'Sprzedawca może zmienić Regulamin z ważnych przyczyn, w szczególności w razie zmiany przepisów prawa lub zmiany sposobów płatności lub dostawy. Do zamówień złożonych przed zmianą Regulaminu stosuje się Regulamin w brzmieniu obowiązującym w chwili złożenia zamówienia.',
            'W sprawach nieuregulowanych w Regulaminie zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego i Ustawy. Postanowienia Regulaminu nie ograniczają praw Konsumenta wynikających z bezwzględnie obowiązujących przepisów prawa.',
            'Spory z Klientami niebędącymi Konsumentami ani Przedsiębiorcami na prawach konsumenta rozstrzyga sąd właściwy dla siedziby Sprzedawcy.',
            'Regulamin jest dostępny w języku polskim, rosyjskim i angielskim. Wiążąca jest wersja w języku polskim.',
          ],
        },
      ],
    },
    {
      h: 'Wzór formularza odstąpienia od umowy',
      blocks: [
        { p: '(formularz ten należy wypełnić i odesłać tylko w przypadku chęci odstąpienia od umowy)' },
        {
          box: [
            `Adresat: ${C.name}, ${ADDR}, e-mail: ${C.email}`,
            'Ja/My(*) niniejszym informuję/informujemy(*) o moim/naszym odstąpieniu od umowy sprzedaży następujących rzeczy(*) / umowy dostawy następujących rzeczy(*) / umowy o dzieło polegającej na wykonaniu następujących rzeczy(*) / o świadczenie następującej usługi(*): ……………………………',
            'Data zawarcia umowy(*) / odbioru(*): ……………………………',
            'Imię i nazwisko konsumenta(-ów): ……………………………',
            'Adres konsumenta(-ów): ……………………………',
            'Podpis konsumenta(-ów) (tylko jeżeli formularz jest przesyłany w wersji papierowej): ……………………………',
            'Data: ……………………………',
            '(*) Niepotrzebne skreślić.',
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────── РУССКИЙ ───────────────────────────────
const ru: LegalDoc = {
  title: 'Правила интернет-магазина Charmel Flowers (Regulamin)',
  note: 'Это перевод для удобства. Юридическую силу имеет польская версия Regulaminu.',
  effectiveLabel: 'Правила действуют с',
  effective: LEGAL_EFFECTIVE_DATE.ru,
  sections: [
    {
      h: '§ 1. Общие положения',
      blocks: [
        {
          ol: [
            `Настоящие Правила определяют порядок пользования интернет-магазином Charmel Flowers по адресу ${C.site} (далее — «Магазин»), в частности порядок оформления заказов, оплаты, доставки, отмены заказов, отказа от договора и подачи рекламаций.`,
            `Магазин ведёт ${C.owner}, индивидуальный предприниматель (JDG), фирма ${C.name}, ${ADDR}, NIP: ${C.nip}, REGON: ${C.regon}, зарегистрирована в CEIDG (далее — «Продавец»).`,
            {
              t: 'Контакты Продавца:',
              ul: [
                `e-mail: ${C.email}`,
                `телефон: ${C.phone}`,
                `адрес для корреспонденции (в том числе для рекламаций и возвратов): ${ADDR}`,
              ],
            },
            'Правила бесплатно доступны на сайте Магазина; их можно скачать, сохранить и распечатать. Перед оформлением заказа Клиент обязан ознакомиться с Правилами и принять их.',
          ],
        },
      ],
    },
    {
      h: '§ 2. Определения',
      blocks: [
        {
          ul: [
            'Клиент — физическое лицо, юридическое лицо или организация без статуса юридического лица, оформляющие заказ в Магазине.',
            'Потребитель — Клиент — физическое лицо, совершающий с Продавцом сделку, не связанную напрямую с его предпринимательской или профессиональной деятельностью.',
            'Предприниматель на правах потребителя — физическое лицо, заключающее договор, напрямую связанный с его предпринимательской деятельностью, если из содержания договора следует, что для него он не носит профессионального характера (art. 38a Ustawy).',
            'Получатель — лицо, указанное Клиентом, которому должен быть доставлен заказ (это может быть и сам Клиент).',
            'Товар — букет, цветочная композиция, венок или другой товар (в том числе дополнение к букету), представленный в Магазине.',
            'Заказ — волеизъявление Клиента, направленное на заключение договора купли-продажи Товаров.',
            'Закон (Ustawa) — польский закон от 30 мая 2014 г. о правах потребителя (ustawa o prawach konsumenta).',
          ],
        },
      ],
    },
    {
      h: '§ 3. Технические требования',
      blocks: [
        {
          ol: [
            'Для пользования Магазином нужны устройство с доступом в интернет, актуальный браузер с включённым JavaScript, действующий адрес e-mail и номер телефона.',
            'Клиенту запрещено передавать контент противоправного характера.',
          ],
        },
      ],
    },
    {
      h: '§ 4. Товары и цены',
      blocks: [
        {
          ol: [
            'Цены Товаров в Магазине — окончательные цены в польских злотых (PLN). Цена Товара зависит от выбранного размера (варианта).',
            'Цена Товаров не включает стоимость доставки. Стоимость доставки зависит от адреса Получателя и текущего тарифа перевозчика (Uber или Wolt). Продавец сообщает Клиенту стоимость доставки до выполнения заказа. Если Клиент не согласен с этой стоимостью, он может отказаться от заказа без каких-либо расходов.',
            'Букеты и композиции собираются вручную из натуральных цветов, поэтому каждый из них уникален. Фотографии в Магазине показывают пример исполнения Товара. Реальный вид может немного отличаться от фото (например, оттенком цветов или степенью раскрытия бутонов) при сохранении стиля, цветовой гаммы и стоимости Товара.',
            'При временном отсутствии какого-либо вида или сорта цветов Продавец может — только по согласованию с Клиентом — заменить его другим, похожим по характеру и не меньшей стоимости. Если Клиент не согласен, он может отменить заказ по правилам § 8.',
          ],
        },
      ],
    },
    {
      h: '§ 5. Оформление заказа и заключение договора',
      blocks: [
        {
          ol: [
            'Заказы через сайт Магазина принимаются круглосуточно. Заказ также можно сделать по телефону или через мессенджеры (WhatsApp, Telegram, Instagram) — в этом случае положения Правил применяются соответственно.',
            {
              t: 'Чтобы оформить заказ на сайте, Клиент:',
              ul: [
                'добавляет выбранные Товары (в выбранном размере) в корзину,',
                'указывает в форме своё имя и фамилию, номер телефона и e-mail, данные Получателя (имя и фамилию, телефон), способ получения (доставка или самовывоз), адрес доставки, дату и желаемое время, способ оплаты и — по желанию — комментарий (например, текст открытки),',
                'принимает Правила,',
                'нажимает кнопку «Заказать с обязательством оплаты», что означает оформление заказа с обязательством оплаты.',
              ],
            },
            'После оформления заказа Продавец связывается с Клиентом (по телефону, сообщением или по e-mail), чтобы подтвердить принятие заказа в работу. Договор купли-продажи считается заключённым в момент получения Клиентом этого подтверждения.',
            'Подтверждение заключения договора с его существенными условиями Продавец направляет Клиенту на указанный e-mail не позднее момента доставки Товара.',
            'Доставка в день заказа возможна, если заказ оформлен и подтверждён до 17:00 и при наличии цветов.',
            'Если выполнить заказ невозможно (например, из-за отсутствия цветов или слишком короткого срока), Продавец немедленно сообщает об этом Клиенту и возвращает оплату в течение 14 дней.',
          ],
        },
      ],
    },
    {
      h: '§ 6. Оплата',
      blocks: [
        {
          ol: [
            {
              t: 'Доступные способы оплаты:',
              ul: [
                'онлайн-оплата через сервис Przelewy24 — BLIK, быстрый банковский перевод, банковская карта, Apple Pay, Google Pay (актуальный список методов показывается на странице оплаты),',
                'наличными или банковской картой при самовывозе из студии Продавца.',
              ],
            },
            'Онлайн-платежи обслуживает PayPro S.A., ul. Pastelowa 8, 60-198 Poznań, KRS 0000347935, NIP 7792369887 — оператор сервиса Przelewy24.',
            'При онлайн-оплате Клиент оплачивает заказ сразу после его оформления. Выполнение заказа начинается после получения Продавцом подтверждения оплаты. Если оплата не произведена, заказ не выполняется.',
            'Оплата наличными или картой в студии возможна только при самовывозе.',
            'Продавец выдаёт Клиенту документ о покупке в соответствии с действующим законодательством.',
          ],
        },
      ],
    },
    {
      h: '§ 7. Доставка и самовывоз',
      blocks: [
        {
          ol: [
            'Доставка осуществляется по Варшаве курьерами Uber или Wolt в часы работы студии Продавца: понедельник–пятница 10:00–20:00, суббота 10:00–18:00, воскресенье 10:00–17:00.',
            'Срок доставки (дата и желаемое время) согласуется при оформлении заказа. Продавец прилагает усилия, чтобы соблюсти указанное время; точное время в пути зависит от адреса Получателя и доступности курьеров.',
            'Клиент отвечает за правильность данных Получателя. Если Клиент не знает точного адреса Получателя, ему следует указать в комментарии телефон Получателя — Продавец свяжется с ним, чтобы уточнить детали доставки.',
            'Если Получателя нет по указанному адресу, он отказался принять заказ или не забрал его у курьера в согласованное время, доставка считается несостоявшейся, и заказ возвращается в студию Продавца. Клиент или Получатель может забрать его самостоятельно в течение 24 часов после неудачной попытки доставки.',
            'Повторная доставка возможна за дополнительную плату в размере стоимости ещё одной поездки курьера. Если заказ не забран в течение 24 часов и повторная доставка не согласована, Продавец не возвращает стоимость заказа, так как Товар изготовлен и попытка доставки выполнена.',
            'С согласия Получателя курьер может оставить заказ в другом безопасном месте (например, на ресепшене, у соседей, у двери). С этого момента Продавец не отвечает за состояние Товара.',
            `Самовывоз возможен из студии Продавца: ${ADDR}, в часы её работы.`,
          ],
        },
      ],
    },
    {
      h: '§ 8. Отмена заказа',
      blocks: [
        {
          ol: [
            'Клиент может бесплатно отменить заказ до начала его подготовки (сборки букета). Из-за короткого срока выполнения лучше всего сделать это по телефону; также можно написать на e-mail или в мессенджер.',
            'При отмене заказа Продавец возвращает оплату незамедлительно, не позднее 14 дней, тем же способом, которым платил Клиент (при онлайн-оплате — через Przelewy24 на карту или счёт Клиента).',
            'После начала сборки букета отмена заказа невозможна, так как Товар из живых цветов быстро портится (см. § 9 п. 2).',
          ],
        },
      ],
    },
    {
      h: '§ 9. Право на отказ от договора',
      blocks: [
        {
          ol: [
            'Потребитель и Предприниматель на правах потребителя могут в течение 14 дней отказаться от договора, заключённого дистанционно, без объяснения причин и без расходов, кроме указанных в п. 7. Срок отсчитывается со дня, когда Товар получил Потребитель или указанное им третье лицо, не являющееся перевозчиком (например, Получатель).',
            {
              t: 'Согласно art. 38 ust. 1 Закона право на отказ от договора не распространяется на договоры, предметом которых является:',
              ul: [
                'товар, который быстро портится или имеет короткий срок годности (pkt 4), — в частности букеты и композиции из живых цветов и срезанные растения,',
                'товар, изготовленный по спецификации Потребителя или для удовлетворения его индивидуальных потребностей (pkt 3), — например, букет или венок, сделанный по индивидуальному проекту Клиента,',
                'товар в запечатанной упаковке, который после вскрытия нельзя вернуть по соображениям охраны здоровья или гигиены, если упаковка была вскрыта после доставки (pkt 5), — например, сладости.',
              ],
            },
            'Право на отказ от договора распространяется, в частности, на Товары, которые не портятся быстро и не изготовлены по спецификации Клиента, например композиции и венки из сухоцветов, вазы, флористические аксессуары и сладости в нетронутой упаковке.',
            `Чтобы отказаться от договора, Потребитель направляет Продавцу однозначное заявление — на e-mail ${C.email} или письменно по адресу ${ADDR}. Потребитель может воспользоваться образцом формуляра в конце Правил, но это не обязательно. Для соблюдения срока достаточно отправить заявление до его истечения.`,
            'Продавец незамедлительно, не позднее 14 дней со дня получения заявления об отказе, возвращает Потребителю все произведённые им платежи, включая стоимость доставки (кроме дополнительных расходов, вызванных выбранным Потребителем способом доставки, отличным от самого дешёвого обычного способа, предлагаемого Продавцом). Возврат производится тем же способом оплаты, которым воспользовался Потребитель, если только Потребитель явно не согласился на другой способ, не влекущий для него расходов.',
            'Продавец может задержать возврат платежа до получения Товара обратно или до предоставления Потребителем доказательства его отправки — в зависимости от того, что наступит раньше.',
            `Потребитель возвращает Товар незамедлительно, не позднее 14 дней со дня отказа от договора, — отправив его по адресу ${ADDR} или принеся лично в студию. Прямые расходы на возврат Товара несёт Потребитель.`,
            'Потребитель несёт ответственность за уменьшение стоимости Товара в результате пользования им сверх необходимого для установления его характера, свойств и функционирования.',
          ],
        },
      ],
    },
    {
      h: '§ 10. Рекламации (несоответствие Товара договору)',
      blocks: [
        {
          ol: [
            'Продавец отвечает перед Потребителем и Предпринимателем на правах потребителя за соответствие Товара договору по правилам главы 5a Закона.',
            `Рекламацию можно подать по e-mail ${C.email}, по телефону ${C.phone}, через мессенджер или письменно по адресу ${ADDR}. Рекомендуем указать: имя и фамилию, дату заказа, описание проблемы и ваше требование.`,
            'Из-за натурального характера и ограниченной стойкости цветов просим сообщать о замечаниях в течение 24 часов с момента получения заказа и прикладывать фото Товара — это позволит нам быстро и добросовестно рассмотреть рекламацию. Это только рекомендация: несоблюдение этого срока не лишает Потребителя прав, предусмотренных законом.',
            'Продавец отвечает на рекламацию в течение 14 дней со дня её получения. Отсутствие ответа в этот срок означает признание рекламации.',
            'При несоответствии Товара договору Потребитель может потребовать его ремонта или замены, а в случаях, предусмотренных Законом, — снижения цены или отказа от договора. Для букетов из живых цветов это обычно означает замену букета или возврат уплаченной цены.',
            'Не являются несоответствием договору естественные процессы в цветах — постепенное раскрытие и отцветание по истечении их обычной стойкости, особенно при несоблюдении рекомендаций по уходу.',
            'В отношении Клиентов, не являющихся Потребителями или Предпринимателями на правах потребителя, ответственность Продавца по гарантии (rękojmia) исключена (art. 558 § 1 Гражданского кодекса Польши).',
          ],
        },
      ],
    },
    {
      h: '§ 11. Внесудебное рассмотрение рекламаций и споров',
      blocks: [
        {
          ol: [
            'Потребитель может воспользоваться внесудебными способами рассмотрения рекламаций и споров, в частности обратиться за помощью к городскому или районному омбудсмену по правам потребителей (rzecznik konsumentów), подать заявление о медиации в Воеводскую инспекцию торговли (Wojewódzki Inspektor Inspekcji Handlowej) или обратиться в постоянный третейский потребительский суд при ней.',
            'Подробная информация доступна на сайте Управления по защите конкуренции и потребителей (UOKiK): https://uokik.gov.pl и https://prawakonsumenta.uokik.gov.pl.',
            'Использование внесудебных способов урегулирования споров добровольно. Если рекламация не удовлетворена, Продавец сообщает Потребителю, согласен ли он на внесудебное урегулирование спора.',
          ],
        },
      ],
    },
    {
      h: '§ 12. Персональные данные',
      blocks: [
        {
          p: `Администратором персональных данных Клиентов и Получателей является Продавец. Правила обработки персональных данных описаны в Политике конфиденциальности: https://${C.site}/ru/polityka-prywatnosci`,
        },
      ],
    },
    {
      h: '§ 13. Заключительные положения',
      blocks: [
        {
          ol: [
            'Продавец может изменить Правила по важным причинам, в частности при изменении законодательства или способов оплаты либо доставки. К заказам, оформленным до изменения, применяются Правила в редакции, действовавшей на момент оформления заказа.',
            'В вопросах, не урегулированных Правилами, применяется польское право, в частности Гражданский кодекс и Закон о правах потребителя. Правила не ограничивают прав Потребителя, вытекающих из императивных норм закона.',
            'Споры с Клиентами, не являющимися Потребителями или Предпринимателями на правах потребителя, рассматривает суд по месту нахождения Продавца.',
            'Правила доступны на польском, русском и английском языках. Обязательной является версия на польском языке.',
          ],
        },
      ],
    },
    {
      h: 'Образец формуляра отказа от договора',
      blocks: [
        { p: '(заполните и отправьте этот формуляр, только если хотите отказаться от договора; официальный образец приведён в польской версии Правил)' },
        {
          box: [
            `Адресат: ${C.name}, ${ADDR}, e-mail: ${C.email}`,
            'Я/Мы(*) настоящим сообщаю/сообщаем(*) об отказе от договора купли-продажи следующих вещей(*) / договора поставки следующих вещей(*) / договора подряда на изготовление следующих вещей(*) / договора об оказании следующей услуги(*): ……………………………',
            'Дата заключения договора(*) / получения(*): ……………………………',
            'Имя и фамилия потребителя(-ей): ……………………………',
            'Адрес потребителя(-ей): ……………………………',
            'Подпись потребителя(-ей) (только если формуляр отправляется в бумажном виде): ……………………………',
            'Дата: ……………………………',
            '(*) Ненужное зачеркнуть.',
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────── ENGLISH ───────────────────────────────
const en: LegalDoc = {
  title: 'Terms and Conditions of the Charmel Flowers online shop (Regulamin)',
  note: 'This translation is provided for convenience. The Polish version of the Regulamin is legally binding.',
  effectiveLabel: 'Effective from',
  effective: LEGAL_EFFECTIVE_DATE.en,
  sections: [
    {
      h: '§ 1. General provisions',
      blocks: [
        {
          ol: [
            `These Terms set out the rules for using the Charmel Flowers online shop available at ${C.site} (the "Shop"), in particular the rules for placing orders, payment, delivery, cancelling orders, withdrawing from the contract and filing complaints.`,
            `The Shop is run by ${C.owner}, a sole trader (JDG) operating under the business name ${C.name}, ${ADDR}, NIP: ${C.nip}, REGON: ${C.regon}, registered in the Polish Central Register of Business Activity (CEIDG) (the "Seller").`,
            {
              t: 'Contacting the Seller:',
              ul: [
                `e-mail: ${C.email}`,
                `phone: ${C.phone}`,
                `postal address (also for complaints and returns): ${ADDR}`,
              ],
            },
            'The Terms are available free of charge on the Shop website and can be downloaded, saved and printed. Before placing an order, the Customer must read and accept the Terms.',
          ],
        },
      ],
    },
    {
      h: '§ 2. Definitions',
      blocks: [
        {
          ul: [
            'Customer – a natural person, legal person or organisational unit without legal personality placing an order in the Shop.',
            'Consumer – a Customer who is a natural person concluding a transaction with the Seller not directly related to their business or professional activity.',
            'Business on consumer terms – a natural person concluding a contract directly related to their business activity where the content of the contract shows that it is not of a professional nature for them (Art. 38a of the Act).',
            'Recipient – the person designated by the Customer to whom the order is to be delivered (this may be the Customer).',
            'Product – a bouquet, flower arrangement, wreath or other goods (including bouquet add-ons) offered in the Shop.',
            'Order – the Customer\'s declaration of intent to conclude a contract of sale of Products.',
            'Act – the Polish Consumer Rights Act of 30 May 2014 (ustawa o prawach konsumenta).',
          ],
        },
      ],
    },
    {
      h: '§ 3. Technical requirements',
      blocks: [
        {
          ol: [
            'To use the Shop you need a device with internet access, an up-to-date web browser with JavaScript enabled, an active e-mail address and a phone number.',
            'The Customer may not provide unlawful content.',
          ],
        },
      ],
    },
    {
      h: '§ 4. Products and prices',
      blocks: [
        {
          ol: [
            'Prices shown in the Shop are final prices in Polish zloty (PLN). The price of a Product depends on the selected size (variant).',
            'Product prices do not include delivery. The delivery cost depends on the Recipient\'s address and the carrier\'s current rate (Uber or Wolt). The Seller informs the Customer of the delivery cost before fulfilling the order. If the Customer does not accept it, they may cancel the order free of charge.',
            'Bouquets and arrangements are handmade from natural flowers, so each one is unique. Photos in the Shop show an example of the Product. The actual appearance may differ slightly from the photo (e.g. flower shade or how open the buds are) while keeping the style, colour scheme and value of the Product.',
            'If a particular flower species or variety is temporarily unavailable, the Seller may – only with the Customer\'s agreement – replace it with a similar one of no lower value. If the Customer does not agree, they may cancel the order under § 8.',
          ],
        },
      ],
    },
    {
      h: '§ 5. Placing orders and concluding the contract',
      blocks: [
        {
          ol: [
            'Orders can be placed on the Shop website 24/7. Orders can also be placed by phone or via messengers (WhatsApp, Telegram, Instagram); in that case these Terms apply accordingly.',
            {
              t: 'To place an order on the website, the Customer:',
              ul: [
                'adds the selected Products (in the chosen size) to the cart,',
                'enters in the form their full name, phone number and e-mail, the Recipient\'s details (full name, phone), the fulfilment method (delivery or pickup), delivery address, date and preferred time, payment method and – optionally – a comment (e.g. card message),',
                'accepts the Terms,',
                'clicks the "Order with obligation to pay" button, which means placing an order with an obligation to pay.',
              ],
            },
            'After the order is placed, the Seller contacts the Customer (by phone, message or e-mail) to confirm acceptance of the order. The contract of sale is concluded when the Customer receives this confirmation.',
            'The Seller sends the Customer a confirmation of the contract, including its essential terms, to the e-mail address provided, no later than at the time of delivery of the Product.',
            'Same-day delivery is possible if the order is placed and confirmed by 17:00, subject to flower availability.',
            'If the order cannot be fulfilled (e.g. due to unavailable flowers or too short notice), the Seller promptly informs the Customer and refunds any payment within 14 days.',
          ],
        },
      ],
    },
    {
      h: '§ 6. Payment',
      blocks: [
        {
          ol: [
            {
              t: 'Available payment methods:',
              ul: [
                'online payment via Przelewy24 – BLIK, instant bank transfer, payment card, Apple Pay, Google Pay (the currently available methods are shown on the payment page),',
                'cash or payment card on personal pickup at the Seller\'s studio.',
              ],
            },
            'Online payments are handled by PayPro S.A., ul. Pastelowa 8, 60-198 Poznań, KRS 0000347935, NIP 7792369887 – the operator of Przelewy24.',
            'For online payment, the Customer pays immediately after placing the order. Fulfilment starts once the Seller receives payment confirmation. If payment is not made, the order is not fulfilled.',
            'Payment by cash or card at the studio is available only for personal pickup.',
            'The Seller issues the Customer with proof of purchase in accordance with applicable law.',
          ],
        },
      ],
    },
    {
      h: '§ 7. Delivery and pickup',
      blocks: [
        {
          ol: [
            'Delivery is available within Warsaw by Uber or Wolt couriers during the studio\'s opening hours: Monday–Friday 10:00–20:00, Saturday 10:00–18:00, Sunday 10:00–17:00.',
            'The delivery date and preferred time are agreed when placing the order. The Seller makes every effort to keep to the requested time; the exact travel time depends on the Recipient\'s address and courier availability.',
            'The Customer is responsible for providing correct Recipient details. If the Customer does not know the Recipient\'s exact address, they should leave the Recipient\'s phone number in the comment – the Seller will contact the Recipient to arrange delivery.',
            'If the Recipient is not at the given address, refuses the order or does not collect it from the courier at the agreed time, the delivery is considered unsuccessful and the order returns to the Seller\'s studio. The Customer or Recipient may collect it in person within 24 hours of the failed delivery attempt.',
            'A repeat delivery is possible for an additional fee equal to the cost of another courier trip. If the order is not collected within 24 hours and no repeat delivery is arranged, the Seller does not refund the order price, as the Product has been made and delivery has been attempted.',
            'With the Recipient\'s consent, the courier may leave the order in another safe place (e.g. at reception, with neighbours, by the door). From that moment the Seller is not responsible for the condition of the Product.',
            `Personal pickup is available at the Seller's studio: ${ADDR}, during opening hours.`,
          ],
        },
      ],
    },
    {
      h: '§ 8. Cancelling an order',
      blocks: [
        {
          ol: [
            'The Customer may cancel an order free of charge until preparation (making the bouquet) has started. Because of the short lead time, it is best to do so by phone; you can also send an e-mail or a message.',
            'If an order is cancelled, the Seller refunds the payment promptly, no later than within 14 days, using the same payment method the Customer used (for online payments – via Przelewy24 to the Customer\'s card or account).',
            'Once preparation of the bouquet has started, the order cannot be cancelled, because a Product made of fresh flowers deteriorates rapidly (see § 9(2)).',
          ],
        },
      ],
    },
    {
      h: '§ 9. Right of withdrawal',
      blocks: [
        {
          ol: [
            'A Consumer and a Business on consumer terms may withdraw from a distance contract within 14 days without giving any reason and without incurring costs, except those set out in point 7. The period runs from the day the Consumer, or a third party indicated by them other than the carrier (e.g. the Recipient), takes possession of the Product.',
            {
              t: 'Under Art. 38(1) of the Act, the right of withdrawal does not apply to contracts for:',
              ul: [
                'goods that deteriorate rapidly or have a short shelf life (point 4) – in particular bouquets and arrangements of fresh flowers and cut plants,',
                'goods made to the Consumer\'s specifications or clearly personalised (point 3) – e.g. a bouquet or wreath made to the Customer\'s individual design,',
                'sealed goods which are not suitable for return for health protection or hygiene reasons once unsealed after delivery (point 5) – e.g. sweets.',
              ],
            },
            'The right of withdrawal applies in particular to Products that do not deteriorate rapidly and were not made to the Customer\'s specifications, e.g. dried-flower arrangements and wreaths, vases, floristry accessories and sweets in unopened packaging.',
            `To withdraw, the Consumer sends the Seller an unequivocal statement – by e-mail to ${C.email} or in writing to ${ADDR}. The Consumer may use the model withdrawal form at the end of these Terms, but this is not obligatory. To meet the deadline, it is enough to send the statement before it expires.`,
            'The Seller refunds all payments received from the Consumer, including delivery costs (except for supplementary costs resulting from the Consumer\'s choice of a delivery method other than the least expensive standard delivery offered by the Seller), promptly and no later than 14 days from receiving the withdrawal statement. The refund is made using the same payment method the Consumer used, unless the Consumer has expressly agreed otherwise and incurs no fees as a result.',
            'The Seller may withhold the refund until it has received the Product back or the Consumer has supplied evidence of having sent it back, whichever is earlier.',
            `The Consumer returns the Product promptly, no later than 14 days from withdrawing, by sending it to ${ADDR} or bringing it to the studio in person. The direct cost of returning the Product is borne by the Consumer.`,
            'The Consumer is liable for any diminished value of the Product resulting from handling beyond what is necessary to establish its nature, characteristics and functioning.',
          ],
        },
      ],
    },
    {
      h: '§ 10. Complaints (non-conformity with the contract)',
      blocks: [
        {
          ol: [
            'The Seller is liable to the Consumer and the Business on consumer terms for the conformity of the Product with the contract under Chapter 5a of the Act.',
            `Complaints can be submitted by e-mail to ${C.email}, by phone at ${C.phone}, via a messenger or in writing to ${ADDR}. Please include your full name, order date, a description of the problem and your request.`,
            'Because flowers are natural and have limited durability, we ask you to report any concerns within 24 hours of receiving the order and to attach photos of the Product – this helps us handle the complaint quickly and fairly. This is only a recommendation: missing this time frame does not deprive the Consumer of any statutory rights.',
            'The Seller responds to a complaint within 14 days of receiving it. Failure to respond within this period means the complaint is accepted.',
            'If the Product does not conform to the contract, the Consumer may request repair or replacement and, in the cases provided for in the Act, a price reduction or withdrawal from the contract. For fresh-flower bouquets this usually means replacing the bouquet or refunding the price paid.',
            'Natural processes in flowers – such as buds gradually opening and flowers fading after their typical lifespan, especially if care instructions are not followed – do not constitute non-conformity.',
            'For Customers who are neither Consumers nor Businesses on consumer terms, the Seller\'s liability under statutory warranty (rękojmia) is excluded (Art. 558 § 1 of the Polish Civil Code).',
          ],
        },
      ],
    },
    {
      h: '§ 11. Out-of-court complaint and dispute resolution',
      blocks: [
        {
          ol: [
            'The Consumer may use out-of-court methods of handling complaints and claims, in particular seek help from the municipal or district consumer ombudsman (rzecznik konsumentów), apply for mediation to the Voivodeship Trade Inspector (Wojewódzki Inspektor Inspekcji Handlowej), or apply to the permanent consumer arbitration court operating at that Inspector.',
            'Detailed information is available on the website of the Office of Competition and Consumer Protection (UOKiK): https://uokik.gov.pl and https://prawakonsumenta.uokik.gov.pl.',
            'Using out-of-court dispute resolution is voluntary. If a complaint is rejected, the Seller informs the Consumer whether it agrees to out-of-court resolution of the dispute.',
          ],
        },
      ],
    },
    {
      h: '§ 12. Personal data',
      blocks: [
        {
          p: `The controller of Customers' and Recipients' personal data is the Seller. The rules for processing personal data are described in the Privacy Policy: https://${C.site}/en/polityka-prywatnosci`,
        },
      ],
    },
    {
      h: '§ 13. Final provisions',
      blocks: [
        {
          ol: [
            'The Seller may amend these Terms for important reasons, in particular changes in the law or in payment or delivery methods. Orders placed before an amendment are governed by the Terms in force when the order was placed.',
            'Matters not covered by these Terms are governed by Polish law, in particular the Civil Code and the Act. These Terms do not limit the Consumer\'s rights under mandatory provisions of law.',
            'Disputes with Customers who are neither Consumers nor Businesses on consumer terms are resolved by the court competent for the Seller\'s registered address.',
            'The Terms are available in Polish, Russian and English. The Polish version is binding.',
          ],
        },
      ],
    },
    {
      h: 'Model withdrawal form',
      blocks: [
        { p: '(complete and return this form only if you wish to withdraw from the contract; the official model is the Polish one in the Polish version of the Terms)' },
        {
          box: [
            `To: ${C.name}, ${ADDR}, e-mail: ${C.email}`,
            'I/We(*) hereby give notice that I/We(*) withdraw from my/our(*) contract of sale of the following goods(*) / for the supply of the following goods(*) / for the making of the following goods(*) / for the provision of the following service(*): ……………………………',
            'Ordered on(*) / received on(*): ……………………………',
            'Name of consumer(s): ……………………………',
            'Address of consumer(s): ……………………………',
            'Signature of consumer(s) (only if this form is notified on paper): ……………………………',
            'Date: ……………………………',
            '(*) Delete as appropriate.',
          ],
        },
      ],
    },
  ],
};

export const REGULAMIN: Record<'pl' | 'ru' | 'en', LegalDoc> = { pl, ru, en };
