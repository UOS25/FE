import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function EventOverview({ onRowClick }) {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        axios.get(`event`)
        .then((response) => {
            console.log(response.data);
            setEvents(response.data);
        })
    })

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = String(date.getFullYear()).slice(2); // 마지막 두 자리를 사용
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return (
        <div>
            <h2>🎊 현재 진행중인 이벤트</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>카테고리</th>
                        <th>진행 기간</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={event.eventId} onClick={() => onRowClick(event)}>
                            <td>{index + 1}</td>
                            <td>{event.eventName}</td>
                            <td>{event.eventCategory}</td>
                            <td>{`${formatDate(event.startDate)} ~ ${formatDate(event.endDate)}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
