/** @jsxImportSource theme-ui */
import React from "react";

import { Button } from "theme-ui";

function FilterButton(props) {
  return (
    <Button
      type="button"
      variant="secondary"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
    </Button>
  );
}
export default FilterButton;
