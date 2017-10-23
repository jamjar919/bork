/* eslint-disable */
import Graph from './graph';
import { brute } from './solvers';
import { permute,isValidPartition, calculatePartition, splitArray, randomGraph, intArray } from './tools.js';

// const G = new Graph(5);
// G.load([
//     [0,2,3,0,0],
//     [1,0,1,1,2],
//     [0,0,0,0,5],
//     [0,4,1,0,0],
//     [0,5,0,0,0],
// ]);


const G = randomGraph(7);    
const sol = brute(G);
console.log(G);
console.log(sol);

//console.log(g.matrix);