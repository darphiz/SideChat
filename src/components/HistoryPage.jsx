import React from 'react'
import { ArrowRightIcon } from './Icons'
import { endpoint } from '../utils'
import { useCoin, useChat, useCurrentChat, usePage } from '../sidepanel/store'
import toast, { Toaster } from 'react-hot-toast';

export const HistoryPage = () => {

    const [histories, setHistories] = React.useState([])
    const setChats = useChat((state) => state.setChats)
    const setChatId = useCurrentChat((state) => state.setChatId)
    const setCoin = useCoin((state) => state.setCoin)
    const setCurrentPage = usePage((state) => state.setCurrentPage)
    
    
    React.useEffect(() => {
        // fetch histories
        const guest_id = localStorage.getItem('guest_cid');
        const fetchHistories = async () => {
            try{
                const res = await fetch(endpoint(`/api/guest/history/${guest_id}/`))
                const data = await res.json()
                if (res.ok) {
                    return setHistories(data.results)
                }
                throw new Error(data.detail)
            }catch{
                console.log('error')
                setHistories([])
            }
            
        }
        fetchHistories()


    }, [])


    const fetchHistoryDetails = async(chat_id) =>{
        try{
            
            const url = endpoint(`/api/guest/chat/${chat_id}/history/`)
            const res =  await fetch(url)
            if (!res.ok){
                toast.error("Unable to fetch history")
            }

            const data = await res.json()
            setChats(data.chats)
            setCoin(data.coins)
            setChatId(data.chat_id)
            setCurrentPage('chat')
        }catch{
            toast.error('Something went wrong...')
        }
    }

    
  return (
    <div>
        <Toaster />
        <h1 className='my-6 font-semibold text-center'>Chat Histories</h1>
        {
            histories?.length === 0 ? (
                <div className='flex items-center justify-center p-4 bg-white  dark:bg-gray-500'>
                    <p className="opacity-40">Feel free to start chatting...</p>
                </div>
            ) :
            <div className='p-2 space-y-2'>
            {
                histories?.map((history) => (
                    <div 
                        key={history.id} 
                        className='flex items-center justify-between w-full p-4 bg-white border rounded-xl'>
                        <p className="opacity-70">{history.query}</p>
                        
                        <button
                            onClick={() => fetchHistoryDetails(history.id)}
                        >
                            <ArrowRightIcon className="w-4 h-4 cursor-pointer"/>                            
                        </button>
                    </div>
                ))
            }
        </div>
        }
        
        
    </div>
  )
}
