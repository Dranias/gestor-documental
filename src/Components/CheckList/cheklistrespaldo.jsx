import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';

function createData(id, docNum, institution, name, description, notes) {
    return {
        id,
        opg: docNum,
        turno: institution,
        remitente: name,
        solicitud: description,
        acuerdo: notes,
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'asc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'opg',
        numeric: false,
        disablePadding: true,
        label: 'OPG',
    },
    {
        id: 'turno',
        numeric: false,
        disablePadding: false,
        label: 'Turno',
    },
    {
        id: 'remitente',
        numeric: false,
        disablePadding: false,
        label: 'Remitente',
    },
    {
        id: 'solicitud',
        numeric: false,
        disablePadding: false,
        label: 'Solicitud',
    },
    {
        id: 'acuerdo',
        numeric: false,
        disablePadding: false,
        label: 'Acuerdo',
    },
];

function EnhancedTableHead(props) {

    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={headCell.id === 'opg' ? { paddingLeft: 2 } : {}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'desc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} Seleccionado
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Checklist
                </Typography>
            )}

            <Tooltip title="Filter list">
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('opg');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [responseData, setResponseData] = React.useState(null);

    React.useEffect(() => {
        const apiUrl = import.meta.env.VITE_REACT_APP_GESTOR_APP_GET_LIST;

        axios.get(apiUrl)
            .then(response => {
                const responseData = Array.isArray(response.data) ? response.data.reverse() : [response.data];
                setResponseData(responseData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const generatedRows = React.useMemo(() => {
        if (!responseData) return [];

        return responseData.flatMap((item, index) => {
            if (Array.isArray(item.docNumber) && item.docNumber.length > 1) {
                return item.docNumber.map((docNumber, i) => {
                    const modifiedDocNumber = docNumber + '/2024';
                    return createData(index * item.docNumber.length + i + 1, modifiedDocNumber, item.institution[i], item.name, item.description, item.notes);
                });
            } else {
                const modifiedDocNumber = Array.isArray(item.docNumber) ? item.docNumber[0] + '/2024' : item.docNumber + '/2024';
                return createData(index + 1, modifiedDocNumber, Array.isArray(item.institution) ? item.institution[0] : item.institution, item.name, item.description, item.notes);
            }
        });
    }, [responseData]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        console.log("click")
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(generatedRows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    const handleGoToFirstPage = () => {
        setPage(0);
    };

    const handleGoToLastPage = () => {
        setPage(Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1));
    };

    const isLoading = responseData === null;

    return (
        <Box sx={{ width: '90%', margin: '0 auto' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={generatedRows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{row.opg}</TableCell>
                                        <TableCell align="left">{row.turno}</TableCell>
                                        <TableCell align="left">{row.remitente}</TableCell>
                                        <TableCell align="left">{row.solicitud}</TableCell>
                                        <TableCell align="left">{row.acuerdo}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 50, 100]}
                    component="div"
                    count={generatedRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={(props) => (
                        <TablePaginationActions
                            {...props}
                            onGoToFirstPage={handleGoToFirstPage}
                            onGoToLastPage={handleGoToLastPage}
                        />
                    )}
                />
            </Paper>
        </Box>
    );

    function TablePaginationActions(props) {
        const { count, page, rowsPerPage, onPageChange, onGoToFirstPage, onGoToLastPage } = props;

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={onGoToFirstPage} disabled={page === 0}>
                    <FirstPageIcon />
                </IconButton>
                <IconButton onClick={onGoToLastPage} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                    <LastPageIcon />
                </IconButton>
            </div>
        );
    }
}