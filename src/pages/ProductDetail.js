import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import '../assets/css/Orders.css';


export default function ProductDetail({  }){
    const location = useLocation();
    const { rowData } = location.state;
    console.log(rowData);
    if (!rowData) {
        return <div>No data available</div>;
    }
    return (
        <div id="product-detail-body">
            <Navbar />
            
        </div>
    );
}