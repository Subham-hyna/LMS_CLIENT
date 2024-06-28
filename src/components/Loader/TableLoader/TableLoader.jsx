import React from 'react'
import './TableLoader.css'

const TableLoader = ({column}) => {

    const col = [];

    for(let i = 0;i<column;i++){
        col.push("loaderCell");
    }

  return (
    <>
        <tr className='loaderRow'>
            {col.length > 0 && col.map((c,i)=>(
                <td key={i} className={"loaderCell"}></td>
            ))}
        </tr>
        <tr className='loaderRow'>
            {col.length > 0 && col.map((c,i)=>(
                <td key={i} className={"loaderCell"}></td>
            ))}
        </tr>
        <tr className='loaderRow'>
            {col.length > 0 && col.map((c,i)=>(
                <td key={i} className={"loaderCell"}></td>
            ))}
        </tr>
        <tr className='loaderRow'>
            {col.length > 0 && col.map((c,i)=>(
                <td key={i} className={"loaderCell"}></td>
            ))}
        </tr>
        <tr className='loaderRow'>
            {col.length > 0 && col.map((c,i)=>(
                <td key={i} className={"loaderCell"}></td>
            ))}
        </tr>
        <tr className='loaderRow'>
            {col.length > 0 && col.map((c,i)=>(
                <td key={i} className={"loaderCell"}></td>
            ))}
        </tr>
        <tr className='loaderRow'>
            {col.length > 0 && col.map((c,i)=>(
                <td key={i} className={"loaderCell"}></td>
            ))}
        </tr>

       
    </>
  )
}

export default TableLoader