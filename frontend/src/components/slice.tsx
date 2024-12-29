import { Avatar } from "@nextui-org/avatar"
import { Card } from "@nextui-org/card"

import { Link } from "react-router-dom"

import { Button } from "@nextui-org/button"
import { Dispatch, SetStateAction } from "react"
import { slice } from "@/pages/slices-list"

type slicesProps = {
    slicesConnector: any
    slice: { id: number; title: string }
}

export function Slice({
    slicesConnector,
    slice = { id: 1, title: "slice" },
}: slicesProps) {
    function clickHandler() {
        // Removes from global slices state
        slicesConnector((prev) => [...prev.filter((el) => el.id !== slice.id)])
    }

    return (
        <Card
            radius='sm'
            className='w-full p-1 flex flex-row items-center gap-x-72 bg-transparent border-gray-600 border-1.5'
        >
            <div className='flex flex-row gap-x-2 items-center'>
                <Avatar
                    size='sm'
                    src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                />
                <p className='text-xs text-gray-500'>{slice.title}</p>
            </div>
            <div className='flex flex-row gap-x-3 items-center'>
                <Link to={`/slice/${slice.id}`}>Редактировать</Link>
                <Button color='danger' variant='light' onClick={clickHandler}>
                    Удалить
                </Button>
            </div>
        </Card>
    )
}
