import React from "react";
import Posting from "./Posting";

function UserCollect ({userCollect}) {

    if(userCollect.length !== 0){
        return(
            <div className={userCollect.length === 10 ? "myTasteBox postContainer more" : "myTasteBox postContainer"}>
                {
                    userCollect.map(uc => (
                        <Posting
                            key={uc._id}
                            id={uc._id}
                            avatar={uc.creator.avatar}
                            firstName={uc.creator.firstName}
                            lastName={uc.creator.lastName}
                            creatorUid={uc.creator.uid}
                            countFile={uc.countFile}
                            title={uc.title}
                            hash={uc.hash}
                            count_li={uc.count_li}
                            count_bo={uc.count_bo}
                            count_co={uc.count_co}
                            createdAt={uc.createdAt}>
                        </Posting>
                    )).slice(0,11)
                }
                <span className="morePost">&raquo;더 많은 게시물 보러가기&laquo;</span>
            </div>
        );
    }
    else {
        return (
            <div className="noneCollect">
                <span>아직 수집된 머글이 없어요 :)</span>
            </div>
        )
    }


}

export default UserCollect;
