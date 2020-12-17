import React, { Component, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import TimeAgo from "react-timeago";
import "./App.css";

import { List } from "react-virtualized";

import { useHistory } from "react-router-dom";

import { default as styl, ThemeProvider } from "styled-components";

const ApiURL = `http://localhost:8080/api/positions`;

// const ColorTheme = styl`
//   background-color: #FFFF
// `;

const ColorTheme = styl.base`
  color: #131822
`;

// const T = styl(ColorTheme)`
// `;

const Typograph = styled(Typography)({
  flexGrow: 1,
});

/* const CardJob = styled(Card)({
  float: "left",
  minWidth: 300,
  minHeight: 250,
  margin: 30,
}); */

/* const CardTypo = styled(Typography)({
  color: "#5865E0",
  fontWeight: "bold",
  marginLeft: 15,
});

const CardTypo2 = styled(Typography)({
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 0.54)",
}); */

const G = (props) => <Grid {...props}>{props.children}</Grid>;

const C = (props) => <Card {...props}>{props.children}</Card>;

const T = (props) => <Typography {...props}>{props.children}</Typography>;

const FG = (props) => <FormGroup {...props}>{props.children}</FormGroup>;

const B = (props) => <Button {...props}>{props.children}</Button>;

const CardTypo = styl(T)`
color: ${(props) =>
  props.theme.dark ? "#cfcfcf" : "rgba(0, 0, 0, 0.54)"} !important;
  font-weight: bold !important;
  padding:3px;
`;

const CardGrid = styl(G)`
    justify-content: center;
    margin-top: -10px;
`;

const CardTypoTitle = styl(T)`
  color: ${(props) => (props.theme.dark ? "#FFFFFF" : "black")} !important;
  padding:2px
`;

const CardTypoLocation = styl(T)`
color: #5865E0;
font-weight: bold !important;
margin-left: 15px !important;
`;

const CardJob = styl(C)` 
background-color: ${(props) =>
  props.theme.dark ? "#19212D" : "#FFFF"} !important;
float: "left";
min-width: 300px;
min-height: 270px;
margin: 30px;
`;

const Body = styl.div`
  background-color: ${(props) => (props.theme.dark ? "#131822" : "#F5F6F8")};
  
`;

const Form = styl(FG)`
  justify-content: center;
  height: 5rem;
  background-color: ${(props) =>
    props.theme.dark ? "#131822" : "#F5F6F8"} !important;
`;

const LoadMoreButton = styl(B)`
    background-color: #5865E0 !important;
`;
// const CardGrid = styled(Grid)({
//   justifyContent: "center",
//   marginTop: -10,
//   // height: 150,
// });

//({ index, key, style }, jobs, Click)
const MakeCards = (props, Click) => {
  // console.log(jobs);
  // let job = jobs[index];
  return (
    <Grid onClick={props.Click} item lg={3}>
      <CardJob>
        <CardActionArea>
          <CardMedia
            component="img"
            width="100"
            height="120"
            src={props.data.company_logo}
          />
          <CardContent>
            <CardTypo variant="p" component="p">
              <TimeAgo date={props.data.created_at} /> &#8226; {props.data.type}
            </CardTypo>
            <CardTypoTitle gutterBottom variant="p" component="h4">
              {props.data.title}
            </CardTypoTitle>
            <CardTypo variant="p" color="textSecondary" component="p">
              {props.data.company}
            </CardTypo>
          </CardContent>

          <CardTypoLocation variant="p" component="p">
            {props.data.location}
          </CardTypoLocation>
        </CardActionArea>
      </CardJob>
    </Grid>
  );
};

export default () => {
  let [description, setDescription] = useState("");

  let [location, setLocation] = useState("");

  let [fullTime, setFullTime] = useState(false);

  let [jobs, setJobs] = useState([]);

  let [theme, setTheme] = useState({ dark: true });

  let [counter, setCounter] = useState(0);

  let history = useHistory();

  useEffect(() => {
    axios.get(ApiURL).then((res) => {
      setJobs(res.data);
    });
  }, []);

  let handleLoadMore = () => {
    setCounter((prevCount) => {
      let count = prevCount + 1;
      console.log(count);
      axios.get(ApiURL + `?page=${count}`).then((res) => {
        setJobs((prevData) => {
          console.log([...prevData, res.data]);
          return [...prevData, ...res.data];
        });
      });

      return count;
    });
  };

  let handleChange = () => {
    setFullTime(!fullTime);
  };
  let onClickJob = (job) => {
    // console.log(this.props);
    history.push(`/jobdescription/${job.id}`);
  };
  let handleClick = () => {
    axios
      .get(
        ApiURL +
          `?description=${description ? description : ""}&location=${
            location ? location : ""
          }&full_time=${fullTime}`
      )
      .then((res) => {
        setJobs(jobs);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Body>
        <AppBar position="static">
          <Toolbar>
            <Typograph variant="h6">DevJobs</Typograph>
            <Switch
              checked={theme.dark}
              onChange={() => setTheme({ dark: !theme.dark })}
              color="secondary"
              name="ThemeChanger"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </Toolbar>
        </AppBar>
        <CardGrid container>
          <Grid item lg={6}>
            <Paper>
              <Form row>
                <FormControlLabel
                  control={
                    <TextField
                      id="outlined-basic"
                      label="Filter by Title, Company, Expertise"
                      variant="outlined"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  }
                  // label="Filter by Title, Company, Expertise"
                />
                <FormControlLabel
                  control={
                    <TextField
                      id="outlined-basic"
                      style={{ width: "150%" }}
                      label="Filter by location"
                      variant="outlined"
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fullTime}
                      onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Full Time"
                />
                <FormControlLabel
                  control={
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#5865E0" }}
                      onClick={handleClick}
                    >
                      Search
                    </Button>
                  }
                />
              </Form>
            </Paper>
          </Grid>
        </CardGrid>
        {/* <Grid container spacing={3}>
          <List
            width={400}
            height={1000}
            rowHeight={220}
            rowRenderer={({ index, key, style }) =>
              MakeCards({ index, key, style }, jobs)
            }
            rowCount={jobs.length}
            overscanRowCount={3}
          ></List> */}
        <Grid container spacing={3}>
          {jobs &&
            jobs.map((job) => {
              return <MakeCards data={job} Click={() => onClickJob(job)} />;
            })}
        </Grid>
        <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
      </Body>
    </ThemeProvider>
  );
};
