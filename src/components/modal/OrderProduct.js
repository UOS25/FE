import React, {useRef, useState} from 'react';
import axios from 'axios';
import "./OrderProduct.scss";

export default function Payback({ OrderModalOpen, setOrderModalOpen, selectedRowData }){
    const OrderModalBackground = useRef();
    const [item, setItem] = useState(1);
    
    const addProduct = () => {
        setItem(item + 1);
    };

    const removeProduct = () => {
        item <= 0 ? setItem(0) : setItem(item - 1);
    };
    
    const orderRequest = () => {
        axios.post(`/orders`, {
            productId: selectedRowData.productId,
            shopId: 1, //
            productName: selectedRowData.productName,
            ea: item,
            totalPrice: item * selectedRowData.orderPrice
        }).then((response) => {
            console.log(response);
        })
    }

    const onClickModalClose = () => {
        setOrderModalOpen(false);
    };

    console.log("OrderModalOpen"+OrderModalOpen)
    return (
        <div id="modal-container" ref={OrderModalBackground}>
            <div className='modal-body'>
                <h2 className='order-title'>🛒 상품 주문</h2>
                <div className='order-header'>
                    <img className='product-img' src='https://jolvrebucket.s3.ap-northeast-3.amazonaws.com/news-p.v1.20230215.afda95a02eba46dfad899e7ee8d18950_P1.jpg'/>
                    <div className='product-info'>
                        <h3 className='product-name'>{selectedRowData.productName}</h3>
                        <div className='product-enterprise'>업체명: {selectedRowData.enterprise}</div>
                        <div className='product-price'>단가: {selectedRowData.orderPrice}</div>
                        <div className='product-price'>판매가: {selectedRowData.orderPrice}</div>
                        <div className='product-description'>{selectedRowData.description}</div>
                    </div>
                </div>
                
                <div className='order-content'>
                    <input type="number" value={item} />
                    <button onClick={addProduct}>+</button>
                    <button onClick={removeProduct}>-</button>
                </div>
                <button className='order-btn' onClick={orderRequest}>주문</button>
                <button className='close-btn' onClick={onClickModalClose}>닫기</button>
            </div>
        </div>
)
}