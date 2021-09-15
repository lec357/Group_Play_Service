import React from "react";
import VideoJS from "./VideoJS";


function ShowContents ({contents}) {

    if(contents.includes('.MOV') || contents.includes('.MP4')){   // video

        const videoJsOptions = { // video player options
            autoplay: false,
            controls: true,
            muted: true,
            sources: [{
                src: contents,
                type: "video/mp4"
            }]
        }

        return(

            <VideoJS options={videoJsOptions}/>

        );
    }else{   // img
        return(
            <img src={contents} alt={contents}/>
        );
    }
}

export default ShowContents;