/** @jsxImportSource theme-ui */
import { data } from "./data/data";
import { Box, Flex, Image, ThemeProvider } from "theme-ui";
import theme from "./theme";

import "./App.scss";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <form>
          {data &&
            data.map((achievement) => {
              return (
                <Flex key={achievement.id} bg="muted">
                  <Image
                    src={achievement.icon}
                    alt={`Steam icon graphic for ${achievement.name}`}
                    pr={2}
                  />

                  <Flex sx={{ flexDirection: "column", textAlign: "left" }}>
                    <span>{achievement.name}</span>
                    <span>{achievement.description}</span>
                  </Flex>
                </Flex>
              );
            })}
        </form>
      </div>
    </ThemeProvider>
  );
}

export default App;
