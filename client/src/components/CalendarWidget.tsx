/**
 * Calendar Widget Component
 * Interactive calendar for displaying sessions and events
 */

import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ar } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

const locales = {
  ar: ar,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: "session" | "event";
  location?: string;
  description?: string;
}

export default function CalendarWidget() {
  const [events] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "جلسة إرشادية: تطوير المنتج",
      start: new Date(2024, 11, 21, 14, 0),
      end: new Date(2024, 11, 21, 15, 0),
      type: "session",
      location: "عبر الإنترنت",
      description: "جلسة إرشادية حول تطوير المنتج الجيومكاني",
    },
    {
      id: 2,
      title: "هاكاثون الخرائط الذكية",
      start: new Date(2024, 11, 25, 9, 0),
      end: new Date(2024, 11, 25, 17, 0),
      type: "event",
      location: "مقر الهيئة",
      description: "هاكاثون لتطوير حلول الخرائط الذكية",
    },
    {
      id: 3,
      title: "جلسة إرشادية: نموذج العمل",
      start: new Date(2024, 11, 23, 10, 0),
      end: new Date(2024, 11, 23, 11, 0),
      type: "session",
      location: "عبر الإنترنت",
    },
    {
      id: 4,
      title: "ورشة عمل: البيانات المفتوحة",
      start: new Date(2024, 11, 28, 14, 0),
      end: new Date(2024, 11, 28, 16, 0),
      type: "event",
      location: "مقر الهيئة",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const eventStyleGetter = (event: CalendarEvent) => {
    const style: React.CSSProperties = {
      backgroundColor: event.type === "session" ? "#46C18F" : "#14BEC3",
      borderRadius: "4px",
      opacity: 0.9,
      color: "white",
      border: "none",
      display: "block",
    };
    return { style };
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-[#46C18F]" />
            التقويم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
              messages={{
                next: "التالي",
                previous: "السابق",
                today: "اليوم",
                month: "شهر",
                week: "أسبوع",
                day: "يوم",
                agenda: "جدول الأعمال",
                date: "التاريخ",
                time: "الوقت",
                event: "الحدث",
                noEventsInRange: "لا توجد أحداث في هذا النطاق",
                showMore: (total: number) => `+${total} المزيد`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Event Details */}
      {selectedEvent && (
        <Card className="border-[#46C18F]">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg mb-2">{selectedEvent.title}</CardTitle>
                <Badge variant={selectedEvent.type === "session" ? "default" : "secondary"}>
                  {selectedEvent.type === "session" ? "جلسة إرشادية" : "فعالية"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {format(selectedEvent.start, "PPP", { locale: ar })} -{" "}
                {format(selectedEvent.start, "p", { locale: ar })} إلى{" "}
                {format(selectedEvent.end, "p", { locale: ar })}
              </span>
            </div>
            {selectedEvent.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{selectedEvent.location}</span>
              </div>
            )}
            {selectedEvent.description && (
              <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">الأحداث القادمة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events
              .filter(e => e.start >= new Date())
              .sort((a, b) => a.start.getTime() - b.start.getTime())
              .slice(0, 3)
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      event.type === "session" ? "bg-[#46C18F]/10" : "bg-[#14BEC3]/10"
                    }`}
                  >
                    <CalendarIcon
                      className={`h-5 w-5 ${
                        event.type === "session" ? "text-[#46C18F]" : "text-[#14BEC3]"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {format(event.start, "PPP", { locale: ar })} - {format(event.start, "p", { locale: ar })}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
