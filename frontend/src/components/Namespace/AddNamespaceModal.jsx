import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types';

class AddNamespaceModel extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      model: {
        ns: '',
      }
    };
    this.toggle = this.toggle.bind(this);
    this.change = this.change.bind(this);
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
              <Label for="namespace">Namespace</Label>
              <Input type="text" required placeholder="e.g. development" defaultValue={this.state.model.ns} onChange={this.change('ns')}/>
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

export default AddNamespaceModel;