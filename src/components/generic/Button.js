const Button = ({ value, onClick, id }) => {
    return (
        <div id={id}>
            <button
                onClick={onClick}
            >
                {value}
            </button>
        </div>
    );
};

export default Button;
