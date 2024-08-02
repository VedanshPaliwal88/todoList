export default function deleteItem(item, project) {
    let idx = project.items.indexOf(item);
    project.items.splice(idx, 1);
}