const arr = [
    { "start_date": "5/1/2022", "end_date": "15/1/2022", "price": 5 },
    { "start_date": "1/1/2022", "end_date": "11/1/2022", "price": 3 },
    { "start_date": "3/1/2022", "end_date": "13/1/2022", "price": 10 },
    { "start_date": "2/1/2022", "end_date": "11/1/2022", "price": 4 }
];

// const arr = [
//     { "start_date": "1/1/2022", "end_date": "19/1/2022", "price": 5 },
//     { "start_date": "4/1/2022", "end_date": "11/1/2022", "price": 10 },
//     { "start_date": "15/1/2022", "end_date": "22/1/2022", "price": 7 },
//     { "start_date": "3/1/2022", "end_date": "12/1/2022", "price": 3 }
// ];

const dayInUnix = 86400000;


const calculatePrices = (prices, startDate, endDate) => {
    formatDates(prices);

    return calculateTotalPrice(prices, stringToDate(startDate), stringToDate(endDate));
};

const calculateTotalPrice = (prices, startDate, endDate, totalPrice = 0) => {
    if (prices.length == 0 || startDate > endDate) return totalPrice;

    const { start_date: priceStartDate, end_date: priceEndDate, price } = prices[prices.length - 1];

    const newPrices = prices.slice(0, -1);


    if (priceStartDate <= startDate && priceEndDate >= endDate) {
        console.log('first');

        return totalPrice + calculatePriceForRange(price, startDate, endDate);

    } else if (priceStartDate <= startDate && priceEndDate >= startDate && priceEndDate <= endDate) {
        console.log('second');

        return totalPrice + calculatePriceForRange(price, startDate, priceEndDate) + calculateTotalPrice(newPrices, priceEndDate + dayInUnix, endDate);

    } else if (priceStartDate > startDate && priceStartDate <= endDate && priceEndDate >= endDate) {
        console.log('third', new Date(endDate).toLocaleDateString(), new Date(priceEndDate).toLocaleDateString());

        return totalPrice + calculatePriceForRange(price, priceStartDate, endDate) + calculateTotalPrice(newPrices, startDate, priceStartDate - dayInUnix);

    } else if (priceStartDate > startDate && priceEndDate < endDate) {
        console.log('forth');

        return totalPrice + calculatePriceForRange(price, priceStartDate, priceEndDate) + calculateTotalPrice(newPrices, startDate, priceStartDate - dayInUnix)
            + calculateTotalPrice(newPrices, priceEndDate + dayInUnix, endDate);

    } else {
        console.log('fifth');

        return calculateTotalPrice(newPrices, startDate, endDate, totalPrice);
    }
};

const formatDates = (prices) => {
    for (let i = 0; i < prices.length; i++) {
        prices[i].start_date = stringToDate(prices[i].start_date);
        prices[i].end_date = stringToDate(prices[i].end_date);
    }
};

const calculatePriceForRange = (price, startDate, endDate) => {
    console.log(
        new Date(startDate).toLocaleDateString(),
        new Date(endDate).toLocaleDateString(),
        price,
        (((endDate - startDate) / dayInUnix) + 1)
    );

    return (((endDate - startDate) / dayInUnix) + 1) * price;
}

const stringToDate = (date) => {
    const [day, month, year] = date.split('/');

    return new Date(year, month - 1, day).getTime();
};

console.log(calculatePrices(arr, "1/1/2022", "15/1/2022"));
// console.log(calculatePrices(arr, "1/1/2022", "13/1/2022"));