import './App.css';
import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder, AdminPortal } from "@frontegg/react";

function App() {
const { user, isAuthenticated } = useAuth();
const loginWithRedirect = useLoginWithRedirect();

useEffect(() => {
if (!isAuthenticated) {
loginWithRedirect();
}
}, [isAuthenticated, loginWithRedirect]);

const logout = () => {
const baseUrl = ContextHolder.for().getContext().baseUrl;
window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location.href}`;
};
const handleClick = () => {
  AdminPortal.show();
};

return (

<div className="App">
  {isAuthenticated ? (
    <div>
      <div>
        <img src={user?.profilePictureUrl} alt={user?.name} />
      </div>
      <div>
        <span>Logged in as: {user?.name}</span>
      </div>
      <div>
        <button onClick={() => logout()}>Click to logout</button>
      </div>
      <div>
        <button onClick={handleClick}>settings</button>
      </div>
    </div>
  ) : (
    <div>
      <button onClick={() => loginWithRedirect()}>Click me to login</button>
    </div>
  )}
</div>
); }

export default App;