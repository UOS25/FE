import React, {useRef, useState} from 'react';
import './Payback.scss'
import axios from 'axios';
export default function Payback({ paybackModalOpen, setPaybackModalOpen, receipt }){
    const paybackModalBackground = useRef();
    const [items, setItems] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const receiptIdRef = useRef(null);
    // receipt.items
    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemCancel = (index) => {
        setSelectedItems(prevItems => 
            prevItems.map((item, i) => i === index ? { ...item, status: 'Cancelled' } : item)
        );
    };

    const onClickModalClose = () => {
        setPaybackModalOpen(false);
    };

    const getReceiptInfo = (receiptId) => {
        axios.get(`/${receiptId}`, {

        }).then((response) => {
            const newReceiptInfo = {
                id: response.data.id,

            }
            setItems([newReceiptInfo])
        })
    }

    const addReceipt = () => {
        const receiptId = receiptIdRef.current.value;
        // Fetch receipt data based on receiptId
        // For this example, we'll use dummy data
        const newReceipt = {
            id: receipts.length + 1,
            customerName: '홍길동',
            purchaseDate: '2024-06-05',
            totalAmount: '₩100,000',
            purchaseStatus: '완료'
        };
        setReceipts([...receipts, newReceipt]);
        receiptIdRef.current.value = '';
    };

    const activeEnter=(e) => {
        if(e.key === "Enter"){
            console.log("엔터키 입력, 값: "+receiptIdRef.current.value);
            // getReceiptInfo(receiptIdRef.current.value);
            receiptIdRef.current.value = '';
        }
    }
    if (items.length === 0){
        return (
            <div id="modal-container" ref={paybackModalBackground}>
            <div className="modal-body">
                <h2 className="receipt-title">🧾 영수증 조회</h2>
                <input
                    className="receiptId-input"
                    placeholder="회원 번호를 입력해주세요."
                    ref={receiptIdRef}
                    onKeyDown={activeEnter}
                />
                <button className="search-button" onClick={addReceipt}>검색</button>
                <div className='receipt-list'>
                    <div className='receipt-header'>
                        <span>번호</span>
                        <span>고객 이름</span>
                        <span>구매 날짜</span>
                        <span>총 금액</span>
                        <span>구매 상태</span>
                    </div>
                    <div className='receipt-entries'>
                        {receipts.map(receipt => (
                            <div key={receipt.id} className='receipt-row'>
                                <span>{receipt.id}</span>
                                <span>{receipt.customerName}</span>
                                <span>{receipt.purchaseDate}</span>
                                <span>{receipt.totalAmount}</span>
                                <span>{receipt.purchaseStatus}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal-buttons">
                    <button className="close-button" onClick={onClickModalClose}>닫기</button>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div id="modal-container" className="modal-container">
            <div className='modal-body'>
                <div className='receipt-header'>
                    <div className='receipt-overview'>
                        <p className='receipt-title'>Receipt from (UOS25)</p>
                        <p className='amount'>50000원</p>
                        <p className='date'>Paid 2002.02.02</p>
                    </div>
                    <div className='logo'>
                        <img src='./image/logo.jpg' alt='Logo'/>
                    </div>
                </div>
                <hr className='receipt-hr'/>
                <div className='receipt-content'>
                    <h3>Purchased Items</h3>
                    <div className="table-container">
                        <table className="purchased-items-table">
                            <thead>
                                <tr>
                                    <th>순번</th>
                                    <th>아이템 이름</th>
                                    <th>개수</th>
                                    <th>금액</th>
                                    <th>구매 상태</th>
                                    <th>취소</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.ea}</td>
                                        <td>{(item.price * item.ea).toLocaleString()}원</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleItemCancel(index)}
                                                disabled={item.status === 'Cancelled'}
                                            >
                                                구매 포기
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='receipt-footer'>
                    <button style={{ marginRight: '20px' }} onClick={onClickModalClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}