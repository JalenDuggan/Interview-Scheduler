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

  // calls api and setState with api data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  },[])

  //function that set interview object to null
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return(
      axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state,
          appointments,
        });
        updateSpots()
      })
    )
    
  }

  // set interview to interview data and id
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios.put(`/api/appointments/${id}`, {
        interview: interview
      })
      .then(function (response) {
        setState({
          ...state,
          appointments,
        });
        updateSpots()
      })
    )
    
  }

  // updates the number of spots remaining for each interview day
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