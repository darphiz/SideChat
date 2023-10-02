import React from 'react'
import { Select, Radio, RadioGroup, Stack  } from '@chakra-ui/react'
import {useEffect} from 'react'

const ChevronDownIcon = () => {
    return (
        <>
            <div className='dark:hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12.6711 15L19 9" stroke="#14746F" strokeWidth="2"/>
                </svg>
            </div>
            <div className='dark:block hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12.6711 15L19 9" stroke="#d1d5db" strokeWidth="2"/>
                </svg>
            </div>
        </>
    )
}

const default_settings = {
    gpt_access: 'default',
    api_key: '',
    language: 'english',
    theme: 'light',
    sidebar_location: 'right'
}

const SettingsPage = () => {

    const {language} = default_settings
    const [gptAccess, setGptAccess] = React.useState(default_settings.gpt_access)
    const [apiKey, setApiKey] = React.useState(default_settings.api_key)
    const [theme, setTheme] = React.useState(default_settings.theme)
    const [sidebarLocation, setSidebarLocation] = React.useState(default_settings.sidebar_location)
    const cancelTab = () =>chrome.runtime.sendMessage(
        {action: "closeSettingsTab"}
    );
    
    const isDarkMode = !!(theme === 'dark')
    
    const saveSettings = ()=>{
        const data = {
            language,
            gptAccess,
            apiKey,
            theme,
            sidebarLocation
        }        
        // save settings to local storage
        chrome?.storage?.local?.set({settings: data}, () => {
            console.log('Settings saved to local storage')
        })

        //push settings to background script
        chrome?.runtime?.sendMessage({action: "updateSettings", data});
        cancelTab();
    }

    console.log(isDarkMode)

    useEffect(() =>
        {   
            const init = ()=> {
                chrome?.storage?.local.get(['settings'], function(result) {
                    const {settings} = result;
                    console.log('Retrieved settings:', settings);
                    if (settings){
                        setGptAccess(settings?.gptAccess)
                        setApiKey(settings?.apiKey)
                        setTheme(settings?.theme)
                        setSidebarLocation(settings?.sidebarLocation)
                    }
                });
            }

            if (document.readyState !== 'loading'){
                init()
            } 
            else {
                document.addEventListener('DOMContentLoaded', init);
            }
        }       
    , [])
  
    return (
       <div className={`${isDarkMode ? "dark": "light" }`}>
       <div className="min-w-full min-h-screen bg-[#E3E5EE;] p-3 dark:bg-gray-900 dark:text-gray-300">
            <div className="md:w-2/5 bg-white mx-auto rounded-md dark:bg-gray-500">
                <div className='py-4 border-b'>
                    <h1 className='text-center text-2xl font-bold'>Side Chat Settings</h1>
                </div>
                <div className='p-4'>
                    <h2 className='my-4 font-semibold text-md'>How to access ChatGPT and use it anywhere</h2>
                    <RadioGroup onChange={setGptAccess} value={gptAccess}>
                        <Stack >
                            <Radio value='default' colorScheme='green'>
                                <span>Side Chat</span> 
                                <span className='ml-2 text-[.7rem] text-[#14746F] dark:text-gray-900'>(Recommended for everyone)</span>
                            </Radio>
                            <Radio value='api_key' colorScheme='green'>
                                <span>OpenAI API key</span>
                                <span className='ml-2 text-[.7rem] text-[#14746F] dark:text-gray-900'>(For developers with API key)</span>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    
                    {
                        gptAccess === 'api_key' && 
                        <input 
                            type='text'
                            className='w-full my-2 p-2 border outline-none rounded'
                            placeholder='Enter OpenAI API key'
                            value={apiKey}
                            onInput={(e) => setApiKey(e.target.value)}
                        />   
                    }

                    <h2 className='my-4 font-semibold text-md'>General Settings</h2>
                    <div className='flex flex-col space-y-1 my-3'>
                        <label htmlFor="language" className='text-sm opacity-60'>Language</label>
                        <Select 
                            name="language" 
                            id="language" 
                            icon={<ChevronDownIcon/>}
                            size='md'
                            defaultValue={language} 
                        >
                            <option value="english">English</option>
                        </Select>
                    </div>

                    <div className='flex flex-col space-y-1 my-3'>
                        <label htmlFor="theme" className='text-sm opacity-60'>Theme</label>
                        <Select 
                            name="theme" 
                            id="theme" 
                            icon={<ChevronDownIcon/>}
                            size='md' 
                            onChange={(e) => setTheme(e.target.value)}  
                            value={theme}
                        >
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                        </Select>
                    </div>

                    <h2 className='my-4 font-semibold text-md'>Sidebar</h2>
                    <div className='flex flex-col space-y-1 my-3'>
                        <label htmlFor="sidebar_location" className='text-sm opacity-60'>Sidebar Location</label>
                        <Select 
                            name="sidebar_location" 
                            id="sidebar_location" 
                            icon={<ChevronDownIcon/>}
                            size='md' 
                            onChange={(e) => setSidebarLocation(e.target.value)}
                            value={sidebarLocation}
                        >
                            <option value="right">Right</option>
                            <option value="left">Left</option>
                        </Select>
                    </div>
                </div>

                <div className='p-4 my-2 flex justify-end space-x-3 items-center'>
                    <button
                        onClick={cancelTab}
                        className='p-3 border rounded'
                        >Cancel
                    </button>
                    <button
                        onClick={saveSettings}
                        className='p-3 px-5 bg-[#14746F] text-white rounded'
                        >Save
                    </button>
                </div>

            </div>  
        </div>
        </div>
  )
}

export default SettingsPage
