import React from 'react'
import InventoryData from './InventoryData'
import InventoryDelete from './InventoryDelete'

const InventoryUpdate = ({row}:any) => {
    const data = row.original
  return (
    <div className='flex gap-4'>
        <InventoryData title="Update Inventory" data={data} />
        <InventoryDelete data={data}/>
    </div>
  )
}

export default InventoryUpdate

