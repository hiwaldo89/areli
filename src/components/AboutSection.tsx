import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const useParallax = (value: MotionValue<number>) => {
    return useTransform(value, [0, 1], ['100%', '-70%']);
};

const AboutSection = () => {
    const aboutSectionRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll();
    const y = useParallax(scrollYProgress);

    return (
        <>
            <div id="about" className="flex items-center mt-24">
                <div className="lg:w-5/12">
                    <h2 className="text-5xl mb-16">About me</h2>
                    <p>
                        Brownie liquorice jelly-o topping sugar plum toffee topping chupa chups. Candy canes marzipan
                        candy tart carrot cake powder sugar plum chocolate jelly beans
                    </p>
                </div>
                <div className="lg:w-3/12 mx-auto">
                    <div className="bg-gray w-full aspect-[5/6] rounded-t-[300px] z-10 relative"></div>
                    <motion.div
                        style={{ y, x: '-50%' }}
                        className="w-11/12 rounded-full bg-yellow aspect-square bottom-0 left-0 -z-10"
                    ></motion.div>
                </div>
            </div>
            <div ref={aboutSectionRef} />
        </>
    );
};

export default AboutSection;
