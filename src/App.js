/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { Box, ThemeProvider } from "theme-ui";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import ListItem from "./components/ListItem";

import theme from "./theme";
import "./App.scss";

const FILTER_MAP = {
  All: () => true,
  Backlogged: (achievement) => achievement.backlogged,
  Completed: (achievement) => achievement.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
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

  function toggleBacklogged(id) {
    const backloggedAchievements = achievements.map((achievement) => {
      // if this task has the same ID as the edited task
      if (id === achievement.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...achievement, backlogged: !achievement.backlogged };
      }
      return achievement;
    });
    setAchievements(backloggedAchievements);
    console.log(backloggedAchievements);
  }

  function toggleCompleted(id) {
    const completedAchievements = achievements.map((achievement) => {
      // if this task has the same ID as the edited task
      if (id === achievement.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...achievement, completed: !achievement.completed };
      }
      return achievement;
    });
    setAchievements(completedAchievements);
  }

  const list = achievements
    .filter(FILTER_MAP[filter])
    .map((achievement) => (
      <ListItem
        id={achievement.id}
        img={achievement.icon}
        name={achievement.name}
        description={achievement.description}
        completed={achievement.completed}
        backlogged={achievement.backlogged}
        key={achievement.id}
        toggleCompleted={toggleCompleted}
        toggleBacklogged={toggleBacklogged}
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
