import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
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
  

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointmentList = dailyAppointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      {...appointment}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  ));

  const { day, days } = state;

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"> 
          <DayList 
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
