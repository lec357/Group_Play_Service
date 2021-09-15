import React, { useState } from 'react';
import Modal from "./Modal";
import Clipboard from "../Clipboard";

const info = {
    compAddr : "서울특별시 성북구 한성대입구역(머글)",
    compEmail : "help@muggl.cc",
    compNum : "",
    comRegNum: "",
    copyright: "© Muggl Inc.",
}

const ModalContact = () => {
    const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    return (
        <div>
            <button onClick={ openModal } id="modalContactBtn">
                Contact
            </button>
            <Modal open={ modalOpen } close={ closeModal } header="Contact Mail">
                <span>
                    {info.compEmail}<Clipboard copiedText={info.compEmail} copyImage="clipboard"/>
                </span>
                <p>문의 사항 또는 건의 내용은 위 메일로 부탁드립니다.</p>
            </Modal>
        </div>
    )
}

export default ModalContact;