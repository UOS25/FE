import React from 'react';
import Navbar from '../components/common/Navbar';
import '../assets/css/App.css';

export default function Home() {
    return (
        <div id='home_body'>
            <Navbar />
            <div className='container-home'>
                <div className='container-product-list'></div>
                <div className='container-calculate'>
                    {/* 바코드 찍은 목록 */}
                    <div className='calculate-header'>선택한 품목</div>
                    <div className='wrapper-calculate-list'>

                    </div>
                    <div className='wrapper-barcode'>
                        <div className='header-barcode'>바코드 입력</div>
                        <input className='input-barcode' placeholder='🛒 바코드를 입력해주세요.'></input>
                    </div>
                </div>
            </div>
        </div>
    )
}