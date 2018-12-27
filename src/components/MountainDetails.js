import React, {Component, Fragment, PropTypes} from 'react'
import WeatherDetails from './WeatherDetails'
import { Header, Icon, Image, Grid, Segment } from 'semantic-ui-react'
import {ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import * as moment from 'moment'

class MountainDetails extends Component {
   constructor() {
      super()
      this.state = {
         lat: 0,
         lon: 0,
         weather: null,
         forecastChartData: null
      }
   }

   componentDidMount() {
      this.getLatLons()
   }

   componentDidUpdate(prevProps) {
      if (prevProps.mountain.id !== this.props.mountain.id) {
         this.getLatLons()
      }
   }

   getLatLons = () => {
      let url = `http://localhost:3000/geocode/${this.props.mountain.name}%20ski%20${this.props.mountain.state}`
      fetch(url)
      .then(res => res.json())
      .then(data => {
         this.setState({
            lat: data.results[0].geometry.location.lat,
            lon: data.results[0].geometry.location.lng
         }, () => this.getWeather())
      })
   }

   //fires inside getLatLons
   getWeather = () => {
      let url = `http://localhost:3000/weather/forecast/${this.state.lat}/${this.state.lon}`
      fetch(url)
      .then(res => res.json())
      .then(data => this.setState({weather: data}, () => this.setWeatherData()))
   }

   // fires inside getWeather
   setWeatherData = () => {
      let t = moment().format('dd')
      let tOne = moment().add(1, 'days').format('dd')
      let tTwo = moment().add(2, 'days').format('dd')
      let tThree = moment().add(3, 'days').format('dd')
      let tFour = moment().add(4, 'days').format('dd')
      let tFive = moment().add(5, 'days').format('dd')
      let tSix = moment().add(6, 'days').format('dd')
      let tSeven = moment().add(7, 'days').format('dd')

      const data = [
         {name: t, snow: 0, tmp: 0, rain: 0},
         {name: tOne, snow: 0, tmp: 0, rain: 0},
         {name: tTwo, snow: 0, tmp: 0, rain: 0},
         {name: tThree, snow: 0, tmp: 0, rain: 0},
         {name: tFour, snow: 0, tmp: 0, rain: 0},
         {name: tFive, snow: 0, tmp: 0, rain: 0.0},
         {name: tSix, snow: 0, tmp: 0, rain: 0},
         {name: tSeven, snow: 0, tmp: 0, rain: 0}
      ]
      if (this.state.weather) {
         for (let i = 0; i < data.length; i++) {
            if (this.state.weather.daily.data[i].precipType === 'snow') {
               data[i].snow = this.state.weather.daily.data[i].precipAccumulation
               data[i].rain = 0
            } else if (this.state.weather.daily.data[i].precipType === 'rain') {
               data[i].rain = this.state.weather.daily.data[i].precipAccumulation
               data[i].snow = 0
            } else {
               data[i].snow = 0
               data[i].rain = 0
            }
            data[i].tmp = this.state.weather.daily.data[i].apparentTemperatureHigh
         }
      }
      this.setState({forecastChartData: data})
   } 

   render() {
      const { mountain } = this.props
      // if (this.state.weather) {
      //    let { currently, daily } = this.state.weather
      // }
      return (
         <Fragment>
            <Header as='h2' icon textAlign='center'>
               {/* <Icon name='globe' circular /> */}
               <Header.Content>{mountain.name}</Header.Content>
               <Header.Subheader>{mountain.city}, {mountain.state}</Header.Subheader>
            </Header>
            <Grid columns={2} centered stackable>
               <Grid.Row>
                  <Grid.Column>
                     <Segment basic>
                        <Header as='h3' textAlign='center' content='Current Conditions'></Header>
                        <p className='textalign-center'>{this.state.weather ? this.state.weather.currently.summary : null}</p>
                        <p className='textalign-center'>{this.state.weather ? `Temp: ${this.state.weather.currently.temperature} F` : null}</p>
                        <p className='textalign-center'>{this.state.weather ? `Wind Speed: ${this.state.weather.currently.windSpeed} mph || Gusts: ${this.state.weather.currently.windGust} mph` : null} </p>
                     </Segment>
                  </Grid.Column>
                  <Grid.Column>
                     <Segment basic>
                        <Header as='h3' textAlign='center' content='Forecast'></Header>
                        <p className='textalign-center'><strong>Summary</strong></p>
                        <p>{this.state.weather ? this.state.weather.daily.summary : null}</p>
                        <ResponsiveContainer width='80%' height={400}>
                           <ComposedChart data={this.state.forecastChartData ? this.state.forecastChartData : null} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                              <CartesianGrid stroke='#f5f5f5'/>
                              <XAxis dataKey="name"/>
                              <YAxis yAxisId='left' label={{ value: 'F', angle: 0, position: 'insideLeft'}}/>
                              <YAxis yAxisId='right' orientation='right' label={{ value: 'In.', angle: 0, position: 'insideRight'}}/>
                              <Tooltip />
                              <Legend />
                              <Area yAxisId='right' type='monotone' dataKey='snow' fill='#8884d8' stroke='#8884d8'/>
                              <Bar yAxisId='left' dataKey='tmp' barSize={20} fill='#413ea0' />
                              <Line yAxisId='right' type='monotone' dataKey='rain' stroke='#ff7300' />
                           </ComposedChart>
                        </ResponsiveContainer>
                     </Segment>
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row>
                  <Grid.Column>
                     <Segment>

                     </Segment>
                  </Grid.Column>
                  <Grid.Column>
                     <Segment>
                        
                     </Segment>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Fragment>
      )
   }
}

export default MountainDetails
