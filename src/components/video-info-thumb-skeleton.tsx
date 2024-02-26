import { FC } from "react"

import { Skeleton } from "./ui/skeleton"

const VideoInfoThumbSkeleton: FC = () => {
    return (
        <div>
            <Skeleton className="h-[200px] w-[355px]"/>
        </div>
    )
}

export default VideoInfoThumbSkeleton