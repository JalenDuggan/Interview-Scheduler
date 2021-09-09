export default function getInterview(state, interview) {
  if (interview) {
    
    const results = {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    };
    return results;
  }
  return null;
}