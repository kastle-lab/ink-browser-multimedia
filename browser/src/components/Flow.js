import React, { useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
    MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: 'provider-1',
        type: 'input',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 },
    },
    { id: 'provider-2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
    { id: 'provider-3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
    { id: 'provider-4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
];

const initialEdges = [
    {
        id: 'provider-e1-2',
        source: 'provider-1',
        target: 'provider-2',
        animated: true,
    },
    { id: 'provider-e1-3', source: 'provider-1', target: 'provider-3' },
];

const Flow = ({data, setData}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

    function nodeClick() {
        nodes.map((node) => {
            if (node.selected == true) {
                setData(node)
            }
        })
    }

    return (
        <div className="providerflow">
            <ReactFlowProvider>
                <div className="reactflow-wrapper">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                        onNodeClick={nodeClick}
                    >
                        <MiniMap zoomable pannable nodeColor={'#999'} position={'top-right'}/>
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default Flow;