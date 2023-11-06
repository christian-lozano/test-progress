import { useEffect, useState } from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import axios from "axios";


import TableBlogLoading from "../components/blog/TableBlogLoading";
import TableBlogPosts from "../components/blog/TableBlogPosts";

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Index({post}) {
  const [queryData, setQueryData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
// console.log(post);
  useEffect(() => {
    fetchData();  
  }, []);


  //* F E T C H   D A T A
  const fetchData = async () => {
    setIsDataLoaded(false);
    //const conn = mysql.createConnection({yourHOST/USER/PW/DB});
    const url = "http://localhost:3000/api/getallblogpost";
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    fetch("http://localhost:3000/api/getallblogpost")
      .then((response) => response.json())
      .then((data) => {
        console.log("fetchData", data);
        setQueryData(data);
        setIsDataLoaded(true);
      });
  };


  //* A D D   R E C O R D
  const handleAddRecord = async () => {
    setIsDataLoaded(false);
    fetch("http://localhost:3000/api/addblogpost", {
      method: "POST",
      body: JSON.stringify({ title: title, body, body }),
    }).then((response) => {
      console.log("Then Response", response);
      fetchData();
    });
  };

  //* U P D A T E   R E C O R D
  const handleUpdateRecord = async (id, title, body) => {
    console.log("handleUpdateRecord", id, title, body);
    setIsDataLoaded(false);
    fetch("http://localhost:3000/api/updateblogpost", {
      method: "POST",
      body: JSON.stringify({ id: id, title: title, body: body }),
    }).then((response) => {
      console.log("Then Response", response);
      fetchData();
    });
  };

  //* R E M O V E   R E C O R D
  const handleRemoveRecord = async (id) => {
    console.log("handleRemoveRecord", id);
    setIsDataLoaded(false);
    fetch("http://localhost:3000/api/deleteblogpost", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    }).then((response) => {
      console.log("Then Response", response);
      fetchData();
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <TextField
              type="text"
              id="standard-basic"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              type="text"
              multiline
              rows={4}
              id="standard-basic"
              label="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <Button variant="contained" onClick={() => handleAddRecord()}>
              Add
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {!isDataLoaded && <TableBlogLoading />}
      {isDataLoaded && (
        <TableBlogPosts
          blogData={queryData}
          handleUpdateRecord={handleUpdateRecord}
          handleRemoveRecord={handleRemoveRecord}
        />
      )}
    </div>
  );
}