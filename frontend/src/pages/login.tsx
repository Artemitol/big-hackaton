import { SectionTitle } from "@/components/SectionTitle";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";

export function Login() {
    return (
        <section className='w-full h-full flex items-center justify-center'>
            <div className='flex items-center justify-center w-96 p-6'>
                <form action='' className='w-full'>
                    <SectionTitle
                        className='mb-4'
                        title='Логин 👋'
                        subtitle='Войдите в свой аккаунт'
                    />
                    <div className='flex flex-col gap-y-2'>
                        <Input
                            required
                            isRequired
                            variant='bordered'
                            type='email'
                            label='Ваша почта'
                            placeholder='Введите вашу почту'
                        />
                        <Input
                            required
                            isRequired
                            variant='bordered'
                            type='password'
                            label='Пароль'
                            placeholder='Введие ваш пароль'
                        />
                        <Button color='primary' type='submit'>
                            Логин
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}