import verticies from '../../data/verticies.json';

const lookupTable = {};
verticies.forEach(vertex => {
    const { nodes: [start, end] } = vertex;
    
    if (!lookupTable[end]) lookupTable[end] = {};
    if (!lookupTable[start]) lookupTable[start] = {};
    
    if (!lookupTable[start][end]) lookupTable[start][end] = [];
    if (!lookupTable[end][start]) lookupTable[end][start] = [];
    
    lookupTable[start][end].push({ end, ...vertex });
    lookupTable[end][start].push({ start, ...vertex });
});

export default lookupTable;

export function getRoutes(start, end, depth = 5, blocked = {}, steps = [], seen = {}, routes = []) {
    if (steps.length === 0) {
        steps.push(start);
    }
    
    for (let option in lookupTable[start]) {        
        if (option === end) {
            routes.push(steps.concat([end]));
            continue;
        }
        
        if (blocked[start] && blocked[start][option]) continue;
        if (blocked[option] && blocked[option][start]) continue;
        if (steps.length > depth) continue;
        if (steps.includes(option)) continue;
        if (seen[start] && seen[start][option]) continue;
            
        if (!seen[start]) seen[start] = {};
        seen[start][option] = true;
        
        routes.concat(getRoutes(option, end, depth, blocked, steps.slice().concat([option]), Object.assign({}, seen), routes));
    }
    
    return routes;
}

export function pairSteps(route) {
    return route.reduce((cur, s, i, arr) => {
        if (!arr[i + 1]) return cur;
        
        return cur.concat([[s, arr[i + 1]]]);
    }, []);
    
}

export function getPairedRouteStats(route) {
    return {
        route,
        totalLength: getPairedRouteTotalLength(route),
        colorLength: {
            ...getPairedRouteColorLength(route)
        },
        totalPoints: getPairedRouteTotalPoints(route)
    };
}

export function getPairedRouteTotalLength(route) {
    return route.reduce((acc, step) => {
        return acc + lookupTable[step[0]][step[1]][0].length;
    }, 0);
}

export function getPairedRouteColorLength(route) {
    return route.reduce((acc, step) => {
        const vertex = lookupTable[step[0]][step[1]][0];
        
        if (!acc[vertex.color]) acc[vertex.color] = 0;
        acc[vertex.color] = acc[vertex.color] + vertex.length;
        
        return acc;
    }, {});
}

export function getPairedRouteTotalPoints(route) {
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

export function getRoutesData({start, end, depth}) {
    const r = getRoutes(start, end, depth)
        .map(pairSteps)
        .map(getPairedRouteStats)
        .sort((a, b) => a.totalLength >= b.totalLength ? 1 : -1);
    
    return r;
}

// const r1 = getRoutes("lisboa", "danzig");
// const r2 = getRoutes("brindisi", "petrograd");
//console.log(r1.map(r => r.join(` --> `)));

// const rr1 = r1.map(pairSteps);
// const rr2 = r2.map(pairSteps);

//console.log(rr1);

//const rrs1 = rr1.map(getPairedRouteStats).sort((a, b) => a.endtalLength >= b.endtalLength ? 1 : -1);
//console.log(JSON.stringify(rrs1.slice(0, 5), null, 4));
// 
// const rrp1 = rr1.map(getPairedRouteStats).sort((a, b) => b.endtalPoints >= a.endtalPoints ? 1 : -1);
// const rrp2 = rr2.map(getPairedRouteStats).sort((a, b) => b.endtalPoints >= a.endtalPoints ? 1 : -1);
// 
// console.log(JSON.stringify(lodash.union(rrp1.slice(0, 5), rrp2.slice(0, 5)), null, 4));