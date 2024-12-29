export function TitleGroup({title, subtitle}: {title: string, subtitle: string}) {
    return (
        <div className='flex flex-col gap-1'>
            <h3 className='text-lg text-nowrap'>{title}</h3>
            <h4 className='text-sm text-gray-500 text-nowrap'>{subtitle}</h4>
        </div>
    )
}