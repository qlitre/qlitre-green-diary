import { useState } from 'hono/jsx'
import { MicroCMSImage } from 'microcms-js-sdk'

type Props = {
    images: MicroCMSImage[]
}


export default function HistoryImage({ images }: Props) {
    const [count, setCount] = useState(0)
    return (
        <img
            alt='alt'
            src={images[0].url}
            className="w-24 h-32 sm:w-48 sm:h-64 rounded-md object-cover object-center"
        />
    )
}
