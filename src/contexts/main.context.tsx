import { createContext, Dispatch, FC, ReactNode, SetStateAction } from "react"
import { useLocalStorage } from "@uidotdev/usehooks"

type MainContextType = {
    useCustomProxy: boolean,
    setUseCustomProxy: Dispatch<SetStateAction<boolean>>,
    customProxyUrl: string,
    setCustomProxyUrl: Dispatch<SetStateAction<string>>,
    removeWebsitePrefix: boolean,
    setRemoveWebsitePrefix: Dispatch<SetStateAction<boolean>>,
}

export const MainContext = createContext<MainContextType>({
    useCustomProxy: false,
    setUseCustomProxy: () => {},
    customProxyUrl: "",
    setCustomProxyUrl: () => {},
    removeWebsitePrefix: false,
    setRemoveWebsitePrefix: () => {},
})

type MainContextProviderProps = {
    children: ReactNode
}

const MainContextProvider: FC<MainContextProviderProps> = ({ children }) => {
    const [ useCustomProxy, setUseCustomProxy ] = useLocalStorage("useCustomProxy", false)
    const [ customProxyUrl, setCustomProxyUrl ] = useLocalStorage<string>("setCustomProxyUrl")
    const [ removeWebsitePrefix, setRemoveWebsitePrefix ] = useLocalStorage<boolean>("removeWebsitePrefix", false)

    return (
        <MainContext.Provider value={{
            useCustomProxy: useCustomProxy,
            setUseCustomProxy: setUseCustomProxy,
            customProxyUrl: customProxyUrl,
            setCustomProxyUrl: setCustomProxyUrl,
            removeWebsitePrefix: removeWebsitePrefix,
            setRemoveWebsitePrefix: setRemoveWebsitePrefix
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContextProvider