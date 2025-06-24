import './Button.css'



function Button(props) {
    console.log(props)
    return (
        <button className='btn' type="submit">
            {props.value}
        </button>
    )
}
export default Button;