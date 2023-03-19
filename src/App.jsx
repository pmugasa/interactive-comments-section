import Card from "./components/Card";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  //import data from the data json
  let [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("http://localhost:5173/src/data.json");
        setData(result.data.comments);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    data == undefined ? fetchData() : null;
  }, []);
  data ? console.log("we have data", data) : console.log("no data");

  return (
    <>
      <div className="h-screen p-8 bg-background">
        {data.map((comment) => (
          <Card key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}

export default App;
