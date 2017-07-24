import React, { Component } from 'react';
import './App.css';
import Graph from 'react-graph-vis';
import graph from './ht_conn_thresh=0,6.json';

const lons = [];
const lats = [];
window.lons = lons;
window
for (const node of graph.nodes) {
    const [lon, lat] = node.id.split('_').map((c) => c.replace(',', '.').replace('r', '')).map(Number.parseFloat);
    lons.push(lon);
    lats.push(lat);
}
const lon_max = Math.max(...lons);
const lon_min = Math.min(...lons);
const lat_max = Math.max(...lats);
const lat_min = Math.min(...lats);
graph.nodes.forEach((node, i) => {
    node.x = (lons[i] - lon_min) * 1000;
    node.y = (lat_max - lats[i]) * 1000;
    node.label = [lons[i], lats[i]];
    node.fixed = true;
    node.size = 1;
});


const height = (lat_max - lat_min) * 50;
const width = (lon_max - lon_min) * 50;
const options = {
    layout: {
        hierarchical: false
    },
    // height: `${height}px`,
    // width: `${width}px`,
    edges: {
        color: '#000000'
    },
};

const events = {
    select: (e) => {
        const {nodes, edges} = e;
    }
};

class App extends Component {

    render() {
        window.g = graph;
        console.log(graph, 'graph');
        return (
            <div className="App">
                <Graph
                graph={graph}
                options={options}
                events={events}
                />
            </div>
        );
    }
}

export default App;
