import React from "react"
import Chart from "react-google-charts";
import { connect } from "react-redux"
import moment from 'moment'




const data = [
  ["Day", "tweets"],
  ["Sunday",],
  ["Monday", ],
  ["Tuesday", ],
  ["Wednesday",],
  ["Thursday", ],
  ["Friday", ],
  ["Saturday", ],
]


const options = {
  title: "Tweets",
  curveType: "function",
  legend: { position: "bottom" }
}


class Analytics extends React.Component {
  render() {
      if(this.props.tweets.length > 0){
        //console.log(this.props.tweets.filter(tweet => moment(tweet.createdAt).weekday() == 0).length)
      let j = 0;
      for(let i = 1; i < data.length; i++){
        let len = this.props.tweets.filter(tweet => moment(tweet.createdAt).weekday() == j).length
        console.log(len)
        data[i].push(len)
        j++
      }
      console.log(data)
      }
      
    return (
      <div className="App">
          { this.props.tweets.length != 0 &&
                <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
              />
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        tweets : state.tweets
    }
}

export default connect(mapStateToProps)(Analytics)