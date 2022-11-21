export class Node {
    public x: number;
    public y: number;
    public children: Array<Node>;

    constructor(x: number, y: number, children: Array<Node>) {
        this.x = x;
        this.y = y;
        this.children = children;
    }

    public isLeaf(): boolean {
        return this.children.length == 0;
    }
}