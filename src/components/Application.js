import React from "react";


import "components/Application.scss";

import DayList from 'components/DayList';
import Appointment from "components/Appointment/index";
import getAppointmentsForDay from 'helpers/selectors_getAppointmetnForDay';
import getInterview from 'helpers/selectors_getInterview';
import getInterviewersForDays from 'helpers/selector_getInterviewersForDay';
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();

  //Creates all appointments from the state
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  
  const allAppointments = dailyAppointments.map(appointment => {
    const interviewers = getInterviewersForDays(state, state.day)
    
    return(
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
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
