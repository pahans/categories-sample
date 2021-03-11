
function getChildren(allCategories, categoryId) {
    const categories = allCategories.filter(({ parent }) => {
        return parent === categoryId;
    });
    return categories;
}

export function buildTree(categories, parentId, checked = []) {
    const children = getChildren(categories, parentId);

    return children.map(({ parent, id, name, count }) => {
        const isChecked = checked.some((check)=> id === check);
        
        return {
            id,
            parent,
            name,
            count,
            checked: isChecked,
            children: buildTree(categories, id, checked)
        }
    });
}

export function getIdsFromNodes(node, ids = {}) {
    let newIds = {
        ...ids,
        [node.id]: true,
    }
    node.children = node.children || [];
    if(!node.children.length) {
        return newIds;
    } else {
        node.children.forEach((child)=>{
            const childIds = getIdsFromNodes(child, newIds);
            newIds = childIds;
        });
        return newIds;
    }
}
