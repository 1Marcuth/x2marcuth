import { FC } from "react"

import { Skeleton } from "./ui/skeleton"

const VideoInfoThumbSkeleton: FC = () => {
    return (
        <div>
            <Skeleton className="h-[200px] md:w-[355px] w-[80vw]"/>
        </div>
    )
}

export default VideoInfoThumbSkeleton