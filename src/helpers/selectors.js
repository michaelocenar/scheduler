import React from "react";

export default function getAppointmentsForDay(state, day) {
  // Find the day object with the matching name
  const dayObj = state.days.find((dayItem) => dayItem.name === day);

  // If the day is not found or the appointments array is empty, return an empty array
  if (!dayObj || !dayObj.appointments) {
    return [];
  }

  // Map the appointment IDs to the actual appointment objects and return the result
  return dayObj.appointments.map((appointmentId) => state.appointments[appointmentId]);
}