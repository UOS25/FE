import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DiscardManagement.scss';

const DiscardManagement = ({ discardModalOpen, setDiscardModalOpen }) => {
    const [discardedItems, setDiscardedItems] = useState([]);
    const [startDate, setStartDate] = useState('2024-06-01T00:00:00');
    const [endDate, setEndDate] = useState('2024-06-30T23:59:59');

    useEffect(() => {
        if (discardModalOpen) {
            axios.get(`/disposal/1?startDate=${startDate}&endDate=${endDate}`)
                .then(response => {
                    console.log(response);
                    setDiscardedItems(response.data);
                })
                .catch(error => {
                    console.error("폐기 정보를 불러오는데 실패했습니다.", error);
                });
        }
    }, [discardModalOpen]);
    const convertStartDateToISO = (date) => {
        // 입력된 날짜를 'YYYY-MM-DD' 형식으로 받음
        const inputDate = new Date(date);
        
        // 년, 월, 일을 추출
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const day = String(inputDate.getDate()).padStart(2, '0');
        
        // ISO 형식으로 변환, 시간 부분을 '23:59:59'로 설정
        const isoDate = `${year}-${month}-${day}T23:59:59`;
        
        return isoDate;
    };
    const convertEndDateToISO = (date) => {
        // 입력된 날짜를 'YYYY-MM-DD' 형식으로 받음
        const inputDate = new Date(date);
        
        // 년, 월, 일을 추출
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const day = String(inputDate.getDate()).padStart(2, '0');
        
        // ISO 형식으로 변환, 시간 부분을 '23:59:59'로 설정
        const isoDate = `${year}-${month}-${day}T23:59:59`;
        
        return isoDate;
    };

    const handleSearch = () => {
        const start = convertStartDateToISO(startDate);
        const end = convertEndDateToISO(endDate);

        console.log(start);
        console.log(end);
        axios.get(`/disposal/1`, {
            params: {
                startDate: start,
                endDate: end
            }
        })
            .then(response => {
                console.log(response.data);
                setDiscardedItems(response.data);
            })
            .catch(error => {
                console.error("폐기 정보를 불러오는데 실패했습니다.", error);
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close" onClick={() => setDiscardModalOpen(false)}>&times;</span>
                <h2>🗑️ 폐기 관리</h2>
                <div className="filter-container">
                    <label>시작 날짜:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label>끝 날짜:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
                <table className="discard-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>상품 이름</th>
                            <th>개수</th>
                            <th>폐기 날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discardedItems.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.productInfo.productName}</td>
                                <td>{item.ea}</td>
                                <td>{new Date(item.createAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DiscardManagement;
