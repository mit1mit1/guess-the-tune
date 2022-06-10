import { useState } from "react";
import appStyles from "./App.module.scss";

export const MultipageContent = ({ pages }: {pages: Array<JSX.Element>}) => {
  const [pageNumber, setPageNumber] = useState(0);
  if (!pages.length) return <></>;
  return <>
    {pages[pageNumber % pages.length + (pageNumber < 0 ? pages.length : 0)]}
    <button className={appStyles.button} onClick={() => setPageNumber(pageNumber - 1)}>Previous page</button>
    <button className={appStyles.button} onClick={() => setPageNumber(pageNumber + 1)}>Next page</button>
  </>;
}