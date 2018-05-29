import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

class Packages extends Component {
	render() {
		return (
			<div className="margin-top-30 margin-bottom-30">
				<Container>
					<Row>
						<Col md={{size: 6, offset: 3}}>
							<article className="boxIcon hover text-center">
								<i className="icon-unlink iconBig iconRounded" />
								<h1>Packages</h1>
							</article>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Packages;

