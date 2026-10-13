import { AnimatePresence, motion } from 'framer-motion';

import ProjectCard from './ProjectCard';
import Marquee from './Marquee';
import type { Props as ProjectCardProps } from './ProjectCard';

export interface Props {
    projects: ProjectCardProps[];
}

const ProjectList = ({ projects }: Props) => {
    return (
        <div className='pb-20'>
            <Marquee words={['Featured Work']} />
            <div className="port-container">
                <h2 className="section-label">Projects</h2>
                <p className="lg:w-5/12 text-xl mb-24">
                    Here is a sneak peek at the projects I've had the chance to work on. I'm constantly updating my
                    portfolio, so stay tuned for new upcoming projects.
                </p>
                <div className="md:columns-2 gap-8">
                    <AnimatePresence>
                        {projects.map((project) => (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ transform: 'scale(0)' }}
                                animate={{ transform: 'scale(1)' }}
                                exit={{ transform: 'scale(0)' }}
                            >
                                <ProjectCard
                                    url={project.url}
                                    title={project.title}
                                    img={project.img}
                                    category={project.category}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
