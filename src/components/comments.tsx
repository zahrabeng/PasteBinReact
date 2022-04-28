import { useState } from "react";
import axios from "axios";

export default function Comments(props:{ id: number; }): JSX.Element {
    const [comment, setComment] = useState("")
    async function submitComment () {
        if (comment === "") {
            window.alert("Comment needs to be added for submission");
          } else {
            await axios.post(`https://pastebinserver.herokuapp.com/pastes/${props.id}`, {
              comment: comment
            });
          }
          
    }

    
    return(
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
        {console.log(comment)}
        </>
        
    )
}