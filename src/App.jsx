import Card from "./components/Card";
import CommentInput from "./components/CommentInput";
import ReplyInput from "./components/ReplyInput";
import Reply from "./components/Reply";
import axios from "axios";
import Button from "./components/Button";

import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [isReply, setIsReply] = useState(null);
  const [content, setContent] = useState("");
  const [editingReply, setEditingReply] = useState(null);
  const [replies, setReplies] = useState(comment.replies);
  const [showInput, setShowInput] = useState(null);

  //fetching comments from the server
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("src/data.json");
        setComments(result.data.comments);
        setCurrentUser(result.data.currentUser);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //upvoting comment
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
    const data = {
      id: comments.length + 1,
      content: comment,
      createdAt: Date.now(),
      score: 0,
      user: currentUser,
      replies: [],
    };

    setComments((prevComment) => [...prevComment, data]);
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

  //show reply input
  function showReplyInput(id) {
    setIsReply(id);
  }

  //reply to another user comment
  function replyToComment(e) {
    e.preventDefault();

    const updatedComments = comments.map((comment) => {
      if (comment.id === isReply) {
        const newReply = {
          id: comment.replies.length + 1,
          content: content,
          score: 0,
          createdAt: Date.now(),
          replyingTo: comment.user.username,
          user: currentUser,
          username: currentUser.username,
        };
        axios.post(newReply).then((result) => {
          console.log(result);
        });
        return { ...comment, replies: [...comment.replies, newReply] };
      } else {
        return comment;
      }
    });

    setComments(updatedComments);
    setIsReply(null);
    setContent("");
  }

  //show reply input to reply
  function showInputReply(id) {
    setShowInput(id);
  }
  //reply to another user reply
  function replyToReply(e) {
    e.preventDefault();

    const updatedComments = comments.forEach((comment) => {
      comment.replies.map((reply) => {
        if (reply.id === isReply) {
          const newReply = {
            id: comment.replies.length + 1,
            content: content,
            score: 0,
            createdAt: Date.now(),
            replyingTo: reply.user.username,
            user: currentUser,
            username: currentUser.username,
          };

          return { ...comment, replies: [...comment.replies, newReply] };
        } else {
          return comment;
        }
      });
    });

    alert("🙇🏾‍♂️ this feature is still under development");
    setShowInput(null);
    setContent("");
  }

  //downvoting Reply
  function downVoteReply(id) {
    const updatedComments = comments.map((comment) => {
      return {
        ...comment,
        replies: comment.replies.map((reply) => {
          if (reply.id === id) {
            return { ...reply, score: reply.score - 1 };
          } else {
            return reply;
          }
        }),
      };
    });
    setComments(updatedComments);
  }

  //upvote Reply
  function upVoteReply(id) {
    const updatedComments = comments.map((comment) => {
      return {
        ...comment,
        replies: comment.replies.map((reply) => {
          if (reply.id === id) {
            return { ...reply, score: reply.score + 1 };
          } else {
            return reply;
          }
        }),
      };
    });
    setComments(updatedComments);
  }

  //delete reply
  function deleteReply(id) {
    const updatedComments = comments.map((comment) => {
      return {
        ...comment,
        replies: comment.replies.filter((reply) => reply.id !== id),
      };
    });

    setComments(updatedComments);
  }

  //edit user comments
  function handleEditReply(r) {
    setEditingReply(r);
  }

  //update edited comment
  function updateReply() {
    const updatedReplies = replies.map((reply) => {
      if (reply.id === editingReply.id) {
        return { ...reply, content: editingReply.content };
      } else {
        return reply;
      }
    });
    setReplies(updatedReplies);
    setEditingReply(null);
  }
  if (isLoading) {
    return <h1>Fetching comments...</h1>;
  }
  return (
    <>
      <div className="h-screen w-screen overflow-auto md:px-40 p-4 bg-background font-rubik">
        <div>
          {comments.map((comment) => (
            <>
              <Card
                //key={comment.id}
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
                showReplyInput={showReplyInput}
              />
              {comment.id === isReply ? (
                <ReplyInput
                  currentUser={currentUser}
                  comment={comment}
                  isReply={isReply}
                  setContent={setContent}
                  replyToComment={replyToComment}
                />
              ) : null}
              <div className="pl-4 mt-4 border-l-2 border-gray-150">
                {comment.replies.length > 0
                  ? comment.replies.map((reply) => (
                      <>
                        <Reply
                          key={reply.id}
                          reply={reply}
                          currentUser={currentUser}
                          upVote={upVote}
                          downVoteReply={downVoteReply}
                          upVoteReply={upVoteReply}
                          deleteReply={deleteReply}
                          handleEditReply={handleEditReply}
                          setEditingComment={setEditingReply}
                          editingReply={editingReply}
                          setEditingReply={setEditingReply}
                          updateReply={updateReply}
                          getTimeAgo={getTimeAgo}
                          showInputReply={showInputReply}
                        />
                        {reply.id === showInput ? (
                          <div className="h-fit w-full border-2 border-gray-100 shadow-sm font-rubik text-sm bg-white mt-4 rounded-lg p-4">
                            <form onSubmit={replyToReply}>
                              <input
                                type="text"
                                onChange={(e) => setContent(e.target.value)}
                                className="border-2 border-gray-200 h-28 w-full rounded-lg p-4 font-rubik text-gray-400 focus:outline-purple"
                              />
                              <div className="flex items-center mt-4">
                                <img
                                  src={currentUser.image.webp}
                                  className="h-8 w-8"
                                />

                                <Button type="submit">REPLY</Button>
                              </div>
                            </form>
                          </div>
                        ) : null}
                      </>
                    ))
                  : null}
              </div>
            </>
          ))}

          <CommentInput
            currentUser={currentUser}
            setComment={setComment}
            addComment={addComment}
            comment={comment}
          />
        </div>
      </div>
    </>
  );
}

export default App;
