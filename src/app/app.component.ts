import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from './api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'assignment';
  data:any={
    datasets: [{
        label:"Chart",
        data: [10,20,30,40],
        backgroundColor:['red','yellow','blue','gray'],
        borderColor:['red','yellow','blue','gray']
    }],

};
selectedUser:any=null

percent:any=0

dataSource:any = []
chart:any

constructor(private api:ApiService){

}
  ngOnInit(){
    this.api.getData().then((resp:any)=>{
      this.percent = resp.length;
      this.dataSource = resp
      this.chart = new Chart("canvas_block", {
        type: 'pie',
        data: {
          datasets: [{
              label:"Chart",
              data:[0,0,0,0],
              backgroundColor:['#ef0d0d','#30c0e1','#f6ce0e','#c2b7b7'],
              borderColor:['red','blue','yellow','gray']
          }],
            labels: [
            'Latitude > 0 ',
            'Latitude < 0',
            'Longitude > 0',
            'Longitude < 0'
          ]
        },
       options: {
          responsive: true
       }
      });
    })
  }

  updateChart(data){ //updating chart and its data on user lat and long
    this.selectedUser = data
    this.chart.data.datasets[0].data =  [(data.address.geo.lat > 0)?data.address.geo.lat:0,
        (data.address.geo.lat < 0)?data.address.geo.lat:0,
         (data.address.geo.lng > 0)?data.address.geo.lng:0,
         (data.address.geo.lng < 0)?data.address.geo.lng:0]
         this.chart.update()
  }

}
