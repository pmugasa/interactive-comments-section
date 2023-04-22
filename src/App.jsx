import Card from "./components/Card";
import CommentInput from "./components/CommentInput";
import ReplyInput from "./components/ReplyInput";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [isReply, setIsReply] = useState(null);

  //fetching comments from the server
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("./src/data.json");
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
        return { ...comment, score: comment.score + 1 };
      } else {
        return comment;
      }
    });
    setComments(updatedComments);
  }

  //downvoting comment
  function downVote(id) {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        if (comment.score > 0) {
          console.log("score", comment.score);
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

  //add comments
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

  //update edited comment
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

  //reply to comment
  function replyToComment(id) {
    // need user, timestamp, reply content. id, score

    const updatedReplies = comments.map((comment) => {
      if (comment.id === id) {
        return [
          ...comment.replies,
          {
            id: replies.length + 1,
            content: reply,
            score: 0,
            user: user,
          },
        ];
      }
    });
  }

  //show reply input
  function showReplyInput(id) {
    setIsReply(id);
  }

  return (
    <>
      <div className="h-full p-4 bg-background font-rubik">
        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          <div>
            {comments.map((comment) => (
              <>
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
                  setIsReply={setIsReply}
                  isReply={isReply}
                  showReplyInput={showReplyInput}
                />
                {comment.id === isReply ? (
                  <ReplyInput
                    currentUser={currentUser}
                    comment={comment}
                    setComment={setComment}
                    setIsReply={setIsReply}
                    getTimeAgo={getTimeAgo}
                    comments={comments}
                    setComments={setComments}
                    isReply={isReply}
                  />
                ) : null}
              </>
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
