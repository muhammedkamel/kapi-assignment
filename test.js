const { calculatePrices } = require('./solution');

const tests = [
    {
        prices: [
            { "start_date": "5/1/2022", "end_date": "15/1/2022", "price": 5 },
            { "start_date": "1/1/2022", "end_date": "11/1/2022", "price": 3 },
            { "start_date": "3/1/2022", "end_date": "13/1/2022", "price": 10 },
            { "start_date": "2/1/2022", "end_date": "11/1/2022", "price": 4 }
        ],
        startDate: "1/1/2022",
        endDate: "15/1/2022",
        result: 73
    },
    {
        prices: [
            { "start_date": "1/1/2022", "end_date": "19/1/2022", "price": 5 },
            { "start_date": "4/1/2022", "end_date": "11/1/2022", "price": 10 },
            { "start_date": "15/1/2022", "end_date": "22/1/2022", "price": 7 },
            { "start_date": "3/1/2022", "end_date": "12/1/2022", "price": 3 }
        ],
        startDate: "1/1/2022",
        endDate: "13/1/2022",
        result: 45
    },
    {
        prices: [
            { "start_date": "1/12/2021", "end_date": "19/1/2022", "price": 5 },
            { "start_date": "4/1/2022", "end_date": "11/1/2022", "price": 10 },
            { "start_date": "15/1/2022", "end_date": "22/1/2022", "price": 7 },
            { "start_date": "3/1/2022", "end_date": "12/1/2022", "price": 3 }
        ],
        startDate: "30/12/2021",
        endDate: "13/1/2022",
        result: 55
    }
];

// execute tests
tests.forEach(({ prices, startDate, endDate, result }, index) => {
    const totalPrice = calculatePrices(prices, startDate, endDate);

    console.log(`test #${index + 1} returned result ${totalPrice}`);

    console.assert(totalPrice === result, `test #${index + 1} failed with result ${totalPrice}`);
});
