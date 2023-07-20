import Button from "./Button";

function CommentInput({ currentUser, addComment, setComment, comment }) {
  return (
    <>
      <div className="h-fit w-full border-2 border-gray-100 shadow-sm bg-white mt-4 rounded-lg p-4">
        <form onSubmit={addComment}>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            type="text"
            placeholder="Add comment..."
            className="border-2 border-gray-200 h-28 w-full rounded-lg p-4 font-rubik text-gray-400 focus:outline-purple resize-none"
          ></textarea>

          <div className="flex items-center mt-4">
            <img src={currentUser.image.webp} className="h-8 w-8" />

            <Button type="submit">SEND</Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default CommentInput;
