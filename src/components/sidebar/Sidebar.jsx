import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)
  const loadPrompt= async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={()=> setExtended(prev=>!prev)} src={assets.menu} alt="" className="menu" />
        <div className="new-chat" onClick={()=>newChat()}>
          <img src={assets.plus} alt="" className="plus" />
          {extended?<p className="message">New Chat</p>:null}
        </div>
        <div className="recent-chat">
          <img src={assets.history} alt="" className="plus" />

          {extended ? (
            <>
              <p className="message">Recent Chats</p>
            </>
          ) : null}

        </div>
        {
          extended ? (
            <div className="recent-prompts-container">
              {prevPrompts.map((item, index) => (
                <div onCLick={()=> loadPrompt(item)} key={index} className="recent-prompts">
                  <p>{item.slice(0,18)}...</p>
                </div>
              ))}
            </div>
          ) : null
        }

      </div>
      <div className="bottom">

      </div>
    </div>
  )
}

export default Sidebar