import {Grid, TextField, withStyles, Select, FormControl, MenuItem, InputLabel, Button, FormHelperText} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import useForm from './useForm';
import * as actions from '../actions/dCandidate'
import {useToasts} from 'react-toast-notifications';

const initialValues = {
    fullName: '',
    email: '',
    mobile: '',
    age: '',
    bloodGroup: '',
    address: ''
}

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1),
    },
})

const DCandidateForm = (props) => {
    const {classes} = props;
    const addToast = useToasts();

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    //validate() for whole form
    //validate({fullName: 'jewel'}) for single value
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required"
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required"
        if ('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required"
        if ('email' in fieldValues)
            temp.email =  (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid"
        setErrors(temp);
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "");
    }

    const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialValues, validate, props.setCurrentId);

    useEffect(() => {
        if (props.currentId !=0) {
            setValues({
                ...props.dCandidateDataList.find(x => x.id == props.currentId)
            });
            setErrors({});
        }
    }, [props.currentId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);

        if (validate()) {
            // window.alert('validation succeeded');
            const onSuccess = () => {
                // addToast("Submitted successfully", {appearance: 'success'});
                resetForm();
            }

            if (props.currentId == 0)
                props.createDCandidate(values, onSuccess());
            else
                props.updateDCandidate(props.currentId, values, onSuccess());
        }
    }

    

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={(e) => handleInputChange(e)}
                        // error={true}
                        // helperText={errors.fullName}
                        {...errors.fullName && {error: true, helperText: errors.fullName}}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={(e) => handleInputChange(e)}
                        {...errors.email && {error: true, helperText: errors.email}}
                    />
                    <FormControl variant="outlined" className={classes.formControl}
                        {...errors.bloodGroup && {error:true}}
                    >
                        <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={(e) => handleInputChange(e)}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value=""><em>Select Blood bloodGroup</em></MenuItem>
                            <MenuItem value={"A+"}>A +ve</MenuItem>
                            <MenuItem value={"A-"}>A -ve</MenuItem>
                            <MenuItem value={"B+"}>B +ve</MenuItem>
                            <MenuItem value={"B-"}>B -ve</MenuItem>
                            <MenuItem value={"AB+"}>AB +ve</MenuItem>
                            <MenuItem value={"AB-"}>AB -ve</MenuItem>
                            <MenuItem value={"O+"}>O +ve</MenuItem>
                            <MenuItem value={"O-"}>O -ve</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText> }
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={(e) => handleInputChange(e)}
                        {...errors.mobile && {error: true, helperText: errors.mobile}}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <div>
                        <Button
                            className={classes.smMargin}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            className={classes.smMargin}
                            variant="contained"
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
            
        </form>
    );
};

const mapStateToProps = (state) => ({
    dCandidateDataList: state.dCandidate.list
})

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));