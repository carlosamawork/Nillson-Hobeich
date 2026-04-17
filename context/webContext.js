'use client'
import {createContext, useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'

const WebContext = createContext()

export default function WebProvider({children}) {

    const [pageIsLoaded, setPageIsLoaded] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [modalLocale, setModalLocale] = useState(null)
    const router = useRouter();


    async function changePageIsLoaded() {
        setPageIsLoaded(true)
    }

    return (
        <WebContext.Provider
            value={{
                changePageIsLoaded,
                pageIsLoaded,
                menuOpen,
                setMenuOpen,
                modalLocale,
                setModalLocale,
            }}
        >
            {children}
        </WebContext.Provider>
    )
}

const WebConsumer = WebContext.Consumer

export {WebConsumer, WebContext}
