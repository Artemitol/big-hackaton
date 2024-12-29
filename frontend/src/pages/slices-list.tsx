import { Button } from "@nextui-org/button"
import { useState } from "react"

import { Slice } from "@/components/slice"
import SliceCreation from "@/components/sliceCreation"
import DefaultLayout from "@/layouts/default"
import { MainLayout } from "@/layouts/main-layout"

export type slice = {
    id: number
    title: string
}

type slicesListProps = {
    identity: number
}

export function SlicesList() {
    const [slices, setSlices] = useState<slice[]>([
        {
            id: 1,
            title: "slice",
        },
    ])
    const [identity, setIdentity] = useState<number>(1)
    const [creationSlice, setCreationSlice] = useState({
        id: Math.random(),
        title: "",
        dataType: undefined,
        dataValues: [null],
    })
    const [isOpen, setIsOpen] = useState(false)
    const onOpenChange = (isOpenModal: boolean) => {
        if (!isOpenModal) {
            setSlices((e) => {
                e.push(creationSlice)

                return e
            })
        }
        setIsOpen(isOpenModal)
    }

    return (
        <MainLayout
            heading='Список Разрезов'
            subheading='Изменяйте личные данные и кастомизируйте аккаунт'
        >
            <Button
                onPress={() => {
                    setIsOpen(true)
                }}
            >
                Создать разрез
            </Button>
            <SliceCreation
                isOpen={isOpen}
                slice={creationSlice}
                onOpenChange={onOpenChange}
                onSliceChange={setCreationSlice}
            />
            <div className='flex flex-col gap-y-5'>
                {slices.map((el) => (
                    <Slice key={el.id} slice={el} slicesConnector={setSlices} />
                ))}
            </div>
        </MainLayout>
    )
}
