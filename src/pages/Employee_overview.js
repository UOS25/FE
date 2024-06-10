import axios from "axios";
import { useEffect, useState } from "react";
import Recruitment from "../components/modal/Recruitment";

const EmployeeOverview = ({ onRowClick }) => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
      axios.get(`/employee/search-shop/1`)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        alert(error);
      })         
      }, []);

    const handleRecruitBtnClick = () => {
      setIsModalOpen(true);
    };
    return (
        <div>
          <div className="employee-header">
            <h1>👨‍🏭 직원 정보</h1>
            <button className="employee-recruit-btn" onClick={handleRecruitBtnClick}>New</button>
          </div>
      <table>
        <thead>
          <tr className="table-tr">
            <th>번호</th>
            <th>이름</th>
            <th>직급</th>
            <th>업무 시간</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="table-row" onClick={() => onRowClick(user) }>
              <td>{index + 1  }</td>
              <td>{user.employeeName}</td>
              <td>{user.position}</td>
              <td>{user.partTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <Recruitment setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>}
    </div>
    )
}

export default EmployeeOverview