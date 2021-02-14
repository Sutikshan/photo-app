// Info: always contain possible +3, -3 page numbers from current page.
const getButtonsCounter = (
  currentPage: number,
  maxPageNumber: number
): number[] => {
  let buttonsCounter = [];

  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > maxPageNumber) break;
    buttonsCounter.push(i);
  }

  return buttonsCounter;
};

export default getButtonsCounter;
