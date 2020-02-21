import React, { Component } from "react";
import ContactsList from "./ContactsList";
import SearchBar from "./SearchBar";

import "./App.css";
import contactsJSON from "./contacts.json";

class App extends Component {
  constructor(props) {
    console.log("<App/> CONSTRUCTOR");
    super(props);
    this.state = {
      contacts: contactsJSON.slice(0, 5),
      searchText: ""
    };
  }

  // state = {
  //   contacts: contactsJSON.slice(0, 5),
  //   searchText: ""
  // };

  addRandom = () => {
    let found;

    while (!found && this.state.contacts.length < contactsJSON.length) {
      // find a random contact that is not already in the state.contacts
      const random =
        contactsJSON[Math.floor(Math.random() * contactsJSON.length)];

      const alreadyExisting = this.state.contacts.find(contact => {
        return contact.id === random.id;
      });

      if (!alreadyExisting) {
        found = random;
      }
      // assign the random contact to `found`
    }

    if (found) {
      this.setState({
        contacts: [found, ...this.state.contacts]
      });
    }
  };

  // addRandom = () => {
  //   // find a random contact
  //   const random =
  //     contactsJSON[Math.floor(Math.random() * contactsJSON.length)];
  //   console.log(random);

  //   // append/prepend to the array of contacts in the state
  //   // const contactsCopy = [...this.state.contacts]
  //   // const contactsCopy = this.state.contacts.slice()

  //   // contactsCopy.push(random);

  //   this.setState({
  //     contacts: [random, ...this.state.contacts]
  //     // contacts: contactsCopy
  //   });
  // };

  sortByName = () => {
    const sorted = [...this.state.contacts].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    this.setState({
      contacts: sorted
    });
  };

  sortByPop = () => {
    const sorted = [...this.state.contacts].sort((a, b) => {
      return b.popularity - a.popularity;
    });

    this.setState({
      contacts: sorted
    });
  };

  deleteContact = index => {
    // console.log("deleteContact", index);
    // filter the array of contacts to exclude the element at a given index
    const withoutContact = [...this.state.contacts];
    withoutContact.splice(index, 1);

    this.setState({
      contacts: withoutContact
    });
  };

  updateSearchText = text => {
    this.setState({
      searchText: text
    });
  };

  componentDidUpdate() {
    console.log("<App/> DID UPDATE");
  }

  componentDidMount = () => {
    console.log("<App/> DID MOUNT");

    // setTimeout(() => {
    //   this.setState({
    //     contacts: contactsJSON.slice(0, 5)
    //   });
    // }, 1000);
  };

  render() {
    console.log("<App /> RENDER");

    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={this.addRandom}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPop}>Sort by popularity</button>

        <SearchBar
          updateSearchText={this.updateSearchText}
          search={this.state.searchText}
        />

        <ContactsList
          deleteContact={this.deleteContact}
          contacts={this.state.contacts}
          search={this.state.searchText}
        />
      </div>
    );
  }
}

export default App;
