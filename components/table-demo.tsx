import React from 'react'
import { DataTable } from './tables/data-table'

export default function TableDemo() {
  const data = [
    { name: 'John Doe', code: 'ABC123' },
    { name: 'Jane Smith', code: 'XYZ789' },
    { name: 'Alice Johnson', code: 'LMN456' },
  ];
  return (
    <div>
      <DataTable
        columns={adminCouponColumn}
        data={data}
        loading={false}
        tableTitle=""
        paginationData={{
          total: 0,
          totalPages: 1,
          page: 1,
          limit: 10,
        }}
        isViewOption={false}
        isEnableTablePopup={false}
      />
    </div>
  )
}

const adminCouponColumn: any = [
  {
    accessorKey: 'name',
    header: () => <div className="py-3.5 font-bold text-center"> Name</div>,
    cell: ({ row }: any) => (
      <div className="text-sm font-medium text-center">
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'code',
    header: () => <div className="py-3.5 font-bold text-center"> Code</div>,
    cell: ({ row }: any) => (
      <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-center">
        {row.getValue('code')}
      </div>
    ),
  },
];
