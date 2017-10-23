/* eslint-disable */
import Graph from './graph';
import { permute,isValidPartition, calculatePartition, splitArray, randomGraph, intArray } from './tools.js';

// const G = new Graph(5);
// G.load([
//     [0,2,3,0,0],
//     [1,0,1,1,2],
//     [0,0,0,0,5],
//     [0,4,1,0,0],
//     [0,5,0,0,0],
// ]);


for(let a = 0; a < 5; a += 1) {
    const G = randomGraph(6);    
    console.time("random");    
    const permutations = permute(intArray(0, G.size));
    let bestPartition = [];
    let best = null;
    for (let i = 0; i < permutations.length; i += 1) {
        const p = permutations[i];
        const partition = splitArray(p, p.length/2);
        const score = calculatePartition(G, partition);
        if (
            (best === null) ||
            (score < best)        
        ) {
            bestPartition = partition;
            best = score;
        }
    }
    console.timeEnd("random");    
}

//console.log(g.matrix);