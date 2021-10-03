import React from 'react';

import { Feedback, Fields, Form, Input, Submit } from 'valid-form';

const App = () => {
  
  // todo: limit validation calls to once every 1/3 seconds, make the delay configurable
  function validateUsername(value: string, fields: Fields) {
    if(parseInt(fields.age.value) < 30) {
      return value === "hello" ? "valid" : "invalid";
    }
    
    return value === "hello" ? "invalid" : "valid";
  }

  function validateAge(value: string) {
    const val = parseInt(value);

    if(value === "") {
      return "required";
    }

    return val > 50 ? "valid" : "invalid";
  }

  return (
    <div>
      <Form>
        <Input
          type="text"
          fieldName="username"
          validate={validateUsername}
        />
        <Feedback for="username" />

        <br />

        <Input
          type="range"
          fieldName="age"
          validate={validateAge}
          deps={["username"]}
        />
        <Feedback for="age" />

        <br />

        <Submit />
      </Form>
    </div>
  );
}

export default App;
