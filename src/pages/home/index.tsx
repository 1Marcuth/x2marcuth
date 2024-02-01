import { getVideoInfo, convertVideo, createConvertJob } from "x2download/dist"
import { formatFileSize, saveMedia } from "client-helper/dist"
import { FC, useState, useEffect, ChangeEvent } from "react"
import isUrl from "is-url"

import styles from "./style.module.scss"

type Extra = {
    a: string
    t: number
    p: string
}

type Format = {
    fileExtension: string
    quality: string
    qualityKey: string
    size: number
}

type ParsedVideoInfo = {
    id: string
    title: string
    fileName: string
    token: string
    tokenExpiresAt: number
    message: string
    formats: Format[]
    extra: Extra
}

const HomePage: FC = () => {
    const [ videoInfo, setVideoInfo ] = useState<ParsedVideoInfo>()
    const [ videoFormat, setVideoFormat ] = useState<Format>()
    const [ videoUrl, setVideoUrl ] = useState<string>()

    function handleChangeUrl(event: ChangeEvent<HTMLInputElement>): void {
        const text = event.target.value
        return setVideoUrl(text)
    }

    async function handleClickSearch(): Promise<void> {
        if (!videoUrl || !isUrl(videoUrl)) {
            return alert("Insira uma url válida!")
        }

        try {
            const videoInfo = await getVideoInfo({ videoUrl: videoUrl })

            return setVideoInfo(videoInfo)
        } catch(error) {
            return alert("Não foi possível obter os dados desse vídeo, escolha outra URL ou tente novamente mais tarde!")
        }
    }

    function handleChangeVideoFormat(event: ChangeEvent<HTMLSelectElement>): void {
        if (!videoInfo) return

        const formatQualityKey = event.target.value
        const format = videoInfo.formats.find(format => format.qualityKey === formatQualityKey)

        if (!format) return

        return setVideoFormat(format)
    }

    async function handleClickDownloadVideo(): Promise<void> {
        if (!videoFormat || !videoInfo) {
            return alert("Selecione um formato de vídeo para download!")
        }

        const conversionResult = await convertVideo({
            videoId: videoInfo.id,
            fileType: videoFormat.fileExtension,
            quality: videoFormat.quality,
            token: videoInfo.token,
            tokenExpiresAt: videoInfo.tokenExpiresAt
        })
    
        const conversionJobResult = await createConvertJob({
            serverUrl: conversionResult.conversionServerUrl,
            videoId: videoInfo.id,
            fileName: videoInfo.fileName,
            fileType: videoFormat.fileExtension,
            quality: videoFormat.quality,
            token: videoInfo.token,
            tokenExpiresAt: videoInfo.tokenExpiresAt
        })

        if (!conversionJobResult.fileUrl) {
            return alert("Não foi possível obter o a URL do arquivo!")
        }

        const fileName = videoInfo.fileName.replace("X2Download.app-", "x2Marcuth - ") + "." + videoFormat.fileExtension

        await saveMedia({ source: conversionJobResult.fileUrl, fileName: fileName })
    }

    return (
        <div className={styles["home-page"]}>
            <input type="url" onChange={handleChangeUrl}/>
            <button onClick={handleClickSearch}>Pesquisar</button>
            {videoInfo && (
                <div>
                    <ul>
                        <li><b>Título: </b>{videoInfo.title}</li>
                        <li><b>Id: </b>{videoInfo.id}</li>
                    </ul>
                    <select onChange={handleChangeVideoFormat}>
                        {videoInfo.formats.map(format => {
                            const text = `[${format.fileExtension}] ${format.quality} ${formatFileSize({ fileSizeInBytes: format.size })}`

                            return (
                                <option value={format.qualityKey}>{text}</option>
                            )
                        })}
                    </select>
                    <button onClick={handleClickDownloadVideo}>Baixar</button>
                </div>
            )}
        </div>
    )
}

export default HomePage