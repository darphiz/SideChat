import React from 'react'
import { ArrowRightIcon } from './Icons'
import {ClipboardIcon} from '@heroicons/react/24/outline'
import {PaperAirplaneIcon} from '@heroicons/react/24/solid'

export const ChatPage = () => {
  return (
    <div className='h-full flex flex-col space-y-3'>
        <div className="p-2">
            <div className='flex border space-x-3 items-center rounded-xl p-3'>
                <div>
                    <p className='font-bold'>🤓 Explain a complex sentence</p>
                    <p className='opacity-30 text-[.8rem]'>Tell me something about the Big Bang so that I can explain it to my 5-year-old child</p>
                </div>
                <ArrowRightIcon className="cursor-pointer w-8 h-8"/>
            </div>
        </div>
        <div className='bg-white h-full'>
            <GptMessage
                message="Hi! How can I help you?"
             />
            
            <UserMessage 
                message='What is the Big Bang?'
                gpt='3.5'
            />
            <GptMessage
                message="Hi! How can I help you?"
             />
            
        </div>
        <div className="p-3">
            <div className="my-3 flex items-center justify-between">
                <button className="flex items-center space-x-3 border rounded-full p-2">
                    <img src="/img/coin.png" alt="coin image" />
                    <span>3</span>
                </button>
                
                <span className="flex items-center space-x-3 border rounded-full p-2">
                    <img src="/img/gpt-outline.png" alt="coin image" />
                    <select name="choose_gpt" id="choose_gpt" className="bg-transparent outline-none">
                        <option value="3.5">GPT 3.5</option>
                        <option value="4.0">GPT 4.0</option>
                    </select>
                </span>

            </div>
            <div className="border space-x-3 p-2 rounded-xl flex items-end">
                <textarea 
                    name="ask" 
                    className="w-full p-2 resize-none outline-none"
                    id="ask"  
                    rows="4" 
                    placeholder="Type prompt here..."
                />
                <PaperAirplaneIcon 
                    className="w-8 h-8 cursor-pointer opacity-40"
                />
            </div>
        </div>
    </div>
  )
}


const UserMessage = ({message, gpt}) => {
    return (
        <div className="bg-white px-3 py-1">
            <div className="w-2/3 py-4 ml-auto text-right">
                <p>{message}</p>
            </div>
            <div className="flex items-center justify-between">
                <span className="flex space-x-2 items-center">
                    <img src='/img/gpt.png' alt="gpt-image" />
                    <span>GPT {gpt}</span>
                </span>
                <span className="flex items-center space-x-2">
                    <ClipboardIcon className="w-4 h-4"/>
                    <span>copy</span>
                </span>
            </div>
        </div>

    )
}


const GptMessage = ({message}) => {
    return (
        <div className="bg-[#F7F7F8] px-10 py-3">
            <p>{message}</p>
        </div>
    )
}