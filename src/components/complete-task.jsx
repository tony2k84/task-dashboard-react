import React, { Component } from 'react';
import { Modal, Button, Header, Form, Breadcrumb, Input, Icon } from 'semantic-ui-react';
import { RectDatePicker } from 'rect-ui-calendar';

export default class CompleteTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            nextRun: '',
            lastRun: this.toDateFormat1(Date.now()),
            task: {},
            selected: '',
            open: false,
            openType: '',
            showError: false,
            errorMessage: '',
        }
    }
    open = (task) => this.setState({
        task: task,
        modalOpen: true,
        nextRun: '',
        showError: false,
        errorMessage: '',
    })
    close = () => this.setState({ modalOpen: false })

    completeTask = () => {
        const { _id } = this.state.task;
        const { lastRun, nextRun } = this.state;
        var dateSplit, d, lastRunTS, nextRunTS;
        if (lastRun) {
            dateSplit = lastRun.split("/");
            d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
            d.setHours(23, 59, 59, 999);
            lastRunTS = d.getTime();
        }
        if (nextRun) {
            dateSplit = nextRun.split("/");
            d = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
            d.setHours(23, 59, 59, 999);
            nextRunTS = d.getTime();
        }
        this.props.closeTask(_id, lastRunTS, nextRunTS);
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

    onSelect = (selected) => {
        const { openType } = this.state;
        if (openType === 'lastRun')
            this.setState({ open: false, lastRun: this.toDateFormat1(selected) });
        else
            this.setState({ open: false, nextRun: this.toDateFormat1(selected) });
    }
    openCalendar = (openType) => {
        const { nextRun } = this.state;
        var d = new Date();
        var ds = nextRun.split("/");
        d.setDate(ds[0]);
        d.setMonth(ds[1] - 1);
        d.setFullYear(ds[2]);
        d.setHours(0, 0, 0);
        this.setState({ selected: d, openType, open: true })
    }
    render() {
        const { modalOpen, nextRun, lastRun, open } = this.state;
        const { type, group, description, owner } = this.state.task;
        return (
            <Modal size='mini' open={modalOpen} onClose={this.close}>
                <Header icon='dot circle' content='Complete Task' />
                <Modal.Content>
                    <Form size='small' autoComplete="off">
                        <Form.Field>
                            <label>Description</label>
                            <div>{description}</div>
                        </Form.Field>
                        <Form.Field>
                            <label>Task Group</label>
                            <div>{group}</div>
                        </Form.Field>
                        <Form.Field>
                            <label>Task Type</label>
                            <div>{type}</div>
                        </Form.Field>

                        <Form.Field>
                            <label>Owner</label>
                            {owner &&
                                <Breadcrumb size='small'>
                                    <Breadcrumb.Section>{owner.name}</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right angle' />
                                    <Breadcrumb.Section>{owner.email}</Breadcrumb.Section>
                                </Breadcrumb>
                            }
                        </Form.Field>
                        <Form.Field>
                            <label>Completion Date</label>
                            <Input
                                icon={<Icon name='calendar outline' link onClick={() => this.openCalendar('lastRun')} />}
                                iconPosition='left'
                                name='lastRun' value={lastRun}
                                onChange={this.handleInputChange}
                                placeholder='DD/MM/YYYY' />
                        </Form.Field>
                        <Form.Field>
                            <label>Next Due</label>
                            <Input
                                icon={<Icon name='calendar outline' link onClick={() => this.openCalendar('nextRun')} />}
                                iconPosition='left'
                                name='nextRun' value={nextRun}
                                onChange={this.handleInputChange}
                                placeholder='DD/MM/YYYY' />
                        </Form.Field>

                        <RectDatePicker open={open}
                            selected={this.state.selected}
                            onSelect={this.onSelect} />

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        onClick={() => this.completeTask()}
                        color='blue'
                        circular content='COMPLETE' />
                </Modal.Actions>
            </Modal>
        )
    }
}
