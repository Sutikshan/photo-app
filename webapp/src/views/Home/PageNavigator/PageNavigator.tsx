import classNames from 'classnames';
import React from 'react';
import { PAGE_SIZE } from '../constants';
import getButtonsCounter from './getButtonsCounter';
import './pageNavigator.styles.scss';
import { IPageNavigatorProps } from './types';

const PageNavigator: React.FunctionComponent<IPageNavigatorProps> = ({
  currentPage,
  totalCount,
  onPageButtonClick,
}) => {
  const handlePageButtonClick = (pageNumber: number) => {
    onPageButtonClick(pageNumber);
  };
  const lastPageNumber = Math.ceil(totalCount / PAGE_SIZE);
  const buttonsCounter = getButtonsCounter(currentPage, lastPageNumber);

  return (
    <fieldset>
      {buttonsCounter[0] > 1 && (
        <button
          role="button"
          aria-label="first page"
          onClick={() => handlePageButtonClick(0)}
        >
          &lt;&lt;
        </button>
      )}
      {buttonsCounter.map((n) => (
        <button
          className={classNames({
            isCurrentPage: currentPage === n,
          })}
          key={n}
          onClick={() => handlePageButtonClick(n)}
          role="button"
        >
          {n}
        </button>
      ))}

      {buttonsCounter[buttonsCounter.length - 1] < lastPageNumber && (
        <button
          onClick={() => handlePageButtonClick(lastPageNumber)}
          role="button"
          aria-label="last page"
        >
          &gt;&gt;
        </button>
      )}
    </fieldset>
  );
};

export default PageNavigator;
