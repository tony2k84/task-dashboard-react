import React, { Component } from 'react';
import { Button, Grid, Header, Input, Icon } from 'semantic-ui-react';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                { name: 'Maxis AM', tasks: 100 }
            ],
            taskTypes: [
                { name: 'SSL Tracker', tasks: 100 }
            ]
        }
    }

    renderProjects = () => {
        const { projects } = this.state;
        return projects.map((item, index) => {
            return (
                <div key={index} className={"row space-between padding-vertical"}>
                    <div className="row align-center">
                        <Icon name="barcode" />
                        <div style={{ paddingLeft: 5 }}>
                            <div>{item.name}</div>
                            <div style={{ fontSize: 13, color: '#939090' }}>{item.tasks} Tasks</div>
                        </div>
                    </div>
                    <span style={{ fontSize: 12 }}>
                        <Button basic className={"default"}>DELETE</Button>
                    </span>
                </div>
            )
        })
    }

    renderTaskTypes = () => {
        const { taskTypes } = this.state;
        return taskTypes.map((item, index) => {
            return (
                <div key={index} className={"row space-between padding-vertical"}>
                    <div className="row align-center">
                        <Icon name="bookmark outline" />
                        <div style={{ paddingLeft: 5 }}>
                            <div>{item.name}</div>
                            <div style={{ fontSize: 13, color: '#939090' }}>{item.tasks} Tasks</div>
                        </div>
                    </div>
                    <span style={{ fontSize: 12 }}>
                        <Button basic className={"default"}>DELETE</Button>
                    </span>
                </div>
            )
        })
    }
    render() {
        const { taskTypes, projects } = this.state;
        return (

            <Grid className={"content"} columns={2}>
                <Grid.Column>
                    <div className={"row space-between align-center"} style={{ paddingBottom: 10 }}>
                        <Header as="h3" style={{ margin: 0 }}>
                            Projects
                            <Header.Subheader>{projects.length} Projects</Header.Subheader>
                        </Header>
                        <Input action='Add' placeholder='Project Name' />
                    </div>
                    <div className={"content-col"}>
                        {this.renderProjects()}
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div className={"row space-between align-center"} style={{ paddingBottom: 10 }}>
                        <Header as="h3" style={{ margin: 0 }}>
                            Task Type
                            <Header.Subheader>{taskTypes.length} Task Types</Header.Subheader>
                        </Header>
                        <Input action='Add' placeholder='Task Type' />
                    </div>
                    <div className={"content-col"}>
                        {this.renderTaskTypes()}
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Admin;       