import { formatFileSize } from "client-helper/dist"
import { FC, useEffect, useState } from "react"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,AlertDialogTrigger } from "./ui/alert-dialog"
import { Select, SelectGroup, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem } from "./ui/select"
import { Format, ParsedVideoInfo } from "x2download/dist/core/get-video-info"
import VideoInfoDescriptionSkeleton from "./video-info-description-skeleton"
import { YouTubeVideoMeatadata } from "../utils/get-youtube-video-metadata"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import VideoInfoThumbSkeleton from "./video-info-thumb-skeleton"
import { Button } from "./ui/button"
import VideoInfoTitleSkeleton from "./video-info-title-skeleton"

type Props = {
    data?: (ParsedVideoInfo & YouTubeVideoMeatadata) | null
    onDownloadButtonClick: (format: Format) => any
}

const VideoInfoCard: FC<Props> = ({ data, onDownloadButtonClick }) => {
    const [ currentFormat, setCurrentFormat ] = useState<Format>()

    const handleChangeFormat = (selectValue: string): void => {
        const [ qualityKey, fileExtension, fileSize ] = selectValue.split("-")
        const newFormat = data?.formats.find(format => (
            format.qualityKey === qualityKey &&
            format.fileExtension === fileExtension &&
            String(format.size) === fileSize
        ))

        setCurrentFormat(newFormat!)
    }

    const handleDownloadButtonClick = (): void => {
        if (!currentFormat) return
        onDownloadButtonClick(currentFormat)
    }

    return (
        <Card className="dark animate-load-from-top">
            <CardHeader>
                <CardTitle className="text-white text-center text-xl">
                    {data ? "Informações do vídeo" : "Obtendo informações do vídeo..."}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-center items-center gap-4 md:justify-center md:flex-row">
                    {data ? (
                        <>
                            <div className="flex justify-center items-center w-full max-w-none md:max-w-[355px]">
                                {data.thumbnailUrl ? (
                                    <img
                                        className="w-full rounded-xl"
                                        src={data.thumbnailUrl}
                                        alt={data.title}
                                    />
                                ) : (
                                    <VideoInfoThumbSkeleton/>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="mb-3 text-sm">{data.title}</h3>
                                {data.description ? (
                                    <p className="text-xs text-slate-400">{(() => {
                                        const displayDescription = data.description.length > 300 ? data.description.slice(0, 300) + "..." : data.description

                                        return displayDescription
                                    })()}</p>
                                ) : (
                                    <VideoInfoDescriptionSkeleton/>
                                )}
                                <div className="mt-10 flex gap-1">
                                    <Select onValueChange={handleChangeFormat}>
                                        <SelectTrigger className="max-w-none ">
                                            <SelectValue placeholder="Selecione o formato"/>
                                        </SelectTrigger>
                                        <SelectContent className="dark">
                                            <SelectGroup>
                                                <SelectLabel>Formatos disponíveis</SelectLabel>
                                                {data.formats.map(format => {
                                                    const value = `${format.qualityKey}-${format.fileExtension}-${format.size}`

                                                    return (
                                                        <SelectItem
                                                            key={value}
                                                            value={value}
                                                        >
                                                            {`[${format.fileExtension}] ${format.quality} ${formatFileSize({ fileSizeInBytes: format.size })}`}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button
                                                variant="outline"
                                                onClick={handleDownloadButtonClick}
                                                disabled={currentFormat ? false : true}
                                            >
                                                <i className="bi bi-download"/>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="dark text-white">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    <span className="flex items-center gap-1">
                                                        <i className="bi bi-hourglass-split text-slate-400"/>
                                                    <span>Ei! Espere um pouquinho...</span> 
                                                    </span>
                                                </AlertDialogTitle>
                                                <AlertDialogDescription className="text-sm">Seu download já vai começar, iremos converter o arquivo e abri-lo em uma nova janela para que o navegador baixe ele automaticamente. Não se preocupe, não é um pop-up de propaganda ou algo malicioso ;)</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Ok</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center gap-4 md:justify-center md:items-start md:flex-row flex-col">
                            <VideoInfoThumbSkeleton/>
                            <div>
                                <VideoInfoTitleSkeleton/>
                                <VideoInfoDescriptionSkeleton/>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default VideoInfoCard