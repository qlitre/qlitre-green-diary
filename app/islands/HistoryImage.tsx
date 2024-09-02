import { useState } from 'hono/jsx'
import { MicroCMSImage } from 'microcms-js-sdk'

type Props = {
    images: MicroCMSImage[]
}

export default function HistoryImage({ images }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <div className="relative">
                <img
                    alt='Image'
                    src={images[currentIndex].url}
                    className="w-24 h-32 sm:w-48 sm:h-64 rounded-md object-cover object-center cursor-pointer"
                    onClick={openModal}
                />

                {/* Previous Button */}
                <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    onClick={prevImage}
                >
                    &lt;
                </button>

                {/* Next Button */}
                <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    onClick={nextImage}
                >
                    &gt;
                </button>
            </div>

            {/* Thumbnails */}
            <div className="hidden sm:flex justify-center mt-4 space-x-2">
                {images.map((image, index) => (
                    <img
                        key={index}
                        alt='Thumbnail'
                        src={image.url}
                        className={`w-16 h-16 object-cover cursor-pointer rounded-md ${currentIndex === index ? 'ring-2 ring-indigo-500' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer z-10"
                    onClick={closeModal}
                >
                    <div className="bg-white p-4 rounded-md z-20" onClick={(e) => e.stopPropagation()}>
                        <img
                            alt='alt'
                            src={images[currentIndex].url}
                            className="max-w-[90vw] max-h-[90vh] rounded-md object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
