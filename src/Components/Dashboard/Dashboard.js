import React, {Component} from 'react';
import Product from '../Product/Product';
import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            currentItem: {}
        }
    }

    componentDidMount() {
        this.getInventory();
    }

    storeProduct = (itemToEdit) => {
        this.setState({currentItem: itemToEdit})
    }

    getInventory = () => {
        axios.get('/api/inventory')
            .then(res => {
            this.setState({items: res.data});
            })
            .catch(err => console.log(err));
    }

    deleteInventory = (id) => {
        axios.delete(`/api/inventory/${id}`)
            .then(res => {
                this.getInventory();
            })
            .catch(err => console.log(err));
    }

    getCurrentItem = (itemToUpdate) => {
        this.storeProduct(itemToUpdate);
    }

    render() {
        const products = this.state.items.map((item, index) => (
            <Product key={index} item={item} deleteInventoryFn={this.deleteInventory} getCurrentItemFn={this.getCurrentItem} />
        ));
        return (
            <div className='product-window'>
                {products}
            </div>
        )
    }
}

export default Dashboard;