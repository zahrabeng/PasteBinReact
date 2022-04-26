import PasteTypes from "./pasteTypes"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios";

export default function Main (): JSX.Element {
    const [paste, setPaste] = useState <PasteTypes[]>([])
    const [code, setCode] = useState("")

    const herokuURL = "https://pastebinserver.herokuapp.com/pastes"

    useEffect (() => {
       async function getAllPastes(){
           const data = await axios.get(herokuURL)
           setPaste(data.data)
       }
       getAllPastes()
    }, [])


    
    const allPastes = paste.map((onePaste:PasteTypes) => (<li key={onePaste.id}>{onePaste.code}{onePaste.language}</li>))
    
    return (
       <>
    <textarea id="allpastes" name="allpastes" rows={15} cols={80} onChange = {(e) => setCode(e.target.value)}/>        
    {allPastes}
       </>
    )

}