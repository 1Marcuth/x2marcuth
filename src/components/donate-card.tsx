import { Link } from "react-router-dom"
import { FC } from "react"

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import buyMeACoffeLogo from "../assets/images/buymeacoffe-logo.png"
import koFiLogo from "../assets/images/ko-fi-logo.webp"
import CopyableText from "./copyable-text"

const DonateCard: FC = () => {
    return (
        <Card className="dark animate-load-from-top">
            <CardHeader>
                <CardTitle className="text-xl flex gap-2 items-center justify-center text-red-400">
                    <i className="bi bi-heart"/>
                    <span>Donate</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm mb-2">Está afim de retribuir ou me ajudar com um incentivo financeiro? Fico feliz por sua boa vontade, escolha o valor que quiser (pode ser até mesmo <span title="Sério, mesmo pode mandar! :D" className="text-green-500 underline font-semibold">R$ 0,01</span> hahah xD)...</p>
                <p className="text-sm mb-2">Aqui estão alguns meios de contribuir financeiramente comigo:</p>
                <ul className="list-disc px-4 text-sm max-sm:text-xs">
                    <li className="flex gap-1"><b className="text-[#30B6A8] flex gap-2 items-center"><i className="bi bi-x-diamond-fill"/>PIX (Chave Aleatória):</b><CopyableText>a2cdd5eb-4b50-4026-a505-1d71b6c28a67</CopyableText></li>
                    <li className="flex gap-1"><b className="text-[#FEDC00] flex gap-2 items-center"><img className="w-[14px] max-sm:w-[12px]" src={buyMeACoffeLogo} alt="Buy Me a Coffe Logo"/>Buy me a Coffe:</b><Link className="text-blue-500 hover:text-blue-400 hover:underline transition-all duration-500" to="https://buymeacoffee.com/marcuth" target="_blank">https://buymeacoffee.com/marcuth</Link></li>
                    <li className="flex gap-1"><b className="text-[#29ABE0] flex gap-2 items-center"><img className="w-[14px] max-sm:w-[12px]" src={koFiLogo} alt="Ko-fi Logo"/>Ko-fi:</b><Link className="text-blue-500 hover:text-blue-400 hover:underline transition-all duration-500" to="https://ko-fi.com/marcuth" target="_blank">https://ko-fi.com/marcuth</Link></li>
                </ul>
            </CardContent>
        </Card>
    )
}

export default DonateCard