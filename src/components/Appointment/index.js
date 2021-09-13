import React from 'react';

import "components/Appointment/styles.scss"

import Form from 'components/Appointment/Form';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from 'components/Appointment/Status';
import useVisualMode from "hooks/useVisualMode";
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview  ? SHOW : EMPTY
  );
  
  function destroy() {
    transition(DELETING, true);
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    
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
          onEdit={() => transition(EDIT)}
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
          onCancel={() => back()}
          onConfirm={destroy}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not cancel the appointment"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could save the appointment"
          onClose={() => back()}
        />
      )}

    </article>
  );
}