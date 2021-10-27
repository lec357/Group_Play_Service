import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "../styles/css/Posting.css";
import TimeCalc from "./TimeCalc";
import qs from "qs";

// 아이콘 에셋 임포트
import collection from "../assets/collection.png";
import like from "../assets/like.png";
import comment from "../assets/comment.png";
import relaxing from "../assets/light.png";

function Posting (props) {

    const {id, avatar, firstName, lastName, creatorUid, countFile, thumbnail, title, hash, count_li, count_bo, count_co, createdAt} = props;


    /************** 해시태그 처리 *******************************/
        // 해시태그가 있는지 없는지 관리하기
        const [isHash, setIsHash] = useState(false);
        useEffect(()=>{
            if (hash.length > 0){
                setIsHash(true);
            }
        },[]);
        // 해시태그 5글자 이상은 자르고 ".."붙여주기
        const shortHash = hash.map(function (hs) {
            if (hs.length > 5) {
                return hs.slice(0, 5) + "..";
            }
            else return hs;
        });
        // 3번 째 이상의 해시태그들의 개수 구하기
        const overHash = shortHash.length - 3 ;

    /************** 게시물 날짜 처리 ***************************/
        // 게시물 몇일 전인지 날짜 계산하기
        const timeBefore = TimeCalc(createdAt)

    // post id 쿼리문으로
    const queryPostId = qs.stringify({ id: id}, { addQueryPrefix: true } );

    // user id 쿼리문으로
    const queryUserId = qs.stringify({ uid: creatorUid}, { addQueryPrefix: true } );




    return (

    /******** 포스트 박스 시작 *************/
            <section className="postBox">
                    <ul className="posting">
                        <Link  to={{
                            pathname: `/user${queryUserId}`,
                            state:
                                {
                                    creatorId: creatorUid,
                                }
                        }}>
                            <li className="userInfo">
                                <div className="profileBox"><img src={avatar !== undefined? avatar : relaxing} alt={creatorUid}/></div>
                                <span>{firstName} {lastName}</span>
                            </li>
                        </Link>
                        <Link
                            to={{
                                pathname: `/post${queryPostId}`,
                                state: {
                                    id,
                                }
                            }}
                        >
                            <li className={thumbnail !== undefined  ? "postImg": "postImg hidden"}>
                                <div className="contentsBox">
                                    <img src={thumbnail} alt={id} />
                                    <p className={(countFile === 1)?"hidden":""}>+{countFile-1}</p>
                                </div>
                            </li>
                            <li className="postContents"><span>{title}</span></li>
                            <li className={isHash?"postHashtags":"postHashtags hidden"}>
                                {/******* 해시태그 노출 내용은 최대 5글자, 개수는 최대 3개로 제한 ********/}
                                <ul>
                                    {shortHash.map((hashtags, index) => (
                                        <li key={index}>
                                            #{hashtags}
                                        </li>
                                    )).slice(0, 3)}
                                    <li className={overHash <= 0?"hidden":""}>+{overHash}</li>
                                </ul>
                            </li>
                            <li className="postFooter">
                                <div className="postLike">
                                    <ul>
                                        <li><div className="collection"><img src={collection} alt="collection"/></div>
                                            {count_li}</li>
                                        <li><div className="like"><img src={like} alt="like"/></div>
                                            {count_bo}</li>
                                        <li><div className="comment"><img src={comment} alt="comment"/></div>
                                            {count_co}</li>
                                    </ul>
                                </div>
                                <div className="postDate">
                                    <p>{timeBefore}</p>
                                </div>
                            </li>
                        </Link>
                        </ul>
            </section>
    /******** 포스트 박스 끝 *************/
    );
}

// 받아온 데이터들을 propTypes로 검사
Posting.propTypes = {
    avatar: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hash:PropTypes.arrayOf(PropTypes.string).isRequired,
    count_li: PropTypes.number.isRequired,
    count_bo: PropTypes.number.isRequired,
    count_co: PropTypes.number.isRequired
};

export default Posting;