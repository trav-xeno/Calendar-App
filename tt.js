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
    if (hourOb.text.length > 0 && hourOb.current) {
      textarea.val(hourOb.text);
      textarea.attr("id", hourOb.id);
      txtdiv.addClass("current");
      txtdiv.append(textarea);
    } else if (hourOb.text.length > 0 && hourOb.past) {
      p.text(hour.text);
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
