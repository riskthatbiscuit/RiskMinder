import { useParams } from 'react-router-dom';
// Important for useQuery: We import the useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';

// import SkillsList from '../components/SkillsList';
// import SkillForm from '../components/SkillForm';

// Important for useQuery: We import the specific query we'd like to perform from our queries.js utility
import { QUERY_SINGLE_STOCK } from '../utils/queries';

const Stock = () => {
  const { stockId } = useParams();

  // Important for useQuery: We pass the query we'd like to execute on component load to the useQuery hook
  // In this case, the query we want to run also requires query parameters to be passed, which we deliver as a variables object
  // The useQuery hook will always give back an object, and for the purposes of this app we're using the loading boolean and the data object
  // The data object will match the same result you'd get if you ran this query within the GraphQL playground
  const { loading, data } = useQuery(QUERY_SINGLE_STOCK, {
    // Important for Query Variables: The useQuery hook is able to take a second argument which is where we will pass the query arguments needed to complete the request for a specific profile
    // The second argument is passed as an object with a variables property
    // The variables object will receive each key matching the query definition in utils/queries.js, and the value we'd like to deliver to the server
    variables: { stockId: stockId },
  });

  // Important for useQuery: We use the optional chaining operator to get the resulting profile from our query, or fallback to an empty object if the query isn't resolved yet
  const stock = data?.stock || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="card-header">
        {stock.name} are the following ...
      </h2>

      {/* {stock.skills?.length > 0 && <SkillsList skills={stock.skills} />} */}

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        {/* <SkillForm stockId={stock._id} /> */}
      </div>
    </div>
  );
};

export default Stock;
