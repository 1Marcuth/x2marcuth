import { FC, useEffect, useState } from "react"
import X2download from "x2download"

import getYouTubeVideoMetadata, { YouTubeVideoMeatadata } from "../utils/get-youtube-video-metadata"
import { Format, ParsedVideoInfo } from "x2download/dist/core/get-video-info"
import validateYouTubeVideoUrl from "../utils/validate-youtube-video-url"
import VideoInfoCard from "../components/video-info-card"
import InputUrlCard from "../components/input-url-card"
import AppHeader from "../components/app-header"
import Container from "../components/container"
import { corsProxyUrl } from "../settings"
import ReasonsCard from "../components/reasons-card"

const HomePage: FC = () => {
    const [ videoInfoWithMetadada, setVideoInfoWithMetadata ] = useState<(ParsedVideoInfo & YouTubeVideoMeatadata) | null>()
    const [ videoInfoCard, setVideoInfoCard ] = useState<JSX.Element>()
    const [ videoInfo, setVideoInfo ] = useState<ParsedVideoInfo>()
    const [ url, setUrl ] = useState<string>()

    const isValidUrl = (url ? true : false) && validateYouTubeVideoUrl(url!)

    const handleDownloadButtonClick = async (format: Format): Promise<void> => {
        if (!videoInfo || !videoInfoWithMetadada) {
            return alert("Não foi possível encontrar os dados do vídeo!")
        }

        const x2download = new X2download({ corsProxyUrl: corsProxyUrl })
        const fileUrl = await x2download.getFileUrl({ info: videoInfo, format })
        window.open(fileUrl)
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

        const x2download = new X2download({ corsProxyUrl: corsProxyUrl })
        const info = await x2download.getInfo(url)
        const metadata = await getYouTubeVideoMetadata(url)
        
        setVideoInfo(info)
        setVideoInfoWithMetadata({ ...info, ...metadata })
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

    return (
        <div>
            <AppHeader/>
            <Container>
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