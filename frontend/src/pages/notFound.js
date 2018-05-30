import React, {Component} from 'react';
import history from '../core/history';
import { Container, Row, Col } from 'reactstrap';

class NotFound extends Component {
	render() {
		return (
			<div className="margin-top-30 margin-bottom-30">
				<Container>
					<Row>
						<Col md={{size: 6, offset: 3}}>
							<article className="boxIcon hover text-center">
								<i className="icon-unlink iconBig iconRounded" />
								<h1>Page Not Found</h1>
								<p>the page you requested does not exist</p>
								<a href="/" className="btn btn-lg btn-primary mt15">Home</a>
							</article>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default NotFound;

