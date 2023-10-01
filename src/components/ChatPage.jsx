import React from 'react'
import { ArrowRightIcon } from './Icons'
import {ClipboardIcon} from '@heroicons/react/24/outline'
import { useGpt, useCoin, useChat, useCurrentChat } from '../sidepanel/store'
import { endpoint } from '../utils'
import toast, { Toaster } from 'react-hot-toast';

export const ChatPage = () => {
    const gpt_version = useGpt((state) => state.gpt)
    const setGpt = useGpt((state) => state.setGpt)
    const coin = useCoin((state) => state.coin)
    const setCoin = useCoin((state) => state.setCoin)
    const [makingRequest, setMakingRequest] = React.useState(false)

    const initialchat = [
        {
            "chat_type": "gpt",
            "message": "HI there, how can I help you?", 
            "gpt_version": gpt_version   
        }
    ]

    const chats = useChat((state) => state.chats)
    const setChats = useChat((state) => state.setChats)
    const chatId = useCurrentChat((state) => state.chatId)
    const setChatId = useCurrentChat((state) => state.setChatId)
    const [prompt, setPrompt] = React.useState('')

    // initialization
    React.useEffect(() => {
        if (chatId && chats?.length > 0) {
            return
        }
        setChats(initialchat)
        // fetch coins
        const guest_id = localStorage.getItem('guest_cid');
        const fetchCoins = async () => {
            try{
                const res = await fetch(endpoint(`/api/guest/coins/${guest_id}/`))
                const data = await res.json()
                setCoin(data.coins)
            }catch{
                setCoin(0)
            }
            
        }
        fetchCoins()


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setChats])

    const promptGpt = async (custom_prompt=null) => {
        const newChat = {
            "chat_type": "user",
            "message": custom_prompt ?? prompt,
            "gpt_version": gpt_version
        }
        
        const toSendChat = [
            ...chats,
            newChat
        ]
         
        
        
        //fetch guest_id from local storage
        const guest_id = localStorage.getItem('guest_cid');


        // make server calls

        const route = chatId ? `/api/guest/chat/${chatId}/` : '/api/guest/chat/'
        try{
            setMakingRequest(true)
            const res = await fetch(
                endpoint(route),
                {
                    method: chatId ? 'PUT' : 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({guest_id, chats:toSendChat}),
                }
            )
            if (res.statusText !== 'OK') {
                throw new Error('Network response was not ok')
            }
            const data = await res.json()

            // set all data
            setChats(data.chats)
            setCoin(data.coins)
            setChatId(data.chat_id)
            setPrompt('')
            setMakingRequest(false)
        }catch(e){
            console.log(e)
            toast.error("Something went wrong, please try again")
            setMakingRequest(false)
        }

    }


    const promptDefault = async() => {
        const default_prompt = 'Tell me something about the Big Bang so that I can explain it to my 5-year-old child'
        await promptGpt(default_prompt)
    }
    
    return (
    <div className='flex flex-col h-full space-y-3'>
        
        {
            chats?.length <= 1 &&
            <div className="p-2">
            <div className='flex items-center p-3 space-x-3 border rounded-xl'>
                <div>
                    <Toaster />
                    <p className='font-bold'>🤓 Explain a complex sentence</p>
                    <p className='opacity-30 text-[.8rem]'>Tell me something about the Big Bang so that I can explain it to my 5-year-old child</p>
                </div>
                <button
                    onClick={promptDefault}
                >
                    <ArrowRightIcon 
                        className="w-8 h-8 cursor-pointer"
                    />    
                </button>
                
            </div>
        </div>}
        
        <div className='h-full bg-white'>
            {
                chats?.map((chat, index) => {
                    if (chat.chat_type === 'user') {
                        return <UserMessage key={index} message={chat.message} />
                    } else {
                        return <GptMessage key={index} message={chat.message} gpt={chat.gpt_version} />
                    }
                })
            }
        </div>
        <div className="p-3">
            <div className="flex items-center justify-between my-3">
                <button className="flex items-center p-2 space-x-3 border rounded-full">
                    <img src="/img/coin.png" alt="coin image" className='w-4 h-4' />
                    <span className="text-sm">{coin}</span>
                </button>
                
                <span className="flex items-center p-2 space-x-3 text-sm border rounded-full cursor-pointer">
                    <img src="/img/gpt-outline.png" alt="gpt image" className='w-5 h-5' />
                    <select 
                        onChange={(e) => setGpt(e.target.value)}
                        defaultValue={gpt_version}
                        name="choose_gpt" id="choose_gpt" className="bg-transparent outline-none">
                        <option value="3.5">GPT 3.5</option>
                        <option value="4.0">GPT 4.0</option>
                    </select>
                </span>

            </div>
            {
                makingRequest ? (
                    <div className='my-8'>
                        <div className="flex items-center justify-center ">
                            <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                        </div>
                    </div>
                ) :
                <div className="flex items-end p-2 space-x-3 border rounded-xl">
                
                <textarea 
                    name="ask" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-2 outline-none resize-none"
                    id="ask"  
                    rows="4" 
                    placeholder="Type prompt here..."
                />
                {
                    prompt ?(
                        <img 
                            src="/img/arrow-forward.png" 
                            onClick={() => promptGpt()}
                            className="w-5 h-5 cursor-pointer"
                        />
                    ):
                    (
                        <img
                            src="/img/arrow-forward.png" 
                            className="w-5 h-5 opacity-20"
                        />
                    )
                }
                
            </div>

            }
            
            
        </div>
    </div>
  )
}


const UserMessage = ({message}) => {
    return (
        <div className="px-3 py-1 bg-white">
            <div className="w-2/3 py-4 ml-auto text-right">
                <p>{message}</p>
            </div>
         
        </div>

    )
}


const GptMessage = ({message, gpt}) => {
    return (
        <div>
            <div className="flex p-2 text-[0.6rem] items-center justify-between">
                <span className="flex items-center space-x-2">
                    <img src='/img/gpt.png' alt="gpt-image" />
                    <span>GPT {gpt}</span>
                </span>
                <span className="flex items-center space-x-2 cursor-pointer">
                    <ClipboardIcon className="w-3 h-3"/>
                    <span>copy</span>
                </span>
            </div>
            <div className="bg-[#F7F7F8] px-8 py-4">
                <p>{message}</p>
             </div>
        </div>
    )
}