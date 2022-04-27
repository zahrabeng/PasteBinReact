import PasteTypes from "./pasteTypes"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios";
import Alert from 'react-popup-alert'


export default function Main (): JSX.Element {
    const [paste, setPaste] = useState <PasteTypes[]>([])
    const [code, setCode] = useState("")
    const [language, setLanguage] = useState("none")
    const [alert, setAlert] = useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
      })

    const herokuURL = "https://pastebinserver.herokuapp.com/pastes"

    useEffect (() => {
       async function getAllPastes(){
           const data = await axios.get(herokuURL)
           setPaste(data.data)
       }
       getAllPastes()
    }, [paste])

    function onShowAlert(type:string) {
        setAlert({
          type: type,
          text: 'Demo alert',
          show: true
        })
      }

    async function submitData(){
        if (code === ""){
            onShowAlert("error") 
        }
        await axios.post(herokuURL, {
            code: code,
            language: language
          });
    }


    function getLanguage(event:any){
        setLanguage(event);
    }

    function dropDownList() :JSX.Element{
        return(
            <select onChange = {(e) => getLanguage(e.target.value)}>
                <option>None</option>
                <option>Python</option>
                <option>Css</option>
                <option>Javascript</option>
                <option>Typescript</option>
                <option>Other</option>
            </select> 
        )
    }
    
    const allPastes = paste.map((onePaste:PasteTypes) => (<li key={onePaste.id}>{onePaste.code}{onePaste.language}</li>))
    
    return (
       <>
        <textarea id="allpastes" name="allpastes" rows={15} cols={80} onChange = {(e) => setCode(e.target.value)}/>     
        {dropDownList()}
        <button onClick = {submitData}>SUBMIT</button>
        {allPastes}
        <Alert {alert.text}{alert.show} {alert.type}/>
       </>
    )

}