import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchHeaderFinal: React.FC = () => {
    return (
        <section className="InputSearchFinal">
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Pesquisar" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            </div>
        </section>
    );
}

export default SearchHeaderFinal;
