import React, { useEffect, useState } from 'react';
import './HQInfoModal.scss';
import axios from 'axios';

function HQInfoModal({ isOpen, onClose }) {
  const [hqEmp, setHqEmp] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("본사 정보");
    axios.get(`/headquarter`)
      .then((response) => {
        console.log(response.data);
        setHqEmp(response.data[0]);
        setLoading(false);
        console.log(hqEmp);
      })
      .catch((error) => {
        console.error('Error fetching HQ info:', error);
        setLoading(false);
      });
  }, []);

  if (!isOpen) return null;

  return (
    <div className="hqinfo-modal">
      <div className="hqinfo-modal-content">
        <span className="hqinfo-modal-close" onClick={onClose}>&times;</span>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="hqinfo-table">
            <h2>🧑‍🏭 본사 직원 정보</h2>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{hqEmp.headquarterEmployeeName}</td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>{hqEmp.headquarterEmployeePhoneNumber}</td>
              </tr>

            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default HQInfoModal;
