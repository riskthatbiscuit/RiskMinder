# RiskMinder - Stock Portfolio Management

RiskMinder is a web-based application that allows users to manage their stock portfolios, track stock prices, and make buy/sell decisions. This README provides an overview of the application's features, installation instructions, and usage guidelines.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can create accounts and log in securely to access their personalized portfolios.

- **Stock Portfolio Management**: Users can create and manage their stock portfolios by adding or removing stocks.

- **Real-Time Stock Data**: The application provides real-time stock data, including the latest stock prices.

- **Buy/Sell Stocks**: Users can buy and sell stocks within their portfolios, with real-time price updates.

## Installation

To run RiskMinder locally, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/riskthatbiscuit/riskminder.git
   ```

2. Navigate to the project directory:

   ```shell
   cd riskminder
   ```

3. Install the necessary dependencies:

   ```shell
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the required environment variables, including database connection strings and API keys.

5. Start the application:

   ```shell
   npm start
   ```

6. Open your web browser and access the application at `http://localhost:3000`.

## Usage

1. Register for an account or log in if you already have one.

2. Once logged in, you will be directed to your portfolio dashboard.

3. Use the dashboard to add stocks to your portfolio. You can search for stocks by company name or ticker symbol.

4. View real-time stock prices for the stocks in your portfolio.

5. Make buy or sell decisions by clicking the respective buttons in the portfolio table.

6. Track your portfolio's performance and make informed investment decisions.

## Contributing

Contributions to RiskMinder are welcome! Here are some ways you can contribute:

- Report bugs and issues.
- Suggest new features or improvements.
- Submit pull requests to address open issues.

## License

This project is licensed under the [MIT License](LICENSE).