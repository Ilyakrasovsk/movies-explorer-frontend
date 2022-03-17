import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCards() {

    return(
        <section className="cards">
            <div className="cards__container">

                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />

            </div>
            <div className="cards__button-container">
                <button className="cards__more">
                    Ещё
                </button>
            </div>

        </section>
    )
}
export default MoviesCards;
