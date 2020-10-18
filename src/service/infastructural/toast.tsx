
import M from "materialize-css"

export function ToastCustomWarning(content: string, options: any = null): void {
    M.toast({ html: content,classes:'orange darken-4', ...options })
}

export function ToastCustomSuccess(content: string, options: any = null): void {
    M.toast({ html: content,classes:'green darken-2', ...options })
}