import React from 'react';
import ShopLaptop from './../../assets/shopLaptop.jpg';
import ShopDesktop from './../../assets/shopDesktop.jpg';
import './styles.scss';

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div 
                className="item" style={{backgroundImage: `url(${ShopLaptop})`}}>
                    <a>
                        Shop Laptops
                    </a>
                </div>

                <div 
                className="item" style={{backgroundImage: `url(${ShopDesktop})`}}>
                    <a>
                        Shop Desktops
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Directory;