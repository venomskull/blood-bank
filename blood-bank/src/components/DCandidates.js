import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/dCandidate';
import DCandidateForm from './DCandidateForm';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
    root: {
        '& .MuiTableCell-head': {
            fontSize: '1.25rem',
        },
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
});

const DCandidates = (props) => {
    const {classes} = props;
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllDCandidates()
    },[]);

    const onDelete = (id) => {
        if (window.confirm('Are you to delete this record?'))
            props.deleteDCandidate(id, () => {window.alert('Deleted successfully')});
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.dCandidateList.map((record, index) => {
                                    return (
                                        <TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary" 
                                                        onClick={() => {setCurrentId(record.id)}} /></Button>
                                                    <Button><DeleteIcon color="secondary" 
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    dCandidateList: state.dCandidate.list
});

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));