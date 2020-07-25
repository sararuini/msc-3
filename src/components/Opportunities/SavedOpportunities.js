import React from 'react';

import OpportunityItem from './OpportunityItem';
import { render } from 'node-sass';

const OpportunityPage = () => (
    <div>
      <Opportunities />
      
    </div>
  );


class SavedOpportunityList extends Component {
    constructor(props){
        super(props);

        this.state= {
            loading: false,
            savedOpportunities: [],
        }

        componentDidMount(){
            this.setState({loading: true});

            this.props.firebase.userCreatedOpps(this.props.authUser.uid).on('value', snapshot=> {
                const savedOpportunity = snapshot.val().savedOpportunity;
                const listSavedOpportunities = []
                if (savedOpportunity){
                    listSavedOpportunities.push(savedOpportunity);
                }
            })
        }
        render(){
         return(
            <div>

            </div>
        )
        }
        
    }
}
export default SavedOpportunities;
