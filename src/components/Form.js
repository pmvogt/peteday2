import React, { useState } from "react";
import { Button } from "theme-ui";

function Form(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.addAchievement(name);
    setName(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>I NEED A MEDIC BAG</h1>

      <Button type="submit" className="btn btn__primary btn__lg">
        Add
      </Button>
    </form>
  );
}

export default Form;
