import './Auth.css'
import Button from '../components/Button'
import Input from '../components/Input';


function Reg(){
    return (
        <div className='auth-page'>
            <div class="container">
                <div class="main">
                <div class="form-container">
                    <h1>Вход</h1>
                    <form>
                    <label>Firstname</label>
                    <Input type={"text"}/>
                    <label>Lastname</label>
                    <Input type={"text"}/>
                    <label>Username</label>
                    <Input type={"text"}/>
                    <label for="password">Пароль</label>
                    <Input type={"password"}/>

                    <Button value={"Зарегистрироваться"}/>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Reg;