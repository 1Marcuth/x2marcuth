import { FC } from "react"

type Props = {
    children: any
}

const Container: FC<Props> = ({ children }) => {
    return (
        <div className="flex justify-center w-full min-h-screen">
            <div className="w-full max-w-[1000px]">{children}</div>
        </div>
    )
}

export default Container