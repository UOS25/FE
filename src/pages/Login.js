import "../assets/css/Login.css";
import "./Login.scss";

export default function Login(){
  return (
    <div className="container_login">
      <div className="background_image">
        <div className="wrapper_login">
          <form action="#" className="login_form">
            <h1>Hello, UOS25</h1>
            <span>or use your account</span>
            <input type="text" placeholder="Id" />
            <input type="password" placeholder="Password" />
            <a href="/find_password">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}