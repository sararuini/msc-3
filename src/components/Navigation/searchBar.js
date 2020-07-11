import React from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';


class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state= {
            filtered: [],
        }
    }
    componentDidMount() {
        this.setState({
          filtered: this.props.items
        });
      }

      componentWillReceiveProps(nextProps) {
        this.setState({
          filtered: nextProps.items
        });
      }

    render(){
        return(
            <div>
                
                    <input type="text" name="search" placeholder="Use keywords to search for opportunities or connections"></input>
                    <ul>
                </ul>
                
            </div>
            
        )
    }
    
}


export default withFirebase(SearchBar)