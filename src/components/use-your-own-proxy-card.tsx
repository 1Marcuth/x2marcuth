import { useLocalStorage } from "@uidotdev/usehooks"
import { FC, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const UseYourOwnProxyCard: FC = () => {
    const [ proxy, setProxy ] = useLocalStorage<string | null>("proxy", null)
    const [ inputValue, setInputValue ] = useState<string>("")

    const handleSubmitProxy = () => {
        setProxy(inputValue)
    }

    return (
        <Card className="dark animate-load-from-top mt-6">
            <CardHeader>
                <CardTitle className="text-white text-center text-xl">Use sua própria Proxy</CardTitle>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}

export default UseYourOwnProxyCard