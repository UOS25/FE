import axios from "axios";
import { useEffect, useState } from "react";
const EmployeeOverview = ({ onRowClick }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
          .get('https://dummyjson.com/users', {
            headers: {
            //   Authorization: `Bearer ${accessToken}`,
            },
          })    
          .then((response) => {
            console.log(response)
            setUsers(response.data.users);
          });
      }, []);
    return (
        <div>
      <h1>직원 정보</h1>
      <table>
        <thead>
          <tr className="table-tr">
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="table-row" onClick={() => onRowClick(user) }>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default EmployeeOverview