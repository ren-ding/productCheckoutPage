//simulate the fetching with delay time

export const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));