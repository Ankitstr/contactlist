import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addContact = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ name: '', email: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact);
      const updatedContacts = contacts.map((contact) =>
        contact.id === id ? updatedContact : contact
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Contact List</h1>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div className="contact" key={contact.id}>
            <div>
              <strong>Name:</strong> {contact.name}
            </div>
            <div>
              <strong>Email:</strong> {contact.email}
            </div>
            <div className="contact-actions">
              <button onClick={() => updateContact(contact.id, { ...contact, name: 'Updated Name' })}>
                Update
              </button>
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="add-contact">
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
    </div>
  );
};

export default App;
