import { useAuthContext } from "src/context/AuthContext";

const IndexPage = () => {
  const { user, token } = useAuthContext();

  return (
    <div className="container mx-auto">
      <h1>This is the IndexPage</h1>
    </div>
  );
};

export default IndexPage;
