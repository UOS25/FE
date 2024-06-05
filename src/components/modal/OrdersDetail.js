import React from 'react';
import './OrdersDetail.scss';

export default function OrdersDetail({ order, closeModal }) {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <h2>🔍 주문 상세 정보</h2>
                <div className='order-details'>
                    <p><strong>상품명:</strong> {order.productName}</p>
                    <p><strong>단가:</strong> {order.price}</p>
                    <p><strong>주문 수량:</strong> {order.ea}</p>
                    <p><strong>주문 날짜:</strong> {order.date}</p>
                    <p><strong>주문 상태:</strong> {order.status}</p>
                </div>
                <button className='quantity-check-btn'>입고 처리</button>
                <button className='close-btn' onClick={closeModal}>닫기</button>
            </div>
        </div>
    );
}
