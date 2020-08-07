import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className='header'>
                <h1>SHELFIE</h1>
                <nav className='nav-bar'>
                    <Link to='/'><button>Dashboard</button></Link>
                    <Link to='/add'><button>Add Inventory</button></Link>
                </nav>
            </div>
        )
    }
}

export default Header;