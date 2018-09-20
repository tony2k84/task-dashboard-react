import React, { Component } from 'react';
import { Button, Grid, Header, Icon, Statistic } from 'semantic-ui-react';

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
            totalTasks: 100,
            overDue: 4,
            upcoming: 96,
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            activeUpcomingFilter: "1",
            loading: false,
        }
        this.addTask = React.createRef();
        this.completeTask = React.createRef();
    }

    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if (isSuccessNow(this.props.COMPLETE_TASK_STATUS, nextProps.COMPLETE_TASK_STATUS) ||
            isSuccessNow(this.props.ADD_TASK_STATUS, nextProps.ADD_TASK_STATUS)) {
            const { projectId } = this.props.selectedProject;
            this.props.getProjectTasks(this.props.token, projectId);
        }
        else if (isSuccessNow(this.props.GET_TASKS_STATUS, nextProps.GET_TASKS_STATUS)) {
            this.setState({ loading: false });
        }
    }
    toDateFormat1 = (timestamp) => {
        var d = new Date(timestamp);
        const { months } = this.state;
        if (timestamp)
            return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
        else
            return '(No History)'
    }
    getDaysBetween = (from, to) => {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.abs((to - from) / (oneDay));
    }
    renderTaskSummary = () => {
        const { totalTasksCount, overDueTasksCount, upcomingTasksCount } = this.props;
        return (
            <Statistic.Group size='mini' widths={3}>
                <Statistic>
                    <Statistic.Value>{totalTasksCount}</Statistic.Value>
                    <Statistic.Label>Total</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{overDueTasksCount}</Statistic.Value>
                    <Statistic.Label>Due</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{upcomingTasksCount}</Statistic.Value>
                    <Statistic.Label>Upcoming</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        )
    }
    renderTaskTypes = () => {

        const { tasksByTaskType } = this.props;
        return tasksByTaskType.map((item, index) =>
            <div key={index} className={"row space-between color-default padding-vertical"}>
                <div className={"row"}>
                    <Icon className={"color-default"} size='large' name='cube' />
                    <span style={{paddingLeft: 5}}>{item[0]}</span>
                </div>
                <span style={{paddingRight: 10}}>{item[1]}</span>
            </div>
        )
    }
    renderDueTasks = () => {
        const { overDueTasks } = this.props;
        return overDueTasks.map((item, index) => {
            const days = this.getDaysBetween(item.nextRun, Date.now());
            return (
                <div key={index}
                    style={{ cursor: 'pointer', padding: 10, }}
                    onClick={() => console.log(this.completeTask.current.open(item))}
                    className={"row space-between align-center"}>
                    <Header as='h5' style={{ margin: 0 }}>
                        {item.description}
                        <Header.Subheader>{item.group}/{item.type} @{item.owner}</Header.Subheader>
                    </Header>
                    <span style={{ textAlign: 'right', fontSize: 12 }} className={days === 0 ? "color-ember" : "color-red"}>
                        {
                            days === 0 ? "TODAY" : days === 1 ? "YESTERDAY" : days + " DAYS AGO"
                        }
                    </span>
                </div>
            )
        }
        )
    }
    renderUpcomingTasks = () => {
        const { upcomingTasks } = this.props;
        return upcomingTasks.map((item, index) => {
            const days = this.getDaysBetween(Date.now(), item.nextRun);
            return (
                <div key={index}
                    style={{ cursor: 'pointer', padding: 10, }}
                    onClick={() => console.log(this.completeTask.current.open(item))}
                    className={"row space-between align-center"}>
                    <Header as='h5' style={{ margin: 0 }}>
                        {item.description}
                        <Header.Subheader>{item.group}/{item.type} @{item.owner}</Header.Subheader>
                    </Header>
                    <span style={{ textAlign: 'right', fontSize: 12 }} className={"color-default"}>
                        {
                            days <= 1 ? "TOMORROW" : this.toDateFormat1(item.nextRun)
                        }
                    </span>

                </div>
            )
        }
        )
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

    render() {
        const { selectedProject, overDueTasksCount, upcomingTasksCount } = this.props;
        return (
            <Grid className={"content"} columns={3}>
                <Grid.Column width={6} style={{ padding: 5 }}>
                    <Header as="h4" style={{ marginBottom: 2, color: '#FF0000' }}>
                        Overdue Tasks
                        <Header.Subheader><b>{overDueTasksCount}</b> Tasks</Header.Subheader>
                    </Header>
                    <div className={"content-col"}>
                        {this.renderDueTasks()}
                    </div>
                </Grid.Column>
                <Grid.Column width={6} style={{ padding: 5 }}>
                    <Header as="h4" style={{ marginBottom: 2, color: '#004EFF' }}>
                        Upcoming Tasks
                        <Header.Subheader><b>{upcomingTasksCount}</b> Tasks</Header.Subheader>
                    </Header>
                    <div className={"content-col"}>
                        {this.renderUpcomingTasks()}
                    </div>
                </Grid.Column>
                <Grid.Column width={4} style={{ padding: 5 }}>
                    <Header as="h4" style={{ marginBottom: 2 }}>&nbsp;<Header.Subheader>&nbsp;</Header.Subheader></Header>
                    <div className={"content-col"} style={{ padding: 15 }}>
                        <div className={"row space-between align-center"}>
                            <Header style={{ margin: 0 }} as="h3">{selectedProject.projectName}</Header>
                            <Button
                                onClick={() => this.addTask.current.open()}
                                basic className={"default"} compact>New Task</Button>
                        </div>

                        <Header as="h4">Task Summary</Header>
                        {this.renderTaskSummary()}

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
        totalTasksCount: state.task.data.totalTasksCount,
        overDueTasksCount: state.task.data.overDueTasksCount,
        upcomingTasksCount: state.task.data.upcomingTasksCount,
        overDueTasks: state.task.data.overDueTasks,
        upcomingTasks: state.task.data.upcomingTasks,
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
