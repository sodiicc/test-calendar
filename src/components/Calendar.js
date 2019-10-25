import React from 'react'
import { Inject, ScheduleComponent, Day, Week, Month, Agenda, Resize, ViewsDirective, ViewDirective, DragAndDrop, ResourcesDirective, ResourceDirective, } from '@syncfusion/ej2-react-schedule';

import '../App.css'



class Cal extends React.Component {
  constructor() {
    super(...arguments);
    this.data = [{
      Id: 1,
      Subject: 'Explosion of Betelgeuse Star',
      StartTime: new Date(2019, 9, 15, 9, 30),
      EndTime: new Date(2019, 9, 15, 11, 0)
    }, {
      Id: 2,
      Subject: 'Thule Air Crash Report',
      StartTime: new Date(2019, 9, 12, 12, 0),
      EndTime: new Date(2019, 9, 12, 14, 0)
    }, {
      Id: 3,
      Subject: 'Blue Moon Eclipse',
      StartTime: new Date(2019, 9, 13, 9, 30),
      EndTime: new Date(2019, 9, 13, 11, 0)
    }, {
      Id: 4,
      Subject: 'Meteor Showers in 2018',
      StartTime: new Date(2019, 9, 14, 13, 0),
      EndTime: new Date(2019, 9, 14, 14, 30)
    }];
  }
  onDragStart(args) {
    args.navigation.enable = true;
  }
  
  
  onEventRendered(args) {
    let categoryColor = args.data.CategoryColor;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      args.element.firstChild.style.borderLeftColor = categoryColor;
    }
    else {
      args.element.style.backgroundColor = categoryColor;
    }
  }
  
  generateStaticEvents(start, resCount, overlapCount) {
    
    let data = [];
    let id = 1;
    for (let i = 0; i < resCount; i++) {
      let randomCollection = [];
      let random = 0;
      for (let j = 0; j < overlapCount; j++) {
        random = Math.floor(Math.random() * (30));
        random = (random === 0) ? 1 : random;
        if (randomCollection.indexOf(random) !== -1 || randomCollection.indexOf(random + 2) !== -1 ||
        randomCollection.indexOf(random - 2) !== -1) {
          random += (Math.max.apply(null, randomCollection) + 10);
        }
        for (let k = 1; k <= 2; k++) {
          randomCollection.push(random + k);
        }
        let startDate = new Date(start.getFullYear(), start.getMonth(), random);
        startDate = new Date(startDate.getTime() + (((random % 10) * 10) * (1000 * 60)));
        let endDate = new Date(startDate.getTime() + ((1440 + 30) * (1000 * 60)));
        data.push({
          Id: id,
          Subject: 'Event #' + id,
          StartTime: startDate,
          EndTime: endDate,
          IsAllDay: (id % 10) ? false : true,
          ResourceId: i + 1
        });
        id++;
      }
    }
    return data;
  }
  generateResourceData(startId, endId, text) {
    console.log('CLICK' )
    let data = [];
    let colors = [
      '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
      '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
      '#fec200', '#5978ee', '#00bdae', '#ea80fc'
    ];
    for (let a = startId; a <= endId; a++) {
      let n = Math.floor(Math.random() * colors.length);
      data.push({
        Id: a,
        Text: text + ' ' + a,
        Color: colors[n]
      });
    }
    return data;
  }

  
  
  render() {
    console.log(this.props.state )
    localStorage.setItem('data', JSON.stringify(this.data))
    
    return (
      <ScheduleComponent currentView='Month'
      ref={schedule => this.scheduleObj = schedule} selectedDate={new Date()} eventSettings={{ dataSource: this.data }} dragStart={(this.onDragStart.bind(this))}>
        <ResourcesDirective>
          <ResourceDirective field='ResourceId' title='Resource' name='Resources' allowMultiple={true} dataSource={this.generateResourceData(1, 300, 'Resource')} textField='Text' idField='Id' colorField='Color'>
          </ResourceDirective>
        </ResourcesDirective>
        <ViewsDirective>
          <ViewDirective option='Day' />
          <ViewDirective option='Week' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda, DragAndDrop, Resize]} />>
      </ScheduleComponent>
    )
  }
}

export default Cal