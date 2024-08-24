import { Link } from "react-router-dom"
import { FC } from "react"

type LinkItem = {
    name: string
    path: string
    target?: string
}

const linkItems: LinkItem[] = [
    {
        name: "GitHub: @1Marcuth",
        path: "https://github.com/1Marcuth",
        target: "_blank"
    },
    {
        name: "FFmfy: Converta Mídias",
        path: "https://ffmfy.netlify.app/",
        target: "_blank"
    },
]

const AppFooterLinks: FC = () => {
    return (
        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-slate-500 sm:mb-0 dark:text-slate-400">
            {linkItems.map(item => {
                return (
                    <li key={item.name}>
                        <Link
                            to={item.path}
                            target={item.target ?? "_self"}
                            className="transition-all text-slate-200 hover:text-slate-300 max-sm:text-xs px-3 py-2"
                        >
                            {item.name}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default AppFooterLinks