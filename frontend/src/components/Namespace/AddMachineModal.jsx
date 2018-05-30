import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types';

class AddMachineModal extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    model: PropTypes.object,
    namespaces: PropTypes.arrayOf(PropTypes.string).isRequired,
    isEdit: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      model: {
        ip: props.model? props.model.ip : '',
        password: props.model? props.model.password : '',
        ns: props.model? props.model.ns : props.namespaces[0],
      }
    };
    this.toggle = this.toggle.bind(this);
    this.change = this.change.bind(this);
  }
  componentDidUpdate(props) {
    this.state.model.ns = this.state.model.ns ? this.state.model.ns :  props.namespaces[0];
  }
  change(field) {
    return evt => {
      this.setState({model: {
        ...this.state.model, ...{[field]: evt.target.value}
      }});
    }
  }
  confirm() {
    this.toggle();
    this.props.onConfirm(this.state.model);
  }
  toggle() {
    this.setState({
      model: {},
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div>
        <Modal backdrop={false} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.isEdit ? 'Edit' : 'Add'} Machine</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label for="IP">IP</Label>
              <Input type="text" required placeholder="e.g. 127.0.0.1" defaultValue={this.state.model.ip} onChange={this.change('ip')}/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Root Password</Label>
              <Input type="password" defaultValue={this.state.model.password} onChange={this.change('password')}/>
            </FormGroup>
            <FormGroup>
            <Label for="namespace">Namespace</Label>
              <Input type="select" defaultValue={this.state.model.ns} onChange={this.change('ns')}>
              {
                this.props.namespaces.map((item) => (
                  <option key={`AddMachineModal_${item}`} value={item}>{item}</option>
                ))
              }
              </Input>
            </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirm.bind(this)}>{this.props.isEdit ? 'Edit' : 'Add'}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddMachineModal;