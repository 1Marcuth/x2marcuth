import { Link } from "react-router-dom"
import { FC } from "react"
import { Button } from "./ui/button"
import SettingDialog from "./settings-dialog"

const linkItems = [
    {
        name: "Repositório",
        icon: "bi bi-github",
        path: "https://github.com/1Marcuth/x2marcuth",
        target: "_blank"
    }
]

const AppHeaderLinks: FC = () => {
    return (
        <ul className="flex gap-2">
            {linkItems.map(linkItem => {
                return (
                    <li key={linkItem.name} className="jetbrains-mono-font">
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
            <li>
                <SettingDialog>
                    <Button className="dark text-white" variant="outline">
                        <i className="bi bi-gear"/>
                    </Button>
                </SettingDialog>
            </li>
        </ul>
    )
}

export default AppHeaderLinks