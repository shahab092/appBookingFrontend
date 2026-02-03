import React from "react";
import { Table } from "antd";

const CommonTable = ({
  columns,
  dataSource,
  pagination = true,
  bordered = true,
  ...props
}) => {
  const defaultPagination =
    pagination === true
      ? {
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => (
            <span className="text-sm text-gray-600 font-medium">
              Showing{" "}
              <span className="font-semibold text-gray-900">{range[0]}</span> to{" "}
              <span className="font-semibold text-gray-900">{range[1]}</span> of{" "}
              <span className="font-semibold text-gray-900">{total}</span>{" "}
              entries
            </span>
          ),
          showQuickJumper: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          size: "default",
        }
      : pagination === false
        ? false
        : pagination;

  return (
    <div className="common-table-wrapper bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={defaultPagination}
        bordered={bordered}
        className="common-table"
        scroll={{ x: "max-content" }}
        {...props}
      />
      <style>{`
        .common-table-wrapper {
          border-radius: var(--table-border-radius);
          overflow: hidden;
        }

        .common-table .ant-table {
          border-radius: var(--table-border-radius);
          overflow: hidden;
        }

        .common-table .ant-table-container {
          border-radius: var(--table-border-radius);
        }

        .common-table .ant-table-thead > tr > th {
          background: linear-gradient(135deg, #2e76ad 0%, #1e5a8a 100%) !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 14px 16px;
          border-bottom: 2px solid #2e76ad;
          border-radius: 0;
        }

        .common-table .ant-table-thead > tr > th:first-child {
          border-top-left-radius: var(--table-border-radius);
        }

        .common-table .ant-table-thead > tr > th:last-child {
          border-top-right-radius: var(--table-border-radius);
        }

        .common-table .ant-table-tbody > tr > td {
          padding: 14px 16px;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .common-table .ant-table-tbody > tr:hover > td {
          background-color: #e0f2fe !important;
          cursor: pointer;
        }

        .common-table .ant-table-tbody > tr {
          transition: all 0.2s ease;
        }

        .common-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }

        .common-table .ant-table-tbody > tr:last-child > td:first-child {
          border-bottom-left-radius: var(--table-border-radius);
        }

        .common-table .ant-table-tbody > tr:last-child > td:last-child {
          border-bottom-right-radius: var(--table-border-radius);
        }

        .common-table.ant-table-bordered .ant-table-container {
          border: 1px solid #e5e7eb;
          border-radius: var(--table-border-radius);
        }

        .common-table.ant-table-bordered .ant-table-thead > tr > th {
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        .common-table.ant-table-bordered .ant-table-tbody > tr > td {
          border-right: 1px solid #e5e7eb;
        }

        .common-table .ant-pagination {
          margin: 20px 0;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .common-table .ant-pagination-item {
          border-radius: 8px;
          border-color: #d1d5db;
          transition: all 0.2s ease;
          min-width: 32px;
          height: 32px;
          line-height: 30px;
        }

        .common-table .ant-pagination-item:hover {
          border-color: #2e76ad;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(46, 118, 173, 0.2);
        }

        .common-table .ant-pagination-item:hover a {
          color: #2e76ad;
        }

        .common-table .ant-pagination-item-active {
          background: linear-gradient(135deg, #2e76ad, #1e5a8a) !important;
          border-color: #2e76ad;
          box-shadow: 0 2px 8px rgba(46, 118, 173, 0.3);
        }

        .common-table .ant-pagination-item-active a {
          color: white;
          font-weight: 600;
        }

        .common-table .ant-pagination-prev,
        .common-table .ant-pagination-next {
          border-radius: 8px;
          border-color: #d1d5db;
          transition: all 0.2s ease;
        }

        .common-table .ant-pagination-prev:hover,
        .common-table .ant-pagination-next:hover {
          border-color: #2e76ad;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(46, 118, 173, 0.2);
        }

        .common-table .ant-pagination-prev:hover a,
        .common-table .ant-pagination-next:hover a {
          color: #2e76ad;
        }

        .common-table .ant-pagination-jump-prev,
        .common-table .ant-pagination-jump-next {
          border-radius: var(--table-border-radius);
        }

        .common-table .ant-pagination-options {
          margin-left: 0;
        }

        .common-table .ant-pagination-options .ant-select {
          border-radius: 8px;
        }

        .common-table .ant-pagination-options .ant-select-selector {
          border-radius: 8px;
          border-color: #d1d5db;
          transition: all 0.2s ease;
        }

        .common-table .ant-pagination-options .ant-select:hover .ant-select-selector {
          border-color: #2e76ad;
          box-shadow: 0 2px 8px rgba(46, 118, 173, 0.15);
        }

        .common-table .ant-pagination-options .ant-select-focused .ant-select-selector {
          border-color: #2e76ad;
          box-shadow: 0 0 0 3px rgba(46, 118, 173, 0.1);
        }

        .common-table .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,
        .common-table .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
          color: #2e76ad;
        }
      `}</style>
    </div>
  );
};

export default CommonTable;
