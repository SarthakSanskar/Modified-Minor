import React from 'react';
import{Link} from 'react-router-dom';

const ProductListItems = ({product}) => {
    const{price,category, subs, shipping , color, brand , quantity , sold, address, landmark, city} = product;
    return (
        <ul className = 'list-group'>
            <li className = 'list-group-item'>
                Price {" "}<span className='label label-default label-pill pull-xs-right'>${price}</span>
            </li>
            <li className = 'list-group-item'>
                Address {" "}<span className='label label-default label-pill pull-xs-right'>{address}</span>
            </li>

            <li className = 'list-group-item'>
                Landmark {" "}<span className='label label-default label-pill pull-xs-right'>{landmark}</span>
            </li>

            <li className = 'list-group-item'>
                City {" "}<span className='label label-default label-pill pull-xs-right'>{city}</span>
            </li>

            { category && 
            (<li className = 'list-group-item'>
                Category {" "} <Link to = {`/category/${category.slug}`}className='label label-default label-pill pull-xs-right'>{category.name}</Link>
            </li>)}

            { subs && (<li className = 'list-group-item'> 
                Sub Categories {subs.map((s) => <Link  key = {s._id} to ={`/sub/${s.slug}`} className='label label-default label-pill pull-xs-right'>{s.name}</Link>)} 
            </li>)}

            {/* <li className = 'list-group-item'>
                Shipping {" "} <span className='label label-default label-pill pull-xs-right'>{shipping}</span>
            </li> */}

            {/* <li className = 'list-group-item'>
                Color <span className='label label-default label-pill pull-xs-right'>{color}</span>
            </li> */}

            {/* <li className = 'list-group-item'>
                Brand {" "} <span className='label label-default label-pill pull-xs-right'>{brand}</span>
            </li> */}

        </ul>
    );
};

export default ProductListItems;