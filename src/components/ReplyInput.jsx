import { useState } from "react";
import Button from "./Button";

function ReplyInput({ currentUser, replyToComment, setContent }) {
  return (
    <>
      <div className="h-fit w-full border-2 border-gray-100 shadow-sm font-rubik text-sm bg-white mt-4 rounded-lg p-4">
        <form onSubmit={replyToComment}>
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
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
