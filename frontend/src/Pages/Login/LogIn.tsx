import { useEffect, useState } from "react"
import InputLabel from "../../Components/InputLabel"
import type { TLogin } from "../../interfaces/APIResponses"
import { jwtDecode } from "jwt-decode"
import { Link, useNavigate, type NavigateFunction } from "react-router-dom"

export default function LogIn(){
    const form = {
        username: "",
        password: ""
    }
    const [formValues, setFormValues] = useState<typeof form>(form)

    const [_, setResponse] = useState<TLogin>({
        code: 0,
        message: ""
    })

    const navigate: NavigateFunction = useNavigate()
    
    const token = localStorage.getItem("token")
    
    useEffect(() => {
        token
        &&
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/id"].join(""), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        mail: (jwtDecode(token) as any).username
                    })
                })
        .then(res => {
            (res.status.toString().startsWith("2")) && navigate("/")
        })
        }
    , [])


    /**
     * Making a request to create a new user on the server
     * @param inputValues the values of the form
     */
    function handleLogIn(inputValues: typeof form){
        fetch([`${import.meta.env.VITE_APP_BACKEND_API_URL}`, "/api/login_check"].join(""), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: inputValues.username,
                password: inputValues.password
            })
        })
        .then(res => res.json())
        .then((res: TLogin) => {
            setResponse(res);
            if("token" in res){
                navigate("/")
                localStorage.setItem("token", res.token)
            }
        })
    }

    return <div className="login-page">
        <div className="wrapper">
            <h2>Log In</h2>
            <div className="inputs">
                <InputLabel
                label="Username"
                placeholder="Esteban945"
                type="text"
                inputValue={formValues.username}
                handleChange={(e) => setFormValues({...formValues, username: e.target.value})}
                />

                <InputLabel
                label="Password"
                placeholder="Enter your password"
                type="password"
                inputValue={formValues.password}
                handleChange={(e) => setFormValues({...formValues, password: e.target.value})}
                />
            
            </div>

            <Link to="/signup">Not yet an account ? Sign up</Link>

            <button onClick={() => handleLogIn(formValues)}>Log in</button>
        </div>
    </div>
}