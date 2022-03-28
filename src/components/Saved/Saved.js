import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SearchForm from "../SearchForm/SearchForm";
import SavedCards from "../SavedCards/SavedCards";
import Footer from "../Footer";
import Menu from "../Menu/Menu";

function Saved() {

    return(
        <>
        <MoviesHeader />
        <main>
            <Menu />
            <SearchForm />
            <SavedCards />
        </main>
            <Footer />
        </>
    )
}
export default Saved;
