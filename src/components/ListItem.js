/** @jsxImportSource theme-ui */
import React, {useContext} from "react";
import propTypes from "prop-types";
import { Box, Button, Card, Image, Flex } from "theme-ui";
import {AchievementContext} from "./achievement-ctx";
import {path} from "ramda";

export default function ListItem(props) {
  const {data, toggleCompleted, toggleBacklogged, ...other} = useContext(AchievementContext);
  // console.log({data, other});
  // console.log(props);
  const completed = path(['completed', props.id])(data)

  return (
    <li sx={{ listStyleType: "none" }}>
      <Card sx={{ background: completed ? "tomato" : "transparent" }}>
        <Flex
          sx={{
            flexDirection: "column",
            alignItems: "center",
            py: 4,
          }}
        >
          <Image
            src={props.img}
            alt={`Steam icon graphic for ${props.name}`}
            pr={2}
            sx={{ width: 80, height: 80 }}
          />
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={completed}
            sx={{ visibility: "hidden" }}
          />
          <label htmlFor={props.id}>{props.name}</label>
          <p>{props.description}</p>
          {props.backlogged && <p>Backlog</p>}
          <Box>
            <Button
              type="Button"
              onClick={() => toggleCompleted(props.id)}
            >
              Mark completed
            </Button>
            <Button
              type="button"
              onClick={() => toggleBacklogged(props.id)}
            >
              Backlog it
            </Button>
          </Box>
        </Flex>
      </Card>
    </li>
  );
}

ListItem.propTypes = {
  id: propTypes.number,
  image: propTypes.string,
  name: propTypes.any,
};
