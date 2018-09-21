import React, { Component } from 'react';
import { Dropdown, Header, Icon, Label } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Admin from './admin';
import SwitchProject from '../components/switch-project';
import Loading from '../components/loading';

//redux
import { connect } from 'react-redux';
import { logout } from '../redux/actions/user';
import { selectProject } from '../redux/actions/project';

import { isSuccessNow, isFailNow } from '../utils/string-utils';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileOptions: [
                {
                    key: 'user',
                    text: (
                        <span className={"color-default"}>
                            Signed in as <strong>{props.name}</strong>
                        </span>
                    ),
                },
                { key: 'admin', text: 'ADMIN', value: 'ADMIN' },
                { key: 'log-out', text: 'LOGOUT', value: 'LOGOUT' },
            ],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            loading: false,

        }
        this.switchProj = React.createRef();
    }

    componentDidMount() {
        const { members } = this.props;
        this.updateProject(members[0]);
    }

    componentWillReceiveProps(nextProps) {
        if (isSuccessNow(this.props.LOGOUT_STATUS, nextProps.LOGOUT_STATUS)
            || isFailNow(this.props.LOGOUT_STATUS, nextProps.LOGOUT_STATUS)) {
            this.setState({ loading: false })
            this.props.history.replace('/');
        } else if (isSuccessNow(this.props.GET_TASKS_STATUS, nextProps.GET_TASKS_STATUS)) {
            this.setState({ loading: false })
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
        this.setState({ selectedProject: project, loading: true });
        this.props.selectProject(token, projectId, name);
    }

    
    render() {
        const { profileOptions } = this.state;
        const { selectedProject } = this.props;
        return (
            <div className={"main-container"}>
                <div className="nav">
                    <Header as="h2" style={{ cursor: 'pointer', margin: 0 }}
                        onClick={() => this.props.history.push('/home')}>Task Dashboard</Header>
                    <div className={"row align-center padding-horizontal"}>
                        <Label as='a' size='large'
                            onClick={() => this.switchProj.current.open()}>
                            {selectedProject.projectName}
                        </Label>
                        <Dropdown 
                            pointing='top left'
                            direction='left'
                            onChange={this.handleMenuOptions} 
                            style={{ marginLeft: 10, marginRight: 10 }} 
                            trigger={<span>Hello, {this.props.name}</span>} 
                            options={profileOptions} />
                    </div>
                </div>

                <Route exact path="/home" component={Dashboard} />
                <Route exact path="/home/admin" component={Admin} />

                <div className={"row space-between padding-horizontal padding-vertical color-default"} style={{fontSize: 12}}>
                    <span>{this.toDateFormat1(Date.now())}</span>
                    <span>All right reserved</span>
                </div>

                <SwitchProject ref={this.switchProj}
                    projects={this.props.members}
                    selectProject={this.updateProject} />

                <Loading loading={this.state.loading} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        LOGOUT_STATUS: state.user.meta.LOGOUT_STATUS,
        GET_TASKS_STATUS: state.task.meta.GET_TASKS_STATUS,
        token: state.user.data.token,
        name: state.user.data.userDetails.name,
        members: state.user.data.userDetails.members,
        selectedProject: state.project.data.selectedProject,
    }
}

const mapDispatchToProps = {
    selectProject,
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)