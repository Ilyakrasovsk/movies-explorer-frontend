import find from '../../images/find.svg'
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
function SearchForm() {

    return(
        <section className="search">
            <div className="search__container">
                <form className="search__form">
                        <input className="search__input"
                               name="keyword"
                               type="text"
                               placeholder="Фильм"
                               minLength="1"
                               maxLength="200"
                               required
                               autoComplete="off" />
                        <button
                            className="search__button">
                            <img src={find} className="search__image" />
                        </button>
                </form>
                <ToggleSwitch />
            </div>
        </section>
)
}
export default SearchForm;
