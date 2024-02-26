import { FC } from "react"

import { Skeleton } from "./ui/skeleton"

const VideoInfoDescriptionSkeleton: FC = () => {
    return (
        <div>
            <div className="flex mb-2 gap-1">
                <Skeleton className="w-[160px] h-[6px]"/>
                <Skeleton className="w-[136px] h-[6px]"/>
                <Skeleton className="w-[51px] h-[6px]"/>
            </div>
            <div className="flex mb-2 gap-1">
                <Skeleton className="w-[120px] h-[6px]"/>
                <Skeleton className="w-[116px] h-[6px]"/>
                <Skeleton className="w-[51px] h-[6px]"/>
                <Skeleton className="w-[57px] h-[6px]"/>
            </div>
            <div className="flex mb-2 gap-1">
                <Skeleton className="w-[355px] h-[6px]"/>
            </div>
            <div className="flex mb-2 gap-1">
                <Skeleton className="w-[60px] h-[6px]"/>
                <Skeleton className="w-[76px] h-[6px]"/>
                <Skeleton className="w-[121px] h-[6px]"/>
                <Skeleton className="w-[86px] h-[6px]"/>
            </div>        
        </div>
    )
}

export default VideoInfoDescriptionSkeleton