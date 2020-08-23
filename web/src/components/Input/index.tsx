import React, { InputHTMLAttributes } from 'react';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
};

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={ name }>{ label }</label>
            <input id={ name } { ...rest }/>
        </div>
    );
}

export default Input;