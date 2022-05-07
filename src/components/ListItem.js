/** @jsxImportSource theme-ui */
import React from "react";
import propTypes from "prop-types";

import { Box, Button, Card, Image, Flex } from "theme-ui";

export default function ListItem(props) {
  return (
    <li sx={{ listStyleType: "none" }}>
      <Card sx={{ background: props.completed ? "tomato" : "transparent" }}>
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
            defaultChecked={props.completed}
            sx={{ visibility: "hidden" }}
          />
          <label htmlFor={props.id}>{props.name}</label>
          <p>{props.description}</p>
          {props.backlogged && <p>Backlog</p>}
          <Box>
            <Button
              type="Button"
              onClick={() => props.toggleCompleted(props.id)}
            >
              Mark completed
            </Button>
            <Button
              type="button"
              onClick={() => props.toggleBacklogged(props.id)}
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
