import './App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { uuid } from 'uuidv4';

function App()
{
  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState([]);
  const addContactHandler = (contact) =>
  {
    setContacts([...contacts, contact]);
    console.log("Contacts", contacts);
  }

  useEffect(() =>
  {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log("Priting from Storage ", retrieveContacts);
    if (retrieveContacts)
    {
      setContacts(retrieveContacts);
    }
  }, [])

  useEffect(() =>
  {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className='ui container'>
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
