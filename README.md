# Requirements and assumptions

**Write the business logic to determine**

which products to display

- Top product per day

- Top product for last 3 days - **Assume today's date is 21/07/2021**

**Rules:**

- Multiple orders of the same product for the same customer on the same day are

**not** considered

- For orders that are cancelled do not account the original completed order towards the calculations.

- If multiple products have equal sales, select alphabetically first only.

Example If a "Hammer" and "BBQ" had similar sales you choose "BBQ"

The expected output for the above input is as below:

```text

19/07/2021: "Ezy Storage 37L Flexi Laundry Basket - White"

20/07/2021: "Ozito 80W Soldering Iron"

21/07/2021: "Arlec 160W Crystalline Solar Foldable Charging Kit"

Last 3 Days: "Ezy Storage 37L Flexi Laundry Basket - White"

```

Consider other inputs and edge cases, not just the supplied input.

## Install

**Core dependencies**

- Node.js 16.10.0 or above
- Yarn 1.22.11

**Other dependencies**

- Check package.json

**Commands**

- To install project dependencies - `Yarn install`
- To start the project - `Yarn start`
- To run jest tests - `Yarn test`
