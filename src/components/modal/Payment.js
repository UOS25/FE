import React, {useRef, useState, useEffect} from 'react';
import './Payment.scss';
import axios from 'axios';
export default function Payment({ setPaymentModalOpen, selectedItem, setSelectedItem, setItems }){
    const paymentModalBackground = useRef();
    const receiptIdRef = useRef(null);
    const [MileageApplied, setMileageApplied] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [mileage, setMileage] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        console.log(selectedItem);
        let amount = 0;
        setItems(selectedItem);
        for (const item of selectedItem) {
            amount += item.price * item.ea;
        }
        setTotalAmount(amount);
    }, [selectedItem]);

    const handleMileageCheck = () => {
        // 마일리지 조회 로직
        setMileage(1234); // 예시로 임의 값 설정
    };

    const handleMileageApply = () => {
        if (!MileageApplied){
            if (selectedItem.length !== 0){
                setTotalAmount(totalAmount - mileage);
                setMileageApplied(true);
            }
            else {
                alert("선택된 물품이 없습니다.");
            }
        }
    }

    const onClickPayment = () => {
        if (selectedItem.length === 0){
            alert("선택된 물품이 없습니다.")
        }
        else { // 결제 로직 추가
            const itemInfos = selectedItem.map(item => ({
                ea: item.ea,
                barcode: item.barcode
            }));
            axios.post(`/purchase`, {
                shopId: 1, // 로컬 스토리지에 저장된 shopId
                employeeId: 1, // 로컬 스토리지에 저장된 employeeId
                customerId: 1, // 추후에 휴대폰 번호로 입력
                age: 20,
                gender: "여성",
                itemInfos: itemInfos
            })
            .then(
                (response) => {
                    console.log(response);
                    alert("결제되었습니다.");
                    setSelectedItem([]);  // selectedItem 초기화
                    setItems([]); // 필요시 setItems 호출
                    setPaymentModalOpen(false); // 모달 닫기
                    window.location.reload();
                }
            )
            .catch((error) => {
                alert(error);
            })
        }
    }

    const onClickModalClose = () => {
        setPaymentModalOpen(false);
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

    const activeEnter=(e) => {
        if(e.key === "Enter"){
            console.log("엔터키 입력, 값: "+receiptIdRef.current.value);
            // getReceiptInfo(receiptIdRef.current.value);
            receiptIdRef.current.value = '';
        }
    }
    if (selectedItem.length === 0){
        return (
            <div id="modal-container" ref={paymentModalBackground}>
                <div className='modal-body'>
                    <h2 className='payment-title'>🪙 결제</h2>
                    <h3 className='amount'>총 금액: 0원</h3>
                    
                    선택한 품목이 없습니다.
                    
                    <button className="close-button" onClick={onClickModalClose}>닫기</button>
                </div>
            </div>
        )
    }
    return (
        <div id="modal-container" ref={paymentModalBackground} className="modal-container">
            <div className='modal-body'>
                <div className='payment-header'>
                    <div className='payment-overview'>
                        <h1 className='payment-title'>🪙 결제</h1>
                        <p className='amount'>{totalAmount.toLocaleString()}원</p>
                    </div>
                    <div className='logo'>
                        <img src='./image/logo.jpg' alt='Logo'/>
                    </div>
                </div>
                <hr className='payment-hr'/>
                <div className='payment-content'>
                    <h3>Purchased Items</h3>
                    <div className="table-container">
                        <table className="purchased-items-table">
                        <thead>
                            <tr>
                            <th>순번</th>
                            <th>아이템 이름</th>
                            <th>개수</th>
                            <th>가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItem.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.productName}</td>
                                <td>{item.ea}</td> {/* Assuming quantity is always 1 as per original code */}
                                <td>{(item.price * item.ea).toLocaleString()}원</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <div className='mileage-check'>
                        <h3>Check Mileage</h3>
                        <input
                            type='text'
                            placeholder='Enter phone number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button className="mileage-check-btn" onClick={handleMileageCheck}>조회</button>
                        <button className="mileage-apply-btn" onClick={handleMileageApply}>적용</button>
                        {mileage !== null && <p>Mileage Points: {mileage}</p>}
                    </div>
                </div>
                <div className='payment-footer'>
                    <button onClick={onClickPayment} style={{ marginRight: '15px', backgroundColor: '#007bff'}}>
                        결제
                    </button>
                    <button onClick={onClickModalClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}