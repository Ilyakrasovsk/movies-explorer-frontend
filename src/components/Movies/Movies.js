import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import Footer from "../Footer";
import Menu from "../Menu/Menu";

function Movies() {

    return(
        <>
        <MoviesHeader />
        <main>
            <Menu />
            <SearchForm />
            <MoviesCards/>
        </main>
            <Footer />
        </>
    )
}
export default Movies;
