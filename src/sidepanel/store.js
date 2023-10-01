import { create } from 'zustand'

export const usePage = create((set) => ({
    currentPage: 'chat',
    setCurrentPage: (page) => set(() => ({ currentPage: page }))
}))

export const useChat = create((set) => ({
    chats: [],
    addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
    setChats: (chats) => set(() => ({ chats: chats })),
}))

export const useCurrentChat = create((set) => ({
    chatId: null,
    setChatId: (id) => set(() => ({ chatId: id })),
}))

export const useCoin = create((set) => ({
    coin: 0,
    setCoin: (coin) => set(() => ({ coin: coin })),
}))

export const useGpt = create((set) => ({
    gpt: '3.5',
    setGpt: (gpt) => set(() => ({ gpt: gpt })),
}))

export const useNavBar = create((set) => ({
    showNavBar: false,
    setShowNavBar: (show) => set(() => ({ showNavBar: show })),
}))
