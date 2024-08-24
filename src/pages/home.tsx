import { FC, useContext, useEffect, useRef, useState } from "react"
import { useLocalStorage } from "@uidotdev/usehooks"
import { saveMedia } from "client-helper/dist"
import X2download from "x2download"
import isUrl from "is-url"

import getYouTubeVideoMetadata, { YouTubeVideoMeatadata } from "../utils/get-youtube-video-metadata"
import { Format, ParsedVideoInfo } from "x2download/dist/core/get-video-info"
import validateYouTubeVideoUrl from "../utils/validate-youtube-video-url"
import { MainContext } from "../contexts/main.context"
import VideoInfoCard from "../components/video-info-card"
import InputUrlCard from "../components/input-url-card"
import AppFooter from "../components/app-footer/index"
import ReasonsCard from "../components/reasons-card"
import DonateCard from "../components/donate-card"
import { toast } from "../components/ui/use-toast"
import AppHeader from "../components/app-header"
import Container from "../components/container"
import { corsProxyUrl } from "../settings"

const HomePage: FC = () => {
    const [ videoInfoWithMetadada, setVideoInfoWithMetadata ] = useState<(ParsedVideoInfo & YouTubeVideoMeatadata) | null>()
    const [ proxyUrl, setProxyUrl ] = useState<string>(corsProxyUrl)
    const x2downloadRef = useRef(new X2download({ corsProxyUrl: proxyUrl }))
    const [ videoInfoCard, setVideoInfoCard ] = useState<JSX.Element>()
    const [ videoInfo, setVideoInfo ] = useState<ParsedVideoInfo>()
    const [ url, setUrl ] = useState<string>()
    const mainContext = useContext(MainContext)

    const isValidUrl = (url ? true : false) && validateYouTubeVideoUrl(url!)

    const handleDownloadButtonClick = async (format: Format): Promise<any> => {
        if (!videoInfo || !videoInfoWithMetadada) {
            return toast({
                title: "Erro ao Tentar Buscar Dados!",
                description: "Não foi possível encontrar os dados do vídeo!",
                variant: "destructive"
            })
        }

        try {
            const fileUrl = await x2downloadRef.current.getFileUrl({ format })

            if (!mainContext.removeWebsitePrefix) {
                return window.open(fileUrl)
            }

            const websitePrefix = "X2Download.app-"
            const fileName = `${videoInfo.fileName}.${format.fileExtension}`.replace(websitePrefix, "").trim()

            await saveMedia({
                source: `${proxyUrl}${fileUrl}`,
                fileName: fileName
            })
        } catch(error: any) {
            console.error(error)

            toast({
                title: "Erro ao Tentar Baixar o Arquivo!",
                description: <>Não foi possível obter a URL de download desse arquivo! Por favor, tente outro formato ou entre em contato com @marcuth.dev! <span className="jetbrains-mono-font">`{error.message}`</span></>,
                variant: "destructive"
            })
        }
    }

    const handleButtonSendClick = async (): Promise<any> => {
        if (!url || !validateYouTubeVideoUrl(url!)) {
            return toast({
                title: "URL Inválida!",
                description: "Por favor, insira uma URL válida de um vídeo do YouTube!",
                variant: "destructive"
            })
        }
        
        setVideoInfoWithMetadata(null)

        setVideoInfoCard(
            <VideoInfoCard
                data={videoInfoWithMetadada}
                onDownloadButtonClick={handleDownloadButtonClick}
            />
        )

        const info = await x2downloadRef.current.getInfo(url)
        const metadata = await getYouTubeVideoMetadata(url, proxyUrl)
        
        setVideoInfo(info)
        setVideoInfoWithMetadata({
            ...info,
            ...(metadata.description && { description: metadata.description }),
            ...(metadata.thumbnailUrl && { thumbnailUrl: metadata.thumbnailUrl })
        })
    }

    useEffect(() => {
        if (!videoInfoWithMetadada) return

        setVideoInfoCard(
            <VideoInfoCard
                data={videoInfoWithMetadada}
                onDownloadButtonClick={handleDownloadButtonClick}
            />
        )
        
    }, [videoInfoWithMetadada])

    useEffect(() => {
        if (mainContext.useCustomProxy) {
            if (mainContext.customProxyUrl && isUrl(mainContext.customProxyUrl)) {
                setProxyUrl(mainContext.customProxyUrl)

                toast({
                    title: "Proxy Atualizada!",
                    description: <>Agora as requisições e chamadas serão feitas com <span className="jetbrains-mono-font text-green-600">`{mainContext.customProxyUrl}`</span></>
                })
            } else {
                toast({
                    title: "URL do Proxy Inválido!",
                    description: "Por favor, insira uma URL válida para um proxy!",
                    variant: "destructive"
                })

                setProxyUrl(corsProxyUrl)
            }
        } else {
            setProxyUrl(corsProxyUrl)
        }
    }, [mainContext.customProxyUrl, mainContext.useCustomProxy])

    return (
        <div>
            <AppHeader/>
            <Container className="p-2 md:p-0">
                <div className="my-10"/>
                <InputUrlCard
                    url={url}
                    isValidUrl={isValidUrl}
                    setUrl={setUrl}
                    onButtonSendClick={handleButtonSendClick}
                />
                <div className="my-5"/>
                {videoInfoCard}
                {videoInfoCard && <div className="my-5"/>}
                <ReasonsCard/>
                <div className="my-5"/>
                <DonateCard/>
                <div className="my-5"/>
            </Container>
            <AppFooter/>
        </div>
    )
}

export default HomePage