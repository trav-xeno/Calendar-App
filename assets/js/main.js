//check if cur time is before or after if its after time then color different
//add check box

class Hour {
  constructor(id, hour, text, future, current, past) {
    this.id = id;
    this.hour = hour;
    this.text = text;
    this.future = future;
    this.current = current;
    this.past = past;
  } /*
  getHour() {
    return this.hour;
  }
  getText() {
    return this.text;
  }
  isActive() {
    return active;
  }
  getId() {
    return this.id;
  }*/
}

$(function() {
  var hours = null;
  const h4Day = $("#day");
  const h4Time = $("#time");
  const cal = $("#calendar");
  h4Day.text(moment().format("MMMM Do YYYY"));
  setInterval(() => {
    headerTime = moment().format("LTS");
    h4Time.text(headerTime);
  }, 1000);

  var day = moment().format("dddd");
  if (!localStorage.getItem("day")) {
    localStorage.setItem("day", day);
    console.log("first load of the day");
    startUp();
  } else if (localStorage.getItem("day") === day) {
    console.log("current day ");
    startUp();
  } else {
    localStorage.clear();
    localStorage.setItem("day", day);
    startUp();
  }

  function createHour(index, time) {
    let curtime = new Date();
    let start = `${time}:00:00`;
    let end = `${time}:59:59`;

    let str = start.split(":");
    let starttime = new Date(
      curtime.getFullYear(),
      curtime.getMonth(),
      curtime.getDate(),
      parseInt(str[0]),
      parseInt(str[1]),
      parseInt(str[2])
    );

    let estr = end.split(":");
    var endtime = new Date(
      curtime.getFullYear(),
      curtime.getMonth(),
      curtime.getDate(),
      parseInt(estr[0]),
      parseInt(estr[1]),
      parseInt(estr[2])
    );
    console.log(curtime);
    if (curtime >= starttime && curtime <= endtime) {
      console.log(time + ":00");
      let hour = new Hour(index, `${time}:00`, "", false, true, false);
      console.log("is current time ");
      return hour;
    } else if (starttime < curtime) {
      let hour = new Hour(index, `${time}:00`, "", false, false, true);
      console.log("is past ");
      return hour;
    } else {
      let hour = new Hour(index, `${time}:00`, "", true, false, false);
      console.log("future");
      return hour;
    }
  }
  function checktime(ob) {
    let curtime = new Date();
    let start = `${ob.hour}:00`;
    let end = `${ob.hour.slice(0, 2)}:59:59`;
    console.log(end);
    let str = start.split(":");
    let starttime = new Date(
      curtime.getFullYear(),
      curtime.getMonth(),
      curtime.getDate(),
      parseInt(str[0]),
      parseInt(str[1]),
      parseInt(str[2])
    );

    let estr = end.split(":");
    var endtime = new Date(
      curtime.getFullYear(),
      curtime.getMonth(),
      curtime.getDate(),
      parseInt(estr[0]),
      parseInt(estr[1]),
      parseInt(estr[2])
    );
    if (ob.current == true) {
      if (curtime >= starttime && curtime <= endtime) {
        return;
      } else {
        ob.current = false;
        ob.past = true;
      }
    } else if (ob.future == true) {
      if (curtime >= starttime && curtime <= endtime) {
        ob.current = true;
        ob.future = false;
      } else if (starttime < curtime) {
        ob.past = true;
        ob.future = false;
      } else {
        return;
      }
    }
  }
  function addToDom(hourOb) {
    let p = $("<p>");
    let timep = $("<p>");
    let row = $("<div>");
    let timediv = $("<div>");
    let txtdiv = $("<div>");
    let form = $("<form>");

    let textarea = $("<textarea>");
    let save = $("<button>");
    let savediv = $("<div>");
    let i = $("<i>");
    row.addClass("row");
    row.addClass("margin");
    timediv.attr("class", "col s2 right-align ");
    txtdiv.attr("class", "col s8");
    savediv.attr("class", "col s2 left-align");
    timep.text(hourOb.hour);
    timediv.append(timep);
    i.attr("class", "material-icons");
    i.text("save");
    // < i class="material-icons" > save</i >
    save.append(i);
    save.addClass("glow-on-hover");
    save.attr("value", hourOb.id);
    checktime(hourOb);
    if (hourOb.text.length > 0 && hourOb.current) {
      textarea.val(hourOb.text);
      textarea.attr("id", hourOb.id);
      txtdiv.addClass("current");
      txtdiv.append(textarea);
    } else if (hourOb.text.length > 0 && hourOb.past) {
      p.text(hourOb.text);
      save.attr("disabled", true);
      //p.addClass("class", "grey");
      txtdiv.addClass("blue-grey");
      txtdiv.append(p);
    } else if (hourOb.future && hourOb.text.length > 0) {
      textarea.val(hourOb.text);
      textarea.attr("id", hourOb.id);
      textarea.addClass("future");
      txtdiv.addClass("future");
      txtdiv.append(textarea);
    } else if (hourOb.future && hourOb.text.length == 0) {
      textarea.val("");
      textarea.attr("id", hourOb.id);
      textarea.addClass("future");
      txtdiv.addClass("future");
      txtdiv.append(textarea);
    } else if (hourOb.past && hourOb.text.length == 0) {
      p.text("--------------------");
      txtdiv.addClass("blue-grey");
      save.attr("disabled", true);
      // p.attr("class", "past");
      txtdiv.append(p);
    } else {
      textarea.val("");
      textarea.attr("id", hourOb.id);
      textarea.addClass("current");
      txtdiv.addClass("current");
      txtdiv.append(textarea);
    }
    savediv.append(save);
    row.append(timediv);
    form.append(txtdiv);
    form.append(savediv);
    row.append(form);
    cal.append(row);
  }
  $("button").on("click", function(e) {
    e.preventDefault();

    let $this = $(this);
    let val = $(`#${$this.val()}`).val();
    console.log(val);
    console.log(hours);
    hours[$this.val()].text = val;
    let str = JSON.stringify(hours);
    localStorage.setItem("hours", str);
  });

  function startUp() {
    let timelist = [
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19"
    ];
    if (!localStorage.getItem("hours")) {
      hours = [];
      for (i = 0; i < timelist.length; i++) {
        let hour = createHour(i, timelist[i]);
        addToDom(hour);
        hours.push(hour);
      }
    } else {
      hours = JSON.parse(localStorage.getItem("hours"));
      for (i = 0; i < hours.length; i++) {
        addToDom(hours[i]);
      }
    }
  }
});

