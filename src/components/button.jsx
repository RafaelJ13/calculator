import '../css/button.css'

function Button({ buttonNum, GetNum  }) {

    const sendNumber = () => {
        const num = buttonNum;
        GetNum(num);
    };
    
    return (
        <>
            <button className="button" onClick={sendNumber}>{buttonNum}</button>
        </>
    )
}
export default Button;