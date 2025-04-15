import React from 'react'

function ItemDescription({ itemName, itemDescription }) {

    return (
        <>
            <div className='search-top'>
                <h2 className='left-search'>
                    {itemName ? itemName : "Item Description"}
                </h2>
            </div>

            <div className='description-bottom'>
                <p >{itemDescription}</p>
            </div>
        </>
    )
}

export default ItemDescription