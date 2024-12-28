import React from "react";
import FilterItem from "./FilterItem";

const StopsFilter = ({
  ticketData,
  initialStops,
  filterItemsChecked,
  setStops,
  toggleSelectAll,
  filterItemsAllChecked,
  uncheckOther,
}) => {
  const filterItems = initialStops.map((e, i) => {
    const stopsLabel =
      e > 1 ? `${e} Пересадки` : e === 1 ? "1 Пересадка" : "Без пересадок"; // форматирование метки пересадок

    const cheapestPrice = ticketData.filter((ticket) => ticket.stops === e)[0]
      ? ticketData.filter((ticket) => ticket.stops === e)[0].price
      : 0; // получение самой низкой цены для каждого количества пересадок
    const itemId = e; // уникальный id для каждого чекбокса
    const checked = filterItemsChecked[i]; // состояние для каждого чекбокса

    return (
      <FilterItem
        uncheckOther={uncheckOther}
        onChange={setStops}
        cheapestPrice={cheapestPrice}
        stopsLabel={stopsLabel}
        checked={checked}
        itemId={itemId}
        key={i}
      />
    );
  });

  return (
    <section
      className="filters__item filter filters"
      aria-labelledby="stops-filter-header"
    >
      <h1 id="stops-filter-header" className="filter__header">
        КОЛИЧЕСТВО ПЕРЕСАДОК
      </h1>

      <div className="filter__content">
        <div className="filter__controls checkboxes-list">
          <div className="checkboxes-list__item">
            <label className="checkboxes-list__label" htmlFor="stops_all">
              <span className="checkbox">
                <input
                  type="checkbox"
                  className="checkbox__field"
                  id="stops_all"
                  onChange={toggleSelectAll}
                  checked={filterItemsAllChecked}
                  aria-label="Выбрать все пересадки"
                />
                <span className="checkbox__face" />
              </span>
              Все
            </label>
          </div>
        </div>
      </div>

      <div role="group" aria-labelledby="stops-filter-header">
        {filterItems}
      </div>
    </section>
  );
};

export default StopsFilter;
