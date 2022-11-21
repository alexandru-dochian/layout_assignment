export class Node {
    x;
    y;
    children;
    constructor(x, y, children) {
        this.x = x;
        this.y = y;
        this.children = children;
    }
    isLeaf() {
        return this.children.length == 0;
    }
}
