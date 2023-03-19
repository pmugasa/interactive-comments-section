function Reply({ reply }) {
  //if the current user is the same as the reply user name then we need to include the you tag
  return (
    <>
      <div className="h-fit w-full border-2 border-gray-100 shadow-sm bg-white mt-4 rounded-md p-8">
        <div className="flex items-center space-x-4">
          <img src={reply.user.image.webp} className="h-10 w-10" />
          <p className="font-bold text-gray-600 text-md">
            {reply.user.username}
          </p>
          {}

          <p className="text-gray-400 font-semibold">{reply.createdAt}</p>
        </div>
        <p className="mt-4 font-semibold text-gray-400">
          {reply.replyingTo ? (
            <span className="font-bold text-purple mr-1">
              @{reply.replyingTo}
            </span>
          ) : null}
          {reply.content}
        </p>
        <div className="flex mt-4">
          <div className="flex space-x-4">
            <button>
              <img src="src\assets\icon-minus.svg" />
            </button>

            <span className="font-semibold text-purple">{reply.score}</span>
            <button>
              <img src="src\assets\icon-plus.svg" />
            </button>
          </div>
          <div className=" ml-auto">
            <button className="flex items-center justify-center space-x-2">
              <img src="src\assets\icon-reply.svg" />
              <span className="font-semibold text-purple">Reply</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Reply;
