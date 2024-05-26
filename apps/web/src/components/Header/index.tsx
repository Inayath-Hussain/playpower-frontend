import Search from "./Search";

import "./Header.scss";
import DatePicker from "./DatePicker";


const Header = () => {
    return (
        <header className="header_container">

            <Search />

            <DatePicker />

        </header>
    );
}

export default Header;