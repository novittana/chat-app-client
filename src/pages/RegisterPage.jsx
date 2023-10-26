import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {registerRoute} from "../utils/APIRoutes";

function RegisterPage() {
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate('/')
            console.log("Hello world")
        }
    }, [])

    const [values, setValue] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    const handleChange = (event) => {
        setValue({...values, [event.target.name]: event.target.value});
    }

    const validateForm = () => {
        const {username, email, password, confirmPassword} = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be the same", toastOptions);
            return false;
        };
        if (username.length<3){
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false;
        }
        if(password.length<8){
            toast.error(
                "Password should be equal or greater than 8 character", toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("email is required", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            const {username, email, password} = values;
            const {data} = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    }

    return (<>
        <StyledContainer>
            <RegisterForm onSubmit={handleSubmit}>
                <div className="brand">
                    <img src="" alt=""/>
                    <h1>Friends</h1>
                </div>
                <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                <input type="password" placeholder="Confirm your password" name="confirmPassword"
                       onChange={handleChange}/>
                <button type="submit">Sign up</button>
                <span>
                Already have an account? <Link to="/login">Login</Link>
            </span>
            </RegisterForm>

        </StyledContainer>
        <ToastContainer/>
    </>)


}

export default RegisterPage;

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #231f69;
  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  span {
    color: white;
    text-transform: uppercase;

    a {
      color: #070a79;
      text-transform: none;
      font-weight: bold;
      text-decoration: none;
    }

  }
`;



const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #5358b685;
  border-radius: 2rem;
  padding: 3rem 5rem;

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;

    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;

    &:hover {
      background-color: #4e0eff;
    }
  }
`