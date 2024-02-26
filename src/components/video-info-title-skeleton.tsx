import { FC } from "react"

import { Skeleton } from "./ui/skeleton"

const VideoInfoTitleSkeleton: FC = () => {
    return (
        <div className="flex mb-3">
            <Skeleton className="w-[355px] h-[18px]"/>
        </div>
    )
}

export default VideoInfoTitleSkeleton