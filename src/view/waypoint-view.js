/* eslint-disable camelcase */
import {createElement} from '../render.js';
import { formatDate, formatTime, countDuration, getDurationInfo } from '../utils.js';

const createWaypointTemplate = (waypoint)=>{
  const {base_price, date_from, date_to, destination, is_favorite, offers, type } = waypoint;
  const date = formatDate(date_from);
  const startTime = formatTime(date_from);
  const endTime = formatTime(date_to);
  const duration = getDurationInfo(countDuration(date_from,date_to));
  const favouriteClassName = is_favorite ? 'event__favorite-btn--active' : '';
  return(` <li class="trip-events__item">
<div class="event">
  <time class="event__date" datetime="2019-03-18">${date}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type} ${destination.name}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
      &mdash;
      <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
    </p>
    <p class="event__duration">${duration}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${base_price}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
 ${offers.map((offer)=>(`<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`)) }
  </ul>
  <button class="event__favorite-btn ${favouriteClassName}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`);
};

export default class WaypointView {
  constructor({waypoint}){
    this.waypoint = waypoint;
  }

  getTemplate(){

    return createWaypointTemplate(this.waypoint);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
