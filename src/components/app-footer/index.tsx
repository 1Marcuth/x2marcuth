import { FC } from "react"

import AppFooterTrademark from "./app-footer-trademark"
import AppFooterLinks from "./app-footer-links"
import AppFooterLogo from "./app-footer-logo"
import { Separator } from "../ui/separator"

const AppFooter: FC = () => {
    return (
        <footer className="bg-slate-900 border-t-slate-800 border-t-[1px] h-[180px] max-sm:h-[170px]">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <AppFooterLogo/>
                    <AppFooterLinks/>
                </div>
                <Separator className="my-6 sm:mx-auto lg:my-8 bg-slate-800"/>
                <AppFooterTrademark/>
            </div>
        </footer>
    )
}

export default AppFooter