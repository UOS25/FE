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
            text: '추가 사항',
            value: 'description'
        }
      ];
    
      const items = [
        {
            no: 1,
            productName: '요구르트',
            price: '1140',
            ea: 3,
            enterprise: '남양',
            description: "이벤트 30% 할인"
        },
        {
            no: 2,
            productName: '꼬북칩 초코 츄러스 맛',
            price: '3720',
            ea: 1,
            enterprise: "농심",
            description: ""
        },
        {
            no: 3,
            productName: '매운 새우깡',
            price: '1700',
            ea: 3,
            enterprise: "농심",
            description: ""
        },
        {
            no: 4,
            productName: '초코 소라빵',
            price: '1200',
            ea: 12,
            enterprise: "삼립",
            description: ""
        },
       ];
    const headerKey = headers.map((header) => header.value);
    return (
        <div id = "orders-body">
            <Navbar/>
            <div className='container-home'>
                <div className='container-sales'>
                    <div className='content-sales' id='sales-status'>
                    {/* https://velog.io/@eunjin/React-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B7%B8%EB%9E%98%ED%94%84%EC%B0%A8%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%AA%A8%EC%9D%8C */}
                        <h3 className='title'>📦 주문 관리 <button type='filter-btn'>필터</button></h3>
                    </div>
                </div>
                <div className='container-product-list'>
                    <div className='order-product-list'>
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
                            <tbody>
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