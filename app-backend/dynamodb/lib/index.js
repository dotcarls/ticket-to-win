const verticies = require('./verticies.js');
const lodash = require('lodash');

const lookupTable = {};
verticies.forEach(vertex => {
    const { nodes: [from, to] } = vertex;
    
    if (!lookupTable[to]) lookupTable[to] = {};
    if (!lookupTable[from]) lookupTable[from] = {};
    
    if (!lookupTable[from][to]) lookupTable[from][to] = [];
    if (!lookupTable[to][from]) lookupTable[to][from] = [];
    
    lookupTable[from][to].push({ to, ...vertex });
    lookupTable[to][from].push({ from, ...vertex });
});

function getRoutes(from, to, steps = [], blocked = {}, maxLength = 13, seen = {}, routes = []) {
    if (steps.length === 0) {
        steps.push(from);
    }
    
    for (let option in lookupTable[from]) {        
        if (option === to) {
            routes.push(steps.concat([to]));
            continue;
        }
        
        if (blocked[from] && blocked[from][option]) continue;
        if (blocked[option] && blocked[option][from]) continue;
        if (steps.length > maxLength) continue;
        if (steps.includes(option)) continue;
        if (seen[from] && seen[from][option]) continue;
            
        if (!seen[from]) seen[from] = {};
        seen[from][option] = true;
        
        routes.concat(getRoutes(option, to, steps.slice().concat([option]), blocked, maxLength, Object.assign({}, seen), routes));
    }
    
    return routes;
}

function pairSteps(route) {
    return route.reduce((cur, s, i, arr) => {
        if (!arr[i + 1]) return cur;
        
        return cur.concat([[s, arr[i + 1]]]);
    }, []);
    
}

function getPairedRouteStats(route) {
    return {
        route,
        totalLength: getPairedRouteTotalLength(route),
        colorLength: {
            ...getPairedRouteColorLength(route)
        },
        totalPoints: getPairedRouteTotalPoints(route)
    };
}

function getPairedRouteTotalLength(route) {
    return route.reduce((acc, step) => {
        return acc + lookupTable[step[0]][step[1]][0].length;
    }, 0);
}

function getPairedRouteColorLength(route) {
    return route.reduce((acc, step) => {
        const vertex = lookupTable[step[0]][step[1]][0];
        
        if (!acc[vertex.color]) acc[vertex.color] = 0;
        acc[vertex.color] = acc[vertex.color] + vertex.length;
        
        return acc;
    }, {});
}

function getPairedRouteTotalPoints(route) {
    const scoringMatrix = {
        1: 1,
        2: 2,
        3: 4,
        4: 7,
        6: 15,
        8: 21
    };
    
    return route.reduce((acc, step) => {
        return acc + scoringMatrix[lookupTable[step[0]][step[1]][0].length];
    }, 0);
}

const r1 = getRoutes("lisboa", "danzig");
const r2 = getRoutes("brindisi", "petrograd");
//console.log(r1.map(r => r.join(` --> `)));

const rr1 = r1.map(pairSteps);
const rr2 = r2.map(pairSteps);

//console.log(rr1);

//const rrs1 = rr1.map(getPairedRouteStats).sort((a, b) => a.totalLength >= b.totalLength ? 1 : -1);
//console.log(JSON.stringify(rrs1.slice(0, 5), null, 4));

const rrp1 = rr1.map(getPairedRouteStats).sort((a, b) => b.totalPoints >= a.totalPoints ? 1 : -1);
const rrp2 = rr2.map(getPairedRouteStats).sort((a, b) => b.totalPoints >= a.totalPoints ? 1 : -1);

console.log(JSON.stringify(lodash.union(rrp1.slice(0, 5), rrp2.slice(0, 5)), null, 4));