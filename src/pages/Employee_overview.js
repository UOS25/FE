import axios from "axios";
import { useEffect, useState } from "react";
const EmployeeOverview = ({ onRowClick }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      setUsers([
        {
          "employeeName": "김민서", 
          "position": "점원", 
          "registrationNumber": "991203-0000000",
          "salary": "100000",
          "partTime": "낮",
          "account": "302-4530-1234-11",
          "shopName": "전농점"
        }])
        // axios
        //   .get('/employee', {
        //   })    
        //   .then((response) => {
        //     console.log(response)
        //     setUsers(response.data);
        //   });
          
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
            <th>지점 이름</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="table-row" onClick={() => onRowClick(user) }>
              <td>{user.id}</td>
              <td>{user.employeeName}</td>
              <td>{user.position}</td>
              <td>{user.partTime}</td>
              <td>{user.shopName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default EmployeeOverview