import React, {useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from 'components/DayList';
import Appointment from "components/Appointment/index";


const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
      interview: {
        student: "Lefrancois Valenskie",
        interviewer: {
          id: 2,
          name: "Tori Malcolm",
          avatar: "https://i.imgur.com/Nmx0Qxo.png",
        }
      }
    },
    {
      id: 4,
      time: "3pm",
    },
    {
      id: 5,
      time: "4pm",
      interview: {
        student: "Maaz Iqbal",
        interviewer: {
          id: 3,
          name: "Mildred Nazir",
          avatar: "https://i.imgur.com/T2WwVfS.png",
        }
      }
    }
  ];

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],

    appointments: {}
  });

  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

  const allAppointments = appointments.map(appointment => {
    return(
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    )
  })

  useEffect(() => {
    axios.get("/api/days").then(response => {
      console.log(response.data);
      setDays([...response.data])
    })

  },[])

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {allAppointments}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
