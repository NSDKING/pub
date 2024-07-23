import React from 'react'
import { Amplify, API } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { post } from 'aws-amplify/api'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import amplifyconfig from './amplifyconfiguration.json';
import { get } from 'http';
Amplify.configure(amplifyconfig);

const client = generateClient()

async function addToGroup() { 
  let apiName = 'AdminQueries';
  let path = '/addUserToGroup';
  let options = {
      body: {
        "username" : "richard",
        "groupname": "Editors"
      }, 
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await fetchAuthSession()).tokens.accessToken}`
      } 
  }
  return post({apiName, path, options});
}

async function listEditors(limit){
  let apiName = 'AdminQueries';
  let path = '/listUsersInGroup';
  let options = { 
      queryParams: {
        "groupname": "Editors",
        "limit": limit,
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await fetchAuthSession()).tokens.accessToken}`
      }
  }
  const response = await get({apiName, path, options});
  return response;
}

function App() {
  return (
    <div className="App">
      <button onClick={addToGroup}>Add to Group</button>
      <button onClick={() => listEditors(10)}>List Editors</button>
    </div>
  );
}

export default withAuthenticator(App);