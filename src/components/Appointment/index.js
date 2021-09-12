import React from 'react';

import "components/Appointment/styles.scss"

import Form from 'components/Appointment/Form';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from 'components/Appointment/Status';
import useVisualMode from "hooks/useVisualMode";
import Confirm from 'components/Appointment/Confirm';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  
  const { mode, transition, back } = useVisualMode(
    props.interview  ? SHOW : EMPTY
  );
  
  async function Delete() {
    transition(DELETING);
    await props.deleteInterview(props.id);
    transition(EMPTY);
  }

  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    await props.bookInterview(props.id, interview);
    transition(SHOW);
  }  
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status 
          message="Saving! It'll only take a sec!"
        />
      )}
      {mode === DELETING && (
        <Status 
          message="Deleting Interview"
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => transition(SHOW)}
          onConfirm={Delete}
          message="Are you sure you would like to delete?"
        />
      )}

    </article>
  );
}