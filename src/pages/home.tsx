import { FC, useEffect, useRef, useState } from "react"
import X2download from "x2download"

import getYouTubeVideoMetadata, { YouTubeVideoMeatadata } from "../utils/get-youtube-video-metadata"
import { Format, ParsedVideoInfo } from "x2download/dist/core/get-video-info"
import validateYouTubeVideoUrl from "../utils/validate-youtube-video-url"
import VideoInfoCard from "../components/video-info-card"
import InputUrlCard from "../components/input-url-card"
import ReasonsCard from "../components/reasons-card"
import AppHeader from "../components/app-header"
import Container from "../components/container"
import { corsProxyUrl } from "../settings"
import { useLocalStorage } from "@uidotdev/usehooks"
import isUrl from "is-url"
import { saveMedia } from "client-helper/dist"

const HomePage: FC = () => {
    const [ videoInfoWithMetadada, setVideoInfoWithMetadata ] = useState<(ParsedVideoInfo & YouTubeVideoMeatadata) | null>()
    const [ removeWebsitePrefix, setRemoveWebsitePrefix ] = useLocalStorage<boolean>("removeWebsitePrefix", false)
    const [ useCustomProxy, setUseCustomProxy ] = useLocalStorage<boolean>("useCustomProxy", false)
    const [ customProxyUrl, _ ] = useLocalStorage<string>("customProxyUrl")
    const [ proxyUrl, setProxyUrl ] = useState<string>(corsProxyUrl)
    const x2downloadRef = useRef(new X2download({ corsProxyUrl: proxyUrl }))
    const [ videoInfoCard, setVideoInfoCard ] = useState<JSX.Element>()
    const [ videoInfo, setVideoInfo ] = useState<ParsedVideoInfo>()
    const [ url, setUrl ] = useState<string>()

    const isValidUrl = (url ? true : false) && validateYouTubeVideoUrl(url!)

    const handleDownloadButtonClick = async (format: Format): Promise<any> => {
        if (!videoInfo || !videoInfoWithMetadada) {
            return alert("Não foi possível encontrar os dados do vídeo!")
        }

        try {
            const fileUrl = await x2downloadRef.current.getFileUrl({ format })

            console.log(removeWebsitePrefix)

            if (!removeWebsitePrefix) {
                return window.open(fileUrl)
            }

            const websitePrefix = "X2Download.app-"
            const fileName = `${videoInfo.fileName}.${format.fileExtension}`.replace(websitePrefix, "").trim()

            try {
                const response = await fetch(`${proxyUrl}${fileUrl}`)
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement("a")

                link.style.display = "none"
                link.href = url
                link.download = fileName
                document.body.appendChild(link)
                link.click()
                window.URL.revokeObjectURL(url)
            } catch(error) {

            }
            
            try {
                // await saveMedia({
                //     source: `${proxyUrl}${fileUrl}`,
                //     fileName: fileName
                // })
            } catch(error) {
                console.error(error)
            }
        } catch(error) {
            console.error(error)
            alert("Não foi possível obter a URL de download desse arquivo! Por favor, tente outro formato ou entre em contanto com @marcuth.dev!")
        }
    }

    const handleButtonSendClick = async (): Promise<void> => {
        if (!url || !validateYouTubeVideoUrl(url!)) {
            return alert("Por favor, insira uma URL válida de um vídeo do YouTube!")
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
        if (customProxyUrl && isUrl(customProxyUrl) && useCustomProxy) {
            setProxyUrl(customProxyUrl)
        } else {
            setProxyUrl(corsProxyUrl)
        }
    }, [customProxyUrl, useCustomProxy])

    useEffect(() => {
        console.log("Proxy URL: " + proxyUrl)
    }, [proxyUrl])

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
            </Container>
        </div>
    )
}

export default HomePage