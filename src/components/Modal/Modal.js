import React from 'react';
import "../../styles/css/Modal.css";

const Modal = ( props ) => {
    const { open, close, header} = props;

    // 하루 동안 보지 않기 눌렀을 때 누른 시간 로컬 저장소에 저장
    const changeHandler = (checked) => {
        if(checked){
            localStorage.setItem('todayClose', new Date());  //체크되었음
        }else {
            localStorage.removeItem('todayClose');  // 해제되었음
        }
    }

    return (
        <div className={ open ? "openModal modal" : "modal" }>
            { open ? (
                <section>
                    <header>
                        {header}
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        {/******* 오늘 하루 열지 않기 버튼 ***********/}
                        <div className="todayClose">
                            <input type="checkbox" onChange={(e) => changeHandler(e.target.checked)} id="tdChk"/>
                            <label for="tdChk">&#10004;</label>
                            <span> 오늘 하루 동안 보지 않기</span>
                        </div>
                        <button className="close" onClick={close}> close </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;