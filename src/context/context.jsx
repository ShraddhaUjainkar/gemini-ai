import { createContext, useState } from 'react';
import run from "../config/genimi";

// Create a context
export const Context = createContext();

// Define the provider component
const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setresultData] = useState("");

    const delayPara = (index, nextWord) =>{
        setTimeout(() => {
            setresultData(prev=>prev+nextWord)
        }, 75*index);
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setresultData('')
        setLoading(true)
        setShowResult(true)
        let response 
        if(prompt !== undefined){
            response = await run(prompt)           
            setRecentPrompt(prompt)
        }else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)           
        }

        let responseArray =response.split("**")
        let newArray= "";
        for (let i = 0; i < responseArray.length; i++) {
            if(i==0 || i%2 !==1){
                newArray += responseArray[i];
            }else{
                newArray += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse = newArray.split("*").join("</br>")
        let newResponseArray = newResponse.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+' ')            
        }
        setLoading(false)
        setInput('')

    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
    );
};

export default ContextProvider;
