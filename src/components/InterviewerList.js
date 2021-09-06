import React from 'react';

import InterviewerListItem from 'components/InterviewerListItem';

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const interviewers = props.interviewers;
  const allInterviewers = interviewers.map(inter => {
    return (
      <InterviewerListItem
        key={inter.id}
        name={inter.name}
        avatar={inter.avatar}
        selected={inter.id === props.value}
        setInterviewer={event => props.onChange(inter.id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {allInterviewers}
      </ul>
    </section>
  );
}