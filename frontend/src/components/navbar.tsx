import { Button } from "@nextui-org/button"
import { Link } from "@nextui-org/link"
import { User } from "@nextui-org/user"
import { Listbox, ListboxItem } from "@nextui-org/listbox"

import { ThemeSwitch } from "@/components/theme-switch"
import {
    ArrowToLeft,
    Papirus,
    Profile,
} from "@/components/icons"
import { Logo } from "@/components/icons"


export const Navbar = () => {
    return (
        <div className='p-6 h-full w-72 flex flex-col items-start justify-between'>
            <div className='flex flex-col  items-start gap-y-6'>
                <ThemeSwitch className='hidden' />
                <div className='flex flex-row w-full justify-between items-center'>
                    <Link
                        className='flex justify-start items-center gap-2'
                        color='foreground'
                        href='/'
                    >
                        <div className='w-8 h-8 rounded-full p-2 bg-slate-800'>
                            <Logo height='100%' width='100%' />
                        </div>
                        <p className='font-bold text-inherit'>14 bit</p>
                    </Link>
                    <Button isIconOnly radius='full'>
                        <ArrowToLeft height={3} width={5} />
                    </Button>
                </div>
                <User
                    as={Link}
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    description='our user'
                    href='/profile'
                    name='User'
                />
                <Listbox>
                    <ListboxItem
                        key='coverages'
                        as={Link}
                        href='/products'
                        startContent={<Papirus />}
                    >
                        Страховые продукты
                    </ListboxItem>
                    <ListboxItem
                        key='slices'
                        as={Link}
                        href='/slices'
                        startContent={<Papirus />}
                    >
                        Разрезы
                    </ListboxItem>
                    <ListboxItem
                        key='profile'
                        as={Link}
                        href='/profile'
                        startContent={<Profile />}
                    >
                        Профиль
                    </ListboxItem>
                </Listbox>
            </div>
            <Button startContent={<Papirus />} variant="light">Выйти</Button>
        </div>
        //         <NextUINavbar maxWidth='xl' position='sticky' isMenuOpen>
        //             <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        //                 <NavbarBrand className='gap-3 max-w-fit'>
        //                     <Link
        //                         className='flex justify-start items-center gap-2'
        //                         color='foreground'
        //                         href='/'
        //                     >
        //                         <div className='w-8 h-8 rounded-full p-2 bg-slate-800'>
        //                             <Logo width='100%' height='100%' />
        //                         </div>
        //                         <p className='font-bold text-inherit'>
        //                             14 bit services
        //                         </p>
        //                     </Link>
        //                 </NavbarBrand>
        //                 <div className='hidden lg:flex gap-4 justify-start ml-2'>
        //                     {siteConfig.navItems.map((item) => (
        //                         <NavbarItem key={item.href}>
        //                             <Link
        //                                 className={clsx(
        //                                     linkStyles({ color: "foreground" }),
        //                                     "data-[active=true]:text-primary data-[active=true]:font-medium"
        //                                 )}
        //                                 color='foreground'
        //                                 href={item.href}
        //                             >
        //                                 {item.label}
        //                             </Link>
        //                         </NavbarItem>
        //                     ))}
        //                     <NavbarItem>

        //                     </NavbarItem>
        //                 </div>
        //             </NavbarContent>

        //             <NavbarContent
        //                 className='hidden sm:flex basis-1/5 sm:basis-full'
        //                 justify='end'
        //             >
        //                 <NavbarItem className='hidden sm:flex gap-2'>
        //                     <ThemeSwitch className="hidden"/>
        //                 </NavbarItem>
        //                 <NavbarItem className='hidden md:flex'>
        //                     <Button
        //                         isExternal
        //                         as={Link}
        //                         className='text-sm font-normal text-default-600 bg-default-100'
        //                         href={siteConfig.links.sponsor}
        //                         startContent={
        //                             <HeartFilledIcon className='text-danger' />
        //                         }
        //                         variant='flat'
        //                     >
        //                         Sponsor
        //                     </Button>
        //                 </NavbarItem>
        //             </NavbarContent>
        // {/*
        //             <NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
        //                 <Link isExternal href={siteConfig.links.github}>
        //                     <GithubIcon className='text-default-500' />
        //                 </Link>
        //                 <ThemeSwitch />
        //                 <NavbarMenuToggle />
        //             </NavbarContent> */}

        //             <NavbarMenu>
        //                 <div className='mx-4 mt-2 flex flex-col gap-2'>
        //                     {siteConfig.navMenuItems.map((item, index) => (
        //                         <NavbarMenuItem key={`${item}-${index}`}>
        //                             <Link
        //                                 color={
        //                                     index === 2
        //                                         ? "primary"
        //                                         : index === siteConfig.navMenuItems.length - 1
        //                                         ? "danger"
        //                                         : "foreground"
        //                                 }
        //                                 href='#'
        //                                 size='lg'
        //                             >
        //                                 {item.label}
        //                             </Link>
        //                         </NavbarMenuItem>
        //                     ))}
        //                 </div>
        //             </NavbarMenu>
        //         </NextUINavbar>
    )
}
