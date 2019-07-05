import React, { Component } from 'react'
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import {withStyles} from '@material-ui/core/styles';
import Banner from '../Banner/Banner';
import Slider from '@material-ui/lab/Slider';
import { Button, Typography, Paper, Grid } from '@material-ui/core'
import './RankPercents.css'

const styles = {
        root: {
            color: '#52af77',
            height: 8,
        },
        thumb: {
            height: "24px",
            width: "24px",
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            marginTop: "-8px",
            marginLeft: "-12px",
            '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
            },
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 4px)',
        },
        track: {
            height: 8,
            borderRadius: 4,
        },
        rail: {
            height: 8,
            borderRadius: 20,
        }
    }

class RankPercents extends Component {

    state = {
        statusBar : 95,
        valuesPercent: 0,
        violatorPercent: 0,
        violators: [],
        core: []
        
    }

    componentDidMount = () => {
        this.props.dispatch({type: 'SET_NEW_VALUES', name: 'participantId', payload: this.props.url.participant_id});
        const violators = this.props.violators
        const core = this.props.core

        let violatorsArray = this.props.values.filter((value) =>{
            for (let newValue of violators) {
                if(newValue === value.id) {
                    return true; 
                }
            }
            return false; 
        })

        let coreArray = this.props.values.filter((value) =>{
            for (let newValue of core) {
                if(newValue === value.id) {
                    return true; 
                }
            }
            return false; 
        })

        this.setState({
                violators : violatorsArray,
                core: coreArray
        })

        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours(); 

        let totalTime =((min * 60 ) + (hour * 360) + sec)

        this.setState({
            time: totalTime
        })
    }

    handleNext = (event) => {
        event.preventDefault(); 

        let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let percentTime = nextTime - this.state.time 

        this.props.dispatch({type: 'ADD_RESULTS', payload: {result: this.props.newValuesReducer, percentTime: percentTime}});
        this.props.history.push('FinalResults'); 
    }

    handleChange = propertyName => (e, value) => {
        e.preventDefault();
        this.setState({
                [propertyName]: value,
                valuesPercent: (100 - value)
        })

        this.props.dispatch({type: 'SET_NEW_VALUES', name: 'percents', payload: this.state});
    }


    render() {
        const {classes} = this.props;
        const { violatorPercent } = this.state;
        return (
            <div>
                <div className="banner">
                    <Banner />
                </div>
                <Grid container justify="center">
                    <StatusBar status={this.state.statusBar} />
                </Grid>                
                <div className = "grid">

                <div className = "core">
                    
                    <h3> Core Values </h3>
                    <ul >
                        {this.state.core.map(value => {
                            return <li key={value.id}
                                        value={value.id}>{value.values}</li>
                        })}
                    </ul>
                </div>
                    
                <div className = "violators">
                        <h3> Core Violators </h3>
                        <ul>
                        {this.state.violators.map(value => {
                            return <li key={value.id}
                                        value={value.id}>{value.values}</li>
                        })}
                    </ul>
                </div>
             
            </div>
                <div className= {classes.root}>
                    <Typography className= "slider" gutterBottom align="center"> Percent</Typography>
                        <Slider onChange={this.handleChange('violatorPercent')} 
                                value={violatorPercent}
                                // valueLabelDisplay="auto" 
                                // aria-label="Percents" 
                                defaultValue={50} />
              
                </div>
        {/* <Paper className = "grid2"> */}
            <h2 className = "title" >How do you live each day ?</h2>
            <div className = "grid2">
               
                <h3 className="corePercents"> Core Values {this.state.valuesPercent} % </h3>
                <h3 className="violatorPercents"> Violator Values {this.state.violatorPercent} % </h3>

            </div>
        {/* </Paper> */}
                <div>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick= {this.handleNext}
                        >
                        Next
                    </Button> 
                </div>
                
            </div>
        )
    }
}

const mapState = reduxState => {
    return {
        values: reduxState.valuesReducer,
        core: reduxState.newValuesReducer.orderCore,
        violators :reduxState.newValuesReducer.violators,
        newValuesReducer: reduxState.newValuesReducer,
        url: reduxState.urlReducer,
        }   
    }
export default withStyles(styles)(connect(mapState)(RankPercents))

