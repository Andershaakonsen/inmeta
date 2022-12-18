import { AuthProvider } from "./context/AuthContext";
import { CustomersProvider } from "./features/customers/CustomersContext";
import { OrdersProvider } from "./features/orders/OrdersContext";
import { Router } from "./Routes";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <CustomersProvider>
          <OrdersProvider>
            <Router />
          </OrdersProvider>
        </CustomersProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
