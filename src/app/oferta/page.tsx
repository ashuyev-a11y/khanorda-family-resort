import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Договор-публичная оферта — Khan Orda",
  description:
    "Публичная оферта на бронирование и проживание в зоне отдыха «KHAN ORDA».",
};

/** Заголовок раздела договора */
function Clause({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="mt-10 font-display text-[22px] leading-tight text-forest sm:text-[26px]">
      <span className="mr-2 text-copper">{n}.</span>
      {title}
    </h2>
  );
}

export default function OfertaPage() {
  return (
    <div className="min-h-screen bg-milk text-[#2b2f28]">
      {/* верхняя панель */}
      <header className="border-b border-[#ece3d2]">
        <div className="container-ko flex items-center justify-between py-5">
          <Link href="/" className="font-display text-[22px] text-forest">
            Khan Orda
          </Link>
          <Link
            href="/"
            className="text-[14px] text-[#6b6f66] transition hover:text-forest"
          >
            ← На главную
          </Link>
        </div>
      </header>

      <article className="container-ko max-w-[820px] py-12 sm:py-16">
        <p className="eyebrow text-[#8B6849]">Зона отдыха «KHAN ORDA»</p>
        <h1 className="mt-3 font-display text-[32px] leading-tight text-forest sm:text-[42px]">
          Договор-публичная оферта
        </h1>
        <p className="mt-2 text-[15px] text-[#6b6f66]">
          на бронирование и проживание в зоне отдыха «KHAN ORDA»
        </p>

        <div className="mt-8 space-y-4 text-[15.5px] leading-relaxed">
          <p className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(30,30,28,.06)]">
            Настоящий договор является публичной офертой. Любое лицо, внесшее
            предоплату или полную оплату за бронирование, считается
            ознакомившимся с условиями настоящего договора и полностью принимает
            их без каких-либо исключений.
          </p>
        </div>

        <Clause n={1} title="Стороны договора" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          <b>Исполнитель:</b> Зона отдыха «KHAN ORDA».
        </p>
        <p className="mt-2 text-[15.5px] leading-relaxed">
          <b>Заказчик (Гость):</b> Физическое лицо, предоставившее свои
          персональные данные и оплатившее бронирование.
        </p>

        <Clause n={2} title="Предмет договора" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Исполнитель предоставляет Заказчику во временное пользование дом отдыха
          на согласованные дату и время.
        </p>
        <p className="mt-2 text-[15.5px] leading-relaxed">
          Комплекс состоит из 4 отдельных домов. Каждый дом оборудован:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>баней;</li>
          <li>купелью;</li>
          <li>джакузи с подогревом;</li>
          <li>мангальной зоной;</li>
          <li>очагом с казаном;</li>
          <li>мангалом;</li>
          <li>зоной отдыха.</li>
        </ul>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Дом рассчитан на размещение до 16 человек. На втором этаже расположено
          двуспальное спальное место.
        </p>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Дополнительно гости могут заказать:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>завтраки;</li>
          <li>обеды;</li>
          <li>ужины;</li>
          <li>блюда казахской кухни;</li>
          <li>европейской кухни;</li>
          <li>паназиатской кухни;</li>
          <li>азиатской кухни и другие блюда по меню.</li>
        </ul>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Также доступны варианты недельного проживания.
        </p>

        <Clause n={3} title="Бронирование" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Для оформления бронирования Заказчик предоставляет:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>Ф.И.О.;</li>
          <li>контактный номер телефона;</li>
          <li>дату заезда;</li>
          <li>дату выезда;</li>
          <li>количество гостей.</li>
        </ul>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Количество гостей необходимо для предварительной подготовки дома и
          сервировки стола. В зависимости от количества гостей предоставляется:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>малый стол (3 метра) — до 12 человек;</li>
          <li>большой стол (4 метра) — до 16 человек.</li>
        </ul>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Если количество гостей изменилось, Заказчик обязан заранее уведомить
          администрацию. Бронирование считается подтвержденным только после
          поступления предоплаты либо полной оплаты.
        </p>

        <Clause n={4} title="Стоимость и порядок оплаты" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Размер предоплаты определяется Исполнителем при бронировании. Оплата
          производится путем перевода денежных средств по реквизитам,
          предоставленным администрацией. После поступления денежных средств
          дата считается закрепленной за Заказчиком.
        </p>

        <Clause n={5} title="Отмена бронирования" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Внося предоплату либо полную оплату, Заказчик подтверждает, что:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>ознакомился с настоящим договором;</li>
          <li>полностью принимает все его условия;</li>
          <li>
            понимает, что дом снимается исключительно под него, а выбранная дата
            становится недоступной для других гостей.
          </li>
        </ul>
        <p className="mt-3 text-[15.5px] font-semibold leading-relaxed text-forest">
          Предоплата является невозвратной.
        </p>
        <p className="mt-2 text-[15.5px] leading-relaxed">
          При отказе от бронирования, переносе даты по инициативе Заказчика,
          незаезде либо досрочном выезде внесенная предоплата не возвращается.
          Возврат денежных средств возможен только в случаях, предусмотренных
          действующим законодательством либо при невозможности исполнения
          обязательств по вине Исполнителя.
        </p>

        <Clause n={6} title="Правила проживания" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Во время пребывания на территории комплекса Гость обязуется:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>соблюдать общественный порядок;</li>
          <li>соблюдать требования пожарной безопасности;</li>
          <li>бережно относиться к имуществу комплекса;</li>
          <li>соблюдать чистоту в доме и на территории;</li>
          <li>
            использовать баню, купель, джакузи и мангальную зону только по
            назначению;
          </li>
          <li>не выносить мебель из дома на улицу;</li>
          <li>не заносить уличную мебель внутрь дома;</li>
          <li>
            при необходимости дополнительной мебели обращаться исключительно к
            администрации;
          </li>
          <li>не нарушать покой других отдыхающих.</li>
        </ul>
        <p className="mt-3 text-[15.5px] font-semibold leading-relaxed text-forest">
          Строго запрещается:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>курить сигареты внутри дома;</li>
          <li>курить кальян внутри дома;</li>
          <li>
            использовать электронные сигареты, IQOS, вейпы и иные устройства для
            курения внутри дома;
          </li>
          <li>использовать открытый огонь вне специально оборудованных мест;</li>
          <li>портить имущество комплекса.</li>
        </ul>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Курение допускается только в специально отведенных местах на
          территории.
        </p>

        <Clause n={7} title="Количество гостей" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Заказчик обязан заранее сообщить фактическое количество гостей.
          Нахождение на территории лиц, не указанных при бронировании,
          допускается только после согласования с администрацией. При выявлении
          превышения согласованного количества гостей администрация вправе:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>потребовать доплату согласно действующему прайсу;</li>
          <li>отказать в дальнейшем пребывании незаявленных гостей;</li>
          <li>
            прекратить проживание без возврата денежных средств при грубом
            нарушении условий договора.
          </li>
        </ul>

        <Clause n={8} title="Ответственность Заказчика" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Заказчик несет полную материальную ответственность за:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>сохранность имущества;</li>
          <li>действия приглашенных гостей;</li>
          <li>причиненный ущерб дому и территории.</li>
        </ul>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          В случае повреждения имущества Заказчик обязан возместить полную
          стоимость ремонта либо замены. Если после проживания потребуется:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>химчистка мебели;</li>
          <li>устранение запаха табачного дыма;</li>
          <li>дополнительная уборка;</li>
          <li>восстановление испорченного имущества,</li>
        </ul>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          расходы оплачиваются Заказчиком.
        </p>

        <Clause n={9} title="Ответственность Исполнителя" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Исполнитель не несет ответственности за:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>оставленные без присмотра личные вещи;</li>
          <li>
            несчастные случаи, произошедшие вследствие нарушения Заказчиком
            правил безопасности;
          </li>
          <li>
            перебои коммунальных услуг, вызванные авариями, не зависящими от
            Исполнителя.
          </li>
        </ul>

        <Clause n={10} title="Форс-мажор" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Стороны освобождаются от ответственности за неисполнение обязательств
          при наступлении обстоятельств непреодолимой силы (пожар, стихийные
          бедствия, действия государственных органов и иные чрезвычайные
          обстоятельства).
        </p>

        <Clause n={11} title="Согласие с договором" />
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Оплачивая бронирование (полностью либо частично), Заказчик
          подтверждает, что:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px] leading-relaxed">
          <li>внимательно прочитал настоящий договор;</li>
          <li>полностью понимает его содержание;</li>
          <li>принимает все условия без исключения;</li>
          <li>соглашается с правилами проживания;</li>
          <li>
            соглашается с тем, что внесенная предоплата является невозвратной.
          </li>
        </ul>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Оплата считается электронной формой подписания настоящего договора
          (акцептом публичной оферты) и имеет юридическую силу.
        </p>

        {/* Реквизиты бронирования */}
        <h2 className="mt-12 font-display text-[22px] leading-tight text-forest sm:text-[26px]">
          Реквизиты бронирования
        </h2>
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(30,30,28,.06)]">
          <dl className="space-y-3 text-[15px]">
            {[
              ["Зона отдыха", "KHAN ORDA"],
              ["Дата заезда", ""],
              ["Дата выезда", ""],
              ["Дом №", ""],
              ["Ф.И.О. Заказчика", ""],
              ["Телефон", ""],
              ["Количество гостей", ""],
              ["Размер предоплаты", ""],
              ["Дата оплаты", ""],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <dt className="min-w-[190px] text-[#6b6f66]">{label}:</dt>
                <dd className="flex-1 border-b border-dashed border-[#cbccc4] pb-1 font-medium text-forest">
                  {value || " "}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Подтверждение */}
        <h2 className="mt-12 font-display text-[22px] leading-tight text-forest sm:text-[26px]">
          Подтверждение
        </h2>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Внесением предоплаты или полной оплаты Заказчик подтверждает свое
          согласие со всеми условиями настоящего договора, включая правила
          проживания, порядок бронирования и условие о невозвратности
          предоплаты.
        </p>

        <div className="mt-14 border-t border-[#ece3d2] pt-6 text-[13px] text-[#8a8f84]">
          <Link href="/" className="text-forest hover:underline">
            ← Вернуться на главную
          </Link>
          <span className="mx-2">·</span>
          Khan Orda Family Resort
        </div>
      </article>
    </div>
  );
}
