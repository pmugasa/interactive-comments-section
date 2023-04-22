import { useState } from "react";
import Button from "./Button";

function ReplyInput({
  currentUser,
  setIsReply,
  comments,
  isReply,
  setComments,
  comment,
}) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsReply(null);
    //id,content, createdAt,score,replyingTo,user, username

    const newReply = {
      id: comment.replies.length + 1,
      content: message,
      createdAt: new Date(),
      replyingTo: comment.user,
      user: currentUser,
      username: currentUser.username,
    };

    const upDatedComments = comments.map((comment) => {
      if (comment.id === isReply) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      } else {
        return comment;
      }
    });
    setComments(upDatedComments);
    setIsReply(null);
    setMessage("");
  }
  console.log("comment", comment);

  return (
    <>
      <div className="h-fit w-full border-2 border-gray-100 shadow-sm font-rubik text-sm bg-white mt-4 rounded-lg p-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-gray-200 h-28 w-full rounded-lg p-4 font-rubik text-gray-400 focus:outline-purple"
          />
          <div className="flex items-center mt-4">
            <img src={currentUser.image.webp} className="h-8 w-8" />

            <Button type="submit">REPLY</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReplyInput;
