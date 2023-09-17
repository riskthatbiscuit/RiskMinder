import { Link } from 'react-router-dom';

const StockList = ({ stocks, title }) => {
  if (!stocks.length) {
    return <h3>No Stocks Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {stocks &&
          stocks.map((stock) => (
            <div key={stock._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {stock.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    currently has something
                  </span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/stocks/${stock._id}`}
                >
                  View and endorse their skills.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StockList;
