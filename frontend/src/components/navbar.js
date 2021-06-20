import React, {Component} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class Navbar extends Component {
    static contextType = ThemeContext;
    render() { 
        const {isLightTheme, light, dark} = this.context;
        const theme = isLightTheme ? light : dark;

        return ( 
            <nav style = {{background: theme.ui,color: theme.syntax }}>
                <h1>Oracle</h1>
                <ul>
                    <li>View Stock & Get the Pricing</li>
                </ul>
            </nav>
         );
    }
}
 
export default Navbar;