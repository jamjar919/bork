import Graph from './graph.js';
import { permute, isValidPartition, splitArray } from './tools.js';

const G = new Graph(5);
G.load([
    [0,2,3,0,0],
    [1,0,1,1,2],
    [0,0,0,0,5],
    [0,4,1,0,0],
    [0,5,0,0,0],
]);

console.log(splitArray([0,1,2,3,4], 5/2));

const permutations = permute([0,1,2,3,4]);


//console.log(g.matrix);