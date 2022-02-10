import React from "react";

const defaultProps = {
  initialPage: 1,
};

export class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
      currentPageCom: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.props.itemLen !== prevProps.itemLen) {
        this.setPage(null, this.props.initialPage);
    }
  }
  setPage(e, page) {
    e && e.preventDefault()
    var { itemLen, totalPage, pageSize } = this.props;
    var pager = this.state.pager;
    pager = this.getPager(itemLen, totalPage, page, pageSize);
    this.setState({ pager: pager });
    if (this.state.currentPageCom === 0) {
      this.setState({
        currentPageCom: this.state.currentPageCom + 1,
      });
    }
    else {
      this.props.onChangePage(page);
    }
  }

  getPager(totalItems, totalPage, currentPage, pageSize) {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    var totalPages = totalPage;

    var startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <div className="row">
        <div className="col-md-2">
          <strong className="text-sm-left">
            Хуудас {pager.currentPage} - {pager.totalPages}
          </strong>
        </div>
        <div className="col-md-10">
          <ul className="pagination  justify-content-end">
            <li
              className={
                pager.currentPage === 1 ? "disabled page-item" : "page-item"
              }
            >
              <a className="page-link" href="#" onClick={(e) => this.setPage(e, 1)}>
                <i className="bi bi-chevron-bar-left"></i>
              </a>
            </li>
            <li
              className={
                pager.currentPage === 1 ? "disabled page-item" : "page-item"
              }
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => this.setPage(e, pager.currentPage - 1)}
              >
                <i className="bi bi-chevron-double-left"></i>
              </a>
            </li>
            {pager.pages.map((page, index) => (
              <li
                key={index}
                className={
                  pager.currentPage === page ? "active page-item" : "page-item"
                }
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => this.setPage(e,page)}
                >
                  {page}
                </a>
              </li>
            ))}
            <li
              className={
                pager.currentPage === pager.totalPages
                  ? "disabled page-item"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => this.setPage(e, pager.currentPage + 1)}
              >
                <i className="bi bi-chevron-double-right"></i>
              </a>
            </li>
            <li
              className={
                pager.currentPage === pager.totalPages
                  ? "disabled page-item"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => this.setPage(e, pager.totalPages)}
              >
                <i className="bi bi-chevron-bar-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Pagination;
