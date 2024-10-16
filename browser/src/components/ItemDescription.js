import React from 'react'

function ItemDescription({ itemName, itemDescription }) {

    return (
        <>
            <div className='description-top'>
                <h2 className='left-search'>
                    {itemName}
                </h2>
            </div>

            <div className='description-bottom'>
                <h3>{itemDescription}</h3>
            </div>
        </>
    )
}

export default ItemDescription