import React, {useState} from 'react';

interface Props {
    addNomination: AddNomination;
  }

export const AddNominationForm: React.FC<Props> = ({addNomination}) => {

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
            addNomination(text, 2020); //TODO:CHANGE THIS DEFAULT DATE
            setText('');
            }}
        >
            Enter
        </button>
        </form>
    );
};