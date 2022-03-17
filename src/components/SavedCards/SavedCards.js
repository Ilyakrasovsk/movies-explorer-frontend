import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCards() {

    return(
        <section className="cards">
            <div className="cards__container">
                <MoviesCard />
                <MoviesCard />
            </div>
        </section>
    )
}
export default MoviesCards;
