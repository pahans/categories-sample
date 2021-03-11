import classNames from 'classnames';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SubCategories from './Categories';

const LabeledCheck = ({ onChange, node }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const isLeafNode = !node.children.length;
    return (
        <li
            className={classNames("labeled-check", { "collapsed": isCollapsed && !isLeafNode, "expanded": !isCollapsed && !isLeafNode })}
            key={node.id}
        >

            {!isLeafNode &&
                <span
                    className="arrow"
                    onClick={() => { setIsCollapsed(!isCollapsed) }}>{`${isCollapsed ? "▸" : "▾"}`}
                </span>
            }
            <input
                type="checkbox"
                id="check"
                name="check"
                checked={node.checked}
                onChange={() => onChange(node.checked, node)}
                className={classNames("check-input", { "collapsed": isCollapsed })}
            />
            <label onClick={() => { setIsCollapsed(!isCollapsed) }}>{node.name}</label>
            {
                (!isLeafNode && !isCollapsed) ?
                    <ul >
                        <SubCategories categories={node.children} onChange={onChange} />
                    </ul>
                    : ""
            }
        </li>
    );
};

LabeledCheck.propTypes = {
    node: PropTypes.object,
    onChange: PropTypes.func
};

export default LabeledCheck;