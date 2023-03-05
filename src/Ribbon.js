const Ribbon = ({ title ="populaire", position = "top-right", color = "blue" }) => {
    return (
        <div className="ribbon flex flex-col justify-center items-center">
            <p>⭐️</p>
            <p>{title}</p>
            <span className="square"></span>
            <span className="square2"></span>
        </div>
    )
}

export default Ribbon; 