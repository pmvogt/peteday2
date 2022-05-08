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
import AchievementProvider from "./components/achievement-ctx";

const FILTER_MAP = {
  All: () => true,
  Backlogged: (achievement) => achievement.backlogged,
  Completed: (achievement) => achievement.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // const [achievements, setAchievements] = useState(slice(0, 10, props.achievements)); // use this line for debugging fewer (10) achievements.
  const [achievements, setAchievements] = useState(props.achievements);
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

  const list = achievements
    .filter(FILTER_MAP[filter])
    .map((achievement) => (
      <ListItem
        id={achievement.id}
        img={achievement.icon}
        name={achievement.name}
        description={achievement.description}
        // completed={prop(achievement.id, completed)}
        // backlogged={prop(achievement.id, backlogged)}
        key={achievement.id}
        // the individual list items are only ever going to pass in their own ids.  instead of giving them a general function to pass in id,
        // we can give them a function they call without passing in anything.  probably doesnt matter much except it keeps the mostly-UI components dumber/less logic code.
        // toggleCompleted={() => toggleCompleted(achievement.id)}
        // toggleBacklogged={() => toggleBacklogged(achievement.id)}
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
      <AchievementProvider>
        <div className="App">
          <Form use={addAchievement} />
          <h2>{headingText}</h2>
          <Box>{filterList}</Box>
          <ul>{list}</ul>
        </div>
      </AchievementProvider>
    </ThemeProvider>

  );
}

export default App;
