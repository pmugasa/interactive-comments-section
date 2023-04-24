import Button from "./Button";

function Reply({
  reply,
  currentUser,
  deleteReply,
  downVoteReply,
  upVoteReply,
  handleEditReply,
  setEditingReply,
  editingReply,
  updateReply,
  getTimeAgo,
  showInputReply,
}) {
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

          <p className="text-gray-400 ">
            {typeof reply.createdAt === "string"
              ? reply.createdAt
              : getTimeAgo(reply.createdAt)}
          </p>
        </div>
        <div className="mt-4 text-gray-400 text-base">
          {reply.replyingTo !== null ? (
            <span className="font-bold text-purple mr-1">
              @{reply.replyingTo}
            </span>
          ) : null}
          {editingReply && editingReply.id === reply.id ? (
            <div>
              <input
                value={editingReply.content}
                onChange={(e) =>
                  setEditingReply({
                    ...editingReply,
                    content: e.target.value,
                  })
                }
                type="text"
                className=" text-base mt-4 border-2 border-gray-200 h-28 w-full rounded-lg p-2 font-rubik text-gray-400 focus:outline-purple"
              />
              <Button onClick={() => updateReply(reply.id)} className="mt-2">
                Update
              </Button>
            </div>
          ) : (
            <p className="mt-4  text-gray-400 text-base">{reply.content}</p>
          )}
        </div>
        <div className="flex mt-4">
          <div className="flex space-x-4">
            <button onClick={() => downVoteReply(reply.id)}>
              <img src="/assets/images/icon-minus.svg" />
            </button>

            <span className="font-semibold text-purple text-base">
              {reply.score}
            </span>
            <button onClick={() => upVoteReply(reply.id)}>
              <img src="/assets/images/icon-plus.svg" />
            </button>
          </div>
          <div className=" ml-auto">
            {reply.user.username === currentUser.username ? (
              <div className="flex space-x-4 text-base">
                <button
                  onClick={() => deleteReply(reply.id)}
                  className="flex items-center justify-center text-softRed space-x-2"
                >
                  <img src="/assets/images/icon-delete.svg" />
                  <span className="font-semibold ">Delete</span>
                </button>
                <button
                  onClick={() => handleEditReply(reply)}
                  className="flex items-center justify-center  text-purple space-x-2"
                >
                  <img src="/assets/images/icon-edit.svg" />
                  <span className="font-semibold  ">Edit</span>
                </button>
              </div>
            ) : (
              <button
                className="flex items-center justify-center space-x-2"
                onClick={() => showInputReply(reply.id)}
              >
                <img src="/assets/images/icon-reply.svg" />
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
