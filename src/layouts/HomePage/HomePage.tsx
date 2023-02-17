import ExproreTopMangas from "./components/ExproreTopMangas";
import Heros from "./components/Heros";
import LibraryServices from "./components/LibraryServices";
import Slider from "./components/Slider";

const HomePage = () => {
    return (
        <>
            <ExproreTopMangas />
            <Slider />
            <Heros />
            <LibraryServices />
        </>
    );
}

export default HomePage;