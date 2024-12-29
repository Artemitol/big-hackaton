import { Avatar } from "@nextui-org/avatar"
import { Card } from "@nextui-org/card"
import { useDisclosure } from "@nextui-org/use-disclosure"
import { Link } from "react-router-dom"
import CreateSlice from "./create-slice"

export function Coverage({ name = "Страховка 1" }: { name?: string }) {
    // const {isOpen, onOpen, onOpenChange} = useDisclosure()

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
                    <p className='text-xs text-gray-500'>{name}</p>
                </div>
                <div className='flex flex-row gap-x-3'>
                    <Link to=''>Редактировать</Link>
                    <Link to=''>Выгрузить</Link>
                </div>
            </Card>
    )
}