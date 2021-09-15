import React from "react";
import share from "../assets/Icon ionic-ios-share-alt.png";

const Clipboard  = (props) => {
    const {copiedText, copyImage} = props;


    const copyText = text => {
        if (!document.queryCommandSupported("copy")) {
            return alert("복사하기가 지원되지 않는 브라우저입니다. :(");
        }

        const textarea = document.createElement("textarea");
        textarea.value = text;

        document.body.appendChild(textarea);
        // focus() -> 사파리 브라우저 서포팅
        textarea.focus();
        // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);
        alert("클립보드에 복사되었습니다. :)");
    };

    if( copyImage === 'clipboard'){
        return (
            <button onClick={() => copyText(copiedText)}><i className="fas fa-clipboard"></i></button>
        );
    }
    else if(copyImage === 'share'){
        return (
            <button onClick={() => copyText(copiedText)}><img className="share" src={share} alt="share"/></button>
        );
    }
}

export default Clipboard;