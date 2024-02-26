function validateYouTubeVideoUrl(url: string): boolean {
    const expression = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    return expression.test(url)
}

export default validateYouTubeVideoUrl