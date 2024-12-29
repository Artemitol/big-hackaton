import { HTMLProps } from "react"

type blockTitleProps = HTMLProps<HTMLDivElement> & {
    title: string
    subtitle: string
}

export function SectionTitle({title, subtitle, className, ...rest}: blockTitleProps) {
    return (
        <div className={`flex flex-col ${className}`} {...rest}>
            <h5 className='text-xl'>{title}</h5>
            <h6 className='text-sm text-slate-500'>{subtitle}</h6>
        </div>
    )
}