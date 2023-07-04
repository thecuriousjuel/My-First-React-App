import './App.css';
import React from "react";
import { useState, useEffect } from 'react';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { v4 as uuid } from 'uuid';

function App()
{
  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);
  const addContactHandler = (contact) =>
  {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  }

  const removeContactHandler = (id) => 
  {
    const newContactList = contacts.filter((contact) =>
    {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  useEffect(() =>
  {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log("Printing from Storage ", retrieveContacts);
    if (retrieveContacts)
    {
      setContacts([...retrieveContacts]);
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
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;
