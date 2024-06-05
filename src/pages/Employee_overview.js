import axios from "axios";
import { useEffect, useState } from "react";
const EmployeeOverview = ({ onRowClick }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios.get(`/employee`)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        alert(error);
      })         
      }, []);
    return (
        <div>
          <div className="employee-header">
            <h1>직원 정보</h1>
            <button className="employee-recruit-btn">New</button>
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
          {users.map(user => (
            <tr key={user.id} className="table-row" onClick={() => onRowClick(user) }>
              <td>{user.employeeId}</td>
              <td>{user.employeeName}</td>
              <td>{user.position}</td>
              <td>{user.partTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default EmployeeOverview