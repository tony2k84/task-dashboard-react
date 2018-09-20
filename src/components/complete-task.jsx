import React, { Component } from 'react';
import { Modal, Button, Header, Form, Item } from 'semantic-ui-react';

export default class CompleteTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            nextRun: '',
            lastRun: this.toDateFormat1(Date.now()),
            task: {}
        }
    }
    open = (task) => this.setState({
        task: task,
        modalOpen: true,
        nextRun: '',
    })
    close = () => this.setState({ modalOpen: false })

    completeTask = () => {
        const { _id } = this.state.task;
        const { lastRun, nextRun } = this.state;
        var dateSplit, d, lastRunTS, nextRunTS;
        if (lastRun) {
            dateSplit = lastRun.split("/");
            d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
            lastRunTS = d.getTime();
        }
        if (nextRun) {
            dateSplit = nextRun.split("/");
            d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
            nextRunTS = d.getTime();
        }
        this.props.closeTask(_id, lastRunTS, nextRunTS);
        this.close();
    }
    handleInputChange = (event, data) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.type === 'text' ? target.value : data.value;
        const name = target.name ? target.name : data.name;

        this.setState({
            [name]: value
        });
    }

    toDateFormat1 = (timestamp) => {
        var d = new Date(timestamp);
        return d.getDate().toString().padStart(2, "0") + "/" + (d.getMonth() + 1).toString().padStart(2, "0") + "/" + d.getFullYear();
    }
    render() {
        const { modalOpen, nextRun, lastRun } = this.state;
        const { type, group, description, owner } = this.state.task;
        return (
            <Modal size='mini' open={modalOpen} onClose={this.close}>
                <Header icon='dot circle' content='Complete Task' />
                <Modal.Content>
                    <Form size='small'>
                            <Form.Field>
                                <label>Task Group</label>
                                <div className={"color-default"}>{group}</div>
                            </Form.Field>
                            <Form.Field>
                                <label>Task Type</label>
                                <div className={"color-default"}>{type}</div>
                            </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <div className={"color-default"}>{description}</div>
                        </Form.Field>
                        <Form.Field>
                            <label>Owner</label>
                            <div className={"color-default"}>{owner}</div>
                        </Form.Field>
                        <Form.Field>
                            <label>Completion Date</label>
                            <input name='lastRun' value={lastRun}
                                onChange={this.handleInputChange}
                                placeholder='DD/MM/YYYY' />
                        </Form.Field>
                        <Form.Field>
                            <label>Next Due</label>
                            <input name='nextRun' value={nextRun}
                                onChange={this.handleInputChange}
                                placeholder='DD/MM/YYYY' />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic
                        onClick={() => this.completeTask()}
                        className={"selected"} content='COMPLETE' />
                </Modal.Actions>
            </Modal>
        )
    }
}
