<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div class="demo-app">
    <div class="demo-app-sidebar">
      <div class="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            :checked="calendarOptions.weekends"
            @change="handleWeekendsToggle"
          />
          toggle weekends
        </label>
      </div>
      <div class="demo-app-sidebar-section">
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'
import type { CalendarOptions } from '@fullcalendar/core/index.js'

const calendarOptions: CalendarOptions = {
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin // needed for dateClick
  ],
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: true
  },
  slotLabelInterval: {
    hours: 8 // Adjust this interval as needed
  },
  slotMinTime: {
    hour: 6,
    minute: 0,
    second: 0
  },
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialView: 'dayGridMonth',
  initialEvents: INITIAL_EVENTS,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents
  /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
}
const currentEvents: any = []

function handleWeekendsToggle() {
  calendarOptions.weekends = !calendarOptions.weekends // update a property
}
function handleDateSelect(selectInfo: any) {
  let title = prompt('Please enter a new title for your event')
  let calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}

function handleEventClick(clickInfo: any) {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

function handleEvents(events: any) {
  currentEvents.value = events
}
</script>

<style lang="scss">
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-size: 1.4rem;

  .demo-app-sidebar {
    width: 30rem;
    line-height: 1.5;
    background: $background-color;
    border-right: 1px solid $border-color;
  }

  .demo-app-sidebar-section {
    padding: 2em;
  }

  .demo-app-main {
    flex-grow: 1;
    padding: 3em;
  }

  .fc {
    /* the calendar root */
    max-width: 110rem;
    margin: 0 auto;
  }
}
</style>
