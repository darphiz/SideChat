import React from 'react'
import { ArrowRightIcon } from './Icons'

export const ChatPage = () => {
  return (
    <div className='p-2 h-full flex flex-col space-y-3'>
        <div className='flex border space-x-3 items-center rounded-xl p-3'>
            <div>
                <p className='font-bold'>🤓 Explain a complex sentence</p>
                <p className='opacity-30 text-[.8rem]'>Tell me something about the Big Bang so that I can explain it to my 5-year-old child</p>
            </div>
            <ArrowRightIcon className="cursor-pointer w-8 h-8"/>
        </div>
        <div className='bg-[#E8E8E8] h-full rounded-lg py-8 p-2'>
            <div className="chat chat-start">
                <div className="chat-bubble bg-white text-black">Hi! How can I help you?</div>
            </div>
            <div className="chat chat-end ">
                <div className="chat-bubble text-white bg-[#14746F]">Tell me something about the Big 
                <br /> Bang so that I can explain it to my <br /> 5-year-old child</div>
            </div>

            <div className="chat chat-start">
                <div className="chat-bubble bg-white text-black">Yes exactly, that&apos;s what I wanted to <br /> discuss with you.</div>
            </div>
        </div>
    </div>
  )
}
