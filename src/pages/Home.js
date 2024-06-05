import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import '../assets/css/App.css';
import Payback from '../components/modal/Payback.js';
import Payment from '../components/modal/Payment.js';

export default function Home() {

    const barCodeRef = useRef(null);
    const itemImgRef = useRef(null);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [paybackModalOpen, setPaybackModalOpen] = useState(false);
    const [PaymentModalOpen, setPaymentModalOpen] = useState(false);
    
    // 데이터 저장 함수
    const saveItemsToLocalStorage = (items) => {
        localStorage.setItem('items', JSON.stringify(items));
    };

    // 데이터 로드 함수
    const loadItemsFromLocalStorage = () => {
        const savedItems = localStorage.getItem('items');
        return savedItems ? JSON.parse(savedItems) : [];
    };


    useEffect(() => {
        const storedItems = loadItemsFromLocalStorage();
        setItems(storedItems);
    }, []);

    useEffect(() => {
        saveItemsToLocalStorage(items);
    }, [items]);

    const handleRegisterClick = () => {
        const barcodeValue = barCodeRef.current.value;
        console.log('Barcode Value:', barcodeValue);
    
        axios
          .get(`/product/${barcodeValue}`)  
          .then((response) => {
            console.log(response);
            setItems((prevItems) => {
                console.log(response.data.productId);
                const existingItemIndex = prevItems.findIndex((item) => item.productName === response.data.productName);
                itemImgRef.current.src = response.data.thumbnail;
                console.log(response.data);
    
                if (existingItemIndex !== -1) {
                    // 기존 아이템이 있으면 수량을 증가시킴
                    const updatedItems = prevItems.map((item, index) => 
                        index === existingItemIndex ? { ...item, ea: item.ea + 1 } : item
                    );
                    return updatedItems;
                } else {
                    // 새로운 아이템을 추가함
                    const maxNo = prevItems.length > 0 ? Math.max(...prevItems.map(item => item.no)) : 0;
                    const newItem = {
                        no: maxNo + 1,
                        productName: response.data.productName,
                        price: response.data.orderPrice,
                        ea: 1,
                        description: response.data.eventNames,
                        barcode: response.data.barcode
                    };
                    return [...prevItems, newItem];
                }
            });
            // 입력 필드 값 초기화
            barCodeRef.current.value = '';
          });
    };

    const handleResetClick = () => {
        setItems([]);
        itemImgRef.current.src = "";
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
                        <img ref={itemImgRef}></img>
                    </div>
                    <div className='wrapper-barcode'>
                        <div className='header-barcode'>바코드 입력</div>
                        <div className='wrapper-input'>
                            <input className='input-barcode' placeholder='🛒 바코드를 입력해주세요.' ref={barCodeRef} />
                        </div>
                    </div>
                    <button className='register-button' onClick={handleRegisterClick}>상품 등록</button>
                    <button className='rollback-button' onClick={handleResetClick}>입력 초기화</button>
                    <button className='payback-button' onClick={() => setPaybackModalOpen(true)}>구매 포기</button>
                    <button className='pay-button' onClick={() => setPaymentModalOpen(true)}>결제</button>
                </div>
            </div>
            { paybackModalOpen && 
                <Payback 
                paybackModalOpen = {paybackModalOpen}
                setPaybackModalOpen={setPaybackModalOpen} />
            }
            { PaymentModalOpen && 
                <Payment 
                setPaymentModalOpen={setPaymentModalOpen}
                selectedItem = {items}
                setSelectedItem={setSelectedItem}
                setItems = {setItems} />
            }
        </div>
    )
}