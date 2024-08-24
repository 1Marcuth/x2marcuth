import { FC, ReactNode } from "react"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,AlertDialogTrigger } from "./ui/alert-dialog"

type Props = {
    children: ReactNode
}

const DownloadVideoAlertDialog: FC<Props> = ({ children }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="dark text-white max-sm:w-[90%]">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <span className="flex items-center gap-1">
                            <i className="bi bi-hourglass-split text-slate-400" />
                            <span>Ei! Espere um pouquinho...</span>
                        </span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm max-sm:text-xs">Seu download já vai começar, iremos converter o arquivo e abri-lo em uma nova janela para que o navegador baixe ele automaticamente. Não se preocupe, não é um pop-up de propaganda ou algo malicioso ;)</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Ok</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DownloadVideoAlertDialog