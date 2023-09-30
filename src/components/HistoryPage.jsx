import React from 'react'
import { ArrowRightIcon } from './Icons'
import { endpoint } from '../utils'
export const HistoryPage = () => {

    const [histories, setHistories] = React.useState([])

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

  return (
    <div>
        <h1 className='text-center font-semibold my-6'>Chat Histories</h1>
        {
            histories?.length === 0 ? (
                <div className='bg-white p-4  flex items-center justify-center'>
                    <p className="opacity-40">Feel free to start chatting...</p>
                </div>
            ) :
            <div className='space-y-2 p-2'>
            {
                histories?.map((history) => (
                    <div 
                        key={history.id} 
                        className='bg-white p-4 rounded-xl border flex items-center justify-between'>
                        <p className="opacity-70">{history.query}</p>
                        <ArrowRightIcon className="cursor-pointer w-4 h-4"/>
                    </div>
                ))
            }
        </div>
        }
        
        
    </div>
  )
}
