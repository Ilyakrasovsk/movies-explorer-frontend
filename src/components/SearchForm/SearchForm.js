import find from '../../images/find.svg'
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import React from "react";

function SearchForm(props) {

    return(
        <section className="search">
            <div className="search__container">
                <form className="search__form" onSubmit={props.onSearch}>
                  <div className="search__input-container">
                        <input className="search__input"
                               name="search"
                               type="text"
                               placeholder="Фильм"
                               minLength="1"
                               maxLength="200"
                               autoComplete="off"
                               required={props.searchQueryRequired}
                               defaultValue={props.searchState.query} />
                        <button
                            className="search__button" type="submit">
                            <img src={find} className="search__image" />
                        </button>
                  </div>
                  <ToggleSwitch isActive={props.searchState.short} handleChange={props.handleChange}/>
                </form>
            </div>
        </section>
)
}
export default SearchForm;
