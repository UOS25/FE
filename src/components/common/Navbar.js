import React, { useEffect } from 'react';
import axios from 'axios';

function Navbar() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     axios.get("https://dummyjson.com/products")
  //     .then((response) => response.json())
  //     .then(({products}) => {
  //       setProducts(products);
  //       setLoading(false);
  //     });
  //   });
  // }, []);
  function searchItem(event){
    console.log("searchItem");
  }
  return (
    <header>
      <nav id="sidebarMenu" className="sidebar">
        <ul>
          <li><a href="/home">🏠 홈</a></li>
          <li><a href="/orders">📦 주문 관리</a></li>
          <li><a href="/">📄 영수증 조회</a></li>
          <li><a href="/">💸 수불 관리</a></li>
          <li><a href="/sales">📊 매출 통계</a></li>
          <li><a href="/employee">👨 직원 관리</a></li>
        </ul>
      </nav>
      <nav id="main-navbar" className="navbar">
        <div className="container-left">
            <a className="navbar-brand" href="/">
                <img className="navbar-logo" src="image/logo.jpg" height="75" alt="" loading="lazy"/>
                <p className="navbar-name">UOS25 편의점</p>
            </a>
            <form className="input-form" onSubmit={searchItem()}>
                <input autoComplete="off" type="search" className="form-control"
                    placeholder='Search (ctrl + "/" to focus)'/>
                <span className="input-icon"><i className="fas fa-search"></i></span>
            </form>
            <div className="container-login"></div>

        </div>
        <div className="container-right">
            <div className="alarm">♨</div>
            <div className="message">◎</div>
            <div className="indiv-info"><a href="/Login">Admin</a></div>


        </div>
      </nav>
  </header>

  );
}

export default Navbar;
