import React from 'react';
import { MDBDataTable } from 'mdbreact';

const WatchlistTable = ({ table }) => {
  return table.rows.length > 0 ? (
    <div className="WatchlistTable px-0">
      <MDBDataTable
        responsive
        className="table"
        striped
        bordered
        entries={20}
        searching={false}
        displayEntries={false}
        large
        hover
        id="table"
        paginationLabel={["<", ">"]}
        data={table}
      />
    </div>
  ) : null;
};

export default WatchlistTable;
