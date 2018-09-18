import React, { Component } from 'react';
import { Dropdown, Header, Input, Icon, Label } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Admin from './admin';
import SwitchProject from '../components/switch-project';

//redux
import { connect } from 'react-redux';
import { logout } from '../redux/actions/user';
import { selectProject } from '../redux/actions/project';
import { getTaskTypes } from '../redux/actions/task-type';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: '',
            taskType: '',
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

    componentDidMount() {
        const { members } = this.props;
        this.updateProject(members[0]);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.LOGOUT_STATUS !== 'SUCCESS' && nextProps.LOGOUT_STATUS === 'SUCCESS'){
            this.props.history.replace('/');
        }
        if(this.props.LOGOUT_STATUS !== 'FAILED' && nextProps.LOGOUT_STATUS === 'FAILED'){
            this.props.history.replace('/');
        }
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
                this.props.logout(this.props.token);
                break;
            default:
                break;
        }
    }

    updateProject = (project) => {
        const { token } = this.props;
        const { projectId, name } = project;
        this.setState({ selectedProject: project });
        this.props.selectProject(token, projectId, name);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    render() {
        const { group, profileOptions, taskType } = this.state;
        const { selectedProject } = this.props;
        return (
            <div className={"main-container"}>
                <div className="nav">
                    <Header as="h2" style={{ cursor: 'pointer', margin: 0 }}
                        onClick={() => this.props.history.push('/home')}>Task Dashboard</Header>
                    <div className={"row align-center padding-horizontal"}>
                        <Label as='a' size='large'
                            onClick={() => this.switchProj.current.open()}>
                            <Icon name='bullseye' />
                            {selectedProject.projectName}
                        </Label>
                        <div style={{ padding: 10 }} />
                        <Input icon='search' placeholder='Task Type' name='taskType' value={taskType} onChange={this.handleInputChange} />
                        <div style={{ padding: 10 }} />
                        <Input icon='search' placeholder='Group Name' name='group' value={group} onChange={this.handleInputChange} />
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
                    selectProject={this.updateProject} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        LOGOUT_STATUS: state.user.meta.LOGOUT_STATUS,
        token: state.user.data.token,
        name: state.user.data.userDetails.name,
        members: state.user.data.userDetails.members,
        selectedProject: state.project.data.selectedProject,
    }
}

const mapDispatchToProps = {
    selectProject,
    getTaskTypes,
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)