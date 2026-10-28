import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface ImageSliderProps {
    images: string[];
    aspectRatio?: string; // Ej: "aspect-video", "aspect-square", "aspect-[21/9]"
    autoPlayInterval?: number;
}

const slideVariants: Variants = {
    enter: (dir: number) => ({
        x: dir > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (dir: number) => ({
        x: dir < 0 ? '100%' : '-100%',
        opacity: 0,
    }),
};

export default function ImageSlider({
    images,
    aspectRatio = 'aspect-video', // Por defecto 16:9 (proporción estándar de video)
    autoPlayInterval = 4000,
}: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const timeoutRef = useRef<number | null>(null);

    if (!images || images.length === 0) {
        return <div className="text-center text-neutral-400">No hay imágenes disponibles.</div>;
    }

    const nextSlide = (): void => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = (): void => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleDragEnd = (_event: any, info: { offset: { x: number } }) => {
        resetAutoplay();
        const swipeThreshold = 50;
        if (info.offset.x < -swipeThreshold) nextSlide();
        else if (info.offset.x > swipeThreshold) prevSlide();
    };

    const resetAutoplay = () => {
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 6000);
    };

    useEffect(() => {
        if (isPaused) {
            if (timeoutRef.current) window.clearInterval(timeoutRef.current);
            return;
        }

        timeoutRef.current = window.setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => {
            if (timeoutRef.current) window.clearInterval(timeoutRef.current);
        };
    }, [currentIndex, isPaused, autoPlayInterval]);

    return (
        <div className="relative w-full select-none">
            {/* 
        Contenedor Principal: Reemplazamos la altura por la clase dinámica aspectRatio.
        Mantenemos "w-full" para que se estire al 100% horizontalmente.
      */}
            <div className={`relative w-full ${aspectRatio} overflow-hidden bg-neutral-900 shadow-xl`}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
                        draggable="false"
                    />
                </AnimatePresence>
            </div>

            {/* Flecha Izquierda */}
            <button
                onClick={() => {
                    prevSlide();
                    resetAutoplay();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full transition-all border border-white/10 z-10"
                aria-label="Imagen anterior"
            >
                <svg
                    xmlns="http://w3.org"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* Flecha Derecha */}
            <button
                onClick={() => {
                    nextSlide();
                    resetAutoplay();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full transition-all border border-white/10 z-10"
                aria-label="Siguiente imagen"
            >
                <svg
                    xmlns="http://w3.org"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Puntos Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            resetAutoplay();
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                        aria-label={`Ir a imagen ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
