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
								<h1>页面无法找到</h1>
								<p>您所请求的页面可能被移除或者暂时无法访问。</p>
								<a href="/" className="btn btn-lg btn-primary mt15">回到首页</a>
							</article>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default NotFound;

