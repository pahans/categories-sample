import PropTypes from 'prop-types';

import LabeledCheck from './LabeledCheck';
import './Categories.css';

const Categories = ({ categories, onChange }) => {
    return (
        <ul>
            {
                categories.map(node => {
                    return (
                        <LabeledCheck
                            node={node}
                            onChange={onChange}
                            key={node.id}
                        />
                    );
                })
            }
        </ul>
    );
};


Categories.propTypes = {
    categories: PropTypes.array,
    onChange: PropTypes.func
};

export default Categories;