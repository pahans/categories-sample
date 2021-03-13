import Categories from './Categories';
import { buildTree, getIdsFromNodes } from '../../utils';
import response from './response';
import { useReducer, useMemo, useCallback } from 'react';

const ROOT_PARENT_ID = "0";

function reducer(state, action) {
    switch (action.type) {
        case "tree-change":
            if (action.payload.checked) {
                // uncheck
                const childUnChecked = Object.keys(getIdsFromNodes(action.payload.node));
                const newChecked = state.checked.filter((id) => {
                    return !childUnChecked.includes(id);
                });

                return {
                    ...state,
                    checked: newChecked,
                };
            } else {
                // check
                const childChecked = Object.keys(getIdsFromNodes(action.payload.node));
                return {
                    ...state,
                    checked: [
                        ...state.checked,
                        ...childChecked,
                        action.payload.node.id,
                    ],
                };
            }
        default:
            return state;
    }
}

const CategoriesRoot = () => {
    const initialState = { checked: [], categories: response.data.categories };
    const [state, dispatch] = useReducer(reducer, initialState);
    const tree = useMemo(() => {
        return buildTree(state.categories, ROOT_PARENT_ID, state.checked)
    }, [state.categories, state.checked]);

    const onChange = useCallback((checked, node) => {
        dispatch({
            type: "tree-change",
            payload: {
                node,
                checked
            }
        });
    }, []);

    return (
        <Categories
            categories={tree}
            onChange={onChange}
        ></Categories>
    );
};

export default CategoriesRoot;