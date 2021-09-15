import React  from "react";
import "../styles/css/GetLink.css";

function GetLink ({dataLink}) {

    const linkArr = dataLink.split('\n');

    const realLink = linkArr.filter(function (la)
    {
        return la.includes('http');
    });

    const metaData = linkArr.filter(function (la)
    {
        return !la.includes('http');
    });


    if(dataLink !== ''){
        return(
            <div className="linkBox">
                <a href={realLink} target="_blank">
                    {metaData.map((md) => (
                        <p key={md}>{md}</p>
                    ))}
                </a>
            </div>
        );
    }
    else return null;
}

export default GetLink;