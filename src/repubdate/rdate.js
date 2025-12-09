import { timeDay } from 'd3-time';
import { roman, months, days, dayNames } from './dayData.js';

var repubdate = {};

repubdate.startDate = new Date("1792-09-22");

repubdate.toRoman = function(decimal){
  var place,i,s = "";
  if(decimal<0){
    decimal*=-1;
    s+="-";
  }
  for(place in roman){
    while(decimal>=roman[place]){
      s+=place;
      decimal-=roman[place];
    }
  }
  return s;
};

repubdate.isLeapYear = function(year){
  if(year%4!=0){
    return false;
  }
  else if(year%100!=0){
    return true;
  }
  else if(year%400!=0){
    return false;
  }
  else{
    return true;
  }
}

repubdate.getYear = function(date){
  var year = date.getFullYear();
  var ryear = year-repubdate.startDate.getFullYear();

  if(date.getMonth() > 8){
    ryear++;
  }

  else if(date.getMonth()==8){
    var first = repubdate.getFirstDay(ryear+1);
    if(date.getDate()>=first.getDate()){
      ryear++;
    }
  }

  if(ryear<=0){
    ryear--;
  }

  return ryear;
};

repubdate.getMonth = function(date){
  var daysElapsed = timeDay.count(repubdate.getFirstDay(repubdate.getYear(date)),date);
  var month = Math.floor(daysElapsed/30) + 1;
  return month<=12 ? month : 0;
};

repubdate.getMonthName = function(date,mode){
  var monthString = "";
  switch(mode){

    case "short":
      monthString = months[repubdate.getMonth(date)].sname;
    break;

    case "english":
      monthString = months[repubdate.getMonth(date)].ename;
    break;

    case "standard":
    default:
      monthString = months[repubdate.getMonth(date)].name;
    break;
  }
  return monthString;
}

repubdate.getFirstDay = function(year){
    var firstDay = 22;
    if(year<0){
      year++;
    }
  // Use the equinox method for extant years of the calendar,
  // Romme method to extrapolate to future years.
    if(year>=1 && year<=14){
      switch(year){
        case 4:
        case 8:
        case 9:
        case 10:
        case 11:
        case 13:
        case 14:
          firstDay = 23;
        break;

        case 12:
          firstDay = 24;
        break;

        default:
        break;
      }

    }
    else if(repubdate.isLeapYear(year)){
      firstDay = 23;
    }
    return new Date((year+repubdate.startDate.getFullYear()-1)+"-09-"+(firstDay+1));
}

repubdate.getDay = function(date){
  var daysElapsed = timeDay.count(repubdate.getFirstDay(repubdate.getYear(date)),date);
  return (daysElapsed%30)+1;
};

repubdate.getDayName = function(date,mode){
  var day = repubdate.getDay(date);
  return days[(day-1)%10].name;
};

repubdate.getCelebrant = function(date,mode){
  var month = repubdate.getMonth(date);
  var day = repubdate.getDay(date);
  var celebrantString = "";
  switch(mode){

    case "english":
      celebrantString = dayNames[month][day-1].ename;
    break;

    default:
    case "standard":
      celebrantString = dayNames[month][day-1].name;
    break;

  }
  return celebrantString;
};

repubdate.getString = function(date,mode){
  var dateString = "";
  switch(mode){
    case "short":
      dateString = repubdate.getDay(date) + " " + repubdate.getMonthName(date,"short") +
      ", " + repubdate.toRoman(repubdate.getYear(date));
    break;

    case "verbose":
      if(repubdate.getMonth(date)==0){
        dateString = repubdate.getCelebrant(date) + ", année de la République " +
        repubdate.toRoman(repubdate.getYear(date));
      }
      else{
        dateString = repubdate.getDayName(date) + " " + repubdate.getDay(date)
        + " " + repubdate.getMonthName(date) + ", année de la République "+
        repubdate.toRoman(repubdate.getYear(date)) + ", le jour du " +
        repubdate.getCelebrant(date);
      }
    break;

    case "english":
      if(repubdate.getMonth(date)==0){
        dateString = repubdate.getCelebrant(date,"english") + ", year of the Republic " +
        repubdate.toRoman(repubdate.getYear(date));
      }
      else{
        dateString = repubdate.getDayName(date) + " " + repubdate.getDay(date)
        + " " + repubdate.getMonthName(date) + ", year of the Republic "+
        repubdate.toRoman(repubdate.getYear(date)) + ", the day of " +
        repubdate.getCelebrant(date,"english");
      }
    break;

    case "numeric":
      if(repubdate.getMonth(date)==0){
        dateString = repubdate.getDay(date) + "/13/" +
        repubdate.getYear(date);
      }
      else{
        dateString = repubdate.getDay(date) + "/" + repubdate.getMonth(date) + "/" +
        repubdate.getYear(date);
      }
    break;

    default:
    case "standard":
      dateString = repubdate.getDay(date) + " " + repubdate.getMonthName(date) + ", an " +
      repubdate.toRoman(repubdate.getYear(date));
    break;
  }

  return dateString;
};

repubdate.getObject = function(date){
  var obj = {};
  var day = repubdate.getDay(date);
  var month = repubdate.getMonth(date);
  var year = repubdate.getYear(date);
  obj.month = Object.assign({},months[month]);
  obj.month.number = month;
  obj.day = Object.assign({},dayNames[month][(day-1)]);
  obj.day.dname = days[(day-1)%10].name;
  obj.day.number = day;
  obj.year = { number: year, roman:repubdate.toRoman(year)};
  return obj;
}

Date.prototype.toRevolutionaryString = function(mode){
  return repubdate.getString(this,mode);
}

Date.prototype.toRevolutionaryObject = function(){
  return repubdate.getObject(this);
}

export default repubdate;
