export default function getAppointmentsForDay(state, day) {
  //returns an array of appointments for that day
  
  const result = [];
  if (day) {
    for (const dayItem of state.days) {
      if (dayItem.name === day) {
        
        for (const appointmentNum of dayItem.appointments) {
          result.push(state.appointments[appointmentNum])
        }
        return result;
      }
    }
    return result;
  }
  return result;
}
