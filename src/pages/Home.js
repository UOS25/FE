import React from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import '../assets/css/App.css';

export default function Home(selectable = false) {
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
            description: "이벤트 30% 할인"
        },
        {
            no: 2,
            productName: '꼬북칩 초코 츄러스 맛',
            price: '3720',
            ea: 1,
            description: ""
        },
        {
            no: 3,
            productName: '매운 새우깡',
            price: '1700',
            ea: 3,
            description: ""
        },
        {
            no: 4,
            productName: '초코 소라빵',
            price: '1200',
            ea: 12,
            description: ""
        },
       ];
    const headerKey = headers.map((header) => header.value);

    // 바코드로 상품 정보 불러오기
    const getItemInfo=() => {
        axios.get("url")
        .then(response => {
            console.log(response.data); // 데이터 로그 출력
        })
    }

    // 결제 창 띄우기
    const openCashModal=() => {
        //모달 창 띄우기
    }
    return (
        <div id='home_body'>
            <Navbar />
            <div className='container-home'>
                <div className='container-product-list'>
                    {/* 바코드 찍은 목록 */}
                    <div className='graph-product-list'>
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
                <div className='container-calculate'>
                    {/* 바코드 입력 & 품목 정보 */}
                    <div className='calculate-header'>선택한 품목</div>
                    <div className='wrapper-calculate-list'>

                    </div>
                    <div className='wrapper-barcode'>
                        <div className='header-barcode'>바코드 입력</div>
                        <div className='wrapper-input'>
                            <input className='input-barcode' placeholder='🛒 바코드를 입력해주세요.'></input>
                            <input type='button' className='input-button'></input>
                        </div>
                    </div>
                    <button className='rollback-button'>입력 초기화</button>
                    <button className='pay-button'>결제</button>
                </div>
            </div>
        </div>
    )
}