/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { Box, ThemeProvider } from "theme-ui";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import ListItem from "./components/ListItem";

import theme from "./theme";
import "./App.scss";
// noinspection ES6UnusedImports slice used for a commented out debug line
import {prop, slice} from 'ramda';

const FILTER_MAP = {
  All: () => true,
  Backlogged: (achievement) => achievement.backlogged,
  Completed: (achievement) => achievement.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // const [achievements, setAchievements] = useState(slice(0, 10, props.achievements)); // use this line for debugging fewer (10) achievements.
  const [achievements, setAchievements] = useState(props.achievements);
  const [completed, setCompleted] = useState({});
  const [backlogged, setBacklogged] = useState({});
  const [filter, setFilter] = useState("All");

  function addAchievement(name) {
    const newAchievement = {
      id: "id" + nanoid(),
      name: name,
      completed: false,
      backlogged: false,
    };
    setAchievements([...achievements, newAchievement]);
  }

  function toggleBacklogged(id) {
    setBacklogged({
      /**
       * a lot going on here:
       * ...backlogged is the "spread" operator.  We're using it here because we are already passing an object to setBacklogged.
       * If we did not use the spread operator for backlogged, the new backlogged object would look like:
       * {backlogged: oldBackloggedValue, id: true/false} (all the old backlogged data nested under a backlogged key in the object).
       *
       * putting square brackets around 'id' in the object key tells the compiler that id is a variable and that
       *  it should use the value of id as the key, not the string 'id'.
       *
       *  ! negates the value of backlogged[id]
       */
      ...backlogged,
      [id]: !backlogged[id],
    })
  }

  function toggleCompleted(id) {
    setCompleted({
      ...completed,
      [id]: !completed[id],
    })
  }

  const list = achievements
    .filter(FILTER_MAP[filter])
    .map((achievement) => (
      <ListItem
        id={achievement.id}
        img={achievement.icon}
        name={achievement.name}
        description={achievement.description}
        completed={prop(achievement.id, completed)}
        backlogged={prop(achievement.id, backlogged)}
        key={achievement.id}
        // the individual list items are only ever going to pass in their own ids.  instead of giving them a general function to pass in id,
        // we can give them a function they call without passing in anything.  probably doesnt matter much except it keeps the mostly-UI components dumber/less logic code.
        toggleCompleted={() => toggleCompleted(achievement.id)}
        toggleBacklogged={() => toggleBacklogged(achievement.id)}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const achievementNoun = list.length !== 1 ? "achievements" : "achivements";
  const headingText = `${list.length} ${achievementNoun} remaining`;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Form addAchievement={addAchievement} />
        <h2>{headingText}</h2>
        <Box>{filterList}</Box>
        <ul>{list}</ul>
      </div>
    </ThemeProvider>
  );
}

export default App;
