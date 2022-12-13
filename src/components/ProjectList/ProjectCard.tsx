import classNames from 'classnames';

export interface Props {
    url: string;
    title: string;
    img: {
        src: string;
        alt: string;
    };
    category: string;
}

const ProjectCard = ({ url, title, img, category }: Props) => {
    return (
        <a href={url} className="block w-full break-inside-avoid-column group border-b border-b-gray mb-16">
            <div className="overflow-hidden mb-10">
                <img
                    src={img.src}
                    alt={img.alt}
                    className="max-w-full group-hover:scale-125 transition ease-in-out duration-500"
                />
            </div>
            <h2 className="text-xl font-medium mb-4">{title}</h2>
            <span className={classNames('uppercase block group-hover:text-yellow transition mb-8')}>{category}</span>
        </a>
    );
};

export default ProjectCard;
