import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    const getDays = axios.get("http://localhost:8001/api/days");
    const getAppointments = axios.get("http://localhost:8001/api/appointments");
    const getInterviewers = axios.get("http://localhost:8001/api/interviewers");
  
    Promise.all([getDays, getAppointments, getInterviewers])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
  
      // Update spots remaining
      const dayId = state.days.find((day) => day.appointments.includes(id)).id;
      const updatedDays = updateSpots(dayId, state.days, appointments);
  
      setState({
        ...state,
        appointments,
        days: updatedDays,
      });
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
  
      // Update spots remaining
      const dayId = state.days.find((day) => day.appointments.includes(id)).id;
      const updatedDays = updateSpots(dayId, state.days, appointments);
  
      setState({
        ...state,
        appointments,
        days: updatedDays,
      });
    });
  };
  

  function updateSpots(dayId, days, appointments) {
    const day = days.find((day) => day.id === dayId);
    const spots = day.appointments.filter((appointmentId) => !appointments[appointmentId].interview).length;
    const updatedDay = { ...day, spots };
  
    const updatedDays = days.map((day) => (day.id === dayId ? updatedDay : day));
    return updatedDays;
  }
  

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };

}