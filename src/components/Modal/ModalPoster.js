import React, { useState, useEffect } from 'react';
import Modal from "./Modal";
import poster from "../../assets/poster.png";


const ModalPoster = () => {
    const [ modalOpen, setModalOpen ] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        const todayClose = localStorage.getItem('todayClose');

        const parsedTodayClose = Date.parse(todayClose); // 누른 시간 데이터 parsing
        const expired = parsedTodayClose + 1000 * 60 * 60 * 24; // 24시간 (=하루)

        const currentTime = Math.floor(new Date().getTime());

        // 로컬 저장소에 아무 정보가 없으면 모달오픈 True
        if (Number.isNaN(parsedTodayClose)) {
            setModalOpen(true);
        }

        // 제한 시간이 지나면 모달오픈 True
        if (expired < currentTime) {
            setModalOpen(true);
        }
    }, []);

    return (
        <div>
            <Modal open={ modalOpen } close={ closeModal } header="" >
                <img className="poster" src={poster} alt="poster"/>
            </Modal>
        </div>
    )
}

export default ModalPoster;