import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import '../assets/css/Orders.css';

export default function Orders(){
    // useEffect(() => {
    //     const 
    // })

    const headers = [
        {
            text: '번호',
            value: 'no'
        },
        {
            text: '상품명',
            value: 'productName'
        },
        {
            text: '단가',
            value: 'price'
        },
        {
            text: '수량',
            value: 'ea'
        },
        {
            text: '업체',
            value: 'enterprise'
        },
        {
            text: '주문 날짜',
            value: 'date'
        }
      ];
    
      const items = [
        {
            no: 1,
            productName: '요구르트',
            price: '1140',
            ea: 3,
            enterprise: '남양',
            date: "2024-05-25 14:13"
        }

       ];
    const headerKey = headers.map((header) => header.value);
    return (
        <div id = "orders-body">
            <Navbar/>
            <div className='container-home'>
                <div className='container-orders'>
                    <h2 className='order-title'>📦 주문 관리</h2>
                    <div className='container-filter'>
                        <input className='search' placeholder='검색어를 입력하세요.'/>
                        <button className='filter-btn'></button>
                    </div>
                    
                    <div className='order-table'>
                        <table>
                            <thead className='thead'>
                                {/* 테이블 헤드 */}
                                <tr className='table-tr'>
                                    {
                                        headers.map((header) => 
                                        <th className='table-header' key={header.text}>
                                            {header.text} {/* 컬럼명 바인딩 */}
                                        </th> 
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody className='order-tbody'>
                                {/* 테이블 데이터 */}
                                {
                                items.map((item, index) => (
                                    <tr className='table-row' key={index}>
                                    {/* headerKey를 순회하면서 key를 가져옴 */}
                                    { 
                                        headerKey.map((key) => 
                                        <td key={key + index}>
                                            {item[key]} {/* key로 객체의 값을 출력 */}
                                        </td>
                                        )
                                    }
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    )
}