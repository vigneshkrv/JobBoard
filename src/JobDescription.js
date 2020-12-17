import { React, Component, useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { styled } from "@material-ui/core/styles";
import TimeAgo from "react-timeago";
import { default as style } from "styled-components";
import ReactHtmlParser from "react-html-parser";

import axios from "axios";

const Typograph = styled(Typography)({
  flexGrow: 1,
});

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const T = (props) => <Typography {...props}>{props.children}</Typography>;

const CardTypo = style(T)`
color:rgba(0, 0, 0, 0.54) !important;
  font-weight: bold !important;
  padding:3px;
`;

const CardTypoLocation = style(T)`
color: #5865E0;
font-weight: bold !important;

`;

function JobDescription() {
  const classes = useStyles();

  const { id } = useParams();
  const [job, setJob] = useState({});
  useEffect(() => {
    axios
      .get(`https://sheltered-reaches-49122.herokuapp.com/api/ID?id=${id}`)
      .then((res) => {
        setJob(res.data);
      });
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typograph variant="h6">DevJobs</Typograph>
        </Toolbar>
      </AppBar>

      <div>
        <Card
          className={classes.root}
          style={{
            display: "flex",
            width: "30rem",
            marginTop: -15,
            marginRight: "auto",
            marginBottom: 15,
            marginLeft: "auto",
          }}
        >
          {" "}
          {/* <CardMedia
            component="img"
            width="20"
            height="20"
            src={job.company_logo}
          /> */}
          <CardContent>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={24}
            >
              <Grid item>
                <Typography variant="h5" component="h2">
                  {job.company}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    marginLeft: 25,
                    textDecoration: "none",
                  }}
                  variant="contained"
                  size="small"
                >
                  <a
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    href={job.url}
                  >
                    Company Site
                  </a>
                </Button>
              </Grid>
            </Grid>

            <CardTypoLocation className={classes.pos} color="textSecondary">
              {job.location}
            </CardTypoLocation>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card
          className={classes.root}
          style={{ width: "30rem", margin: "auto" }}
        >
          <CardContent>
            <CardTypo
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <TimeAgo date={job.created_at} /> &#8226; {job.type}
            </CardTypo>
            <Typography variant="h5" component="h2" style={{ display: "flex" }}>
              {job.title}{" "}
              <Button
                style={{
                  backgroundColor: "#3f51b5",
                  color: "#FFFFFF",
                  marginLeft: 25,
                }}
                size="small"
              >
                Apply Now
              </Button>
            </Typography>
            <CardTypoLocation className={classes.pos} color="textSecondary">
              {job.location}
            </CardTypoLocation>
            <Typography variant="body2" component="p">
              {ReactHtmlParser(job.description)}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card
          className={classes.root}
          style={{
            backgroundColor: "#3f51b5",
            color: "#FFFFFF",
            width: "30rem",
            marginTop: 15,
            marginRight: "auto",
            marginBottom: 15,
            marginLeft: "auto",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              How To Apply
            </Typography>
            <Typography variant="body2" component="p">
              {ReactHtmlParser(job.how_to_apply)}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default JobDescription;
