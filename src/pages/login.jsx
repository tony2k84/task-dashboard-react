import React, { Component } from 'react';
import background from '../assets/background.jpeg';
import { Segment, Form, Input, Button } from 'semantic-ui-react';

//redux
import { connect } from 'react-redux';
import { login } from '../redux/actions/user';
import { getTaskTypes } from '../redux/actions/task-type';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.LOGIN_STAUTS !== 'SUCCESS' && nextProps.LOGIN_STATUS === 'SUCCESS') {
            this.props.getTaskTypes(nextProps.token);
            this.props.history.push('/home');
        }
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.login(email, password);
    }
    render() {
        const { email, password } = this.state;
        return (
            <div style={{ height: '100%', backgroundSize: 'cover', backgroundImage: `url(${background})` }}>
                <div className={"col align-center justify-center"} style={{ height: '100%', backgroundColor: 'rgba(50, 50, 50, 0.8)' }}>
                    <Segment style={{ width: 350, borderRadius: 0, padding: 20 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Email Address</label>
                                <Input name='email' onChange={this.handleInputChange} value={email} icon='mail' iconPosition='left' placeholder='john.doe@company.com' />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Input name='password' onChange={this.handleInputChange} value={password} type='password' icon='lock' iconPosition='left' placeholder='Password' />
                            </Form.Field>
                            <Button floated='right' style={{ marginTop: 20 }}
                                onClick={this.handleSubmit}
                                basic className={"selected"} type='submit'>LOGIN</Button>
                        </Form>
                    </Segment>
                    <div className={"xlink"} onClick={() => this.props.history.push('/register')}>
                        Dont have an account yet?
                    </div>
                </div>
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
