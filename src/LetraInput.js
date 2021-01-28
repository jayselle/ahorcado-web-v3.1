import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import { API } from './constants';

class LetraInput extends Component {

	handleSubmit = (response) => {
		this.props.onSubmit && this.props.onSubmit(response);
	}

	render() {
		return (
			<Formik
				initialValues={{ letra:"" }}
				onSubmit={(values, {setSubmitting, resetForm}) => {
					setSubmitting(true);

					const rq = {
						letra: values.letra,
						palabra: "",
					}

					axios.post(API.PROD_URL+'/arriesgarLetra', rq)
						.then(response => {
							this.handleSubmit(response.data);
						})
						.catch(error => {
							console.log(error);
						});

					resetForm();
					setSubmitting(false);
				}}>
			{( {values,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting }) => (
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col></Col>
							<Col md={2}>
								<Form.Group>
								<Form.Control
									id="txtLetra"
									type="text"
									name="letra"
									placeholder="Letra"
									value={values.letra}
									onBlur={handleBlur}
									onChange={(e) => { handleChange(e); }} />
								</Form.Group>
							</Col>
							<Col md={2}>
								<Button id="btnArriesgarLetra" variant="primary" type="submit" disabled={isSubmitting || this.props.disableForm}>Arriesgar Letra</Button>
							</Col>
							<Col></Col>
						</Row>
					</Form>
			)}
			</Formik>
		)
	};
}

export default LetraInput;