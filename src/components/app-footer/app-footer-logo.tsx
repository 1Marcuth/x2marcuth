import { Link } from "react-router-dom"
import { FC } from "react"

const AppFooterLogo: FC = () => {
    return (

        <Link to="/">
            <div className="flex gap-2 text-white text-lg transition-all duration-300 hover:text-slate-300">
                <span className="italic font-bold">X2Marcuth</span>
            </div>
        </Link>
    )
}

export default AppFooterLogo