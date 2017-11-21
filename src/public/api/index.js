/* eslint-disable */
import Graph from './graph';
import { brute, fillGraph} from './solvers';
import { permute,isValidPartition, calculatePartition, splitArray, randomGraph, intArray } from './tools.js';

const G = new Graph(11);
G.load([
    [0, 3, 0, 1, 0, 0, 1, 1, 1, 3, 0], // James
    [3, 0, 0, 0, -1, 2, 2, 2, 0, 0, 0], // Aleister
    [0, 1, 0, 5, 0, 0, 0, 0, 0, 1, 3], // Bryony
    [0, 0, 5, 0, 1, 0, 0, 0, 2, 2, 0], // Chris
    [1, 1, 0, 2, 0, 0, 0, 0, 2, 3, 0], // Matt
    [0, 3, 0, 0, 0, 0, 5, 2, 0, 0, 0], // Val
    [0, 3, 0, 0, 0, 5, 0, 2, 0, 0, 0], // Mariam
    [1, 3, 0, 0, 0, 2, 4, 0, 0, 0, 0], // Perry
    [2, 1, 0, 1, 1, 0, 0, 0, 0, 5, 0], // Hefin
    [2, 2, 0, 1, 1, 0, 0, 0, 4, 0, 0], // Ed
    [0, 0, 9, 1, 0, 0, 0, 0, 0, 0, 0], // Niamh
]);


//const G = randomGraph(20, -5, 10);
//console.log(G);
let best = undefined;
let bestSol = [];
let worst = 0;
let worstSol = [];
for (let i = 0; i < 100; i += 1) {
    const sol = fillGraph(G, 2);
    const cut = calculatePartition(G, sol);
    if (cut > worst) {
        worst = cut;
        worstSol = sol;
    }
    if ((cut < best) || !best) {
        best = cut;
        bestSol = sol;
    }
}
console.log('best solution', bestSol, 'with weight', best);
console.log('worst solution', worstSol, 'with weight', worst);