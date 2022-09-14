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
     label: 'Number of Items Sold in Months',
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
            text: 'Custom Chart Title',
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

// Bar chart:
this.BarChart = new Chart('barChart', {
  type: 'bar',
data: {
 labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
 datasets: [{
     label: '# of Votes',
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
          text: 'Custom Chart Title',
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

// pie chart:
this.PieChart = new Chart('pieChart', {
  type: 'pie',
data: {
 labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
 datasets: [{
     label: '# of Votes',
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
          text: 'Custom Chart Title',
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


  }
}
