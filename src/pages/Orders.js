import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import OrdersDetail from '../components/modal/OrdersDetail.js';
import '../assets/css/Orders.css';

export default function Orders() {
    const [orderList, setOrderList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    const getOrderList = () => {
        axios.get(`/orders`).then((response) => {
            console.log(response);
            setOrderList(response.data);
            // setOrderList(
            //     [{
            //         "no": 1,
            //         "productName": "츄러스",
            //         "price": "10000",
            //         "ea": 1,
            //         "date": "2024-06-02",
            //         "status": "주문 완료"
            //     }]
            // )
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getOrderList();
    }, []);

    const headers = [
        { text: '번호', value: 'no' },
        { text: '상품명', value: 'productName' },
        { text: '주문 수량', value: 'price' },
        { text: '입고 수량', value: 'ea' },
        { text: '주문 날짜', value: 'date' },
        { text: '주문 상태', value: 'status' }
    ];

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    const headerKey = headers.map((header) => header.value);

    return (
        <div id="orders-body">
            <Navbar />
            <div className='container-home'>
                <div className='container-orders'>
                    <h2 className='order-title'>📦 주문 관리</h2>
                    <div className='container-filter'>
                        <input className='search' placeholder='검색어를 입력하세요.' />
                        <button className='filter-btn'></button>
                    </div>

                    <div className='order-table'>
                        <table>
                            <thead className='thead'>
                                <tr className='table-tr'>
                                    {headers.map((header) =>
                                        <th className='table-header' key={header.text}>
                                            {header.text}
                                        </th>
                                    )}
                                    <th className='table-header'>상세</th>
                                </tr>
                            </thead>
                            <tbody className='order-tbody'>
                            {orderList.map((item, index) => (
                                <tr className='table-row' key={index} onClick={() => openModal(item)}>
                                    <td>{index + 1}</td>
                                    <td>{item.productInfo.productName}</td>
                                    <td>{item.ordersEa}</td>
                                    <td>{item.givenEa}</td>
                                    <td>{formatDateTime(item.createAt)}</td>
                                    <td>{item.ordersStatus}</td>
                                    <td>
                                        <button className='detail-button'>
                                            🔍
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && selectedOrder && (
                <OrdersDetail order={selectedOrder} closeModal={closeModal} />
            )}
        </div>
    );
}
