import Card from "./components/Card";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  //import data from the data json
  const [data, setData] = useState([]);
  let comments = data.comments;

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("http://localhost:5173/src/data.json");

        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  console.log("comments", comments[1].user);
  console.log("replies", comments[1].replies[1].user);

  if (!comments) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="h-full p-8 bg-background">
          {comments.map((comment) => (
            <Card key={comment.id} user={data.currentUser} comment={comment} />
          ))}
        </div>
      </>
    );
  }
}

export default App;
