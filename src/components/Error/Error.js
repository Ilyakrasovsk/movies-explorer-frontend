import './Error.css';
function Error() {

    return(
        <section className="error">
            <div className="error__text-container">
                <h3 className="error__title">404</h3>
                <p className="error__text">Страница не найдена</p>
            </div>
            <a href={'/'} className="error__link">Назад</a>

        </section>
    )
}
export default Error;
