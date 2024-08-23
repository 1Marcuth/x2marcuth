import { ChangeEvent, FC, ReactNode, useState } from "react"
import { useLocalStorage } from "@uidotdev/usehooks"

import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "./ui/dialog"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Props = {
    children: ReactNode
}

const SettingDialog: FC<Props> = ({ children }) => {
    const [ useCustomProxy, setUseCustomProxy ] = useState<boolean>(false)
    const [ customProxy, setCustomProxy ] = useLocalStorage<string>("customProxy", "")

    const handleUseCustomProxyCheckboxClick = () => {
        setUseCustomProxy(!useCustomProxy)
    }

    const handleCustomProxyInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as string
        setCustomProxy(value)
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="dark">
                <DialogHeader>
                    <DialogTitle className="text-white flex gap-2">
                        <i className="bi bi-gear" />
                        <span>Configurações</span>
                    </DialogTitle>
                    <div className="h-2"></div>
                    <DialogDescription>Configure a e personalize alguns atributos do downloader.</DialogDescription>
                </DialogHeader>
                <ul className="text-white text-xs">
                    <li className="flex gap-2 items-center py-2 select-none">
                        <Checkbox name="remove-website-prefix" id="remove-website-prefix"/>
                        <label htmlFor="remove-website-prefix" title="Isso custará mais chamadas na proxy, use com moderação!">Remover prefixo do site <span className="text-slate-400">(https://x2download.app/)</span></label>
                    </li>
                    <li className="flex gap-2 items-center py-2 select-none">
                        <Checkbox
                            name="use-custom-proxy"
                            id="use-custom-proxy"
                            checked={useCustomProxy}
                            onClick={handleUseCustomProxyCheckboxClick}
                        />
                        <label htmlFor="use-custom-proxy">Utilizar Proxy de CORS personalizada</label>
                    </li>
                    {useCustomProxy && (
                        <li>
                            <Input
                                placeholder="Endereço do proxy (ex: https://proxy.cloudflare.workers.dev/)"
                                onChange={handleCustomProxyInputChange}
                                className="text-xs my-2"
                                disabled={!useCustomProxy}
                                value={customProxy}
                                type="text"
                            />
                        </li>
                    )}
                </ul>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Fechar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SettingDialog