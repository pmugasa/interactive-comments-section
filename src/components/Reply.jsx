function Reply({ reply, currentUser, upVote, downVoteReply, upVoteReply }) {
  return (
    <>
      <div className="h-fit w-full border-2 border-gray-100 shadow-sm font-rubik text-sm bg-white mt-4 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <img src={reply.user.image.webp} className="h-6 w-6" />
          <p className="font-bold text-gray-600 text-md">
            {reply.user.username}
          </p>
          {reply.user.username === currentUser.username ? (
            <p className="text-md font-rubik text-white w-8 text-center rounded-sm bg-moderateBlue">
              you
            </p>
          ) : null}

          <p className="text-gray-400 ">{reply.createdAt}</p>
        </div>
        <p className="mt-4 text-gray-400 text-base">
          {reply.replyingTo ? (
            <span className="font-bold text-purple mr-1">
              @{reply.replyingTo}
            </span>
          ) : null}
          {reply.content}
        </p>
        <div className="flex mt-4">
          <div className="flex space-x-4">
            <button onClick={() => downVoteReply(reply.id)}>
              <img src="src\assets\icon-minus.svg" />
            </button>

            <span className="font-semibold text-purple text-base">
              {reply.score}
            </span>
            <button onClick={() => upVoteReply(reply.id)}>
              <img src="src\assets\icon-plus.svg" />
            </button>
          </div>
          <div className=" ml-auto">
            {reply.user.username === currentUser.username ? (
              <div className="flex space-x-4 text-base">
                <button className="flex items-center justify-center text-softRed space-x-2">
                  <img src="src\assets\icon-delete.svg" />
                  <span className="font-semibold ">Delete</span>
                </button>
                <button className="flex items-center justify-center  text-purple space-x-2">
                  <img src="src\assets\icon-edit.svg" />
                  <span className="font-semibold  ">Edit</span>
                </button>
              </div>
            ) : (
              <button className="flex items-center justify-center space-x-2">
                <img src="src\assets\icon-reply.svg" />
                <span className="font-semibold text-purple text-base">
                  Reply
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Reply;
