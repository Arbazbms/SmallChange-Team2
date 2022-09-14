import { Component,OnInit } from '@angular/core';
import {Chart,registerables} from 'chart.js';
import { bindCallback } from 'rxjs';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  title = 'Client Activity Report';
  LineChart:any;
  BarChart:any;
  PieChart:any;

  ngOnInit()
  {
     // Line chart:
     Chart.register(...registerables);
this.LineChart = new Chart('lineChart', {
  type: 'line',
data: {
 labels: ["Jan", "Feb", "March", "April", "May", "June","July","Aug","Sep","Oct","Nov","Dec"],
 datasets: [{
     label: 'invested amount in months',
     data: [9,7 , 3, 5, 2, 10,15,16,19,3,1,9],
     fill:false,
     
     borderColor:"red",
     borderWidth: 1
 }]
}, 

  options: {
    aspectRatio:2.5,
    plugins: {
        title: {
            display: true,
            text: 'Net Portfolio Value',
            padding: {
                top: 10,
                bottom: 30,
               
            },
            font: {
              size: 16,
            }
        },
        legend: {
          labels: {
              // This more specific font property overrides the global property
              font: {
                  size: 16,
                  

              }
          }
      }
      
    },
    scales: {x: { title: { display: true, text: 'months' }},
             y: { title: { display: true, text: 'invested amount' }}}
    
   
  }
});

// Bar chart:
this.BarChart = new Chart('barChart', {
  type: 'bar',
data: {
  labels: ["Jan", "Feb", "March", "April", "May", "June","July","Aug","Sep","Oct","Nov","Dec"],
 
 datasets: [{
     label: 'total trades made',
     data: [9,7 , 3, 5, 2, 10],
     backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)'
     ],
     borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)'
     ],
     borderWidth: 1
 }]
}, 
options: {
  aspectRatio:2.5,
  plugins: {
      title: {
          display: true,
          text: 'Trade Activity',
          padding: {
              top: 10,
              bottom: 30,
             
          },
          font: {
            size: 16,
          }
      },
      legend: {
        labels: {
            // This more specific font property overrides the global property
            font: {
                size: 16,
                

            }
        }
    }
  },
  scales: {x: { title: { display: true, text: 'months' }},
  y: { title: { display: true, text: 'no. of trades' }}}
}
});

// pie chart:
this.PieChart = new Chart('pieChart', {
  type: 'pie',
data: {
 labels: ["APPL", "TSLA", "AMZN", "NVDA", "GOOG", "MSFT"],
 datasets: [{
     label: 'shares',
     data: [9,7 , 3, 5, 2, 10],
     backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)'
     ],
     borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)'
     ],
     borderWidth: 1
 }]
}, 
options: {
  aspectRatio:2.5,
  plugins: {
      title: {
          display: true,
          text: 'Holdings',
          padding: {
              top: 10,
              bottom: 30,
             
          },
          font: {
            size: 16,
          }
      },
      legend: {
        labels: {
            // This more specific font property overrides the global property
            font: {
                size: 16,
                

            }
        }
    }
  }
}



});

console.log(this.BarChart);
console.log(this.PieChart);
console.log(this.LineChart);
  }
}
