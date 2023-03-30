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

  function bookInterview(id, interview) {
    const interviewerObj = state.interviewers[interview.interviewer];
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview, interviewer: interview.interviewer },
      // interview: { ...interview, interviewer: interviewerObj }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
  
    // Make a PUT request to update the database with the interview data
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        // Update the state after the response comes back
        setState({
          ...state,
          appointments,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
  
    // Make a DELETE request to update the database
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        // Update the state after the response comes back
        setState({
          ...state,
          appointments,
        });
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };

}