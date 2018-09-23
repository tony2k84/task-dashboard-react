import React, { Component } from 'react';
import background from '../assets/background.jpeg';
import { Segment, Form, Input, Icon, Button, Header } from 'semantic-ui-react';
import Loading from '../components/loading';

//redux
import { connect } from 'react-redux';
import { register } from '../redux/actions/user';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            registered: false,
            loading: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props.REGISTER_STATUS, nextProps.REGISTER_STATUS);
        if (this.props.REGISTER_STATUS !== 'SUCCESS' && nextProps.REGISTER_STATUS === 'SUCCESS') {
            this.setState({ loading: false, registered: true });
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
        const { name, email, password } = this.state;
        this.props.register(name, email, password);
        this.setState({loading: true})
    }
    render() {
        const { name, email, password, registered } = this.state;
        return (
            <div style={{ height: '100%', backgroundSize: 'cover', backgroundImage: `url(${background})` }}>
                <div className={"col align-center justify-center"} style={{ height: '100%', backgroundColor: 'rgba(50, 50, 50, 0.8)' }}>
                    <Segment style={{ width: 350, borderRadius: 0, padding: 20 }}>
                        {
                            registered ?
                                <div>
                                    <Header as='h2' color='grey'>
                                        Almost Done!
                                    </Header>
                                    <div className={"color-default"}>
                                        You have successfully created an account here. Please contact the system administrator
                                        to get access to projects.
                                    </div>
                                    <div style={{marginTop: 30}} className={"color-default"}>
                                        <b>Note:</b> You only have access to a personal project.
                                    </div>
                                    <Button floated='right' style={{ marginTop: 23 }}
                                        circular
                                        onClick={()=>this.props.history.replace("/")}
                                        color='blue' type='submit'>LOGIN</Button>
                                </div>:
                                <Form onSubmit={this.handleSubmit} autoComplete="off">
                                    <Form.Field>
                                        <label>Name</label>
                                        <Input name='name' onChange={this.handleInputChange} value={name} icon='user outline' iconPosition='left' placeholder='John Doe' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email Address</label>
                                        <Input name='email' onChange={this.handleInputChange} value={email} icon='envelope outline' iconPosition='left' placeholder='john.doe@company.com' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <Input name='password' onChange={this.handleInputChange} value={password} type='password' icon='lock' iconPosition='left' placeholder='Password' />
                                    </Form.Field>

                                    <Button floated='right' style={{ marginTop: 10 }}
                                        onClick={this.handleSubmit}
                                        circular
                                        color='blue' type='submit'>REGISTER</Button>
                                </Form>
                        }

                    </Segment>
                    <div className={"xlink"} onClick={() => this.props.history.replace('/')}>
                        <Icon name='chevron left' />
                        Back to LOGIN
                    </div>
                    <Loading loading={this.state.loading}/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        REGISTER_STATUS: state.user.meta.REGISTER_STATUS,
    }
}

const mapDispatchToProps = {
    register,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
