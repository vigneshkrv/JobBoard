import { React, Component, useEffect, useState } from "react";
import { useParams } from "react-router";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
const Typograph = styled(Typography)({
  flexGrow: 1,
});
function JobDescription() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  useEffect(() => {
    axios
      .get(`https://sheltered-reaches-49122.herokuapp.com/api/ID?id=${id}`)
      .then((res) => {
        setJob(res.data);
      });
  }, []);

  console.log(id, job);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typograph variant="h6">DevJobs</Typograph>
        </Toolbar>
      </AppBar>
      <Paper elevation={3}></Paper>
    </div>
  );
}

export default JobDescription;
