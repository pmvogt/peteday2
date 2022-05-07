/** @jsxImportSource theme-ui */
import React from "react";
import { ThemeProvider } from "theme-ui";

import ListItem from "./components/ListItem";

import theme from "./theme";
import "./App.scss";

function App(props) {
  const list = props.achievements.map((achievement) => (
    <ListItem
      id={achievement.id}
      img={achievement.icon}
      name={achievement.name}
      description={achievement.description}
      key={achievement.id}
    />
  ));

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <form>{list}</form>
      </div>
    </ThemeProvider>
  );
}

export default App;
