import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function EventDetail({ event }) {
    const [item, setItem] = useState([]);
    useEffect(() => {
        if (event){
            axios.get(`/product/${event.barcode}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, []);
    if (!event) {
        return <div>Please select an event.</div>;
    }

    
    
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = String(date.getFullYear()).slice(2); // 마지막 두 자리를 사용
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return (
        <div>
            <h2>🔍 이벤트 상세정보</h2>
            <p><strong>제목:</strong> {event.eventName}</p>
            <p><strong>진행 기간: </strong>{`${formatDate(event.startDate)} ~ ${formatDate(event.endDate)}`}</p>
            <p><strong>관련 품목: </strong>{item.productName}</p>
        </div>
    );
}
