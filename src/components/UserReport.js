import React from "react";
import Posting from "./Posting";

function UserReport({userPost}) {

    return(
        <div className={userPost.length > 10 ? "myTasteBox postContainer more" : "myTasteBox postContainer"}>
            {
                userPost.map(ut => (
                    <Posting
                        key={ut._id}
                        id={ut._id}
                        avatar={ut.creator.avatar}
                        firstName={ut.creator.firstName}
                        lastName={ut.creator.lastName}
                        creatorUid={ut.creator.uid}
                        countFile={ut.countFile}
                        thumbnail={ut.thumbnail}
                        title={ut.title}
                        hash={ut.hash}
                        count_li={ut.count_li}
                        count_bo={ut.count_bo}
                        count_co={ut.count_co}
                        createdAt={ut.createdAt}>
                    </Posting>
                )).slice(0,11)
            }
            <span className="morePost"><a href="https://apps.apple.com/" target="_blank">&raquo;앱 설치하고 더 많은 게시물 보러가기&laquo;</a></span>
        </div>
    );

}

export default UserReport;