import fetch, { Headers } from "node-fetch";
const getCalendarData = async (bakalariToken) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bakalariToken}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    "https://bakalari.gymjh.cz/api/3/timetable/permanent",
    requestOptions
  );
  const data = await res.json();
  if (!data.Days) {
    console.log(data);
    return "Invalid token";
  }
  const week = [];
  for (let i = 0; i < 5; i++) {
    const dayHours = data.Days[i].Atoms;
    const day = [];
    dayHours.forEach((hour) => {
      const lesson = data.Hours.find(
        (lessonItem) => lessonItem.Id === hour.HourId
      );
      const subject = data.Subjects.find(
        (subjectInfoItem) => subjectInfoItem.Id === hour.SubjectId
      );
      // const roomInfo = data.Rooms.find(
      //   (roomInfoInfoItem) => roomInfoInfoItem.Id === hour.RoomId
      // );
      // const teacherInfo = data.Teachers.find(
      //   (teacherInfoItem) => teacherInfoItem.Id === hour.TeacherId
      // );
      // const cycleInfo = data.Cycles.find(
      //   (cycleInfoItem) => cycleInfoItem.Id === hour.CycleIds
      // );
      day.push({
        lesson,
        subject,
        // roomInfo,
        // teacherInfo,
        // cycleInfo,
      });
    });

    week.push(day);
  }
  return week;
};
export default getCalendarData;
