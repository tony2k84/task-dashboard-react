import React, { Component } from 'react';
import { Button, Grid, Header, Statistic, Label, Input, Breadcrumb } from 'semantic-ui-react';

//redux
import { connect } from 'react-redux';
import { addTask, completeTask } from '../redux/actions/task';
import { getProjectTasks } from '../redux/actions/project';
import AddTask from '../components/new-task';
import CompleteTask from '../components/complete-task';
import Loading from '../components/loading';
import { isSuccessNow } from '../utils/string-utils';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            loading: false,
            taskCount: 0,
            tasks: [],
            group: '',
            taskType: '',
        }
        this.addTask = React.createRef();
        this.completeTask = React.createRef();
    }
    componentWillReceiveProps(nextProps) {
        if (isSuccessNow(this.props.COMPLETE_TASK_STATUS, nextProps.COMPLETE_TASK_STATUS) ||
            isSuccessNow(this.props.ADD_TASK_STATUS, nextProps.ADD_TASK_STATUS)) {
            const { projectId } = this.props.selectedProject;
            this.props.getProjectTasks(this.props.token, projectId);
        }
        else if (isSuccessNow(this.props.GET_TASKS_STATUS, nextProps.GET_TASKS_STATUS)) {
            this.setState({ loading: false, tasks: nextProps.tasks });
        }
    }
    toDateFormat1 = (timestamp) => {
        var d = new Date(timestamp);
        const { months } = this.state;
        return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }
    getDaysFromToday = (timestamp) => {
        var d = new Date();
        d.setHours(23, 59, 59, 999);
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var difference_ms = Math.abs(d.getTime() - timestamp);
        var difference_days = Math.round(difference_ms / oneDay);
        return difference_days;
    }
    renderTaskSummary = () => {
        const { taskCount, taskDueCount } = this.props;
        return (
            <Statistic.Group size='mini' widths={3}>
                <Statistic>
                    <Statistic.Value>{taskCount}</Statistic.Value>
                    <Statistic.Label>Total</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{taskDueCount}</Statistic.Value>
                    <Statistic.Label>Due</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{taskCount - taskDueCount}</Statistic.Value>
                    <Statistic.Label>Upcoming</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        )
    }
    renderTaskTypes = () => {

        const { tasksByTaskType } = this.props;
        return tasksByTaskType.map((item, index) =>
            <div key={index} className={"row space-between align-center padding-vertical"}>
                <Header as='h4' color='grey' style={{ margin: 0 }}>{item[0]}</Header>
                <Label className={"round"} size='large' color='blue'>{item[1]}</Label>
            </div>
        )
    }
    renderDue = (timestamp) => {
        const days = this.getDaysFromToday(timestamp);
        return (
            (Date.now() >= timestamp) ?
                <Header style={{ margin: 0 }} sub color='red'>
                    {days <= 2 ? "YESTERDAY" : this.toDateFormat1(timestamp)}
                </Header> :
                <Header style={{ margin: 0 }} sub color='grey'>
                    {days <= 1 ? "TOMORROW" : this.toDateFormat1(timestamp)}
                </Header>
        )
    }
    renderTasks = () => {
        const { tasks } = this.state;
        return tasks.map((item, index) => {
            return (
                <Grid.Row key={index} style={{ cursor: 'pointer', borderBottom: '1px solid #F2F2F2' }}
                    onClick={() => console.log(this.completeTask.current.open(item))}>
                    <Grid.Column width={12}>
                        <Header as='h4'>
                            {item.description}
                            <Header.Subheader>
                                <Breadcrumb size='small'>
                                    <Breadcrumb.Section>{item.group}</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section>{item.type}</Breadcrumb.Section>
                                </Breadcrumb>
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='right' style={{ fontSize: 13 }}>
                        {
                            this.renderDue(item.nextRun)
                        }
                        <Header style={{ margin: 0, paddingTop: 5 }} sub color='grey'>@{item.owner}</Header>
                    </Grid.Column>
                </Grid.Row>
            )
        })
    }
    saveTask = (type, group, description, nextRun, owner) => {
        const { token, selectedProject } = this.props;
        this.setState({ loading: true });
        this.props.addTask(token, selectedProject.projectId, type, group, description, nextRun, owner);
    }
    closeTask = (taskId, lastRun, nextRun) => {
        const { token, completeTask } = this.props;
        const { projectId } = this.props.selectedProject;
        this.setState({ loading: true });
        completeTask(token, projectId, taskId, lastRun, nextRun);
    }
    filterByGroup = (event) => {
        const target = event.target;
        const group = target.value;
        const { tasks } = this.props;
        this.setState({
            tasks: tasks.filter(item => item.group.toLowerCase().includes(group.toLowerCase()))
        });
    }
    filterByType = (event) => {
        const target = event.target;
        const taskType = target.value;
        const { tasks } = this.props;
        this.setState({
            tasks: tasks.filter(item => item.type.toLowerCase().includes(taskType.toLowerCase()))
        });
    }
    render() {
        const { selectedProject, taskCount, } = this.props;
        return (
            <Grid className={"content"} columns={3}>
                <Grid.Column width={10} style={{ padding: 5 }}>
                    <div style={{backgroundColor: '#ffffff', padding: 10, marginBottom: 5}} 
                        className={"row space-between align-center"}>
                        
                        <Header style={{ margin: 0 }} as="h3">Tasks
                            <Header.Subheader>{taskCount} Tasks</Header.Subheader>
                        </Header>
                        <div className={"row"}>
                            <div style={{ padding: 5 }} />
                            <Input icon='search' placeholder='Group Name'
                                name='group' onChange={this.filterByGroup} />
                            <div style={{ padding: 5 }} />
                            <Input icon='search' placeholder='Task Type'
                                name='taskType' onChange={this.filterByType} />
                        </div>
                    </div>
                    <div className={"content-col-less"} style={{ padding: 15 }}>
                        <Grid style={{ padding: 0 }}>
                            {this.renderTasks()}
                        </Grid>
                    </div>
                </Grid.Column>
                <Grid.Column width={6} style={{ padding: 5 }}>
                    <div className={"content-col"} style={{ padding: 15 }}>
                        <div className={"row space-between align-center"}>
                            <Header style={{ margin: 0 }} as="h3">{selectedProject.projectName}</Header>
                            <Button
                                onClick={() => this.addTask.current.open()}
                                basic className={"round"} compact>New Task</Button>
                        </div>

                        <Header as="h4">Task Summary</Header>
                        {this.renderTaskSummary()}

                        <div style={{ paddingTop: 20 }} />

                        <Header as="h4">Task Types</Header>
                        {this.renderTaskTypes()}
                    </div>
                    <AddTask ref={this.addTask}
                        taskTypes={this.props.taskTypes}
                        addTask={this.saveTask} />

                    <CompleteTask ref={this.completeTask}
                        closeTask={this.closeTask} />
                    <Loading loading={this.state.loading} />

                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ADD_TASK_STATUS: state.task.meta.ADD_TASK_STATUS,
        COMPLETE_TASK_STATUS: state.task.meta.COMPLETE_TASK_STATUS,
        GET_TASKS_STATUS: state.task.meta.GET_TASKS_STATUS,
        token: state.user.data.token,
        selectedProject: state.project.data.selectedProject,
        taskTypes: state.taskType.data.taskTypes,
        taskCount: state.task.data.taskCount,
        taskDueCount: state.task.data.taskDueCount,
        tasks: state.task.data.tasks,
        tasksByTaskType: state.task.data.tasksByTaskType,
    }
}

const mapDispatchToProps = {
    addTask,
    completeTask,
    getProjectTasks
}

//export default Dashboard;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
