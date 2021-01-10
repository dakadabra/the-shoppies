import React, {useState} from 'react';

/*
Search bar inspired by https://www.w3schools.com/howto/howto_css_searchbar.asp
*/

interface Props {
    setSearchText: SetSearchText;
}

export const SearchBar: React.FC<Props> = ({setSearchText}) => {

    const [text, setText] = useState('');

    return (
        <div className="topnav">
          <a href="#contact">
            <div className="search-container">
                <form action="/action_page.php">
                <input type="text" placeholder="Search.." name="search" value={text} 
                    onChange={e => {
                    setText(e.target.value);
                    }}/>
                    <button type="submit" onClick={e => {
                    e.preventDefault();
                    setSearchText(text);
                    setText('');
                    }}><i className="fa fa-search"></i></button>
                </form>
                </div>
            </a>
        </div>
    );
};