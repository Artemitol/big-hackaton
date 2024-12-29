"use client";
import { Icon } from "@iconify/react";
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Tooltip } from "@nextui-org/react";
import React from "react";


export type Slice = {
    title: string;
    dataType: "string" | "number" | "date" | undefined; // Дополнить
    dataValues: Array<string | number | Date>
}
export type SliceCreationProps = {
    isOpen: boolean;
    onOpenChange: (isOpen:boolean) => void;
    slice: Slice;
    onSliceChange: (newSlice: Slice) => void
}
export default function SliceCreation (props: SliceCreationProps) {
    const { slice, onSliceChange, ...otherProps } = props;


    return (
        <Modal data-theme="dark" placement = "top" size = "xl" {...otherProps} >
            <ModalContent >
                <ModalHeader>
                    <div>
                        <div className = "flex gap-x-1 items-center">
                            <Icon icon = "lucide:layout-dashboard" width = {24}/>
                            <span className = "text-[#ECEDEE] text-[20px] font-semibold">
                                Создание разреза
                            </span>
                        </div>
                        <div className = " text-[#71717A] text-[14px] font-medium">
                            Укажите данные разреза
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Divider orientation = "horizontal" />
                    <div className = "flex gap-x-3.5">
                        <div className = "flex-1">
                            <div className = "flex items-center gap-x-1">
                                <div className = "text-[14px] font-medium text-[#ECEDEE] leading-[20px]">
                                    Название разреза*
                                </div>
                                <Tooltip content = "jdf"><Icon icon = "lucide:circle-help" width = {18} /></Tooltip>
                            </div>
                            <Input
                                className = "mt-1"
                                placeholder = "Введите название"
                                value = {slice.title} onValueChange = {(value) => {
                                    const copy = { ...slice };

 copy.title = value; onSliceChange(copy);
                                }}/>
                        </div>
                        <div className = "flex-1">
                            <div className = "flex items-center gap-x-1">
                                <div className = "text-[14px] font-medium text-[#ECEDEE] leading-[20px]">
                                    Вид входных данных
                                </div>
                                <Tooltip content = "jdf"><Icon icon = "lucide:circle-help" width = {18} /></Tooltip>
                            </div>
                            <Select
                                className = "mt-1"
                                placeholder = "Выберите одно из"
                                selectedKeys = {new Set([slice.dataType])}
                                onSelectionChange = {(key) => {
                                    const copy = { ...slice };

 copy.dataType = Array.from(key)[0]; onSliceChange(copy);
                                }}

                            >
                                <SelectItem key = "string">Строка</SelectItem>
                                <SelectItem key = "number">Число</SelectItem>
                                <SelectItem key = "date">Дата</SelectItem>
                            </Select>
                        </div>
                    </div>
                    <div className = "mt-4 space-y-4">
                        <div>
                            <div className = "text-[#ECEDEE] text-[18px] leading-[28px]">
                                Элементы разреза
                            </div>
                            <div className = "mt-1 text-[#A1A1AA] text-[14px] leading-[20px]">
                                Добавьте элементы для разреза
                            </div>
                        </div>
                        {slice.dataValues.map((value, index) => {
                            return (
                                <div key = {index}>
                                    <Input placeholder = "Введите значение" type = {slice.dataType} value = {value}/>
                                </div>
                            );
                        })}
                        <Button
                            className = "mt-2 w-full flex justify-start gap-x-1 items-center bg-[#27272A] text-[#A1A1AA] text-[14px]  font-semibold"
                            startContent = {<Icon icon = "lucide:plus" width = {24}/>}
                            onPress = {() => {
                                const copy = { ...slice };

 copy.dataValues.push(null); onSliceChange(copy);
                            }}
                        >
                            Добавить еще
                        </Button>
                        <div className = "h-10"/>
                    </div>
                </ModalBody>
            </ModalContent>

        </Modal>
    );
}
