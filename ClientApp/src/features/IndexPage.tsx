import { useAuthContext } from "src/context/AuthContext";

const IndexPage = () => {
  const { user, token } = useAuthContext();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Case</h1>
      <p className="text-lg">
        Create an application that a sales consultant working at a moving
        company will use to place /{" "}
        <span className="text-radix-blue9">find</span> /{" "}
        <span className="text-radix-green9">edit</span> /{" "}
        <span className="text-radix-red9">delete</span> orders on behalf of
        customers.
      </p>
      <p>
        The company that the sales consultant works at offers these services for
        their customers:{" "}
        <ul>
          <li>-Moving</li>
          <li>-Packing</li>
          <li>-Cleaning</li>
        </ul>
      </p>
    </div>
  );
};

export default IndexPage;
