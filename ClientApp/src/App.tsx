import { AuthProvider } from "./context/AuthContext";
import { CustomersProvider } from "./features/customers/CustomersContext";
import { Router } from "./Routes";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <CustomersProvider>
          <Router />
        </CustomersProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
