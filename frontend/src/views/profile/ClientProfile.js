/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import { Card, CardBody, Col, Container, Form, FormGroup, Label, Row } from 'reactstrap';
import userImg from '../../assets/images/user.png';
import { useForm } from 'react-hook-form';
import SpinnerComponent from '../../components/SpinnerComponent';
import { getDateFormat } from '../../utils/Utils';
import { getMeAPI } from '../../redux/api/getMeAPI';
import classnames from 'classnames';
import { useEffect } from 'react';

const ClientProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();
  const { data: user, isLoading } = getMeAPI.endpoints.getMe.useQuery(null);
  console.log(user, isLoading);

  useEffect(() => {
    if (user) {
      const fields = ['firstName', 'lastName', 'email', 'address'];
      fields.forEach((field) => setValue(field, user[field]));
    }
  });

  const onSubmit = (data) => {};

  return (
    <div className="main-view">
      <Container>
        <Card>
          <CardBody>
            {!isLoading ? (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="m-3">
                  <Col md="4" sm="12">
                    <div>
                      <div className="my-3">
                        <img src={userImg} alt="Profile" className="profile-img" />
                      </div>
                      <FormGroup>
                        <Label className="mb-0">First Name:</Label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className={`form-control ${classnames({ 'is-invalid': errors.firstName })}`}
                          {...register('firstName', { required: true })}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label className="mb-0">Last Name:</Label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className={`form-control ${classnames({ 'is-invalid': errors.lastName })}`}
                          {...register('lastName', { required: true })}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label className="mb-0">Email:</Label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                          {...register('email', { required: true })}
                        />
                      </FormGroup>
                      <FormGroup>
                        <h5 className="mb-0">Lives:</h5>
                        <p className="card-text">{user.address}</p>
                      </FormGroup>
                      <div className="mt-3">
                        <h5 className="mb-0">Joined:</h5>
                        <p className="card-text">{getDateFormat(user.createdAt)}</p>
                      </div>
                    </div>
                  </Col>
                  <Col md="8" sm="12">
                    <div>
                      <FormGroup>
                        <Label className="mb-2">About:</Label>
                        <textarea
                          type="text"
                          id="description"
                          name="description"
                          rows={6}
                          className={`form-control ${classnames({ 'is-invalid': errors.description })}`}
                          {...register('description', { required: true })}
                        />
                      </FormGroup>

                      <div className="mt-4">
                        <h5 className="mb-2">Experiences:</h5>
                        <p className="card-text">November 15, 2015</p>
                      </div>
                      <hr />
                      <div className="mt-3">
                        <h5 className="mb-3">Reviews:</h5>
                        <div className="my-2">
                          <div className="d-flex justify-content-start align-items-center mb-1">
                            <div className="avatar me-2">
                              <img src={userImg} alt="avatar img" height="50" width="50" />
                            </div>
                            <div className="profile-user-info">
                              <h6 className="mb-0">Leeanna Alvord</h6>
                              <small className="text-muted">12 Dec 2018 at 1:16 AM</small>
                            </div>
                          </div>
                          <p className="card-text">
                            Wonderful Machine· A well-written bio allows viewers to get to know a photographer beyond the work. This can make the difference
                            when presenting to clients who are looking for the perfect fit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            ) : (
              <SpinnerComponent />
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ClientProfile;
