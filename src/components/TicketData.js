import React from "react";

const TicketData = ({ ticketData }) => {
  const formatDate = (d) => {
    const dateParts = d.split(".");
    const correctDate = new Date(
      dateParts[1] + "." + dateParts[0] + "." + dateParts[2]
    );
    const months = [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Мая",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ];
    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const month = correctDate.getMonth();
    const date = correctDate.getDate();
    const year = correctDate.getFullYear();
    const day = correctDate.getDay();

    return `${date} ${months[month]} ${year}, ${days[day]}`;
  };

  const stopsLabel =
    ticketData.stops > 1
      ? `${ticketData.stops} ПЕРЕСАДКИ`
      : ticketData.stops === 1
      ? "1 ПЕРЕСАДКА"
      : "";

  return (
    <article className="ticket ticket__wrapper">
      <div className="ticket__container">
        <div className="ticket__content ticket">
          <header className="ticket__button-wrapper">
            <div className="ticket__header">
              <a
                className="ticket__airline-logo logo"
                aria-label="Логотип авиакомпании"
              >
                <div className="airline-logos">
                  <div className="airline-logos__logo">
                    <img src="./img/turkish.png" alt="Турецкие авиалинии" />
                  </div>
                </div>
              </a>
            </div>

            <div className="buy-button ticket__buy-button">
              <a className="buy-button__link">
                <button
                  className="buy-button__button"
                  aria-label={`Купить билет за ${ticketData.price} р`}
                >
                  <span className="buy-button__text">
                    Купить
                    <br />
                    за {ticketData.price} р
                  </span>
                </button>
              </a>
            </div>
          </header>

          <section className="ticket__segments segments">
            <div className="ticket__segment segment">
              <div className="segment-route">
                <div className="segment-route__origin">
                  <time
                    className="segment-route__time"
                    dateTime={ticketData.departure_time}
                  >
                    {ticketData.departure_time}
                  </time>
                  <div className="segment-route__city">
                    {`${ticketData.origin} ${ticketData.origin_name}`}
                  </div>
                  <div className="segment-route__date">
                    {formatDate(ticketData.arrival_date)}
                  </div>
                </div>

                <div className="segment-route__path">
                  <div className="segment-route__total-stops">{stopsLabel}</div>

                  <div className="segment-route__stops --stops-0">
                    <div className="segment-route__path-stop --plane --origin">
                      <div className="segment-route__path-iata" />
                      <div className="segment-route__iata-dot" />
                    </div>

                    <div className="segment-route__path-stop --plane --destination">
                      <div className="segment-route__path-iata" />
                      <div className="segment-route__iata-dot" />
                    </div>
                  </div>

                  <div className="segment-route__path-line" />
                </div>

                <div className="segment-route__destination">
                  <time
                    className="segment-route__time"
                    dateTime={ticketData.arrival_time}
                  >
                    {ticketData.arrival_time}
                  </time>
                  <div className="segment-route__city">
                    {`${ticketData.destination_name} ${ticketData.destination}`}
                  </div>
                  <div className="segment-route__date">
                    {formatDate(ticketData.arrival_date)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default TicketData;
