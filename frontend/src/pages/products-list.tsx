import { Coverage } from "@/components/coverage"
import CreateSlice from "@/components/create-slice"
import DefaultLayout from "@/layouts/default"
import { MainLayout } from "@/layouts/main-layout"
import { Button } from "@nextui-org/button"
import { useDisclosure } from "@nextui-org/use-disclosure"
import { useEffect, useState } from "react"
import { Link } from "@nextui-org/link"

type coverage = {
    id: number
    name: string
}

export function ProductsList({ products }: { products: coverage[] }) {
    // const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [slice, setSlice] = useState()
    const [product, setProducts] = useState()

    useEffect(() => {}, [])

    return (
        <MainLayout
            heading='Список страховых продуктов'
            subheading='Изменяйте личные данные и кастомизируйте аккаунт'
        >
            <Button as={Link} href="/profile">Создать новый слайс</Button>
            {/* <CreateSlice isOpen={isOpen} onOpenChange={onOpenChange} onSliceChange={setSlice} slice/> */}
            <div className='flex flex-col gap-y-5'>
                {...products.map((el) => (
                    <Coverage key={el.id} name={el.name}/>
                ))}
            </div>
        </MainLayout>
    )
}