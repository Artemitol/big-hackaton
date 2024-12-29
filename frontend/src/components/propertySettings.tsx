"use client"
import { Icon } from "@iconify/react"
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Select,
    SelectItem,
    Switch,
    Tab,
    Tabs,
    Tooltip,
} from "@nextui-org/react"
import React, { useMemo, useState } from "react"

type ifAttributes = {
    type: "AND" | "OR"
}

export type Dependency = {
    if: Array<ifAttributes>
    then: Array<any>
    to: Array<any>
    // Заполнить остальное
}
export type PropertySettingsAttributes = {
    isSelected: boolean
    dependencies: Array<Dependency>
}
export type Property = {
    title: string
    icon: string
    settings: PropertySettingsAttributes
}

export type PropertySettingsProps = {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    properties: Array<Property>
    onPropertiesChange: (newProperties: Array<Property>) => void
}
export default function PropertySettings(props: PropertySettingsProps) {
    const { properties, onPropertiesChange } = props
    const [selectedPropertyIndex, setSelectedPropertyIndex] =
        useState<number>(0)

    const onPropertySelect = (index: number) => {
        setSelectedPropertyIndex(index)
    }

    const selectedProperty = useMemo<Property>(() => {
        return properties[selectedPropertyIndex]
    }, [selectedPropertyIndex, properties])

    const onSelectedPropertyChange = (f: (property: Property) => Property) => {
        const newSelectedProperty = f(selectedProperty)
        const propertiesCopy = [...properties]
        propertiesCopy[selectedPropertyIndex] = newSelectedProperty
        onPropertiesChange(propertiesCopy)
    }

    return (
        <Modal
    size="xl"
    placement="top"
    isOpen={props.isOpen}
    onClose={() => props.onOpenChange(false)}
>
            <ModalContent>
                <ModalHeader>
                    <div>
                        <div className='flex gap-x-1 items-center'>
                            <Icon icon='lucide:layout-dashboard' width={24} />
                            <span className='text-[#ECEDEE] text-[20px] font-semibold'>
                                Редактирование свойства
                            </span>
                        </div>
                        <div className=' text-[#71717A] text-[14px] font-medium'>
                            Укажите отношения свойств друг к другу
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Divider orientation='horizontal' />
                    <div className='flex gap-x-3.5'>
                        <div className='shrink-0'>
                            <div className='text-[#A1A1AA] text-[12px] leading-[16px] font-medium mb-2'>
                                Элементы разреза
                            </div>
                            {properties.map((property, index) => {
                                return (
                                    <Button
                                        key={property.title}
                                        onPress={() => {
                                            onPropertySelect(index)
                                        }}
                                        variant='light'
                                        className='p-3 text-[#A1A1AA] text-[14px] font-semibold mt-1'
                                        startContent={
                                            <Icon
                                                icon={property.icon}
                                                width={24}
                                            />
                                        }
                                    >
                                        {property.title}
                                    </Button>
                                )
                            })}
                        </div>
                        <div className='space-y-[11px] flex-1'>
                            <div>
                                <div className='text-[#ECEDEE] text-[18px] leading-[28px]'>
                                    Настройки свойства
                                </div>
                                <div className='text-[#A1A1AA] text-[14px] leading-[20px]'>
                                    Настройки и свойства элемента
                                </div>
                            </div>
                            <div className='bg-[#27272A] rounded-xl p-4 flex justify-between'>
                                <div>
                                    <div className='text-[#ECEDEE] text-[16px] leading-[24px]'>
                                        Отображать элемент
                                    </div>
                                    <div className='text-[#A1A1AA] text-[14px] leading-[20px]'>
                                        Показывать элемент в продукте
                                    </div>
                                </div>
                                <Switch
                                    onValueChange={(newValue: boolean) => {
                                        onSelectedPropertyChange((property) => {
                                            property.settings.isSelected =
                                                newValue
                                            return property
                                        })
                                    }}
                                    isSelected={
                                        selectedProperty.settings.isSelected
                                    }
                                />
                            </div>
                            <Button
                                onPress={() => {
                                    onSelectedPropertyChange((property) => {
                                        property.settings.dependencies.push({
                                            if: [{ type: "OR" }],
                                            then: [{}],
                                            to: [{}],
                                        })
                                        return property
                                    })
                                }}
                                className='mt-2 w-full flex justify-start gap-x-1 items-center bg-[#27272A] text-[#A1A1AA] text-[14px]  font-semibold'
                                startContent={
                                    <Icon icon='lucide:plus' width={24} />
                                }
                            >
                                Создать новую зависимость
                            </Button>
                            {selectedProperty.settings.dependencies.map(
                                (dependency, dependencyIndex) => {
                                    return (
                                        <div
                                            key={dependencyIndex}
                                            className='space-y-[11px]'
                                        >
                                            <div>
                                                <div className='text-[#ECEDEE] text-[18px] leading-[28px]'>
                                                    Зависимость{" "}
                                                    {dependencyIndex + 1}
                                                </div>
                                                <div className='text-[#A1A1AA] text-[14px] leading-[20px] mt-1'>
                                                    Настройте зависимость
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-x-1'>
                                                    <div>Если</div>
                                                    <Tooltip content='jdf'>
                                                        <Icon
                                                            icon='lucide:circle-help'
                                                            width={18}
                                                        />
                                                    </Tooltip>
                                                </div>
                                                {dependency.if.map(
                                                    (depIf, ifIndex) => {
                                                        if (ifIndex > 0) {
                                                            return (
                                                                <div
                                                                    key={
                                                                        ifIndex
                                                                    }
                                                                    className='flex gap-x-2 items-end'
                                                                >
                                                                    <Tabs
                                                                        selectedKey={
                                                                            depIf.type
                                                                        }
                                                                        onSelectionChange={(
                                                                            key
                                                                        ) => {
                                                                            onSelectedPropertyChange(
                                                                                (
                                                                                    property
                                                                                ) => {
                                                                                    property.settings.dependencies[
                                                                                        dependencyIndex
                                                                                    ].if[
                                                                                        ifIndex
                                                                                    ].type =
                                                                                        key.toString()
                                                                                    return property
                                                                                }
                                                                            )
                                                                        }}
                                                                    >
                                                                        <Tab
                                                                            key='AND'
                                                                            title='И'
                                                                        />
                                                                        <Tab
                                                                            key='OR'
                                                                            title='ИЛИ'
                                                                        />
                                                                    </Tabs>
                                                                    <Select
                                                                        placeholder='Выберите одно из'
                                                                        className='mt-2'
                                                                    >
                                                                        <SelectItem key='idontknow'>
                                                                            Китай
                                                                        </SelectItem>
                                                                    </Select>
                                                                </div>
                                                            )
                                                        }
                                                        return (
                                                            <Select
                                                                key={ifIndex}
                                                                placeholder='Выберите одно из'
                                                                className='mt-2'
                                                            >
                                                                <SelectItem key='idontknow'>
                                                                    Россия
                                                                </SelectItem>
                                                                <SelectItem key='idontknow'>
                                                                    Китай
                                                                </SelectItem>
                                                            </Select>
                                                        )
                                                    }
                                                )}
                                                <Button
                                                    onPress={() => {
                                                        onSelectedPropertyChange(
                                                            (property) => {
                                                                property.settings.dependencies[
                                                                    dependencyIndex
                                                                ].if.push({
                                                                    type: "AND",
                                                                })
                                                                return property
                                                            }
                                                        )
                                                    }}
                                                    className='mt-2 w-full flex justify-start gap-x-1 items-center bg-[#27272A] text-[#A1A1AA] text-[14px]  font-semibold'
                                                    startContent={
                                                        <Icon
                                                            icon='lucide:plus'
                                                            width={24}
                                                        />
                                                    }
                                                >
                                                    Добавить еще
                                                </Button>
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-x-1'>
                                                    <div>То</div>
                                                    <Tooltip content='jdf'>
                                                        <Icon
                                                            icon='lucide:circle-help'
                                                            width={18}
                                                        />
                                                    </Tooltip>
                                                </div>
                                                {dependency.then.map(
                                                    (depThen, thenIndex) => {
                                                        return (
                                                            <Select
                                                                key={thenIndex}
                                                                placeholder='Выберите одно из'
                                                                className='mt-2'
                                                            >
                                                                <SelectItem key='idontknow'>
                                                                    Изменить
                                                                    коэфициент
                                                                </SelectItem>
                                                                <SelectItem key='idontknow'>
                                                                    Указать
                                                                    варианты
                                                                </SelectItem>
                                                            </Select>
                                                        )
                                                    }
                                                )}
                                                <Button
                                                    onPress={() => {
                                                        onSelectedPropertyChange(
                                                            (property) => {
                                                                property.settings.dependencies[
                                                                    dependencyIndex
                                                                ].then.push({})
                                                                return property
                                                            }
                                                        )
                                                    }}
                                                    className='mt-2 w-full flex justify-start gap-x-1 items-center bg-[#27272A] text-[#A1A1AA] text-[14px]  font-semibold'
                                                    startContent={
                                                        <Icon
                                                            icon='lucide:plus'
                                                            width={24}
                                                        />
                                                    }
                                                >
                                                    Добавить еще
                                                </Button>
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-x-1'>
                                                    <div>
                                                        У следующего свойства:
                                                    </div>
                                                    <Tooltip content='jdf'>
                                                        <Icon
                                                            icon='lucide:circle-help'
                                                            width={18}
                                                        />
                                                    </Tooltip>
                                                </div>
                                                {dependency.to.map(
                                                    (depTo, toIndex) => {
                                                        return (
                                                            <Select
                                                                key={toIndex}
                                                                placeholder='Выберите одно из'
                                                                className='mt-2'
                                                            >
                                                                <SelectItem key='idontknow'>
                                                                    RUB
                                                                </SelectItem>
                                                                <SelectItem key='idontknow'>
                                                                    CHY
                                                                </SelectItem>
                                                            </Select>
                                                        )
                                                    }
                                                )}
                                                <Button
                                                    onPress={() => {
                                                        onSelectedPropertyChange(
                                                            (property) => {
                                                                property.settings.dependencies[
                                                                    dependencyIndex
                                                                ].to.push({})
                                                                return property
                                                            }
                                                        )
                                                    }}
                                                    className='mt-2 w-full flex justify-start gap-x-1 items-center bg-[#27272A] text-[#A1A1AA] text-[14px]  font-semibold'
                                                    startContent={
                                                        <Icon
                                                            icon='lucide:plus'
                                                            width={24}
                                                        />
                                                    }
                                                >
                                                    Добавить еще
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
