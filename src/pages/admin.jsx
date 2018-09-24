import React, { Component } from 'react';
import { Button, Grid, Header, Input, Icon } from 'semantic-ui-react';
import Loading from '../components/loading';

//redux
import { connect } from 'react-redux';
import { addTaskType, getTaskTypes } from '../redux/actions/task-type';
import { addProject, getProjects, addMember } from '../redux/actions/project';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskType: '',
            projectName: '',
            selectedProject: null,
            email: '',
            loading: false,
        }
    }

    componentDidMount() {
        const { token, getProjects } = this.props;
        this.setState({loading: true})
        getProjects(token);
    }

    componentWillReceiveProps(nextProps) {
        
        if (this.props.ADD_TASK_TYPE_STATUS !== 'SUCCESS' && nextProps.ADD_TASK_TYPE_STATUS === 'SUCCESS') {
            // get task types
            this.setState({taskType: ''})
            this.props.getTaskTypes(this.props.token, this.state.selectedProject._id);
        }

        if (this.props.ADD_PROJECT_MEMBER_STATUS !== 'SUCCESS' && nextProps.ADD_PROJECT_MEMBER_STATUS === 'SUCCESS') {
            // update projects
            this.props.getProjects(this.props.token);
        }
        if (this.props.ADD_PROJECT_STATUS !== 'SUCCESS' && nextProps.ADD_PROJECT_STATUS === 'SUCCESS') {
            // update projects
            this.props.getProjects(this.props.token);
        }

        if(this.props.GET_PROJECTS_STATUS !== 'SUCCESS' && nextProps.GET_PROJECTS_STATUS === 'SUCCESS'){
            this.setState({ loading: false});
        }

        if(this.props.GET_TASK_TYPE_STATUS !== 'SUCCESS' && nextProps.GET_TASK_TYPE_STATUS === 'SUCCESS'){
            this.setState({ loading: false});
        }

    }

    addTaskType = (e) => {
        const { taskType, selectedProject } = this.state;
        const { addTaskType, token } = this.props;
        this.setState({ loading: true})
        addTaskType(token, selectedProject._id, taskType);
    }
    addProject = (e) => {
        const { projectName } = this.state;
        const { addProject, token } = this.props;
        this.setState({ loading: true, selectedProject: null, projectName: '' })
        addProject(token, projectName);

    }
    addMember = (e) => {
        const { selectedProject, email } = this.state;
        const { addMember, token } = this.props;
        this.setState({ loading: true, selectedProject: null, email: '' });
        addMember(token, selectedProject._id, selectedProject.name, email);

    }
    selectPrject = (project) => {
        const {token, getTaskTypes} = this.props;
        this.setState({ loading: true, selectedProject: project });
        getTaskTypes(token, project._id);
    }
    renderProjects = () => {
        const { projects } = this.props;
        const { selectedProject } = this.state;
        return projects.map((item, index) => {
            const isCurrentSelected = selectedProject && selectedProject._id === item._id;
            return (
                <div key={index} style={{ cursor: 'pointer' }}
                    className={"row space-between align-center padding-vertical padding-horizontal"}
                    onClick={() => this.selectPrject(item) }>
                    <div className="row align-center padding-horizontal padding-vertical">
                        <div className="row align-center">
                            <Icon color={isCurrentSelected?"blue":"grey"} size='large' 
                                name={isCurrentSelected?"clipboard":"clipboard outline"} />
                            <Header as='h4' color='grey' style={{ margin: 0, marginLeft: 10 }}>
                                {item.name}
                                <Header.Subheader>{item.members.length} Members</Header.Subheader>
                            </Header>
                        </div>
                    </div>
                    <Button color='blue' compact circular>DELETE</Button>
                </div>
            )
        })
    }
    renderProjectMembers = () => {
        const { selectedProject } = this.state;
        return selectedProject.members.map((item, index) => {
            return (
                <div key={index} className={"row space-between align-center padding-vertical padding-horizontal"}>
                    <div className="row align-center">
                        <Icon color='grey' size='large' name="user outline" />
                        <Header as='h4' color='grey' style={{ margin: 0, marginLeft: 10 }}>
                            {item.name}
                            <Header.Subheader>{item.email}</Header.Subheader>
                        </Header>
                    </div>
                    <Button color='blue' compact circular>DELETE</Button>
                </div>
            )
        })
    }
    renderTaskTypes = () => {
        const { taskTypes } = this.props;
        return taskTypes.map((item, index) => {
            return (
                <div key={index} className={"row space-between align-center padding-vertical padding-horizontal"}>
                    <div className="row align-center">
                        <Icon color='grey' size='large' name="sticky note outline" />
                        <Header as='h4' color='grey' style={{ margin: 0, marginLeft: 10 }}>{item.type}</Header>
                    </div>
                    <Button color='blue' compact circular>DELETE</Button>
                </div>
            )
        })
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
        const { taskTypes, projects } = this.props;
        const { selectedProject, projectName, taskType, email } = this.state;
        return (

            <Grid className={"content"} columns={3}>
                <Grid.Column style={{ padding: 5 }}>
                    <div className={"row space-between align-center"} style={{ paddingBottom: 10 }}>
                        <Header as="h4" style={{ margin: 0 }}>
                            Projects
                            <Header.Subheader>{projects.length} Projects</Header.Subheader>
                        </Header>
                        <Input autoComplete="off" onChange={this.handleInputChange} name='projectName'
                            value={projectName}
                            action={{ content: 'Add', onClick: this.addProject }}
                            placeholder='Project Name' />
                    </div>
                    <div className={"content-col-less-2"}>
                        {this.renderProjects()}
                    </div>
                </Grid.Column>
                <Grid.Column style={{ padding: 5 }}>
                    <div className={"row space-between align-center"} style={{ paddingBottom: 10 }}>
                        <Header as="h4" style={{ margin: 0 }}>
                            Project Members
                            <Header.Subheader>{selectedProject?selectedProject.members.length:0} Members</Header.Subheader>
                        </Header>
                        <Input onChange={this.handleInputChange} name='email'
                            autoComplete="off"
                            value={email}
                            disabled={!selectedProject}
                            action={{ content: 'Add', onClick: this.addMember }}
                            placeholder='Email Address' />
                    </div>
                    <div className={"content-col-less-2"}>
                        {selectedProject ? this.renderProjectMembers() : null}
                    </div>
                </Grid.Column>
                <Grid.Column style={{ padding: 5 }}>
                    <div className={"row space-between align-center"} style={{ paddingBottom: 10 }}>
                        <Header as="h4" style={{ margin: 0 }}>
                            Project Task Types
                            <Header.Subheader>{taskTypes.length} Task Types</Header.Subheader>
                        </Header>
                        <Input onChange={this.handleInputChange} name='taskType'
                            autoComplete="off"
                            value={taskType}
                            disabled={!selectedProject}
                            action={{ content: 'Add', onClick: this.addTaskType }}
                            placeholder='Task Type' />
                    </div>
                    <div className={"content-col-less-2"}>
                        {this.renderTaskTypes()}
                    </div>
                    <Loading loading={this.state.loading} />
                </Grid.Column>
            </Grid>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ADD_TASK_TYPE_STATUS: state.taskType.meta.ADD_TASK_TYPE_STATUS,
        GET_TASK_TYPE_STATUS: state.taskType.meta.GET_TASK_TYPE_STATUS,
        ADD_PROJECT_STATUS: state.project.meta.ADD_PROJECT_STATUS,
        GET_PROJECTS_STATUS: state.project.meta.GET_PROJECTS_STATUS,
        ADD_PROJECT_MEMBER_STATUS: state.project.meta.ADD_PROJECT_MEMBER_STATUS,
        token: state.user.data.token,
        taskTypes: state.taskType.data.taskTypes,
        projects: state.project.data.projects,
    }
}

const mapDispatchToProps = {
    addTaskType,
    getTaskTypes,
    addProject,
    getProjects,
    addMember,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
