## Kapi assignment solution

### How to run the app
- Open `tests.js` file and add your test cases to the tests array including your results.
- To run the test cases just run 
```bash
node test.js
```

### Solution explanation
1. To be able to compare the dates easily I have to convert them to unix timestamps.
So the first step is to format the date ranges to unix timestamps and the search range as well.
2. Apply the prices if applicable recursively from the latest to the oldest.

For example:
Prices are
- 5/1/2022 – 15/1/2022 => $5.00
- 1/1/2022 – 11/1/2022 => $3.00
- 3/1/2022 – 13/1/2022 => $10.00
- 2/1/2022 – 11/1/2022 => $4.00

Search `1/1/2022 - 15/1/2022`

the solution will execute as the following:

- 2/1/2022 - 11/1/2022 => $4.00 * 10 = $40.00
- 1/1/2022 - 1/1/2022 => $3.00 * 1 = $3.00
- 12/1/2022 - 13/1/2022 => $10.00 * 2 = $20.00
- 14/1/2022 - 15/1/2022 => $5.00 * 2 = $10.00

And the result will be `$73.00`