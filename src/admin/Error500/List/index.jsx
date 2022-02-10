import React, { Component } from "react";

import { axiosInstance } from "@/service";
import { Loader } from "@/components/Loader";
import { Pagination } from "@/components/Pagination";

import { Table } from "./Table";

export class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_loading: false,
      results: [],
      items_promise: null,
      initialPage: 1,
      pageOfItems: [],
      total_record: 0,
      total_page: 0,
      pageSize: 10,
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.loadItems();
  }

  onChangePage(pageOfItems) {
    this.loadItems(pageOfItems);
  }

  loadItems(pageOfItems) {

    var selectPage = pageOfItems || this.state.initialPage;
    const promise = axiosInstance
      .post("/api/error500/all/", {
        page: selectPage,
        per_page: this.state.pageSize,
      })
      .then(({ is_success, result, total_record, total_page, page }) => {
        if (is_success) {
          this.setState({
            results: result,
            total_record: total_record,
            total_page: total_page,
            initialPage: page,
          });

        }
      });

      this.setState({ items_promise: promise });
  }

  render() {

    const { initialPage, results, total_page, total_record, pageSize } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h1>Error</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Loader
              promise={this.state.items_promise}
              spinner={false}
              reload={this.loadItems}
            >
              <Table items={results} />
              <Pagination
                items={results}
                initialPage={initialPage}
                pageSize={pageSize}
                totalPage={total_page}
                itemLen={total_record}
                onChangePage={this.onChangePage}
              />
            </Loader>
          </div>
        </div>
      </div>
    );
  }
}
