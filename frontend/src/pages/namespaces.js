import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Label, Card, CardHeader, CardBody, Collapse, Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu,
  NavLink, Button, Form, Input, CardTitle, CardText } from 'reactstrap';
import {AddMachineModal, AddNamespaceModal} from '../components/Namespace';
import ba from '../core/backendAgent';

class Namespaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActive: '',
      namespaces: [],
      machines: [],
      filter: '',
      dropdownOpen: false,
    }
    this.toggle = this.toggle.bind(this);
  }
  filter(evt) {
    this.setState({filter: evt.target.value})
  }
  selectTab(name) {
    return () => {
      this.setState({ ...this.state, ...{tabActive: name}});
      this.loadNamespaceDetail(name);
    }
  }
  AddMachineModal() {
    this._AddMachineModal.toggle();
  }
  AddNamespaceModal() {
    this._AddNamespaceModel.toggle();
  }
  toggle() {
    this.setState({...this.state, ...{
      dropdownOpen: !this.state.dropdownOpen}
    });
  }
  async loadNamespaces() {
    try{
      let resp = await ba.get('/nss');
      if (resp.statusCode == 200 && resp.body.r == 'ok') {
        const nss = resp.body.data;
        this.setState({tabActive: nss[0], namespaces: nss, machines: []});
        await this.loadNamespaceDetail(nss[0]);
      }
    }catch(e){}
  }
  async loadNamespaceDetail(name) {
    try{
      let resp = await ba.get(`/ns/${name}`);
      let body = resp.body;
      if (typeof resp.body == 'string') {
        body = JSON.parse(resp.body);
      }
      if (resp.statusCode == 200 && resp.body.r == 'ok') {
        this.setState({machines: resp.body.data.machines});
      } else {
        this.setState({machines: []});
      }
    }catch(e) {
      this.setState({machines: []});
    }
  }
  componentDidMount() {
    this.loadNamespaces();
  }
	render() {
		return (
			<div className="margin-top-30 margin-bottom-30">
        <AddMachineModal ref={(child) => {this._AddMachineModal = child;}} onConfirm={(o) => {console.log(o);}} namespaces={this.state.namespaces} />
        <AddNamespaceModal ref={child => this._AddNamespaceModel = child} onConfirm={o => console.log(o)} />
				<Container>
					<Row>
						<Col md={{size: 12}}>
							<Nav tabs>
                {
                  this.state.namespaces.map((item) => (
                    <NavItem key={item} onClick={this.selectTab(item)}>
                      <NavLink
                        href="#"
                        active={this.state.tabActive == item}
                      >
                        {item}
                      </NavLink>
                    </NavItem>
                  ))
                }
                <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle nav caret>
                  Add
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.AddNamespaceModal.bind(this)}>Add Namespace</DropdownItem>
                    <DropdownItem onClick={this.AddMachineModal.bind(this)}>Add Machine</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <NavItem className="ml-auto">
                  <Form inline>
                    <Label>Filter:&nbsp;</Label>
                    <Input id="machineFilter" type="text" onChange={this.filter.bind(this)}></Input>
                  </Form>
                </NavItem>
              </Nav>
						</Col>
					</Row>
          <Row>
            {
              this.state.machines.filter(item => {
                if (this.state.filter == '') {
                  return true;
                } else {
                  let reg = this.state.filter.replace(/ /g, '.*');
                  let regexp = new RegExp(reg, 'i');
                  if (item.name && item.name.match(regexp)) {
                    return true;
                  }
                  if (item.ip.match(regexp)) {
                    return true;
                  }
                  if (item.desc && item.desc.match(regexp)) {
                    return true;
                  }
                }
              }).map((item) => (
                <Col md="3" key={item.id} style={{paddingTop: 10}}>
                  <Card color="info" className="text-white">
                    <CardHeader>
                      {item.name ? item.name : item.ip}
                      <button className="close text-white"><span aria-hidden>&times;</span></button>
                      <button className="close text-white" style={{marginRight: 15}}><i className="fa fa-file-text-o"></i></button>
                    </CardHeader>
                    <CardBody>
                    <CardTitle>{`IP: ${item.ip}`}</CardTitle>
                    <CardText style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                      Desc:&nbsp;{item.desc ? item.desc : ''}
                    </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))
            }
          </Row>
				</Container>
			</div>
		);
	}
}

export default Namespaces;

