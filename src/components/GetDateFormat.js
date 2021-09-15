import React from "react";

function GetDateFormat (date) {

    const month= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const ymdDate = date.slice(0,10); // 날짜 데이터 형식에서 y, m, d 만 자르기
    const parsedDate = ymdDate.split('-'); // 자른 문자열에서 날짜 구성 숫자만 잘라서 배열에 담기

    const monthValue = Math.floor(Number(parsedDate[1]) - 1); // month 값을 string에서 int값으로 형변환
    const dayValue = Number(parsedDate[2]);
    const yearValue = Number(parsedDate[0]);

    return `${month[monthValue]} ${dayValue} ${yearValue}`;

}

export default GetDateFormat;