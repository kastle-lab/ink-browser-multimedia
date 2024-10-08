import React, { useState } from 'react';
import Schema from './Schema';
import Type from './Type';
import Focus from './Focus';
import Search from './Search';
import Statistics from './Statistics';
import ClassHierarchy from './ClassHierarchy';
import LeafMap from './LeafMap'
import QueryEndpoint from './QueryEndpoint';
import DetailedInfoDisplay from './DetailedInfoDisplay';
import ShortcutDisplay from './ShortcutDisplay';

function Layout(layout) {

  // Destructuring the variables passed down from the parent component into their own variables
  const { topLeft, topRight, bottomLeft, bottomRight } = layout;

  // Variable that is used to transfer data between different quadrants
  const [data, setData] = useState();
  const [bindings, setBindings] = useState();
  const [typeIsPending, setTypeIsPending] = useState(false);
  const [nodesIsPending, setNodesIsPending] = useState(false);
  const [coordinates, setCoordinates] = useState([39.781710, -84.063274]);
  const [dataFromType, setDataFromType] = useState();
  const [connections, setConnections] = useState();

  const [selected, setSelected] = useState();

  // Set view components equal to a variable
  const type = <div className='full-table' key={'type'}><Type data={data} bindings={bindings} typeIsPending={typeIsPending} setCoordinates={setCoordinates} endpoint={layout.endpoint} setDataFromType={setDataFromType} selected={selected}></Type></div>;
  const schema = <div className='view-full' key={'schema'}><Schema bindings={bindings} data={data} setData={setData} setTypeIsPending={setTypeIsPending} endpoint={layout.endpoint} connections={connections} nodesIsPending={nodesIsPending} selected={selected} setSelected={setSelected}></Schema></div>;
  const focus = <div className='full-table' key={'focus'}><Focus dataFromType={dataFromType}></Focus></div>;
  const classHierarchy = <div className='quadrant' key={'classHierarchy'}><ClassHierarchy endpoint={layout.endpoint}></ClassHierarchy></div>;
  const statistics = <div className='full-table' key={'statistics'}><Statistics></Statistics></div>;
  const search = <div className='quadrant' key={'search'}><Search bindings={bindings} setBindings={setBindings} endpoint={layout.endpoint} setConnections={setConnections}></Search></div>;
  const map = <div className='view-full' key={'map'}><LeafMap coordinates={coordinates} zoomLevel={layout.zoomLevel}></LeafMap></div>;
  const empty = <div className='quadrant' key={'empty'}></div>;
  const detail = <div className='full-table' key={'detail'}><DetailedInfoDisplay dataFromType={dataFromType}></DetailedInfoDisplay></div>;
  const shortcut = (
    <div className='full-table' key={'shortcut'}>
      <ShortcutDisplay endpoint={layout.endpoint} dataFromType={dataFromType} />
    </div>
  );
  



  // Array that holds view data to be mapped through for rendering
  const views = [
    { viewString: 'Type', viewComponent: type },
    { viewString: 'Schema', viewComponent: schema },
    { viewString: 'Focus', viewComponent: focus },
    { viewString: 'Class Hierarchy', viewComponent: classHierarchy },
    { viewString: 'Statistics', viewComponent: statistics },
    { viewString: 'Search', viewComponent: search },
    { viewString: 'Map', viewComponent: map },
    { viewString: 'Empty', viewComponent: empty },
    { viewString: 'DetailedInfoDisplay', viewComponent: detail },
    { viewString: 'ShortcutDisplay', viewComponent: shortcut }

  ]

  return (
    <div className={`gridlayout ${layout.theme}`}>

      {/* Logic for which view to render in the top left qudrant */}
      {views.map((view) => (
        topLeft === view.viewString && view.viewComponent
      ))}

      {/* Logic for which view to render in the top right qudrant */}
      {views.map((view) => (
        topRight === view.viewString && view.viewComponent
      ))}

      {/* Logic for which view to render in the bottom left qudrant */}
      {views.map((view) => (
        bottomLeft === view.viewString && view.viewComponent
      ))}

      {/* Logic for which view to render in the bottom right qudrant */}
      {views.map((view) => (
        bottomRight === view.viewString && view.viewComponent
      ))}
      <QueryEndpoint setBindings={setBindings} endpoint={layout.endpoint} setConnections={setConnections} setNodesIsPending={setNodesIsPending}></QueryEndpoint>
    </div>

  )
}

export default Layout