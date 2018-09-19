import React, { Component } from 'react';
import { Button, Grid, Header, Icon, Label } from 'semantic-ui-react';

//redux
import { connect } from 'react-redux';
import { addTask } from '../redux/actions/task';
import AddTask from '../components/new-task';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalTasks: 100,
            overDue: 4,
            upcoming: 96,
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            activeUpcomingFilter: "1",
            dueTaskCount: 0,
            upcomingTaskCount: 0,
        }
        this.addTask = React.createRef();
    }

    componentDidMount() {
        
    }

    toDateFormat1 = (timestamp) => {
        var d = new Date(timestamp);
        const { months } = this.state;
        if(timestamp)
        return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
        else
        return '(No History)'
    }

    getDaysBetween = (from, to) => {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((to - from) / (oneDay)));
    }

    renderTaskSummary = () => {
        const { totalTasksCount, overDueTasksCount, upcomingTasksCount } = this.props;
        return (
            <React.Fragment>
                <div className={"row space-between color-default padding-vertical"}>
                    <div className={"row"}>
                        <Icon className={"color-default"} name='dot circle' />
                        <span>Tasks</span>
                    </div>
                    <span>{totalTasksCount}</span>
                </div>
                <div className={"row space-between color-default padding-vertical"}>
                    <div className={"row"}>
                        <Icon className={"color-red"} name='dot circle' />
                        <span>Over due</span>
                    </div>
                    <span>{overDueTasksCount}</span>
                </div>
                <div className={"row space-between color-default padding-vertical"}>
                    <div className={"row"}>
                        <Icon className={"color-blue"} name='dot circle' />
                        <span>Upcoming</span>
                    </div>
                    <span>{upcomingTasksCount}</span>
                </div>
            </React.Fragment>
        )
    }
    renderTaskTypes = () => {

        const { tasksByTaskType } = this.props;
        return tasksByTaskType.map((item, index) =>
            <div key={index} className={"row space-between color-default padding-vertical"}>
                <div className={"row"}>
                    <Icon className={"color-default"} name='bookmark outline' />
                    <span>{item[0]}</span>
                </div>
                <span>{item[1]}</span>
            </div>
        )
    }
    renderDueTasks = () => {
        const { overDueTasks } = this.props;
        return overDueTasks.map((item, index) => {
            const days = this.getDaysBetween(item.nextRun, Date.now());
            return (
                <div key={index} className={"row space-between padding-vertical"}>
                    <div className="row align-center">
                        <Icon className={days === 0 ? "color-ember" : "color-red"} name="dot circle" />
                        <div style={{ paddingLeft: 5 }}>
                            <div>{item.description}</div>
                            <div className={"row align-center"}
                                style={{ fontSize: 13, color: '#939090', marginTop: 3 }}>
                                <span style={{ marginBottom: 3, marginRight: 3 }}>@{item.owner}</span>
                                <Label.Group size='small'>
                                    <Label>{item.group}</Label>
                                    <Label>{item.type}</Label>
                                </Label.Group>
                            </div>
                        </div>
                    </div>
                    <span style={{ textAlign: 'right', fontSize: 12 }} className={days === 0 ? "color-ember" : "color-red"}>
                        {
                            days === 0 ? "TODAY" : days + " DAYS OVERDUE"
                        }
                    </span>
                </div>
            )
        }
        )
    }
    renderUpcomingTasks = () => {
        const { upcomingTasks } = this.props;
        return upcomingTasks.map((item, index) =>
            <div key={index} className={"row space-between padding-vertical"}>
                <div className="row align-center">
                    <Icon className={"color-blue"} name="dot circle" />
                    <div style={{ paddingLeft: 5 }}>
                        <div>{item.description}</div>
                        <div className={"row align-center"}
                            style={{ fontSize: 13, color: '#939090', marginTop: 3 }}>
                            <span style={{ marginBottom: 3, marginRight: 3 }}>@{item.owner}</span>
                            <Label.Group size='small'>
                                <Label>{item.group}</Label>
                                <Label>{item.type}</Label>
                            </Label.Group>
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: 12, textAlign: 'right' }}>
                    <div style={{ color: '#707070' }}>{this.getDaysBetween(Date.now(), item.nextRun)} DAYS TO GO</div>
                    <div style={{ marginTop: 5, color: '#B2B2B2' }}>Last on {this.toDateFormat1(item.lastRun)}</div>
                </div>

            </div>
        )
    }

    updateUpcomingTasks = (e, { value }) => {
        this.setState({ activeUpcomingFilter: value })
    }

    saveTask = (type, group, description, nextRun, owner) => {
        const { token, selectedProject } = this.props;
        this.props.addTask(token, selectedProject.projectId, type, group, description, nextRun, owner);
    }

    render() {
        const { activeUpcomingFilter } = this.state;
        const { selectedProject, overDueTasksCount, upcomingTasksCount } = this.props;
        return (
            <Grid className={"content"} columns={3}>
                <Grid.Column width={6}>
                    <Header as="h4" style={{ color: '#FF0000' }}>
                        Overdue Tasks
                            <Header.Subheader>{overDueTasksCount} Tasks</Header.Subheader>
                    </Header>
                    <div className={"content-col"}>
                        {this.renderDueTasks()}
                    </div>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Header as="h4" style={{ color: '#004EFF' }}>
                        Upcoming Tasks
                        <Header.Subheader>{upcomingTasksCount} Tasks</Header.Subheader>
                    </Header>
                    <div className={"content-col"}>
                        <div className={"row space-between"}>
                            <Button value="1" className={activeUpcomingFilter === "1" ? "selected" : "default"} basic onClick={this.updateUpcomingTasks}>All Upcoming</Button>
                            <Button value="2" className={activeUpcomingFilter === "2" ? "selected" : "default"} basic onClick={this.updateUpcomingTasks}>Due in 7 Days</Button>
                            <Button value="3" className={activeUpcomingFilter === "3" ? "selected" : "default"} basic onClick={this.updateUpcomingTasks}>Due in 30 Days</Button>
                        </div>
                        <div style={{ padding: 10 }} />
                        {this.renderUpcomingTasks()}
                    </div>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Header as="h4">&nbsp;<Header.Subheader>&nbsp;</Header.Subheader></Header>
                    <div className={"content-col"}>
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
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
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
}

//export default Dashboard;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
