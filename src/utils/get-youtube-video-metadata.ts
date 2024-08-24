import * as cheerio from "cheerio"
import axios from "axios"

export type YouTubeVideoMeatadata = {
    thumbnailUrl?: string | null
    description?: string | null
}

async function getYouTubeVideoMetadata(videoUrl: string, corsProxyUrl: string): Promise<YouTubeVideoMeatadata> {
    try {
        const url = `${corsProxyUrl}${videoUrl}`
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const thumbnailTag = $("meta[property='og:image']")
        const descriptionTag = $("meta[property='og:description']")
        
        const thumbnailUrl = thumbnailTag ? thumbnailTag.attr("content") : null
        const description = descriptionTag ? descriptionTag.attr("content") : null
        
        return {
            thumbnailUrl: thumbnailUrl,
            description: description
        }
    } catch (error) {
        console.error("Erro ao obter informações do vídeo do YouTube:", error)

        return {
            thumbnailUrl: null,
            description: null
        }
    }
}

export default getYouTubeVideoMetadata