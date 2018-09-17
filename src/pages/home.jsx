import React, { Component } from 'react';
import { Dropdown, Header, Input, Icon, Label } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Admin from './admin';
import SwitchProject from '../components/switch-project';

//redux
import { connect } from 'react-redux';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProject: props.members?props.members[0]:{projectId: '0', name: 'NO PROJECT'},
            application: '',
            profileOptions: [
                {
                    key: 'user',
                    text: (
                        <span>
                            Signed in as <strong>{props.name}</strong>
                        </span>
                    ),
                    disabled: true,
                },
                { key: 'admin', text: 'ADMIN', value: 'ADMIN' },
                { key: 'log-out', text: 'LOGOUT', value: 'LOGOUT' },
            ],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

        }
        this.switchProj = React.createRef();
    }

    toDateFormat1 = (timestamp) => {
        var d = new Date(timestamp);
        const { months } = this.state;
        return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }

    handleMenuOptions = (e, { value }) => {
        switch (value) {
            case 'ADMIN':
                this.props.history.push('/home/admin');
                break;
            case 'LOGOUT':
                this.props.history.replace('/');
                break;
            default:
                break;
        }
    }

    updateProject = (project) => {
        this.setState({selectedProject: project})
    }
    render() {
        const { selectedProject, application, profileOptions } = this.state;
        return (
            <div className={"main-container"}>
                <div className="nav">
                    <Header as="h2" style={{ cursor: 'pointer', margin: 0 }} 
                        onClick={() => this.props.history.push('/home')}>Task Dashboard</Header>
                    <div className={"row align-center padding-horizontal"}>
                        <Label as='a' size='large'
                            onClick={()=>this.switchProj.current.open()}>
                            <Icon name='barcode' />
                            {selectedProject.name}
                        </Label>
                        <div style={{ padding: 10 }} />
                        <Input icon='search' placeholder='Application Name' value={application} />

                        <Dropdown onChange={this.handleMenuOptions} style={{ marginLeft: 10 }} trigger={<span><Icon name='user outline' />Hello, {this.props.name}</span>} options={profileOptions} />
                    </div>
                </div>

                <Route exact path="/home" component={Dashboard} />
                <Route exact path="/home/admin" component={Admin} />

                <div className={"row space-between padding-horizontal padding-vertical"}>
                    <span style={{ color: '#939090' }}>{this.toDateFormat1(Date.now())}</span>
                    <span style={{ color: '#939090' }}>All right reserved</span>
                </div>

                <SwitchProject ref={this.switchProj}
                    projects={this.props.members}
                    selectProject={this.updateProject}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.user.data.userDetails.name,
        members: state.user.data.userDetails.members,
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)