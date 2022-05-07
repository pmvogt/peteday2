/** @jsxImportSource theme-ui */
import React from "react";
import propTypes from "prop-types";

import { Box, Button, Image, Flex } from "theme-ui";

export default function ListItem(props) {
  return (
    <li sx={{ listStyleType: "none" }}>
      <Box>
        <Flex>
          <Image
            src={props.img}
            alt={`Steam icon graphic for ${props.name}`}
            pr={2}
            sx={{ width: 80, height: 80 }}
          />
          <Flex sx={{ flexDirection: "column", alignItems: "start" }}>
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
            />
            <label htmlFor={props.id}>{props.name}</label>
            <p>{props.description}</p>
            <Box>
              <Button type="Button">Mark completed</Button>
              <Button type="button">Backlog it</Button>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </li>
  );
}

ListItem.propTypes = {
  completed: propTypes.bool,
  id: propTypes.number,
  image: propTypes.string,
  name: propTypes.any,
};
