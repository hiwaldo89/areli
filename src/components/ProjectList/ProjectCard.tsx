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
        <a href={url} className="block w-full break-inside-avoid-column group mb-16">
            <div className="overflow-hidden mb-4">
                <img
                    src={img.src}
                    alt={img.alt}
                    className="max-w-full group-hover:scale-125 transition ease-in-out duration-500"
                />
            </div>
            <span className={classNames('font-mono uppercase block group-hover:text-green transition mb-2 text-sm')}>{category}</span>
            <h2 className="font-michroma text-xl font-medium mb-4">{title}</h2>
        </a>
    );
};

export default ProjectCard;
