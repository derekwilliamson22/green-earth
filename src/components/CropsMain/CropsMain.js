import crops_sample from "../../crops_sample";

import React from 'react';

const CropsMain = () => {

    const crops = crops_sample
    return (
        <div className="content">
            <ul>crops</ul>
            {crops.map((crop)=>{
                return (
                    <li>{crop}</li>
                )
            })}
        </div>
    )
}

export default CropsMain
