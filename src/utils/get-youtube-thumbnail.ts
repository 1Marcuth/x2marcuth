import * as cheerio from "cheerio"
import axios from "axios"

import { corsProxyUrl } from "../settings"

async function getYouTubeThumbnail(videoUrl: string): Promise<string | null> {
    try {
        const url = `${corsProxyUrl}${videoUrl}`
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const thumbnailTag = $("meta[property='og:image']")
        
        if (thumbnailTag) {
            const thumbnailUrl = thumbnailTag.attr("content")
            return thumbnailUrl || null
        } else {
            return null
        }
    } catch (error) {
        console.error("Erro ao obter thumbnail do YouTube:", error)
        return null
    }
}

export default getYouTubeThumbnail