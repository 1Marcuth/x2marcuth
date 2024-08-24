import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FC } from "react"

import MainContextProvider from "./contexts/main.context"
import { Toaster } from "./components/ui/toaster"
import HomePage from "./pages/home"

import "./global.scss"

const App: FC = () => {
    return (
        <MainContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster/>
        </MainContextProvider>
    )
}

export default App