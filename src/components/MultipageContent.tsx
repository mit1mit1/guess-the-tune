import { useState } from "react";
import appStyles from "./App.module.scss";
import multipageContentStyles from "./MultipageContent.module.scss";

export const MultipageContent = ({ pages }: { pages: Array<JSX.Element> }) => {
  const [pageNumber, setPageNumber] = useState(0);
  if (!pages.length) return <></>;
  const correctedIndex =
    (pageNumber % pages.length) +
    (pageNumber % pages.length < 0 ? pages.length : 0);
  return (
    <>
      {pages[correctedIndex]}
      <div className={multipageContentStyles.controlButtonBlock}>
        <button
          className={appStyles.button}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous page
        </button>
        <button
          className={appStyles.button}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next page
        </button>
      </div>
    </>
  );
};
