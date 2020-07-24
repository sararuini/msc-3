import React, { Component } from "react";

class OpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTitle: this.props.opportunity.title,
      editDescription: this.props.opportunity.description,
      editLocation: this.props.opportunity.location,
      editJobType: this.props.opportunity.jobType,
      editSalary: this.props.opportunity.salary,
      editJobTags: this.props.opportunity.jobTags,
      editStartingDate: this.props.opportunity.startingDate,
      editContact: this.props.opportunity.contact,
      loading: false,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editTitle: this.props.opportunity.title,
      editDescription: this.props.opportunity.description,
      editLocation: this.props.opportunity.location,
      editJobType: this.props.opportunity.jobType,
      editSalary: this.props.opportunity.salary,
      editJobTags: this.props.opportunity.jobTags,
      editStartingDate: this.props.opportunity.startingDate,
      editContact: this.props.opportunity.contact,
    }));
  };

  onChangeEdit = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveEdit = () => {
    this.props.onEditOpportunity(this.props.opportunity, this.state.editTitle);
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editDescription
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editLocation
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editJobTags
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editJobType
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editContact
    );
    this.props.onEditOpportunity(
      this.props.opportunity,
      this.state.editStartingDate
    );
    this.props.onEditOpportunity(this.props.opportunity, this.state.editSalary);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, opportunity, onRemoveOpportunity } = this.props;
    const {
      editMode,
      editTitle,
      editDescription,
      editLocation,
      editJobType,
      editSalary,
      editJobTags,
      editStartingDate,
      editContact,
    } = this.state;

    return (
      <li>
        {editMode ? (
          <div>
            <form>
              <input
                type="text"
                value={editTitle}
                name="editTitle"
                placeholder="Opportunity title"
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                placeholder="Opportunity description"
                name="editDescription"
                value={editDescription}
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editLocation"
                value={editLocation}
                placeholder="Location"
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editJobType"
                placeholder="Job Type e.g.(Full-time, Part-time, Commission, Freelancer, One-Off...)"
                value={editJobType}
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editJobTags"
                placeholder="Job Tags e.g.(Music Publishing, London, etc.)"
                value={editJobTags}
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editStartingDate"
                value={editStartingDate}
                placeholder="Starting Date"
                onChange={this.onChangeEdit}
              />
              <input
                type="text"
                name="editContact"
                value={editContact}
                placeholder="Contact Details to Apply to opportunity"
                onChange={this.onChangeEdit}
              />

              <input
                type="text"
                name="editSalary"
                value={editSalary}
                placeholder="Salary"
                onChange={this.onChangeEdit}
              />
            </form>
          </div>
        ) : (
          <span>
            <ul>
              <label>Created by: </label>
            <strong>{opportunity.createdBy}</strong>
            </ul>

            <ul><label>Title: </label>{opportunity.title}</ul>
            <ul>
<label> Description: 
              </label>{opportunity.description}
            </ul>
            <ul>
              <label>Location: </label>
                {opportunity.location} 
            </ul>
            <ul>
              <label>Job Type:  </label>{opportunity.jobType} 
            </ul>
            <ul>
              <label>Contact: </label> {opportunity.contact} 
            </ul>
            <ul>
              <label>Tags: </label>{opportunity.jobTags}
            </ul>
            <ul>
              <label>Salary: </label>{opportunity.salary}
            </ul>
            <ul>
              <label>
                Starting Date: 
              </label>{opportunity.startingDate}
            </ul>
               
            {opportunity.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === opportunity.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEdit}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveOpportunity(opportunity.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default OpportunityItem;
