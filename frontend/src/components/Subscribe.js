import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Alert from './Alert';
import DropDown from './DropDown';
import top100Cities from '../top100Cities';
import isEmail from 'validator/lib/isEmail';
import SubscribeService from '../services/Subscription';

class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      city: '',
      validationError: '',
      success: false
    };
  }

  subscriptionSuccess = () => {
    this.setState({
      success: true
    });
  };

  resetValidation = () => {
    this.setState({
      validationError: ''
    });
  };

  validationError = error => {
    this.setState({
      validationError: error,
      success: false
    });
  };

  onEmailChange = email => {
    this.setState({ email });
  };

  onCityChange = city => {
    this.setState({ city });
  };

  onSubscribeClick = async () => {
    const { email, city } = this.state;
    if (!email) {
      return this.validationError('Please enter your email. We need to know who you are!');
    }
    if (!isEmail(email)) {
      return this.validationError('Email is not valid. Maybe a typo?');
    }
    if (!city) {
      return this.validationError('Please enter your city. We need to know where you stay!');
    }
    if (!top100Cities.indexOf(city) === -1) {
      return this.validationError('Never heard of that city!');
    }

    try {
      await SubscribeService.subscribeUser(email, city);
      this.subscriptionSuccess();
      this.resetValidation();
    } catch (error) {
      this.validationError(error);
    }
  };

  render() {
    const subscriptionForm = (
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="someone@somewhere.com"
            onChange={e => this.onEmailChange(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <DropDown
            name="city"
            id="city"
            placeholder="Type your city"
            suggestions={top100Cities}
            onChange={this.onCityChange}
          />
        </FormGroup>
      </Form>
    );
    const successForm = (
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="mb-0">
          <i className="fas fa-check mr-4" style={{ color: 'green' }} />
        </h1>
        <div>
          <h4 className="mb-0">Thank you for subscribing</h4>
          <span>Look out for your weather updates tomorrow!</span>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <div className="paper">
          <div className="header">
            <h1>Subscribe</h1>
            <span className="sub-title">Add your email to get the latest updates daily about your local weather</span>
          </div>
          <hr />
          <div className="body">{this.state.success ? successForm : subscriptionForm}</div>
          <div className="footer">
            {!this.state.success && (
              <Button color="primary" onClick={this.onSubscribeClick}>
                Subscribe
              </Button>
            )}
          </div>
        </div>
        {this.state.validationError && (
          <Alert className="red-bg" message={this.state.validationError} onDismiss={this.resetValidation} />
        )}
      </React.Fragment>
    );
  }
}

export default Subscribe;
