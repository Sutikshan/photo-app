import getButtonsCounter from './getButtonsCounter';

describe('getButtonsCounter', () => {
  test.each`
    currentPage | maxPageNumber | buttonsCounter
    ${3}        | ${10}         | ${[1, 2, 3, 4, 5, 6]}
    ${1}        | ${100}        | ${[1, 2, 3, 4]}
    ${2}        | ${4}          | ${[1, 2, 3, 4]}
    ${50}       | ${100}        | ${[47, 48, 49, 50, 51, 52, 53]}
    ${98}       | ${100}        | ${[95, 96, 97, 98, 99, 100]}
  `(
    '.getButtonsCounter(currentPage - $currentPage, maxPageNumber - $maxPageNumber)',
    ({ currentPage, maxPageNumber, buttonsCounter }) => {
      expect(getButtonsCounter(currentPage, maxPageNumber)).toEqual(
        buttonsCounter
      );
    }
  );
});
