import React,{ useContext } from 'react'
import { assets } from '../../assets/assets'
import './Main.css';
import { Context } from '../../context/context';
const Main = () => {
    const  {onSent,recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);
    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.profile} alt="" className="profile" />
            </div>
            <div className="main-container">
                {!showResult?
                <>
                <div className="greet">
                    <p>
                    <span>Hello User</span>
                    </p>
                        <span>How can we assist you?</span>
                </div>
                <div className="cards">
                    <div className="card" onClick={()=>onSent("Suggets something")}>
                        <p>Suggets something</p>
                        <img src={assets.bulb} alt="" className="card-icon" />
                    </div>
                    <div className="card" onClick={()=>onSent("Suggets story")}>
                        <p>Suggets story</p>
                        <img src={assets.bulb} alt="" className="card-icon" />
                    </div>
                    <div className="card" onClick={()=>onSent("Suggets slogan")}>
                        <p>Suggets slogan</p>
                        <img src={assets.bulb} alt="" className="card-icon" />
                    </div>
                </div>
                </>
                :
                <div className="result">
                <div className="result-title">
                    <img 
                    src={assets.profile} 
                    alt="User profile" 
                    className="user-response" 
                    />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-response">
                  {/* Use `dangerouslySetInnerHTML` only if `resultData` is safe and properly sanitized */}
                    {loading? 
                    <div className="loader">
                        <hr />
                        <hr />
                    </div>
                    :
                    <p 
                    dangerouslySetInnerHTML={{ __html: resultData }} 
                    />
                    }
                </div>
                </div>
                }

            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Enter a promt here'/>
                    <div>
                        <img onClick={()=>onSent() } src={assets.send} alt="Send" className="send-btn" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Main