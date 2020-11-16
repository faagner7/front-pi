import React from 'react';
import { CircularProgress } from '@material-ui/core';

import classes from './styles.module.css';

const OverlayLoading = () => {
  return (
    <div className={classes.root}>
      <CircularProgress
        className={classes.progress}
        size={60}
        color="primary"
      />
    </div>
  );
};

export default OverlayLoading;
