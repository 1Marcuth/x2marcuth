import { FC } from "react"

import { Skeleton } from "./ui/skeleton"

const VideoInfoTitleSkeleton: FC = () => {
    return (
        <div className="flex mb-3">
            <Skeleton className="h-[18px] md:w-[355px] w-[80vw]"/>
        </div>
    )
}

export default VideoInfoTitleSkeleton