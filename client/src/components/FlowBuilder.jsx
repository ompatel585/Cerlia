// import React from 'react'

// import { useState, useCallback } from "react";
// import {
//   ReactFlow,
//   applyNodeChanges,
//   applyEdgeChanges,
//   ReactFlowProvider,
//   addEdge, MiniMap, MarkerType,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";

// const initialNodes = [
//   { id: "n1", position: { x: 0, y: 0 }, data: { label: "API Endpoint" } },
//   { id: "n2", position: { x: 0, y: 100 }, data: { label: "Schema" } },
//   { id: "n3", position: { x: 0, y: 200 }, data: { label: "+ Add a new Service Node" } },
//   { id: "n4", position: { x: 0, y: 300 }, data: { label: "Output Node" } },
// ];
// const initialEdges = [
//   {
//     id: "n1-n2",
//     source: "n1",
//     target: "n2",
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//       color: "#007bff",
//     },
//     style: {
//       stroke: "#007bff",
//     },
//   },
//   {
//     id: "n2-n3",
//     source: "n2",
//     target: "n3",
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//       color: "#007bff",
//     },
//     style: {
//       stroke: "#007bff",
//     },
//   },
//   {
//     id: "n3-n4",
//     source: "n3",
//     target: "n4",
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//       color: "#007bff",
//     },
//     style: {
//       stroke: "#007bff",
//     },
//   },
// ];

// const  FlowBuilder = () =>  {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);

//   const onNodesChange = useCallback(
//     (changes) =>
//       setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
//     []
//   );
//   const onEdgesChange = useCallback(
//     (changes) =>
//       setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
//     []
//   );
//   const onConnect = useCallback(
//     (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
//     []
//   );

//   return (
//     <div>
//       <ReactFlowProvider>
//         <div style={{ width: "100vw", height: "100vh" }}>
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             fitView
//           />
//           <MiniMap
//             nodeStrokeColor={(n) => {
//               if (n.style?.background) return n.style.background;
//               if (n.type === "input") return "#0ea5e9"; // sky-500
//               if (n.type === "output") return "#10b981"; // emerald-500
//               return "#6366f1"; // indigo-500
//             }}
//             nodeColor={(n) => "#a5b4fc"} // indigo-200
//             nodeStrokeWidth={3}
//             className="rounded-xl"
//           />
//         </div>
//       </ReactFlowProvider>
//     </div>
//   );
// }
// export default FlowBuilder;

import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
  addEdge,
  MiniMap,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

let serviceCounter = 1;

const createNode = (id, y, label) => ({
  id,
  position: { x: 0, y },
  data: { label },
});

const FlowBuilder = () => {
  const [nodes, setNodes] = useState([
    createNode("n1", 0, "API Endpoint"),
    createNode("n2", 100, "Schema"),
    createNode("add-service", 200, "+ Add a new Service Node"),
    createNode("n4", 300, "Output Node"),
  ]);

  const [edges, setEdges] = useState([
    {
      id: "n1-n2",
      source: "n1",
      target: "n2",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
      style: { stroke: "#007bff" },
    },
    {
      id: "n2-add-service",
      source: "n2",
      target: "add-service",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
      style: { stroke: "#007bff" },
    },
    {
      id: "add-service-n4",
      source: "add-service",
      target: "n4",
      markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
      style: { stroke: "#007bff" },
    },
  ]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addServiceNode = () => {
    const newServiceId = `service-${serviceCounter++}`;
    const newServiceLabel = `Service Node ${serviceCounter - 1}`;

    const updatedNodes = [];
    const updatedEdges = [];

    let newY = 0;

    // Step 1: Go through all nodes and insert new service node between "add-service" and "n4"
    for (const node of nodes) {
      if (node.id === "add-service") {
        // Store Y so new node aligns below
        newY = node.position.y + 100;

        updatedNodes.push(node); // Keep add-service at same place for now

        // Insert new service node
        updatedNodes.push(createNode(newServiceId, newY, newServiceLabel));
      } else if (
        node.position.y > nodes.find((n) => n.id === "add-service").position.y
      ) {
        // Shift output node downward
        updatedNodes.push({
          ...node,
          position: { ...node.position, y: node.position.y + 100 },
        });
      } else {
        updatedNodes.push(node); // Keep unchanged nodes
      }
    }

    // Step 2: Regenerate all edges cleanly
    for (const edge of edges) {
      if (edge.source === "add-service" && edge.target === "n4") {
        // Break the add-service → output edge
        updatedEdges.push({
          id: `add-service-${newServiceId}`,
          source: "add-service",
          target: newServiceId,
          markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
          style: { stroke: "#007bff" },
        });

        updatedEdges.push({
          id: `${newServiceId}-n4`,
          source: newServiceId,
          target: "n4",
          markerEnd: { type: MarkerType.ArrowClosed, color: "#007bff" },
          style: { stroke: "#007bff" },
        });
      } else {
        updatedEdges.push(edge);
      }
    }

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  const handleNodeClick = (event, node) => {
    if (node.id === "add-service") {
      addServiceNode();
    }
  };

  return (
    <div className="">
      <ReactFlowProvider>
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
          />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === "input") return "#0ea5e9";
              if (n.type === "output") return "#10b981";
              return "#6366f1";
            }}
            nodeColor={() => "#a5b4fc"}
            nodeStrokeWidth={3}
            className="rounded-xl"
          />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowBuilder;
