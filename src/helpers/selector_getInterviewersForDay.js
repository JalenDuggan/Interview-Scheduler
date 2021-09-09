export default function getInterviewersForDays(state, day) {
  
  const result = [];
  if (state.days) {
    for (const dayItem of state.days) {
      if (dayItem.name === day) {
        
        for (const interviewNum of dayItem.interviewers) {
          result.push(state.interviewers[interviewNum])
        }
        return result;
      }
    }
    return result;
  }
  return result;
  
}
