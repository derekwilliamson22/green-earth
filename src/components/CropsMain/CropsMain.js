import crops_sample from "../../crops_sample";

import React from 'react';

const CropsMain = () => {
    return (
        <div className="content">
            <ul>crops</ul>
            {crops_sample.map((crop)=>{
                return (
                    <li>{crop}</li>
                )
            })}
        </div>
    )
}

export default CropsMain
