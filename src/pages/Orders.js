import React from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import '../assets/css/Orders.css';

export default function Orders(){
    return (
        <div id = "orders-body">
            <Navbar/>
            <div className='container-orders'>
                <div className='orders-title'><h2>주문 관리</h2></div>
                <div className='orders-filter'><h3>주문 일자</h3></div>
            </div>

        </div>
    )
}