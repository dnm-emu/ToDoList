import './Auth.css'
import Button from '../components/Button'
import Input from '../components/Input';


function Auth(){
    return (
        <div className='auth-page'>
            <div class="container">
                <div class="main">
                <div class="form-container">
                    <h1>Вход</h1>
                    <form>
                    <label for="email">Username</label>
                    <Input type={"text"}/>

                    <label for="password">Пароль</label>
                    <Input type={"password"}/>

                    <Button value={"Войти"}/>

                    <p class="switch">Нет аккаунта? <a href="/reg">Зарегистрироваться</a></p>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Auth;