import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CommentTypes from "./commentTypes";

export default function Comments(props: { id: number }): JSX.Element {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<CommentTypes[]>([]);

  useEffect(() => {
    async function getAllComments() {
      const data = await axios.get(
        `https://pastebinserver.herokuapp.com/pastes/${props.id}/comments`
      );
      setAllComments(data.data);
    }
    getAllComments();
  }, [allComments]);

  async function submitComment() {
    if (comment === "") {
      window.alert("Comment needs to be added for submission");
    } else {
      await axios.post(
        `https://pastebinserver.herokuapp.com/pastes/${props.id}`,
        {
          comments: comment,
        }
      );
    }
  }

  async function deleteComment(commentId: number) {
    axios.delete(
      `https://pastebinserver.herokuapp.com/pastes/${props.id}/comments/${commentId}`
    );
  }

  const listOfComments = allComments.map((oneComment: CommentTypes) => (
    <div key={oneComment.commentid}>
      {oneComment.comment}
      <button onClick={() => deleteComment(oneComment.commentid)}>
        Delete
      </button>
    </div>
  ));

  return (
    <>
      <div>
        <textarea
          id="allpastes"
          name="allpastes"
          rows={10}
          cols={30}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={() => submitComment}>Submit</button>
      </div>

      {listOfComments}
    </>
  );
}
