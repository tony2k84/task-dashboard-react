import React, { Component } from 'react';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';

//redux
import { connect } from 'react-redux';
import { doGetOverDueTasks, doGetUpcomingTasks } from '../redux/actions/task-actions';
import AddTask from '../components/new-task';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalTasks: 100,
            overDue: 4,
            upcoming: 96,
            taskTypes: [
                { type: 'SSL Renewal', count: 100 },
                { type: 'Re-Index', count: 40 }
            ],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            activeUpcomingFilter: "1"
        }
        this.addTask = React.createRef();
    }

    componentDidMount() {
        this.props.doGetOverDueTasks();
        this.props.doGetUpcomingTasks();
    }

    toDateFormat1 = (timestamp) => {
        var d = new Date(timestamp);
        const { months } = this.state;
        return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }

    getDaysBetween = (from, to) => {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((to - from) / (oneDay)));
    }

    renderTaskSummary = () => {
        const { totalTasks, overDue, upcoming } = this.state;
        return (
            <React.Fragment>
                <div className={"row space-between color-default padding-vertical"}>
                    <div className={"row"}>
                        <Icon className={"color-default"} name='dot circle' />
                        <span>Tasks</span>
                    </div>
                    <span>{totalTasks}</span>
                </div>
                <div className={"row space-between color-default padding-vertical"}>
                    <div className={"row"}>
                        <Icon className={"color-red"} name='dot circle' />
                        <span>Over due</span>
                    </div>
                    <span>{overDue}</span>
                </div>
                <div className={"row space-between color-default padding-vertical"}>
                    <div className={"row"}>
                        <Icon className={"color-blue"} name='dot circle' />
                        <span>Upcoming</span>
                    </div>
                    <span>{upcoming}</span>
                </div>
            </React.Fragment>
        )
    }
    renderTaskTypes = () => {
        const { taskTypes } = this.state;
        return taskTypes.map((item, index) =>
            <div key={index} className={"row space-between color-default padding-vertical"}>
                <div className={"row"}>
                    <Icon className={"color-default"} name='bookmark outline' />
                    <span>{item.type}</span>
                </div>
                <span>{item.count}</span>
            </div>
        )
    }
    renderDueTasks = () => {
        const { overDueTasks } = this.props;
        return overDueTasks.map((item, index) => {
            const days = this.getDaysBetween(item.due, Date.now());
            return (
                <div key={index} className={"row space-between padding-vertical"}>
                    <div className="row align-center">
                        <Icon className={days === 0 ? "color-ember" : "color-red"} name="dot circle" />
                        <div style={{ paddingLeft: 5 }}>
                            <div>{item.application} {item.type}</div>
                            <div style={{ fontSize: 13, color: '#939090' }}>@{item.owner}</div>
                        </div>
                    </div>
                    <span style={{ fontSize: 12 }} className={days === 0 ? "color-ember" : "color-red"}>
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
                        <div>{item.application} {item.type}</div>
                        <div style={{ fontSize: 13, color: '#939090' }}>@{item.owner}</div>
                    </div>
                </div>
                <div style={{ fontSize: 12 }}>
                    <div style={{ color: '#707070' }}>{this.getDaysBetween(Date.now(), item.due)} DAYS TO GO</div>
                    <div style={{ color: '#B2B2B2' }}>Last on {this.toDateFormat1(item.last)}</div>
                </div>

            </div>
        )
    }

    updateUpcomingTasks = (e, { value }) => {
        this.setState({ activeUpcomingFilter: value })
    }

    updateProject = () => {
        console.log('update project');
    }

    render() {
        const { activeUpcomingFilter } = this.state;
        return (
            <Grid className={"content"} columns={3}>
                <Grid.Column width={6}>
                    <Header as="h4" style={{ color: '#FF0000' }}>
                        Overdue Tasks
                            <Header.Subheader>4 Tasks</Header.Subheader>
                    </Header>
                    <div className={"content-col"}>
                        {this.renderDueTasks()}
                    </div>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Header as="h4" style={{ color: '#004EFF' }}>
                        Upcoming Tasks
                            <Header.Subheader>50 Tasks</Header.Subheader>
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
                            <Header style={{ margin: 0 }} as="h3">Project Do</Header>
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
                        taskAdded={this.updateProject} />
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        GET_OVERDUE_TASKS_STATUS: state.task.meta.GET_OVERDUE_TASKS_STATUS,
        GET_UPCOMING_TASKS_STATUS: state.task.meta.GET_UPCOMING_TASKS_STATUS,
        overDueTasks: state.task.data.overDueTasks,
        upcomingTasks: state.task.data.upcomingTasks,
    }
}

const mapDispatchToProps = {
    doGetOverDueTasks,
    doGetUpcomingTasks
}

//export default Dashboard;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
