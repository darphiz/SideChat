import React from 'react'
import { ArrowRightIcon } from './Icons'
import {ClipboardIcon} from '@heroicons/react/24/outline'
import {PaperAirplaneIcon} from '@heroicons/react/24/solid'
import { useGpt, useCoin, useChat, useCurrentChat } from '../sidepanel/store'
import { endpoint } from '../utils'

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

    const promptGpt = async () => {
        const newChat = {
            "chat_type": "user",
            "message": prompt,
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
        }catch{
            console.log('error')
            setMakingRequest(false)
        }

    }

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
            <div className="my-3 flex items-center justify-between">
                <button className="flex items-center space-x-3 border rounded-full p-2">
                    <img src="/img/coin.png" alt="coin image" className='h-6 w-6' />
                    <span>{coin}</span>
                </button>
                
                <span className="flex items-center space-x-3 border rounded-full p-2 cursor-pointer">
                    <img src="/img/gpt-outline.png" alt="gpt image" className='h-6 w-6' />
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
                        <div className=" flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                    </div>
                ) :
                <div className="border space-x-3 p-2 rounded-xl flex items-end">
                
                <textarea 
                    name="ask" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-2 resize-none outline-none"
                    id="ask"  
                    rows="4" 
                    placeholder="Type prompt here..."
                />
                {
                    prompt ?(
                        <PaperAirplaneIcon 
                            onClick={promptGpt}
                            className="w-8 h-8 cursor-pointer"
                        />
                    ):
                    (
                        <PaperAirplaneIcon 
                            className="w-8 h-8 cursor-pointer opacity-20"
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
        <div className="bg-white px-3 py-1">
            <div className="w-2/3 py-4 ml-auto text-right">
                <p>{message}</p>
            </div>
         
        </div>

    )
}


const GptMessage = ({message, gpt}) => {
    return (
        <div className='bg-[#F7F7F8] p-2'>
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
            <div className=" px-10 py-3">
            <p>{message}</p>
        </div>
        </div>
    )
}