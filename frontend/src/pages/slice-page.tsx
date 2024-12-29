import { Block } from "@/components/block"
import { Coverage } from "@/components/coverage"
import CreateSlice from "@/components/create-slice"
import DefaultLayout from "@/layouts/default"
import { MainLayout } from "@/layouts/main-layout"
import { Button } from "@nextui-org/button"
import { useDisclosure } from "@nextui-org/use-disclosure"
import { Input } from "@nextui-org/input"
import { useEffect, useState } from "react"
import { Card, Select, SelectItem } from "@nextui-org/react"
import { TitleGroup } from "@/components/title-group"
import { Plus } from "@/components/icons"

type sliceElement = {
    name: string
    id: number
}

export function SlicePage() {
    const [inputValue, setInputValue] = useState<string>("")
    const [elements, setElements] = useState<sliceElement[]>([])
    const [identity, setIdentity] = useState<number>(1)

    useEffect(() => {}, [])

    function clickHandler() {
        setIdentity(prev => ++prev)
        const newElem: sliceElement = { name: inputValue, id: identity }

        setElements((prev) => ([
            ...prev,
            newElem
        ]))
    }

    return (
        <MainLayout heading='Создание разреза' subheading='Создание разреза'>
            <Block direction='row'>
                <Input
                    label='Название разреза'
                    labelPlacement='outside'
                    placeholder='Введите название'
                    onValueChange={setInputValue}
                />
                <Select
                    label='Вид входных данных'
                    labelPlacement='outside'
                    placeholder='Выберите одно из'
                >
                    <SelectItem key={1}>123</SelectItem>
                    <SelectItem key={2}>321</SelectItem>
                </Select>
            </Block>
            <div className='w-full max-w-96 flex flex-col gap-2'>
                <TitleGroup
                    title='Элементы разреза'
                    subtitle='Добавьте элементы для разреза'
                />
                <Input
                    placeholder='Введите название'
                    onValueChange={setInputValue}
                />
                <div className='flex flex-col gap-1'>
                    {...elements.map((el) => (
                        <Card key={el.id} className='p-1'>
                            {el.name}
                        </Card>
                    ))}
                </div>
                <Button
                    color='primary'
                    startContent={<Plus />}
                    onClick={clickHandler}
                />
            </div>
        </MainLayout>
    )
}


// import { useParams } from "react-router-dom"
// function Check(props) {
//     const { id } = useParams()

//     return <div>{id}</div>
// }
// ;<Route element={<Check />} path='/slices/:id' />
