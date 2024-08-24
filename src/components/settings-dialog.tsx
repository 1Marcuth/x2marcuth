import { ChangeEvent, FC, ReactNode, useContext } from "react"

import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog"
import { MainContext } from "../contexts/main.context"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"

type Props = {
    children: ReactNode
}

const SettingDialog: FC<Props> = ({ children }) => {
    const mainContext = useContext(MainContext)

    const handleUseCustomProxyCheckboxClick = () => {
        mainContext.setUseCustomProxy(!mainContext.useCustomProxy)
    }

    const handleCustomProxyInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as string
        mainContext.setCustomProxyUrl(value)
    }

    const handleRemoveWebsitePrefixCheckboxClick = () => {
        mainContext.setRemoveWebsitePrefix(!mainContext.removeWebsitePrefix)
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="dark text-white max-sm:w-[90%]">
                <DialogHeader>
                    <DialogTitle className="text-white flex gap-2">
                        <i className="bi bi-gear" />
                        <span>Configurações</span>
                    </DialogTitle>
                    <div className="h-2"></div>
                    <DialogDescription className="max-sm:text-left">Configure a e personalize alguns atributos do downloader.</DialogDescription>
                </DialogHeader>
                <ul className="text-white text-xs">
                    <li className="flex gap-2 items-center py-2 select-none">
                        <Checkbox
                            onClick={handleRemoveWebsitePrefixCheckboxClick}
                            checked={mainContext.removeWebsitePrefix}
                            name="remove-website-prefix"
                            id="remove-website-prefix"         
                        />
                        <label htmlFor="remove-website-prefix" title="Isso custará mais chamadas na proxy, use com moderação!">Remover prefixo do site <span className="text-slate-400">(https://x2download.app/)</span></label>
                    </li>
                    <li className="flex gap-2 items-center py-2 select-none">
                        <Checkbox
                            name="use-custom-proxy"
                            id="use-custom-proxy"
                            checked={mainContext.useCustomProxy}
                            onClick={handleUseCustomProxyCheckboxClick}
                        />
                        <label htmlFor="use-custom-proxy">Utilizar Proxy de CORS personalizada</label>
                    </li>
                    {mainContext.useCustomProxy && (
                        <li>
                            <Input
                                placeholder="Endereço do proxy (ex: https://proxy.cloudflare.workers.dev/)"
                                onChange={handleCustomProxyInputChange}
                                className="text-xs my-2"
                                disabled={!mainContext.useCustomProxy}
                                value={mainContext.customProxyUrl}
                                type="text"
                            />
                        </li>
                    )}
                </ul>
            </DialogContent>
        </Dialog>
    )
}

export default SettingDialog