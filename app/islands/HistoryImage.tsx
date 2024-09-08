import { useState } from 'hono/jsx'
import { MicroCMSImage } from 'microcms-js-sdk'

type Props = {
    images: MicroCMSImage[]
}

type NavButtonProps = {
    direction: 'prev' | 'next';
    onClick: () => void;
    className?: string;
}


export const HistoryImage = ({ images }: Props) => {
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

    function NavButton({ direction, onClick, className = '' }: NavButtonProps) {
        return (
            <button
                className={`absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full ${className}`}
                onClick={onClick}
            >
                {direction === 'prev' ? '<' : '>'}
            </button>
        );
    }


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
                {images.length > 1 && (
                    <NavButton direction="prev" onClick={prevImage} className="left-2" />
                )}

                {/* Next Button */}
                {images.length > 1 && (
                    <NavButton direction="next" onClick={nextImage} className="right-2" />
                )}
            </div>

            {/* Thumbnails */}
            <div className="hidden sm:flex justify-center mt-4 space-x-2">
                {images.map((image, index) => (
                    <img
                        key={index}
                        alt='Thumbnail'
                        src={image.url}
                        className={`w-12 h-12 object-cover cursor-pointer rounded-md ${currentIndex === index ? 'ring-2 ring-indigo-500' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer z-10"
                    onClick={closeModal}
                >
                    <div className="relative bg-white p-4 rounded-md z-20" onClick={(e) => e.stopPropagation()}>
                        <img
                            alt='alt'
                            src={images[currentIndex].url}
                            className="sm:max-w-[90vw] sm:max-h-[90vh] max-w-[70vw] max-h-[70vh] rounded-md object-contain"
                        />

                        {/* Previous Button in Modal */}
                        {images.length > 1 && (
                            <NavButton direction="prev" onClick={prevImage} className="left-2" />
                        )}

                        {/* Next Button in Modal */}
                        {images.length > 1 && (
                            <NavButton direction="next" onClick={nextImage} className="right-2" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
