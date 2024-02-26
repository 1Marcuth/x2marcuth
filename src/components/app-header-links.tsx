import { Link } from "react-router-dom"
import { FC } from "react"

const linkItems = [
    {
        name: "GitHub",
        icon: "bi bi-github",
        path: "https://github.com/1Marcuth/x2marcuth",
        target: "_blank"
    }
]

const AppHeaderLinks: FC = () => {
    return (
        <ul className="flex">
            {linkItems.map(linkItem => {
                return (
                    <li key={linkItem.name}>
                        <Link
                            to={linkItem.path}
                            className="flex items-center gap-2 transition-all duration-500 text-white text-sm hover:bg-slate-800 px-3 py-2 rounded-lg"
                            target={linkItem.target ?? "_self"}
                        >
                            <i className={linkItem.icon}/>
                            <span>{linkItem.name}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default AppHeaderLinks