import React, {useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from 'components/DayList';
import Appointment from "components/Appointment/index";
import getAppointmentsForDay from 'helpers/selectors_getAppointmetnForDay';
import getInterview from 'helpers/selectors_getInterview';
import getInterviewersForDays from 'helpers/selector_getInterviewersForDay';
import useVisualMode from "hooks/useVisualMode";
import Empty from "./Appointment/Empty";

export default function Application(props) {

  //state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  //calls api
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  },[])
  
  //Creates all appointments from the state
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const allAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDays(state, state.day)

    async function bookInterview(id, interview) {
      // console.log(state);
      // console.log(id, interview);
      
      return (
        axios.put(`/api/appointments/${id}`, {
          interview: interview
        })
        .then(function (response) {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          setState({
            ...state,
            appointments
          });

        }).catch(function (error) {
          console.log(error);
        })
      )
      
    }
    
    return(
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    )
  })

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
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {allAppointments}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
