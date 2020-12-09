export function generatePages(getMovies, pageRowLimit) {
  const moviesRowList = [];
  let counter1 = 1;

  while (getMovies.length !== 0) {
    let counter2 = pageRowLimit;
    const tempArray = [];
    while (counter2 !== 0) {
      if (getMovies.length !== 0) {
        tempArray.push(getMovies.shift());
      }
      counter2--;
    }

    moviesRowList.push({ list: tempArray, number: counter1 });
    counter1++;
  }

  return moviesRowList;
}
