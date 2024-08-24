import { FC } from "react"
import { toast } from "./ui/use-toast"

type Props = {
    children: string
}

const CopyableText: FC<Props> = ({ children }) => {
    const handleTextClick = async () => {
        await navigator.clipboard.writeText(children)

        toast({
            title: "Texto Copiado para a Área de Transferência!",
            description: <>O texto <span className="text-blue-600">"{children}"</span> foi copiado para a Área de Transferência!`</>,
        })
    }

    return (
        <span
            className="select-all cursor-copy"
            title="Clique aqui para copiar!"
            onClick={handleTextClick}   
        >
            {children}
        </span>
    )
}

export default CopyableText