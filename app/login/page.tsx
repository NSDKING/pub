"use client"
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

export default function LoginPage() {
  return (
    <div>
       <Authenticator>
        {({ signOut, user }) => (
          <div>
            <h2>Welcome, {user?.username}!</h2>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}
