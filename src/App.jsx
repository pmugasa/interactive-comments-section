import Card from "./components/Card";
import CommentInput from "./components/CommentInput";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  //import data from the data json
  const [data, setData] = useState([]);
  let comments = data.comments;
  const currentUser = data.currentUser;

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

  if (!comments) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="h-full p-4 bg-background font-rubik">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              currentUser={currentUser}
              comment={comment}
            />
          ))}
          <CommentInput currentUser={currentUser} />
        </div>
      </>
    );
  }
}

export default App;