/*
class Hour {
  constructor(id, hour, text, future, current, past) {
    this.id = id;
    this.hour = hour;
    this.text = text;
    this.future = future;
    this.current = current;
    this.past = past;
  } 
  getHour() {
    return this.hour;
  }
  getText() {
    return this.text;
  }
  isActive() {
    return active;
  }
  getId() {
    return this.id;
  }
}

var vm = new Vue({
  el: "#app",
  data: {
    curDay: null,
    curTime: null,
    hours: [],
    todo: ""
  },
  mounted: function() {
    this.curDay = moment().format("MMMM Do YYYY");
    let day = moment().format("dddd");
    this.curTime = moment().format("LTS");
    if (!localStorage.getItem("day")) {
      localStorage.setItem("day", day);
    } else if (localStorage.getItem("day") === day) {
      //still same day getcalender
    } else {
      localStorage.clear();
      localStorage.setItem("day", day);
      this.start();
      //generate calendar
    }

    this.$options.interval = setInterval(() => {
      this.curTime = moment().format("LTS");
    }, 1000);
    // console.log(typeof moment().format("LTS"));
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
  methods: {
    start: function() {
      if (!localStorage.getItem("hours")) {
        for (i = 0; i < 14; i++) {
          this.createCalendar(i); // in theory this should check i push to hours and hours get looped in dom
        }
        localStorage.setItem("hours", this.hours);
      } else {
      }
    },
    createCalendar: function(index) {
      let format = "hh:mm:ss";
      let strTime = moment().format("LTS");
      let curtime = moment(strTime, format);
      console.log(strTime);
      //furtue current past order of flags
      switch (index) {
        case 0:
          //check first to see if there is value and if active
          if (
            curtime.isBetween(
              moment("07:00:00", format),
              moment("07:59:59", format)
            )
          ) {
            let hour1 = new Hour(index, "07:00 am", "", false, true, false);
            this.hours.push(hour1);
          } else if (curtime.isAfter(moment("07:59:59", format))) {
            let hour1 = new Hour(index, "07:00 am", "", false, false, true);
            this.hours.push(hour1);
          } else {
            let hour1 = new Hour(index, "07:00 am", "", true, false, false);
            this.hours.push(hour1);
          }

          break;
        case 1:
          if (
            curtime.isBetween(
              moment("08:00:00", format),
              moment("08:59:59", format)
            )
          ) {
            let hour2 = new Hour(index, "08:00 am", "", false, true, false);
            this.hours.push(hour2);
          } else if (curtime.isAfter(moment("08:59:59", format))) {
            let hour2 = new Hour(index, "08:00 am", "", false, false, true);
            this.hours.push(hour2);
          } else {
            let hour2 = new Hour(index, "08:00 am", "", true, false, false);
            this.hours.push(hour2);
          }

          break;
        case 2:
          if (
            curtime.isBetween(
              moment("09:00:00", format),
              moment("09:59:59", format)
            )
          ) {
            let hour3 = new Hour(index, "09:00 am", "", false, true, false);
            this.hours.push(hour3);
          } else if (curtime.isAfter(moment("09:59:59", format))) {
            let hour3 = new Hour(index, "09:00 am", "", false, false, true);
            this.hours.push(hour3);
          } else {
            let hour3 = new Hour(index, "09:00 am", "", true, false, false);
            this.hours.push(hour3);
          }

          break;
        case 3:
          if (
            curtime.isBetween(
              moment("10:00:00", format),
              moment("10:59:59", format)
            )
          ) {
            let hour4 = new Hour(index, "10:00 am", "", false, true, false);
            this.hours.push(hour4);
          } else if (curtime.isAfter(moment("10:59:59", format))) {
            let hour4 = new Hour(index, "10:00 am", "", false, false, true);
            this.hours.push(hour4);
          } else {
            let hour4 = new Hour(index, "10:00 am", "", true, false, false);
            this.hours.push(hour4);
          }

          break;
        case 4:
          if (
            curtime.isBetween(
              moment("11:00:00", format),
              moment("11:59:59", format)
            )
          ) {
            let hour5 = new Hour(index, "11:00 am", "", false, true, false);
            this.hours.push(hour5);
          } else if (curtime.isAfter(moment("11:59:59", format))) {
            let hour5 = new Hour(index, "11:00 am", "", false, false, true);
            this.hours.push(hour5);
          } else {
            let hour5 = new Hour(index, "11:00 am", "", true, false, false);
            this.hours.push(hour5);
          }

          break;
        case 5:
          //check first to see if there is value and if active
          if (
            curtime.isBetween(
              moment("12:00:00", format),
              moment("12:59:59", format)
            )
          ) {
            let hour6 = new Hour(index, "12:00 pm", "", false, true, false);
            this.hours.push(hour6);
          } else if (curtime.isAfter(moment("12:59:59", format))) {
            let hour6 = new Hour(index, "12:00 pm", "", false, false, true);
            this.hours.push(hour6);
          } else {
            let hour6 = new Hour(index, "12:00 pm", "", true, false, false);
            this.hours.push(hour6);
          }

          break;
        case 6:
          if (
            curtime.isBetween(
              moment("01:00:00", format),
              moment("01:59:59", format)
            )
          ) {
            let hour7 = new Hour(index, "01:00 pm", "", false, true, false);
            this.hours.push(hour7);
          } else if (curtime.isAfter(moment("01:59:59", format))) {
            let hour7 = new Hour(index, "08:00 pm", "", false, false, true);
            this.hours.push(hour7);
          } else {
            let hour7 = new Hour(index, "01:00 pm", "", true, false, false);
            this.hours.push(hour7);
          }

          break;
        case 7:
          if (
            curtime.isBetween(
              moment("02:00:00", format),
              moment("02:59:59", format)
            )
          ) {
            let hour8 = new Hour(index, "02:00 pm", "", false, true, false);
            this.hours.push(hour8);
          } else if (curtime.isAfter(moment("02:59:59", format))) {
            let hour8 = new Hour(index, "02:00 pm", "", false, false, true);
            this.hours.push(hour8);
          } else {
            let hour8 = new Hour(index, "02:00 pm", "", true, false, false);
            this.hours.push(hour8);
          }

          break;
        case 8:
          if (
            curtime.isBetween(
              moment("03:00:00", format),
              moment("03:59:59", format)
            )
          ) {
            let hour9 = new Hour(index, "03:00 pm", "", false, true, false);
            this.hours.push(hour9);
          } else if (curtime.isAfter(moment("03:59:59", format))) {
            let hour9 = new Hour(index, "03:00 pm", "", false, false, true);
            this.hours.push(hour9);
          } else {
            let hour9 = new Hour(index, "03:00 pm", "", true, false, false);
            this.hours.push(hour9);
          }

          break;
        case 9:
          if (
            curtime.isBetween(
              moment("04:00:00", format),
              moment("04:59:59", format)
            )
          ) {
            let hour10 = new Hour(index, "04:00 pm", "", false, true, false);
            this.hours.push(hour10);
          } else if (curtime.isAfter(moment("04:59:59", format))) {
            let hour10 = new Hour(index, "04:00 pm", "", false, false, true);
            this.hours.push(hour10);
          } else {
            let hour10 = new Hour(index, "04:00 pm", "", true, false, false);
            this.hours.push(hour10);
          }

          break;
        case 10:
          if (
            curtime.isBetween(
              moment("05:00:00", format),
              moment("05:59:59", format)
            )
          ) {
            let hour111 = new Hour(index, "05:00 pm", "", false, true, false);
            this.hours.push(hour11);
          } else if (curtime.isAfter(moment("05:59:59", format))) {
            let hour11 = new Hour(index, "05:00 pm", "", false, false, true);
            this.hours.push(hour11);
          } else {
            let hour1 = new Hour(index, "05:00 pm", "", true, false, false);
            this.hours.push(hour1);
          }

          break;
        case 11:
          if (
            curtime.isBetween(
              moment("06:00:00", format),
              moment("06:59:59", format)
            )
          ) {
            let hour12 = new Hour(index, "06:00 pm", "", false, true, false);
            this.hours.push(hour12);
          } else if (curtime.isAfter(moment("06:59:59", format))) {
            let hour12 = new Hour(index, "06:00 pm", "", false, false, true);
            this.hours.push(hour12);
          } else {
            let hour12 = new Hour(index, "06:00 pm", "", true, false, false);
            this.hours.push(hour12);
          }

          break;
      }
    },
    save: function() {},
    getCalendar: function(index) {
      console.log(this.hours.length);
      console.log(this.hours);
    }
  },
  watch: {}
});

/* var time = moment() gives you current time. no format required.
var time = moment("09:34:00", format),
  beforeTime = moment("08:34:00", format),
  afterTime = moment("10:34:00", format);

if (time.isBetween(beforeTime, afterTime)) {
  console.log("is between");
} else {
  console.log("is not between");
}*/
