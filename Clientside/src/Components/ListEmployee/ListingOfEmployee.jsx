import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable, usePagination, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEditId } from "../../Features/SetEditit";
import Admin_PaginationNext_the_Employee from "../../Actions/AdminAction/AdminPagination";
import Admin_Delete_the_Employee from "../../Actions/AdminAction/AdminDeleteUser";
import Admin_Search_the_Employee from "../../Actions/AdminAction/SearchAction";


const baseUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const ListingOfEmployee = () => {
    const employees = useSelector(state => state.Data_of_employee);
    const employeeList = employees.employeelist.employeelist || [];

    // State for search term and page size
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handlenextpage = () => {
        console.log("next clicked")
        dispatch(Admin_PaginationNext_the_Employee({baseUrl,token}));
      };

      const handleprevpage=()=> {
        console.log("prev clicked")
        dispatch(Admin_PaginationNext_the_Employee({baseUrl,token}));
      }


    // Filter data based on search term
    const filteredData = useMemo(() => {
        return employeeList.filter(employee =>
            employee.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.Email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [employeeList, searchTerm]);

    // Define columns for the table
    const columns = useMemo(() => [
        { Header: 'Name', accessor: 'Name' },
        { Header: 'Image', accessor: 'Profile', Cell: ({ value }) => (
            <img
                src={value || 'default-image-url'}
                
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
        )},
        { Header: 'Email', accessor: 'Email' },
        { Header: 'Phone', accessor: 'Phone' },
        { Header: 'Designation', accessor: 'Designation' },
        { Header: 'Gender', accessor: 'Gender' },
        { 
            Header: 'Course', 
            accessor: 'Course', 
            Cell: ({ value }) => {
                if (value) {
                    return (
                        <div>
                            MCA: {value.mca ? "Yes" : "No"}<br/>
                            BCA: {value.bca ? "Yes" : "No"}<br/>
                            BSC: {value.bsc ? "Yes" : "No"}
                        </div>
                    );
                }
                return "N/A";
            }
        },
        { Header: 'Created Date', accessor: 'created_Date', Cell: ({ value }) => new Date(value).toLocaleString() },
        { 
            Header: 'Action', 
            accessor: '_id', 
            Cell: ({ value }) => (
                <div>
                    <button onClick={() => handleActionEdit(value)} style={{ marginRight: '5px' }}>Edit</button>
                    <button onClick={() => handleActionDelete(value)}>Delete</button>
                </div>
            )
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageIndex, pageSize: currentPageSize },
        gotoPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        previousPage,
        nextPage,
        setPageSize: setTablePageSize,
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageSize },
        },
        useSortBy,
        usePagination
    );

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        dispatch(Admin_Search_the_Employee({ value: newSearchTerm, baseUrl, token }));
    };

    const handleActionDelete = (id) => {
        console.log("Action button clicked for ID:", id);
        dispatch(Admin_Delete_the_Employee({value:id,baseUrl,token}))
        navigate('/AdminHome');
    };

    const handleActionEdit = (id) => {
        console.log("Action button clicked for ID:", id);
        dispatch(setEditId(id));
        navigate('/AdminEdit');
    };



    return (
        <div style={{ margin: '20px auto', maxWidth: '1200px' }}>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map(column => (
                                <th 
                                    {...column.getHeaderProps(column.getSortByToggleProps())} 
                                    key={column.id} 
                                    style={{ border: '1px solid #ddd', padding: '8px' }}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.length > 0 ? (
                        page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={cell.column.id} style={{ border: '1px solid #ddd', padding: '8px' }}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center', padding: '8px' }}>No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <button onClick={handleprevpage}>
                    {'< Prev'}
                </button>
                <button onClick={handlenextpage} >
        {'Next >'}
      </button>
              </div>
              <span>
                    Page {pageIndex + 1} of {pageOptions.length}
                </span>
            </div>
        </div>
    );
};

export default ListingOfEmployee;
