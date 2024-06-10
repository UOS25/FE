import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersDetail.scss';

export default function OrdersDetail({ order, closeModal }) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        axios.get(`/product/${order.productInfo.barcode}`)
            .then((response) => {
                setItem(response.data);
            });
    }, [order.productInfo.barcode]);

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const handleClickStore = (ordersId, ordersStatus) => {
        axios.patch(`/orders/delivery`, {
            ordersId: ordersId
        }).then((response) => {
            console.log(response);
            
            axios.patch(`/orders/check`, {
                ordersId: ordersId
            })
                .then(() => {
                    alert("입고 처리되었습니다.");
                    window.location.reload();
                })
                .catch((e) => {
                    alert(e.response.data.message);
                });
        })
    }

    const handleClickCancel = (ordersId, ordersStatus) => {
        if (ordersStatus !== "입고") {
            axios.post(`/returns/${ordersId}/cancel`)
                .then(() => {
                    alert("주문이 취소되었습니다.");
                    window.location.reload();
                })
                .catch((e) => {
                    console.log(e);
                    alert(e.response.data.message);
                });
        } else {
            alert("주문 상태가 아닙니다.");
        }
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={closeModal}>x</span>
                <h2>🔍 주문 상세 정보</h2>
                <div className='order-details'>
                    <p><strong>상품명:</strong> {order.productInfo.productName}</p>
                    <p><strong>단가:</strong> {item.orderPrice}</p>
                    <p><strong>주문 수량:</strong> {order.ordersEa} 개</p>
                    <p><strong>주문 날짜:</strong> {formatDateTime(order.createAt)}</p>
                    <p><strong>주문 상태:</strong> {order.ordersStatus}</p>
                </div>
                <button className='quantity-check-btn' onClick={() => handleClickStore(order.ordersId, order.ordersStatus)}>입고 처리</button>
                <button className='order-cancel-btn' onClick={() => handleClickCancel(order.ordersId, order.ordersStatus)}>주문 취소</button>
            </div>
        </div>
    );
}
