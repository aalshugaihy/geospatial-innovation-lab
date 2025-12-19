/**
 * Schedule Session Page - Book mentoring sessions
 * Features: Calendar picker, mentor selection, session types
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, Clock, Users, Video, Check } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

type SessionType = "consultation" | "technical_review" | "business_strategy" | "pitch_practice" | "general_guidance";

export default function ScheduleSession() {
  const { user, isAuthenticated, loading } = useAuth({ redirectOnUnauthenticated: true });
  const [, navigate] = useLocation();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionType, setSessionType] = useState<SessionType | "">("");
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [duration, setDuration] = useState("60");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [notes, setNotes] = useState("");

  const scheduleMutation = trpc.mentoring.schedule.useMutation({
    onSuccess: () => {
      toast.success("تم جدولة الجلسة بنجاح!");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("حدث خطأ: " + error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !sessionType || !mentorName) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    // Combine date and time
    const [hours, minutes] = selectedTime.split(':');
    const scheduledAt = new Date(selectedDate);
    scheduledAt.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    try {
      await scheduleMutation.mutateAsync({
        sessionType: sessionType as any,
        mentorName,
        mentorEmail: mentorEmail || undefined,
        scheduledAt,
        duration: parseInt(duration),
        location: meetingLocation || undefined,
        notes: notes || undefined,
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  // Add calendar export functionality
  const addToGoogleCalendar = () => {
    if (!selectedDate || !selectedTime || !sessionType) {
      toast.error("الرجاء ملء معلومات الجلسة أولاً");
      return;
    }

    const [hours, minutes] = selectedTime.split(':');
    const start = new Date(selectedDate);
    start.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + parseInt(duration));

    const title = `جلسة إرشادية مع ${mentorName || 'مرشد'}`;
    const description = notes || 'جلسة إرشادية في معمل الابتكار الجيومكاني';
    const locationText = meetingLocation || 'عبر الإنترنت';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${end.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(description)}&location=${encodeURIComponent(locationText)}`;

    window.open(googleCalendarUrl, '_blank');
    toast.success("تم فتح تقويم Google");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const sessionTypeLabels: Record<string, { label: string; description: string }> = {
    consultation: {
      label: "استشارة عامة",
      description: "جلسة استشارية شاملة حول مشروعك"
    },
    technical_review: {
      label: "مراجعة تقنية",
      description: "تقييم الجوانب التقنية للمشروع"
    },
    business_strategy: {
      label: "استراتيجية الأعمال",
      description: "التخطيط الاستراتيجي ونموذج العمل"
    },
    pitch_practice: {
      label: "تدريب على العرض",
      description: "التحضير لعرض المشروع أمام المستثمرين"
    },
    general_guidance: {
      label: "إرشاد عام",
      description: "توجيه ونصائح عامة"
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">جدولة جلسة إرشادية</h1>
            <p className="text-muted-foreground">
              احجز جلسة مع أحد خبرائنا لتطوير مشروعك
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Session Details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل الجلسة</CardTitle>
                    <CardDescription>اختر نوع الجلسة والمرشد</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="sessionType">نوع الجلسة *</Label>
                      <Select value={sessionType} onValueChange={(value) => setSessionType(value as SessionType)}>
                        <SelectTrigger id="sessionType" className="mt-2">
                          <SelectValue placeholder="اختر نوع الجلسة" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(sessionTypeLabels).map(([key, { label, description }]) => (
                            <SelectItem key={key} value={key}>
                              <div>
                                <div className="font-medium">{label}</div>
                                <div className="text-xs text-muted-foreground">{description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="mentorName">اسم المرشد *</Label>
                      <Input
                        id="mentorName"
                        value={mentorName}
                        onChange={(e) => setMentorName(e.target.value)}
                        placeholder="د. أحمد محمد"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mentorEmail">البريد الإلكتروني للمرشد</Label>
                      <Input
                        id="mentorEmail"
                        type="email"
                        value={mentorEmail}
                        onChange={(e) => setMentorEmail(e.target.value)}
                        placeholder="mentor@example.com"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="duration">مدة الجلسة</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger id="duration" className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 دقيقة</SelectItem>
                          <SelectItem value="60">60 دقيقة</SelectItem>
                          <SelectItem value="90">90 دقيقة</SelectItem>
                          <SelectItem value="120">120 دقيقة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">الموقع / رابط الاجتماع</Label>
                      <Input
                        id="location"
                        value={meetingLocation}
                        onChange={(e) => setMeetingLocation(e.target.value)}
                        placeholder="https://meet.google.com/..."
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        <Video className="inline h-3 w-3 ml-1" />
                        أدخل رابط الاجتماع أو الموقع الفعلي
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>ملاحظات إضافية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="أضف أي ملاحظات أو مواضيع تريد مناقشتها..."
                      rows={4}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Date & Time */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>التاريخ والوقت</CardTitle>
                    <CardDescription>اختر موعد الجلسة</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>التاريخ *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-right font-normal mt-2"
                          >
                            <CalendarIcon className="ml-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, 'PPP', { locale: ar }) : 'اختر التاريخ'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="time">الوقت *</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger id="time" className="mt-2">
                          <SelectValue placeholder="اختر الوقت" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              <Clock className="inline h-4 w-4 ml-2" />
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedDate && selectedTime && (
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-sm font-medium mb-2">ملخص الموعد</p>
                        <p className="text-sm">
                          {format(selectedDate, 'EEEE، dd MMMM yyyy', { locale: ar })}
                        </p>
                        <p className="text-sm">
                          الساعة {selectedTime}
                        </p>
                        <p className="text-sm">
                          المدة: {duration} دقيقة
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>إضافة إلى التقويم</CardTitle>
                    <CardDescription>احفظ الموعد في تقويمك</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addToGoogleCalendar}
                      disabled={!selectedDate || !selectedTime}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      إضافة إلى Google Calendar
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      سيتم إرسال تذكير بالبريد الإلكتروني قبل الموعد
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={scheduleMutation.isPending || !selectedDate || !selectedTime || !sessionType || !mentorName}
              >
                {scheduleMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                    جاري الحجز...
                  </>
                ) : (
                  <>
                    <Check className="ml-2 h-4 w-4" />
                    تأكيد الحجز
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
