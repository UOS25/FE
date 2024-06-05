import React, {useState} from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import EmployeeDetail from './Employee_detail';
import EmployeeOverview from './Employee_overview';
import '../assets/css/Employee.css';


export default function Employee(){

    const [activeIndex, setActiveIndex]=useState(0);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    };

    const handleRowClick = (employee) => {
        setSelectedRowData(employee);
        tabClickHandler(1); // Detail 탭으로 전환
    };

    const tabContArr=[
        {
            tabTitle:(
                <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}> Overview </li>
            ),
            tabCont:(
                <div> <EmployeeOverview onRowClick={handleRowClick} /> </div>
            )
        },
        {
            tabTitle:(
                <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}> Detail </li>
            ),
            tabCont:(
                <div> <EmployeeDetail employee={selectedRowData} /> </div>
            )
        }
    ];

    return(
        <div className='employee_wrapper'>
            <Navbar/>
            <div className='employee_container'>
                <div className='content_wrapper'>
                    <div className='content_container'>
                        <div className='content_header'>
                            <div className='tabs'>
                                <ul className="is-boxed">
                                    {tabContArr.map((section, index)=>{
                                        return section.tabTitle
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='content'>
                            {tabContArr[activeIndex].tabCont}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}