import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  },[])

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // const days = updateSpots();
    return(
      axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state,
          appointments,
          // days
        });
        updateSpots()
      })
    )
    
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // const days = updateSpots('create');
    return (
      axios.put(`/api/appointments/${id}`, {
        interview: interview
      })
      .then(function (response) {
        setState({
          ...state,
          appointments,
          // days
        });
        updateSpots()
      })
    )
    
  }

  // function updateSpots(requestType) {
  //   const dayIndex = state.days.findIndex(dayObj => dayObj.name === state.day)
  //   const days = state.days
  //   if (requestType === 'create') {
  //     days[dayIndex].spots--
  //   } else {
  //     days[dayIndex].spots++
  //   }
  //   return days;
  // }

  function updateSpots() {
    Promise.all([
      axios.get('/api/days')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data}))
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }

}