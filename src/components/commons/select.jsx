import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
  // console.log('options', options);
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-group my-2">
        <select name={name} className="custom-select" id={name} {...rest}>
          {options.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default Select;
