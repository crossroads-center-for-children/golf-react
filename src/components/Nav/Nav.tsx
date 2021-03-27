import React from 'react';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import crossroads from '../../images/crossroads.png';

export default function Nav(): JSX.Element {
  return (
    <Box>
      <Link to="/">
        <img
          src={crossroads}
          style={{ width: 125 }}
          alt="Crossroads Puzzle Piece"
        />
      </Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/register">Register</Link>
    </Box>
  );
}
