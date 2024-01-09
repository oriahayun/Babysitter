/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { ChevronDown, MoreVertical, Archive, Search, Trash2 } from 'react-feather';
import toast from 'react-hot-toast';
import { useDeleteUserMutation, useGetUsersQuery } from '../../redux/api/userAPI';

const renderRole = (row) => (
  <span className="text-truncate text-capitalize align-middle">
    <Badge color="info" className="px-2 py-1" pill>
      {row.role}
    </Badge>
  </span>
);

const renderStatus = (row) => {
  const color = row.status === 'active' ? 'success' : 'danger';
  return (
    <span className="text-truncate text-capitalize align-middle">
      <Badge color={color} className="px-2 py-1" pill>
        {row.status}
      </Badge>
    </span>
  );
};

export const columns = () => [
  {
    name: 'Firstname',
    maxwidth: '100px',
    selector: (row) => `${row.firstName}`,
    sortable: true
  },
  {
    name: 'Lastname',
    maxwidth: '100px',
    selector: (row) => `${row.lastName}`,
    sortable: true
  },
  {
    name: 'Email',
    maxwidth: '100px',
    selector: (row) => `${row.email}`,
    sortable: true
  },
  {
    name: 'Role',
    cell: (row) => renderRole(row)
  },
  {
    name: 'Address',
    selector: (row) => `${row.address}`,
    sortable: true
  },
  {
    name: 'Status',
    cell: (row) => renderStatus(row)
  },
  {
    name: 'Actions',
    width: '120px',
    cell: (row) => {
      const navigate = useNavigate();
      const [modalVisibility, setModalVisibility] = useState(false);
      const [deleteUser, { isLoading, isError, error, isSuccess }] = useDeleteUserMutation();
      useEffect(() => {
        if (isSuccess) {
          toast.success(
            <div className="d-flex align-items-center">
              <span className="toast-title">User deleted successfully</span>
            </div>,
            {
              duration: 4000,
              position: 'top-right'
            }
          );
          navigate('/admin/clients');
        }
        if (isError) {
          toast.error(error.data.message, {
            position: 'top-right'
          });
        }
      }, [isLoading]);
      const handleDeleteUser = (id) => {
        deleteUser(id);
        setModalVisibility(false);
      };
      return (
        <>
          {row.role !== 'admin' && (
            <>
              <UncontrolledDropdown>
                <DropdownToggle tag="div" className="btn btn-sm">
                  <MoreVertical size={14} className="cursor-pointer action-btn" />
                </DropdownToggle>
                <DropdownMenu end container="body">
                  <DropdownItem className="w-100" onClick={() => navigate(`/admin/profile-review/${row._id}`)}>
                    <Archive size={14} className="mr-50" />
                    <span className="align-middle mx-2">Review</span>
                  </DropdownItem>
                  <DropdownItem className="w-100" onClick={() => setModalVisibility(!modalVisibility)}>
                    <Trash2 size={14} className="mr-50" />
                    <span className="align-middle mx-2">Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Modal isOpen={modalVisibility} toggle={() => setModalVisibility(!modalVisibility)}>
                <ModalHeader toggle={() => setModalVisibility(!modalVisibility)}>Confirm Delete?</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete?
                  <div>
                    <strong>{row.email}</strong>
                  </div>
                </ModalBody>
                <ModalFooter className="justify-content-start">
                  <Button color="primary" onClick={() => handleDeleteUser(row._id)}>
                    Yes, Please Delete
                  </Button>
                  <Button color="secondary" onClick={() => setModalVisibility(!modalVisibility)} outline>
                    No
                  </Button>
                </ModalFooter>
              </Modal>
            </>
          )}
        </>
      );
    }
  }
];

const Client = () => {
  const [searchItem, setSearchItem] = useState('');

  const queryParams = {
    q: searchItem,
    role: 'client'
  };
  const paginationRowsPerPageOptions = [15, 30, 50, 100];
  const { data: users, isError, isSuccess, error, isLoading, refetch } = useGetUsersQuery(queryParams);
  console.log(users);

  const handleFilter = (q) => {
    setSearchItem(q);
  };

  return (
    <div className="main-view">
      <Container>
        <Row className="my-3">
          <Col>
            <h4 className="main-title">Clients</h4>
          </Col>
        </Row>
        <Card>
          <CardBody>
            <Row className="justify-content-end">
              <Col md="3" className="d-flex align-items-center">
                <InputGroup>
                  <InputGroupText>
                    <Search size={14} />
                  </InputGroupText>
                  <Input id="search-user" type="text" value={searchItem} onChange={(e) => handleFilter(e.target.value ? e.target.value : '')} />
                </InputGroup>
                {searchItem && (
                  <Button
                    size="sm"
                    className="clear-link d-block"
                    onClick={() => {
                      handleFilter('');
                    }}
                    color="flat-light">
                    clear
                  </Button>
                )}
              </Col>
            </Row>
          </CardBody>
          <DataTable
            title="Users"
            data={users}
            responsive
            className="react-dataTable"
            noHeader
            pagination
            paginationRowsPerPageOptions={paginationRowsPerPageOptions}
            columns={columns()}
            sortIcon={<ChevronDown />}
          />
        </Card>
      </Container>
    </div>
  );
};

export default Client;
