import React from "react";

const FilterItem = ({
  itemId,
  onClick,
  checked,
  onChange,
  stopsLabel,
  uncheckOther,
  cheapestPrice,
}) => {
  return (
    <div className="checkboxes-list__item">
      <label
        className="checkboxes-list__label"
        htmlFor={itemId}
        onClick={onClick}
      >
        <span className="checkbox">
          <input
            type="checkbox"
            className="checkbox__field"
            id={itemId}
            value="on"
            checked={checked}
            onChange={(event) => {
              onChange(event);
            }}
            aria-label={`Фильтр по ${stopsLabel}`}
          />
          <span className="checkbox__face" />
        </span>
        {stopsLabel}
      </label>
      <div className="checkboxes-list__extra">
        <button
          type="button"
          className="checkboxes-list__extra-uncheck-other"
          onClick={() => uncheckOther(itemId)}
          aria-label={`Снять другие фильтры для ${stopsLabel}`}
        >
          только
        </button>
        <div className="checkboxes-list__extra-content">
          <span className="price --rub">{cheapestPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterItem;
