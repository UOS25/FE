import React, {useRef, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import '../assets/css/App.css';

export default function Home(selectable = false) {

    const barCodeRef = useRef(null);
    const [items, setItems] = useState([]);
    const handleRegisterClick = () => {
        const barcodeValue = barCodeRef.current.value;
        console.log('Barcode Value:', barcodeValue);
        axios
          .get(`https://dummyjson.com/products/${barcodeValue}`, {
            headers: {
            //   Authorization: `Bearer ${accessToken}`,
            },
          })    
          .then((response) => {
            console.log(response.data);
            // 이미 존재하는 아이템의 경우
            // items.forEach(item => {
            //     if (item.productName === response.data.brand){
            //         item.ea += 1
                    
            //     }
            // });
            if (items.filter((item) => item.productName === response.data.brand).length != 0){
                items.filter((item) => item.productName === response.data.brand)[0].ea += 1;
            }
            else{
                const newItem = {
                    no: response.data.id,
                    productName: response.data.brand,
                    price: response.data.price,
                    ea: 1,
                    describe: response.data.description

                }
            setItems((prevItems) => [...prevItems, newItem]);
            }
          });
    };

    const handleResetClick = () => {
        setItems([]);
    }
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

    const activeEnter=(e) => {
        if(e.key === "Enter"){
            console.log("엔터키 입력");
        }
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
                            <input className='input-barcode' placeholder='🛒 바코드를 입력해주세요.' ref={barCodeRef} />
                        </div>
                    </div>
                    <button className='register-button' onClick={handleRegisterClick}>상품 등록</button>
                    <button className='rollback-button' onClick={handleResetClick}>입력 초기화</button>
                    <button className='payback-button'>구매 포기</button>
                    <button className='pay-button'>결제</button>
                </div>
            </div>
        </div>
    )
}