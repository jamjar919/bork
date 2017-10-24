import { permute, calculatePartition, splitArray, intArray, getRandomInt } from './tools';

export function brute(G) {
    const permutations = permute(intArray(0, G.size));
    let bestPartition = [];
    let best = null;
    for (let i = 0; i < permutations.length; i += 1) {
        const p = permutations[i];
        const partition = splitArray(p, p.length / 2);
        const score = calculatePartition(G, partition);
        if (
            (best === null) ||
            (score < best)
        ) {
            bestPartition = partition;
            best = score;
        }
    }
    return bestPartition;
}

export function fillGraph(G) {
    // Select two random nodes
    const node1 = getRandomInt(0, G.size);
    const node2 = getRandomInt(0, G.size);
    const partitions = [];
    while() {

    }
}
