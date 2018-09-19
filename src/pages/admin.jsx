import React, { Component } from 'react';
import { Button, Grid, Header, Input, Icon } from 'semantic-ui-react';

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
        }
    }

    componentDidMount() {
        const { token, getProjects, getTaskTypes } = this.props;
        getProjects(token);
        getTaskTypes(token);
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.ADD_TASK_TYPE_STATUS !== 'SUCCESS' && nextProps.ADD_TASK_TYPE_STATUS === 'SUCCESS') {
            // get new task types
            this.props.getTaskTypes(this.props.token);
        }
        if (this.props.ADD_PROJECT_MEMBER_STATUS !== 'SUCCESS' && nextProps.ADD_PROJECT_MEMBER_STATUS === 'SUCCESS') {
            // update projects
            this.props.getProjects(this.props.token);
        }
        if (this.props.ADD_PROJECT_STATUS !== 'SUCCESS' && nextProps.ADD_PROJECT_STATUS === 'SUCCESS') {
            // update projects
            this.props.getProjects(this.props.token);
        }
        
    }

    addTaskType = (e) => {
        const { taskType } = this.state;
        const { addTaskType, token } = this.props;
        addTaskType(token, taskType);
        this.setState({taskType: ''})
    }
    addProject = (e) => {
        const { projectName } = this.state;
        const { addProject, token } = this.props;
        addProject(token, projectName);
        this.setState({projectName: '', selectedProject: null})

    }
    addMember = (e) => {
        const { selectedProject, email } = this.state;
        const { addMember, token } = this.props;
        addMember(token, selectedProject._id, selectedProject.name, email);
        this.setState({projectName: '', selectedProject: null})

    }
    renderProjects = () => {
        const { projects } = this.props;
        const { selectedProject } = this.state;
        return projects.map((item, index) => {
            return (
                <div key={index} style={{cursor: 'pointer'}} 
                    className={"row space-between padding-vertical"}
                    onClick={()=>this.setState({selectedProject: item})}>
                    <div className="row align-center">
                        <Icon name="bullseye" className={(selectedProject && selectedProject.name === item.name)?"color-blue":"color-default"} />
                        <div style={{ paddingLeft: 5 }}>
                            <div>{item.name}</div>
                            <div style={{ fontSize: 13, color: '#939090' }}>{item.members.length} Members</div>
                        </div>
                    </div>
                    <span style={{ fontSize: 12 }}>
                        <Button basic className={"default"} compact>DELETE</Button>
                    </span>
                </div>
            )
        })
    }
    renderProjectMembers = () => {
        const { selectedProject } = this.state;
        return selectedProject.members.map((item, index) => {
            return (
                <div key={index} className={"row space-between padding-vertical"}>
                    <div className="row align-center">
                        <Icon name="user outline" />
                        <div style={{ paddingLeft: 5 }}>
                            <div>{item.name}</div>
                            <div style={{ fontSize: 13, color: '#939090' }}>{item.email}</div>
                        </div>
                    </div>
                    <span style={{ fontSize: 12 }}>
                        <Button basic className={"default"} compact>DELETE</Button>
                    </span>
                </div>
            )
        })
    }
    renderTaskTypes = () => {
        const { taskTypes } = this.props;
        return taskTypes.map((item, index) => {
            return (
                <div key={index} className={"row space-between padding-vertical"}>
                    <div className="row align-center">
                        <Icon name="bookmark" className={"color-default"}/>
                        <div style={{ paddingLeft: 5 }}>{item.type}</div>
                    </div>
                    <span style={{ fontSize: 12 }}>
                        <Button basic className={"default"} compact>DELETE</Button>
                    </span>
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
                <Grid.Column>
                    <div className={"row space-between align-center"} style={{ paddingBottom: 10 }}>
                        <Header as="h3" style={{ margin: 0 }}>
                            Projects
                            <Header.Subheader>{projects.length} Projects</Header.Subheader>
                        </Header>
                        <Input onChange={this.handleInputChange} name='projectName'
                            value={projectName}
                            action={{ content: 'Add', onClick: this.addProject }}
                            placeholder='Project Name' />
                    </div>
                    <div className={"content-col"}>
                        {this.renderProjects()}
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div className={"row space-between align-center"} style={{ paddingBottom: 10 }}>
                        <Header as="h3" style={{ margin: 0 }}>
                            {!selectedProject?'SELECT A PROJECT':selectedProject.name}
                            <Header.Subheader>
                                {selectedProject?`${selectedProject.members.length} Members`:'SELECT A PROJECT'}
                            </Header.Subheader>
                        </Header>
                        {selectedProject?<Input onChange={this.handleInputChange} name='email'
                            value={email}
                            action={{ content: 'Add', onClick: this.addMember }}
                            placeholder='Email Address' />:null}
                    </div>
                    <div className={"content-col"}>
                        {selectedProject?this.renderProjectMembers():null}
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div className={"row space-between align-center"} style={{ paddingBottom: 10 }}>
                        <Header as="h3" style={{ margin: 0 }}>
                            Task Type
                            <Header.Subheader>{taskTypes.length} Task Types</Header.Subheader>
                        </Header>
                        <Input onChange={this.handleInputChange} name='taskType'
                            value={taskType}
                            action={{ content: 'Add', onClick: this.addTaskType }}
                            placeholder='Task Type' />
                    </div>
                    <div className={"content-col"}>
                        {this.renderTaskTypes()}
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ADD_TASK_TYPE_STATUS: state.taskType.meta.ADD_TASK_TYPE_STATUS,
        GET_TASK_TYPES_STATUS: state.taskType.meta.GET_TASK_TYPES_STATUS,
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
