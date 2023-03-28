export function getAppointmentsForDay(state, day) {
  // Find the day object with the matching name
  const dayObj = state.days.find((dayItem) => dayItem.name === day);

  // If the day is not found or the appointments array is empty, return an empty array
  if (!dayObj || !dayObj.appointments) {
    return [];
  }

  // Map the appointment IDs to the actual appointment objects and return the result
  return dayObj.appointments.map((appointmentId) => state.appointments[appointmentId]);
}

export function getInterviewersForDay(state, day) {
  // Find the day object with the matching name
  const dayObj = state.days.find((dayItem) => dayItem.name === day);

  // If the day is not found or the appointments array is empty, return an empty array
  if (!dayObj || !dayObj.appointments) {
    return [];
  }

  // Find the relevant appointments for the day
  const appointments = dayObj.appointments.map((id) => state.appointments[id]);

  // Extract the interviewer IDs from the appointments
  const interviewerIds = appointments.map((appt) => appt.interview && appt.interview.interviewer);

  // Remove duplicates and null values from the array of interviewer IDs
  const uniqueIds = [...new Set(interviewerIds.filter((id) => id !== null))];

  // Map the interviewer IDs to the actual interviewer objects and return the result
  return uniqueIds.map((id) => state.interviewers[id]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar,
    },
  };
}
