import React, { Component } from 'react';
import background from '../assets/background.jpeg';
import { Segment, Form, Button, Header } from 'semantic-ui-react';

//redux
import { connect } from 'react-redux';
import { login } from '../redux/actions/user';
import { getTaskTypes } from '../redux/actions/task-type';
import Loading from '../components/loading';

import { isFailNow, isSuccessNow } from '../utils/string-utils';
import { LOGIN_FAILED_MSG } from '../utils/constants';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: false,
            errorMessage: null,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (isSuccessNow(this.props.LOGIN_STAUTS, nextProps.LOGIN_STATUS)) {
            this.setState({ loading: false });
            this.props.getTaskTypes(nextProps.token);
            this.props.history.push('/home');
        } else if (isFailNow(this.props.LOGIN_STAUTS, nextProps.LOGIN_STATUS)) {
            this.setState({ error: true, errorMessage: LOGIN_FAILED_MSG});
        }
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const { error } = this.state;
        if (error) {
            this.setState({
                [name]: value,
                error: false,
            });
        } else {
            this.setState({
                [name]: value
            });
        }

    }
    handleSubmit = (event) => {
        this.setState({ loading: true });
        event.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password);
    }
    render() {
        const { email, password} = this.state;
        return (
            <div style={{ height: '100%', backgroundSize: 'cover', backgroundImage: `url(${background})` }}>
                <div className={"col align-center justify-center"} style={{ height: '100%', backgroundColor: 'rgba(50, 50, 50, 0.8)' }}>
                    <Segment style={{ width: 350, borderRadius: 0, padding: 20 }}>
                        <Form onSubmit={this.handleSubmit} autoComplete="off">
                            <Form.Input fluid
                                onChange={this.handleInputChange}
                                name='email'
                                value={email}
                                icon='mail' iconPosition='left'
                                label='Email Address' placeholder='john.doe@company.com'
                                />
                            <Form.Input fluid
                                type='password'
                                onChange={this.handleInputChange}
                                name='password'
                                value={password}
                                icon='lock' iconPosition='left'
                                label='Password' placeholder='Password'
                                />

                            <Button style={{ marginTop: 20 }} floated='right'
                                onClick={this.handleSubmit}
                                circular
                                color='blue' className={"round"} type='submit'>LOGIN</Button>
                        </Form>
                    </Segment>

                    <div className={"xlink"} onClick={() => this.props.history.push('/register')}>
                        Dont have an account yet?
                    </div>

                </div>
                <Loading 
                    onClose={()=>this.state.error?this.setState({loading: false, error: false}):null}
                    loading={this.state.loading} 
                    error={this.state.error} 
                    message={this.state.errorMessage} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        LOGIN_STATUS: state.user.meta.LOGIN_STATUS,
        token: state.user.data.token,
    }
}

const mapDispatchToProps = {
    login,
    getTaskTypes
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
