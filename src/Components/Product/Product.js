import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Product extends Component {
    render() {
        return (
            <div className='product'>
                <img src={this.props.item.product_img} alt={this.props.item.product_name} />
                <section className='product-description'>
                    <div>
                        <p className='product-name'>{this.props.item.product_name} </p>
                        <p className='product-price'>${this.props.item.product_price} </p>
                    </div>
                    <div className='product-btns'>
                        <button onClick={() => this.props.deleteInventoryFn(this.props.item.id)}>Delete</button>
                        <Link to={`/edit/${this.props.item.id}`}><button onClick={() => this.props.getCurrentItemFn(this.props.item)}>Edit</button></Link>
                    </div>
                    
                </section>
            </div>
        )
    }
}

export default Product;