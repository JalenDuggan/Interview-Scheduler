export default function getAppointmentsForDay(state, day) {
  //returns an array of appointments for that day
  
  const found = state.days.find(d => day === d.name);
  if (state.days.length === 0 || found === undefined) return [];
  return found.appointments.map(id => state.appointments[id]);
  
}
