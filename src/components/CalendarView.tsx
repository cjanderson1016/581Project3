/*
 * CalendarView.tsx
 * Date: November 8, 2025
 * Description: FullCalendar-based weekly schedule view
 */

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { Course } from "../models/Course";
import { coursesToCalendarEvents } from "../utils/calendarUtils";
import "../styles/CalendarView.css";

// Props for CalendarView component
interface CalendarViewProps {
  courses: Course[];
  onRemoveCourse?: (id: number) => void;
}

// CalendarView component rendering FullCalendar with course events
export default function CalendarView({ courses }: CalendarViewProps) {
  const events = coursesToCalendarEvents(courses);

  return (
    <div className="calendar-view-container">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={false} 
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotDuration="01:00:00"
        slotLabelInterval="01:00"
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        }}
        dayHeaderFormat={{
          weekday: "short",
        }}
        height="auto"
        expandRows={true}
        events={events}
        eventDisplay="block"
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        // Hide weekend columns
        hiddenDays={[0, 6]}
      />
    </div>
  );
}
