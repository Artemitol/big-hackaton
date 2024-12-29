import { ReactNode } from "react"
import { Divider } from "@nextui-org/divider"

export function Block({
    children,
    direction,
}: {
    children: ReactNode
    direction?: "row" | "column"
}) {
    return (
        <>
            <div
                className={`flex gap-3.5 ${direction === "row" ? "flex-row" : direction === "column" ? "flex-col" : ""}`}
            >
                {children}
            </div>
            <Divider />
        </>
    )
}