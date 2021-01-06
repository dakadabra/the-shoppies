import React, {useState} from 'react';

interface Props {
    setSearchText: SetSearchText;
}

export const SearchBar: React.FC<Props> = ({setSearchText}) => {

    const [text, setText] = useState('');

    return (
        <form>
        <input
            type="text"
            value={text}
            onChange={e => {
            setText(e.target.value);
            }}
        />
        <button
            type="submit"
            onClick={e => {
            e.preventDefault();
            setSearchText(text);
            setText('');
            }}
        >
            Enter
        </button>
        </form>
    );
};