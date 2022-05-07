import React from "react";

export default function ListItem() {
  return (
    <li>
      <div>
        <input id="item-0" type="checkbox" defaultChecked={true} />
        <label htmlFor="item-0">Achievement Name</label>
        <p>Description</p>
      </div>
      <div>
        <button type="button">Mark completed</button>
        <button type="button">Backlog it</button>
      </div>
    </li>
  );
}
