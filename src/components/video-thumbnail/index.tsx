import { FC } from "react"

import styles from "./style.module.scss"

interface IProps {
    url: string
}

const VideoThumbnail: FC<IProps> = ({ url }) => {
    return (
        <div className={styles["video-thumbnail"]}>
            <img
                className={styles["thumbnail-image"]}
                src={url}
                alt="Capa do vídeo"
            />
        </div>
    )
}

export default VideoThumbnail