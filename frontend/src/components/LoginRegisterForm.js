function LoginRegisterForm({ name, title, buttonText, onSubmit, children }) {
    return (
        <div className="loginregister" tabIndex="0">
            <h2 className="loginregister__title">{title}</h2>

            <form name={name} className="loginregister__form" onSubmit={onSubmit}>

                {children}

                <button aria-label={buttonText} className="loginregister__submit" type="submit">
                    {buttonText}
                </button>
            </form>

        </div>

    );
}

export default LoginRegisterForm;