import React  from 'react';

const isLike = (isLiked) => {
    const iconElement =  'fa fa-heart'
    return isLiked === true ? iconElement : iconElement + '-o';
}

const Like = props => {
    return ( 
        <i 
            className={isLike(props.likeData)} style={{ cursor: 'pointer' }}
            onClick={props.onClick}
            aria-hidden="true">
        </i>
    );
}
 
export default Like;
