import React, { Component } from 'react'
import api from '../api'
import { Formik } from 'formik'
import { Form, Button } from 'react-bootstrap'

class VehicleUpdate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            typeVehicles: ['Micro', 'Sedan', 'CUV', 'SUV', 'Coupe', 'Hatchback', 'Pickup',
                'VAN', 'Campervan', 'Mini Truck', 'Minivan', 'Truck', 'Big Truck', 'Bus'],
            fetched: false,
        }
    }

    componentDidMount = () => {
        const { id } = this.state
        api.getVehicleById(id).then(v => {
            this.setState({
                vehicle: v.data,
                fetched: true,
            })
        })
    }

    render() {
        return (
            <div style={{marginLeft: "100px"}}>
                <h1 style={{paddingTop: "30px"}}>Edit vehicle</h1> <br />
                {this.state.fetched
                    ? <Formik
                        initialValues={{
                            ...this.state.vehicle
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.brand) {
                                errors.brand = 'Required'
                            }
                            if (!values.plate) {
                                errors.plate = 'Required'
                            }
                            if (! /^\d+$/.test(values.number)) {
                                errors.number = 'Only digit can be used'
                            }
                            if(values.productionYear < 1980 || values.productionYear > new Date().getFullYear()){
                                errors.productionYear = "Not correct production year"
                            }
                            if (! /^\d+$/.test(values.productionYear)) {
                                errors.productionYear = 'Only digit can be used'
                            }
                            return errors
                        }}
                        onSubmit={(values) => {
                            api.updateVehicleById(this.state.id, values)
                            window.alert('Vehicle updated successfully')
                        }}
                        render={({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                                <Form onSubmit={handleSubmit} noValidate className="ml-5 mr-5">
                                    <Form.Group >
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            name='brand'
                                            onChange={handleChange}
                                            value={values.brand}
                                            isInvalid={!!errors.brand}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.brand}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control as="select" name='type' onChange={handleChange} value={values.type}>
                                            {this.state.typeVehicles.map(typeVehicle =>
                                                <option key={typeVehicle} value={typeVehicle}>{typeVehicle}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group >

                                    <Form.Group >
                                        <Form.Label>Plate</Form.Label>
                                        <Form.Control
                                            name='plate'
                                            onChange={handleChange}
                                            value={values.plate}
                                            isInvalid={!!errors.plate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.plate}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Production year</Form.Label>
                                        <Form.Control
                                            name='productionYear'
                                            type='number'
                                            min="1980"
                                            step="1"
                                            onChange={handleChange}
                                            value={values.productionYear}
                                            isInvalid={!!errors.productionYear}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.productionYear}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Fuel type</Form.Label>
                                        <Form.Control as="select" name="fuelType" onChange={handleChange} value={values.fuelType}>
                                            <option value="Gasoline">Gasoline</option>
                                            <option value="Diesel">Diesel</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Number</Form.Label>
                                        <Form.Control
                                            name='number'
                                            type='number'
                                            min="0"
                                            step="1"
                                            onChange={handleChange}
                                            value={values.number}
                                            isInvalid={!!errors.number}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.number}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Check
                                        type='checkbox'
                                        name='isAvailable'
                                        value={values.isAvailable}
                                        checked={values.isAvailable}
                                        onChange={handleChange}
                                        label="Available"
                                    />
                                    <br />
                                    <Button variant="primary" type='submit' className='mr-3'>Update</Button>
                                    <Button variant="secondary" href={'/vehicles/list'}>Cancel</Button>
                                </Form>
                            )

                        }

                    />
                    : <p>Loading</p>
                }
            </div>
        )
    }

}

export default VehicleUpdate
