import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: 150,
    },
  });

export default function SubjectCard(props) {
    const classes = useStyles();
    const history = useHistory();

    const handleOpen = () => {
        history.push(`/subject/${props.subjectId}`);
    }
    
    return (
      <Card className={classes.root} variant='outlined'>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.subjectName}
          </Typography>
          <br />
          <Button 
            onClick={handleOpen}
            variant='contained'
            color='primary'
            >
                View
            </Button>
        </CardContent>
      </Card>
    );
  }