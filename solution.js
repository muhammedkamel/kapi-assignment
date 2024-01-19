const dayInUnix = 86400000;

const formatDates = (prices) => {
    for (let i = 0; i < prices.length; i++) {
        prices[i].start_date = stringToDate(prices[i].start_date);
        prices[i].end_date = stringToDate(prices[i].end_date);
    }
};

const calculatePriceForRange = (price, startDate, endDate) => (((endDate - startDate) / dayInUnix) + 1) * price;

const stringToDate = (date) => {
    const [day, month, year] = date.split('/');

    return new Date(year, month - 1, day).getTime();
};

const calculateTotalPrice = (prices, startDate, endDate, totalPrice = 0) => {
    if (prices.length == 0 || startDate > endDate) return totalPrice;

    const { start_date: priceStartDate, end_date: priceEndDate, price } = prices[prices.length - 1];

    const newPrices = prices.slice(0, -1);


    if (priceStartDate <= startDate && priceEndDate >= endDate) {

        return totalPrice + calculatePriceForRange(price, startDate, endDate);

    } else if (priceStartDate <= startDate && priceEndDate >= startDate && priceEndDate <= endDate) {

        return totalPrice + calculatePriceForRange(price, startDate, priceEndDate)
            + calculateTotalPrice(newPrices, priceEndDate + dayInUnix, endDate);

    } else if (priceStartDate > startDate && priceStartDate <= endDate && priceEndDate >= endDate) {

        return totalPrice + calculatePriceForRange(price, priceStartDate, endDate)
            + calculateTotalPrice(newPrices, startDate, priceStartDate - dayInUnix);

    } else if (priceStartDate > startDate && priceEndDate < endDate) {

        return totalPrice + calculatePriceForRange(price, priceStartDate, priceEndDate)
            + calculateTotalPrice(newPrices, startDate, priceStartDate - dayInUnix)
            + calculateTotalPrice(newPrices, priceEndDate + dayInUnix, endDate);

    } else {

        return calculateTotalPrice(newPrices, startDate, endDate, totalPrice);

    }
};

const calculatePrices = (prices, startDate, endDate) => {
    formatDates(prices);

    return calculateTotalPrice(prices, stringToDate(startDate), stringToDate(endDate));
};

module.exports = { calculatePrices };