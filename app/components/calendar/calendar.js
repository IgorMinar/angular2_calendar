import {Component, For, Template, If} from 'angular2/angular2';
import {CalendarCell} from 'components/calendar-cell/calendar-cell';
import {searchAllCells} from 'stores/registry';
import _ from 'lodash/index';

var DAYS = _.range(1, 32).map((day) => ("Oct " + day));

@Component({
  selector: 'calendar',
})
@Template({
  url: 'components/calendar/calendar.html',
  directives: [
    For,
    If,
    CalendarCell
  ]
})
export class Calendar {
  constructor() {
    this.hours = _.range(24);
    this.days = DAYS;
    this.isLoaded = false;
  }
  load() {
    this.isLoaded = true;
  }
  searchAll() {
    searchAllCells();
  }
  dayHeaderClicked() {
    alert('dayHeaderClicked()');
  }
}
