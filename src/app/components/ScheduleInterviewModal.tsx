import React, { useState, useMemo } from "react";
import { Dialog } from "../primitives/Dialog";
import { Button } from "../primitives/Button";
import { Badge } from "../primitives/Badge";
import { Calendar as CalendarIcon, Clock, Globe, CheckCircle2, User, Sparkles, Video, ArrowRight } from "lucide-react";

export interface RespondentBookingTarget {
  name: string;
  email: string;
  role: string;
  topic?: string;
  sentiment?: "Positive" | "Neutral" | "Negative";
  npsScore?: number;
}

interface ScheduleInterviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target?: RespondentBookingTarget | null;
}

const COMMON_TIMEZONES = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "Eastern Time (US & Canada) - EDT" },
  { value: "America/Chicago", label: "Central Time (US & Canada) - CDT" },
  { value: "America/Denver", label: "Mountain Time (US & Canada) - MDT" },
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada) - PDT" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Berlin", label: "Berlin / Paris / Amsterdam (CEST)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
  { value: "Asia/Singapore", label: "Singapore / Hong Kong (SGT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST)" },
];

export default function ScheduleInterviewModal({
  open,
  onOpenChange,
  target,
}: ScheduleInterviewModalProps) {
  // Detect local timezone using Intl API
  const localTz = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
    } catch {
      return "America/New_York";
    }
  }, []);

  const [selectedTz, setSelectedTz] = useState<string>(localTz);
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>("14:30");
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");

  // Generate next 5 business days
  const availableDates = useMemo(() => {
    const dates = [];
    const now = new Date();
    let count = 0;
    let daysAhead = 1;

    while (count < 5) {
      const d = new Date(now);
      d.setDate(now.getDate() + daysAhead);
      // Skip weekends
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        dates.push(d);
        count++;
      }
      daysAhead++;
    }
    return dates;
  }, []);

  // Format date using Intl.DateTimeFormat
  const formatDateLabel = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: selectedTz,
    });
    return formatter.format(date);
  },
  formatFullDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: selectedTz,
    });
    return formatter.format(date);
  };

  // Generate slots for selected date
  const timeSlots = useMemo(() => {
    const morning = ["09:00", "09:45", "10:30", "11:15"];
    const afternoon = ["13:00", "13:45", "14:30", "15:15", "16:00", "16:45"];
    return { morning, afternoon };
  }, []);

  const handleBooking = () => {
    setIsBooked(true);
  };

  const handleClose = () => {
    setIsBooked(false);
    setSelectedSlot(null);
    onOpenChange(false);
  };

  const respondentName = target?.name || "Sarah Jenkins";
  const respondentRole = target?.role || "Product Designer";
  const respondentEmail = target?.email || "sjenkins@quantumly.com";

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      className="max-w-[760px]"
      title={
        isBooked ? undefined : (
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-100">
              <CalendarIcon className="size-5" />
            </span>
            <span>Schedule User Research Call</span>
          </div>
        )
      }
      description={
        isBooked
          ? undefined
          : `Sync with ${respondentName} to dive deeper into survey sentiment and feature struggles.`
      }
    >
      {isBooked ? (
        /* Booking Confirmation Screen */
        <div className="flex flex-col items-center justify-center py-6 text-center gap-4 animate-in fade-in-50 duration-200">
          <div className="size-16 rounded-3xl bg-emerald-50 border border-emerald-200/80 text-[#059669] flex items-center justify-center shadow-sm shadow-emerald-500/10">
            <CheckCircle2 className="size-8" />
          </div>

          <div className="flex flex-col gap-1 max-w-[420px]">
            <h3 className="text-[20px] font-bold text-slate-800">
              Interview Confirmed!
            </h3>
            <p className="text-[13px] text-slate-500 font-medium">
              A calendar invite and Cal Video link have been dispatched to{" "}
              <strong className="text-slate-700">{respondentEmail}</strong>.
            </p>
          </div>

          {/* Booking Summary Ticket */}
          <div className="w-full max-w-[460px] bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5 text-left flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-emerald-600 text-white font-bold text-[12px] flex items-center justify-center">
                  {respondentName[0]}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-slate-800 leading-tight">
                    {respondentName}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {respondentRole}
                  </span>
                </div>
              </div>
              <Badge variant="success" size="sm">
                Confirmed
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div>
                <span className="text-slate-400 font-medium block">Date & Time</span>
                <span className="font-semibold text-slate-700">
                  {formatFullDate(availableDates[selectedDateIndex])} at {selectedSlot}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Duration & Location</span>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5 mt-0.5">
                  <Video className="size-3.5 text-emerald-600" />
                  {selectedDuration} mins (Cal Video)
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Globe className="size-3 text-slate-400" />
                Timezone: <span className="font-semibold text-slate-700">{selectedTz}</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">ID: CAL-RES-882</span>
            </div>
          </div>

          <div className="flex gap-2.5 mt-2">
            <Button variant="outline" size="md" onClick={handleClose}>
              Done
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setIsBooked(false);
                setSelectedSlot(null);
              }}
            >
              Schedule Another
            </Button>
          </div>
        </div>
      ) : (
        /* Slot Picker Form */
        <div className="flex flex-col gap-5">
          {/* Respondent Brief Banner */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center font-bold text-slate-700 shadow-xs">
                {respondentName[0]}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-bold text-slate-800">
                    {respondentName}
                  </span>
                  {target?.sentiment && (
                    <Badge
                      variant={
                        target.sentiment === "Positive"
                          ? "success"
                          : target.sentiment === "Negative"
                          ? "danger"
                          : "warning"
                      }
                      size="sm"
                    >
                      {target.sentiment}
                    </Badge>
                  )}
                </div>
                <span className="text-[11.5px] text-slate-400 font-medium">
                  {respondentRole} • {respondentEmail}
                </span>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs">
              {[15, 30, 45].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setSelectedDuration(mins)}
                  className={`px-2.5 py-1 rounded-lg text-[11.5px] font-bold transition-all cursor-pointer ${
                    selectedDuration === mins
                      ? "bg-slate-800 text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Timezone Switcher */}
          <div className="flex items-center justify-between text-[12px] bg-emerald-50/60 p-2.5 px-3.5 rounded-xl border border-emerald-100/80">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold">
              <Globe className="size-4 text-[#059669]" />
              <span>Timezone:</span>
            </div>
            <select
              value={selectedTz}
              onChange={(e) => setSelectedTz(e.target.value)}
              className="bg-white border border-emerald-200/90 text-emerald-950 font-medium rounded-lg px-2.5 py-1 text-[11.5px] outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer max-w-[320px]"
            >
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {/* Main Grid: Date Column & Slot Column */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Left: Date Buttons */}
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Select Date
              </span>
              <div className="flex flex-col gap-1.5" role="radiogroup" aria-label="Available Dates">
                {availableDates.map((date, idx) => {
                  const isSelected = selectedDateIndex === idx;
                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setSelectedDateIndex(idx);
                        setSelectedSlot(null);
                      }}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-[12.5px] font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        isSelected
                          ? "bg-[#059669] text-white border-[#059669] shadow-sm shadow-emerald-900/10 font-bold"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CalendarIcon className={`size-3.5 ${isSelected ? "text-emerald-200" : "text-slate-400"}`} />
                        <span>{formatDateLabel(date)}</span>
                      </div>
                      <span className={`text-[11px] ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>
                        {idx === 0 ? "Tomorrow" : `${10} slots`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Slot Buttons */}
            <div className="md:col-span-7 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Available Slots ({formatDateLabel(availableDates[selectedDateIndex])})
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {selectedDuration} min meetings
                </span>
              </div>

              {/* Morning Slots */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold text-slate-400">Morning</span>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Morning Time Slots">
                  {timeSlots.morning.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-xl border text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm font-bold scale-[1.02]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-700"
                        }`}
                      >
                        <Clock className="size-3.5 opacity-60" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div className="flex flex-col gap-1.5 mt-1">
                <span className="text-[11px] font-semibold text-slate-400">Afternoon</span>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Afternoon Time Slots">
                  {timeSlots.afternoon.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-xl border text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm font-bold scale-[1.02]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-700"
                        }`}
                      >
                        <Clock className="size-3.5 opacity-60" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Optional Research Focus Note */}
          <div className="flex flex-col gap-1.5 mt-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Research Objective / Interview Context (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Inquire about embedding performance and onboarding friction..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none rounded-xl text-[12.5px] font-medium text-slate-800"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-[12px] text-slate-400 font-medium">
              {selectedSlot ? (
                <span>
                  Booking: <strong className="text-slate-700">{formatDateLabel(availableDates[selectedDateIndex])} at {selectedSlot}</strong> ({selectedTz})
                </span>
              ) : (
                "Please choose a time slot"
              )}
            </span>

            <div className="flex gap-2">
              <Button variant="ghost" size="md" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                disabled={!selectedSlot}
                onClick={handleBooking}
                rightIcon={<ArrowRight className="size-4" />}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
