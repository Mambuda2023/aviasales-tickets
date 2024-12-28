import React, { useState, useEffect } from "react";
import "./App.css";
import TicketList from "../components/TicketList";
import StopsFilter from "../components/StopsFilter";

const App = () => {
  // Определяем состояние приложения
  const [ticketData, setTicketData] = useState([]); // Состояние для хранения всех данных о билетах
  const [initialStops, setInitialStops] = useState([]); // Состояние для хранения уникальных значений остановок
  const [selectedStops, setSelectedStops] = useState([]); // Состояние для хранения выбранных остановок
  const [filterItemsChecked, setFilterItemsChecked] = useState([]); // Состояние для отслеживания состояния чекбоксов фильтра
  const [ticketDataFiltered, setTicketDataFiltered] = useState([]); // Состояние для хранения отфильтрованных данных о билетах
  const [filterItemsAllChecked, setFilterItemsAllChecked] = useState(true); // Состояние для отслеживания, выбраны ли все элементы фильтра

  // useEffect для загрузки данных о билетах при монтировании компонента
  useEffect(() => {
    getTicketsData("tickets.json"); // Вызываем функцию для получения данных о билетах
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании

  // Асинхронная функция для получения данных о билетах
  const getTicketsData = async (url) => {
    try {
      const response = await fetch(url); // Получаем данные по указанному URL
      const data = await response.json(); // Преобразуем ответ в JSON
      const stops = setUniqueStops(data.tickets); // Получаем уникальные остановки из данных
      const checked = new Array(stops.length).fill(true); // Устанавливаем все элементы фильтра как "выбранные"
      const sortedData = data.tickets.sort(
        (first, next) => first.price - next.price // Сортируем данные по цене
      );
      setTicketData(sortedData); // Сохраняем все данные о билетах
      setTicketDataFiltered(sortedData); // Сохраняем отфильтрованные данные (первоначально все)
      setInitialStops(stops); // Сохраняем уникальные остановки
      setSelectedStops(stops); // Устанавливаем выбранные остановки
      setFilterItemsChecked(checked); // Устанавливаем состояние чекбоксов
    } catch (error) {
      console.log(error); // Логируем ошибку, если она произошла
    }
  };

  // Функция для получения уникальных значений остановок
  const setUniqueStops = (data) => {
    let allStops = data.map((val) => val.stops); // Извлекаем количество остановок из данных
    allStops.sort((first, next) => first - next); // Сортируем остановки
    const uniqueStops = allStops.filter((e, i, a) => !i || e !== a[i - 1]); // Удаляем повторяющиеся значения
    return uniqueStops; // Возвращаем уникальные остановки
  };

  // Функция для применения фильтра к данным о билетах
  const applyFilter = (filterVal) => {
    const newData = ticketData.filter(
      (obj) => filterVal.indexOf(obj.stops) > -1 // Фильтруем данные по выбранным остановкам
    );
    setTicketDataFiltered(newData); // Обновляем состояние отфильтрованных данных
  };

  // Функция для переключения выбора всех элементов фильтра
  const toggleSelectAll = () => {
    const newCheckedState = filterItemsChecked.fill(!filterItemsAllChecked); // Переключаем состояние всех чекбоксов
    const currentStopsSelection = filterItemsAllChecked ? [] : initialStops; // Устанавливаем текущий выбор остановок

    setFilterItemsAllChecked(!filterItemsAllChecked); // Переключаем состояние выбора всех
    setFilterItemsChecked(newCheckedState); // Обновляем состояние чекбоксов
    setSelectedStops(currentStopsSelection); // Обновляем выбранные остановки
    applyFilter(currentStopsSelection); // Применяем фильтр
  };

  const setStops = (e) => {
    const filterItemClicked = parseInt(e.target.id, 10); // Получаем ID нажатого элемента и преобразуем его в число
    let currentStopsSelection = []; // Инициализируем массив для текущего выбора остановок

    // Проверяем, была ли остановка уже выбрана
    if (selectedStops.indexOf(filterItemClicked) > -1) {
      // Если остановка уже выбрана, удаляем её из текущего выбора
      currentStopsSelection = selectedStops.filter(
        (s) => s !== filterItemClicked // Фильтруем массив, исключая нажатую остановку
      ); // remove
    } else {
      // Если остановка не была выбрана, добавляем её в текущий выбор
      currentStopsSelection = [...selectedStops, filterItemClicked]; // Добавляем нажатую остановку в массив выбранных
    }

    const newFilterItemsCheckedState = [...filterItemsChecked]; // Копируем текущее состояние чекбоксов
    const selectAll = initialStops.length === currentStopsSelection.length; // Проверяем, выбраны ли все элементы фильтра

    // Меняем состояние чекбокса для нажатого элемента
    newFilterItemsCheckedState[e.target.id] = !filterItemsChecked[e.target.id]; // Переключаем состояние чекбокса нажатого элемента

    // Обновляем состояние выбранных остановок, сортируя их
    setSelectedStops(currentStopsSelection.sort());
    setFilterItemsAllChecked(selectAll); // Обновляем состояние выбора всех элементов
    setFilterItemsChecked(newFilterItemsCheckedState); // Обновляем состояние чекбоксов
    applyFilter(currentStopsSelection.sort()); // Применяем фильтр с текущими выбранными остановками
  };

  // Функция для исключения всех остальных остановок, кроме одной
  const uncheckOther = (checkedItem) => {
    const newCheckedState = filterItemsChecked.fill(false); // Сбрасываем состояние всех чекбоксов (устанавливаем в false)
    newCheckedState[checkedItem] = true; // Устанавливаем состояние чекбокса для нажатого элемента в true (выбираем его)

    setFilterItemsChecked(newCheckedState); // Обновляем состояние чекбоксов
    setFilterItemsAllChecked(false); // Устанавливаем состояние выбора всех элементов в false
    setSelectedStops([checkedItem]); // Устанавливаем выбранные остановки только для нажатого элемента
    applyFilter([checkedItem]); // Применяем фильтр только для нажатой остановки
  };

  return (
    <div className="app__inner">
      <header className="app__header">
        <span>
          <img src="./img/logo.png" alt="Aviasales" />
        </span>
      </header>

      <section className="app__filter">
        <StopsFilter
          applyFilter={applyFilter}
          setStops={setStops}
          toggleSelectAll={toggleSelectAll}
          uncheckOther={uncheckOther}
          initialStops={initialStops}
          selectedStops={selectedStops}
          ticketData={ticketData}
          filterItemsAllChecked={filterItemsAllChecked}
          filterItemsChecked={filterItemsChecked}
        />
      </section>

      <section className="app__content">
        <TicketList ticketData={ticketDataFiltered} />
      </section>
    </div>
  );
};

export default App;
