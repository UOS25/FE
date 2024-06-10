import React, { useEffect, useState, useRef } from 'react';
import axios, { Axios } from 'axios';
import './Disburse.scss';
import Navbar from '../components/common/Navbar';

const SubulManagement = () => {
    const [activeTab, setActiveTab] = useState('sales'); // 'sales' or 'funds'
    const [salesData, setSalesData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(null);

    const amountRef = useRef();
    useEffect(() => {
        const startDate = '2024-06-01T00:00:00';
        const endDate = '2024-06-30T23:59:59';
        const params = { startDate, endDate };
    
        axios.get('http://localhost:8080/statistics/1/sales', { params })
          .then((response) => {
            const data = response.data;
            console.log(data);
            // Process the data into a unified list
            const processedData = [];
            
            let id = 1;
            
            data.disbursements.forEach(item => {
              processedData.push({
                id: id++,
                type: item.disbursement.disburseType,
                amount: -item.disbursement.disburseAmount,
                date: item.disbursement.disburseDate
              });
            });
    
            data.orderses.forEach(item => {
              processedData.push({
                id: id++,
                type: '주문',
                amount: -item.price,
                date: item.orders.createAt
              });
            });
            console.log(data.receipts);
            data.receipts.forEach(item => {
              processedData.push({
                id: id++,
                type: '구매',
                amount: +item.price,
                date: item.receipt.purchaseDate
              });
            });
    
            data.returnses.forEach(item => {
              processedData.push({
                id: id++,
                type: '반품',
                amount: +item.price,
                date: item.returns.createAt
              });
            });
    
            setSalesData(processedData);
            console.log(processedData);
            setTotalAmount(data.totalPrice)
          })
          .catch((error) => {
            console.error('Error fetching sales data:', error);
          });
      }, []);

    function formatDate(inputDate) {
        const dateObject = new Date(inputDate);
    
        const year = dateObject.getFullYear().toString().substr(-2); // 연도에서 뒤의 두 자리만 가져옴
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // 월을 2자리로 표현하고, 필요하다면 앞에 0을 채움
        const day = dateObject.getDate().toString().padStart(2, "0"); // 일을 2자리로 표현하고, 필요하다면 앞에 0을 채움
    
        return `${year}-${month}-${day}`; // 원하는 형식으로 날짜를 조합하여 반환
    }
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleDisburseClick = (amount) => {
        if (totalAmount > 0){
            axios.post(`/disburse`, {
                shopId: 1,
                disburseAmount: amount,
                disburseType: "로열티",
                date: new Date()
            })
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert(error.data.message);
            })
        }
        else {
            alert("지불할 금액이 없습니다.")
        }
    }

    return (
        <div className="subul-management">
            <Navbar />
            <div className="subul-content">
                <div className="tabs">
                    <button className={`tab ${activeTab === 'sales' ? 'active' : ''}`} onClick={() => handleTabClick('sales')}>매출</button>
                    <button className={`tab ${activeTab === 'funds' ? 'active' : ''}`} onClick={() => handleTabClick('funds')}>자금 출납</button>
                </div>
                <div className={`tab-content ${activeTab}`}>
                    {activeTab === 'sales' && (
                        <div className="sales-table">
                            <h2>매출 데이터</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>유형</th>
                                        <th>날짜</th>
                                        <th>금액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesData.map((sale, index) => (
                                        <tr key={sale.id}>
                                            <td>{index + 1}</td>
                                            <td>{sale.type}</td>
                                            <td>{formatDate(sale.date)}</td>
                                            <td>{sale.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 'funds' && (
                        <div className="funds-management">
                            <h2>자금 출납</h2>
                            <h4>💸 직영점은 수익금의 30%를 출납합니다.</h4>
                            <form>
                                <label htmlFor="amount">금액:</label>
                                <input type="text" id="amount" name="amount" value={totalAmount*0.3} ref={amountRef}/>
                                <button type="submit" onClick={() => {handleDisburseClick(amountRef.current.value)}}>출납</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubulManagement;
