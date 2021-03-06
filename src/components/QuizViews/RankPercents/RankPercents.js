import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import { Button, Paper, Grid, Slider } from '@material-ui/core'
import './RankPercents.css'




const styles = ({
    root:{
        }
    })

class RankPercents extends Component {

    state = {
        statusBar : 95,
        valuesPercent: 50,
        violatorPercent: 50,
        violators: [],
        core: []
        
    }

    componentDidMount = () => {
        this.props.dispatch({type: 'SET_NEW_VALUES', name: 'participantId', payload: this.props.url.participant_id});
        const violators = this.props.violators
        const core = this.props.core

        //filters through violator values
        let violatorsArray = this.props.values.filter((value) =>{
            for (let newValue of violators) {
                if(newValue === value.id) {
                    return true; 
                }
            }
            return false; 
        })

        //filters through core values
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

        //capturing curren time
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

        //capturing ending time, subtracting current time
        let next = new Date(); 
        let sec = next.getSeconds();
        let min = next.getMinutes(); 
        let hour = next.getHours(); 

        let nextTime = ((min * 60 ) + (hour * 360) + sec)
        let percentTime = nextTime - this.state.time 

        this.props.dispatch({type: 'ADD_RESULTS', payload: {percentTime: percentTime, percents: {valuesPercent: this.state.valuesPercent, violatorPercent: this.state.violatorPercent}}});
        this.props.history.push('FinalResults'); 
    }

    // setting the percents 
    handleChange = propertyName => (e, value) => {
        e.preventDefault();
        this.setState({
                [propertyName]: value,
                valuesPercent: (100 - value)
        })
    }


    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>   
           
                <Paper contained="true" className="paper">  
				<div className="background">
                   
                    <div className="grid">
                        <div className="core">
                    
                            {/* mapping through core values */}
                            <h3>Core Values</h3>
                            <ul >
                                {this.state.core.map(value => {
                                    return <li key={value.id}
                                                value={value.id}>{value.values}</li>
                                })}
                            </ul>
                        </div>
                    
                                {/* mapping through violator */}
                        <div className = "violators">
                                <h3>Core Violators</h3>
                                <ul>
                                {this.state.violators.map(value => {
                                    return <li key={value.id}
                                                value={value.id}>{value.values}</li>
                                })}
                            </ul>
                        </div>
                    </div>

                      <div className = "grid2">
                            <div className ="slider" >
                            <Slider onChange={this.handleChange('violatorPercent')} 
                                    defaultValue={50} 
                                    style={{ 
                                        height: '18',
										width: '80%',
										track: {
											height: '8',
											borderRadius: '4',
											margin: 'auto',
											},
										rail: {
											height: '8',
											borderRadius: '4',
											margin: 'auto',
										},
										margin: 'auto',
										marginRight: '100px'
                                       }}/>
                            </div>
                        </div>
                    
                    <h2 className = "title" >How do you live each day ?</h2>
                    <div className = "grid3">
                    
                        <h3 className="corePercents"> Core Values {this.state.valuesPercent} % </h3>
                        <h3 className="violatorPercents"> Violator Values {this.state.violatorPercent} % </h3>

                    </div>
					</div>

                    <div className="button">
                        <Button
                            disabled={this.state.valuesPercent === 0}
                            color="primary"
                            variant="contained"
                            onClick= {this.handleNext}
                            >
                            Next
                        </Button> 
                    </div>
                    
                  </Paper>
 
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

