import React, { useContext } from "react";
import { v4 as randomUUIDv4 } from "uuid";
import moment from "moment";

import DataContext from "../context/DataContext";

import styles from "./../styles/components/Timeline.module.scss";

const Timeline = () => {
  const { eventDate } = useContext(DataContext);

  // Obtém a data atual (completa: ano, mês, dia)
  const today = moment().startOf("day");
  const eventDay = moment(eventDate).startOf("day");

  // A quantidade de dias até o evento (contando o número total de dias até o evento)
  const calendar = Array.from({ length: eventDay.diff(today, 'days') + 1 }, (_, index) => index + 1);

  console.log('Hoje:', today.format("DD/MM/YYYY"));
  console.log('Dia do Evento:', eventDay.format("DD/MM/YYYY"));

  return (
    <ul
      className={styles.timeline}
      style={{
        gridTemplateColumns: `repeat(${calendar.length}, 1fr)`,
      }}
    >
      {calendar.map((dayIndex, index) => {
        // Calcula a data para o índice atual
        const currentDay = today.clone().add(dayIndex - 1, 'days');
        
        const isPast = currentDay.isBefore(today, 'day');
        const isToday = currentDay.isSame(today, 'day');
        const isLast = currentDay.isSame(eventDay, 'day');

        console.log("Current day:", currentDay.format("DD/MM/YYYY"));

        return (
          <li
            key={randomUUIDv4()}
            className={`${styles.timeline__item} ${
              isToday ? styles.active : ""
            } ${isLast ? styles.last : ""} ${isPast ? styles.past : ""}`}
          >
            {isToday && currentDay.format("DD")}
            {!isToday && !isLast && "•"}
            {isLast && currentDay.format("DD")}
          </li>
        );
      })}
    </ul>
  );
};

export default Timeline;
