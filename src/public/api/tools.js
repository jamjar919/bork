export function permute(array) {
    if (array.length === 1) {
        return array;
    }
    const results = [];
    for (let i = 0; i < array.length; i += 1) {
        const arrcopy = Object.assign([], array);
        const el = [arrcopy[i]];
        arrcopy.splice(i, 1);
        const endings = permute(arrcopy);
        for (let j = 0; j < endings.length; j+= 1) {
            const p = el.concat(endings[j]);
            results.push(p);
        }
    }
    return results;
}

export function splitArray(array, index) {
    return [
        array.slice(0, index),
        array.slice(index)
    ];
}

export function flattenPartition(partition) {
    let result = [];
    for (let i = 0; i < partition.length; i += 1) {
        result = result.concat(partition[i]);
    }
    return result;
}

export function isValidPartition(G, partition) {
    // A partition is valid if it contains all the numbers from 0 - G.size - 1
    const flat = flattenPartition(partition);
    for (let i = 0; i < G.size; i += 1) {
        const index = flat.indexOf(i);
        if (index === -1) {
            // We didn't find it in the array
            return false;
        }
        flat.splice(index, 1);
    }
    if (flat.length !== 0) {
        // We removed all numbers and the partition still has something in
        return false;
    }
    return true;
}

export function calculatePartition(G, partition) {
    // G is a graph, partition is an array of the form [[0,1,2],[3,4],...[9,10]] where each subarray is a partition
    if (isValidPartition(G, partition)) {

    }
    throw Error("Invalid partition of graph");
}