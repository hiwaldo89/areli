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
            <div id="about" className="flex flex-wrap items-center mt-24">
                <div className="md:w-5/12 mb-5 md:mb-0">
                    <h2 className="text-5xl mb-16">About me</h2>
                    <p>
                        I'm a UX / UI Designer from Mexico, but relocated on July 2022 to San Jose, California.
                        I have a Bachelor's Degree on Marketing and Communications and a passion for design, specially User Interfaces.
                        Two of my favorite hobbies are to watch interior design Youtube videos and take long walks with my dog Uma. 
                    </p>
                </div>
                <div className="w-7/12 md:w-3/12 mx-auto">
                    <div className="bg-gray w-full aspect-[5/6] rounded-t-[300px] z-10 relative overflow-hidden">
                        <img src="/images/areli-01.jpg" className="w-full h-full object-cover" />
                    </div>
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
