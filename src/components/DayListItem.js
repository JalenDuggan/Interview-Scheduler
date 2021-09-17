import React from "react";

import "components/DayListItem.scss";

const classnames = require('classnames');

export default function DayListItem(props) {

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full" : props.spots === 0
  })

  const formatSpots = function (spots) {
    if (props.spots === 0) {
      return 'no spots remaining'
    } else {
      return `${spots} spots remaining`
    }
  }

  return (
    <li 
    onClick={() => props.setDay(props.name)} 
    className={dayClass}
    >

      <h2 className="text--reqular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}