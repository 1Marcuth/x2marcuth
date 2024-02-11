import { getVideoInfo, convertVideo, createConvertJob } from "x2download/dist"
import { formatFileSize } from "client-helper/dist"
import { FC, useState, ChangeEvent } from "react"
import isUrl from "is-url"

import { corsProxyUrl } from "../../settings"

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
            const videoInfo = await getVideoInfo({
                videoUrl: videoUrl,
                corsProxyUrl: corsProxyUrl
            })

            setVideoFormat(videoInfo.formats[0])
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
            tokenExpiresAt: videoInfo.tokenExpiresAt,
            corsProxyUrl: corsProxyUrl
        })
    
        const conversionJobResult = await createConvertJob({
            serverUrl: conversionResult.conversionServerUrl,
            videoId: videoInfo.id,
            fileName: videoInfo.fileName,
            fileType: videoFormat.fileExtension,
            quality: videoFormat.quality,
            token: videoInfo.token,
            tokenExpiresAt: videoInfo.tokenExpiresAt,
            corsProxyUrl: corsProxyUrl
        })

        if (!conversionJobResult.fileUrl) {
            return alert("Não foi possível obter o a URL do arquivo!")
        }

        window.open(conversionJobResult.fileUrl)
    }

    return (
        <div className={`container ${styles["home-page"]}`}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="mb-4 text-center mt-3 mb-5">X2Marcuth</h1>
                    <div className="input-group mb-3">
                        <input
                            type="url"
                            className="form-control"
                            placeholder="Cole a URL do vídeo do YouTube aqui..."
                            onChange={handleChangeUrl}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleClickSearch}
                        >
                            <i className="bi bi-search"/>
                        </button>
                    </div>
                    {videoInfo && (
                        <div>
                            <p><b>Título: </b>{videoInfo.title}</p>
                            <div className="input-group mb-3">
                                <div className="flex-grow-1 me-2">
                                    <select
                                        className="form-select"
                                        onChange={handleChangeVideoFormat}
                                    >
                                        {videoInfo.formats.map(format => (
                                            <option key={format.qualityKey} value={format.qualityKey}>
                                                {`[${format.fileExtension}] ${format.quality} ${formatFileSize({ fileSizeInBytes: format.size })}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-success"
                                        onClick={handleClickDownloadVideo}
                                    >
                                        <i className="bi bi-download"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage