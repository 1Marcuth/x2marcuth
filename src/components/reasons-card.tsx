import { FC } from "react"

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

const ReasonsCard: FC = () => {
    return (
        <Card className="dark animate-load-from-top">
            <CardHeader>
                <CardTitle className="text-white text-center text-xl">Razões</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm mb-2">Não é novidade para ninguém que atualmente a maioria dos sites de download de vídeos são infestados de propagandas duvidosas como de cassinos e outros tipos de sites inapropiados, pois bem, eu quis construir esse site como uma ferramenta pessoal e para quem mais quiser desfrutar das funcionalidades dele.</p>
                <p className="text-sm mb-2">Não tenho a mínima idea de quantos usuários ele pode suportar, mas para exclarecer: eu estou usando uma API privada de um site (sem autenticação e não documentada) para conseguir gerar esses links e baixar esses arquivos de mídia. Mas como estamos em client-side algumas APIs bloqueiam páginas se a origem não for de um host específico (nesse caso, URL do site original). Para contornar isso eu tive que subir um servidor proxy de CORS e assim evitar o bloqueio.</p>
            </CardContent>
        </Card>
    )
}

export default ReasonsCard