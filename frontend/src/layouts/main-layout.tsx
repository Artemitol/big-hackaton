import { ReactNode } from "react";

import { title, subtitle, border } from "@/components/primitives";

type mainLayoutProps = {
    heading: string
    subheading: string
    children: ReactNode
}

export function MainLayout({heading = "Lorem", subheading = "Lorem ipsum", children}: mainLayoutProps) {
    return (
        <section className='flex flex-col items-start justify-center gap-4 py-8 md:py-10'>
            <div className='flex flex-col max-w-lg text-left justify-start'>
                <h1 className={title({ size: "sm" })}>{heading}</h1>
                <h3 className={subtitle() + " " + "text-slate-400"}>
                    {subheading}
                </h3>
            </div>
            {children}
        </section>
    )
}