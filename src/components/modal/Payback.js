import React, {useRef, useState, useEffect} from 'react';
import './Payback.scss'
import axios from 'axios';
export default function Payback({ paybackModalOpen, setPaybackModalOpen, receipt }){
    const paybackModalBackground = useRef();
    const [items, setItems] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const receiptIdRef = useRef(null);
    // receipt.items
    const [selectedItems, setSelectedItems] = useState([]);
    const [customerName, setCustomerName] = useState(null);
    const [totalPrices, setTotalPrices] = useState([]);
    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(null);
    const [receiptId, setReceiptId] = useState(null);

    const onClickReceiptDetail = (receipt, amount) => {
        console.log(receipt);
        console.log(receipt.itemInfos);
        setReceiptId(receipt.receiptId);
        setDate(formatDate(receipt.purchaseDate));
        setItems(receipt.itemInfos);
        setAmount(amount);
    }
    const handleReceiptCancel = (receiptId) => {
        console.log(receiptId);
        axios.post(`/purchase/${receiptId}/cancel`)
        .then((response) => {
            alert("처리되었습니다.");
            setItems([]);
            window.location.reload();
        })
        .catch((error) => {
            alert(error);
        })
    };

    const onClickModalClose = () => {
        setPaybackModalOpen(false);
    };

    const addReceipt = (phoneNumber) => {

        axios.get(`/receipt/phoneNumber/${phoneNumber}`)
        .then((response) => {
            setReceipts(response.data);
            console.log(response);

            // CustomerName
            axios.get(`/customer/${phoneNumber}`)
            .then((response) => {
                setCustomerName(response.data.nickname);
            })
            .catch((error) => {
                alert("고객 정보 불러오기 실패: "+error);
            });
        });

        receiptIdRef.current.value = '';
    };

    const fetchData = async (itemInfos) => {
        let totalPrice = 0;
    
        // 각 아이템에 대해 추가 요청을 보냅니다.
        for (const item of itemInfos) {
            try {
                // 각 상품의 정보를 가져옵니다.
                const productResponse = await axios.get(`/product/${item.barcode}`);
                const productData = productResponse.data;
    
                // 상품의 customerPrice를 이용하여 총 가격을 계산합니다.
                const itemTotalPrice = productData.customerPrice * item.ea;
                // 총 가격에 합산합니다.
                totalPrice += itemTotalPrice;
            } catch (error) {
                console.error(`Error fetching product with barcode ${item.barcode}:`, error);
            }
        }
    
        // 모든 요청이 완료된 후에 총 가격을 반환합니다.
        return totalPrice;
    };

    function formatDate(inputDate) {
        const dateObject = new Date(inputDate);
    
        const year = dateObject.getFullYear().toString().substr(-2); // 연도에서 뒤의 두 자리만 가져옴
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // 월을 2자리로 표현하고, 필요하다면 앞에 0을 채움
        const day = dateObject.getDate().toString().padStart(2, "0"); // 일을 2자리로 표현하고, 필요하다면 앞에 0을 채움
    
        return `${year}-${month}-${day}`; // 원하는 형식으로 날짜를 조합하여 반환
    }


    useEffect(() => {
        const fetchDataAndSetTotalPrices = async () => {
            const newTotalPrices = [];
            for (const receipt of receipts) {
                const totalPrice = await fetchData(receipt.itemInfos);
                newTotalPrices.push(totalPrice);
            }
            setTotalPrices(newTotalPrices);
        };
        fetchDataAndSetTotalPrices();
    }, [receipts]);

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
                <button className="search-button" onClick={() => addReceipt(receiptIdRef.current.value)}>검색</button>
                <div className='receipt-list'>
                    <div className='receipt-header'>
                        <span>번호</span>
                        <span>고객 이름</span>
                        <span>구매 날짜</span>
                        <span>총 금액</span>
                        <span>구매 상태</span>
                    </div>
                    <div className='receipt-entries'>
                        {receipts.map((receipt, index) => {
                            return (
                                <div key={receipt.id}>
                                    <div className='receipt-row' onClick={() => onClickReceiptDetail(receipt, totalPrices[index])}>
                                        <span>{receipt.receiptId}</span>
                                        <span>{customerName}</span>
                                        <span>{formatDate(receipt.purchaseDate)}</span>
                                        <span>{totalPrices[index]}</span>
                                        <span>{receipt.purchaseStatus}</span>
                                    </div>
                                </div>
                            );
                        })}
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
                        <p className='amount'>{amount}원</p>
                        <p className='date'>Paid {date}</p>
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
                                    <th>단가</th>
                                    <th>개수</th>
                                    <th>금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => {
                                console.log(item);
                                return(

                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.price.toLocaleString()}원</td>
                                        <td>{item.ea}</td>
                                        <td>{(item.price * item.ea).toLocaleString()}원</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='receipt-footer'>
                    <button onClick={() => handleReceiptCancel(receiptId)}>
                        구매 취소
                    </button>
                    <button onClick={onClickModalClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}