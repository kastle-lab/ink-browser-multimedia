import React from 'react'
import SettingsMenu from './settings_menu/SettingsMenu';
import ViewsSelect from './ViewsSelect';
import Tooltip from '@mui/material/Tooltip';

function Topbar(layout) {

  return (
    <div className='topbar'>

      {/* Div for the left section of the top bar */}
      <div className="topbar-left">
        <Tooltip title="A user friendly tool that assists on educating a person that is interested in Knowledge Graph theory and applications." arrow>
        <h1 style={{ cursor: 'help' }}>Ink Browser</h1>
        </Tooltip>
        
      </div>

      {/* Div for the right section of the top bar */}
      <div className='topbar-right'>

        <ViewsSelect layout={layout} viewSelect={layout.viewSelect} />

        <SettingsMenu  zoomLevel={layout.zoomLevel} setZoomLevel={layout.setZoomLevel} endpoint={layout.endpoint} setEndpoint={layout.setEndpoint} theme={layout.theme} setTheme={layout.setTheme} viewSelect={layout.viewSelect} setViewSelect={layout.setViewSelect}/>
        
      </div>
    </div>
  )
}

export default Topbar