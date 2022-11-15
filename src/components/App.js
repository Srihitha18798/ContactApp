import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router,Switch,Route, Routes} from 'react-router-dom';
import uuid from 'react-uuid';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  const LOCAL_STORAGE_KEY="contacts";
  const[contacts, setContacts]=useState([]);

  const addContactHandler=(contact)=>{
    console.log(contact);
    setContacts([...contacts,{id:uuid(),...contact}]);
  };

  const removeContactHandler =(id)=>{
    const newContactist=contacts.filter((contact)=>{
      return contact.id!==id;
    });
    setContacts(newContactist);
  };


  useEffect(()=>{
    const retriveContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retriveContacts) setContacts(retriveContacts);
  },[]);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  },[contacts]);

  return (
    <div className="ui container">
      <Router>
              <Header />
        <Routes>
        <Route path="/contact-app" element={<ContactList contacts={contacts}  getContactId={removeContactHandler}/>} />
        <Route path="/contact-app/add" element={<AddContact addContactHandler={addContactHandler}/>} />
        </Routes>
      {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts}  getContactId={removeContactHandler}/> */}
      </Router>
      
    </div>
  );
}

export default App;
