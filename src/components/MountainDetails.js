import React, {Component, Fragment} from 'react'
import { Header, Grid, Segment, Button } from 'semantic-ui-react'
import {ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import * as moment from 'moment'
import {Link, withRouter} from 'react-router-dom'
import { URL } from '../constants/constants' 
const Cookies = require('cookies-js')

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
      // retrieve lat and lon of mountain
      // to-do: retrieve lat/lon only once upon mountain create/edit, so not always calling this API
      this.getLatLons()
   }

   componentDidUpdate(prevProps) {
      // retrieve lat lon when component updates to show new mluntain (see to-do)
      if (prevProps.mountain.id !== this.props.mountain.id) {
         this.getLatLons()
      }
   }

   // use mountain name and state to retrieve latitude and longitude for use in weather API 
   // to-do: retrieve lat/lon only once upon mountain create/edit, so not always calling this API
   getLatLons = () => {
      const url = URL + `/geocode/${this.props.mountain.name}%20ski%20${this.props.mountain.state}`
      const token = Cookies.get('token')
      fetch(url, {
         method: 'GET',
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         }
      })
      .then(res => res.json())
      .then(data => {
         this.setState({
            lat: data.results[0].geometry.location.lat,
            lon: data.results[0].geometry.location.lng
         }, () => { 
            // collect drive time from home address to local mountain
            // this.getDriveTime()
            // use lat and lon to retrieve weather
            this.getWeather()
         })
      })
   }

   // retrieves weather from Dark SKY API using lat and lon
   // invoked inside getLatLons after set state
   getWeather = () => {
      const url = URL + `/weather/forecast/${this.state.lat}/${this.state.lon}`
      const token = Cookies.get('token')
      fetch(url, {
         method: 'GET',
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         }
      })
      .then(res => res.json())
      .then(data => {
         this.setIcons(data)
         this.setState({
            weather: {currently: data.currently, daily: data.daily}
         }, () => this.setWeatherData())
      })
   }

   // build array of weather forecast data for use in weather graph
   // invoked inside getWeather
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

   // retrieve drive time from home address to mountain
   // (not currently used)
   getDriveTime = () => {
      const url = URL + `/drivetime/${this.props.userData.address}/${this.props.userData.city}/${this.props.userData.state}/${this.state.lat}/${this.state.lon}`
      const token = Cookies.get('token')
      fetch(url, {
         method: 'GET',
         headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}` 
         }
      })
         .then(r => r.json())
         .then(data => console.log(data))
   }
   
   // delete mountain from backend
   delete = (event) => {
      const url = URL + `/mountains/${this.props.mountain.id}`
      const token = Cookies.get('token')
      fetch(url, {
         method: 'DELETE',
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         }
      })
      .then(() => this.props.userFetch())
      .then(() => this.props.history.push('/'))
   }
   
   // use weather data to set correct weather icon
   // invoked inside getWeather
   // update this later to allow for a sensible default in case Dark Sky API changes
   setIcons = (weather) => {
      // eslint-disable-next-line default-case
      switch (weather.currently.icon) {
         case 'clear-day':
            weather.currently.icon = 'day-sunny'
            break
         case 'clear-night':
            weather.currently.icon = 'night-clear'
            break
         case 'wind':
            weather.currently.icon = 'windy'
            break
         case 'partly-cloudy-day':
            weather.currently.icon = 'day-cloudy'
            break
         case 'partly-cloudy-night':
            weather.currently.icon = 'night-cloudy'
            break
      }
   }

   render() {
      const { mountain } = this.props
      const { weather, forecastChartData } = this.state
      
      return weather ? (
         <div className='padded-top-small'>
            <Fragment>
               <Header as='h1' icon textAlign='center'>
                  <Header.Content>{mountain.name}</Header.Content>
                  <Header.Subheader>{mountain.city}, {mountain.state}</Header.Subheader>
               </Header>
               
               <Grid columns={2} centered stackable>
                  <Grid.Row> 
                     <Grid.Column>
                        <Segment basic textAlign='center'>
                           <Header as='h2' textAlign='center' content='Current Conditions' color='blue'></Header>
                           <i className={`wi wi-${weather.currently.icon}`}></i>
                           <h3 className='textalign-center'>
                              <strong>{`${weather.currently.temperature} ºF`} - {weather.currently.summary}</strong>
                           </h3>
                           <h4 className='textalign-center'>{`Wind Speed: ${weather.currently.windSpeed} mph`} </h4>
                           <h4 className='textalign-center'>{`Gusts: ${weather.currently.windGust} mph`} </h4>
                           <h4 className='textalign-center'>{`Relative humidity: ${weather.currently.humidity}`} </h4>
                           <h4 className='textalign-center'>{`Visibility: ${weather.currently.visibility} miles`} </h4>
                        </Segment>
                     </Grid.Column>
                     
                     <Grid.Column>
                        <Segment basic>
                           <Header as='h2' textAlign='center' content='Forecast' color='blue'/>
                           <p className='textalign-center'><strong>Summary</strong></p>
                           <p className='textalign-center'>{weather.daily.summary}</p>
                           
                           {/* this component comes from recharts.js */}
                           <ResponsiveContainer width='100%' height={400}>
                              <ComposedChart data={forecastChartData} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
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
                        <Segment basic>
                           <Header as ='h2' textAlign='center' content='Interactive Trail Map' color='blue'/>
                           <iframe title={mountain.name} src={`https://openskimap.org/#12/${this.state.lat}/${this.state.lon}`} height="400" width="100%" frameBorder="0"></iframe>
                        </Segment>
                     </Grid.Column>
                  </Grid.Row>
                  
                  <Grid.Row>
                     <Grid.Column>
                        <Segment basic>
                           <Button fluid content='Edit' color='blue' as={Link} to={`/mountains/${mountain.id}/edit`}/>
                        </Segment>
                     </Grid.Column>
                     
                     <Grid.Column>
                        <Segment basic>
                           <Button fluid content='Delete' color='red' onClick={this.delete}/>
                        </Segment>
                     </Grid.Column>
                  </Grid.Row>

               </Grid>
            </Fragment>
         </div>
      ) : null
   }
}

export default withRouter(MountainDetails)
