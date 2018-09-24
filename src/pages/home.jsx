import React, { Component } from 'react';
import { Dropdown, Header, Label } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Admin from './admin';
import SwitchProject from '../components/switch-project';
import Loading from '../components/loading';

//redux
import { connect } from 'react-redux';
import { logout } from '../redux/actions/user';
import { selectProject, getProjectTasks } from '../redux/actions/project';
import { getTaskTypes } from '../redux/actions/task-type';
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
                { key: 'admin', text: 'ADMIN', value: 'ADMIN', disabled: props.type==='member' },
                { key: 'log-out', text: 'LOGOUT', value: 'LOGOUT' },
            ],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            loading: false,
            selectedProject: props.selectedProject,
        }
        this.switchProj = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (isSuccessNow(this.props.LOGOUT_STATUS, nextProps.LOGOUT_STATUS)
            || isFailNow(this.props.LOGOUT_STATUS, nextProps.LOGOUT_STATUS)) {
            this.setState({ loading: false })
            this.props.history.replace('/');
        } 
        if(isSuccessNow(this.props.SELECT_PROJECT_STATUS, nextProps.SELECT_PROJECT_STATUS)){
            // get project tasks
            this.setState({selectedProject: nextProps.selectedProject});
            this.props.getTaskTypes(this.props.token, nextProps.selectedProject.projectId);
        }
        if(isSuccessNow(this.props.GET_TASK_TYPE_STATUS, nextProps.GET_TASK_TYPE_STATUS)){
            // get project tasks
            this.props.getProjectTasks(this.props.token, nextProps.selectedProject.projectId);
        }
        if (isSuccessNow(this.props.GET_TASKS_STATUS, nextProps.GET_TASKS_STATUS)) {
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
                this.setState({loading: true});
                this.props.logout(this.props.token);
                break;
            default:
                break;
        }
    }
    updateProject = (project) => {
        const { projectId, name } = project;
        this.setState({ selectedProject: project, loading: true });
        this.props.selectProject(projectId, name);
    } 

    goHome = () => {
        // update project
        console.log(this.state.selectedProject);
        if(this.state.selectedProject){
            this.updateProject(this.state.selectedProject);
        }
        this.props.history.push('/home');
    }
    render() {
        const { profileOptions } = this.state;
        const { selectedProject } = this.props;
        return (
            <div className={"main-container"}>
                <div className={"nav row space-between align-center"}>
                    <Header as="h2" color='blue' style={{ cursor: 'pointer', margin: 0 }}
                        onClick={() => this.goHome() }>Task Dashboard
                        <Header.Subheader style={{fontSize: 13}}>{this.toDateFormat1(Date.now())}</Header.Subheader>
                    </Header>
                    <div className={"row align-center padding-horizontal"}>
                        <Label as='a' size='large' className={"round"}
                            onClick={() => this.switchProj.current.open()}>
                            {selectedProject.name?selectedProject.name:"SELECT PROJECT"}
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
        SELECT_PROJECT_STATUS: state.project.meta.SELECT_PROJECT_STATUS,
        GET_TASK_TYPE_STATUS: state.taskType.meta.GET_TASK_TYPE_STATUS,
        GET_TASKS_STATUS: state.task.meta.GET_TASKS_STATUS,
        token: state.user.data.token,
        name: state.user.data.userDetails.name,
        type: state.user.data.userDetails.type,
        members: state.user.data.userDetails.members,
        selectedProject: state.project.data.selectedProject,
    }
}

const mapDispatchToProps = {
    selectProject,
    getTaskTypes,
    getProjectTasks,
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)