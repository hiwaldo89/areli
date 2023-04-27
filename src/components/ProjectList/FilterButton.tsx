import classNames from 'classnames';

export interface Props {
    filter: string;
    active?: boolean;
    onClick: (filter: string) => void;
}

const FilterButton = ({ filter, active = false, onClick }: Props) => {
    const handleClick = () => {
        onClick(filter);
    };

    return (
        <li className={classNames('mr-8 mb-5 md:mb-0 last:mr-0')}>
            <button
                className={classNames(
                    'border border-gray rounded-full py-4 px-5 text-sm min-w-[80px] hover:bg-yellow hover:border-yellow transition ease-in-out duration-500',
                    {
                        'bg-yellow border-yellow': active,
                    }
                )}
                onClick={handleClick}
            >
                {filter}
            </button>
        </li>
    );
};

export default FilterButton;
