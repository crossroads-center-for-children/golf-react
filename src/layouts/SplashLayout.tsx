import React from 'react';
import { Grid } from '@material-ui/core';

import styles from '../sass/SplashLayout.module.scss';

export default function SplashLayout(): JSX.Element {
  return <Grid className={styles.grid}></Grid>;
}
