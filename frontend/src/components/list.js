import React, {Component} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import AddData from '../components/add_data';
import FetchData from '../components/fetch_data';

class List extends Component {
    static contextType = ThemeContext;
    render() { 
        const {isLightTheme, light, dark} = this.context;
        const theme = isLightTheme ? light : dark;
        return (  
            <div className='list' style={{color:theme.syntax, background: theme.bg}}>
                <ul>
                    <li style={{background: theme.ui}}><AddData/></li>
                    <li style={{background: theme.ui}}><FetchData/></li>
                </ul>
            </div>
        );
    }
}
 
export default List;