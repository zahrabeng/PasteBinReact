import PasteTypes from "./pasteTypes"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios";

export default function Main (): JSX.Element {
    const [paste, setPaste] = useState <PasteTypes[]>([])
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
        {allPastes}
       </>
    )

}