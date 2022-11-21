import assert from "node:assert";
import { Node } from "./Node.js";
// Global variables ###########################################################
let assignedPositions = [];
// Main program ###############################################################
testImplementation();
main();
//#############################################################################
// Functions ##################################################################
function main() {
    let tree0 = new Node(-1, -1, [
        new Node(-1, -1, [
            new Node(-1, -1, [
                new Node(-1, -1, []),
                new Node(-1, -1, [new Node(-1, -1, []), new Node(-1, -1, [])]),
            ]),
            new Node(-1, -1, []),
        ]),
    ]);
    let tree1 = new Node(-1, -1, [
        new Node(-1, -1, [
            new Node(-1, -1, [
                new Node(-1, -1, []),
                new Node(-1, -1, [new Node(-1, -1, []), new Node(-1, -1, [])]),
            ]),
            new Node(-1, -1, [new Node(-1, -1, [])]),
        ]),
    ]);
    let tree2 = new Node(-1, -1, [
        new Node(-1, -1, [
            new Node(-1, -1, [
                new Node(-1, -1, []),
                new Node(-1, -1, [new Node(-1, -1, []), new Node(-1, -1, [])]),
            ]),
            new Node(-1, -1, [new Node(-1, -1, [new Node(-1, -1, [])])]),
        ]),
    ]);
    let tree3 = new Node(-1, -1, [
        new Node(-1, -1, [
            new Node(-1, -1, [
                new Node(-1, -1, [
                    new Node(-1, -1, []),
                    new Node(-1, -1, [
                        new Node(-1, -1, []),
                        new Node(-1, -1, []),
                    ]),
                ]),
                new Node(-1, -1, [new Node(-1, -1, [])]),
            ]),
            new Node(-1, -1, [new Node(-1, -1, [])]),
        ]),
    ]);
    [tree0, tree1, tree2, tree3].forEach((tree, treeIndex) => {
        console.log(`Solving tree [${treeIndex}]...`);
        assignedPositions = [];
        assert(solve(tree, 0, 0) == true);
        console.log("Printing tree values...");
        printTree(tree);
        console.log("Printing layout...");
        printLayout();
        console.log("########--------########\n");
    });
}
function solve(currentNode, x = 0, y = 0) {
    const position = [x, y];
    if (isPositionAlreadyAssigned(position)) {
        return false;
    }
    if (isPositionCrossingLine(position)) {
        return false;
    }
    if (currentNode.isLeaf()) {
        addToAssignedPositionsArray(position);
        currentNode.x = x;
        currentNode.y = y;
        return true;
    }
    for (let index = 0; index < currentNode.children.length; index++) {
        const childNode = currentNode.children[index];
        if (index == 0) {
            const success = solve(childNode, x, y + 1);
            if (!success) {
                return false;
            }
            continue;
        }
        let chosenXForChild = x + index;
        while (!solve(childNode, chosenXForChild++, y + 1))
            ;
    }
    addToAssignedPositionsArray(position);
    currentNode.x = x;
    currentNode.y = y;
    return true;
}
function printTree(currentNode, depth = 0) {
    let tabs = "";
    for (let index = 0; index < depth; index++) {
        tabs += "\t";
    }
    console.log(`${tabs} (${currentNode.x}, ${currentNode.y})`);
    currentNode.children.forEach((childNode) => printTree(childNode, depth + 1));
}
function printLayout() {
    let maxRowIndex = -1;
    let maxColumnIndex = -1;
    assignedPositions.forEach((position) => {
        if (position[0] > maxRowIndex) {
            maxRowIndex = position[0];
        }
        if (position[1] > maxColumnIndex) {
            maxColumnIndex = position[1];
        }
    });
    const numberOfRows = maxRowIndex + 1;
    const numberOfColumns = maxColumnIndex + 1;
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        let row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
            if (isPositionAlreadyAssigned([rowIndex, columnIndex])) {
                row.push("X");
            }
            else {
                row.push(" ");
            }
        }
        console.log(row);
    }
}
function testImplementation() {
    addToAssignedPositionsArray([1, 1]);
    assert(isPositionAlreadyAssigned([1, 1]) === true);
    removeFromAssignedPositionsArray([1, 1]);
    assert(isPositionAlreadyAssigned([1, 1]) === false);
}
function addToAssignedPositionsArray(position) {
    if (!isPositionAlreadyAssigned(position)) {
        assignedPositions.push(position);
    }
}
function removeFromAssignedPositionsArray(positionToRemove) {
    assignedPositions = assignedPositions.filter((position) => !arePositionsEqual(position, positionToRemove));
}
function isPositionAlreadyAssigned(searchedPosition) {
    for (let index = 0; index < assignedPositions.length; index++) {
        const currentPosition = assignedPositions[index];
        if (arePositionsEqual(currentPosition, searchedPosition)) {
            return true;
        }
    }
    return false;
}
function isPositionCrossingLine(positionToCheck) {
    const positionToCheckRow = positionToCheck[0];
    const positionToCheckColumn = positionToCheck[1];
    for (let index = 0; index < assignedPositions.length; index++) {
        const currentPosition = assignedPositions[index];
        const currentPositionRow = currentPosition[0];
        const currentPositionColumn = currentPosition[1];
        if (positionToCheckColumn == currentPositionColumn &&
            currentPositionRow > positionToCheckRow) {
            return true;
        }
    }
    return false;
}
function arePositionsEqual(firstPosition, secondPosition) {
    return (firstPosition[0] === secondPosition[0] &&
        firstPosition[1] === secondPosition[1]);
}
