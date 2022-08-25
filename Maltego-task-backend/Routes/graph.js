const express = require("express")
const graphRoutes = express.Router();
const fs = require('fs');

const dataPath = './assets/data/graphs.json'

// util functions 

const saveGraphData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPath, stringifyData)
}

const getGraphData = () => {
  const jsonData = fs.readFileSync(dataPath)
  return JSON.parse(jsonData)
}

// Post - add graph
graphRoutes.post('/graph', (req, res) => {

  let graphList = getGraphData()
  const newGraphId = "grph_" + Math.floor(100000 + Math.random() * 900000);
  let newGraph = req.body;
  newGraph["id"] = newGraphId;
  graphList.push(newGraph);
  saveGraphData(graphList);
  res.send({ success: true, msg: 'graph data added successfully' });

})

// Get - get all graphs
graphRoutes.get('/graph', (req, res) => {
  const graphs = getGraphData()
  res.send(graphs)
})

// Get - get graph by id
graphRoutes.get('/graph/:id', (req, res) => {
  const graphId = req.params['id'];
  let graphList = getGraphData();
  const graph = graphList.find(graph => graph.id === graphId);
  res.send(graph);
})


//delete - delete graph by id
graphRoutes.delete('/graph/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    let graphList = getGraphData();
    const graphId = req.params['id'];
    graphList = graphList.filter(graph => graph.id !== graphId);
    saveGraphData(graphList);
    res.send(`graphs with id ${graphId} has been deleted`)
  }, true);
})
module.exports = graphRoutes