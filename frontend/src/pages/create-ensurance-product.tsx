import { Input } from "@nextui-org/input"
import { Select, SelectItem } from "@nextui-org/select"
import { Button } from "@nextui-org/button"
import { Checkbox } from "@nextui-org/checkbox"

import { SectionTitle } from "@/components/SectionTitle"
import { Block } from "@/components/block"
import DefaultLayout from "@/layouts/default"
import { MainLayout } from "@/layouts/main-layout"
import { Chanels, Plus, Table } from "@/components/icons"
import { TitleGroup } from "@/components/title-group"
import { Dispatch, SetStateAction, useState } from "react"
import SliceCreation from "@/components/sliceCreation"
import PropertyEditor from "@/components/propert-editing"


export default function CreateEnsurance({setGlobalData}: {setGlobalData: Dispatch<SetStateAction<unknown>>}) {
    const [inputValue, setInputValue] = useState<string>("")
    // const []

    function onClick() {
        setGlobalData((prev) => ([
            ...prev,
            {
                id: Math.random(),
                name: inputValue
            }
        ]))
    }

    return (
        <MainLayout
            heading='Создание страхового продукта'
            subheading='Изменяйте данные и кастомизируйте продукт'
        >
            <div className='flex flex-col p-6 gap-y-4'>
                <Block>
                    <SectionTitle
                        subtitle='Создание продукта'
                        title='Настройки'
                    />
                </Block>
                <Block direction='row'>
                    <Input
                        label='Название продукта'
                        labelPlacement='outside'
                        placeholder='Введите название'
                        onValueChange={setInputValue}
                    />
                    <Select
                        label='Вид страховки'
                        labelPlacement='outside'
                        placeholder='Выберите одно из'
                    >
                        <SelectItem key={1}>123</SelectItem>
                        <SelectItem key={2}>321</SelectItem>
                    </Select>
                </Block>
                <div className={`flex flex-row items-start gap-x-14`}>
                    <div className='buttonslist'>
                        <p className='text-xs text-gray-500 mb-0.5'>
                            Ваши критерии
                        </p>
                        <div className='flex flex-col items-start gap-y-2'>
                            <div className='flex flex-col items-start'>
                                <Button
                                    className='bg-transparent'
                                    startContent={<Chanels />}
                                >
                                    Канал продаж
                                </Button>
                                <Button
                                    className='bg-transparent'
                                    startContent={<Table />}
                                >
                                    Фильтры
                                </Button>
                            </div>
                            <Button startContent={<Plus color='primary' />}>
                                Добавить
                            </Button>
                        </div>
                    </div>
                    <div className='w-full max-w-96 flex flex-col gap-2'>
                        <TitleGroup
                            subtitle='Каналы продаж для продукта'
                            title='Каналы продаж'
                        />
                        <Button size='sm'>Настроить</Button>
                        {/* <SliceCreation  /> */}
                        <TitleGroup
                            subtitle='Выберете те, каналы, которые будут отображаться'
                            title='Виды каналов продаж'
                        />
                        <div className='flex flex-wrap gap-2'>
                            <Checkbox>Тинькоф</Checkbox>
                            <Checkbox>Тинькоф</Checkbox>
                            <Checkbox>Тинькоф</Checkbox>
                            <Checkbox>Тинькоф</Checkbox>
                            <Checkbox>Тинькоф</Checkbox>
                        </div>
                    </div>
                </div>
                <Button color="primary" onClick={onClick}>Create</Button>
            </div>
            <PropertyEditor />
        </MainLayout>
    )
}
