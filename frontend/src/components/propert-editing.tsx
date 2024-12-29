import React from "react"
import { Switch, Dropdown, Button, Checkbox, DropdownItem, DropdownMenu } from "@nextui-org/react"

const PropertyEditing = () => {
    return (
        <div className='p-4 bg-gray-100 rounded-lg shadow-md w-96'>
            {/* Header */}
            <h2 className='text-lg font-semibold mb-4'>
                Редактирование свойства
            </h2>

            {/* Elements List */}
            <div className='mb-4'>
                <h3 className='text-sm font-medium text-gray-700'>
                    Элементы разреза
                </h3>
                <ul className='space-y-2 mt-2'>
                    {["Тинькофф", "Альфабанк", "Агент 1", "Еще пункт"].map(
                        (item, index) => (
                            <li
                                key={index}
                                className='p-2 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-pointer'
                            >
                                {item}
                            </li>
                        )
                    )}
                </ul>
            </div>

            {/* Property Settings */}
            <div className='mb-4'>
                <h3 className='text-sm font-medium text-gray-700'>
                    Настройки свойства
                </h3>
                <div className='flex items-center justify-between mt-2'>
                    <span className='text-gray-600'>Отображать элемент</span>
                    <Switch defaultChecked={false} />
                </div>
            </div>

            {/* Dependencies */}
            <div className='mb-4'>
                <h3 className='text-sm font-medium text-gray-700'>
                    Зависимость 1
                </h3>
                <div className='space-y-2 mt-2'>
                    <Dropdown>
                        <DropdownItem>Выберите одно из</DropdownItem>
                        <DropdownMenu
                            aria-label='Options'
                            items={["Option 1", "Option 2", "Option 3"]}
                        >
                            {(item) => (
                                <DropdownItem key={item}>{item}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <div className='flex items-center'>
                        <Checkbox>И</Checkbox>
                        <Checkbox>Или</Checkbox>
                    </div>

                    <Button className='w-full'>Добавить еще</Button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-between'>
                <Button variant="flat">Создать еще зависимость</Button>
                <Button>Сохранить</Button>
            </div>
        </div>
    )
}

export default PropertyEditor
