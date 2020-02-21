import React from "react";

class Contact extends React.Component {
  componentDidMount() {
    console.log("<Contact/> DID MOUNT");
  }

  componentDidUpdate() {
    console.log("<Contact/> DID UPDATE");
  }

  componentWillUnmount() {
    console.log("<Contact/> WILL UNMOUNT");
  }

  render() {
    console.log("<Contact/> RENDER");
    const contact = this.props.contact;
    return (
      <tr>
        <td>
          <img height="100px" src={contact.pictureUrl} alt={contact.name} />
        </td>
        <td>{contact.name}</td>
        <td>{contact.popularity.toFixed(2)}</td>
        <td>
          <button
            onClick={() => {
              this.props.deleteContact(this.props.index);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

class ContactsList extends React.Component {
  componentDidUpdate() {
    console.log("<ContactsList/> DID UPDATE");
  }

  componentDidMount() {
    console.log("<ContactsList/> DID MOUNT");
  }

  render() {
    console.log("<ContactsList/> RENDER");

    return (
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.contacts
            .filter(contact => {
              return contact.name.toLowerCase().includes(this.props.search);
            })
            .map((contact, i) => {
              return (
                <Contact
                  key={contact.id}
                  contact={contact}
                  deleteContact={this.props.deleteContact}
                  index={i}
                />
              );
            })}
        </tbody>
      </table>
    );
  }
}

export default ContactsList;
