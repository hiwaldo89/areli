import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import FilterButton from './FilterButton';
import ProjectCard from './ProjectCard';
import type { Props as ProjectCardProps } from './ProjectCard';

export interface Props {
    filters: string[];
    projects: ProjectCardProps[];
}

const ProjectList = ({ filters, projects }: Props) => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            if (selectedFilter === 'All') {
                return project;
            }

            return selectedFilter === project.category;
        });
    }, [selectedFilter, projects]);

    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
    };

    return (
        <>
            <div className="md:flex items-center mb-20">
                <h2 className="font-medium text-2xl mb-5 md:mb-0">Projects</h2>
                <ul className="flex flex-wrap ml-auto">
                    <FilterButton filter="All" active={selectedFilter === 'All'} onClick={handleFilterClick} />
                    {filters.map((filter) => (
                        <FilterButton
                            key={filter}
                            filter={filter}
                            active={selectedFilter === filter}
                            onClick={handleFilterClick}
                        />
                    ))}
                </ul>
            </div>
            <p className="lg:w-5/12 text-xl mb-24">
                Here is a sneak peek at the projects I've had the chance to work on. I'm constantly updating my portfolio, so stay tuned for new upcoming projects.
            </p>
            <div className="md:columns-2">
                <AnimatePresence>
                    {filteredProjects.map((project) => (
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
        </>
    );
};

export default ProjectList;
