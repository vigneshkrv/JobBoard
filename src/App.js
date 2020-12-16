import React, { Component } from "react";
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
import Paper from "@material-ui/core/Paper";
import TimeAgo from "react-timeago";
import "./App.css";

const ApiURL = `http://localhost:8080/api/positions`;

const Typograph = styled(Typography)({
  flexGrow: 1,
});

const CardJob = styled(Card)({
  float: "left",
  minWidth: 300,
  minHeight: 250,
  margin: 30,
});

const CardTypo = styled(Typography)({
  color: "#5865E0",
  fontWeight: "bold",
  marginLeft: 15,
});

const CardTypo2 = styled(Typography)({
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 0.54)",
});

const CardGrid = styled(Grid)({
  justifyContent: "center",
  marginTop: -10,
  // height: 150,
});

const MakeCards = (data) => {
  console.log(data);
  return (
    <Grid item lg={3}>
      <CardJob key={data.data.id}>
        <CardActionArea>
          <CardMedia
            component="img"
            width="100"
            height="120"
            src={data.data.company_logo}
          />
          <CardContent>
            <CardTypo2 variant="p" component="p">
              <TimeAgo date={data.data.created_at} /> &#8226; {data.data.type}
            </CardTypo2>
            <Typography gutterBottom variant="p" component="h4">
              {data.data.title}
            </Typography>
            <Typography variant="p" color="textSecondary" component="p">
              {data.data.company}
            </Typography>
          </CardContent>

          <CardTypo variant="p" component="p">
            {data.data.location}
          </CardTypo>
        </CardActionArea>
      </CardJob>
    </Grid>
  );
};

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    description: "",
    location: "",
    fullTimeChecked: false,
    jobs: [],
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (err) => console.log(err)
    );
  }
  /* `http://localhost:8080/api/positions/currentLocation?lat=${this.state.latitude}&long=${this.state.longitude}` */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.latitude !== this.state.latitude) {
      axios.get(ApiURL).then((res) => {
        this.setState({ jobs: res.data });
      });
    }
  }

  handleChange = () => {
    this.setState({ fullTimeChecked: !this.state.fullTimeChecked });
  };

  handleClick = () => {
    axios
      .get(
        ApiURL +
          `?description=${
            this.state.description ? this.state.description : ""
          }&location=${
            this.state.location ? this.state.location : ""
          }&full_time=${this.state.fullTimeChecked}`
      )
      .then((res) => {
        this.setState({ jobs: res.data });
      });
  };

  render() {
    const { jobs } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typograph variant="h6">DevJobs</Typograph>
          </Toolbar>
        </AppBar>
        <CardGrid container>
          <Grid item lg={8}>
            <Paper>
              <form noValidate autoComplete="off">
                <TextField
                  style={{ width: "33%" }}
                  id="outlined-basic"
                  label="Filter by Title, Company, Expertise"
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </form>
              <form noValidate autoComplete="off">
                <TextField
                  style={{ width: "33%" }}
                  id="outlined-basic"
                  label="Filter by location"
                  variant="outlined"
                  onChange={(e) => {
                    this.setState({ location: e.target.value });
                  }}
                />
              </form>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.fullTimeChecked}
                      onChange={this.handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Primary"
                />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#5865E0" }}
                  onClick={this.handleClick}
                >
                  Search
                </Button>
              </FormGroup>
            </Paper>
          </Grid>
        </CardGrid>
        <Grid container spacing={3}>
          {jobs &&
            jobs.map((job) => {
              return <MakeCards data={job} />;
            })}
        </Grid>
      </div>
    );
  }
}

export default App;
