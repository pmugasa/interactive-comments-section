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
  const [upVoteComment, setUpVoteComment] = useState(comment.score);

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

  //upvoting
  function upVote(id) {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        console.log("comment score", comment.score++);
        return { ...comment, score: comment.score++ };
      } else {
        return comment;
      }
    });
    setComments(updatedComments);
  }

  //downvoting
  function downVote(id) {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        if (comment.score > 0) {
          return { ...comment, score: comment.score - 1 };
        }
        return comment;
      } else {
        return comment;
      }
    });
    setComments(updatedComments);
  }

  //timestamp function
  function getTimeAgo(timestamp) {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) {
      return `just now`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    }
  }
  const currentTimeStamp = Date.now();

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
        createdAt: Date.now(),
        score: 0,
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
                getTimeAgo={getTimeAgo}
                upVote={upVote}
                downVote={downVote}
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
