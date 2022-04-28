import PasteTypes from "./pasteTypes";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Main(): JSX.Element {
  const [paste, setPaste] = useState<PasteTypes[]>([]);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("none");
  const [title, setTitle] = useState("");
  const [id, setId] = useState<number>();
  const [click, setClick] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false)  


  const herokuURL = "https://pastebinserver.herokuapp.com/pastes";

  useEffect(() => {
    async function getAllPastes() {
      const data = await axios.get(herokuURL);
      setPaste(data.data);
    }
    getAllPastes();
  }, [paste]);

  async function handleEdit(id: number) {
    setId(id);
    const data = await axios.get(
      `https://pastebinserver.herokuapp.com/pastes/${id}`
    );
    setCode(data.data[0].code);
    setTitle(data.data[0].title);
    setLanguage(data.data[0].language);
    setClick(false);
  }

  async function submitData() {
    if (code === "") {
      window.alert("Code needs to be added for submission");
    } else {
      await axios.post(herokuURL, {
        code: code,
        language: language,
        title: title,
      });
    }
    setTitle("");
    setCode("");
    setLanguage("none");
    setClick(true);
  }

  async function editPaste() {
    if (code === "") {
      window.alert("Code needs to be added for submission");
    } else {
      await axios.put(`https://pastebinserver.herokuapp.com/pastes/${id}`, {
        code: code,
        language: language,
        title: title,
      });
    }
    setClick(true);
    setTitle("");
    setCode("");
    setLanguage("none");
  }

  async function handleDelete(id: number) {
    axios.delete(`https://pastebinserver.herokuapp.com/pastes/${id}`);
  }


  function dropDownList(): JSX.Element {
    return (
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option>None</option>
        <option>Python</option>
        <option>Css</option>
        <option>Javascript</option>
        <option>Typescript</option>
        <option>Other</option>
      </select>
    );
  }

  const allPastes = paste.map((onePaste: PasteTypes) => (
    <div key={onePaste.id}>
      {onePaste.title}
      {onePaste.language}
      {showMore ? (onePaste.code):(onePaste.code.substring(0,500))}
      <a href="#" onClick={() => setShowMore(!showMore)}>show more</a>
      <button onClick={() => handleDelete(onePaste.id)}>Delete</button>
      <button onClick={() => handleEdit(onePaste.id)}>Edit</button>
    </div>
  ));

  return (
    <>
      <textarea
        id="allpastes"
        name="allpastes"
        rows={15}
        cols={80}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        placeholder="Type title here"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      {dropDownList()}
      {click && <button onClick={submitData}>SUBMIT</button>}
      {!click && <button onClick={editPaste}>SUBMIT EDIT</button>}
      {allPastes}
    </>
  );
}
//
