import React, { Component } from 'react'
import {  Button, Paper, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar';
import './Elimination4.css';


class Elimination4 extends Component {

    state = {
        round4: [],
        statusBar : 38
    }

    // Fetch all value words
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_VALUES'});

        // setting current time to state
        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours(); 

        let totalTime =((min * 60 ) + (hour * 360) + sec)

        this.setState({
            time: totalTime
        })
    }

    // Send 5 selected values to reducer and route to BeliefInstruct2 page.
    // Will alert if 5 values are not selected.
    handleNext = () => {
            let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let totalTime4 = nextTime - this.state.time 

            this.props.dispatch({type: 'SET_NEW_VALUES', name: 'round4', payload: this.state.round4});
            this.props.dispatch({type: 'SET_NEW_TIME', name: 'round4Time', payload: totalTime4 });
            this.props.history.push('/BeliefInstruct2');
    }

    // Select and deselect values and store into local state round 4
    handleSelect = (event) => {
        for(let i = 0; i < this.state.round4.length; i++) {
            if(event.target.value === this.state.round4[i]) {
                this.setState({
                    round4: this.state.round4.filter((_,j) => j !== i)
                })
                return;
            }
        }
        if(this.state.round4.length === 5) {
            return;
        }
        this.setState({
            round4: [...this.state.round4, event.target.value]
        })
    }

    render() {
        // Creating array of all the values minus previous selected values
        let reducer = this.props.newValues;
        let round1 = reducer.round1;
        let round2 = reducer.round2;
        let round3 = reducer.round3;
        let threeArrays = round1.concat(round2,round3);
        let newArray = this.props.values.filter((value) => {
            for (let newValue of threeArrays) {
                if (newValue === value.id) {
                    return false;
                }
            }
            return true;
        });

        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                    <h2 className="inst"> Remove the 5 least important values</h2>
                    <Paper className="paper">
                        <div className="valuesList">
                            <ul className="elim4List">
                                {newArray.map(value => {
                                    return <li key={value.id} onClick={this.handleSelect} className={this.state.round4.includes(value.id) ? "striked" : "unStriked"} value={value.id}>{value.values}</li>
                                })}
                            </ul>
                        </div>
                        <div className="nextBtn1">
                        <Button
                                disabled={this.state.round4.length !== 5}
                                color="primary"
                                variant="contained"
                                onClick={this.handleNext}
                                >
                                Next
                            </Button> 
                        </div>
                     <p className="valueCount">{this.state.round4.length} / 5 values selected</p>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        values: reduxState.valuesReducer,
        newValues: reduxState.newValuesReducer
    }
}

export default connect(mapStateToProps)(Elimination4);

