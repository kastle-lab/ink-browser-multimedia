import React from 'react'
import Tooltip from '@mui/material/Tooltip';

function ItemDescription({ itemName, itemDescription }) {

    return (
        <>
            <div className='search-top'>
                <h2 className='left-search'>
                    {itemName ? itemName : <Tooltip title="Detailed of the Topics extracted from the frames available under open-kg-curriculum" arrow>Item Description</Tooltip>}
                </h2>
            </div>

            <div className='description-bottom'>
                <p >{itemDescription}</p>
            </div>
        </>
    )
}

export default ItemDescription