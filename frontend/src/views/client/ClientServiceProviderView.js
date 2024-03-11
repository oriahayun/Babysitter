import { Button, Card, CardBody, CardText, Col, Container, Row } from 'reactstrap';
import classnames from 'classnames';
import { Aperture, DollarSign, Share2, ShoppingCart, Star } from 'react-feather';
import { useGetUserQuery } from '../../redux/api/userAPI';
import { useParams } from 'react-router-dom';
import SpinnerComponent from '../../components/SpinnerComponent';
import userImg from '../../assets/images/user.png';

const ClientSeriveProviderView = () => {
  const { id } = useParams();
  const { data: provider, isLoading } = useGetUserQuery(id);
  return (
    <div className="main-view">
      <Container>
        <Card>
          <CardBody>
            {!isLoading ? (
              <Row className="my-2">
                <Col className="d-flex align-items-start justify-content-center mb-2 mb-md-0" md="3" xs="12">
                  <div className="d-flex align-items-start justify-content-center">
                    <img className="img-fluid product-img" src={userImg} alt={provider._id} />
                  </div>
                </Col>
                <Col md="9" xs="12">
                  <h4 className="provider-style">
                    {provider.firstName} {provider.lastName}
                  </h4>
                  <div className="ecommerce-details-price d-flex flex-wrap mt-1">
                    <p className="item-hourly my-2 mx-1">Hourly Rate: $ {provider.rate}</p>
                  </div>
                  <div className="my-2">
                    <ul className="unstyled-list list-inline">
                      {new Array(5).fill().map((listItem, index) => {
                        return (
                          <li key={index} className="ratings-list-item me-25">
                            <Star
                              className={classnames({
                                'filled-star': index + 1 <= provider.rating,
                                'unfilled-star': index + 1 > provider.rating
                              })}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <CardText>
                    Service Type -<span className="text-success ms-25 provider-style">{provider.providerType}</span>
                  </CardText>
                  <CardText>{provider.description}</CardText>
                  <ul className="product-features list-unstyled">
                    {provider.hasFreeShipping ? (
                      <li>
                        <ShoppingCart size={19} />
                        <span>Free Shipping</span>
                      </li>
                    ) : null}
                    <li>
                      <DollarSign size={19} />
                      <span>EMI options available</span>
                    </li>
                  </ul>
                  <hr />
                  <div className="d-flex flex-column flex-sm-row pt-1">
                    <Button
                      className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
                      color="primary"
                      // onClick={() => handleCartBtn(provider.id, provider.isInCart)}
                      /*eslint-disable */
                      {...(provider.isInCart
                        ? {
                          to: '/apps/ecommerce/checkout'
                        }
                        : {})}
                    /*eslint-enable */
                    >
                      <Share2 className="me-50" size={14} />
                      Contact
                    </Button>
                    <Button color="danger" className="btn-contact move-contact">
                      <Aperture className="me-50" size={18} />
                      <span>Order</span>
                    </Button>
                  </div>
                </Col>
              </Row>
            ) : (
              <SpinnerComponent />
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ClientSeriveProviderView;
