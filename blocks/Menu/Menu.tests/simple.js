import React from 'react';
import ReactDom from 'react-dom';
import Menu from 'b:Menu';
import MenuItem from 'b:Menu e:Item';

class App extends React.Component {
    render() {
        return (
            <div>
                <Menu value={2}>
                    <MenuItem value={1}>one</MenuItem>
                    <MenuItem value={2}>two</MenuItem>
                    <MenuItem value={3}>three</MenuItem>
                </Menu>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
