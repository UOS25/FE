import React, { useState } from 'react';
import './CustomerRegistrationModal.scss';
import axios from 'axios';

function CustomerRegistrationModal({ customerModalOpen, setCustomerModalOpen }) {
  const [phoneNumber, setPhone] = useState('');
  const [nickname, setNickname] = useState('');

  const handleRegister = () => {
    const customerData = { phoneNumber, nickname };

    axios.post('/customer', customerData)
      .then((response) => {
        console.log('Customer registered:', response.data);
        setCustomerModalOpen(false); // 성공 시 모달 닫기
      })
      .then((response) => {
        alert("고객 등록에 성공하였습니다.");
      })
      .catch((error) => {
        console.error('Error registering customer:', error);
      });
  };

  if (!customerModalOpen) return null;

  return (
    <div className="customer-modal">
      <div className="customer-modal-content">
        <span className="customer-modal-close" onClick={() => setCustomerModalOpen(false)}>&times;</span>
        <h2>고객 등록</h2>
        <div className="form-group">
          <label>전화번호:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호 입력"
          />
        </div>
        <div className="form-group">
          <label>닉네임:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 입력"
          />
        </div>
        <button onClick={handleRegister}>등록</button>
      </div>
    </div>
  );
}

export default CustomerRegistrationModal;
