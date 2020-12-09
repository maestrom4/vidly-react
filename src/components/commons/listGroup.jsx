import React from 'react';

const listGroup = (props) => {
  const { items, textProperty, valueProperty } = props;
  //   const classes =
  // console.log('listGroup items', items);
  return (
    <ul className="list-group">
      {items.data.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            items.selected._id === item[valueProperty]
              ? 'list-group-item active-selected'
              : 'list-group-item'
          }
          onClick={() => props.onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

listGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default listGroup;
