import './App.css';
import { useEffect,useState } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder, AdminPortal,useTenantsActions } from "@frontegg/react";

function App() {
const { user, isAuthenticated,tenantsState } = useAuth();
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
const { loadTenants,switchTenant } = useTenantsActions();
const [selectedTenant, setSelectedTenant] = useState(''); 
useEffect(() => {
  if (isAuthenticated){
    loadTenants();
  }
}, []);
const handleChange = (e) => {
    const tenantId = e.target.value;
    if (!tenantId || tenantId === user?.tenantId) return;
    setSelectedTenant(tenantId);
    switchTenant({ tenantId });
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
      {tenantsState?.tenants?.length > 0 && (
        <div>
          <select value={selectedTenant} onChange={handleChange}>
            <option value="" disabled>Change tenant</option>
            {tenantsState.tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  ) : (
    <div>
      <button onClick={() => loginWithRedirect()}>Click me to login</button>
    </div>
  )}
</div>
); }

export default App;