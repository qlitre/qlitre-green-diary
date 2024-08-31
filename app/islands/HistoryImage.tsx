import { useState } from 'hono/jsx'
import { MicroCMSImage } from 'microcms-js-sdk'

type Props = {
    images: MicroCMSImage[]
}

export default function HistoryImage({ images }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <img
                alt='alt'
                src={images[0].url}
                className="w-24 h-32 sm:w-48 sm:h-64 rounded-md object-cover object-center cursor-pointer"
                onClick={openModal}
            />
            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                    onClick={closeModal}
                >
                    <div className="bg-white p-4 rounded-md" onClick={(e) => e.stopPropagation()}>
                        <img
                            alt='alt'
                            src={images[0].url}
                            className="max-w-[90vw] max-h-[90vh] rounded-md object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
