import React, {Component} from 'react';
import axios from 'axios';
import { Switch, Link } from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state= {
            name: '',
            price: null,
            imgUrl: '',
            id: null
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.resetState();
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.getItem();
        }
    }

    getItem = () => {
        if (this.props.match.params.id) {
            axios.get(`/api/inventory/${this.props.match.params.id}`)
                .then(res => {
                    this.setState({id: res.data.id, name: res.data.product_name, price: res.data.product_price, imgUrl: res.data.product_img});
                })
                .catch(err => console.log(err));
        }
    }

    updateName = (val) => {
        this.setState({name: val});
    }

    updatePrice = (val) => {
        this.setState({price: +val});
    }

    updateImg = (val) => {
        this.setState({imgUrl: val});
    }

    resetState = () => {
        this.setState({name: '', price: 0, imgUrl: '', id: null});
    }

    postInventory = () => {
        const newInventory = {
            name: this.state.name,
            price: this.state.price,
            imgUrl: this.state.imgUrl
        }

        axios.post('/api/inventory', newInventory)
            .then(res => {
                this.resetState();
            })
            .catch(err => console.log(err));
    }

    putInventory = () => {
        const id = this.state.id;
        const editedItem = {
            name: this.state.name,
            price: this.state.price,
            imgUrl: this.state.imgUrl
        }
        axios.put(`/api/inventory/${id}`, editedItem)
            .then(res => {
                this.resetState();
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Switch>
                <div className='product-form'>
                    <img className='img-preview' src={this.state.imgUrl} />
                    <p>Image URL: {this.props.match.params.id} </p>
                    <input value={this.state.imgUrl} onChange={e => this.updateImg(e.target.value)} />
                    <p>Product Name:</p>
                    <input value={this.state.name} onChange={e => this.updateName(e.target.value)} />
                    <p>Price:</p>
                    <input type='number' value={this.state.price} onChange={e => this.updatePrice(e.target.value)} />
                    <section className='form-btns'>
                        <button onClick={this.resetState} >Cancel</button>
                        {this.state.id !== null
                        ? (
                            <div>
                                <Link to='/'><button onClick={this.putInventory} >Save Changes</button></Link>
                            </div>
                        )
                        : ( 
                            <div>
                                <Link to='/'><button onClick={this.postInventory} >Add to Inventory</button></Link>
                            </div>   
                        )
                        }
                        
                    </section>
                </div>
            </Switch>            
        )
    }
}

export default Form;