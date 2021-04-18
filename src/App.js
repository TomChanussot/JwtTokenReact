import './App.css';
import React, {useState} from "react";
import AuthenticationService from "./services/AuthenticationService";
import {useForm} from "react-hook-form";

const App = () => {
    const [jwtAccessToken, setJwtAccessToken] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit } = useForm();

    const connection = (data) => {
        setInfoMessage('');
        setErrorMessage('');
        AuthenticationService.login(data.username, data.password)
            .then(responseJwtAccessToken => {
                setJwtAccessToken(responseJwtAccessToken);
                console.log(jwtAccessToken);
            })
            .catch(error => setErrorMessage(error.message));
    };

    const testToken = () => {
        setInfoMessage('');
        setErrorMessage('');
        AuthenticationService.testToken()
            .then(message => setInfoMessage(message))
            .catch(error => setErrorMessage(error.message));
    };

    return (
        <div className="App">
            <div className="loginPage">
                <form className="connectionForm" onSubmit={handleSubmit(connection)}>
                  <input type="text" placeholder="Username" {...register("username")}/>
                  <input type="password" placeholder="Password" {...register("password")}/>
                  <button type="submit" className="connectionButton">Connection</button>
                </form>
            <div className="jwtToken">
                Your JWT access token:
                <br/><br/>
                {jwtAccessToken ?
                <div>
                    <b>{jwtAccessToken}</b>
                    <div>
                        <button className="testTokenButton" onClick={testToken}>Test token</button>
                    </div>
                </div>
                : <span>No access token</span>
              }
            </div>
            {infoMessage &&
              <div className="infoMessage">
                {infoMessage}
              </div>
            }
            {errorMessage &&
              <div className="errorMessage">
                {errorMessage}
              </div>
            }
            </div>
        </div>
    );
};

export default App;
