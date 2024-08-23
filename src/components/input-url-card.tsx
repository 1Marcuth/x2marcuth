import { FC } from "react"
import isUrl from "is-url"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Props = {
    url: string | undefined
    isValidUrl: boolean
    setUrl: React.Dispatch<React.SetStateAction<string | undefined>>
    onButtonSendClick: (event: React.MouseEvent<HTMLButtonElement>) => any
}

const InputUrlCard: FC<Props> = ({
    url,
    isValidUrl,
    setUrl,
    onButtonSendClick
}) => {
    function handleInputValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        return setUrl(value)
    }

    return (
        <Card className="dark animate-load-from-top">
            <CardHeader>
                <CardTitle className="text-white text-center text-xl">X2Marcuth</CardTitle>
                <CardDescription className="text-center block">
                    <span className="block mt-5"/>
                    <span>Baixe vídeos, áudios e músicas do YouTube de graça.</span>
                    <span className="block mb-6"/>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-start text-xs my-2 mx-[8%]">
                    <span className="flex items-center gap-1">
                        <i className="bi bi-link-45deg text-slate-600"/>
                        <span  className="text-slate-500">Cole ou digite sua URL</span>
                    </span>
                </div>
                <fieldset className="flex justify-center">
                    <Input
                        className="min-w-[250px] w-[80%] rounded-r-none"
                        placeholder="Sua URL aqui..."
                        value={url ?? ""}
                        onChange={handleInputValueChange}
                    />
                    <Button
                        variant="outline"
                        className="rounded-l-none"
                        disabled={!isValidUrl}
                        onClick={onButtonSendClick}
                    >
                        <i className="bi bi-send"/>
                    </Button>
                </fieldset>
                {(!isValidUrl && isUrl(url!)) ? (
                    <div className="flex justify-start text-xs my-2 mx-[8%]">
                        <span className="flex items-center gap-1">
                            <i className="bi bi-exclamation-triangle text-red-300"/>
                            <span className="text-red-400">Insira uma URL de vídeo válida!</span>
                        </span>
                    </div>
                ) : (url && !isValidUrl) && (
                    <div className="flex justify-start text-xs my-2 mx-[8%]">
                        <span className="flex flex-col items-start justify-center">
                            <div className="flex gap-1 mb-2">
                                <i className="bi bi-exclamation-triangle text-yellow-300"/>
                                <span className="text-yellow-400 ">Você deve inserir uma URL completa!</span>
                            </div>
                            <div className="text-slate-500"><b>Ex:</b> https://youtu.be/Suj5RCyMP2Q?si=6WuzST2gtjj5N3gU</div>
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default InputUrlCard