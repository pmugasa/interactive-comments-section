function CommentInput({ currentUser }) {
  return (
    <>
      <div className="h-fit w-full border-2 border-gray-100 shadow-sm bg-white mt-4 rounded-lg p-4">
        <textarea
          rows={2}
          className="border-2 border-gray-200 h-28 w-full rounded-lg p-4 font-rubik text-gray-400 focus:outline-purple"
        >
          Add a comment...
        </textarea>

        <div className="flex items-center mt-4">
          <img src={currentUser.image.webp} className="h-8 w-8" />
          <button className="bg-purple px-6 py-2 ml-auto rounded-md text-white font-bold">
            SEND
          </button>
        </div>
      </div>
    </>
  );
}
export default CommentInput;
