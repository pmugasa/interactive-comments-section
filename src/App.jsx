import Card from "./components/Card";
import CommentInput from "./components/CommentInput";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("http://localhost:5173/src/data.json");
        setComments(result.data.comments);
        setCurrentUser(result.data.currentUser);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // getting value of input
  console.log(comments);
  console.log(currentUser);
  //function add comments
  function addComment(e) {
    e.preventDefault();
    //comment should have the following
    //username, user image, createdAt, content, score, id
    setComments((prevComment) => [
      ...prevComment,
      {
        id: comments.length + 1,
        content: comment,
        createdAt: "1 minute ago",
        score: 2,
        user: currentUser,
        replies: [],
      },
    ]);
    setComment("");
    console.log("comment:", comments);
  }

  //delete user comments
  function deleteComment(id) {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  }

  //edit user comments
  function handleEditComment(c) {
    setEditingComment(c);
  }
  console.log("editing comment", editingComment);
  function updateComment() {
    const updatedComments = comments.map((comment) => {
      if (comment.id === editingComment.id) {
        return { ...comment, content: editingComment.content };
      } else {
        return comment;
      }
    });
    setComments(updatedComments);
    setEditingComment(null);
  }

  function deleteReply(id) {
    const updatedReplies = replies.filter((reply) => reply.id !== id);
    setReplies(updatedReplies);
  }
  return (
    <>
      <div className="h-full p-4 bg-background font-rubik">
        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          <div>
            {comments.map((comment) => (
              <Card
                key={comment.id}
                currentUser={currentUser}
                comment={comment}
                deleteComment={deleteComment}
                handleEditComment={handleEditComment}
                editingComment={editingComment}
                setEditingComment={setEditingComment}
                updateComment={updateComment}
                setComment={setComment}
              />
            ))}
            <CommentInput
              currentUser={currentUser}
              setComment={setComment}
              addComment={addComment}
              comment={comment}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
