import { Link } from "react-router-dom"
import { FC } from "react"

const AppHeaderLogo: FC = () => {
    return (
        <span>
            <Link to="/" className="font-extrabold italic text-lg text-white">X2Marcuth</Link>
        </span>
    )
}

export default AppHeaderLogo