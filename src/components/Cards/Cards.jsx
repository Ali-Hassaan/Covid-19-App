import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';


const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return 'Loading...';
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.infected)}>
          <CardContent>
            <Typography variant="h3" color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h3" component="h2">
              <CountUp start={0} end={confirmed.value} duration={2.75} separator="," />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="h5" component="p">
              Number of Infected Cases.
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.recovered)}>
          <CardContent>
            <Typography variant= "h3" color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h3" component="h2">
              <CountUp start={0} end={recovered.value} duration={2.75} separator="," />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="h5" component="p">
              Number of recovered cases.
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography variant="h3" color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h3" component="h2">
              <CountUp start={0} end={deaths.value} duration={2.75} separator="," />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="h5" component="p">
              Number of deaths.
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.RecoveryRate)}>
                <CardContent>
                    <Typography variant="h3" color="textSecondary">
                      Recovery Rate
                      </Typography>
                    <Typography variant="h3">
                        {Math.round(recovered.value/confirmed.value*100)}%
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.DeathRate)}>
          <CardContent>
                    <Typography variant="h3" color="textSecondary">
                      Death Rate</Typography>
                    <Typography variant="h3">
                        {Math.round(deaths.value/confirmed.value*100)}%
                    </Typography>
                </CardContent>   
            </Grid>
</Grid>
    </div>
  );
};
export default Info;