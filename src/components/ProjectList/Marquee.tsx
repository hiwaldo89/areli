export interface Props {
    words: string[]
}

const Marquee = ({ words }: Props) => {

    const repeatedWords = words.length < 5
        ? [...words, ...words, ...words, ...words, ...words]
        : words;

    return (
        <div className="relative w-full overflow-x-hidden py-[110px] select-none">
            <div className="flex whitespace-nowrap uppercase font-lora text-2xl lg:text-4xl tracking-widest text-brown">
                <div className="animate-marquee flex shrink-0 items-center justify-around min-w-full gap-6 pr-6">
                    {repeatedWords.map((text) => (
                        <>
                            <span>{text}</span>
                            <span>✶</span>
                        </>
                    ))}
                </div>

                <div className="animate-marquee2 absolute top-[110px] flex shrink-0 items-center justify-around min-w-full gap-6 pr-6" aria-hidden="true">
                    {repeatedWords.map((text) => (
                        <>
                            <span>{text}</span>
                            <span>✶</span>
                        </>
                    ))}
                </div>
            </div>
        </div>)

}

export default Marquee