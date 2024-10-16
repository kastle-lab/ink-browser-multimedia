import React, {useState} from 'react';
import Schema from './Schema';
import Type from './Type';
import Focus from './Focus';
import Search from './Search';
import Statistics from './Statistics';
import ClassHierarchy from './ClassHierarchy';
import LeafMap from './LeafMap'
import QueryEndpoint from './QueryEndpoint';
import ItemList from "./ItemList";
import ItemDescription from "./ItemDescription"

function Layout(layout) {

  // Destructuring the variables passed down from the parent component into their own variables
  const {topLeft, topRight, bottomLeft, bottomRight} = layout;

  // Variable that is used to transfer data between different quadrants
  const [data, setData] = useState();
  const [bindings, setBindings] = useState();
  const [typeIsPending, setTypeIsPending] = useState(false);
  const [nodesIsPending, setNodesIsPending] = useState(false);
  const [coordinates, setCoordinates] = useState([39.781710, -84.063274]);
  const [dataFromType, setDataFromType] = useState();
  const [connections, setConnections] = useState();

  const [itemInVideoData, setItemInVideoData] = useState([
    {
      name: "This",
      summary: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
          "Pellentesque lacinia euismod ullamcorper. Suspendisse pretium egestas metus, " +
          "ut rhoncus diam condimentum non. In hac habitasse platea dictumst. " +
          "Maecenas iaculis nisi sed magna vehicula, vitae ornare justo rutrum. " +
          "Suspendisse lacinia libero erat, nec vehicula lectus tempor vitae. " +
          "Vivamus vitae orci augue. Morbi sit amet diam sit amet leo pharetra rutrum vitae et eros. " +
          "Sed aliquam magna sem, blandit tempor ipsum ornare ut. " +
          "Sed porttitor sollicitudin ligula bibendum tempus. " +
          "Fusce pharetra augue erat, quis feugiat risus bibendum quis.",
    },
    {
      name: "That",
      summary: "Canterbury Tales",
      description: "Whan that Aprille with his shoures soote,\n" +
          "The droghte of March hath perced to the roote,\n" +
          "And bathed every veyne in swich licóur\n" +
          "Of which vertú engendred is the flour;\n" +
          "Whan Zephirus eek with his swete breeth\n" +
          "Inspired hath in every holt and heeth\n" +
          "The tendre croppes, and the yonge sonne\n" +
          "Hath in the Ram his halfe cours y-ronne,\n" +
          "And smale foweles maken melodye,\n" +
          "That slepen al the nyght with open ye,\n" +
          "So priketh hem Natúre in hir corages,\n" +
          "Thanne longen folk to goon on pilgrimages,\n" +
          "And palmeres for to seken straunge strondes,\n" +
          "To ferne halwes, kowthe in sondry londes;\n" +
          "And specially, from every shires ende\n" +
          "Of Engelond, to Caunterbury they wende,\n" +
          "The hooly blisful martir for to seke,\n" +
          "That hem hath holpen whan that they were seeke.",
    },
  ]);
  const [itemDescriptionName, setItemDescriptionName] = useState();
  const [itemDescriptionBody, setItemDescriptionBody] = useState();

  const [selected, setSelected] = useState();

  // Set view components equal to a variable
  const type = (
      <div className='full-table' key={'type'}>
        <Type
            data={data}
            bindings={bindings}
            typeIsPending={typeIsPending}
            setCoordinates={setCoordinates}
            endpoint={layout.endpoint}
            setDataFromType={setDataFromType}
            selected={selected}
        ></Type>
      </div>
  );

  const schema = (
      <div className='view-full' key={'schema'}>
        <Schema
            bindings={bindings}
            data={data}
            setData={setData}
            setTypeIsPending={setTypeIsPending}
            endpoint={layout.endpoint}
            connections={connections}
            nodesIsPending={nodesIsPending}
            selected={selected}
            setSelected={setSelected}
        ></Schema>
      </div>
  );

  const focus = (
      <div className='full-table' key={'focus'}>
        <Focus
            dataFromType={dataFromType}
        ></Focus>
      </div>
  );

  const classHierarchy = (
      <div className='quadrant' key={'classHierarchy'}>
        <ClassHierarchy
            endpoint={layout.endpoint}
        ></ClassHierarchy>
      </div>
  );

  const statistics = (
      <div className='full-table' key={'statistics'}>
        <Statistics></Statistics>
      </div>
  );

  const search = (
      <div className='quadrant' key={'search'}>
        <Search
            bindings={bindings}
            setBindings={setBindings}
            endpoint={layout.endpoint}
            setConnections={setConnections}
        ></Search>
      </div>
  );

  const map = (
      <div className='view-full' key={'map'}>
        <LeafMap
            coordinates={coordinates}
            zoomLevel={layout.zoomLevel}
        ></LeafMap>
      </div>
  );

  const itemsInVideoList = (
      <div className="full-table" key={"itemsInVideoList"}>
        <ItemList
            itemData={itemInVideoData}
            setItemDescriptionName={setItemDescriptionName}
            setItemDescriptionBody={setItemDescriptionBody}
        ></ItemList>
      </div>
  );

  const itemInVideoDescription = (
      <div className="quadrant" key={"itemInVideoDescription"}>
        <ItemDescription
            itemName={itemDescriptionName}
            itemDescription={itemDescriptionBody}
        ></ItemDescription>
      </div>
  );

  const empty = <div className='quadrant' key={'empty'}></div>;

  // Array that holds view data to be mapped through for rendering
  const views = [
    {viewString: 'Type', viewComponent: type},
    {viewString: 'Schema', viewComponent: schema},
    {viewString: 'Focus', viewComponent: focus},
    {viewString: 'Class Hierarchy', viewComponent: classHierarchy},
    {viewString: 'Statistics', viewComponent: statistics},
    {viewString: 'Search', viewComponent: search},
    {viewString: 'Map', viewComponent: map},
    {viewString: 'Item List', viewComponent: itemsInVideoList},
    {viewString: 'Item Description', viewComponent: itemInVideoDescription},
    {viewString: 'Empty', viewComponent: empty},
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
        <QueryEndpoint
            setBindings={setBindings}
            endpoint={layout.endpoint}
            setConnections={setConnections}
            setNodesIsPending={setNodesIsPending}
        ></QueryEndpoint>
      </div>
  )
}

export default Layout